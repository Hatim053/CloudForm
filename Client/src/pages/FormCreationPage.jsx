import {
  Type,
  AlignLeft,
  ListChecks,
  Star,
  Calendar,
  Upload,
  GripVertical,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FormCreationPage() {
  
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-[#2c4a3b] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a93b]">
            <span className="text-lg font-bold text-[#2c4a3b]">C</span>
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
              Untitled template &middot; Editing
            </p>
            <p className="text-base font-semibold text-white">
              Customer Feedback Survey
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white">
            Save draft
          </span>
          <span className="rounded-full bg-[#f2a93b] px-5 py-2 text-sm font-medium text-[#2c4a3b]">
            Preview
          </span>
        </div>
      </div>

      {/* Builder body */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-5 bg-[#faf9f6] p-6">
        {/* Left: Elements panel */}
        <aside className="col-span-3 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
            Template elements
          </p>
          <p className="mb-4 text-sm text-[#5c6b60]">
            Add or remove fields for this form
          </p>

          <div className="flex flex-col gap-2">
            {[
              { icon: Type, label: "Short text", active: true },
              { icon: AlignLeft, label: "Long text", active: true },
              { icon: ListChecks, label: "Multiple choice", active: true },
              { icon: Star, label: "Rating scale", active: false },
              { icon: Calendar, label: "Date", active: false },
              { icon: Upload, label: "File upload", active: false },
            ].map(({ icon: Icon, label, active }, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl px-3 py-3 ${
                  active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GripVertical size={15} className="text-[#c3cbc4]" />
                  <Icon size={16} className="text-[#2c4a3b]" />
                  <span className="text-sm font-medium text-[#1a2b21]">
                    {label}
                  </span>
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    active
                      ? "bg-[#1a2b21] text-white"
                      : "border border-black/10 text-[#8a9690]"
                  }`}
                >
                  {active ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690]">
            More field types available above
          </div>
        </aside>

        {/* Middle: Live preview */}
        <section className="col-span-6 flex items-center justify-center rounded-2xl bg-[#f4f3ef] p-8">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
            <p className="mb-1 text-xs font-medium text-[#8a9690]">
              Question 2 of 6
            </p>
            <p className="mb-6 text-lg font-semibold text-[#1a2b21]">
              How likely are you to recommend us to a friend?
              <span className="text-[#f2a93b]">*</span>
            </p>

            <div className="mb-8 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`flex flex-1 items-center justify-center rounded-lg py-2.5 text-sm font-medium ${
                    n === 4
                      ? "bg-[#1a2b21] text-white"
                      : "bg-[#f4f3ef] text-[#5c6b60]"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-[#8a9690]">
                <ChevronLeft size={16} />
                Back
              </span>
              <span className="flex items-center gap-1 rounded-full bg-[#f2a93b] px-5 py-2 text-sm font-medium text-[#2c4a3b]">
                Next
                <ChevronRight size={16} />
              </span>
            </div>
          </div>
        </section>

        {/* Right: Element settings */}
        <aside className="col-span-3 flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
              Element settings
            </p>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b21]">
                <Star size={12} className="text-[#f2a93b]" />
              </span>
              <span className="text-sm font-medium text-[#1a2b21]">
                Rating scale
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
                  Question
                </label>
                <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
                  How likely are you to recommend us to a friend?
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
                  Placeholder / helper text
                </label>
                <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#8a9690]">
                  Optional helper text
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
                  Scale range
                </label>
                <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
                  1 to 5
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#f4f3ef] px-3 py-2.5">
                <span className="text-sm font-medium text-[#1a2b21]">
                  Required
                </span>
                <span className="flex h-5 w-9 items-center rounded-full bg-[#1a2b21] p-0.5">
                  <span className="h-4 w-4 translate-x-4 rounded-full bg-white" />
                </span>
              </div>
            </div>
          </div>

          <span className="mt-6 w-full rounded-full bg-[#f2a93b] py-2.5 text-center text-sm font-semibold text-[#2c4a3b]">
            Next
          </span>
        </aside>
      </div>
    </div>
  );
}