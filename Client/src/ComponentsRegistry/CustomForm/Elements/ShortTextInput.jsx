import FieldShell from "./FieldShell.jsx";

// unique Id : cf001sti
function ShortTextInput({ element , id , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error}>
      <input
        id={id}
        type="text"
        placeholder={element.placeholder}
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        maxLength={500}
        onChange={(event) => onChange(event.target.value)}
        className={theme.input}
      />
    </FieldShell>
  );
}

export default ShortTextInput;