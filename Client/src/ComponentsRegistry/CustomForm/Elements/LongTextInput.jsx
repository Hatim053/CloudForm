

// unique Id : cf001lti
function LongTextInput({ LABEL_CLS , GLASS , INPUT_CLS , label, placeholder , formData , setFormData }) {
  
  return (
    <div>
      <label className={LABEL_CLS}>{label || "Message"}</label>
      <textarea rows={3} placeholder={placeholder || "Tell us why you're attending..."}
        style={GLASS}
        onChange={(e) => setFormData({...formData , [label] : e.target.value})}
        className={`${INPUT_CLS} resize-none`} />
    </div>
  );
}


export default LongTextInput;