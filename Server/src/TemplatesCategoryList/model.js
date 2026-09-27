import mongoose from "mongoose";


const templatesCategoryListSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        required : true
    },
    cover : {
        type : String,
        reqired : true
    },
    icon : {
        type : String,
        required : true
    }
} , { timestamps : true });



const TemplatesCategoryList = mongoose.model("TemplatesCategoryList" , templatesCategoryListSchema);

export default TemplatesCategoryList;