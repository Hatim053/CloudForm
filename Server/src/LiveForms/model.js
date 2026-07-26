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
    // bye default at the creation of the form add the gmail of creator of the form
},
elements : {
    type : Array, // [{elementId , label , placeholder , props : {}},{}}]
    required : true
}
} , { timestamps : true} );


const LiveForms = mongoose.model("LiveForms" , liveFormsSchema);

export default LiveForms;

