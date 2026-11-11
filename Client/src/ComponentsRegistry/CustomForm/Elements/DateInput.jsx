import FieldShell from "./FieldShell.jsx";

// the bare date box , also used by DateAndTimeInput
function DateControl({ id , label , required , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={label} required={required} theme={theme} error={error}>
      <input
        id={id}
        type="date"
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={`${theme.input} ${theme.scheme}`}
      />
    </FieldShell>
  );
}

// unique Id : cf001di
function DateInput({ element , id , value , onChange , theme , readOnly , error }) {
  return <DateControl id={id} label={element.label} required={element.isRequired === true} value={value} onChange={onChange} theme={theme} readOnly={readOnly} error={error} />;
}

export { DateControl };
export default DateInput;