import mongoose from "mongoose";

const elementSchema = new mongoose.Schema({
    uniqueId : {
        type : String,
        required : true,
    },
    category : {
       type : String,
       enum : ["form" , "email-input" , "name-input" , "short-text-input" , "long-text-input" , "number-input" , "date-input" , "time-input" , "button" , "social-card" , "social-grid" , "country-input" , "city-input" , "dropdown" , "star-rating" , "multi-select-input" , "single-file-input" , "multi-file-input" , "custom-form" , "social-link"],
       required : true
    },
    name : {
        type : String,
        required : function () {
          ["form" , "custom-form" , "social-card" , "social-grid"].indexOf(this.category)  == -1 ? false : true;
        },
    },
    ui_code : {
        type : String,
        required : true
    },
    supporting_functions : {
        type : String,
        required : true
    },
    input_fields : { // if the elements is a form itself then it will be having some elements associated with so will store ref of those elements here , request will be made to these elements only when user selects to need one
        type : Array, // [{_id: mongoose.Schema.Types.ObjectId}]
        required : function() {
        ["email-input" , "name-input" , "short-text-input" , "long-text-input" , "number-input" , "date-input" , "time-input" , "button" , , "country-input" , "city-input" , "dropdown" , "star-rating" , "multi-select-input" , "single-file-input" , "multi-file-input" , "social-link"].indexOf(this.category) === -1 ? true : false;
        } 
    },
} , {timestamps : true} );


const Element = mongoose.model('Element' , elementSchema);


export default Element;
