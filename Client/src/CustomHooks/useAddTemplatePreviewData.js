import { useState } from "react";

// takes the ref of the textarea the admin pastes the template object into
function useAddTemplatePreviewData(templatePreviewDataRef) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTemplatePreviewData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const templatepreviewData = templatePreviewDataRef.current.value;
      const jsonTemplatePreviewData = JSON.parse(templatepreviewData);
      const { id , previewData } = jsonTemplatePreviewData;

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/template-preview-data/create-data` , {
        method : "POST",
        credentials : "include",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id , previewData})
      });
      console.log(response);

      if(!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message ?? "Could not add the template data");
      }

      // only cleared on success, so a failed request doesn't wipe what the admin pasted
      templatePreviewDataRef.current.value = "";
    } catch (err) {
      console.log(err);
      setError(
        err instanceof SyntaxError
          ? "Invalid JSON — check for missing commas, brackets or quotes"
          : err.message || "Could not add the template data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { addTemplatePreviewData, isLoading, error };
}

export default useAddTemplatePreviewData;