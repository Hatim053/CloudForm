// unique Id : cf001shi
function SocialHandleInput({ formData , setFormData , GLASS , previewData }) {
 

const handleSocialInput = (e) => {
  const input = e.target.value();
  setFormData({...formData , [previewData.id] : input});

};

  return ( 
    
      <div className="space-y-2.5">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:brightness-110"
                  style={GLASS}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                    style={{ background: previewData?.color }}>
                    {previewData?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{previewData?.label}</p>
                    <input type="text" placeholder={previewData?.placeholder}
                      value={formData?.[previewData?.id]} 
                      onChange={handleSocialInput}
                      className="w-full text-sm text-white bg-transparent outline-none placeholder-white" />
                  </div>
                  {previewData?.id && <span className="text-[#f5a623] text-xs font-bold flex-shrink-0">✓</span>}
                </div>
                </div>
  )
}

export default SocialHandleInput;