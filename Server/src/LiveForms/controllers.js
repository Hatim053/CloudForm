import LiveForms from "./model.js";

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
    const forms = await LiveForms.find({user_id : userId});

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
    const status = req?.params?.status;
    const formId = req?.params?.formId;

    const form = await LiveForms.findById(formId).select("form_status accessible_users elements");

    if(!form) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "form not found or deleted by the creator"
               });
    }

    if(!form.form_status === status) {
        return res
               .status(404)
               .json({
                status : 404,
                message : "corrupt or invalid link"
               });
    } 
    if(status === "restricted") {
       const viewerEmail = req?.user?.email;
       const isViewerAuthorized = form.authorize_users.includes(viewerEmail);
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
                formElements : form.elements
              });

};
    
export {
getFormData,
getAllUserFormsList,
showLiveForm
};