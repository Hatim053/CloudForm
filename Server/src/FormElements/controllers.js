import Element from "./model.js";

const createNewFormElement = async(req , res) => {
// {  // frontend data
//     uniqueId : v0111,
//     ui_Code : <div>Hello</div>,
//     supporting_gunctions : [function() {}],
//     category : "email-input",
// }
   const { uniqueId , ui_code , supporting_functions , category} = req.data;
   const newElement = await Element.create({
    uniqueId,
    ui_code,
    supporting_functions,
    category
   });

   if(!newElement) {
    return res
    .status(501)
    .json({
        status : 501,
        message : "something went wrong",
    })
   }
   const _id = newElement._id;
   return res
       .status(200)
       .json({
        status : 200,
        message : "element created successfully",
        _id : _id
       })
};  

const createNewFormSkeleton = async(req , res) => {
// { // frontend data
//     uniqueId : v0111,
//     ui_code : <div>Hello</div>,
//     supporting_functions : [function() {}],
//     category : "form",
//     name : "count-down-form",
//     input_fields : [],
// }
const { uniqueId , ui_code , supporting_functions , category , name , input_fields } = req.data;
const newElement = await Element.create({
    uniqueId,
    ui_code,
    supporting_functions,
    category,
    name,
    input_fields,
   });

   if(!newElement) {
    return res
    .status(501)
    .json({
        status : 501,
        message : "something went wrong",
    })
   }
   const _id = newElement._id;
   return res
       .status(200)
       .json({
        status : 200,
        message : "element created successfully",
       })

};


export {
    createNewFormElement,
    createNewFormSkeleton
};