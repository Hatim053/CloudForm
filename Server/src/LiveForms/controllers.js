import LiveForms from "./model.js";
import mongoose from "mongoose";

// admin controllers 

// controller to fetch data of specific form
const getFormData = async (req , res) => {
    const formId = req?.params?.formId;
    const form = await LiveForms.findById(formId);
    
    if(!form) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "no such form exist"
               });
    }
    
    const userId = req?.user?._id;

    if(userId !== form.user_id) {
        return res
               .json({
                status : 405,
                message : "requested user is not a form creator"
               });
    }

    return res
           .status(200)
           .json({
            status : 200,
            message : 'form data fetched successfully',
           form : form
           });
};

// controller to fetch list of all the forms specific user has created
const getAllUserFormsList = async (req , res) => {
    const userId = req?.user?._id;
    const forms = await LiveForms.find({user_id : userId}).select("name form_status");

    if(!forms) {
        return res
                status : 205,
                json({
                    status : 205,
                    message : "user didn't created any forms"
                });
    }

    return res
           .status(200)
           .json({
            status : 200,
            message : "forms list fetched successfully",
            forms : forms
           });
};



// veiwer / user controllers
const showLiveForm = async (req , res) => {
    try {
        const status = req?.params?.status;
        const formId = req?.params?.formId;
 
        const form = await LiveForms.findById(formId).select("form_id name form_status elements_data authorize_users").lean();
 
        if(!form) {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "form not found or deleted by the creator"
                   });
        }
 
        if(form.form_status !== status) {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "corrupt or invalid link"
                   });
        }
        if(status === "restricted") {
           const viewerEmail = req?.user?.email?.toLowerCase();
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
 
           return res
                  .status(200)
                  .json({
                    status : 200,
                    message : "request sucessfull",
                    form : {
                        form_id : form.form_id,
                        name : form.name,
                        form_status : form.form_status,
                        elements_data : form.elements_data
                    }
                  });
 
    } catch (error) {
        if(error?.name === "CastError") {
            return res
                   .status(404)
                   .json({
                    status : 404,
                    message : "form not found or deleted by the creator"
                   });
        }
 
        console.log("error while showing the live form" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while loading the form"
               });
    }
};


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
const createForm = async(req , res) => {
 
    try {
        const { name , form_id , form_status , authorize_users , elements_data } = req?.body ?? {};
        const userId = req?.user?._id;
        const creatorEmail = req?.user?.email?.toLowerCase();
 
        if(!userId || !creatorEmail) {
            return res
                   .status(401)
                   .json({
                    status : 401,
                    message : "unauthorized request"
                   });
        }
 
        const formName = typeof name === "string" ? name.trim() : "";
        if(!formName) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "form name is required"
                   });
        }
 
        if(typeof form_id !== "string" || !form_id.trim()) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "template id is required"
                   });
        }
 
        if(!["public" , "restricted" , "unlisted"].includes(form_status)) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "invalid form status"
                   });
        }
 
        const isElementsDataValid = elements_data !== null
                                    && typeof elements_data === "object"
                                    && !Array.isArray(elements_data)
                                    && Object.keys(elements_data).length > 0;
        if(!isElementsDataValid) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "form data is required"
                   });
        }
 
        // only restricted forms use the email list sent by the client
        const requestedEmails = form_status === "restricted" && Array.isArray(authorize_users)
                                ? authorize_users
                                  .filter((email) => typeof email === "string")
                                  .map((email) => email.trim().toLowerCase())
                                : [];
 
        if(requestedEmails.some((email) => !EMAIL_REGEX.test(email))) {
            return res
                   .status(400)
                   .json({
                    status : 400,
                    message : "one or more authorized emails are invalid"
                   });
        }
 
        // creator is always authorized, duplicates removed
        const authorizedUsers = [...new Set([creatorEmail , ...requestedEmails])];
 
        const baseUrl = (process.env.FRONTEND_BASE_URL ?? "").replace(/\/$/ , "");
        if(!baseUrl) {
            console.log("FRONTEND_BASE_URL is not set");
            return res
                   .status(500)
                   .json({
                    status : 500,
                    message : "server configuration error"
                   });
        }
 
        // id is generated first because the live link needs it and live_link is required on the document
        const liveFormId = new mongoose.Types.ObjectId();
        const liveLink = `${baseUrl}/liveformrender/${liveFormId}/status=${form_status}`;
 
        await LiveForms.create({
            _id : liveFormId,
            user_id : userId,
            live_link : liveLink,
            form_id : form_id.trim(),
            name : formName,
            form_status : form_status,
            authorize_users : authorizedUsers,
            elements_data : { name : formName , ...elements_data } // the template's own "name" (e.g. a profile card's person) wins over the form name
        });
 
        return res
               .status(200)
               .json({
                status : 200,
                message : "form created successfully",
                live_link : liveLink
               });
 
    } catch (error) {
        console.log("error while creating the form" , error);
        return res
               .status(500)
               .json({
                status : 500,
                message : "something went wrong while creating the form"
               });
    }
 
};
 
    
export {
getFormData,
getAllUserFormsList,
showLiveForm,
createForm
};