import { useId , useLayoutEffect , useRef , useState } from "react";
import { User , Mail , Phone , Calendar } from "lucide-react";
const ICONS = { User , Mail , Phone , Calendar };

// unique Id : sf001
//
// layout : "card" (default , the original look) | "split" | "minimal"
// theme  : "light" (default , the original look) | "dark"
// Pages saved before layout / theme existed have neither prop , so they render exactly as before.
// Any other value falls back to the default.

const LAYOUTS = ["card" , "split" , "minimal"];
const THEMES = ["light" , "dark"];

// the "split" layout uses two columns once the component itself is this wide. It measures its own width (not the screen)
// so the builder preview , which is narrower than the screen , shows the same layout the live page will
const SPLIT_MIN_WIDTH = 560;

// every class is written out in full so Tailwind can find it
const THEME_CLASSES = {
  light : {
    card : "bg-white border border-neutral-200",
    title : "text-neutral-900",
    subtitle : "text-neutral-400",
    successText : "text-neutral-500",
    pageTitle : "text-neutral-900", // minimal layout : text sits straight on the page colour
    pageSubtitle : "text-neutral-600",
    splitBorder : "border-neutral-200",
    panel : "bg-neutral-900", // split layout : the heading panel
    formSide : "bg-white", // split layout : the form side
    icon : "text-neutral-400",
    input : "border-neutral-200 bg-white text-neutral-900 focus:border-neutral-400 focus:placeholder:text-neutral-300",
    label : "text-neutral-400 peer-focus:text-neutral-500",
    button : "bg-neutral-900 text-white hover:bg-neutral-700",
    error : "text-red-500",
  },
  dark : {
    card : "bg-neutral-900 border border-neutral-700",
    title : "text-white",
    subtitle : "text-neutral-400",
    successText : "text-neutral-400",
    pageTitle : "text-white",
    pageSubtitle : "text-neutral-300",
    splitBorder : "border-neutral-700",
    panel : "bg-neutral-800",
    formSide : "bg-neutral-900",
    icon : "text-neutral-500",
    input : "border-neutral-700 bg-neutral-800 text-white focus:border-neutral-500 focus:placeholder:text-neutral-500",
    label : "text-neutral-400 peer-focus:text-neutral-300",
    button : "bg-white text-neutral-900 hover:bg-neutral-200",
    error : "text-red-400",
  },
};

