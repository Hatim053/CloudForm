import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { EMPTY_FILTERS , countActiveFilters } from "../utils/analyticsFilters.js";

const DEVICES = [
  { value : "desktop" , label : "Desktop" },
  { value : "mobile" , label : "Mobile" },
  { value : "tablet" , label : "Tablet" }
];

const labelClass = "mb-1.5 block text-xs font-medium text-[#5c6b60]";
const inputClass = "w-full rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21] outline-none placeholder:text-[#8a9690] focus:ring-2 focus:ring-[#f2a93b]/40";

// the fields are edited locally and only sent to the page on Apply , so typing never triggers a request
// country and city are matched exactly , exactly as they appear in the responses
function ResponseFilters({ values , onApply }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(values);

  useEffect(() => {
    setDraft(values);
  }, [values]);

  const activeCount = countActiveFilters(values);
  const change = (field , value) => setDraft((current) => ({ ...current , [field] : value }));

  const apply = () => {
    onApply(draft);
    setIsOpen(false);
  };

  const reset = () => {
    onApply(EMPTY_FILTERS);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={
          isOpen
            ? "flex cursor-pointer items-center gap-2 rounded-full bg-[#1a2b21] px-4 py-2.5 text-sm font-medium text-white"
            : "flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#1a2b21] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-[#f4f3ef]"
        }
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#f2a93b] px-1 text-xs font-semibold text-[#2c4a3b]">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 z-20 w-[min(20rem,calc(100vw-2rem))] rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-3.5">
            <label className="block">
              <span className={labelClass}>Country</span>
              <input type="text" value={draft.country} onChange={(e) => change("country" , e.target.value)} placeholder="e.g. India" className={inputClass} />
            </label>

            <label className="block">
              <span className={labelClass}>City</span>
              <input type="text" value={draft.city} onChange={(e) => change("city" , e.target.value)} placeholder="e.g. Mumbai" className={inputClass} />
            </label>

            <div>
              <span className={labelClass}>Device</span>
              <div className="flex flex-wrap gap-1.5">
                {DEVICES.map((device) => {
                  const selected = draft.deviceType === device.value;
                  return (
                    <button
                      key={device.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => change("deviceType" , selected ? "" : device.value)}
                      className={
                        selected
                          ? "cursor-pointer rounded-full bg-[#1a2b21] px-3 py-1.5 text-xs font-medium text-white"
                          : "cursor-pointer rounded-full bg-[#f4f3ef] px-3 py-1.5 text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0]"
                      }
                    >
                      {device.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className={labelClass}>From</span>
                <input type="date" value={draft.from} onChange={(e) => change("from" , e.target.value)} className={inputClass} />
              </label>
              <label className="block">
                <span className={labelClass}>To</span>
                <input type="date" value={draft.to} onChange={(e) => change("to" , e.target.value)} className={inputClass} />
              </label>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button type="button" onClick={reset} className="flex-1 cursor-pointer rounded-full bg-[#f4f3ef] py-2.5 text-sm font-medium text-[#5c6b60] hover:bg-[#e8e6e0]">
              Reset
            </button>
            <button type="button" onClick={apply} className="flex-1 cursor-pointer rounded-full bg-[#f2a93b] py-2.5 text-sm font-semibold text-[#2c4a3b] hover:bg-[#e8a230]">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponseFilters;