
import { useEffect, useState } from "react";
 
/* ------------------------------------------------------------------ */
/* Scenes (the demo loops through these automatically)                 */
/* ------------------------------------------------------------------ */
const SCENES = [
    { id: "templates", label: "Templates", ms: 6000 },
    { id: "ai", label: "AI builder", ms: 7000 },
    { id: "fill", label: "Live form", ms: 7500 },
    { id: "analytics", label: "Analytics", ms: 7500 },
];
 
/* Styles for the small animations Tailwind can't express */
const css = `
@keyframes cf-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes cf-progress { from { width: 0%; } to { width: 100%; } }
@keyframes cf-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@keyframes cf-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes cf-dot { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
.cf-in { animation: cf-in .4s ease-out both; }
.cf-shimmer { background: linear-gradient(90deg, #e6eee8 25%, #f4f7f4 50%, #e6eee8 75%); background-size: 200% 100%; animation: cf-shimmer 1.4s linear infinite; }
.cf-caret { animation: cf-caret 1s steps(1) infinite; }
.cf-dot { animation: cf-dot 1.2s infinite; }
@media (prefers-reduced-motion: reduce) {
  .cf-in, .cf-shimmer, .cf-caret, .cf-dot { animation: none; }
}
`;
 
/* ------------------------------------------------------------------ */
/* Small hooks that drive the scripted animation                        */
/* ------------------------------------------------------------------ */
 
// Types `text` one character at a time after `start` ms
function useTyped(text, start, speed, reduced) {
    const [n, setN] = useState(reduced ? text.length : 0);
    useEffect(() => {
        if (reduced) {
            setN(text.length);
            return undefined;
        }
        setN(0);
        let i = 0;
        let interval;
        const t = setTimeout(() => {
            interval = setInterval(() => {
                i += 1;
                setN(i);
                if (i >= text.length) clearInterval(interval);
            }, speed);
        }, start);
        return () => {
            clearTimeout(t);
            clearInterval(interval);
        };
    }, [text, start, speed, reduced]);
    return { text: text.slice(0, n), typing: n > 0 && n < text.length };
}
 
// Returns a step number that goes up at each time (ms) in `times`
function useSteps(times, reduced) {
    const [step, setStep] = useState(reduced ? times.length : 0);
    useEffect(() => {
        if (reduced) {
            setStep(times.length);
            return undefined;
        }
        setStep(0);
        const timers = times.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
        return () => timers.forEach(clearTimeout);
    }, [times, reduced]);
    return step;
}
 
// Counts from 0 up to `target`
function useCountUp(target, delay, duration, reduced) {
    const [v, setV] = useState(reduced ? target : 0);
    useEffect(() => {
        if (reduced) {
            setV(target);
            return undefined;
        }
        setV(0);
        let raf;
        let startTs;
        const t = setTimeout(() => {
            const tick = (ts) => {
                if (startTs === undefined) startTs = ts;
                const p = Math.min((ts - startTs) / duration, 1);
                setV(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, delay);
        return () => {
            clearTimeout(t);
            cancelAnimationFrame(raf);
        };
    }, [target, delay, duration, reduced]);
    return v;
}
 
/* ------------------------------------------------------------------ */
/* Icons and shared pieces                                              */
/* ------------------------------------------------------------------ */
const SparkleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </svg>
);
 
const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12l5 5 9-10" />
    </svg>
);
 
const StarIcon = ({ filled }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="transition-colors duration-300">
        <path
            d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"
            fill={filled ? "#f2a93b" : "none"}
            stroke={filled ? "#f2a93b" : "#c3d5c9"}
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </svg>
);
 
const Caret = () => <span className="cf-caret ml-px inline-block h-4 w-px translate-y-0.5 bg-[#2f4d3a]" />;
 
function Field({ label, kind, value = "", typing = false, rating = 0, animate = false }) {
    return (
        <div className={animate ? "cf-in" : ""}>
            <p className="mb-1 text-xs font-medium text-[#2f4d3a]">{label}</p>
            {kind === "stars" ? (
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <StarIcon key={n} filled={n <= rating} />
                    ))}
                </div>
            ) : (
                <div
                    className={`rounded-lg border bg-[#f4f7f4] px-3 text-sm text-[#2f4d3a] transition-colors ${
                        kind === "textarea" ? "min-h-[56px] py-2" : "h-9 leading-9"
                    } ${typing ? "border-[#f2a93b]" : "border-[#dfe8e1]"}`}
                >
                    {value}
                    {typing && <Caret />}
                </div>
            )}
        </div>
    );
}
 
