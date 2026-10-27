import LiveForms from "../LiveForms/model.js";
import liveFormResponses from "./model.js";
import { getViewerDetails } from "../Utilities/viewerDetails.util.js";
import { sanitizeAnswers , sanitizeProgress , parseResponseListQuery } from "../Utilities/liveFormResponse.validators.js";

const RESPONSE_STATUSES = ["viewed" , "partial" , "completed"];

// a save may only move a response forward : viewed -> partial -> completed
// a late or repeated request can never move it backwards
const ALLOWED_PREVIOUS_STATUS = {
    viewed : ["viewed"],
    partial : ["viewed" , "partial"],
    completed : ["viewed" , "partial"]
};

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
const SESSION_ID_REGEX = /^[A-Za-z0-9_-]{8,64}$/;

// one endpoint for all three states : the live page calls it on load (viewed) , while typing (partial) and on submit (completed)
const saveResponse = async (req , res) => {
    try {
        const { formId , sessionId , status , answers , totalElements , lastElementId , timeSpentSeconds } = req?.body ?? {};

        if(typeof formId !== "string" || !OBJECT_ID_REGEX.test(formId)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid form id"
                   });
        }

        if(typeof sessionId !== "string" || !SESSION_ID_REGEX.test(sessionId)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid session id"
                   });
        }

        if(!RESPONSE_STATUSES.includes(status)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid response status"
                   });
        }

        const form = await LiveForms.findById(formId).select("user_id form_status authorize_users").lean();

        if(!form) {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "form not found or deleted by the creator"
                   });
        }

        const viewerEmail = req?.user?.email?.toLowerCase();

        if(form.form_status === "restricted") {
            const isViewerAuthorized = Boolean(viewerEmail) && Boolean(form.authorize_users?.includes(viewerEmail));
            if(!isViewerAuthorized) {
                return res
                       .status(404)
                       .json({
                        status : 404,
                        message : "user not authorized"
                       });
            }
        }

        let cleanAnswers;
        let progress;
        try {
            cleanAnswers = status === "viewed" ? [] : sanitizeAnswers(answers);
            progress = sanitizeProgress({ totalElements , lastElementId , timeSpentSeconds } , status);
        } catch (validationError) {
            if(validationError.isValidation) {
                return res
                       .status(400)
                       .json({
                        status : 400,
                        message : validationError.message
                       });
            }
            throw validationError;
        }

        if(status === "completed" && cleanAnswers.length === 0) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "no answers to submit"
                   });
        }

        const now = new Date();

        const fieldsToSet = {
            status : status,
            answers : cleanAnswers,
            answeredCount : cleanAnswers.length, // counted here , the client's count is never trusted
            totalElements : progress.totalElements,
            lastElementId : progress.lastElementId,
            timeSpentSeconds : progress.timeSpentSeconds,
            lastActivityAt : now
        };
        if(status === "completed") fieldsToSet.completedAt = now;
        if(viewerEmail) fieldsToSet.respondentEmail = viewerEmail;

        Object.keys(fieldsToSet).forEach((key) => {
            if(fieldsToSet[key] === undefined) delete fieldsToSet[key];
        });

        // the filter only matches while the response is still allowed to move to this status.
        // if it is already further along no document matches , the upsert hits the unique (formId , sessionId) index
        // and throws 11000 , which is caught below and treated as "nothing to do"
        await liveFormResponses.updateOne(
            { formId : formId , sessionId : sessionId , status : { $in : ALLOWED_PREVIOUS_STATUS[status] } },
            {
                $set : fieldsToSet,
                $setOnInsert : {
                    userId : form.user_id,
                    viewer : getViewerDetails(req) // location + device , only written when the session is first created
                }
            },
            { upsert : true , setDefaultsOnInsert : true }
        );

        return res
               .status(200)
               .json({
                status : 200,
                message : "response saved"
               });

    } catch (error) {
        if(error?.code === 11000) {
            return res
                   .status(200)
                   .json({
                    status : 200,
                    message : "response already recorded"
                   });
        }

        console.log("error while saving the response" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while saving the response"
               });
    }
};


// ---------------------------------------------------------------------------------------------------------------
// creator side : everything below needs authenticateUser (req.user._id comes from the access token cookie)
// a form or response that belongs to somebody else answers 404 "not found" , never 403 , so nothing confirms it exists
// ---------------------------------------------------------------------------------------------------------------

