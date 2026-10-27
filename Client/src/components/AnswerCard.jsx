import { CheckCircle2 } from "lucide-react";

// one answered question : the label and element name are the snapshots saved with the answer
function AnswerCard({ index , label , tag , value , time }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <CheckCircle2 size={14} className="shrink-0 text-[#1a2b21]" />
          <span className="text-xs font-medium text-[#8a9690]">Answer {index}</span>
          {tag && <span className="truncate rounded-full bg-[#f4f3ef] px-2 py-0.5 text-[11px] font-medium text-[#5c6b60]">{tag}</span>}
        </div>
        {time && <span className="shrink-0 text-xs text-[#8a9690]">{time}</span>}
      </div>
      <p className="mb-1.5 break-words text-sm font-medium text-[#1a2b21]">{label}</p>
      <p className="whitespace-pre-wrap break-words text-sm text-[#5c6b60]">{value}</p>
    </div>
  );
}

export default AnswerCard;