import mongoose from "mongoose";


const liveFormsSchema = new mongoose.Schema({
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
},
liveLink : {
    type : String,
    required : true
},
domain : {
    type : String, // for now keeping it as string
},
formId : {
    type : String,
    required : true
},
elements : {
    type : Array, // [{elementId , label , placeholder , props : {}},{}}]
    required : true
}
} , { timestamps : true} );


const LiveForms = mongoose.model("LiveForms" , liveFormsSchema);

export default LiveForms;

