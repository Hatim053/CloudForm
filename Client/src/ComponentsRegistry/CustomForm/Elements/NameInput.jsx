import FieldShell from "./FieldShell.jsx";
import { isObject } from "../fieldHelpers.js";

// unique Id : cf001ni
// label and placeholder are {"01" : "First Name" , "02" : "Last Name"} , the answer is {"01" : "..." , "02" : "..."}
function NameInput({ element , id , value , onChange , theme , readOnly , error }) {
  const labels = isObject(element.label) ? element.label : {};
  const placeholders = isObject(element.placeholder) ? element.placeholder : {};
  const current = isObject(value) ? value : {};
  const parts = [["01" , "First name" , "given-name"] , ["02" , "Last name" , "family-name"]];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {parts.map(([key , fallback , autoComplete]) => (
        <FieldShell key={key} id={`${id}-${key}`} label={labels[key] || fallback} required={element.isRequired === true} theme={theme} error={key === "01" ? error : undefined}>
          <input
            id={`${id}-${key}`}
            type="text"
            autoComplete={autoComplete}
            placeholder={placeholders[key] || labels[key] || fallback}
            value={current[key] ?? ""}
            readOnly={readOnly}
            aria-invalid={Boolean(error)}
            onChange={(event) => onChange({ ...current , [key] : event.target.value })}
            className={theme.input}
          />
        </FieldShell>
      ))}
    </div>
  );
}

export default NameInput;