import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
    uniqueId : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    category : {
       type : String,
       enum : ["form" , "enmail-input" , "name-input" , "short-text-input" , "long-text-input" , "number-input" , "date-input" , "time-input" , "button" , "social-card" , "social-grid" , "country-input" , "city-input" , "dropdown" , "star-rating" , "multi-select-input" , "single-file-input" , "multi-file-input" , "custom-form" , "social-link"],
       required : true
    },
    code : {
        type : String,
        required : true
    },
    input_fields : {
        type : Array,
        required : function() {
        ["enmail-input" , "name-input","country-input" , "city-input"].indexOf(this.category) === -1 ? true : false;
        }
    },
} , {timestamps : true} );


const Element = mongoose.model('Element' , elementSchema);


export default Element;
