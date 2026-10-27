// pages/PricingPage.jsx
// Hero price tag -> two "still free" sliders -> guess the price -> included grid
// -> FAQ -> footer.
//
// Assumes the earlier section components live in ../components/sections/
// (FaqAccordion.jsx, Footer.jsx, SectionLink.jsx). Adjust the imports if not.

import FreeSlider from "../components/FreeSlider.jsx";
import PriceGuesser from "../components/PriceGuesser.jsx";
import IncludedGrid from "../components/IncludedGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import Accordian from "../components/Accordian.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const CURRENCY = "₹";

const PRICING_FAQ = [
  {
    q: "Is CloudForm really free?",
    a: "Yes. There’s no paid plan, no trial that expires, and no feature held back for a higher tier.",
  },
  {
    q: "Do I need a credit card?",
    a: "No. Sign up and start building. We never ask for card details.",
  },
  {
    q: "Are there limits on forms or responses?",
    a: "There’s no price attached to any amount. If fair-use limits are ever needed to keep the service running for everyone, they’ll be stated clearly here.",
  },
  {
    q: "Is the AI template generator free too?",
    a: "Yes, it’s part of CloudForm. During busy periods it may ask you to wait a minute before generating again.",
  },
  {
    q: "Will it stay free?",
    a: "That’s the plan. You can read how we keep it going on the About page.",
  },
];

function PriceTag() {
  return (
    <div className="cf-float relative mx-auto w-fit">
      <div className="relative overflow-hidden rounded-[32px] border border-cf-line bg-white px-10 py-8 shadow-[0_30px_70px_-25px_rgba(35,42,37,0.35)] sm:px-14 sm:py-10">
        <span className="cf-shimmer pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cf-sage/80 to-transparent" aria-hidden="true" />
        <p className="text-sm font-medium text-cf-forest">CloudForm</p>
        <p className="mt-1 text-7xl font-semibold leading-none tracking-[-0.05em] text-cf-ink sm:text-8xl">
          {CURRENCY}0
        </p>
        <p className="mt-3 text-[15px] text-cf-muted">per month, forever</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-cf-bg">
        <Header/>
      {/* Hero */}
      <section className="px-6 pb-12 pt-16 sm:pb-20 sm:pt-24 lg:px-10" aria-labelledby="pricing-title">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">Pricing</p>
            <h1
              id="pricing-title"
              className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-cf-ink sm:text-6xl lg:text-7xl"
            >
              Simple pricing.
              <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
                It’s free.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-cf-muted">
              Every feature, every form, every response. Nothing to unlock and nothing to upgrade.
              Don’t believe it? Drag the sliders below and try to make it cost something.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#signup"
                className="rounded-full bg-cf-forest px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-cf-ink motion-reduce:transition-none
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cf-bg"
              >
                Start building, free
              </a>
              <a
                href="#sliders"
                className="rounded-sm text-[15px] font-medium text-cf-ink underline-offset-4 hover:underline
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest"
              >
                Try to break it ↓
              </a>
            </div>
          </div>

          <PriceTag />
        </div>
      </section>

      {/* Sliders */}
      <section id="sliders" className="px-6 py-12 sm:py-16 lg:px-10" aria-labelledby="sliders-title">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">Go on, push it</p>
            <h2
              id="sliders-title"
              className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl"
            >
              Drag it.
              <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
                Still free.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <FreeSlider
                label="How many forms will you create?"
                unit="forms"
                min={1}
                max={1000}
                initial={100}
                milestones={[10, 100, 150, 250, 500, 1000]}
                currency={CURRENCY}
              />
            </Reveal>
            <Reveal delay={120}>
              <FreeSlider
                label="How many responses will you collect?"
                unit="responses"
                min={10}
                max={10000}
                step={10}
                initial={1000}
                milestones={[100, 1000, 2500, 5000, 10000]}
                currency={CURRENCY}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Guess the price */}
      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-label="Guess the price">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <PriceGuesser currency={CURRENCY} />
          </Reveal>
        </div>
      </section>

      {/* Included */}
      <IncludedGrid currency={CURRENCY} />

      {/* FAQ */}
      <Accordian
        eyebrow="Pricing questions"
        titleBold="Questions about ₹0."
        titleItalic="Answered."
        description="Still suspicious? Fair. Here’s the straight version."
        cta={{ label: "Read how we stay free", href: "/about" }}
        items={PRICING_FAQ}
      />

      <Footer ctaTitleBold="Build your first form." ctaTitleItalic="It costs nothing." />
    </div>
  );
}