const LIST_FIELDS = "status answeredCount totalElements lastElementId respondentEmail viewer startedAt completedAt timeSpentSeconds createdAt"; // no answers : the list stays light

// completed always reads 100 , otherwise answered / total
const getCompletionPercent = ({ status , answeredCount , totalElements }) => {
    if(status === "completed") return 100;
    if(!totalElements) return 0;
    return Math.min(100 , Math.round(((answeredCount ?? 0) / totalElements) * 100));
};

// 1. every form the logged in user created , for the "pick a form" screen
const getMyForms = async (req , res) => {
    try {
        const userId = req?.user?._id?.toString();
        console.log(userId , "requested user");
        if(!userId || !OBJECT_ID_REGEX.test(userId)) {
            return res
                   .status(401)
                   .json({
                    status : 401,
                    message : "unauthorized request"
                   });
        }

        const forms = await LiveForms.find({ user_id : userId }).select("name live_link").sort({ createdAt : -1 }).lean();
        console.log("forms fetched" , forms);
        return res
               .status(200)
               .json({
                status : 200,
                message : "request successful",
                forms : forms
               });

    } catch (error) {
        console.log("error while fetching the creator's forms" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while fetching the forms"
               });
    }
};

// 2. the responses of one form (newest first , paginated) with optional filters :
//    ?status=completed|partial  &country=  &city=  &deviceType=desktop|mobile|tablet  &from=YYYY-MM-DD  &to=YYYY-MM-DD  &page=  &limit=
const getFormResponses = async (req , res) => {
    console.log("user requested for his form responses");
    try {
        const userId = req?.user?._id?.toString();
        const formId = req?.params?.formId;

        if(!userId || !OBJECT_ID_REGEX.test(userId)) {
            return res
                   .status(401)
                   .json({
                    status : 401,
                    message : "unauthorized request"
                   });
        }

        if(typeof formId !== "string" || !OBJECT_ID_REGEX.test(formId)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid form id"
                   });
        }

        let parsedQuery;
        try {
            parsedQuery = parseResponseListQuery(req?.query);
        } catch (validationError) {
            if(validationError.isValidation) {
                return res
                       .status(400)
                       .json({
                        status : 400,
                        message : validationError.message
                       });
            }
            throw validationError;
        }

        const form = await LiveForms.findOne({ _id : formId , user_id : userId }).select("name").lean();

        if(!form) {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "form not found"
                   });
        }

        const { filter , page , limit } = parsedQuery;
        const responseFilter = { formId : formId , ...filter };

        const [responses , total] = await Promise.all([
            liveFormResponses.find(responseFilter)
                             .select(LIST_FIELDS)
                             .sort({ createdAt : -1 , _id : -1 }) // _id breaks ties so pages never repeat or skip a row
                             .skip((page - 1) * limit)
                             .limit(limit)
                             .lean(),
            liveFormResponses.countDocuments(responseFilter)
        ]);
        console.log(responses , "responses");
        return res
               .status(200)
               .json({
                status : 200,
                message : "request successful",
                form : { _id : form._id , name : form.name },
                responses : responses.map((response) => ({ ...response , completionPercent : getCompletionPercent(response) })),
                pagination : { page , limit , total , totalPages : Math.ceil(total / limit) }
               });

    } catch (error) {
        console.log("error while fetching the form responses" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while fetching the responses"
               });
    }
};

// 3. one response with its answers , for the detail page
const getResponseDetail = async (req , res) => {
    try {
        const userId = req?.user?._id?.toString();
        const responseId = req?.params?.responseId;

        if(!userId || !OBJECT_ID_REGEX.test(userId)) {
            return res
                   .status(401)
                   .json({
                    status : 401,
                    message : "unauthorized request"
                   });
        }

        if(typeof responseId !== "string" || !OBJECT_ID_REGEX.test(responseId)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid response id"
                   });
        }

        // userId on the response is the form's owner , so one scoped query is the whole ownership check
        const response = await liveFormResponses.findOne({ _id : responseId , userId : userId }).select("-__v").lean();

        if(!response) {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "response not found"
                   });
        }

        return res
               .status(200)
               .json({
                status : 200,
                message : "request successful",
                response : { ...response , completionPercent : getCompletionPercent(response) }
               });

    } catch (error) {
        console.log("error while fetching the response detail" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while fetching the response"
               });
    }
};

export { saveResponse , getMyForms , getFormResponses , getResponseDetail };