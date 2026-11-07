import { useId , useRef , useState } from "react";
import { getSafeUrl } from "../../utils/safeUrl.js";
import { getFormTheme } from "./formTheme.js";
import { isObject , isEmptyValue , validateElement } from "./fieldHelpers.js";
import NameInput from "./Elements/NameInput.jsx";
import ContactNumberInput from "./Elements/ContactNumberInput.jsx";
import DateAndTimeInput from "./Elements/DateAndTimeInput.jsx";
import DropdownSelect from "./Elements/DropdownSelect.jsx";
import EmailInput from "./Elements/EmailInput.jsx";
import LongTextInput from "./Elements/LongTextInput.jsx";
import MultiFileInput from "./Elements/MultiFileInput.jsx";
import MultiSelectInput from "./Elements/MultiSelectInput.jsx";
import ShortTextInput from "./Elements/ShortTextInput.jsx";
import SingleFileInput from "./Elements/SingleFileInput.jsx";
import SocialHandleInput from "./Elements/SocialHandleInput.jsx";
import StarRating from "./Elements/StarRating.jsx";
import DateInput from "./Elements/DateInput.jsx";
import TimeInput from "./Elements/TimeInput.jsx";

// unique Id : cf001
// every previewData field arrives as a flat prop (FormPreview and the live page spread previewData into this component)
// isPreview : true inside the builder -> nothing is submitted
// onAnswer(elementId , value) : called on every change , onSubmit(answers) : async , called once on submit , answers = { [elementId] : value }
// uploadFile(file) : optional , stores a file and resolves { url } . Without it the file fields are left out of a live page
//
// the form is drawn from inputElements : each element's "name" (its type) picks the component below , the element's id keys the answer

const ELEMENTS = {
  "name" : NameInput,
  "phone number" : ContactNumberInput,
  "date & time" : DateAndTimeInput,
  "dropdown" : DropdownSelect,
  "email" : EmailInput,
  "long text" : LongTextInput,
  "multi-files" : MultiFileInput,
  "multi-select" : MultiSelectInput,
  "shorttext" : ShortTextInput,
  "single-file" : SingleFileInput,
  "socials" : SocialHandleInput,
  "rating-scale" : StarRating,
  "date" : DateInput,
  "time" : TimeInput
};
const FILE_KINDS = ["multi-files" , "single-file"];

