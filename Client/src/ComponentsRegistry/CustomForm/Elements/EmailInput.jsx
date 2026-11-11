import FieldShell from "./FieldShell.jsx";

// unique Id : cf001ei
function EmailInput({ element , id , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error}>
      <input
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={element.placeholder}
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        maxLength={254}
        onChange={(event) => onChange(event.target.value)}
        className={theme.input}
      />
    </FieldShell>
  );
}

export default EmailInput;