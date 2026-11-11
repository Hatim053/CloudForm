import { useState } from "react";
import FieldShell from "./FieldShell.jsx";
import { isObject } from "../fieldHelpers.js";
import { getReadableTextColor } from "../../../utils/colorUtils.js";

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

// unique Id : cf001shi
// optionList is the list of platforms { id , label , icon , placeholder , color } , selectedOption is the one shown first.
// The respondent picks a platform and types a handle , the answer is {"platform" : "linkedin" , "handle" : "..."}
function SocialHandleInput({ element , id , value , onChange , theme , readOnly , error }) {
  const options = (Array.isArray(element.optionList) ? element.optionList : []).filter((option) => isObject(option) && typeof option.id === "string" && option.id);
  const current = isObject(value) ? value : {};
  const firstChoice = options.find((option) => option.id === element.selectedOption)?.id ?? options[0]?.id;
  const [chosenId, setChosenId] = useState(firstChoice);

  const platform = options.find((option) => option.id === chosenId) ?? options.find((option) => option.id === firstChoice);
  if(!platform) return null;

  const handle = typeof current.handle === "string" ? current.handle : "";
  // the platform is only part of the answer once a handle is typed , so an untouched field stays empty
  const update = (platformId , text) => onChange(text.trim() === "" ? "" : { platform : platformId , handle : text });
  const tileColor = typeof platform.color === "string" && HEX_COLOR.test(platform.color.trim()) ? platform.color.trim() : "#374151";

  return (
    <FieldShell id={id} label={element.label} required={element.isRequired === true} theme={theme} error={error} group>
      {options.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-label={String(option.label ?? option.id)}
              aria-pressed={option.id === platform.id}
              disabled={readOnly}
              onClick={() => { setChosenId(option.id); if(handle) update(option.id , handle); }}
              className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl px-2 text-sm font-bold transition-colors disabled:cursor-default ${option.id === platform.id ? theme.chipActive : theme.chip}`}
            >
              <span aria-hidden="true">{String(option.icon ?? option.id).slice(0 , 4)}</span>
            </button>
          ))}
        </div>
      )}

      <div className={`flex items-center gap-3 px-4 py-3 ${theme.panel}`}>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-black"
          style={{ background : tileColor , color : getReadableTextColor(tileColor , "#111827" , "#ffffff") }}
        >
          {String(platform.icon ?? "").slice(0 , 4)}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`mb-0.5 text-[10px] font-bold uppercase tracking-widest ${theme.faint}`}>{platform.label}</p>
          <input
            id={id}
            type="text"
            placeholder={platform.placeholder}
            value={handle}
            readOnly={readOnly}
            aria-invalid={Boolean(error)}
            aria-label={`${platform.label ?? platform.id} handle`}
            maxLength={100}
            onChange={(event) => update(platform.id , event.target.value)}
            className={`w-full bg-transparent text-base outline-none placeholder:opacity-40 sm:text-sm ${theme.mode === "dark" ? "text-white" : "text-neutral-900"}`}
          />
        </div>
      </div>
    </FieldShell>
  );
}

export default SocialHandleInput;