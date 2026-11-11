import FieldShell from "./FieldShell.jsx";

// unique Id : cf001dsi
// optionList is a list of strings. A dropdown without options still renders (the stored data must provide them)
function DropdownSelect({ element , id , value , onChange , theme , readOnly , error }) {
  const options = (Array.isArray(element.optionList) ? element.optionList : []).filter((option) => typeof option === "string" && option.trim() !== "");
  const current = typeof value === "string" ? value : "";

  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error}>
      <div className="relative">
        <select
          id={id}
          value={current}
          disabled={readOnly}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          className={`${theme.input} appearance-none pr-9`}
        >
          <option value="" className={theme.option}>{element.placeholder || "Select an option"}</option>
          {options.map((option , index) => (
            <option key={`${option}-${index}`} value={option} className={theme.option}>{option}</option>
          ))}
        </select>
        <span aria-hidden="true" className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs ${theme.faint}`}>▼</span>
      </div>
    </FieldShell>
  );
}

export default DropdownSelect;