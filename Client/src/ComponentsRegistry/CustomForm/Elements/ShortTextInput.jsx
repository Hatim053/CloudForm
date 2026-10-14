import { useState } from "react";

// unique Id : cf001sti
function ShortTextInput({ label, placeholder , formData , setFormData , LABEL_CLS , GLASS_FOCUS , GLASS , INPUT_CLS }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , [label] : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS} />
    </div>
  );
}

export default ShortTextInput;