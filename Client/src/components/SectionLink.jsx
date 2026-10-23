// SectionLink.jsx
// Shared "Explore ..." text link with an arrow that nudges right on hover.

export default function SectionLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 text-[15px] font-medium text-cf-ink
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cf-forest
                 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm"
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </a>
  );
}