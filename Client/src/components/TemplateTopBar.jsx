import TemplateSearchBar from "./TemplateSearchBar.jsx";
import { NavLink, useNavigate } from "react-router-dom";

function TemplateTopBar() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#2f4d3a] px-4 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 md:flex-nowrap">
        {/* Left: back button + brand */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2a93b]">
            <span className="text-lg font-bold text-[#2c4a3b]">C</span>
          </span>

          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
              Templates
            </p>
            <p className="truncate text-sm font-semibold text-white sm:text-base">
              Choose a starting point
            </p>
          </div>
        </div>

        {/* Right: search + CTA */}
        <div className="flex w-full items-center gap-2 sm:gap-3 md:w-auto">
          <div className="min-w-0 flex-1 md:flex-none">
            <TemplateSearchBar />
          </div>
          <NavLink
            to="/generate-ai-template"
            className="shrink-0 whitespace-nowrap rounded-full bg-[#f2a93b] px-4 py-2 text-xs font-medium text-[#2c4a3b] transition hover:brightness-95 sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">AI</span>
            <span className="hidden sm:inline">Generate With AI</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default TemplateTopBar;