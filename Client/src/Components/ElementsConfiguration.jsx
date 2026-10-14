
// import { Star } from "lucide-react";

// function ElementsConfiguration() {


//     return (
//            <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
//                   <div>
//                     <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
//                       Element settings
//                     </p>
//                     <div className="mb-4 flex items-center gap-2">
//                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b21]">
//                         <Star size={12} className="text-[#f2a93b]" />
//                       </span>
//                       <span className="text-sm font-medium text-[#1a2b21]">
//                         Rating scale
//                       </span>
//                     </div>
        
//                     <div className="flex flex-col gap-4">
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Question
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
//                           How likely are you to recommend us to a friend?
//                         </div>
//                       </div>
        
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Placeholder / helper text
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#8a9690]">
//                           Optional helper text
//                         </div>
//                       </div>
        
//                       <div>
//                         <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
//                           Scale range
//                         </label>
//                         <div className="rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21]">
//                           1 to 5
//                         </div>
//                       </div>
        
//                       <div className="flex items-center justify-between rounded-lg bg-[#f4f3ef] px-3 py-2.5">
//                         <span className="text-sm font-medium text-[#1a2b21]">
//                           Required
//                         </span>
//                         <span className="flex h-5 w-9 items-center rounded-full bg-[#1a2b21] p-0.5">
//                           <span className="h-4 w-4 translate-x-4 rounded-full bg-white" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
        
//                   <span className="mt-6 w-full rounded-full bg-[#f2a93b] py-2.5 text-center text-sm font-semibold text-[#2c4a3b]">
//                     Next
//                   </span>
//                 </div>
//     )
// }

// export default ElementsConfiguration;

import { useDispatch, useSelector, useStore } from "react-redux";
import { Pencil, Plus, X } from "lucide-react";
// adjust this path to wherever TemplateSlice.js lives in your project
import {
  HIDDEN_KEYS,
  formatKey,
  getItemTitle,
  selectEditing,
  selectField,
  selectItem,
  selectPreviewData,
  updateField,
  updateItemValue,
  addListEntry,
  removeListEntry,
} from "../app/TemplateSlice.js";

const labelClass = "mb-1.5 block text-xs font-medium text-[#5c6b60]";
const inputClass =
  "w-full rounded-lg bg-[#f4f3ef] px-3 py-2 text-sm text-[#1a2b21] outline-none focus:ring-2 focus:ring-[#f2a93b]/40";

const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === "string");
const isStringRecord = (v) =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v).length > 0 &&
  Object.values(v).every((x) => typeof x === "string");

function PanelTitle({ title }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b21]">
        <Pencil size={12} className="text-[#f2a93b]" />
      </span>
      <span className="text-sm font-medium text-[#1a2b21]">{title}</span>
    </div>
  );
}

// Renders an editor based on the VALUE's type, so it works for any template shape:
// string -> input | boolean -> toggle | {a: "x", b: "y"} -> one input per key | ["x", "y"] -> editable list
function ValueEditor({ label, path, value, onChange, onAdd, onRemove }) {
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between rounded-lg bg-[#f4f3ef] px-3 py-2.5">
        <span className="text-sm font-medium text-[#1a2b21]">{label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(path, !value)}
          className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
            value ? "bg-[#1a2b21]" : "bg-[#c3cbc4]"
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white transition-transform ${
              value ? "translate-x-4" : ""
            }`}
          />
        </button>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <label className="block">
        <span className={labelClass}>{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className={inputClass}
        />
      </label>
    );
  }

  if (isStringRecord(value)) {
    return (
      <div className="flex flex-col gap-3">
        {Object.entries(value).map(([key, nested]) => (
          <ValueEditor
            key={key}
            label={`${label} · ${key}`}
            path={[...path, key]}
            value={nested}
            onChange={onChange}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    );
  }

  if (isStringArray(value)) {
    return (
      <div>
        <span className={labelClass}>{label}</span>
        <div className="flex flex-col gap-2">
          {value.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => onChange([...path, index], e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Remove option"
                onClick={() => onRemove(path, index)}
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/5 hover:text-[#1a2b21]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAdd(path)}
            className="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-[#f4f3ef] px-3 py-1.5 text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0]"
          >
            <Plus size={12} />
            Add option
          </button>
        </div>
      </div>
    );
  }

  return null; // numbers, object arrays, etc. are not editable here
}

// element inside a section (inputElements / links / socialHandles ...)
function ItemEditor({ section, itemKey }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => selectItem(state, section, itemKey));
  if (!item) return null;

  const entries = Object.entries(item).filter(([key]) => !HIDDEN_KEYS.includes(key));

  return (
    <>
      <PanelTitle title={getItemTitle(item)} />
      <div className="flex flex-col gap-4">
        {entries.map(([key, value]) => (
          <ValueEditor
            key={key}
            label={formatKey(key)}
            path={[key]}
            value={value}
            onChange={(path, next) =>
              dispatch(updateItemValue({ section, key: itemKey, path, value: next }))
            }
            onAdd={(path) => dispatch(addListEntry({ section, key: itemKey, path }))}
            onRemove={(path, index) =>
              dispatch(removeListEntry({ section, key: itemKey, path, index }))
            }
          />
        ))}
      </div>
    </>
  );
}

// top-level text field (heading, subHeading, ...)
function FieldEditor({ field }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => selectField(state, field));
  if (typeof value !== "string") return null;

  return (
    <>
      <PanelTitle title={formatKey(field)} />
      <ValueEditor
        label={formatKey(field)}
        path={[field]}
        value={value}
        onChange={(path, next) => dispatch(updateField({ field, value: next }))}
      />
    </>
  );
}

function ElementsConfiguration() {
  const editing = useSelector(selectEditing);
  const store = useStore();

  const handleNext = () => {
    // read at click time (no subscription) -> same object the live preview renders:
    // only selected elements, internal keys stripped
    const payload = selectPreviewData(store.getState());
    console.log("Final payload", payload);
    // TODO: send `payload` to your backend here
  };

  return (
    <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
          Element settings
        </p>

        {!editing && (
          <p className="mt-3 text-sm text-[#8a9690]">
            Click the edit icon on an element to configure it
          </p>
        )}
        {editing?.kind === "field" && <FieldEditor field={editing.field} />}
        {editing?.kind === "item" && (
          <ItemEditor section={editing.section} itemKey={editing.key} />
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="mt-6 w-full cursor-pointer rounded-full bg-[#f2a93b] py-2.5 text-center text-sm font-semibold text-[#2c4a3b]"
      >
        Next
      </button>
    </div>
  );
}

export default ElementsConfiguration;