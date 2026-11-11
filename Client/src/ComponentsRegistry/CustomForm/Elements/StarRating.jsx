import { useState } from "react";
import FieldShell from "./FieldShell.jsx";

const DEFAULT_LEVELS = [1 , 2 , 3 , 4 , 5];

// unique Id : cf001sr
// ratingLevel is the list of values (1 to 5 when missing) , the answer is the chosen number
function StarRating({ element , id , value , onChange , theme , readOnly , error }) {
  const [hover, setHover] = useState(0);

  const levels = (Array.isArray(element.ratingLevel) ? element.ratingLevel : DEFAULT_LEVELS).filter((level) => Number.isFinite(level));
  const max = levels.length > 0 ? Math.max(...levels) : 5;
  const current = typeof value === "number" ? value : 0;

  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} hint={`(1–${max})`} theme={theme} error={error} group>
      <div className="flex flex-wrap gap-1" onMouseLeave={() => setHover(0)}>
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            aria-label={`${level} out of ${max}`}
            aria-pressed={current === level}
            disabled={readOnly}
            onClick={() => onChange(level)}
            onMouseEnter={() => !readOnly && setHover(level)}
            className="rounded-lg p-1 text-3xl leading-none transition-transform hover:scale-125 active:scale-95 motion-reduce:transform-none disabled:cursor-default disabled:hover:scale-100"
          >
            <span aria-hidden="true" style={{ color : (hover || current) >= level ? "#f5a623" : theme.star }}>★</span>
          </button>
        ))}
      </div>
    </FieldShell>
  );
}

export default StarRating;