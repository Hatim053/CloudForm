import { Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import templatesToIdMap from "../utils/templatesToIdMap";

function LiveFormRender() {
    const {id , status} = useParams();
    const [formId , setFormId] = useState("");
    const [formElements , setFormElements] = useState([]);
    
    const getActualFormPreviewData = useCallback(async(id , status) => {
       try {
         const formData = await fetch(`${import.meta.env.VITE_SERVER_URL}/liveform/show/${id}/status=${status}`);
         const jonFormData = await formData.json();
         setFormId(jonFormData?.form_id);
         setFormElements(jonFormData?.elements);
       } catch (error) {
        console.log('something went wrong' , error);
       }
    });

    useEffect(() => {

     getActualFormPreviewData(id , status);

    } , [id , status]);
    
   const component =  formId && templatesToIdMap.formId
    
    return (
        <Suspense fallback = {<h1>Loading...</h1>}>
          {component && <component props = {formElements} />}
        </Suspense>
    )

}

export default LiveFormRender;