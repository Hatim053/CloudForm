import { useCallback, useEffect, useState } from "react";

// one place for every authenticated GET of the creator screens (cookie token + body.status check)
// path : e.g. "/live-form-response/my-forms" , pass null to switch it off
// the previous data stays in place while a new path loads , so a page change never flashes an empty screen ,
// the wrapper hooks decide whether that old data still belongs to what is being shown
function useGetJson(path) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(path));
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const reload = useCallback(() => setReloadCount((count) => count + 1) , []);

  useEffect(() => {
    if(!path) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const getJson = async () => {
      setIsLoading(true);
      setError(null);
      setErrorStatus(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${path}` , {
          credentials : "include", // the access token lives in a cookie
          signal : controller.signal
        });
        const body = await response.json();

        // the auth middlewares answer some failures with HTTP 200 and the real code only in the body
        if(!response.ok || body?.status !== 200) {
          const failure = new Error(body?.message ?? "Could not load the data");
          failure.code = body?.status ?? response.status;
          throw failure;
        }

        setData(body);
      } catch (err) {
        if(err.name === "AbortError") return;
        console.log("could not load the data" , err);
        setError(err instanceof SyntaxError ? "Could not load the data" : err.message || "Could not load the data");
        setErrorStatus(err.code ?? null);
      } finally {
        // an aborted request belongs to an old path / unmounted page , so it must not touch state
        if(!controller.signal.aborted) setIsLoading(false);
      }
    };

    getJson();
    return () => controller.abort();
  }, [path , reloadCount]);

  return { data, isLoading, error, errorStatus, reload };
}

export default useGetJson;