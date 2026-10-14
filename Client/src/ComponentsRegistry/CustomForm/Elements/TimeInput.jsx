// unique Id : cf001ti
function TimeInput({ label = "Time" , formData , setFormData , LABEL_CLS , INPUT_CLS , GLASS }) {
  return (<div>
    <label className={LABEL_CLS}>{label || "Arrival Time"}</label>
    <input type="time" style={GLASS}
      className={`${INPUT_CLS} [color-scheme:dark]`} 
      onChange={(e) => setFormData({...formData , [label] : e.target.value})}
      />
  </div>
  );
};

export default TimeInput;