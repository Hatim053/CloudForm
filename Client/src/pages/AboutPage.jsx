// pages/AboutPage.jsx
// Hero -> story -> principles -> "how we stay free" -> builder card -> footer.
//
// EDIT THE TEXT BELOW: the story, the "free" explanation, and the builder
// details are starter copy. Replace them with your real words.

import Reveal from "../components/Reveal.jsx";
import Footer from "../components/Footer.jsx";
import SectionLink from "../components/SectionLink.jsx";
import Header from "../components/Header.jsx";

const STORY = [
  "Collecting answers shouldn’t need a subscription. Whether it’s customer feedback, a client inquiry, a waitlist, or a lead form, the tools people need are simple, and they should be free to use.",
  "CloudForm is a form builder made for that. It shows one question at a time, saves your work as you go, and keeps the answers of people who leave halfway. You can also turn a form into a waitlist page, or build a link page for your socials.",
  "And because not everyone thinks in English, you can describe the form you want in your own language and let the AI draft it for you.",
];

const PRINCIPLES = [
  {
    title: "Free, for real",
    body: "No paid plans and no locked features. The whole product is open to everyone.",
  },
  {
    title: "Your language first",
    body: "Describe a form in Hindi, Marathi, Tamil, Hinglish, and more. No translating in your head.",
  },
  {
    title: "Every answer counts",
    body: "Partial submissions and refill links mean a half-finished form still tells you something.",
  },
  {
    title: "Built in the open",
    body: "The code is public on GitHub. Look around, ask questions, suggest changes.",
  },
];

const FREE_EXPLANATION =
  "CloudForm is built and maintained as an open project, and we keep running costs low on purpose. Write here how the project stays sustainable: self-hosting, donations, sponsors, or a plan for the future.";

const DEFAULT_BUILDER = {
  name: "Hatim",
  role: "Creator of CloudForm",
  bio: "Building CloudForm in the open.",
  github: "https://github.com/Hatim053",
};

const REPO_URL = "https://github.com/Hatim053/CloudForm";

export default function AboutPage({ builder = DEFAULT_BUILDER }) {
  const initials = builder.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-cf-bg">
        <Header/>
      {/* Hero */}
      <section className="px-6 pb-12 pt-16 sm:pb-20 sm:pt-24 lg:px-10" aria-labelledby="about-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">About CloudForm</p>
          <h1
            id="about-title"
            className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-cf-ink sm:text-6xl lg:text-7xl"
          >
            Forms should be simple.
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
              Free, and yours.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cf-muted">
            CloudForm helps you collect responses from customers, clients, and leads, build waitlists,
            and share your socials, without ever paying for it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-12 sm:py-16 lg:px-10" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <h2 id="story-title" className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl">
              Why we
              <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">built it.</span>
            </h2>
          </Reveal>
          <div className="space-y-6">
            {STORY.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-lg leading-8 text-cf-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-12 sm:py-16 lg:px-10" aria-labelledby="principles-title">
        <div className="mx-auto max-w-7xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">What we believe</p>
          <h2 id="principles-title" className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl">
            Four simple
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">promises.</span>
          </h2>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 100}>
                <div className="group h-full rounded-2xl border border-cf-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(35,42,37,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="text-3xl font-light tracking-tight text-cf-forest" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-cf-ink">{p.title}</h3>
                  <p className="mt-2 text-[16px] leading-7 text-cf-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* How it stays free */}
      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="free-title">
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-[28px] bg-cf-sage px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">The honest part</p>
                <h2 id="free-title" className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl">
                  How it stays
                  <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">free.</span>
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-cf-forest">{FREE_EXPLANATION}</p>
                <div className="mt-8">
                  <SectionLink href={REPO_URL}>See the code on GitHub</SectionLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Builder */}
      <section className="px-6 py-12 sm:py-16 lg:px-10" aria-labelledby="builder-title">
        <div className="mx-auto max-w-7xl">
          <h2 id="builder-title" className="sr-only">The builder</h2>
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[28px] border border-cf-line bg-white p-6 sm:flex-row sm:items-center sm:p-8">
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-cf-forest text-2xl font-semibold text-white"
                aria-hidden="true"
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl font-semibold tracking-tight text-cf-ink">{builder.name}</p>
                <p className="text-[15px] text-cf-forest">{builder.role}</p>
                <p className="mt-2 text-[16px] leading-7 text-cf-muted">{builder.bio}</p>
              </div>
              <div className="sm:self-center">
                <SectionLink href={builder.github}>GitHub profile</SectionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer ctaTitleBold="Come build with us." ctaTitleItalic="It’s free." />
    </div>
  );
}