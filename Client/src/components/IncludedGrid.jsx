// components/pricing/IncludedGrid.jsx
// "No tiers. Everything's in." A grid of features, each with a ₹0 tag.
// Cards rise in one after another as you scroll.

import Reveal from "./Reveal.jsx";

const DEFAULT_ITEMS = [
  { title: "One question at a time", body: "A calm, focused form people actually finish." },
  { title: "Autosave", body: "Your work is saved as you build. Nothing gets lost." },
  { title: "Shareable links", body: "Publish a form and share one link anywhere." },
  { title: "Partial submissions", body: "Keep answers from people who leave before Submit." },
  { title: "Refill links", body: "Let people pick up exactly where they left off." },
  { title: "Analytics and drop-off", body: "See views, starts, completions, and where people stop." },
  { title: "Waitlist pages", body: "Collect early sign-ups before you launch." },
  { title: "Creator link pages", body: "One page for all your socials, hosted by you." },
  { title: "AI templates, your language", body: "Describe a form in Hindi, Marathi, Tamil, or Hinglish." },
];

function CheckBadge() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cf-sage text-cf-forest transition-all duration-300 group-hover:scale-110 group-hover:bg-cf-forest group-hover:text-white motion-reduce:transition-none">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

export default function IncludedGrid({
  eyebrow = "What’s included",
  titleBold = "No tiers.",
  titleItalic = "Everything’s in.",
  description = "There’s no basic plan, no pro plan, and no feature stuck behind a lock. This is the whole product.",
  items = DEFAULT_ITEMS,
  currency = "₹",
}) {
  return (
    <section className="bg-cf-bg py-16 sm:py-24" aria-labelledby="included-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">{eyebrow}</p>
          <h2
            id="included-title"
            className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl"
          >
            {titleBold}
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">{titleItalic}</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-cf-muted">{description}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-2xl border border-cf-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(35,42,37,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start justify-between gap-3">
                  <CheckBadge />
                  <span className="rounded-full bg-cf-bg px-2.5 py-1 text-xs font-medium text-cf-forest">
                    {currency}0
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-cf-ink">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-cf-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}