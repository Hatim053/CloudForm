import useGetJson from "./useGetJson.js";

const NO_FORMS = [];

// GET /live-form-response/my-forms -> the forms of the logged in user : { _id , name , live_link }
function useFetchMyForms() {
  const { data, isLoading, error, errorStatus, reload } = useGetJson("/live-form-response/my-forms");

  return { forms : data?.forms ?? NO_FORMS, isLoading, error, errorStatus, reload };
}

export default useFetchMyForms;