import Element from "../models/element.model.js";

async function pushElementsToDb(elementObj) {
const { uniqueId , name , category , code , input_fields } = elementObj;
const newElement = await Element.create({
  uniqueId,
  name,
  category,
  code,
  input_fields,  
});
if(!newElement) {
    console.log('something went wrong');
    return;
}
console.log('document created successfully' , newElement);
};


export default pushElementsToDb;
