 // pre build forms : 
export default function ScheduleForm({ heading, subHeading , backgroundColorHexcode , submitButtonText}) {
  const fields = [
    { icon: User, label: "Full name", type: "text", id: "name" },
    { icon: Mail, label: "Work email", type: "email", id: "email" },
    { icon: Phone, label: "Phone number", type: "tel", id: "phone" },
    { icon: Calendar, label: "Preferred date", type: "date", id: "date" },
  ];
 backgroundColorHexcode =   backgroundColorHexcode ? backgroundColorHexcode : "#FEF3C7";
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="flex items-center justify-center p-6 min-h-[100vh] " style={{backgroundColor : backgroundColorHexcode}}>
      <div className="w-full max-w-[420px] bg-white border border-neutral-200 rounded-xl p-8">
        <h2 className="text-xl font-medium text-neutral-900">{heading || "Book a demo"}</h2>
        <p className="text-sm text-neutral-400 mt-1">{subHeading || "30-minute walkthrough with our team."}</p>

        <form className="mt-6 space-y-4">
          {fields.map(({ icon: Icon, label, type, id }) => (
            <div key={id} className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none z-10" />
              <input
                type={type}
                placeholder=" "
                id={id}
                className="peer w-full rounded-lg border border-neutral-200 pl-9 pr-3 pt-5 pb-1.5 text-sm outline-none focus:border-neutral-400 bg-white text-neutral-900 transition-colors"
              />
              <label
                htmlFor={id}
                className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]"
              >
                {label}
              </label>
            </div>
          ))}

          <button
          type='submit'
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white py-2.5 text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] transition-all border-2"
          
          >
            <Calendar className="h-4 w-4" />
            {submitButtonText || "Schedule demo "}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