function CustomForm({
  avatarImgSrc,
  pageBackground = "#EEE0CC",
  formBackground = "#FFFFFF",
  backgroundImage,
  submitButtonName,
  successHeading,
  successMessage,
  inputElements,
  heading,
  subHeading,
  uploadFile,
  isPreview = false,
  onAnswer,
  onSubmit
}) {
  const formId = useId(); // keeps the dom ids unique even when the page holds other forms
  const formRef = useRef(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [failedAvatar, setFailedAvatar] = useState(null);

  const theme = getFormTheme(formBackground);
  const canUpload = typeof uploadFile === "function";

  // unknown element types , repeated ids and (on a live page without storage) file fields are left out
  const seenIds = new Set();
  const elements = (Array.isArray(inputElements) ? inputElements : []).flatMap((element) => {
    if(!isObject(element) || typeof element.id !== "string" || !element.id || seenIds.has(element.id)) return [];
    const kind = typeof element.name === "string" ? element.name.trim().toLowerCase() : "";
    if(!Object.prototype.hasOwnProperty.call(ELEMENTS , kind)) return [];
    if(FILE_KINDS.includes(kind) && !canUpload && !isPreview) return [];
    seenIds.add(element.id);
    return [{ element , kind }];
  });

  const setValue = (id , next) => {
    setValues((current) => ({ ...current , [id] : next }));
    setErrors((current) => {
      if(!current[id]) return current;
      const { [id] : removed , ...rest } = current;
      return rest;
    });
    onAnswer?.(id , next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isPreview || isSubmitting) return;

    const problems = {};
    for(const { element , kind } of elements) {
      const message = validateElement(kind , element , values[element.id]);
      if(message) problems[element.id] = message;
    }
    setErrors(problems);

    if(Object.keys(problems).length > 0) {
      setTimeout(() => {
        const invalid = formRef.current?.querySelector('[aria-invalid="true"]');
        if(invalid) invalid.focus?.();
        else formRef.current?.querySelector('[role="alert"]')?.scrollIntoView?.({ block : "center" });
      } , 0);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit?.(Object.fromEntries(Object.entries(values).filter(([ , value]) => !isEmptyValue(value))));
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // creator supplied images : https only , and the avatar falls back to nothing when it can't load
  const backgroundUrl = getSafeUrl(backgroundImage , ["https:"]);
  const avatarUrl = getSafeUrl(avatarImgSrc , ["https:"]);
  const showAvatar = Boolean(avatarUrl) && failedAvatar !== avatarUrl;

  return (
    <div
      className={`flex w-full items-center justify-center p-4 sm:p-6 ${isPreview ? "" : "min-h-screen"}`}
      style={{
        backgroundColor : pageBackground,
        ...(backgroundUrl && { backgroundImage : `url("${encodeURI(backgroundUrl)}")` , backgroundSize : "cover" , backgroundPosition : "center" })
      }}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl"
        style={{ background : formBackground , boxShadow : "0 24px 64px rgba(0,0,0,0.35)" }}
      >
        <div className="p-5 sm:p-7">
          {isSubmitted ? (
            <div role="status" className="py-6 text-center">
              <h2 className={`break-words text-lg font-bold tracking-tight ${theme.heading}`}>{successHeading || "Thank you!"}</h2>
              <p className={`mt-2 break-words text-sm ${theme.subheading}`}>{successMessage || "Your response has been sent."}</p>
            </div>
          ) : (
            <>
              {/* Avatar + heading */}
              <div className="mb-7 flex flex-col items-center">
                {showAvatar && (
                  <div className="mb-3 h-20 w-20 overflow-hidden rounded-full" style={{ background : "#EEE0CC" , border : "3px solid rgba(255,255,255,0.12)" , boxShadow : "0 8px 24px rgba(0,0,0,0.3)" }}>
                    <img
                      className="h-full w-full object-cover"
                      src={avatarUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      decoding="async"
                      onError={() => setFailedAvatar(avatarUrl)}
                    />
                  </div>
                )}
                {heading && <h2 className={`break-words text-center text-lg font-bold tracking-tight ${theme.heading}`}>{heading}</h2>}
                {subHeading && <p className={`mt-1 break-words text-center text-xs ${theme.subheading}`}>{subHeading}</p>}
              </div>

              <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-5">
                {elements.map(({ element , kind }) => {
                  const Element = ELEMENTS[kind];
                  return (
                    <Element
                      key={element.id}
                      element={element}
                      id={`${formId}-${element.id}`}
                      value={values[element.id]}
                      onChange={(next) => setValue(element.id , next)}
                      theme={theme}
                      readOnly={isPreview}
                      error={errors[element.id]}
                      uploadFile={uploadFile}
                    />
                  );
                })}

                {/* submit button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[2.75rem] flex-1 rounded-2xl py-3.5 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] motion-reduce:transform-none disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background : "linear-gradient(135deg,rgba(245,166,35,0.9),rgba(230,140,10,0.95))" , color : "#1a0f00" , boxShadow : "0 8px 24px rgba(245,166,35,0.25)" }}
                  >
                    {isSubmitting ? "Submitting..." : (submitButtonName || "Submit")}
                  </button>
                </div>

                {submitError && (
                  <p role="alert" className={`break-words text-center text-sm ${theme.error}`}>{submitError}</p>
                )}

                <p className={`mt-2 text-center text-[10px] uppercase tracking-widest ${theme.footer}`}>
                  Powered by CloudForm ✦
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomForm;