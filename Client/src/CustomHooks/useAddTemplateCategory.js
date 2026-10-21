import { useState } from "react";

// takes the ref of the textarea the admin pastes the category object into
function useAddTemplateCategory(templateCategoryRef) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTemplateCategory = async () => {
    console.log("function started");
    setIsLoading(true);
    setError(null);

    try {
      const categoryObj = templateCategoryRef.current.value;
      const jsonCategoryObj = JSON.parse(categoryObj);
      const requiredFields = ["id" , "name" , "description" , "tag" , "cover" ,"icon"];

      const missingFields = requiredFields.filter((field) => !jsonCategoryObj[field]);
      missingFields.forEach((field) => alert(`${field} is required`));
      if(missingFields.length > 0) {
        // a `return` inside forEach only leaves the callback, so the request used to go out anyway
        setError(`${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/template-category-list/create-data` , {
        method : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify(jsonCategoryObj)
      });

      if(!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message ?? "Could not add the category");
      }

      // only cleared on success, so a failed request doesn't wipe what the admin pasted
      templateCategoryRef.current.value = "";
    } catch (err) {
      console.log(err);
      setError(
        err instanceof SyntaxError
          ? "Invalid JSON — check for missing commas, brackets or quotes"
          : err.message || "Could not add the category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { addTemplateCategory, isLoading, error };
}

export default useAddTemplateCategory;