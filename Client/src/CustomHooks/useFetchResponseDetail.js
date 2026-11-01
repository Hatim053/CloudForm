import useGetJson from "./useGetJson.js";

// GET /live-form-response/detail/:responseId -> one response with its answers
function useFetchResponseDetail(responseId) {
  const path = responseId ? `/live-form-response/detail/${encodeURIComponent(responseId)}` : null;
  const { data, isLoading, error, errorStatus, reload } = useGetJson(path);

  // never show the previous response while the next one loads
  const isCurrentResponse = Boolean(data) && data.response?._id === responseId;

  return { response : isCurrentResponse ? data.response : null, isLoading, error, errorStatus, reload };
}

export default useFetchResponseDetail;