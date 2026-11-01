import { useId , useState } from "react";
import { User , Mail , Phone , Calendar } from "lucide-react";
const ICONS = { User , Mail , Phone , Calendar };

// only these input types are rendered , anything else in the data becomes a plain text box
const INPUT_TYPES = ["text" , "email" , "tel" , "date" , "time" , "number" , "url"];
const AUTOCOMPLETE_BY_TYPE = { email : "email" , tel : "tel" };

function ScheduleForm({
  heading,
  subHeading,
  backgroundColorHexcode = "#FEF3C7",
  submitButtonName,
  submitButtonText, // the old name of submitButtonName , still read so existing data keeps working
  successHeading,
  successMessage,
  inputElements,
  isPreview = false,
  onAnswer,
  onSubmit
}) {
  const formId = useId(); // keeps the dom ids unique even when the page holds other forms
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // elements without an id (or a repeated id) can't be told apart , so they are skipped
  const seenIds = new Set();
  const elements = (Array.isArray(inputElements) ? inputElements : []).filter((element) => {
    if(!element || typeof element.id !== "string" || !element.id || seenIds.has(element.id)) return false;
    seenIds.add(element.id);
    return true;
  });

  const handleChange = (id , value) => {
    setValues((current) => ({ ...current , [id] : value }));
    onAnswer?.(id , value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isPreview || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit?.(values);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex w-full items-center justify-center p-4 sm:p-6 ${isPreview ? "" : "min-h-screen"}`}
      style={{backgroundColor : backgroundColorHexcode}}
    >
      <div className="w-full max-w-[420px] bg-white border border-neutral-200 rounded-xl p-5 sm:p-8">
        {isSubmitted ? (
          <div className="text-center py-4" role="status">
            <h2 className="text-xl font-medium text-neutral-900 break-words">{successHeading || "Request received"}</h2>
            <p className="text-sm text-neutral-500 mt-2 break-words">{successMessage || "Thanks! We'll be in touch shortly."}</p>
          </div>
        ) : (
          <>
            {heading && <h2 className="text-xl font-medium text-neutral-900 break-words">{heading}</h2>}
            {subHeading && <p className="text-sm text-neutral-400 mt-1 break-words">{subHeading}</p>}

            <form className={`${heading || subHeading ? "mt-6" : ""} space-y-4`} onSubmit={handleSubmit} noValidate={isPreview}>
              {elements.map(({ id, icon, label, placeholder, type, isRequired }) => {
                const Icon = ICONS[icon] ?? User;
                const inputType = INPUT_TYPES.includes(type) ? type : "text";
                const domId = `${formId}-${id}`;
                const labelText = typeof label === "string" && label ? label : id;

                return (
                  <div key={id} className="relative">
                    <Icon aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none z-10" />
                    <input
                      type={inputType}
                      id={domId}
                      name={id}
                      placeholder={typeof placeholder === "string" ? placeholder : ""}
                      autoComplete={id === "name" ? "name" : AUTOCOMPLETE_BY_TYPE[inputType]}
                      required={isRequired === true}
                      readOnly={isPreview}
                      value={values[id] ?? ""}
                      onChange={(e) => handleChange(id , e.target.value)}
                      className="peer w-full rounded-lg border border-neutral-200 pl-9 pr-3 pt-5 pb-1.5 text-base sm:text-sm outline-none focus:border-neutral-400 bg-white text-neutral-900 transition-colors placeholder:text-transparent focus:placeholder:text-neutral-300"
                    />
                    <label
                      htmlFor={domId}
                      className="absolute left-9 top-1/2 -translate-y-1/2 max-w-[calc(100%-3rem)] truncate text-sm text-neutral-400 pointer-events-none transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
                    >
                      {labelText}{isRequired === true ? " *" : ""}
                    </label>
                  </div>
                );
              })}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white py-3 text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] motion-reduce:transform-none transition-all border-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Submitting..." : (submitButtonName || submitButtonText || "Schedule demo")}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>

            {submitError && (
              <p role="alert" className="text-center text-red-500 text-sm mt-3 break-words">
                {submitError}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ScheduleForm;