import LiveForms from "../LiveForms/model.js"; 
import liveFormResponses from "./model.js"; 
import { getViewerDetails } from "../Utilities/viewerDetails.util.js";
import { sanitizeAnswers , sanitizeProgress } from "../Utilities/liveFormResponse.validators.js";

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
            answeredCount : cleanAnswers.length, 
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

export { saveResponse };