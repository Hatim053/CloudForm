import { useState } from "react";
import { useStore } from "react-redux";
// adjust this path to wherever TemplateSlice.js lives in your project
import { selectPreviewData } from "../app/TemplateSlice.js";

function usePublishLiveForm(templateId) {
  const store = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [liveLink, setLiveLink] = useState("");

  // name / status / emails come from the popup's form fields, so the component passes them in
  const publishForm = async ({ name, status, emails }) => {
    setIsLoading(true);
    setError(null);
    try {
      // read at click time -> exactly what the live preview shows (selected elements, edited values)
      const previewData = selectPreviewData(store.getState());
      if (!previewData) throw new Error("Nothing to publish yet");

      const formName = name.trim();

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/liveform/create`, {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          form_id: templateId, // template id: tells the live page which template to render
          form_status: status,
          authorize_users: status === "restricted" ? emails : [],
          elements_data: { ...previewData, name: formName },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? errorBody?.message ?? "Could not publish the form");
      }

      // the form already exists at this point, so a bad body must not turn into a "failed" popup
      const successBody = await response.json().catch(() => null);
      setLiveLink(successBody?.live_link ?? "");
      setIsPublished(true);
    } catch (err) {
      setError(err.message || "Could not publish the form");
    } finally {
      setIsLoading(false);
    }
  };

  return { publishForm, isLoading, error, isPublished, liveLink };
}

export default usePublishLiveForm;