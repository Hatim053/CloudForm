import { memo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Type, AlignLeft, ListChecks, Star, Calendar, Upload, GripVertical, Minus, Plus,
  PhoneCall, InboxIcon, Clock, Navigation, StretchHorizontal, Pencil,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

// sections that scroll horizontally on mobile. Change the key if yours differs.
const HORIZONTAL_SECTIONS = ["inputElements"];

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

function Row({ icon: Icon, title, active, onToggle, onEdit, chip = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-2 ${
        chip
          ? "shrink-0 rounded-full py-1.5 pl-3 pr-1.5 lg:w-full lg:shrink lg:rounded-xl lg:px-3 lg:py-3"
          : "rounded-xl px-2.5 py-2 sm:px-3 sm:py-3"
      } ${active ? "bg-[#fdf6e8]" : "bg-[#f4f3ef]"}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <GripVertical
          size={15}
          className={`shrink-0 text-[#c3cbc4] ${chip ? "hidden lg:block" : ""}`}
        />
        <Icon size={16} className="shrink-0 text-[#2c4a3b]" />
        <span
          className={`truncate text-sm font-medium text-[#1a2b21] ${
            chip ? "max-w-[140px] whitespace-nowrap lg:max-w-none" : ""
          }`}
        >
          {title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit configuration"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#8a9690] hover:bg-black/5 hover:text-[#1a2b21] lg:h-6 lg:w-6"
        >
          <Pencil size={13} />
        </button>

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={active}
            aria-label={active ? "Unselect element" : "Select element"}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full lg:h-6 lg:w-6 ${
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
const ItemRow = memo(function ItemRow({ section, itemKey, chip = false }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => selectItem(state, section, itemKey));
  if (!item) return null;

  return (
    <Row
      chip={chip}
      icon={getIcon(item)}
      title={getItemTitle(item)}
      active={item.enabled}
      onToggle={() => dispatch(toggleItem({ section, key: itemKey }))}
      onEdit={() => dispatch(setEditing({ kind: "item", section, key: itemKey }))}
    />
  );
});
function ScrollRow({ children }) {
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  });

  const scrollBy = (dir) =>
    ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const arrowClass =
    "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a2b21] shadow-[0_1px_4px_rgba(0,0,0,0.2)] lg:hidden";

  return (
    <div className="relative -mx-4 sm:-mx-5 lg:mx-0">
      {canLeft && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-10 bg-gradient-to-r from-white to-transparent lg:hidden" />
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className={`${arrowClass} left-1`}
          >
            <ChevronLeft size={16} />
          </button>
        </>
      )}

      <div
        ref={ref}
        onScroll={update}
        className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {children}
      </div>

      {canRight && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-10 bg-gradient-to-l from-white to-transparent lg:hidden" />
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className={`${arrowClass} right-1`}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

function Section({ section }) {
  const keys = useSelector((state) => selectItemKeys(state, section), shallowEqual);
  const horizontal = HORIZONTAL_SECTIONS.includes(section);

  const rows = keys.map((key) => (
    <ItemRow key={key} section={section} itemKey={key} chip={horizontal} />
  ));

  return (
    <div
      className={`flex min-w-0 flex-col gap-2 ${
        horizontal ? "order-last lg:order-none" : ""
      }`}
    >
      <p className="text-xs font-medium text-[#5c6b60]">{formatKey(section)}</p>

      {horizontal ? (
        <ScrollRow>{rows}</ScrollRow>
      ) : (
        <div className="flex flex-col gap-2">{rows}</div>
      )}
    </div>
  );
}

function TemplateElements() {
  const fieldNames = useSelector(selectFieldNames, shallowEqual);
  const sectionNames = useSelector(selectSectionNames, shallowEqual);

  return (
    <aside className="min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:p-5 lg:sticky lg:top-4 lg:col-span-3 lg:max-h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
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

      <div className="mt-5 hidden rounded-xl bg-[#f4f3ef] px-3 py-3 text-center text-xs text-[#8a9690] lg:block">
        More field types available above
      </div>
    </aside>
  );
}

export default TemplateElements;