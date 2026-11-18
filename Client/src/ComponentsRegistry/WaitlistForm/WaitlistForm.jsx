import { useState , useEffect , useLayoutEffect , useMemo , useRef } from "react";
import { getSafeUrl } from "../../utils/safeUrl.js";


// unique Id : wf001 ,
// every previewData field arrives as a flat prop (FormPreview and the live page spread previewData into this component)
// isPreview : true inside the builder -> nothing is submitted
// onAnswer(elementId , value) : called on every change , onSubmit(answers) : async , called once on submit
//
// layout : "centered" (default , the original look) | "split" | "minimal"
// theme  : "light" (default , the original look) | "dark"
// Pages saved before layout / theme existed have neither prop , so they render exactly as before.
// Any other value (a typo from the builder's text box , an old value) falls back to the default.

const LAYOUTS = ["centered" , "split" , "minimal"];
const THEMES = ["light" , "dark"];

// the page switches to two columns once the component itself is this wide. It measures its own width (not the screen)
// so the builder preview , which is narrower than the screen , shows the same layout the live page will
const SPLIT_MIN_WIDTH = 560;

// every class is written out in full so Tailwind can find it
const THEME_CLASSES = {
  light : {
    card : "bg-white border border-gray-100 shadow-2xl",
    title : "text-gray-800",
    subtitle : "text-gray-500",
    tile : "bg-indigo-50",
    tileValue : "text-indigo-600",
    tileLabel : "text-indigo-400",
    input : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500",
    button : "bg-indigo-600 hover:bg-indigo-700",
    note : "text-gray-400",
    error : "text-red-500",
  },
  dark : {
    card : "bg-slate-900 border border-slate-700 shadow-2xl shadow-black/40",
    title : "text-white",
    subtitle : "text-slate-400",
    tile : "bg-slate-800",
    tileValue : "text-indigo-300",
    tileLabel : "text-slate-400",
    input : "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-400",
    button : "bg-indigo-500 hover:bg-indigo-400",
    note : "text-slate-500",
    error : "text-red-400",
  },
};

const pickOption = (value , allowed , fallback) => {
  const clean = typeof value === "string" ? value.trim().toLowerCase() : "";
  return allowed.includes(clean) ? clean : fallback;
};

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

