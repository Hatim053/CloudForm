import React from "react";


function Header() {


    return ( <header className="w-full bg-[#0a0a0a] font-dm">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 border-b border-white/5">
        <span className="font-syne font-extrabold text-white text-sm tracking-tight">VOID</span>

        <div className="hidden md:flex items-center gap-6">
          {["Product", "Pricing", "About"].map(item => (
            <a key={item} href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Sign in</a>
          <button className="px-4 py-1.5 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-white/50 hover:bg-white/5 transition-all">
            Get access
          </button>
        </div>

        <button className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(v => !v)}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-4 py-4 border-b border-white/10 space-y-1 bg-[#0d0d0d]">
          {["Product", "Pricing", "About"].map(item => (
            <a key={item} href="#" className="block px-2 py-2 text-sm font-medium text-white/50 hover:text-white">{item}</a>
          ))}
          <div className="pt-2 space-y-2">
            <button className="w-full py-2 border border-white/20 text-white text-sm font-semibold rounded-lg">Get access</button>
          </div>
        </div>
      )}

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


export default Header;