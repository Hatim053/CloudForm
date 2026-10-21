import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
// adjust this path to wherever TemplateSlice.js lives in your project
import {
  addTemplatePreviewData,
  loadDraft,
  clearDraft,
  selectCachedPreviewData,
} from "../app/TemplateSlice.js";

function useFetchTemplatePreviewData(id) {

  const dispatch = useDispatch();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    // 1. cache hit -> no network request, just rebuild a fresh editable draft from the pristine copy
    const cachedPreviewData = selectCachedPreviewData(store.getState(), id);
    if (cachedPreviewData) {
      dispatch(loadDraft(id, cachedPreviewData));
      setIsLoading(false);
      return;
    }

    // 2. cache miss -> fetch once, cache the pristine data, then build the draft
    setIsLoading(true);
    dispatch(clearDraft()); // don't flash the previous template while this one loads
    const controller = new AbortController();

    const fetchTemplatePreviewData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/template-preview-data/fetch-data/${id}`,
          { signal: controller.signal }
        );
        const jsonResponse = await response.json();
        // backend returns the whole Mongoose document ({ _id, id, previewData, createdAt, ... })
        // only the inner `previewData` object is the actual template content
        const previewData = jsonResponse?.templatePreviewData?.previewData;
        if (!previewData) {
          setError(jsonResponse?.message ?? "Template data not found");
          return;
        }

        dispatch(addTemplatePreviewData({ id, data: previewData }));
        dispatch(loadDraft(id, previewData));
      } catch (err) {
        if (err.name === "AbortError") return;
        console.log(err);
        setError(err.message || "Could not load the template");
      } finally {
        // an aborted request belongs to a stale id / unmounted page, so it must not touch state
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchTemplatePreviewData();
    return () => controller.abort(); // ignore stale responses if the id changes / page unmounts
  }, [id, dispatch, store]);

  return { isLoading, error };
}

export default useFetchTemplatePreviewData;