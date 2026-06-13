import { User, Mail, Phone, Calendar, ArrowUpRight, Bell } from 'lucide-react';
import { useState, useEffect, useRef } from "react"; 

 // pre build forms : 
// unique Id : sf001
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
// unique Id : wf001 , elements will be : parentId + their Id
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
 // unique Id : ic001
export default function InfluencerV1({
  name = "@zakirkhanlive",
  banner = "MUMBAI RESIDENCY | LAST FEW SHOWS | LIVE NOW 🚨",
  avatar = "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/famous-places-in-bhopal_0_1200.jpg.webp",
  socials = [],
  links = [],
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
// unique Id : ic002
export default function CreatorProfileCard({ name, bio, avatar="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/famous-places-in-bhopal_0_1200.jpg.webp", socials = [] }, folllowBtn = { url: "" }) {
  const defaultSocials = [
    { platform: "twitter", url: "#", icon: "𝕏", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
    { platform: "instagram", url: "#", icon: "📷", color: "bg-gray-100 hover:bg-pink-100 text-gray-700" },
    { platform: "linkedin", url: "#", icon: "💼", color: "bg-gray-100 hover:bg-blue-100 text-gray-700" },
    { platform: "website", url: "#", icon: "🌐", color: "bg-gray-100 hover:bg-green-100 text-gray-700" },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;
  const handleClick = () => {
    console.log('button clicked');
    window.location.href = folllowBtn.url || "#";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center 
                      hover:shadow-2xl transition-all duration-500">
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-indigo-100">
          <img
            src={avatar || "https://via.placeholder.com/200"}
            alt={name || "Creator"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{name || "John Doe"}</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-6 px-2 sm:px-4">
          {bio || "Digital creator sharing insights about design, tech, and creativity."}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {displaySocials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center 
                          text-lg transition-all duration-300 transform hover:scale-110 
                          hover:shadow-md ${social.color}`}
              title={social.platform}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <button
          className="mt-6 px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 
                     text-white font-semibold rounded-full transition-all 
                     duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
          onClick={handleClick}
        >
          {folllowBtn.name || "follow"}
        </button>
      </div>
    </div>
  );
};
// unique Id : ic003
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

// custom form : 
// unique Id : cf001

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
const LABEL_CLS = "block text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-2";

// unique Id : cf001sti
function ShortTextInput({ label, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS} />
    </div>
  );
}
// unique Id : cf001lti
function LongTextInput({ label, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>{label || "Message"}</label>
      <textarea rows={3} placeholder={placeholder || "Tell us why you're attending..."}
        style={GLASS}
        className={`${INPUT_CLS} resize-none`} />
    </div>
  );
}
// unique Id : cf001msi
function MultiSelectInput({ label, optionList, onToggle }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleToggle = (value) => {
    setSelectedValues(currentValues =>
      currentValues.includes(value)
        ? currentValues.filter(existingValue => existingValue !== value)
        : [...currentValues, value]
    );
  };

  return (
    <div>
      <label className={LABEL_CLS}>
        {label} <span className="normal-case font-normal text-white/20">(select all)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {optionList.map(option => (
          <button key={option} type="button" onClick={() => handleToggle(option)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            style={selectedValues.includes(option)
              ? { background: "rgba(245,166,35,0.25)", border: "1px solid rgba(245,166,35,0.6)", color: "#f5c842" }
              : { ...GLASS, color: "rgba(255,255,255,0.4)" }}>
            {selectedValues.includes(option) && "✓ "}{option}
          </button>
        ))}
      </div>
    </div>
  );
}
// unique Id : cf001ni
function NameInput() {
  const [focused, setFocused] = useState(false);

  return (<div className="grid grid-cols-2 gap-3">
    <div>
      <label className={LABEL_CLS}>"First Name"</label>
      <input
        type="text"
        placeholder="First"
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
    <div>
      <label className={LABEL_CLS}>"Last Name"</label>
      <input
        type="text"
        placeholder="Last"
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  </div>)
}
// unique Id : cf001ei
function EmailInput() {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>Email Address</label>
      <input
        type="email"
        placeholder="you@gmail.com"
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  );
}
// unique Id : cf001cni
function ContactNumberInput() {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={LABEL_CLS}>Phone Number</label>
      <input
        type="number"
        placeholder="+91 98765 43210"
        style={focused ? GLASS_FOCUS : GLASS}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={INPUT_CLS}
      />
    </div>
  );
}
// unique Id : cf001ds
function DropdownSelect({ label, optionList, disabled, value }) {
  const [option, setOption] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={e => setOption(e.target.value)}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={focused ? GLASS_FOCUS : GLASS}
          className={`${INPUT_CLS} appearance-none pr-8 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <option value="">{`Select ${label}`}</option>
          {optionList.map(c => <option key={c} className="bg-[#3a2604]">{c}</option>)}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
      </div>
    </div>
  );
}
// unique Id : cf001sr
function StarRating({ label }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div>
      <label className={LABEL_CLS}>{label || "Rate Us"}<span className="normal-case font-normal text-white/20">(1–5)</span></label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} type="button"
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl transition-all hover:scale-125 active:scale-95"
          >
            <span style={{ color: (hover || rating) >= i ? "#f5a623" : "rgba(255,255,255,0.12)" }}>★</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/35 mt-1.5"></p>
    </div>
  );
}
// unique Id : cf001sl
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30 whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px" style={{ background: "#607456" }} />
    </div>
  );
}
// unique Id : cf001dati
function DateAndTimeInput({ dateLabel, timeLabel }) {
  return (<div className="grid grid-cols-2 gap-3">
    <DateInput label={dateLabel} />
    <TimeInput label={timeLabel} />
  </div>)
}
// unique Id : cf001di
function DateInput({ label }) {
  return (
    <div>
      <label className={LABEL_CLS}>{label || "Event Date"}</label>
      <input type="date" style={GLASS}
        className={`${INPUT_CLS} [color-scheme:dark]`} />
    </div>
  );
};
// unique Id : cf001ti
function TimeInput({ label }) {
  return (<div>
    <label className={LABEL_CLS}>{label || "Arrival Time"}</label>
    <input type="time" style={GLASS}
      className={`${INPUT_CLS} [color-scheme:dark]`} />
  </div>
  );
};
// unique Id : cf001sfi
function SingleFileInput() {
  const [singleFile, setSingleFile] = useState(null);
  return (<> <SectionLabel>Uploads</SectionLabel>
  <div>
              <label className={LABEL_CLS}>Profile Photo</label>
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all hover:brightness-110" style={GLASS}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.2)" }}>
                  <span className="text-[#f5a623] text-base">↑</span>
                </div>
                <div className="flex-1 min-w-0">
                  {singleFile
                    ? <><p className="text-sm font-semibold text-white truncate">{singleFile.name}</p>
                      <p className="text-xs text-white/30">{(singleFile.size / 1024).toFixed(1)} KB</p></>
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
            </>)
}
// unique Id : cf001mfi
function MultiFileInput() {
  const [multiFiles, setMultiFiles] = useState([]);
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
                  onChange={e => setMultiFiles(Array.from(e.target.files).slice(0, 5))} />
              </label>
              {multiFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {multiFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={GLASS}>
                      <span className="text-white/30 text-xs">◫</span>
                      <span className="flex-1 text-xs text-white/60 truncate">{f.name}</span>
                      <span className="text-[10px] text-white/25">{(f.size / 1024).toFixed(0)}KB</span>
                      <button type="button" onClick={() => setMultiFiles(v => v.filter((_, j) => j !== i))}
                        className="text-white/20 hover:text-red-400 text-sm transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
            )
}
// unique Id : cf001shi
function SocialHandleInput({ selectedSocialHandle }) {
  const SOCIALS = {
  "twitter" :{ id: "twitter", label: "Twitter / X", icon: "𝕏", placeholder: "@username", color: "#000" },
  "linkedin" : { id: "linkedin", label: "LinkedIn", icon: "in", placeholder: "linkedin.com/in/you", color: "#0077b5" },
   "github" : { id: "github", label: "GitHub", icon: "⌥", placeholder: "github.com/you", color: "#24292e" },
  "instagram" : { id: "instagram", label: "Instagram", icon: "◈", placeholder: "@handle", color: "#e1306c" },
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
                      value={SOCIALS[selectedSocialHandle].id}
                      // onChange={}
                      className="w-full text-sm text-white bg-transparent outline-none placeholder-white" />
                  </div>
                  {SOCIALS[selectedSocialHandle].id && <span className="text-[#f5a623] text-xs font-bold flex-shrink-0">✓</span>}
                </div>
            </div>)
}
// unique Id : cf001
export default function CustomForm({ avatarImgSrc = null }) {

  
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      style={{ background: "#EEE0CC" }}
    >
      <div
        className="w-full max-w-md relative rounded-3xl overflow-hidden"
        style={{
          background: "#BA6A4C",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        <div className="relative z-10 p-5 sm:p-7">

          {/* ── Avatar + handle ── */}
          <div className="flex flex-col items-center mb-7">
            {avatarImgSrc && <div className="w-20 h-20 rounded-full mb-3 overflow-hidden flex items-center justify-center"
              style={{ background: "#EEE0CC", border: "3px solid rgba(255,255,255,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
              <img className="w-full h-full object-cover" src={avatarImgSrc} />
            </div>}
            <h2 className="text-white text-lg font-bold tracking-tight">Event Registration</h2>
            <p className="text-white/50 text-xs mt-1 text-center">Fill out the form to secure your spot</p>
          </div>
          <div className="space-y-5">

            {/* name-input */}
            <NameInput />
            {/* email-input */}
            <EmailInput />
            {/* number-input */}
            <ContactNumberInput />
            {/* date-input + time-input */}
            <DateAndTimeInput />

            {/* ── Location ── */}
            <SectionLabel>Location</SectionLabel>

            {/* Dropdown */}
            <DropdownSelect label={"country"} value={""} optionList={COUNTRIES}></DropdownSelect>
            {/* ── About ── */}
            <SectionLabel>About You</SectionLabel>

            {/* short-text-input */}
            <ShortTextInput label={"Address"} placeholder={"full address"} />

            {/* long-text-input */}
            <LongTextInput />

            {/* multi-select-input */}
            <MultiSelectInput label={"Interest"} optionList={SKILLS} />
            {/* star-rating */}
            <StarRating />

            {/* ── Socials ── */}
           <SocialHandleInput selectedSocialHandle = {"github"}/>

            {/* single-file-input */}
            <SingleFileInput />
            {/* multi-file-input */}
             <MultiFileInput />
            {/* ── Button ── */}
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg,rgba(245,166,35,0.9),rgba(230,140,10,0.95))", color: "#1a0f00", boxShadow: "0 8px 24px rgba(245,166,35,0.25)" }}>
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

