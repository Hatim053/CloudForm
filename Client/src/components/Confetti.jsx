// components/pricing/Confetti.jsx
// Pure CSS confetti. Change `burstKey` (increment a number) to fire a new burst.
// Place inside a `relative` parent; it never blocks clicks.

import { useMemo } from "react";

const COLORS = ["#2f5a45", "#9bbf86", "#a855f7", "#f5c542", "#6aa6ff"];
const COUNT = 22;

export default function Confetti({ burstKey = 0 }) {
  const pieces = useMemo(() => {
    if (!burstKey) return [];
    return Array.from({ length: COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / COUNT + Math.random() * 0.4;
      const dist = 60 + Math.random() * 90;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 30,
        r: Math.random() * 540 - 270,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 6,
      };
    });
  }, [burstKey]);

  if (!burstKey) return null;

  return (
    <div key={burstKey} className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="cf-confetti-piece absolute left-1/2 top-1/2 rounded-[2px]"
          style={{
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            "--x": `${p.x}px`,
            "--y": `${p.y}px`,
            "--r": `${p.r}deg`,
          }}
        />
      ))}
    </div>
  );
}