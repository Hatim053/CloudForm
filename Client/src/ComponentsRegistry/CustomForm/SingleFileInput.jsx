// unique Id : cf001sfi
function SingleFileInput({ label = "Uploads" , formData , setFormData , SectionLabel , setSingleFile }) {
  return (
  <> <SectionLabel>{label}</SectionLabel>
  <div>
              <label className={LABEL_CLS}>Profile Photo</label>
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all hover:brightness-110" style={GLASS}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.2)" }}>
                  <span className="text-[#f5a623] text-base">↑</span>
                </div>
                <div className="flex-1 min-w-0">
                  {formData[label]
                    ? <><p className="text-sm font-semibold text-white truncate">{formData[label].name}</p>
                      <p className="text-xs text-white/30">{(formData[label].size / 1024).toFixed(1)} KB</p></>
                    : <><p className="text-sm font-semibold text-white/50">Tap to upload photo</p>
                      <p className="text-xs text-white/25">PNG, JPG — max 5MB</p></>
                  }
                </div>
                {formData[label] && (
                  <button type="button" onClick={e => { e.preventDefault(); setSingleFile(null); }}
                    className="text-white/20 hover:text-red-400 text-base flex-shrink-0 transition-colors">✕</button>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData({...formData , [label] : e.target.files[0] || null})} />
              </label>
            </div>
            </>)
};

export default SingleFileInput;