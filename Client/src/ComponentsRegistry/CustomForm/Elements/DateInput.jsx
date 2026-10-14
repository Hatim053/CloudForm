

// unique Id : cf001di
function DateInput({ label = "Date" , formData , setFormData , LABEL_CLS , INPUT_CLS , GLASS }) {
  return (
    <div>
      <label className={LABEL_CLS}>{label || "Event Date"}</label>
      <input type="date" style={GLASS}
        className={`${INPUT_CLS} [color-scheme:dark]`} 
        onChange={(e) => setFormData({...formData , [label] : e.target.value})}
        />
    </div>
  );
};

export default DateInput;