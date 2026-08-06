import { useState } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Monitor,
  Smartphone,
  Calendar,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Toggle({ active, onSelect }) {
  const options = ["All", "Completed", "Partial"];
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#f4f3ef] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === opt
              ? "bg-[#2c4a3b] text-white shadow-sm"
              : "text-[#5c6b60] hover:text-[#1a2b21]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function FilterField({ icon: Icon, label, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#8a9690]">
        <Icon size={12} />
        {label}
      </label>
      <button className="flex items-center justify-between rounded-xl border border-[#e5e2d9] bg-white px-3 py-2.5 text-left text-sm text-[#8a9690] transition-colors hover:border-[#c3cbc4]">
        {placeholder}
        <ChevronDown size={14} className="text-[#c3cbc4]" />
      </button>
    </div>
  );
}

function FilterChip({ label }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#eaf2ec] px-3 py-1 text-xs font-medium text-[#2c4a3b]">
      {label}
      <X size={11} className="cursor-pointer opacity-60 hover:opacity-100" />
    </span>
  );
}

function ResponseCard({ name, initials, location, device, date, status, pct, time }) {
  const completed = status === "Completed";
  return (
    <div className="group flex cursor-pointer items-center gap-5 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2c4a3b] text-sm font-semibold text-white">
        {initials}
      </span>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-[#1a2b21]">{name}</p>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              completed ? "bg-[#eaf2ec] text-[#2c4a3b]" : "bg-[#fdf6e8] text-[#c9922f]"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#8a9690]">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Monitor size={11} />
            {device}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {date}
          </span>
        </div>
      </div>

      <div className="hidden w-28 shrink-0 sm:block">
        <div className="mb-1 flex items-center justify-between text-[11px] text-[#8a9690]">
          <span>Progress</span>
          <span className="font-semibold tabular-nums text-[#1a2b21]">{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f4f3ef]">
          <div
            className={`h-full rounded-full ${completed ? "bg-[#2c4a3b]" : "bg-[#f2a93b]"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <span className="w-14 shrink-0 text-right text-xs text-[#8a9690]">{time}</span>

      <ArrowRight
        size={16}
        className="shrink-0 text-[#c3cbc4] transition-transform group-hover:translate-x-0.5 group-hover:text-[#2c4a3b]"
      />
    </div>
  );
}

export default function ResponsesList() {
  const [activeToggle, setActiveToggle] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const responses = [
    { name: "Anjali Mehta", initials: "AM", location: "Mumbai, Maharashtra", device: "Desktop", date: "Aug 4, 2026", status: "Partial", pct: 67, time: "1m 57s" },
    { name: "Rohan Kapoor", initials: "RK", location: "Bengaluru, Karnataka", device: "Mobile", date: "Aug 4, 2026", status: "Completed", pct: 100, time: "2m 14s" },
    { name: "Sara Iyer", initials: "SI", location: "Pune, Maharashtra", device: "Desktop", date: "Aug 3, 2026", status: "Completed", pct: 100, time: "1m 32s" },
    { name: "Vikram Nair", initials: "VN", location: "Delhi, Delhi", device: "Mobile", date: "Aug 3, 2026", status: "Partial", pct: 33, time: "0m 48s" },
    { name: "Priya Das", initials: "PD", location: "Kolkata, West Bengal", device: "Tablet", date: "Aug 2, 2026", status: "Completed", pct: 100, time: "2m 41s" },
    { name: "Arjun Rao", initials: "AR", location: "Hyderabad, Telangana", device: "Desktop", date: "Aug 2, 2026", status: "Partial", pct: 50, time: "1m 05s" },
    { name: "Neha Joshi", initials: "NJ", location: "Ahmedabad, Gujarat", device: "Mobile", date: "Aug 1, 2026", status: "Completed", pct: 100, time: "2m 02s" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      {/* Top bar */}
      <div className="flex items-center gap-4 bg-[#2c4a3b] px-6 py-4">
        <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </span>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
            Customer Feedback Survey
          </p>
          <p className="text-base font-semibold text-white">Responses · 248</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-6 py-8">
        {/* Search + toggle + filter trigger */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-[#e5e2d9] bg-white px-4 py-2.5">
            <Search size={15} className="text-[#8a9690]" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full bg-transparent text-sm text-[#1a2b21] placeholder:text-[#c3cbc4] focus:outline-none"
            />
          </div>

          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
              filtersOpen
                ? "border-[#2c4a3b] bg-[#2c4a3b] text-white"
                : "border-[#e5e2d9] bg-white text-[#1a2b21] hover:border-[#c3cbc4]"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <Toggle active={activeToggle} onSelect={setActiveToggle} />
          <p className="text-xs text-[#8a9690]">Showing 7 of 248 responses</p>
        </div>

        {/* Expandable filter panel */}
        {filtersOpen && (
          <div className="mb-5 rounded-2xl border border-[#e5e2d9] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <FilterField icon={MapPin} label="Country" placeholder="Any country" />
              <FilterField icon={MapPin} label="City" placeholder="Any city" />
              <FilterField icon={Monitor} label="Device" placeholder="Any device" />
              <FilterField icon={Calendar} label="Date" placeholder="Any date" />
            </div>
            <div className="flex items-center justify-between border-t border-[#f4f3ef] pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip label="India" />
                <FilterChip label="Desktop" />
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full px-4 py-2 text-sm font-medium text-[#8a9690] transition-colors hover:text-[#1a2b21]">
                  Clear all
                </button>
                <button className="rounded-full bg-[#2c4a3b] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Apply filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-3">
          {responses.map((r, i) => (
            <ResponseCard key={i} {...r} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-[#8a9690]">Page 1 of 36</p>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e2d9] bg-white text-[#8a9690] transition-colors hover:border-[#c3cbc4] hover:text-[#1a2b21]">
              <ChevronLeft size={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2c4a3b] text-sm font-medium text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-[#5c6b60] transition-colors hover:bg-[#f4f3ef]">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-[#5c6b60] transition-colors hover:bg-[#f4f3ef]">
              3
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e2d9] bg-white text-[#8a9690] transition-colors hover:border-[#c3cbc4] hover:text-[#1a2b21]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}