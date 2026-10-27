// components/pricing/FreeSlider.jsx
// "Drag it. It's still free." One reusable card; use it twice on the page
// (forms and responses) with different props.
//
// Behavior:
//  - big animated counter follows the slider
//  - a 40-cell meter fills up
//  - confetti fires every time you cross a milestone
//  - the price stays at 0, with a little pop each time

import { useEffect, useId, useRef, useState } from "react";
import useCountUp from "../CustomHooks/useCountUp.js";
import Confetti from "./Confetti.jsx";

const CELLS = 40;

function messageFor(value, max) {
  const r = value / max;
  if (value >= max) return "Maxed out. Still free. Yes, really.";
  if (r >= 0.75) return "Power user mode. Still ₹0.";
  if (r >= 0.4) return "Now we’re talking. Still ₹0.";
  if (r >= 0.1) return "Still free.";
  return "Warming up. Free from the very first one.";
}

export default function FreeSlider({
  label = "How many forms will you create?",
  unit = "forms",
  min = 1,
  max = 1000,
  step = 1,
  initial = 100,
  milestones = [10, 100, 250, 500, 1000],
  currency = "₹",
}) {
  const id = useId();
  const [value, setValue] = useState(initial);
  const [burst, setBurst] = useState(0);

  const shown = useCountUp(value, 300);
  const pct = ((value - min) / (max - min)) * 100;
  const filled = Math.max(1, Math.round((value / max) * CELLS));

  // Fire confetti when a new milestone is crossed upward.
  const passed = milestones.filter((m) => value >= m).length;
  const prevPassed = useRef(passed);
  useEffect(() => {
    if (passed > prevPassed.current) setBurst((b) => b + 1);
    prevPassed.current = passed;
  }, [passed]);

  const fmt = (n) => n.toLocaleString("en-IN");

  return (
    <div className="rounded-[28px] border border-cf-line bg-white p-5 sm:p-8">
      <label htmlFor={id} className="text-[15px] font-semibold text-cf-ink">
        {label}
      </label>

      {/* Counter */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-5xl font-semibold tabular-nums tracking-[-0.04em] text-cf-ink sm:text-6xl">
          {fmt(shown)}
        </span>
        <span className="text-lg text-cf-muted">{unit}</span>
      </div>

      {/* Meter */}
      <div className="mt-5 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1" aria-hidden="true">
        {Array.from({ length: CELLS }, (_, i) => (
          <span
            key={i}
            style={{ transitionDelay: `${i * 6}ms` }}
            className={`h-3 rounded-[3px] transition-colors duration-300 motion-reduce:transition-none ${
              i < filled ? "bg-cf-forest" : "bg-cf-line"
            }`}
          />
        ))}
      </div>

      {/* Slider */}
      <div className="mt-6">
        <input
          id={id}
          type="range"
          className="cf-range"
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ "--pct": `${pct}%` }}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-valuetext={`${fmt(value)} ${unit}. Price: ${currency}0`}
        />
        <div className="mt-2 flex justify-between text-xs text-cf-muted">
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      </div>

      {/* Milestone chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {milestones.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setValue(m)}
            aria-pressed={value === m}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors motion-reduce:transition-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest ${
                          value >= m
                            ? "border-cf-forest bg-cf-sage text-cf-forest"
                            : "border-cf-line bg-cf-bg text-cf-ink hover:bg-cf-sage"
                        }`}
          >
            {fmt(m)}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="relative mt-8 rounded-2xl bg-cf-sage px-5 py-5">
        <Confetti burstKey={burst} />
        <p className="text-sm font-medium text-cf-forest">You pay</p>
        <div className="mt-1 flex items-end gap-3">
          <span
            key={passed}
            className="cf-pop inline-block text-6xl font-semibold leading-none tracking-[-0.04em] text-cf-ink"
          >
            {currency}0
          </span>
          <span className="pb-1 text-[15px] text-cf-forest">for {fmt(value)} {unit}</span>
        </div>
        <p className="mt-3 text-[15px] text-cf-forest" aria-live="polite">
          {messageFor(value, max)}
        </p>
      </div>
    </div>
  );
}