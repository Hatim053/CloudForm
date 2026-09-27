import mongoose from "mongoose";


const liveFormsSchema = new mongoose.Schema({
user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
},
live_link : { // livelink of the forms : frontendbaseurl/liveformrender/:formId/status=:status
    type : String,
    required : true
},
form_id : {
    type : String,
    required : true
},
name : {
type : String,
required : true
},
domain : {
    type : String, // for now keeping it as string
},
form_status : {
    type : String,
    enum : ["public" , "restricted" , "unlisted"]
},
authorize_users : {
    type : Array, // contains emails of the authourize users who are allowed to access the form
    // by default at the creation of the form add the gmail of creator of the form
},
elements_data : {
    type : {},
    required : true
}
} , { timestamps : true} );

// elements_data : { // fields can be less or more completly depending on the type of template user has selected  but format is going to be the same

// name : event form,
// heading : secure your slot,
// links : [{}],
// socialhandles : [{}],
// inputElements : [{}],
// }

const LiveForms = mongoose.model("LiveForms" , liveFormsSchema);

export default LiveForms;

