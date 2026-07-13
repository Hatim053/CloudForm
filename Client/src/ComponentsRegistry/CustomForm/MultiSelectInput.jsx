

// unique Id : cf001msi
function MultiSelectInput({ label, optionList, formData  , setFormData }) { 


  const handleToggle = (value) => {
    if(formData[label]) {
       const updatedValues = formData[label].includes(value) ? formData[label].filter((val) => val !== value) : [...formData[label] , value];
       setFormData({...formData , [label] : updatedValues});
    } else {
        setFormData({...formData , [label] : [value]});
    }
  };

  return (
    <div>
      <label className={LABEL_CLS}>
        {label} <span className="normal-case font-normal text-white/20">(select all)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {optionList.map(option => (
          <button key={option} type="button" onClick={() => handleToggle(option)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            style={formData[label]&& formData[label].includes(option)
              ? { background: "rgba(245,166,35,0.25)", border: "1px solid rgba(245,166,35,0.6)", color: "#f5c842" }
              : { ...GLASS, color: "rgba(255,255,255,0.4)" }}>
            {formData[label] && formData[label].includes(option) && "✓ "}{option}
          </button>
        ))}
      </div>
    </div>
  );
}


export default MultiSelectInput;