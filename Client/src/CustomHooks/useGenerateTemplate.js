import { useCallback, useEffect, useRef, useState } from "react";

const CLIENT_TIMEOUT_MS = 45000; // the server gives up on the AI provider after 25 seconds , this is only a safety net
const GENERIC_ERROR = "Something went wrong while creating your page. Please try again.";
const LOGIN_ERROR = "Please log in again to create a page with AI.";

// POST /ai-template/generate -> { templateId , previewData }
// generate(prompt)          : a new page
// generate(prompt , draft)  : changes the page described by draft = { templateId , previewData }
// it resolves with the new draft , or with null after setting `error` (a sentence that is safe to show to the creator)
function useGenerateTemplate() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => () => controllerRef.current?.abort() , []);

  const clearError = useCallback(() => setError(null) , []);

  const generate = useCallback(async (prompt , current) => {
    controllerRef.current?.abort(); // only the newest request counts
    const controller = new AbortController();
    controllerRef.current = controller;

    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    } , CLIENT_TIMEOUT_MS);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai-template/generate` , {
        method : "POST",
        credentials : "include", // the access token lives in a cookie
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({
          prompt,
          current : current ? { templateId : current.templateId , previewData : current.previewData } : undefined
        }),
        signal : controller.signal
      });
      const body = await response.json();

      // the auth middleware answers some failures with HTTP 200 and the real code only in the body
      if(!response.ok || body?.status !== 200 || !body?.templateId || !body?.previewData) {
        if([401 , 404 , 406 , 408].includes(body?.status) && /token|log ?in/i.test(body?.message ?? "")) throw new Error(LOGIN_ERROR);
        throw new Error(body?.message ?? GENERIC_ERROR);
      }

      return { templateId : body.templateId , previewData : body.previewData };
    } catch (err) {
      if(err.name === "AbortError") {
        if(timedOut) setError("This is taking longer than expected. Please try again.");
        return null;
      }
      // network failures and non-JSON replies carry technical text , so they get the generic sentence
      setError(err instanceof TypeError || err instanceof SyntaxError ? GENERIC_ERROR : err.message || GENERIC_ERROR);
      return null;
    } finally {
      clearTimeout(timer);
      if(controllerRef.current === controller) setIsLoading(false);
    }
  } , []);

  return { generate, isLoading, error, clearError };
}

export default useGenerateTemplate;