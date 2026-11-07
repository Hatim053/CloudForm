import FileInputBase from "./FileInputBase.jsx";
 
const EXTENSIONS = [".pdf" , ".doc" , ".docx" , ".png" , ".jpg" , ".jpeg"];
 
// unique Id : cf001sfi
function SingleFileInput(props) {
  return <FileInputBase {...props} multiple={false} maxFiles={1} maxSizeMb={5} extensions={EXTENSIONS} helpText="PDF, DOC, PNG, JPG — max 5MB" />;
}
 
export default SingleFileInput;
 
