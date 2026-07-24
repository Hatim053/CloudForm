import { Bell , ArrowUpRight } from "lucide-react";


// unique Id : ic001
function InfluencerCard({
  name = "@zakirkhanlive",
  banner = "MUMBAI RESIDENCY | LAST FEW SHOWS | LIVE NOW 🚨",
  avatar = "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/famous-places-in-bhopal_0_1200.jpg.webp",
  socials = [],
  links = [],
  backgroundColorHexcode = "#6b5a14",
  cardColorHexcode = "#8a7218"
}) {
  const defaultSocials = [
    { platform: "Twitter",   handle: "@zakirkhan",   url: "https://github.com/Hatim053?tab=repositories", color: "from-blue-400 to-blue-600",   icon: "𝕏",  followers: "1.2M" },
    { platform: "Instagram", handle: "@zakirkhan",   url: "#", color: "from-purple-400 to-pink-500", icon: "📷", followers: "8.4M" },
    { platform: "YouTube",   handle: "@zakirkhan",   url: "#", color: "from-red-400 to-red-700",     icon: "▶️", followers: "12M"  },
    { platform: "LinkedIn",  handle: "/in/zakir",    url: "#", color: "from-blue-600 to-blue-900",   icon: "💼", followers: "120K" },
  ];

  const defaultLinks = [
    {text: "Mumbai Residency | 12th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 13th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 14th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 19th June - 4PM & 9PM" , url : "#"}
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;
  const displayLinks   = links.length   > 0 ? links   : defaultLinks;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6" style={{backgroundColor : backgroundColorHexcode}}>
      <div className="w-full max-w-md rounded-3xl p-5 sm:p-7 shadow-2xl" style={{backgroundColor : cardColorHexcode}}>
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-[#f5e9c2]/20 flex items-center justify-center text-[#f5e9c2]">
            <Bell className="h-4 w-4" />
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-semibold text-[#f5e9c2]">
            Subscribe
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Profile */}
        <div className="mt-5 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-[#f5e9c2] overflow-hidden ring-4 ring-[#6b5a14]">
            {avatar ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full grid place-items-center text-3xl">😎</div>
            )}
          </div>
          <h1 className="mt-3 text-xl font-bold text-[#f5e9c2]">{name}</h1>
          
        </div>

        {/* Dynamic social cards (replaces black rectangles) */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {displaySocials.map((social, i) => (
            <a
              key={i}
              href={social.url || "#"}
              className="group relative overflow-hidden rounded-2xl bg-[#1f1f1f] p-4 transition-transform hover:-translate-y-0.5"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative z-10 flex flex-col gap-1.5">
                <div className="text-2xl">{social.icon}</div>
                <div className="text-[11px] uppercase tracking-wide text-[#f5e9c2]/60 group-hover:text-white/80">
                  {social.platform}
                </div>
                <div className="text-sm font-semibold text-[#f5e9c2] group-hover:text-white truncate">
                  {social.handle}
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-base font-bold text-[#f5e9c2] group-hover:text-white">
                    {social.followers}
                  </span>
                  <span className="text-[10px] text-[#f5e9c2]/60 group-hover:text-white/70">
                    Followers
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-5 rounded-xl bg-[#1f1f1f] px-4 py-3 text-center text-xs font-semibold text-[#f5e9c2]">
          {banner}
        </div>

        {/* Link list */}
        <div className="mt-4 space-y-2.5">
          {displayLinks.map((linkObj, i) => (
            <a
              key={i}
              href={linkObj.url || "#"}
              className="flex items-center justify-between rounded-xl bg-[#f5e9c2] px-4 py-3 text-sm font-medium text-[#1f1f1f] hover:bg-white transition"
            >
              <span className="truncate">{linkObj.text}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;