import FieldShell from "./FieldShell.jsx";

// unique Id : cf001cni
// a phone number is text , not a number : "+91 98765 43210" and a leading 0 must survive
function ContactNumberInput({ element , id , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error}>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder={element.placeholder}
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        maxLength={25}
        onChange={(event) => onChange(event.target.value)}
        className={theme.input}
      />
    </FieldShell>
  );
}

export default ContactNumberInput;