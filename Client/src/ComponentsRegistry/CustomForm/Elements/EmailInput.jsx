import { useState } from "react";

// unique Id : cf001ei
function EmailInput({ LABEL_CLS , GLASS_FOCUS , GLASS , INPUT_CLS , formData , setFormData }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>Email Address</label>
      <input
        type="email"
        placeholder="you@gmail.com"
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , "email" : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  );
}

export default EmailInput;