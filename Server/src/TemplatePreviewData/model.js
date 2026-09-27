import mongoose from "mongoose";

const templatePreviewDataSchema = new mongoose.Schema({
id : {
    type : String,
    required : true,
    unique : true
},
previewData : {
    type : Object,
    required : true
}
} , { timestamps : true });

const TemplatePreviewData = mongoose.model("TemplatePreviewData" , templatePreviewDataSchema);

export default TemplatePreviewData;

