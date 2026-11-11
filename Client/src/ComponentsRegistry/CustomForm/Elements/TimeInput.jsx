import FieldShell from "./FieldShell.jsx";

// the bare time box , also used by DateAndTimeInput
function TimeControl({ id , label , required , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={label} required={required} theme={theme} error={error}>
      <input
        id={id}
        type="time"
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={`${theme.input} ${theme.scheme}`}
      />
    </FieldShell>
  );
}

// unique Id : cf001ti
function TimeInput({ element , id , value , onChange , theme , readOnly , error }) {
  return <TimeControl id={id} label={element.label} required={element.isRequired === true} value={value} onChange={onChange} theme={theme} readOnly={readOnly} error={error} />;
}

export { TimeControl };
export default TimeInput;