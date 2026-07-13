

// unique Id : cf001ds
function DropdownSelect({ label, optionList, disabled, value , formData , setFormData}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <div className="relative">
        <select
          value={(formData[label] || value)}
          onChange={(e) => setFormData({...formData , [label] : e.target.value})}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={focused ? GLASS_FOCUS : GLASS}
          className={`${INPUT_CLS} appearance-none pr-8 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <option value="">{`Select ${label}`}</option>
          {optionList.map(c => <option key={c} className="bg-[#3a2604]">{c}</option>)}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
      </div>
    </div>
  );
}


export default DropdownSelect;