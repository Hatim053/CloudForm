// import { Timestamp } from "mongodb";
// import mongoose from "mongoose";


// const liveFormResponsesSchema = new mongoose.Schema({
// formId : {
//     type : mongoose.Schema.Types.ObjectId,
//     ref : 'liveForm'
// },
// response : {
//     type : Object,
//     required : true
// },
// } , {timestamps : true});

// // response : {
// //     data : {
//          feilds what ever the form creator has declared like name , number , email or any anything  
// //     },
// // now below is the additional data that we are collecting for the user
// //    device : 
// //     location : "",
// //       totalTimeSpent on the page : in mins,
// //       email : trough which user has loggedin to our platfrom if he is or else not
// // }

// const liveFormResponses = mongoose.model("liveFormResponses" , liveFormResponsesSchema);

// export default liveFormResponses;


import mongoose from "mongoose";

// one answered element. Labels are snapshotted because the creator can edit the form after people have answered
const answerSchema = new mongoose.Schema({
elementId : { // id of the input element inside LiveForms.elements_data.inputElements
    type : String,
    required : true
},
elementName : { // snapshot of the element type name e.g. "Phone Number" , used to format the answer in analytics
    type : String
},
elementLabel : { // snapshot of the label shown to the viewer (string or {"01" : "First Name" , "02" : "Last Name"})
    type : mongoose.Schema.Types.Mixed
},
value : { // string | number | array | object (multi part answers like {"01" : "John" , "02" : "Doe"}) | file info
    type : mongoose.Schema.Types.Mixed
},
timeSpentMs : {
    type : Number,
    default : 0
},
answeredAt : {
    type : Date
}
} , { _id : false });


const liveFormResponsesSchema = new mongoose.Schema({
formId : { // _id of the LiveForms document this response belongs to
    type : mongoose.Schema.Types.ObjectId,
    ref : 'LiveForms',
    required : true
},
userId : { // owner of the form , copied from LiveForms so the owner's analytics need no join
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
},
sessionId : { // random id created by the viewer's browser , makes viewed -> partial -> completed ONE document
    type : String,
    required : true
},
status : {
    type : String,
    enum : ["viewed" , "partial" , "completed"], // viewed = opened the page only , partial = answered some and left
    default : "viewed"
},
answers : {
    type : [answerSchema],
    default : []
},
totalElements : { // how many answerable elements the form had when this viewer opened it
    type : Number,
    default : 0
},
answeredCount : {
    type : Number,
    default : 0
},
lastElementId : { // last element the viewer touched , tells where they dropped off
    type : String
},
respondentEmail : { // only for restricted forms , taken from the logged in user and never from the request body
    type : String
},
viewer : { // all of this is derived on the server from the request (ip + user-agent) , never trusted from the body
    country : { type : String },
    state : { type : String },
    city : { type : String },
    deviceType : { type : String, enum : ["desktop" , "mobile" , "tablet"] },
    os : { type : String, enum : ["windows" , "macos" , "ios" , "android" , "linux" , "other"] },
    browser : { type : String }
},
startedAt : {
    type : Date,
    default : Date.now
},
lastActivityAt : {
    type : Date,
    default : Date.now
},
completedAt : {
    type : Date
},
timeSpentSeconds : { // total time on the page
    type : Number,
    default : 0
}
} , { timestamps : true });

// the upsert key : the same viewer session always updates the same document
liveFormResponsesSchema.index({ formId : 1 , sessionId : 1 } , { unique : true });
// the responses list : filter by status , newest first
liveFormResponsesSchema.index({ formId : 1 , status : 1 , createdAt : -1 });

const liveFormResponses = mongoose.model("liveFormResponses" , liveFormResponsesSchema);

export default liveFormResponses;