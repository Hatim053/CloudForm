import useGetJson from "./useGetJson.js";

const NO_RESPONSES = [];

// empty filters are left out of the url , the server falls back to its defaults
const buildQuery = ({ status , country , city , deviceType , from , to , page , limit } = {}) => {
  const params = new URLSearchParams();
  if(status && status !== "all") params.set("status" , status);
  if(country?.trim()) params.set("country" , country.trim());
  if(city?.trim()) params.set("city" , city.trim());
  if(deviceType) params.set("deviceType" , deviceType);
  if(from) params.set("from" , from);
  if(to) params.set("to" , to);
  params.set("page" , String(page ?? 1));
  if(limit) params.set("limit" , String(limit));
  return params.toString();
};

// GET /live-form-response/form/:formId?... -> { form , responses , pagination }
// filters : { status : "all" | "completed" | "partial" , country , city , deviceType , from , to , page , limit }
function useFetchFormResponses(formId , filters) {
  const path = formId ? `/live-form-response/form/${encodeURIComponent(formId)}?${buildQuery(filters)}` : null;
  const { data, isLoading, error, errorStatus, reload } = useGetJson(path);

  // while another form is loading , data still holds the previous form : never show those rows under the new form
  const isCurrentForm = Boolean(data) && data.form?._id === formId;

  return {
    form : isCurrentForm ? data.form : null,
    responses : isCurrentForm ? data.responses : NO_RESPONSES,
    pagination : isCurrentForm ? data.pagination : null,
    isLoading,
    error,
    errorStatus,
    reload
  };
}

export default useFetchFormResponses;