import { useState } from "react";

// unique Id : cf001ni
function NameInput({ LABEL_CLS , GLASS_FOCUS , GLASS , INPUT_CLS , formData , setFormData , label }) {
  const [focused, setFocused] = useState(false);

  return (<div className="grid grid-cols-2 gap-3">
    <div>
      <label className={LABEL_CLS}>{label["01"]}</label>
      <input
        type="text"
        placeholder={label["01"]}
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , [label["01"]] : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
    <div>
      <label className={LABEL_CLS}>{label["02"]}</label>
      <input
        type="text"
        placeholder={label["02"]}
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , [label["02"]] : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  </div>)
}


export default NameInput;