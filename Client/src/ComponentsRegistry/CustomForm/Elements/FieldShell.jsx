// the label + error line around every control , so all fields look and behave the same.
// group : for widgets without one input (chips , stars) , the label then names the whole group
function FieldShell({ id , label , required = false , hint , error , theme , group = false , children }) {
  const labelClass = `mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] ${theme.label}`;
  const labelContent = (
    <>
      {label}
      {required && <span aria-hidden="true"> *</span>}
      {hint && <span className={`ml-1 font-normal normal-case tracking-normal ${theme.hint}`}>{hint}</span>}
    </>
  );

  return (
    <div role={group ? "group" : undefined} aria-labelledby={group && label ? `${id}-label` : undefined}>
      {label && (group
        ? <span id={`${id}-label`} className={labelClass}>{labelContent}</span>
        : <label htmlFor={id} className={labelClass}>{labelContent}</label>)}
      {children}
      {error && <p id={`${id}-error`} role="alert" className={`mt-1.5 text-xs ${theme.error}`}>{error}</p>}
    </div>
  );
}

export default FieldShell;