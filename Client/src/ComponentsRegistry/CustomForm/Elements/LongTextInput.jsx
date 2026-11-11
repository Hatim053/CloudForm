import FieldShell from "./FieldShell.jsx";

// unique Id : cf001lti
// 5000 characters is the most the server accepts for one answer
function LongTextInput({ element , id , value , onChange , theme , readOnly , error }) {
  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error}>
      <textarea
        id={id}
        rows={3}
        placeholder={element.placeholder}
        value={typeof value === "string" ? value : ""}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        maxLength={5000}
        onChange={(event) => onChange(event.target.value)}
        className={`${theme.input} resize-none`}
      />
    </FieldShell>
  );
}

export default LongTextInput;