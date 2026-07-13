

// unique Id : cf001mfi
function MultiFileInput({ label = "FilesUpload" , formData , setFormData , SectionLabel}) {
  
  const handleFileUpload = (e) => {
   const multiFiles = Array.from(e.target.files).slice(0, 5);
   setFormData({...formData , [label] : multiFiles});
  };
  const handleRemoveFile = (fileIdx) => {
   const updatedFiles = formData[label].filter((_, i) => i !== fileIdx);
   setFormData({...formData , [label] : updatedFiles});
  }

  return ( <>
   <SectionLabel>Uploads</SectionLabel>
  <div>
              <label className={LABEL_CLS}>Attachments <span className="normal-case font-normal text-white/20">(up to 5)</span></label>
              <label className="flex flex-col items-center gap-2 py-5 rounded-2xl cursor-pointer transition-all hover:brightness-110 text-center"
                style={{ ...GLASS, borderStyle: "dashed" }}>
                <span className="text-2xl" style={{ color: "rgba(245,166,35,0.4)" }}>⊕</span>
                <p className="text-sm font-semibold text-white/40">Drop files or browse</p>
                <p className="text-xs text-white/20">PDF, ZIP, PNG, JPG — 10MB each</p>
                <input type="file" multiple accept=".pdf,.zip,.png,.jpg,.jpeg" className="hidden"
                  onChange={handleFileUpload} />
              </label>
              {formData[label]?.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData[label].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={GLASS}>
                      <span className="text-white/30 text-xs">◫</span>
                      <span className="flex-1 text-xs text-white/60 truncate">{f.name}</span>
                      <span className="text-[10px] text-white/25">{(f.size / 1024).toFixed(0)}KB</span>
                      <button type="button" onClick={() => handleRemoveFile(i)}
                        className="text-white/20 hover:text-red-400 text-sm transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
            )
};

export default MultiFileInput;