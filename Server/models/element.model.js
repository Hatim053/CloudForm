import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
    uniqueId : {
        type : String,
        required : true,
    },
    category : {
       type : String,
       enum : ["form" , "enmail-input" , "name-input" , "short-text-input" , "long-text-input" , "number-input" , "date-input" , "time-input" , "button" , "social-card" , "social-grid" , "country-input" , "city-input" , "dropdown" , "star-rating" , "multi-select-input" , "single-file-input" , "multi-file-input"],
       required : true
    },
    code : {
        type : String,
        required : true
    }
} {timestamps : true} );


const Element = mongoose.model('Element' , elementSchema);


export default Element;
