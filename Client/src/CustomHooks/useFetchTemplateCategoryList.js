import { useEffect, useState } from "react";

function useFetchTemplateCategoryList() {

  const [templateCategoryList, setTemplateCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTemplateListData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/template-category-list/fetch-data`);
      const jsonResponse = await response.json();
      const list = jsonResponse?.templateCategoryList;
      
      console.log(list , "inside hook");

      setTemplateCategoryList(list);
    } catch (err) {
      console.log(err);
      setError(err.message || "Could not load the templates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchTemplateListData();
  }, []);

  return { templateCategoryList, isLoading, error };
}

export default useFetchTemplateCategoryList;