/* ------------------------------------------------------------------ */
/* Scene 1: choose a template                                           */
/* ------------------------------------------------------------------ */
const TEMPLATES = [
    { name: "Contact form", fields: 4 },
    { name: "Event RSVP", fields: 6 },
    { name: "Customer feedback", fields: 5 },
    { name: "Job application", fields: 9 },
];
const TEMPLATE_STEPS = [900, 1700, 2500, 3300, 3900];
 
function TemplatesScene({ reduced }) {
    const step = useSteps(TEMPLATE_STEPS, reduced);
    const hovered = step >= 1 && step <= 3 ? step - 1 : -1;
    const selected = step >= 4 ? 2 : -1;
 
    return (
        <div className="flex h-full flex-col">
            <p className="text-sm font-semibold text-[#2f4d3a]">Start from a template</p>
            <p className="mb-4 text-xs text-[#4b6455]">Pick one, then change anything.</p>
 
            <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((t, i) => {
                    const isSelected = selected === i;
                    const isHovered = hovered === i;
                    return (
                        <div
                            key={t.name}
                            className={`relative rounded-xl border p-3 transition-all duration-300 ${
                                isSelected
                                    ? "border-[#f2a93b] bg-[#fff8ea] ring-2 ring-[#f2a93b]/40"
                                    : isHovered
                                    ? "-translate-y-0.5 border-[#2f4d3a]/40 bg-white shadow-md shadow-[#2f4d3a]/10"
                                    : "border-[#dfe8e1] bg-white"
                            }`}
                        >
                            <div className="mb-3 space-y-1.5">
                                <div className="h-1.5 w-2/3 rounded-full bg-[#2f4d3a]/80" />
                                <div className="h-1.5 w-full rounded-full bg-[#dfe8e1]" />
                                <div className="h-1.5 w-5/6 rounded-full bg-[#dfe8e1]" />
                            </div>
                            <p className="text-sm font-medium text-[#2f4d3a]">{t.name}</p>
                            <p className="text-xs text-[#4b6455]">{t.fields} fields</p>
 
                            {isSelected && (
                                <span className="cf-in absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f2a93b] text-[#2f4d3a]">
                                    <CheckIcon />
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
 
            <div
                className={`mt-auto flex items-center justify-between rounded-xl bg-[#2f4d3a] px-4 py-3 text-sm text-white transition-all duration-300 ${
                    step >= 5 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
            >
                <span>Using Customer feedback</span>
                <span className="font-semibold text-[#f2a93b]">Open in builder</span>
            </div>
        </div>
    );
}
 
/* ------------------------------------------------------------------ */
/* Scene 2: AI builds the form from a prompt                            */
/* ------------------------------------------------------------------ */
const AI_PROMPT = "Feedback form for my cafe, with a star rating";
const AI_STEPS = [2600, 3300, 3900, 4500, 5100, 5700];
const AI_FIELDS = [
    { label: "Your name", kind: "input", span: "col-span-1", ph: "h-14" },
    { label: "Email", kind: "input", span: "col-span-1", ph: "h-14" },
    { label: "Rate your visit", kind: "stars", span: "col-span-2", ph: "h-10" },
    { label: "What can we improve?", kind: "textarea", span: "col-span-2", ph: "h-[76px]" },
];
 
function AIScene({ reduced }) {
    const step = useSteps(AI_STEPS, reduced);
    const prompt = useTyped(AI_PROMPT, 300, 38, reduced);
    const shown = Math.min(Math.max(step - 1, 0), AI_FIELDS.length);
    const generating = step >= 1 && step < 6;
    const ready = step >= 6;
 
    return (
        <div className="flex h-full flex-col gap-3">
            <div className="flex items-start gap-3 rounded-xl border border-[#dfe8e1] bg-white p-3 shadow-sm">
                <span className="mt-0.5 text-[#f2a93b]">
                    <SparkleIcon />
                </span>
                <p className="min-h-[40px] flex-1 text-sm text-[#2f4d3a]">
                    {prompt.text}
                    {prompt.typing && <Caret />}
                </p>
                <span
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                        step >= 1 ? "bg-[#2f4d3a] text-white" : "bg-[#e6eee8] text-[#2f4d3a]"
                    }`}
                >
                    Generate
                </span>
            </div>
 
            <div className="flex h-5 items-center gap-2 text-xs font-medium text-[#4b6455]">
                {ready ? (
                    <>
                        <span className="text-green-600">
                            <CheckIcon />
                        </span>
                        Form ready, 4 fields
                    </>
                ) : generating ? (
                    <>
                        Generating form
                        <span className="flex gap-0.5">
                            {[0, 1, 2].map((d) => (
                                <span
                                    key={d}
                                    className="cf-dot h-1 w-1 rounded-full bg-[#2f4d3a]"
                                    style={{ animationDelay: `${d * 0.2}s` }}
                                />
                            ))}
                        </span>
                    </>
                ) : (
                    "Describe the form you need"
                )}
            </div>
 
            <div className="grid grid-cols-2 gap-3">
                {AI_FIELDS.map((f, i) => (
                    <div key={f.label} className={f.span}>
                        {i < shown ? (
                            <Field label={f.label} kind={f.kind} animate />
                        ) : generating ? (
                            <div className={`cf-shimmer rounded-lg ${f.ph}`} />
                        ) : (
                            <div className={`rounded-lg border border-dashed border-[#dfe8e1] ${f.ph}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
/* ------------------------------------------------------------------ */
/* Scene 3: the form fills itself in and gets submitted                 */
/* ------------------------------------------------------------------ */
const FILL_STEPS = [3000, 5400, 6000];
 
function FillScene({ reduced }) {
    const step = useSteps(FILL_STEPS, reduced);
    const name = useTyped("Asha Verma", 400, 70, reduced);
    const email = useTyped("asha@brewhouse.in", 1500, 50, reduced);
    const comment = useTyped("Loved the cold brew!", 3500, 55, reduced);
    const rating = step >= 1 ? 4 : 0;
 
    return (
        <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-[#2f4d3a]">Customer feedback</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6eee8] px-2.5 py-1 text-xs font-medium text-[#2f4d3a]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Live preview
                </span>
            </div>
 
            <div className="grid grid-cols-2 gap-3">
                <Field label="Your name" kind="input" value={name.text} typing={name.typing} />
                <Field label="Email" kind="input" value={email.text} typing={email.typing} />
                <div className="col-span-2">
                    <Field label="Rate your visit" kind="stars" rating={rating} />
                </div>
                <div className="col-span-2">
                    <Field
                        label="What can we improve?"
                        kind="textarea"
                        value={comment.text}
                        typing={comment.typing}
                    />
                </div>
            </div>
 
            <div className="mt-auto">
                {step >= 3 ? (
                    <div className="cf-in flex items-center justify-center gap-2 rounded-xl bg-[#e6eee8] py-3 text-sm font-semibold text-[#2f4d3a]">
                        <span className="text-green-600">
                            <CheckIcon />
                        </span>
                        Response sent
                    </div>
                ) : (
                    <div
                        className={`rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
                            step >= 2
                                ? "scale-[0.98] bg-[#f2a93b] text-[#2f4d3a]"
                                : "bg-[#2f4d3a] text-white"
                        }`}
                    >
                        Send feedback
                    </div>
                )}
            </div>
        </div>
    );
}
 
/* ------------------------------------------------------------------ */
/* Scene 4: analytics and an AI summary                                 */
/* ------------------------------------------------------------------ */
const BARS = [
    { d: "Mon", v: 38 },
    { d: "Tue", v: 52 },
    { d: "Wed", v: 45 },
    { d: "Thu", v: 70 },
    { d: "Fri", v: 62 },
    { d: "Sat", v: 88 },
    { d: "Sun", v: 76 },
];
const ANALYTICS_STEPS = [300];
const INSIGHT = "Guests love the cold brew. Weekend waits are the top complaint.";
 
function Stat({ label, value }) {
    return (
        <div className="rounded-xl border border-[#dfe8e1] bg-white p-3">
            <p className="text-xs text-[#4b6455]">{label}</p>
            <p className="text-xl font-bold text-[#2f4d3a]">{value}</p>
        </div>
    );
}
 
function AnalyticsScene({ reduced }) {
    const step = useSteps(ANALYTICS_STEPS, reduced);
    const responses = useCountUp(1284, 300, 1500, reduced);
    const completion = useCountUp(92, 300, 1500, reduced);
    const rating = useCountUp(4.6, 300, 1500, reduced);
    const insight = useTyped(INSIGHT, 3000, 28, reduced);
 
    return (
        <div className="flex h-full flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
                <Stat label="Responses" value={Math.round(responses).toLocaleString()} />
                <Stat label="Completion" value={`${Math.round(completion)}%`} />
                <Stat label="Avg rating" value={rating.toFixed(1)} />
            </div>
 
            <div className="rounded-xl border border-[#dfe8e1] bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-medium text-[#2f4d3a]">Responses this week</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#4b6455]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        Live
                    </span>
                </div>
                <div className="flex h-20 items-end gap-2">
                    {BARS.map((b, i) => (
                        <div key={b.d} className="flex h-full flex-1 flex-col justify-end">
                            <div
                                className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                                    b.v === 88 ? "bg-[#f2a93b]" : "bg-[#2f4d3a]"
                                }`}
                                style={{
                                    height: step >= 1 ? `${b.v}%` : "4%",
                                    transitionDelay: reduced ? "0ms" : `${i * 80}ms`,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-1.5 flex gap-2">
                    {BARS.map((b) => (
                        <span key={b.d} className="flex-1 text-center text-[10px] text-[#4b6455]">
                            {b.d}
                        </span>
                    ))}
                </div>
            </div>
 
            <div className="flex gap-2.5 rounded-xl bg-[#2f4d3a] p-3 text-white">
                <span className="mt-0.5 shrink-0 text-[#f2a93b]">
                    <SparkleIcon />
                </span>
                <div className="min-h-[44px]">
                    <p className="text-xs font-semibold text-[#f2a93b]">AI summary</p>
                    <p className="text-sm leading-snug text-white/90">
                        {insight.text}
                        {insight.typing && (
                            <span className="cf-caret ml-px inline-block h-3.5 w-px translate-y-0.5 bg-white" />
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
 
const SCENE_COMPONENTS = [TemplatesScene, AIScene, FillScene, AnalyticsScene];
 
/* ------------------------------------------------------------------ */
/* The demo window                                                      */
/* ------------------------------------------------------------------ */
function HeroDemo() {
    const [reduced] = useState(
        () =>
            typeof window !== "undefined" &&
            Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    );
    const [scene, setScene] = useState(0);
    const [run, setRun] = useState(0); // bumps when a tab is clicked, so the timer restarts
 
    // Move to the next scene when the current one finishes
    useEffect(() => {
        if (reduced) return undefined;
        const t = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENES[scene].ms);
        return () => clearTimeout(t);
    }, [scene, run, reduced]);
 
    const Scene = SCENE_COMPONENTS[scene];
 
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e1] bg-white shadow-xl shadow-[#2f4d3a]/10">
            <style>{css}</style>
            <p className="sr-only">
                Animated preview of CloudForm: choosing a template, generating a form with AI, filling
                it in, and reading analytics.
            </p>
 
            {/* Tabs double as a progress indicator */}
            <div className="grid grid-cols-4 border-b border-[#dfe8e1] bg-[#f4f7f4]">
                {SCENES.map((s, i) => {
                    const active = i === scene;
                    return (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                                setScene(i);
                                setRun((r) => r + 1);
                            }}
                            aria-current={active ? "true" : undefined}
                            className={`relative px-1 py-3 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f2a93b] sm:text-sm ${
                                active
                                    ? "bg-white text-[#2f4d3a]"
                                    : "text-[#4b6455] hover:text-[#2f4d3a]"
                            }`}
                        >
                            {s.label}
                            {active && (
                                <span
                                    key={`${scene}-${run}`}
                                    className="absolute bottom-0 left-0 h-0.5 bg-[#f2a93b]"
                                    style={
                                        reduced
                                            ? { width: "100%" }
                                            : { animation: `cf-progress ${s.ms}ms linear forwards` }
                                    }
                                />
                            )}
                        </button>
                    );
                })}
            </div>
 
            {/* Scene area: fixed height so the hero never jumps */}
            <div className="h-[390px] p-5" aria-hidden="true">
                <Scene key={`${scene}-${run}`} reduced={reduced} />
            </div>
        </div>
    );
}
 
export default HeroDemo;