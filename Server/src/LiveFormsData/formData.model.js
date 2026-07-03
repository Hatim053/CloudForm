import mongoose from "mongoose";


const formDataSchema = new mongoose.Schema({
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

const formData = mongoose.model('formData' , formDataSchema);

export default formData;
