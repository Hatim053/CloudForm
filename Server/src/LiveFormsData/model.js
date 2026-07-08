import mongoose from "mongoose";


const liveFormDataSchema = new mongoose.Schema({
formId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'liveForm'
},
responses : {
    type : Array,
},
});

// responses : [{
//     data : {},
//     time : "",
//     location : "",
//     date : "",
// }]

const liveFormData = mongoose.model('liveFormData' , liveFormDataSchema);

export default liveFormData;
