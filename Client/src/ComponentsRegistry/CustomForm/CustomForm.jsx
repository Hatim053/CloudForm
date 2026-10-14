import { useState } from "react";
import SocialHandleInput from "./Elements/SocialHandleInput";

const INPUT_CLS = "w-full px-4 py-3 text-sm text-white placeholder-white/25 outline-none rounded-2xl transition-all";
const LABEL_CLS = "block text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-2";
const GLASS = {
  background: "rgba(20,12,0,0.45)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
};
const GLASS_FOCUS = {
  background: "rgba(20,12,0,0.55)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,200,80,0.35)",
};


// unique Id : cf001sl
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30 whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px" style={{ background: "#607456" }} />
    </div>
  );
}

function CustomForm({ avatarImgSrc = null , pageBackground = "#EEE0CC" , formBackground = "#FFFFFF" , backgroundImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_Imxv2SYHy8RbEC6pCpI5wIuVWzAsRI41gKrNco-neERtCE-UUBqRvg&s=10" , submitButtonName = "Register Now →" , inputElements , heading , subHeading}) {

    const [formData , setFormData] = useState({});
    const[isSubmitting , setIsSubmitting] = useState(false);


    const handleSubmit = (e) => {
      e.preventDefault();
        setIsSubmitting(true);
        // API call will be made to server
        // AFTER API CALL CHNAGE ISSUBMITTED TO FALSE AGAIN
      console.log('Form Submitted Successfully' , formData);
    };


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundImage: `url(${backgroundImage})` , backgroundColor: pageBackground  }}
    >
      <div
        className="w-full max-w-md relative rounded-3xl overflow-hidden"
        style={{
          background : formBackground,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
        />

        <div className="relative z-10 p-5 sm:p-7">

          {/* ── Avatar + handle ── */}
          <div className="flex flex-col items-center mb-7">
            {avatarImgSrc && <div className="w-20 h-20 rounded-full mb-3 overflow-hidden flex items-center justify-center"
              style={{ background: "#EEE0CC", border: "3px solid rgba(255,255,255,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
              <img className="w-full h-full object-cover" src={avatarImgSrc} />
            </div>}
            <h2 className="text-black text-lg font-bold tracking-tight">{heading}</h2>
            <p className="text-black/50 text-xs mt-1 text-center">{subHeading}</p>
          </div>
          <div className="space-y-5"> 
              <SocialHandleInput />
            {/* ── submit Button ── */}
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg,rgba(245,166,35,0.9),rgba(230,140,10,0.95))", color: "#1a0f00", boxShadow: "0 8px 24px rgba(245,166,35,0.25)" }}
                onClick={handleSubmit}
                >
                {submitButtonName}
              </button>
            </div>

            <p className="text-center text-white/20 text-[10px] tracking-widest uppercase mt-2">
              Powered by FormKit ✦
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomForm;