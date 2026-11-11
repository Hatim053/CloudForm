import { useState , useEffect , useMemo } from "react";
import { getSafeUrl } from "../../utils/safeUrl.js";


// unique Id : wf001 ,
// every previewData field arrives as a flat prop (FormPreview and the live page spread previewData into this component)
// isPreview : true inside the builder -> nothing is submitted
// onAnswer(elementId , value) : called on every change , onSubmit(answers) : async , called once on submit

const getTimeLeft = (launchTime) => {
  const diff = Number.isFinite(launchTime) ? Math.max(launchTime - Date.now() , 0) : 0;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

// creator supplied url -> only https is allowed (anything else could be a tracking pixel / odd scheme).
// getSafeUrl returns the url the parser has already escaped (a quote becomes %22) , so it is safe inside url("...") as it is
const getSafeImageUrl = (url) => getSafeUrl(url , ["https:"]);

function WaitlistForm({ brandOrEventName , brandOrEventNameColor , heading , subHeading , launchDate , backgroundColorHexcode ="#FEF3C7" , submitButtonName , submitButtonText , backgroundImageUrl , isPreview = false , onAnswer , onSubmit })  {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // launchDate arrives as an ISO string from the database (not a Date object)
  const launchTime = useMemo(() => (launchDate ? new Date(launchDate).getTime() : NaN), [launchDate]);
  const hasCountdown = Number.isFinite(launchTime);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(launchTime));

  useEffect(() => {
    if (!hasCountdown) return;

    setTimeLeft(getTimeLeft(launchTime));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(launchTime));
      if (launchTime - Date.now() <= 0) clearInterval(timer); // stop ticking once launched
    }, 1000);

    return () => clearInterval(timer);
  }, [launchTime , hasCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreview || submitting) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit?.({ email });
      setJoined(true);
    } catch (err) {
      setSubmitError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const safeImageUrl = getSafeImageUrl(backgroundImageUrl);
  const buttonText = submitButtonName || submitButtonText || "Join the Waitlist 🚀";

  return (
    <div
      className={`flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 ${isPreview ? "" : "min-h-screen"}`}
      style={{
        backgroundColor: backgroundColorHexcode,
        ...(safeImageUrl && {
          backgroundImage: `url("${safeImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      {/* Company name heading */}
      <h1 className="mb-6 max-w-full break-words text-center text-3xl font-extrabold tracking-wide drop-shadow-lg sm:text-4xl" style={{color : (brandOrEventNameColor || "black")}}>
        {brandOrEventName || ""}
      </h1>

      {joined ? (
        <div className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-emerald-500
                        rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
          <span className="text-5xl sm:text-6xl block mb-4">🚀</span>
          <h3 className="text-xl sm:text-2xl font-bold">You're on the list!</h3>
          <p className="text-emerald-100 mt-2">We'll notify you when we launch.</p>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="break-words text-2xl sm:text-3xl font-bold text-gray-800">{heading || ""}</h2>
            <p className="break-words text-gray-500 mt-2">{subHeading || ""}</p>
          </div>

          {/* Countdown Timer */}
          {hasCountdown && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map((item, i) => (
                <div key={i} className="bg-indigo-50 rounded-xl p-2 sm:p-3 text-center">
                  <span className="text-xl sm:text-2xl font-bold text-indigo-600 block">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-indigo-400">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit} noValidate={isPreview}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              aria-label="Email address"
              value={email}
              readOnly={isPreview}
              onChange={(e) => {
                setEmail(e.target.value);
                onAnswer?.("email" , e.target.value);
              }}
              placeholder="Enter your email"
              className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-base border-2 border-gray-200 rounded-xl
                         focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 sm:py-3.5 text-base bg-indigo-600 hover:bg-indigo-700 text-white font-bold
                         rounded-xl transition-all duration-300 shadow-md hover:shadow-lg
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Joining..." : buttonText}
            </button>
          </form>

          {submitError && (
            <p role="alert" className="text-center text-red-500 text-sm mt-3">
              {submitError}
            </p>
          )}

          <p className="text-center text-gray-400 text-xs mt-4">
            🔒 We respect your privacy. No spam.
          </p>
        </div>
      )}
    </div>
  );
};


export default WaitlistForm;