function WaitlistForm({ brandOrEventName , brandOrEventNameColor , heading , subHeading , launchDate , backgroundColorHexcode ="#FEF3C7" , submitButtonName , submitButtonText , backgroundImageUrl , layout = "centered" , theme = "light" , isPreview = false , onAnswer , onSubmit })  {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const activeLayout = pickOption(layout , LAYOUTS , "centered");
  const t = THEME_CLASSES[pickOption(theme , THEMES , "light")];

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

  // how wide is this component right now ? (measured before the first paint , so there is no flash of the wrong layout)
  const rootRef = useRef(null);
  const [wide, setWide] = useState(false);
  useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const update = () => setWide(element.clientWidth >= SPLIT_MIN_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
  const brandColor = brandOrEventNameColor || "black";

  const countdownItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  /* ---------------- pieces shared by the layouts ---------------- */

  const successCard = (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-emerald-500
                    rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
      <span className="text-5xl sm:text-6xl block mb-4">🚀</span>
      <h3 className="text-xl sm:text-2xl font-bold">You're on the list!</h3>
      <p className="text-emerald-100 mt-2">We'll notify you when we launch.</p>
    </div>
  );

  const renderEmailInput = (className) => (
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
      className={className}
      required
    />
  );

  // boxed countdown tiles (inside the card)
  const countdownTiles = hasCountdown && (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
      {countdownItems.map((item, i) => (
        <div key={i} className={`${t.tile} rounded-xl p-2 sm:p-3 text-center`}>
          <span className={`text-xl sm:text-2xl font-bold ${t.tileValue} block`}>
            {String(item.value).padStart(2, "0")}
          </span>
          <span className={`text-xs ${t.tileLabel}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );

  // input on top of the button (centered + split layouts)
  const stackedForm = (
    <>
      <form className="space-y-3" onSubmit={handleSubmit} noValidate={isPreview}>
        {renderEmailInput(`w-full px-4 sm:px-5 py-3 sm:py-3.5 text-base border-2 rounded-xl focus:outline-none transition-colors ${t.input}`)}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 sm:py-3.5 text-base ${t.button} text-white font-bold
                     rounded-xl transition-all duration-300 shadow-md hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {submitting ? "Joining..." : buttonText}
        </button>
      </form>

      {submitError && (
        <p role="alert" className={`text-center ${t.error} text-sm mt-3`}>
          {submitError}
        </p>
      )}

      <p className={`text-center ${t.note} text-xs mt-4`}>
        🔒 We respect your privacy. No spam.
      </p>
    </>
  );

  /* ---------------- the three layouts ---------------- */

  // the original design : name on top , one card in the middle
  const centered = (
    <>
      <h1 className="mb-6 max-w-full break-words text-center text-3xl font-extrabold tracking-wide drop-shadow-lg sm:text-4xl" style={{color : brandColor}}>
        {brandOrEventName || ""}
      </h1>

      {joined ? successCard : (
        <div className={`w-full max-w-md mx-auto rounded-3xl p-6 sm:p-8 ${t.card}`}>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`break-words text-2xl sm:text-3xl font-bold ${t.title}`}>{heading || ""}</h2>
            <p className={`break-words ${t.subtitle} mt-2`}>{subHeading || ""}</p>
          </div>
          {countdownTiles}
          {stackedForm}
        </div>
      )}
    </>
  );

  // big heading on the page on the left , countdown and signup in a card on the right (stacked when narrow)
  const split = (
    <div className={`mx-auto grid w-full max-w-5xl items-center ${wide ? "grid-cols-2 gap-12" : "grid-cols-1 gap-8"}`}>
      <div className={wide ? "text-left" : "text-center"}>
        <h1 className="mb-4 break-words text-base font-semibold tracking-widest sm:text-lg" style={{color : brandColor}}>
          {brandOrEventName || ""}
        </h1>
        <h2 className="break-words text-4xl font-extrabold leading-tight sm:text-5xl" style={{color : brandColor}}>
          {heading || ""}
        </h2>
        <p className="mt-4 break-words text-lg opacity-80" style={{color : brandColor}}>
          {subHeading || ""}
        </p>
      </div>

      {joined ? successCard : (
        <div className={`w-full max-w-md mx-auto rounded-3xl p-6 sm:p-8 ${t.card}`}>
          {countdownTiles}
          {stackedForm}
        </div>
      )}
    </div>
  );

  // no card : large left-aligned text straight on the page , plain countdown numbers , one signup row
  const minimal = (
    <div className="w-full max-w-2xl text-left">
      <h1 className="mb-4 break-words text-base font-semibold tracking-widest sm:text-lg" style={{color : brandColor}}>
        {brandOrEventName || ""}
      </h1>
      <h2 className="break-words text-4xl font-extrabold leading-tight sm:text-6xl" style={{color : brandColor}}>
        {heading || ""}
      </h2>
      <p className="mt-4 break-words text-lg opacity-80 sm:text-xl" style={{color : brandColor}}>
        {subHeading || ""}
      </p>

      {hasCountdown && (
        <div className="my-8 flex gap-6 sm:gap-8" style={{color : brandColor}}>
          {countdownItems.map((item, i) => (
            <div key={i}>
              <span className="block text-3xl font-bold tabular-nums sm:text-5xl">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-xs opacity-70">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {joined ? (
        <div className={hasCountdown ? "" : "mt-8"}>{successCard}</div>
      ) : (
        <div className={hasCountdown ? "" : "mt-8"}>
          <form className={`flex gap-3 ${wide ? "flex-row" : "flex-col"}`} onSubmit={handleSubmit} noValidate={isPreview}>
            {renderEmailInput(`min-w-0 flex-1 rounded-full border-2 px-5 py-3.5 text-base focus:outline-none transition-colors ${t.input}`)}
            <button
              type="submit"
              disabled={submitting}
              className={`whitespace-nowrap rounded-full px-7 py-3.5 text-base ${t.button} text-white font-bold
                         transition-all duration-300 shadow-md hover:shadow-lg
                         disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {submitting ? "Joining..." : buttonText}
            </button>
          </form>

          {submitError && (
            <p role="alert" className={`${t.error} text-sm mt-3`}>
              {submitError}
            </p>
          )}

          <p className="mt-4 text-xs opacity-70" style={{color : brandColor}}>
            🔒 We respect your privacy. No spam.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={rootRef}
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
      {activeLayout === "split" ? split : activeLayout === "minimal" ? minimal : centered}
    </div>
  );
};


export default WaitlistForm;