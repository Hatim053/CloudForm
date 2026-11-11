import FieldShell from "./FieldShell.jsx";

// unique Id : cf001msi
// the answer is the list of the chosen options
function MultiSelectInput({ element , id , value , onChange , theme , readOnly , error }) {
  const options = (Array.isArray(element.optionList) ? element.optionList : []).filter((option) => typeof option === "string" && option.trim() !== "");
  const chosen = Array.isArray(value) ? value : [];

  const toggle = (option) => onChange(chosen.includes(option) ? chosen.filter((item) => item !== option) : [...chosen , option]);

  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} hint="(select all)" theme={theme} error={error} group>
      <div className="flex flex-wrap gap-2">
        {options.map((option , index) => {
          const selected = chosen.includes(option);
          return (
            <button
              key={`${option}-${index}`}
              type="button"
              aria-pressed={selected}
              disabled={readOnly}
              onClick={() => toggle(option)}
              className={`min-h-[2.25rem] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 motion-reduce:transform-none disabled:cursor-default ${selected ? theme.chipActive : theme.chip}`}
            >
              {selected && "✓ "}{option}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}

export default MultiSelectInput;