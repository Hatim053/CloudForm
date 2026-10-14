import { useState } from "react";

// unique Id : cf001cni
function ContactNumberInput({LABEL_CLS , GLASS_FOCUS , GLASS , INPUT_CLS , formData , setFormData , label }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>{label}</label>
      <input
        type="number"
        placeholder="+91 98765 43210"
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , [label] : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  );
};

export default ContactNumberInput;
