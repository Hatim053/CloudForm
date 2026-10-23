// AnalyticsSection.jsx
// Left: copy + checklist + link. Right: a mock CloudForm analytics dashboard
// (filters, 5 stat tiles, smooth area chart). No chart library needed.

import SectionLink from "./SectionLink";

/* ---------- default content (override via props) ---------- */

const DEFAULT_STATS = [
  { key: "views", label: "Views", value: "12,550", tone: "violet", icon: "eye" },
  { key: "starts", label: "Starts", value: "865", tone: "blue", icon: "play" },
  { key: "submissions", label: "Submissions", value: "213", tone: "green", icon: "check" },
  { key: "rate", label: "Completion Rate", value: "25%", tone: "amber", icon: "percent" },
  { key: "time", label: "Completion Time", value: "1m 50s", tone: "gray", icon: "clock" },
];

const DEFAULT_SERIES = [
  320, 610, 540, 520, 330, 290, 600, 490, 530, 280, 300, 560, 500, 330, 10,
];
const DEFAULT_LABELS = [
  "May 3", "May 5", "May 7", "May 9", "May 11", "May 13", "May 15", "May 17",
  "May 19", "May 21", "May 23", "May 25", "May 27", "May 29", "May 31",
];

const DEFAULT_POINTS = [
  "Responses and basic analytics",
  "Advanced analytics and question drop-off",
];

/* ---------- tone classes (kept literal so Tailwind can see them) ---------- */

const TONES = {
  violet: { tile: "bg-cf-violet-tile", text: "text-purple-600" },
  blue: { tile: "bg-cf-blue-tile", text: "text-blue-600" },
  green: { tile: "bg-cf-green-tile", text: "text-green-700" },
  amber: { tile: "bg-cf-amber-tile", text: "text-amber-700" },
  gray: { tile: "bg-cf-gray-tile", text: "text-cf-ink" },
};

/* ---------- small pieces ---------- */

function Icon({ name, className = "h-3.5 w-3.5" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="M6 4l14 8-14 8V4Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      );
    case "percent":
      return (
        <svg {...common}>
          <path d="M19 5L5 19" />
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    default:
      return null;
  }
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 text-cf-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function FilterPill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-cf-line bg-white px-2.5 py-1.5 text-[11px] text-cf-ink">
      {icon && <Icon name={icon} className="h-3 w-3 text-cf-muted" />}
      {children}
      <Chevron />
    </span>
  );
}

function StatTile({ stat }) {
  const tone = TONES[stat.tone] ?? TONES.gray;
  return (
    <div className={`rounded-lg px-3 py-3 shadow-sm ring-1 ring-black/[0.03] ${tone.tile}`}>
      <div className={`flex items-center gap-1.5 text-[11px] font-medium ${tone.text}`}>
        <Icon name={stat.icon} className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{stat.label}</span>
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-cf-ink sm:text-2xl">
        {stat.value}
      </div>
    </div>
  );
}

/* ---------- area chart (pure SVG) ---------- */

function AreaChart({ series, labels }) {
  const W = 700;
  const H = 250;
  const pad = { l: 44, r: 12, t: 12, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = 700;
  const grid = [0, 200, 400, 600];

  const x = (i) => pad.l + (i / (series.length - 1)) * innerW;
  const y = (v) => pad.t + innerH - (v / max) * innerH;

  // Smooth curve: horizontal-tangent cubic segments between points
  let line = `M${x(0)},${y(series[0])}`;
  for (let i = 1; i < series.length; i++) {
    const mx = (x(i - 1) + x(i)) / 2;
    line += ` C${mx},${y(series[i - 1])} ${mx},${y(series[i])} ${x(i)},${y(series[i])}`;
  }
  const area = `${line} L${x(series.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Line chart of form views over the last 30 days"
    >
      <defs>
        <linearGradient id="cf-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {grid.map((g) => (
        <g key={g}>
          <line
            x1={pad.l}
            x2={W - pad.r}
            y1={y(g)}
            y2={y(g)}
            stroke="#e7e5e4"
            strokeDasharray="3 4"
          />
          <text x={pad.l - 10} y={y(g) + 3} textAnchor="end" fontSize="9" fill="#a8a29e">
            {g}
          </text>
        </g>
      ))}

      <path d={area} fill="url(#cf-area)" />
      <path d={line} fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinejoin="round" />

      {labels.map((l, i) =>
        // Show every label on wide screens' viewBox; the SVG scales so keep all
        <text
          key={l}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          fontSize="9"
          fill="#78716c"
        >
          {l}
        </text>
      )}
    </svg>
  );
}

/* ---------- section ---------- */

export default function AnalyticsSection({
  eyebrow = "Understand every step of your form",
  titleBold = "Form analytics.",
  titleItalic = "See what works.",
  description = "See how people find, start, and finish your forms. Use the patterns to understand what’s working and where to make the next question easier.",
  points = DEFAULT_POINTS,
  cta = { label: "Explore form analytics", href: "#analytics" },
  caption = "A closer look at your form’s performance.",
  stats = DEFAULT_STATS,
  series = DEFAULT_SERIES,
  labels = DEFAULT_LABELS,
}) {
  return (
    <section className="bg-cf-bg py-16 sm:py-24" aria-labelledby="analytics-title">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-10">
        {/* Copy */}
        <div className="lg:pt-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">
            {eyebrow}
          </p>

          <h2
            id="analytics-title"
            className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-cf-ink sm:text-6xl"
          >
            {titleBold}
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
              {titleItalic}
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-lg leading-8 text-cf-muted">{description}</p>

          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[17px] text-cf-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-cf-ink"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <SectionLink href={cta.href}>{cta.label}</SectionLink>
          </div>
        </div>

        {/* Mock dashboard */}
        <figure className="min-w-0">
          <div className="rounded-[28px] border border-cf-line bg-white/60 p-3 sm:p-3.5">
            <div className="flex flex-wrap gap-2">
              <FilterPill icon="calendar">Last 30 Days</FilterPill>
              <FilterPill icon="list">All Devices</FilterPill>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s) => (
                <StatTile key={s.key} stat={s} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between px-0.5">
              <span className="text-[11px] text-cf-muted">Trends</span>
              <FilterPill>Views</FilterPill>
            </div>

            <div className="mt-2 overflow-x-auto rounded-xl bg-white p-2 sm:p-3">
              <div className="min-w-[520px]">
                <AreaChart series={series} labels={labels} />
              </div>
            </div>
          </div>

          <figcaption className="mt-4 text-[15px] text-cf-muted">{caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}