// Footer.jsx
// Deep-green rounded panel that echoes the sage panel above it.
// Top: closing CTA. Middle: brand + link columns. Bottom: legal row.

const DEFAULT_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Form builder", href: "#builder" },
      { label: "Analytics", href: "#analytics" },
      { label: "Partial submissions", href: "#partial-submissions" },
      { label: "Waitlist pages", href: "#waitlists" },
      { label: "Link pages", href: "#link-pages" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Customer feedback", href: "#feedback" },
      { label: "Client intake", href: "#intake" },
      { label: "Lead capture", href: "#leads" },
      { label: "For creators", href: "#creators" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "GitHub", href: "https://github.com/Hatim053/CloudForm" },
    ],
  },
];

function Logo() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-cf-forest"
      aria-label="CloudForm home"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
        <path
          d="M9 24a6 6 0 0 1-.6-11.97A8 8 0 0 1 23.7 10.6 6.5 6.5 0 0 1 23 24H9Z"
          fill="#e5edd6"
        />
        <path d="M12 18h8M12 21h5" stroke="#2f5a45" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">CloudForm</span>
    </a>
  );
}

export default function Footer({
  ctaTitleBold = "Ready to build your form?",
  ctaTitleItalic = "It takes a minute.",
  cta = { label: "Start for free", href: "#signup" },
  tagline = "Build forms, waitlists, and link pages. Collect every response in one place.",
  columns = DEFAULT_COLUMNS,
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="bg-cf-bg px-4 pb-6 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-cf-forest px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
        {/* Closing CTA */}
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            {ctaTitleBold}
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-cf-sage">
              {ctaTitleItalic}
            </span>
          </h2>

          <a
            href={cta.href}
            className="inline-flex w-fit items-center rounded-full bg-cf-sage px-7 py-3.5 text-[15px] font-semibold text-cf-ink
                       transition-colors duration-200 hover:bg-white motion-reduce:transition-none
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-cf-forest"
          >
            {cta.label}
          </a>
        </div>

        {/* Brand + columns */}
        <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[16px] leading-7 text-white/75">{tagline}</p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[15px] font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="rounded-sm text-[15px] text-white/75 transition-colors duration-200 hover:text-white motion-reduce:transition-none
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cf-forest"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal row */}
        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-[14px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CloudForm. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white">Privacy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}