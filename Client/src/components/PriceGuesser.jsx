// components/pricing/PriceGuesser.jsx
// "Guess the price." The visitor drags a guess, hits Reveal, and watches
// their number count down to zero (with confetti and a friendly reaction).

import { useId, useState } from "react";
import useCountUp from "../CustomHooks/useCountUp.js";
import Confetti from "./Confetti.jsx";

function reactionFor(guess) {
  if (guess === 0) return "Spot on. You called it.";
  if (guess <= 500) return "Modest guess. Reality is even kinder.";
  if (guess <= 1500) return "Generous! Keep that for chai.";
  return "Whoa. Keep every rupee.";
}

export default function PriceGuesser({
  min = 0,
  max = 2000,
  step = 50,
  initial = 500,
  currency = "₹",
}) {
  const id = useId();
  const [guess, setGuess] = useState(initial);
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(0);

  // Follows the slider; on reveal, counts down to 0 slowly.
  const shown = useCountUp(revealed ? 0 : guess, revealed ? 1300 : 120);
  const pct = ((guess - min) / (max - min)) * 100;
  const fmt = (n) => n.toLocaleString("en-IN");

  const reveal = () => {
    setRevealed(true);
    setBurst((b) => b + 1);
  };
  const tryAgain = () => {
    setRevealed(false);
    setGuess(initial);
  };

  return (
    <div className="rounded-[28px] bg-cf-sage px-5 py-8 sm:px-10 sm:py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">
            A little game
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl">
            Guess the price.
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
              We’ll wait.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-cf-forest">
            How much would you pay each month for a form builder with AI templates,
            analytics, and partial submissions? Drag to guess, then reveal.
          </p>
        </div>

        {/* Game card */}
        <div className="relative rounded-3xl bg-white p-6 shadow-[0_20px_50px_-20px_rgba(35,42,37,0.3)] sm:p-8">
          <Confetti burstKey={burst} />

          <label htmlFor={id} className="text-[15px] font-semibold text-cf-ink">
            Your guess, per month
          </label>

          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-6xl font-semibold tabular-nums tracking-[-0.04em] transition-colors duration-500 motion-reduce:transition-none ${
                revealed ? "text-cf-forest" : "text-cf-ink"
              }`}
            >
              {currency}
              {fmt(shown)}
            </span>
            {revealed && guess > 0 && (
              <span className="text-xl text-cf-muted line-through" aria-label={`Your guess was ${currency}${fmt(guess)}`}>
                {currency}
                {fmt(guess)}
              </span>
            )}
          </div>

          <div className="mt-6">
            <input
              id={id}
              type="range"
              className="cf-range"
              min={min}
              max={max}
              step={step}
              value={guess}
              disabled={revealed}
              style={{ "--pct": `${pct}%` }}
              onChange={(e) => setGuess(Number(e.target.value))}
              aria-valuetext={`${currency}${fmt(guess)} per month`}
            />
            <div className="mt-2 flex justify-between text-xs text-cf-muted">
              <span>{currency}{fmt(min)}</span>
              <span>{currency}{fmt(max)}</span>
            </div>
          </div>

          <div className="mt-7 min-h-[84px]" aria-live="polite">
            {revealed ? (
              <div className="cf-pop">
                <p className="text-lg font-semibold text-cf-ink">
                  The real price: {currency}0. Forever.
                </p>
                <p className="mt-1 text-[15px] text-cf-muted">{reactionFor(guess)}</p>
              </div>
            ) : (
              <p className="text-[15px] text-cf-muted">
                Think about it. We’ll tell you the real price when you’re ready.
              </p>
            )}
          </div>

          <div className="mt-2">
            {revealed ? (
              <button
                type="button"
                onClick={tryAgain}
                className="rounded-full border border-cf-line bg-white px-6 py-3 text-[15px] font-medium text-cf-ink hover:bg-cf-bg
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest"
              >
                Guess again
              </button>
            ) : (
              <button
                type="button"
                onClick={reveal}
                className="rounded-full bg-cf-forest px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cf-ink motion-reduce:transition-none
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest focus-visible:ring-offset-2"
              >
                Reveal the price
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}