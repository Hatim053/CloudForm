// FaqAccordion.jsx
// Left: heading + support link. Right: accessible accordion.
// - Each row is a real <button> with aria-expanded / aria-controls
// - Smooth height animation via grid-template-rows (no JS measuring)
// - Respects prefers-reduced-motion
// - One item open at a time by default; pass allowMultiple to change that

import { useId, useState } from "react";
import SectionLink from "./SectionLink";

const DEFAULT_ITEMS = [
  {
    q: "Do I need an account to fill out a form?",
    a: "No. Anyone with your form link can respond without signing up. Only you, the form owner, need a CloudForm account.",
  },
  {
    q: "What happens if someone leaves a form halfway?",
    a: "Their answers so far are saved as a partial submission. You can see them in your responses, and a refill link lets the person continue where they stopped.",
  },
  {
    q: "Can I use CloudForm for waitlists and lead capture?",
    a: "Yes. Forms work for customer feedback, client intake, leads, and waitlist pages. Share one link and collect every response in one place.",
  },
  {
    q: "How do I see how my form is performing?",
    a: "Open the analytics tab to see views, starts, submissions, completion rate, and completion time. Question drop-off shows where people stop.",
  },
  {
    q: "Can I build a link page for my socials?",
    a: "Yes. Creators can publish a simple page that gathers their social links in one place and share it as a single URL.",
  },
  {
    q: "Is my data secure?",
    a: "Responses are stored securely and are only visible to you. You decide who can open a form and who can view its results.",
  },
];

function Item({ item, open, onToggle, baseId }) {
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-cf-forest/20">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest
                     focus-visible:ring-offset-2 focus-visible:ring-offset-cf-bg rounded-sm"
        >
          <span className="text-lg font-semibold tracking-tight text-cf-ink sm:text-xl">
            {item.q}
          </span>

          {/* plus -> minus */}
          <span
            className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cf-forest/30
                        transition-colors duration-200 motion-reduce:transition-none
                        ${open ? "bg-cf-forest text-white" : "text-cf-forest group-hover:bg-cf-sage"}`}
            aria-hidden="true"
          >
            <span className="absolute h-[1.5px] w-3 rounded bg-current" />
            <span
              className={`absolute h-3 w-[1.5px] rounded bg-current transition-transform duration-200 motion-reduce:transition-none
                          ${open ? "scale-y-0" : "scale-y-100"}`}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none
                    ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pr-12 text-[16px] leading-7 text-cf-muted">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({
  eyebrow = "Questions",
  titleBold = "Good to know.",
  titleItalic = "Before you build.",
  description = "Can’t find what you need? Reach out and we’ll help.",
  cta = { label: "Contact support", href: "#contact" },
  items = DEFAULT_ITEMS,
  defaultOpen = 0, // index of the item open on load, or null for all closed
  allowMultiple = false,
}) {
  const uid = useId();
  const [openSet, setOpenSet] = useState(
    () => new Set(defaultOpen === null || defaultOpen === undefined ? [] : [defaultOpen])
  );

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className="bg-cf-bg py-16 sm:py-24" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20 lg:px-10">
        {/* Heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">
            {eyebrow}
          </p>
          <h2
            id="faq-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl"
          >
            {titleBold}
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
              {titleItalic}
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-8 text-cf-muted">{description}</p>
          <div className="mt-8">
            <SectionLink href={cta.href}>{cta.label}</SectionLink>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-t border-cf-forest/20">
          {items.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              baseId={`${uid}-${i}`}
              open={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}