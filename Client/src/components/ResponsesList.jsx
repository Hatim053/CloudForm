import { Link } from "react-router-dom";
import { MapPin , ChevronRight } from "lucide-react";
import CompletionBar from "./CompletionBar.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { ANALYTICS_PATHS } from "../utils/analyticsPaths.js";
import {
  formatLocation,
  formatDevice,
  formatDate,
  formatTime,
  formatDuration,
  getRespondentLabel,
  getInitials,
  shortId
} from "../utils/analyticsFormatters.js";

// tablets (md) drop the device column , desktops (lg) show every column
const TABLE_COLUMNS = "md:grid-cols-[1.6fr_1.3fr_1fr_0.9fr_1.4fr_1.5rem] lg:grid-cols-[1.6fr_1.3fr_1.2fr_1fr_0.9fr_1.4fr_1.5rem]";

function Avatar({ label }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef] text-xs font-semibold text-[#2c4a3b]">
      {getInitials(label)}
    </span>
  );
}

// phones get one card per response , md and up get a table
// isLoading only dims the rows , so changing page or filter never blanks the screen
function ResponsesList({ responses , isLoading = false }) {
  return (
    <div aria-busy={isLoading} className={isLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
      {/* phones */}
      <ul className="flex flex-col gap-3 md:hidden">
        {responses.map((response) => {
          const label = getRespondentLabel(response);
          return (
            <li key={response._id}>
              <Link
                to={ANALYTICS_PATHS.responseDetail(response._id)}
                className="block rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-[#faf9f6]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar label={label} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#1a2b21]">{label}</p>
                      <p className="text-xs text-[#8a9690]">#{shortId(response._id)}</p>
                    </div>
                  </div>
                  <StatusBadge status={response.status} />
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-sm text-[#5c6b60]">
                  <MapPin size={13} className="shrink-0 text-[#8a9690]" />
                  <span className="min-w-0 break-words">{formatLocation(response.viewer)}</span>
                </p>
                <p className="mt-1 text-xs text-[#8a9690]">
                  {formatDevice(response.viewer)} · {formatDate(response.createdAt)} {formatTime(response.createdAt)} · {formatDuration(response.timeSpentSeconds)}
                </p>

                <div className="mt-3">
                  <CompletionBar percent={response.completionPercent} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* tablets and desktops */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:block">
        <div className={`grid gap-4 border-b border-[#f4f3ef] px-5 py-3 ${TABLE_COLUMNS}`}>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Respondent</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Location</span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-[#8a9690] lg:block">Device</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Date</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Time spent</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Completion</span>
          <span />
        </div>

        {responses.map((response) => {
          const label = getRespondentLabel(response);
          return (
            <Link
              key={response._id}
              to={ANALYTICS_PATHS.responseDetail(response._id)}
              className={`group grid items-center gap-4 border-b border-[#f4f3ef] px-5 py-4 last:border-b-0 hover:bg-[#faf9f6] ${TABLE_COLUMNS}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar label={label} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#1a2b21]">{label}</p>
                  <p className="text-xs text-[#8a9690]">#{shortId(response._id)}</p>
                </div>
              </div>
              <p className="min-w-0 break-words text-sm text-[#5c6b60]">{formatLocation(response.viewer)}</p>
              <p className="hidden min-w-0 text-sm text-[#5c6b60] lg:block">{formatDevice(response.viewer)}</p>
              <p className="text-sm text-[#5c6b60]">{formatDate(response.createdAt)}</p>
              <p className="text-sm text-[#5c6b60]">{formatDuration(response.timeSpentSeconds)}</p>
              <CompletionBar percent={response.completionPercent} />
              <ChevronRight size={16} className="text-[#c3cbc4] transition-colors group-hover:text-[#1a2b21]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ResponsesList;