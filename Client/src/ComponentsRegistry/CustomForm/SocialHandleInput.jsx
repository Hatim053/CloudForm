// unique Id : cf001shi
function SocialHandleInput({ selectedSocialHandle , formData , setFormData , GLASS}) {
  const SOCIALS = {
  "twitter" :{ id: "twitter", label: "Twitter / X", icon: "𝕏", placeholder: "@username", color: "#000" },
  "linkedin" : { id: "linkedin", label: "LinkedIn", icon: "in", placeholder: "linkedin.com/in/you", color: "#0077b5" },
   "github" : { id: "github", label: "GitHub", icon: "⌥", placeholder: "github.com/you", color: "#24292e" },
  "instagram" : { id: "instagram", label: "Instagram", icon: "◈", placeholder: "@handle", color: "#e1306c" },
};
const handleSocialInput = (e) => {
    const socials = !formData["socials"] ? {[selectedSocialHandle] : e.target.value} : {...formData["socials"] , [selectedSocialHandle] : e.target.value};
    const newFormData = {...formData , "socials" : socials};
    setFormData(newFormData);

};

  return ( <div className="space-y-2.5">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:brightness-110"
                  style={GLASS}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                    style={{ background: SOCIALS[selectedSocialHandle].color }}>
                    {SOCIALS[selectedSocialHandle].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{SOCIALS[selectedSocialHandle].label}</p>
                    <input type="text" placeholder={SOCIALS[selectedSocialHandle].placeholder}
                      value={formData["socials"]?.[selectedSocialHandle]}
                      onChange={handleSocialInput}
                      className="w-full text-sm text-white bg-transparent outline-none placeholder-white" />
                  </div>
                  {SOCIALS[selectedSocialHandle].id && <span className="text-[#f5a623] text-xs font-bold flex-shrink-0">✓</span>}
                </div>
            </div>)
}

export default SocialHandleInput;