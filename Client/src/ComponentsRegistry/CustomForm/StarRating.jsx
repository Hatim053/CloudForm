// unique Id : cf001sr
function StarRating({ label , formData , setFormData }) {
  const [hover, setHover] = useState(0);

  return (
    <div>
      <label className={LABEL_CLS}>{label || "Rate Us"}<span className="normal-case font-normal text-white/20">(1–5)</span></label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} type="button"
            onClick={() => setFormData({...formData , [label] : i})}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl transition-all hover:scale-125 active:scale-95"
          >
            
            <span style={{ color: (hover || (formData[label] || 0)) >= i ? "#f5a623" : "rgba(255,255,255,0.12)" }}>★</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/35 mt-1.5"></p>
    </div>
  );
}

export default StarRating;