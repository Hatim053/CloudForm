import { Link, useParams } from "react-router-dom";
import { ArrowLeft , MapPin , Monitor , Smartphone , Calendar , Timer , CheckCircle2 , XCircle , Eye } from "lucide-react";
import Header from "../components/Header.jsx";
import InfoTile from "../components/InfoTile.jsx";
import AnswerCard from "../components/AnswerCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import StateMessage from "../components/StateMessage.jsx";
import useFetchResponseDetail from "../CustomHooks/useFetchResponseDetail.js";
import { ANALYTICS_PATHS } from "../utils/analyticsPaths.js";
import {
  formatDate,
  formatTime,
  formatDuration,
  formatOs,
  formatLabel,
  formatAnswerValue,
  getRespondentLabel,
  shortId
} from "../utils/analyticsFormatters.js";

const BANNER_STYLES = {
  completed : { icon : CheckCircle2 , box : "bg-[#e6f0ea]" , iconColor : "text-[#2c4a3b]" },
  partial : { icon : XCircle , box : "bg-[#fdf6e8]" , iconColor : "text-[#c9922f]" },
  viewed : { icon : Eye , box : "bg-[#f4f3ef]" , iconColor : "text-[#5c6b60]" }
};

const getBannerText = (response) => {
  if(response.status === "completed") return `Submitted on ${formatDate(response.completedAt)} at ${formatTime(response.completedAt)}`;
  if(response.status === "partial") {
    return response.totalElements > 0
      ? `Left partway through — ${response.answeredCount} of ${response.totalElements} questions answered`
      : "Left partway through";
  }
  return "Opened the page but did not answer anything";
};

// step 3 of the creator analytics : everything about one respondent
function ResponseDetailPage() {
  const { responseId } = useParams();
  const { response, isLoading, error, reload } = useFetchResponseDetail(responseId);

  const backTo = response ? ANALYTICS_PATHS.formResponses(response.formId) : ANALYTICS_PATHS.forms;
  const viewer = response?.viewer;
  const banner = response ? BANNER_STYLES[response.status] ?? BANNER_STYLES.viewed : null;
  const BannerIcon = banner?.icon;
  const unansweredCount = response ? Math.max(0 , (response.totalElements ?? 0) - (response.answeredCount ?? 0)) : 0;

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <Header />

      <main className="mx-auto max-w-[900px] px-4 py-6 sm:px-6 sm:py-8">
        <Link to={backTo} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5c6b60] hover:text-[#1a2b21]">
          <ArrowLeft size={15} />
          Back to responses
        </Link>

        {error ? (
          <StateMessage type="error" title="Could not load this response" message={error} actionLabel="Try again" onAction={reload} />
        ) : !response || isLoading ? (
          <StateMessage type="loading" title="Loading response..." />
        ) : (
          <>
            <div className="mb-5">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Response #{shortId(response._id)}</p>
              <h1 className="break-words text-xl font-semibold text-[#1a2b21] sm:text-2xl">{getRespondentLabel(response)}</h1>
            </div>

            <div className={`mb-5 flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${banner.box}`}>
              <div className="flex items-start gap-2.5">
                <BannerIcon size={18} className={`mt-0.5 shrink-0 ${banner.iconColor}`} />
                <span className="text-sm font-medium text-[#1a2b21]">{getBannerText(response)}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={response.status} />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2c4a3b]">{response.completionPercent}% complete</span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <InfoTile
                icon={MapPin}
                label="Location"
                value={[viewer?.city , viewer?.state].filter(Boolean).join(", ") || "Unknown"}
                sub={viewer?.country}
              />
              <InfoTile
                icon={viewer?.deviceType === "mobile" || viewer?.deviceType === "tablet" ? Smartphone : Monitor}
                label="Device"
                value={viewer?.deviceType ? viewer.deviceType.charAt(0).toUpperCase() + viewer.deviceType.slice(1) : "Unknown"}
                sub={viewer?.browser}
              />
              <InfoTile icon={Monitor} label="Operating system" value={formatOs(viewer)} />
              <InfoTile icon={Calendar} label="Started" value={formatDate(response.startedAt ?? response.createdAt)} sub={formatTime(response.startedAt ?? response.createdAt)} />
            </div>

            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef]">
                <Timer size={15} className="text-[#2c4a3b]" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a9690]">Total time spent on the form</p>
                <p className="text-sm font-semibold text-[#1a2b21]">{formatDuration(response.timeSpentSeconds)}</p>
              </div>
            </div>

            <h2 className="mb-3 text-sm font-semibold text-[#1a2b21]">Answers</h2>

            {response.answers?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {response.answers.map((answer , index) => (
                  <AnswerCard
                    key={answer.elementId}
                    index={index + 1}
                    label={formatLabel(answer.elementLabel) || answer.elementName || answer.elementId}
                    tag={answer.elementName}
                    value={formatAnswerValue(answer.value)}
                    time={answer.timeSpentMs > 0 ? formatDuration(answer.timeSpentMs / 1000) : undefined}
                  />
                ))}

                {response.status === "partial" && (
                  <div className="my-1 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#e8988a]" />
                    <span className="text-center text-xs font-medium text-[#c96a4e]">
                      Respondent left the form here
                      {unansweredCount > 0 ? ` · ${unansweredCount} more ${unansweredCount === 1 ? "question" : "questions"} not answered` : ""}
                    </span>
                    <div className="h-px flex-1 bg-[#e8988a]" />
                  </div>
                )}
              </div>
            ) : (
              <StateMessage type="empty" title="No answers" message="This visitor opened the form but did not fill in anything." />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ResponseDetailPage;