// a small segmented control : options = [{ value , label }]
function StatusToggle({ value , onChange , options , label = "Filter by status" }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={
              selected
                ? "cursor-pointer whitespace-nowrap rounded-full bg-[#1a2b21] px-4 py-1.5 text-sm font-medium text-white"
                : "cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-[#5c6b60] hover:bg-[#f4f3ef]"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default StatusToggle;