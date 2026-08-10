import React from "react";


function HeroSection() {


    return ( <header className="w-full bg-[#0a0a0a] font-dm">
     

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          v2.0 just shipped — see what's new
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Build forms that<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#a78bfa,#f472b6)" }}>
            actually convert
          </span>
        </h1>

        <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
          The modern form builder for teams who care about design and results. No code, no limits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-[#0a0a0a] rounded-xl" style={{ background: "linear-gradient(135deg,#f0ede8,#ffffff)" }}>
            Start building free →
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white/70 rounded-xl border border-white/10 hover:border-white/30 hover:text-white transition-all">
            View live demos
          </button>
        </div>
      </div>
    </header>)
};


export default HeroSection;