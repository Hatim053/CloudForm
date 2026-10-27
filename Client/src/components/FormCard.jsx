import { Link } from "react-router-dom";
import { FileText , ExternalLink , BarChart3 } from "lucide-react";
import { ANALYTICS_PATHS } from "../utils/analyticsPaths.js";

// one form of the "pick a form" screen : form = { _id , name , live_link }
function FormCard({ form }) {
  return (
    <div className="flex min-w-0 flex-col rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2b21]">
          <FileText size={17} className="text-[#f2a93b]" />
        </span>
        <div className="min-w-0">
          <p className="break-words text-base font-semibold text-[#1a2b21]">{form.name}</p>
          <p className="mt-0.5 truncate text-xs text-[#8a9690]" title={form.live_link}>
            {form.live_link}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2">
        <Link
          to={ANALYTICS_PATHS.formResponses(form._id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#f2a93b] px-4 py-2.5 text-sm font-semibold text-[#2c4a3b] hover:bg-[#e8a230]"
        >
          <BarChart3 size={15} />
          View responses
        </Link>
        <a
          href={form.live_link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${form.name}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef] text-[#2c4a3b] hover:bg-[#e8e6e0]"
        >
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

export default FormCard;