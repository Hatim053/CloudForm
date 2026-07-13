
// unique Id : cf001ni
function NameInput({ formData , setFormData }) {
  const [focused, setFocused] = useState(false);

  return (<div className="grid grid-cols-2 gap-3">
    <div>
      <label className={LABEL_CLS}>"First Name"</label>
      <input
        type="text"
        placeholder="First"
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , "firstName" : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
    <div>
      <label className={LABEL_CLS}>"Last Name"</label>
      <input
        type="text"
        placeholder="Last"
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , "lastName" : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  </div>)
}


export default NameInput;