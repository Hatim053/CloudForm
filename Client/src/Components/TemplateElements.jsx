// import { Type , AlignLeft , ListChecks , Star , Calendar , Upload , GripVertical , Minus , Plus
//   , PhoneCall , InboxIcon , Clock , Navigation , StretchHorizontal


//  } from "lucide-react";


// function TemplateElements() {

//     return (
//           <div className="col-span-3 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
//           <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
//             Template elements
//           </p>
//           <p className="mb-4 text-sm text-[#5c6b60]">
//             Add or remove fields for this form
//           </p>

//           <div className="flex flex-col gap-2">
//             {[
//               { icon: StretchHorizontal, label: "Contact-Number", active: true },
//               { icon: Type, label: "Short-text", active: true },
//               { icon: AlignLeft, label: "Long-text", active: true },
//               { icon: ListChecks, label: "Multiple-choice", active: true },
//               { icon: Star, label: "Rating-scale", active: false },
//               { icon: Calendar, label: "Date", active: false },
//               { icon: Upload, label: "File-upload", active: false },
//             ].map(({ icon: Icon, label, active }, i) => (
//               <div
//                 key={i}
//                 className={`flex items-center justify-between rounded-xl px-3 py-3 ${
//                   active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"
//                 }`}
//               >
//                 <div className="flex items-center gap-2.5">
//                   <GripVertical size={15} className="text-[#c3cbc4]" />
//                   <Icon size={16} className="text-[#2c4a3b]" />
//                   <span className="text-sm font-medium text-[#1a2b21]">
//                     {label}
//                   </span>
//                 </div>
//                 <span
//                   className={`flex h-6 w-6 items-center justify-center rounded-full ${
//                     active
//                       ? "bg-[#1a2b21] text-white"
//                       : "border border-black/10 text-[#8a9690]"
//                   }`}
//                 >
//                   {active ? <Minus size={13} /> : <Plus size={13} />}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="mt-5 rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690]">
//             More field types available above
//           </div>
//         </ div>
//     )
// };

// export default TemplateElements;

import { memo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Type , AlignLeft , ListChecks , Star , Calendar , Upload , GripVertical , Minus , Plus
  , PhoneCall , InboxIcon , Clock , Navigation , StretchHorizontal , Pencil
 } from "lucide-react";
// adjust this path to wherever TemplateSlice.js lives in your project
import {
  formatKey,
  getItemTitle,
  selectFieldNames,
  selectSectionNames,
  selectItemKeys,
  selectItem,
  setEditing,
  toggleItem,
} from "../app/TemplateSlice.js";

// icon is picked from a stable discriminator (not the editable title) so it doesn't change while typing
const ICONS = {
  "name": Type, "shorttext": Type, "text": Type,
  "long text": AlignLeft,
  "phone number": PhoneCall, "tel": PhoneCall,
  "email": InboxIcon,
  "date": Calendar, "date & time": Calendar,
  "time": Clock,
  "dropdown": ListChecks, "multi-select": ListChecks,
  "rating-scale": Star,
  "multi-files": Upload, "single-file": Upload,
  "socials": Navigation,
};

const getIcon = (item) => {
  const kind = String(item.name ?? item.type ?? item.platform ?? "").toLowerCase();
  return ICONS[kind] ?? StretchHorizontal;
};

function Row({ icon: Icon, title, active, onToggle, onEdit }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-3 py-3 ${
        active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <GripVertical size={15} className="shrink-0 text-[#c3cbc4]" />
        <Icon size={16} className="shrink-0 text-[#2c4a3b]" />
        <span className="truncate text-sm font-medium text-[#1a2b21]">
          {title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit configuration"
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/5 hover:text-[#1a2b21]"
        >
          <Pencil size={13} />
        </button>

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={active}
            aria-label={active ? "Unselect element" : "Select element"}
            className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${
              active
                ? "bg-[#1a2b21] text-white"
                : "border border-black/10 text-[#8a9690]"
            }`}
          >
            {active ? <Minus size={13} /> : <Plus size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}

// top-level text fields (heading, subHeading, ...): edit only, no select/unselect
// subscribes to nothing, so it never re-renders while the user types
const FieldRow = memo(function FieldRow({ field }) {
  const dispatch = useDispatch();
  return (
    <Row
      icon={Type}
      title={formatKey(field)}
      active
      onEdit={() => dispatch(setEditing({ kind: "field", field }))}
    />
  );
});

// subscribes only to its own item -> re-renders only when that item changes
const ItemRow = memo(function ItemRow({ section, itemKey }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => selectItem(state, section, itemKey));
  if (!item) return null;

  return (
    <Row
      icon={getIcon(item)}
      title={getItemTitle(item)}
      active={item.enabled}
      onToggle={() => dispatch(toggleItem({ section, key: itemKey }))}
      onEdit={() => dispatch(setEditing({ kind: "item", section, key: itemKey }))}
    />
  );
});

function Section({ section }) {
  const keys = useSelector((state) => selectItemKeys(state, section), shallowEqual);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-[#5c6b60]">{formatKey(section)}</p>
      {keys.map((key) => (
        <ItemRow key={key} section={section} itemKey={key} />
      ))}
    </div>
  );
}

function TemplateElements() {
  const fieldNames = useSelector(selectFieldNames, shallowEqual);
  const sectionNames = useSelector(selectSectionNames, shallowEqual);

  return (
    <div className="col-span-3 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
        Template elements
      </p>
      <p className="mb-4 text-sm text-[#5c6b60]">
        Add or remove fields for this form
      </p>

      <div className="flex flex-col gap-4">
        {fieldNames.length > 0 && (
          <div className="flex flex-col gap-2">
            {fieldNames.map((field) => (
              <FieldRow key={field} field={field} />
            ))}
          </div>
        )}

        {sectionNames.map((section) => (
          <Section key={section} section={section} />
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690]">
        More field types available above
      </div>
    </div>
  );
}

export default TemplateElements;