export default function WaitlistForm({heading , subHeading , launchDate , backgroundColorHexcode , submitButtonText })  {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
backgroundColorHexcode =   backgroundColorHexcode ? backgroundColorHexcode : "#FEF3C7";
  useEffect(() => {
    // date input format = 2026-7-21
    const targetDate = launchDate ? new Date(launchDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setJoined(true);
  };

  if (joined) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-green-400 to-emerald-500 
                      rounded-3xl p-8 text-white text-center shadow-xl">
        <span className="text-6xl block mb-4">🚀</span>
        <h3 className="text-2xl font-bold">You're on the list!</h3>
        <p className="text-emerald-100 mt-2">We'll notify you when we launch.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6 min-h-[100vh] " style={{backgroundColor : backgroundColorHexcode}}>
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{heading || "Join the Waitlist"}</h2>
        <p className="text-gray-500 mt-2">{subHeading || "Be the first to know when we launch"}</p>
      </div>

      {/* Countdown Timer */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ].map((item, i) => (
          <div key={i} className="bg-indigo-50 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-indigo-600 block">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-xs text-indigo-400">{item.label}</span>
          </div>
        ))}
      </div>

      <form  className="space-y-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl 
                     focus:outline-none focus:border-indigo-500 transition-colors" required />
        <button type="submit"
        onSubmit={handleSubmit}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                     rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
          {submitButtonText || "Join the Waitlist 🚀"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-xs mt-4">
        🔒 We respect your privacy. No spam.
      </p>
    </div>
    </div>
  );
};




// influencers cards : 
export default function InfluencerV1({
  name = "@zakirkhanlive",
  bio = "Zakir's World Tour schedule here",
  banner = "MUMBAI RESIDENCY | LAST FEW SHOWS | LIVE NOW 🚨",
  avatar = "",
  socials = [],
  links = [],
}) {
  const defaultSocials = [
    { platform: "Twitter",   handle: "@zakirkhan",   url: "#", color: "from-blue-400 to-blue-600",   icon: "𝕏",  followers: "1.2M" },
    { platform: "Instagram", handle: "@zakirkhan",   url: "#", color: "from-purple-400 to-pink-500", icon: "📷", followers: "8.4M" },
    { platform: "YouTube",   handle: "@zakirkhan",   url: "#", color: "from-red-400 to-red-700",     icon: "▶️", followers: "12M"  },
    { platform: "LinkedIn",  handle: "/in/zakir",    url: "#", color: "from-blue-600 to-blue-900",   icon: "💼", followers: "120K" },
  ];

  const defaultLinks = [
    "Mumbai Residency | 12th June - 4PM & 9PM",
    "Mumbai Residency | 13th June - 4PM & 9PM",
    "Mumbai Residency | 14th June - 4PM & 9PM",
    "Mumbai Residency | 19th June - 4PM & 9PM",
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;
  const displayLinks   = links.length   > 0 ? links   : defaultLinks;

  return (
    <div className="min-h-screen w-full bg-[#6b5a14] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-3xl bg-[#8a7218] p-5 sm:p-7 shadow-2xl">
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
          <p className="mt-1 text-sm text-[#f5e9c2]/70">{bio}</p>
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
          {displayLinks.map((t, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-between rounded-xl bg-[#f5e9c2] px-4 py-3 text-sm font-medium text-[#1f1f1f] hover:bg-white transition"
            >
              <span className="truncate">{t}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function  CreatorProfileCard ({ name, bio, avatar, socials = [] })  {
  const defaultSocials = [
    { platform: "twitter", url: "#", icon: "𝕏", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
    { platform: "instagram", url: "#", icon: "📷", color: "bg-gray-100 hover:bg-pink-100 text-gray-700" },
    { platform: "linkedin", url: "#", icon: "💼", color: "bg-gray-100 hover:bg-blue-100 text-gray-700" },
    { platform: "website", url: "#", icon: "🌐", color: "bg-gray-100 hover:bg-green-100 text-gray-700" },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto text-center 
                    hover:shadow-2xl transition-all duration-500">
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-indigo-100">
        <img
          src={avatar || "https://via.placeholder.com/200"}
          alt={name || "Creator"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name || "John Doe"}</h3>
      <p className="text-gray-500 mb-6 px-4">
        {bio || "Digital creator sharing insights about design, tech, and creativity."}
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-3 flex-wrap">
        {displaySocials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-11 h-11 rounded-xl flex items-center justify-center 
                        text-lg transition-all duration-300 transform hover:scale-110 
                        hover:shadow-md ${social.color}`}
            title={social.platform}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Follow Button */}
      <button className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 
                         text-white font-semibold rounded-full transition-all 
                         duration-300 transform hover:scale-105 shadow-md">
        Follow
      </button>
    </div>
  );
};
export default function  GlassSocialCard  ({ socials = [] })  {
  const defaultSocials = [
    { platform: "Twitter", url: "#", icon: "𝕏", username: "@creator" },
    { platform: "Instagram", url: "#", icon: "📷", username: "@creator" },
    { platform: "GitHub", url: "#", icon: "🐙", username: "@creator" },
    { platform: "Discord", url: "#", icon: "💬", username: "creator#1234" },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;

  return (
    <div className="relative max-w-md mx-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 
                      rounded-3xl blur-xl opacity-60"></div>
      
      {/* Glass Card */}
      <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-8 
                      border border-white/40 shadow-2xl">
        <h3 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Connect With Us
        </h3>

        <div className="space-y-4">
          {displaySocials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl 
                         hover:bg-white/30 transition-all duration-300 
                         transform hover:scale-105 group border border-white/20"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </span>
              <div>
                <p className="font-semibold text-white">{social.platform}</p>
                <p className="text-white/70 text-sm">{social.username}</p>
              </div>
              <span className="ml-auto text-white/50 group-hover:text-white 
                               transition-colors duration-300">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// custom forms : 
import { useState } from "react";

const COUNTRIES = ["India","United States","United Kingdom","Germany","France","Canada","Australia","Japan","Singapore","UAE"];
const CITIES = { India:["Mumbai","Delhi","Bangalore","Chennai","Hyderabad"], "United States":["New York","San Francisco","Austin","Chicago","Seattle"], "United Kingdom":["London","Manchester","Edinburgh","Bristol","Leeds"], Germany:["Berlin","Munich","Hamburg","Frankfurt","Cologne"], France:["Paris","Lyon","Marseille","Bordeaux","Nice"], Canada:["Toronto","Vancouver","Montreal","Calgary","Ottawa"], Australia:["Sydney","Melbourne","Brisbane","Perth","Adelaide"], Japan:["Tokyo","Osaka","Kyoto","Yokohama","Sapporo"], Singapore:["Singapore City"], UAE:["Dubai","Abu Dhabi","Sharjah"] };
const SKILLS = ["React","Vue","Angular","TypeScript","Node.js","Python","Design","DevOps","Marketing","Data Science"];
const SOCIALS = [
  { id:"twitter", label:"Twitter / X", icon:"𝕏", placeholder:"@username", color:"#000" },
  { id:"linkedin", label:"LinkedIn", icon:"in", placeholder:"linkedin.com/in/you", color:"#0077b5" },
  { id:"github", label:"GitHub", icon:"⌥", placeholder:"github.com/you", color:"#24292e" },
  { id:"instagram", label:"Instagram", icon:"◈", placeholder:"@handle", color:"#e1306c" },
];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition-all duration-100 hover:scale-110"
        >
          <span className={(hover || value) >= i ? "text-amber-400" : "text-stone-200"}>★</span>
        </button>
      ))}
    </div>
  );
}

export default function FullForm1_Minimal() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState([]);
  const [rating, setRating] = useState(0);
  const [singleFile, setSingleFile] = useState(null);
  const [multiFiles, setMultiFiles] = useState([]);
  const [socials, setSocials] = useState({});

  const toggleSkill = (s) => setSkills(v => v.includes(s) ? v.filter(x => x !== s) : [...v, s]);

  return (
    <div className="font-dm bg-white w-full max-w-2xl mx-auto border border-stone-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 py-6 border-b border-stone-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">Application Form</span>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">Tell us about yourself</h2>
        <p className="text-sm text-stone-400 mt-1">All fields are required unless marked optional.</p>
        <div className="mt-4 flex gap-1">
          {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? "bg-stone-900" : "bg-stone-100"}`} />)}
        </div>
      </div>

      <div className="px-6 sm:px-8 py-8 space-y-7">

        {/* ── SECTION: Personal Info ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-stone-300 inline-block" /> Personal Info
          </h3>
          <div className="space-y-5">

            {/* name-input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative">
                <input id="f1-fname" type="text" placeholder=" "
                  className="peer w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 pt-5 pb-2 text-sm text-stone-900 bg-transparent outline-none transition-colors" />
                <label htmlFor="f1-fname"
                  className="absolute top-4 left-0 text-sm text-stone-400 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-stone-900 peer-focus:uppercase peer-focus:tracking-widest
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest">
                  First Name
                </label>
              </div>
              <div className="relative">
                <input id="f1-lname" type="text" placeholder=" "
                  className="peer w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 pt-5 pb-2 text-sm text-stone-900 bg-transparent outline-none transition-colors" />
                <label htmlFor="f1-lname"
                  className="absolute top-4 left-0 text-sm text-stone-400 transition-all duration-200 pointer-events-none
                  peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-stone-900 peer-focus:uppercase peer-focus:tracking-widest
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest">
                  Last Name
                </label>
              </div>
            </div>

            {/* email-input */}
            <div className="relative">
              <input id="f1-email" type="email" placeholder=" "
                className="peer w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 pt-5 pb-2 text-sm text-stone-900 bg-transparent outline-none transition-colors" />
              <label htmlFor="f1-email"
                className="absolute top-4 left-0 text-sm text-stone-400 transition-all duration-200 pointer-events-none
                peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-stone-900 peer-focus:uppercase peer-focus:tracking-widest
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest">
                Email Address
              </label>
            </div>

            {/* number-input */}
            <div className="relative">
              <input id="f1-phone" type="number" placeholder=" "
                className="peer w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 pt-5 pb-2 text-sm text-stone-900 bg-transparent outline-none transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
              <label htmlFor="f1-phone"
                className="absolute top-4 left-0 text-sm text-stone-400 transition-all duration-200 pointer-events-none
                peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-stone-900 peer-focus:uppercase peer-focus:tracking-widest
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest">
                Phone Number
              </label>
            </div>

            {/* date-input + time-input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Date of Birth</label>
                <input type="date"
                  className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 text-sm text-stone-700 bg-transparent outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Preferred Time</label>
                <input type="time"
                  className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 text-sm text-stone-700 bg-transparent outline-none transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* ── SECTION: Location ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-stone-300 inline-block" /> Location
          </h3>
          <div className="space-y-5">

            {/* country-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Country</label>
              <div className="relative">
                <select value={country} onChange={e => { setCountry(e.target.value); setCity(""); }}
                  className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 pr-6 text-sm text-stone-700 bg-transparent outline-none transition-colors appearance-none">
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none">▼</span>
              </div>
            </div>

            {/* city-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">City</label>
              <div className="relative">
                <select value={city} onChange={e => setCity(e.target.value)} disabled={!country}
                  className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 pr-6 text-sm text-stone-700 bg-transparent outline-none transition-colors appearance-none disabled:text-stone-300">
                  <option value="">{country ? "Select city" : "Select country first"}</option>
                  {(CITIES[country] || []).map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none">▼</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* ── SECTION: About ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-stone-300 inline-block" /> About You
          </h3>
          <div className="space-y-5">

            {/* short-text-input */}
            <div className="relative">
              <input id="f1-headline" type="text" placeholder=" " maxLength={80}
                className="peer w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 pt-5 pb-2 text-sm text-stone-900 bg-transparent outline-none transition-colors" />
              <label htmlFor="f1-headline"
                className="absolute top-4 left-0 text-sm text-stone-400 transition-all duration-200 pointer-events-none
                peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-stone-900 peer-focus:uppercase peer-focus:tracking-widest
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest">
                Headline (short bio)
              </label>
            </div>

            {/* long-text-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">About Yourself</label>
              <textarea rows={4} placeholder="Tell us your story, experience and what drives you..."
                className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 text-sm text-stone-900 bg-transparent outline-none transition-colors resize-none placeholder-stone-300" />
            </div>

            {/* dropdown */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Experience Level</label>
              <div className="relative">
                <select className="w-full border-0 border-b-2 border-stone-200 focus:border-stone-900 py-2 pr-6 text-sm text-stone-700 bg-transparent outline-none transition-colors appearance-none">
                  <option value="">Select level</option>
                  <option>Student</option>
                  <option>Junior (0–2 years)</option>
                  <option>Mid-level (2–5 years)</option>
                  <option>Senior (5–10 years)</option>
                  <option>Lead / Principal (10+ years)</option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none">▼</span>
              </div>
            </div>

            {/* multi-select-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Skills <span className="normal-case font-normal text-stone-300">(select all that apply)</span></label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(s => (
                  <button key={s} type="button" onClick={() => toggleSkill(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${skills.includes(s) ? "bg-stone-900 border-stone-900 text-white" : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"}`}>
                    {skills.includes(s) && "✓ "}{s}
                  </button>
                ))}
              </div>
            </div>

            {/* star-rating */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Overall Experience Rating</label>
              <StarRating value={rating} onChange={setRating} />
              {rating > 0 && (
                <p className="text-xs text-stone-400 mt-2">{["","Poor","Fair","Good","Very Good","Excellent"][rating]}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* ── SECTION: Socials ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-stone-300 inline-block" /> Social Profiles
          </h3>

          {/* social-card */}
          <div className="space-y-3 mb-6">
            {SOCIALS.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 border border-stone-200 rounded-xl hover:border-stone-300 transition-colors">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                  style={{ background: s.color }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">{s.label}</p>
                  <input type="text" placeholder={s.placeholder}
                    value={socials[s.id] || ""}
                    onChange={e => setSocials(v => ({ ...v, [s.id]: e.target.value }))}
                    className="w-full text-sm text-stone-800 bg-transparent outline-none placeholder-stone-300" />
                </div>
                {socials[s.id] && <span className="text-green-500 text-xs flex-shrink-0">✓</span>}
              </div>
            ))}
          </div>

          {/* social-grid */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Quick Connect</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SOCIALS.map(s => (
                <button key={s.id} type="button"
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${socials[s.id] ? "border-stone-900" : "border-stone-100 hover:border-stone-200"}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
                    style={{ background: s.color }}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500">{s.label.split(" /")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* ── SECTION: Files ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-stone-300 inline-block" /> Uploads
          </h3>
          <div className="space-y-5">

            {/* single-file-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Profile Photo</label>
              <label className="flex items-center gap-4 p-4 border-2 border-dashed border-stone-200 rounded-xl hover:border-stone-400 cursor-pointer transition-colors group">
                <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="text-stone-400 text-lg">↑</span>
                </div>
                <div className="flex-1 min-w-0">
                  {singleFile
                    ? <><p className="text-sm font-semibold text-stone-800 truncate">{singleFile.name}</p><p className="text-xs text-stone-400">{(singleFile.size / 1024).toFixed(1)} KB</p></>
                    : <><p className="text-sm font-semibold text-stone-600">Click to upload photo</p><p className="text-xs text-stone-400">PNG, JPG up to 5MB</p></>
                  }
                </div>
                {singleFile && <button type="button" onClick={e => { e.preventDefault(); setSingleFile(null); }} className="text-stone-300 hover:text-red-400 text-lg transition-colors flex-shrink-0">✕</button>}
                <input type="file" accept="image/*" className="hidden" onChange={e => setSingleFile(e.target.files[0] || null)} />
              </label>
            </div>

            {/* multi-file-input */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Portfolio Files <span className="normal-case font-normal text-stone-300">(up to 5)</span></label>
              <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-stone-200 rounded-xl hover:border-stone-400 cursor-pointer transition-colors text-center">
                <span className="text-2xl text-stone-300">⊕</span>
                <p className="text-sm font-semibold text-stone-600">Drop files or click to browse</p>
                <p className="text-xs text-stone-400">PDF, ZIP, PNG, JPG — max 10MB each</p>
                <input type="file" multiple accept=".pdf,.zip,.png,.jpg,.jpeg" className="hidden"
                  onChange={e => setMultiFiles(Array.from(e.target.files).slice(0, 5))} />
              </label>
              {multiFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {multiFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 bg-stone-50 rounded-lg">
                      <span className="text-stone-400 text-xs">◫</span>
                      <span className="flex-1 text-xs text-stone-700 truncate">{f.name}</span>
                      <span className="text-[10px] text-stone-400">{(f.size / 1024).toFixed(0)}KB</span>
                      <button type="button" onClick={() => setMultiFiles(v => v.filter((_, j) => j !== i))} className="text-stone-300 hover:text-red-400 text-sm transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* ── BUTTON ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button type="button" className="w-full sm:w-auto order-2 sm:order-1 px-6 py-3 border-2 border-stone-200 text-stone-500 text-sm font-semibold rounded-xl hover:border-stone-400 hover:text-stone-700 active:scale-95 transition-all">
            Save Draft
          </button>
          <button type="submit" className="w-full sm:flex-1 order-1 sm:order-2 py-3 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-stone-700 active:scale-95 transition-all">
            Submit Application →
          </button>
        </div>

      </div>
    </div>
  );
}


import { useState } from "react";

const COUNTRIES = ["India","United States","United Kingdom","Germany","France","Canada","Australia","Japan","Singapore","UAE"];
const CITIES = { India:["Mumbai","Delhi","Bangalore","Chennai","Hyderabad"], "United States":["New York","San Francisco","Austin","Chicago","Seattle"], "United Kingdom":["London","Manchester","Edinburgh","Bristol","Leeds"], Germany:["Berlin","Munich","Hamburg","Frankfurt","Cologne"], France:["Paris","Lyon","Marseille","Bordeaux","Nice"], Canada:["Toronto","Vancouver","Montreal","Calgary","Ottawa"], Australia:["Sydney","Melbourne","Brisbane","Perth","Adelaide"], Japan:["Tokyo","Osaka","Kyoto","Yokohama","Sapporo"], Singapore:["Singapore City"], UAE:["Dubai","Abu Dhabi","Sharjah"] };
const SKILLS = ["React","Vue","TypeScript","Node.js","Python","Design","DevOps","Marketing","Data Science","Figma"];
const SOCIALS = [
  { id:"youtube",   label:"YouTube",    icon:"▶", placeholder:"youtube.com/@you",   color:"#ff0000" },
  { id:"instagram", label:"Instagram",  icon:"◈", placeholder:"@yourhandle",        color:"#e1306c" },
  { id:"twitter",   label:"Twitter / X",icon:"𝕏", placeholder:"@username",          color:"#000" },
  { id:"website",   label:"Website",    icon:"◉", placeholder:"yoursite.com",       color:"#c47a0f" },
];

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

const INPUT_CLS = "w-full px-4 py-3 text-sm text-white placeholder-white/25 outline-none rounded-2xl transition-all";
const LABEL_CLS = "block text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 mb-2";

function GlassInput({ label, type = "text", placeholder, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
        {...props}
      />
    </div>
  );
}

function GlassSelect({ label, children, disabled, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={focused ? GLASS_FOCUS : GLASS}
          className={`${INPUT_CLS} appearance-none pr-8 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {children}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
      </div>
    </div>
  );
}

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition-all hover:scale-125 active:scale-95"
        >
          <span style={{ color: (hover || value) >= i ? "#f5a623" : "rgba(255,255,255,0.12)" }}>★</span>
        </button>
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30 whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

export default function ZakirForm1() {
  const [country, setCountry]       = useState("");
  const [city, setCity]             = useState("");
  const [skills, setSkills]         = useState([]);
  const [rating, setRating]         = useState(0);
  const [singleFile, setSingleFile] = useState(null);
  const [multiFiles, setMultiFiles] = useState([]);
  const [socials, setSocials]       = useState({});
  const [subscribed, setSubscribed] = useState(false);

  const toggleSkill = s => setSkills(v => v.includes(s) ? v.filter(x => x !== s) : [...v, s]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      style={{ background: "radial-gradient(ellipse at center, #7a5200 0%, #4a3000 40%, #2a1a00 100%)" }}
    >
      <div
        className="w-full max-w-md relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#8a6010 0%,#6b4a08 30%,#4a3205 70%,#3a2604 100%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        <div className="relative z-10 p-5 sm:p-7">

          {/* ── Top bar ── */}
          <div className="flex items-center justify-between mb-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={GLASS}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSubscribed(v => !v)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: subscribed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.88)", color: subscribed ? "#fff" : "#1a0f00", border: subscribed ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center" style={GLASS}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Avatar + handle ── */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-20 h-20 rounded-full mb-3 overflow-hidden flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#f5a623,#e8941a)", border:"3px solid rgba(255,255,255,0.12)", boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>
              <span className="text-3xl">🧑</span>
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">Event Registration</h2>
            <p className="text-white/50 text-xs mt-1 text-center">Fill out the form to secure your spot</p>
          </div>

          <div className="space-y-5">

            {/* ── Personal ── */}
            <SectionLabel>Personal Info</SectionLabel>

            {/* name-input */}
            <div className="grid grid-cols-2 gap-3">
              <GlassInput label="First Name" placeholder="First" />
              <GlassInput label="Last Name" placeholder="Last" />
            </div>

            {/* email-input */}
            <GlassInput label="Email Address" type="email" placeholder="you@email.com" />

            {/* number-input */}
            <GlassInput label="Phone Number" type="number" placeholder="+91 98765 43210" />

            {/* date-input + time-input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Event Date</label>
                <input type="date" style={GLASS}
                  className={`${INPUT_CLS} [color-scheme:dark]`} />
              </div>
              <div>
                <label className={LABEL_CLS}>Arrival Time</label>
                <input type="time" style={GLASS}
                  className={`${INPUT_CLS} [color-scheme:dark]`} />
              </div>
            </div>

            <div className="h-px" style={{ background:"rgba(255,255,255,0.06)" }} />

            {/* ── Location ── */}
            <SectionLabel>Location</SectionLabel>

            {/* country-input */}
            <GlassSelect label="Country" value={country} onChange={e => { setCountry(e.target.value); setCity(""); }}>
              <option value="" className="bg-[#3a2604]">Select country</option>
              {COUNTRIES.map(c => <option key={c} className="bg-[#3a2604]">{c}</option>)}
            </GlassSelect>

            {/* city-input */}
            <GlassSelect label="City" value={city} onChange={e => setCity(e.target.value)} disabled={!country}>
              <option value="" className="bg-[#3a2604]">{country ? "Select city" : "Select country first"}</option>
              {(CITIES[country] || []).map(c => <option key={c} className="bg-[#3a2604]">{c}</option>)}
            </GlassSelect>

            <div className="h-px" style={{ background:"rgba(255,255,255,0.06)" }} />

            {/* ── About ── */}
            <SectionLabel>About You</SectionLabel>

            {/* short-text-input */}
            <GlassInput label="Tagline" placeholder="One line about yourself" />

            {/* long-text-input */}
            <div>
              <label className={LABEL_CLS}>Your Message</label>
              <textarea rows={3} placeholder="Tell us why you're attending..."
                style={GLASS}
                className={`${INPUT_CLS} resize-none`} />
            </div>

            {/* dropdown */}
            <div>
              <label className={LABEL_CLS}>How did you hear about us?</label>
              <div className="relative">
                <select style={GLASS} className={`${INPUT_CLS} appearance-none pr-8`}>
                  <option className="bg-[#3a2604]" value="">Select source</option>
                  {["Instagram","YouTube","Twitter / X","Friend / Colleague","Google","Newsletter","Podcast"].map(o => (
                    <option key={o} className="bg-[#3a2604]">{o}</option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
              </div>
            </div>

            {/* multi-select-input */}
            <div>
              <label className={LABEL_CLS}>Interests <span className="normal-case font-normal text-white/20">(select all)</span></label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(s => (
                  <button key={s} type="button" onClick={() => toggleSkill(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
                    style={skills.includes(s)
                      ? { background:"rgba(245,166,35,0.25)", border:"1px solid rgba(245,166,35,0.6)", color:"#f5c842" }
                      : { ...GLASS, color:"rgba(255,255,255,0.4)" }}>
                    {skills.includes(s) && "✓ "}{s}
                  </button>
                ))}
              </div>
            </div>

            {/* star-rating */}
            <div>
              <label className={LABEL_CLS}>How excited are you? <span className="normal-case font-normal text-white/20">(1–5)</span></label>
              <StarRating value={rating} onChange={setRating} />
              {rating > 0 && (
                <p className="text-xs text-white/35 mt-1.5">{["","Casual","Interested","Excited","Very Excited","ABSOLUTELY HYPED 🔥"][rating]}</p>
              )}
            </div>

            <div className="h-px" style={{ background:"rgba(255,255,255,0.06)" }} />

            {/* ── Socials ── */}
            <SectionLabel>Social Profiles</SectionLabel>

            {/* social-card — list style */}
            <div className="space-y-2.5">
              {SOCIALS.map(s => (
                <div key={s.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:brightness-110"
                  style={GLASS}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                    style={{ background: s.color }}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{s.label}</p>
                    <input type="text" placeholder={s.placeholder}
                      value={socials[s.id] || ""}
                      onChange={e => setSocials(v => ({ ...v, [s.id]: e.target.value }))}
                      className="w-full text-sm text-white bg-transparent outline-none placeholder-white/20" />
                  </div>
                  {socials[s.id] && <span className="text-[#f5a623] text-xs font-bold flex-shrink-0">✓</span>}
                </div>
              ))}
            </div>

            {/* social-grid */}
            <div>
              <label className={LABEL_CLS}>Quick Links</label>
              <div className="grid grid-cols-4 gap-2">
                {SOCIALS.map(s => (
                  <div key={s.id}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all cursor-pointer hover:brightness-125"
                    style={socials[s.id]
                      ? { background:"rgba(245,166,35,0.15)", border:"1px solid rgba(245,166,35,0.4)" }
                      : GLASS}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
                      style={{ background: s.color }}>
                      {s.icon}
                    </div>
                    <span className="text-[9px] font-semibold text-white/30">{s.label.split(" /")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background:"rgba(255,255,255,0.06)" }} />

            {/* ── Files ── */}
            <SectionLabel>Uploads</SectionLabel>

            {/* single-file-input */}
            <div>
              <label className={LABEL_CLS}>Profile Photo</label>
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all hover:brightness-110" style={GLASS}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(245,166,35,0.15)", border:"1px solid rgba(245,166,35,0.2)" }}>
                  <span className="text-[#f5a623] text-base">↑</span>
                </div>
                <div className="flex-1 min-w-0">
                  {singleFile
                    ? <><p className="text-sm font-semibold text-white truncate">{singleFile.name}</p>
                       <p className="text-xs text-white/30">{(singleFile.size/1024).toFixed(1)} KB</p></>
                    : <><p className="text-sm font-semibold text-white/50">Tap to upload photo</p>
                       <p className="text-xs text-white/25">PNG, JPG — max 5MB</p></>
                  }
                </div>
                {singleFile && (
                  <button type="button" onClick={e => { e.preventDefault(); setSingleFile(null); }}
                    className="text-white/20 hover:text-red-400 text-base flex-shrink-0 transition-colors">✕</button>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={e => setSingleFile(e.target.files[0] || null)} />
              </label>
            </div>

            {/* multi-file-input */}
            <div>
              <label className={LABEL_CLS}>Attachments <span className="normal-case font-normal text-white/20">(up to 5)</span></label>
              <label className="flex flex-col items-center gap-2 py-5 rounded-2xl cursor-pointer transition-all hover:brightness-110 text-center"
                style={{ ...GLASS, borderStyle:"dashed" }}>
                <span className="text-2xl" style={{ color:"rgba(245,166,35,0.4)" }}>⊕</span>
                <p className="text-sm font-semibold text-white/40">Drop files or browse</p>
                <p className="text-xs text-white/20">PDF, ZIP, PNG, JPG — 10MB each</p>
                <input type="file" multiple accept=".pdf,.zip,.png,.jpg,.jpeg" className="hidden"
                  onChange={e => setMultiFiles(Array.from(e.target.files).slice(0,5))} />
              </label>
              {multiFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {multiFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={GLASS}>
                      <span className="text-white/30 text-xs">◫</span>
                      <span className="flex-1 text-xs text-white/60 truncate">{f.name}</span>
                      <span className="text-[10px] text-white/25">{(f.size/1024).toFixed(0)}KB</span>
                      <button type="button" onClick={() => setMultiFiles(v => v.filter((_,j) => j !== i))}
                        className="text-white/20 hover:text-red-400 text-sm transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Button ── */}
            <div className="flex gap-3 pt-2">
              <button type="button"
                className="px-5 py-3.5 rounded-2xl text-sm font-semibold text-white/40 hover:text-white/60 transition-all active:scale-95"
                style={GLASS}>
                Save
              </button>
              <button type="submit"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background:"linear-gradient(135deg,rgba(245,166,35,0.9),rgba(230,140,10,0.95))", color:"#1a0f00", boxShadow:"0 8px 24px rgba(245,166,35,0.25)" }}>
                Register Now →
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