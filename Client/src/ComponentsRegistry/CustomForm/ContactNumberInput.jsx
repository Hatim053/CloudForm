// unique Id : cf001cni
function ContactNumberInput({ formData , setFormData }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>Phone Number</label>
      <input
        type="number"
        placeholder="+91 98765 43210"
        style={focused ? GLASS_FOCUS : GLASS}
        onChange={(e) => setFormData({...formData , "contactNumber" : e.target.value})}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  );
};

export default ContactNumberInput;
