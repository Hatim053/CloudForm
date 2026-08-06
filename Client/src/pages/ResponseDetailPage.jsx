import {
  ArrowLeft,
  MapPin,
  Monitor,
  Smartphone,
  Calendar,
  Timer,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function InfoTile({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f3ef]">
        <Icon size={15} className="text-[#2c4a3b]" />
      </div>
      <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-[#8a9690]">
        {label}
      </p>
      <p className="text-sm font-semibold text-[#1a2b21]">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-[#8a9690]">{sub}</p>}
    </div>
  );
}

export default function ResponseDetailPage() {
  const answers = [
    { q: "What's your full name?", a: "Anjali Mehta", answered: true, time: "4s" },
    { q: "How did you hear about us?", a: "Instagram ad", answered: true, time: "9s" },
    { q: "Rate your overall experience", a: "4 / 5", answered: true, time: "6s" },
    { q: "What could we improve?", a: "Faster customer support replies, and a mobile app would be great.", answered: true, time: "38s" },
    { q: "Would you recommend us to a friend?", a: null, answered: false, time: null },
    { q: "Any additional comments?", a: null, answered: false, time: null },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      {/* Top bar */}
      <div className="flex items-center gap-4 bg-[#2c4a3b] px-6 py-4">
        <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </span>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
            Customer Feedback Survey
          </p>
          <p className="text-base font-semibold text-white">Anjali Mehta's response</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-6 py-8">
        {/* Status banner */}
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#fdf6e8] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <XCircle size={18} className="text-[#c9922f]" />
            <span className="text-sm font-medium text-[#1a2b21]">
              This response was left partway through — 4 of 6 questions answered
            </span>
          </div>
          <span className="rounded-full bg-[#f2a93b] px-3 py-1 text-xs font-semibold text-[#2c4a3b]">
            67% complete
          </span>
        </div>

        {/* Metadata grid */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <InfoTile
            icon={MapPin}
            label="Location"
            value="Mumbai, Maharashtra"
            sub="India"
          />
          <InfoTile icon={Monitor} label="Device" value="Desktop" sub="Chrome browser" />
          <InfoTile icon={Smartphone} label="Operating System" value="Windows 11" />
          <InfoTile icon={Calendar} label="Submitted" value="Aug 4, 2026" sub="10:42 AM" />
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f3ef]">
            <Timer size={15} className="text-[#2c4a3b]" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a9690]">
              Total time spent on form
            </p>
            <p className="text-sm font-semibold text-[#1a2b21]">1 minute 57 seconds</p>
          </div>
        </div>

        {/* Answers */}
        <p className="mb-3 text-sm font-semibold text-[#1a2b21]">Responses</p>
        <div className="flex flex-col gap-3">
          {answers.map((item, i) => (
            <div key={i}>
              <div
                className={`rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${
                  item.answered ? "bg-white" : "bg-[#faf9f6]"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.answered ? (
                      <CheckCircle2 size={14} className="text-[#1a2b21]" />
                    ) : (
                      <XCircle size={14} className="text-[#c3cbc4]" />
                    )}
                    <span className="text-xs font-medium text-[#8a9690]">
                      Question {i + 1}
                    </span>
                  </div>
                  {item.time && (
                    <span className="text-xs text-[#8a9690]">{item.time}</span>
                  )}
                </div>
                <p className="mb-2 text-sm font-medium text-[#1a2b21]">{item.q}</p>
                {item.answered ? (
                  <p className="text-sm text-[#5c6b60]">{item.a}</p>
                ) : (
                  <p className="text-sm italic text-[#c3cbc4]">Not answered</p>
                )}
              </div>

              {i === 3 && (
                <div className="my-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#e8988a]" />
                  <span className="text-xs font-medium text-[#c96a4e]">
                    Respondent left the form here
                  </span>
                  <div className="h-px flex-1 bg-[#e8988a]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}