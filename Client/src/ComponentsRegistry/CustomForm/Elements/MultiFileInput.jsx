import FileInputBase from "./FileInputBase.jsx";
 
const EXTENSIONS = [".pdf" , ".zip" , ".png" , ".jpg" , ".jpeg"];
 
// unique Id : cf001mfi
function MultiFileInput(props) {
  return <FileInputBase {...props} multiple maxFiles={5} maxSizeMb={10} extensions={EXTENSIONS} helpText="PDF, ZIP, PNG, JPG — 10MB each" />;
}
 
export default MultiFileInput;
 