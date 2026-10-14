import { useState , useEffect } from "react";

function CountingRing({ target }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const step = Math.max(1, Math.round(target / 40)); // ~40 ticks to finish
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(interval);
          setDone(true);
          return target;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval); // replace `target` with the real fetched value when wiring this up
  }, [target]);

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      {/* Colorful spinning ring — fades out once the count reaches its target */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"
          }`}
        style={{
          background:
            "conic-gradient(#ef4444 0deg 90deg, #eab308 90deg 180deg, #22c55e 180deg 270deg, #3b82f6 270deg 360deg)",
          animation: "spin-ring 1.1s linear infinite",
          maskImage:
            "radial-gradient(circle, transparent 62%, black 63%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 62%, black 63%)",
        }}
      />
      <span className="relative text-lg font-semibold text-[#1a2b21]">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

export default CountingRing;