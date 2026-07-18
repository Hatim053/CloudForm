import mongoose from "mongoose";


const liveFormResponsesSchema = new mongoose.Schema({
formId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'liveForm'
},
response : {
    type : Object,
    required : true
},
});

// response : {
//     data : {
//     name : "Hatim",
//     email : "HatimHussain924@gmail.com"   
//     },
//     time : "",
//     location : "",
//     date : "",
// }

const liveFormResponses = mongoose.model("liveFormResponses" , liveFormResponsesSchema);

export default liveFormResponses;