const pickOption = (value , allowed , fallback) => {
  const clean = typeof value === "string" ? value.trim().toLowerCase() : "";
  return allowed.includes(clean) ? clean : fallback;
};

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
  layout = "card",
  theme = "light",
  isPreview = false,
  onAnswer,
  onSubmit
}) {
  const formId = useId(); // keeps the dom ids unique even when the page holds other forms
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const activeLayout = pickOption(layout , LAYOUTS , "card");
  const t = THEME_CLASSES[pickOption(theme , THEMES , "light")];

  // how wide is this component right now ? (measured before the first paint , so there is no flash of the wrong layout)
  const rootRef = useRef(null);
  const [wide, setWide] = useState(false);
  useLayoutEffect(() => {
    const element = rootRef.current;
    if(!element || typeof ResizeObserver === "undefined") return;

    const update = () => setWide(element.clientWidth >= SPLIT_MIN_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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

  /* ---------------- pieces shared by the layouts ---------------- */

  const renderForm = (marginClass) => (
    <form className={`${marginClass} space-y-4`} onSubmit={handleSubmit} noValidate={isPreview}>
      {elements.map(({ id, icon, label, placeholder, type, isRequired }) => {
        const Icon = ICONS[icon] ?? User;
        const inputType = INPUT_TYPES.includes(type) ? type : "text";
        const domId = `${formId}-${id}`;
        const labelText = typeof label === "string" && label ? label : id;

        return (
          <div key={id} className="relative">
            <Icon aria-hidden="true" className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${t.icon} pointer-events-none z-10`} />
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
              className={`peer w-full rounded-lg border pl-9 pr-3 pt-5 pb-1.5 text-base sm:text-sm outline-none transition-colors placeholder:text-transparent ${t.input}`}
            />
            <label
              htmlFor={domId}
              className={`absolute left-9 top-1/2 -translate-y-1/2 max-w-[calc(100%-3rem)] truncate text-sm ${t.label} pointer-events-none transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]`}
            >
              {labelText}{isRequired === true ? " *" : ""}
            </label>
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-2 w-full flex items-center justify-center gap-2 rounded-lg ${t.button} py-3 text-sm font-medium active:scale-[0.98] motion-reduce:transform-none transition-all border-2 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Submitting..." : (submitButtonName || submitButtonText || "Schedule demo")}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  );

  const renderError = (alignClass) => submitError && (
    <p role="alert" className={`${alignClass} ${t.error} text-sm mt-3 break-words`}>
      {submitError}
    </p>
  );

  const renderSuccess = (titleClass , textClass , wrapperClass) => (
    <div className={wrapperClass} role="status">
      <h2 className={`text-xl font-medium ${titleClass} break-words`}>{successHeading || "Request received"}</h2>
      <p className={`text-sm ${textClass} mt-2 break-words`}>{successMessage || "Thanks! We'll be in touch shortly."}</p>
    </div>
  );

  /* ---------------- the three layouts ---------------- */

  // the original design : one card in the middle
  const card = (
    <div className={`w-full max-w-[420px] rounded-xl p-5 sm:p-8 ${t.card}`}>
      {isSubmitted ? renderSuccess(t.title , t.successText , "text-center py-4") : (
        <>
          {heading && <h2 className={`text-xl font-medium ${t.title} break-words`}>{heading}</h2>}
          {subHeading && <p className={`text-sm ${t.subtitle} mt-1 break-words`}>{subHeading}</p>}
          {renderForm(heading || subHeading ? "mt-6" : "")}
          {renderError("text-center")}
        </>
      )}
    </div>
  );

  // one wide card in two halves : the heading on a dark panel , the form beside it (stacked when narrow)
  const hasIntro = Boolean(heading || subHeading);
  const split = (
    <div className={`w-full max-w-3xl overflow-hidden rounded-xl border ${t.splitBorder} ${wide && hasIntro ? "grid grid-cols-[2fr_3fr]" : ""}`}>
      {hasIntro && (
        <div className={`${t.panel} p-6 sm:p-8`}>
          {heading && <h2 className="text-2xl font-semibold text-white break-words">{heading}</h2>}
          {subHeading && <p className="mt-2 text-sm text-neutral-300 break-words">{subHeading}</p>}
        </div>
      )}
      <div className={`${t.formSide} p-5 sm:p-8`}>
        {isSubmitted ? renderSuccess(t.title , t.successText , "text-center py-4") : (
          <>
            {renderForm("")}
            {renderError("text-center")}
          </>
        )}
      </div>
    </div>
  );

  // no card : large left-aligned text straight on the page colour (the theme sets the text colour , so
  // use the dark theme with a dark page colour)
  const minimal = (
    <div className="w-full max-w-md text-left">
      {heading && <h2 className={`text-3xl sm:text-4xl font-semibold leading-tight ${t.pageTitle} break-words`}>{heading}</h2>}
      {subHeading && <p className={`mt-3 text-base ${t.pageSubtitle} break-words`}>{subHeading}</p>}
      {isSubmitted ? renderSuccess(t.pageTitle , t.pageSubtitle , "py-4 mt-6") : (
        <>
          {renderForm(hasIntro ? "mt-8" : "")}
          {renderError("")}
        </>
      )}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`flex w-full items-center justify-center p-4 sm:p-6 ${isPreview ? "" : "min-h-screen"}`}
      style={{backgroundColor : backgroundColorHexcode}}
    >
      {activeLayout === "split" ? split : activeLayout === "minimal" ? minimal : card}
    </div>
  );
}

export default ScheduleForm;