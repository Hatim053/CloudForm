import { Link } from "react-router-dom";
import { FileText, BarChart3, ArrowUpRight, Link2 } from "lucide-react";
import { ANALYTICS_PATHS } from "../utils/analyticsPaths.js";
const cleanLink = (url = "") => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] focus-visible:ring-offset-2";


function FormCard({ form }) {
  return (
    <div className="group flex min-w-0 flex-col rounded-2xl border border-[#dfe8e1] bg-white p-5 font-dm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2f4d3a]/40 hover:shadow-lg hover:shadow-[#2f4d3a]/10">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6eee8] text-[#2f4d3a] transition-colors duration-200 group-hover:bg-[#2f4d3a] group-hover:text-[#f2a93b]">
          <FileText size={19} />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6eee8] px-2.5 py-1 text-xs font-medium text-[#2f4d3a]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Live
        </span>
      </div>

      <h2 className="font-syne break-words text-lg font-bold leading-snug text-[#2f4d3a]">
        {form.name}
      </h2>
      <p
        className="mb-6 mt-2 flex min-w-0 items-center gap-1.5 text-xs text-[#4b6455]"
        title={form.live_link}
      >
        <Link2 size={13} className="shrink-0" />
        <span className="truncate">{cleanLink(form.live_link)}</span>
      </p>

      <div className="mt-auto flex items-center gap-2">
        <Link
          to={ANALYTICS_PATHS.formResponses(form._id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2f4d3a] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3a5c46] ${focusRing}`}
        >
          <BarChart3 size={15} className="text-[#f2a93b]" />
          View responses
        </Link>
        <a
          href={form.live_link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${form.name}`}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dfe8e1] text-[#2f4d3a] transition-colors hover:border-[#2f4d3a]/40 hover:bg-[#f4f7f4] ${focusRing}`}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}

export default FormCard;