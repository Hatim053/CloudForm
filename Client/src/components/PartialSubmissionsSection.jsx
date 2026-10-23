// PartialSubmissionsSection.jsx
// Sage-green rounded panel. Left: copy + link. Right: a real 3-step sequence,
// so the 01/02/03 numbering carries meaning here.

import SectionLink from "./SectionLink";

const DEFAULT_STEPS = [
  {
    title: "A conversation starts",
    body: "Someone begins answering your form.",
  },
  {
    title: "Life happens. Answers stay.",
    body: "Partial responses remain available in CloudForm.",
  },
  {
    title: "There’s a way back",
    body: "A refill link lets them continue the form.",
  },
];

export default function PartialSubmissionsSection({
  eyebrow = "Partial submissions",
  titleBold = "Capture answers.",
  titleItalic = "Even before Submit.",
  description = "Capture answers even when someone leaves before pressing Submit. With partial submissions and refill links, people can pick up where they left off.",
  cta = { label: "Explore partial submissions", href: "#partial-submissions" },
  steps = DEFAULT_STEPS,
}) {
  return (
    <section className="bg-cf-bg px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="partial-title">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-cf-sage px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          {/* Copy */}
          <div className="flex flex-col">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">
              {eyebrow}
            </p>

            <h2
              id="partial-title"
              className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl"
            >
              {titleBold}
              <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
                {titleItalic}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-cf-muted">{description}</p>

            <div className="mt-10 lg:mt-auto lg:pt-10">
              <SectionLink href={cta.href}>{cta.label}</SectionLink>
            </div>
          </div>

          {/* Steps */}
          <ol className="divide-y divide-cf-forest/20">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 py-6 first:pt-0 last:pb-0 sm:gap-6">
                <span
                  className="w-9 shrink-0 text-3xl font-light leading-none tracking-tight text-cf-forest"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-cf-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-6 text-cf-forest">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}