
// unique Id : cf001ei
function EmailInput({ formData , setFormData }) {
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