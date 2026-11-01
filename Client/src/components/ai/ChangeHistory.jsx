import { Undo2 , RotateCcw } from "lucide-react";

// the creator's own requests , each with the parts of the page it changed (worked out by the platform , not written by the AI)
// requests : [{ text , changes : [] }]
function ChangeHistory({ requests , canUndo , onUndo , onReset , isLoading = false }) {
  if(requests.length === 0) return null;

  return (
    <section aria-label="Your requests" className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[#1a2b21]">Your requests</h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo || isLoading}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-[#f4f3ef] px-3 py-1.5 text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Undo2 size={12} aria-hidden="true" />
            Undo
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-[#f4f3ef] px-3 py-1.5 text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Start over
          </button>
        </div>
      </div>

      <ol className="flex flex-col gap-3">
        {requests.map((request , index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a2b21] text-[11px] font-semibold text-white">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="break-words text-sm text-[#1a2b21]">{request.text}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {index === 0 ? (
                  <span className="rounded-full bg-[#e6f0ea] px-2.5 py-0.5 text-[11px] font-medium text-[#2c4a3b]">First version</span>
                ) : request.changes.length > 0 ? (
                  request.changes.map((change) => (
                    <span key={change} className="rounded-full bg-[#fdf6e8] px-2.5 py-0.5 text-[11px] font-medium text-[#9a6a10]">{change}</span>
                  ))
                ) : (
                  <span className="rounded-full bg-[#f4f3ef] px-2.5 py-0.5 text-[11px] font-medium text-[#5c6b60]">No visible change</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ChangeHistory;