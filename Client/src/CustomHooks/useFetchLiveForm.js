import { useEffect, useState } from "react";

function useFetchLiveForm(id , status) {

  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getActualFormPreviewData = async () => {
      setIsLoading(true);
      setError(null);
      setForm(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/liveform/show/${id}/status=${status}` , {
          credentials : "include", // restricted forms identify the viewer through the login cookie
          signal : controller.signal
        });
        const jsonFormData = await response.json();

        // the auth middlewares answer some failures with HTTP 200 and the real code only in the body
        if(!response.ok || jsonFormData?.status !== 200 || !jsonFormData?.form) {
          throw new Error(jsonFormData?.message ?? "Could not load the form");
        }

        setForm(jsonFormData.form);
      } catch (err) {
        if(err.name === "AbortError") return;
        console.log('something went wrong' , err);
        setError(err instanceof SyntaxError ? "Could not load the form" : err.message || "Could not load the form");
      } finally {
        // an aborted request belongs to an old link / unmounted page , so it must not touch state
        if(!controller.signal.aborted) setIsLoading(false);
      }
    };

    getActualFormPreviewData();
    return () => controller.abort();
  }, [id , status]);

  return { form, isLoading, error };
}

export default useFetchLiveForm;