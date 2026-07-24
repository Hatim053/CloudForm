import { useState , useEffect } from "react";


// unique Id : wf001 ,
function WaitlistForm({ companyOrEventName , companyOrEventNameColor , heading , subHeading , launchDate , backgroundColorHexcode , submitButtonText , backgroundImageUrl })  {
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
    // API CALL WILL BE MADE
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
     <div
  className="flex flex-col items-center justify-center p-6 min-h-[100vh]"
  style={{
    backgroundColor: backgroundColorHexcode,
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Company name heading */}
  <h1 className="text-4xl font-extrabold tracking-wide mb-6 drop-shadow-lg" style={{color : (companyOrEventNameColor || "black")}}>
    {companyOrEventName || "company/event name"}
  </h1>

  <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
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
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-xs text-indigo-400">{item.label}</span>
        </div>
      ))}
    </div>

    <form className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl 
                   focus:outline-none focus:border-indigo-500 transition-colors"
        required
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                   rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
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


export default WaitlistForm;