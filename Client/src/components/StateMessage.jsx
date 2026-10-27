import { Loader2, AlertCircle, Inbox } from "lucide-react";

const ICONS = { loading : Loader2 , error : AlertCircle , empty : Inbox };

// one box for every "nothing to show yet" situation : loading , error (with retry) and empty
function StateMessage({ type = "empty" , title , message , actionLabel , onAction }) {
  const Icon = ICONS[type] ?? Inbox;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className="flex flex-col items-center rounded-2xl bg-white px-6 py-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f3ef]">
        <Icon size={22} className={type === "loading" ? "animate-spin text-[#2c4a3b]" : "text-[#2c4a3b]"} />
      </span>
      {title && <p className="text-base font-semibold text-[#1a2b21]">{title}</p>}
      {message && <p className="mt-1 max-w-sm break-words text-sm text-[#5c6b60]">{message}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 cursor-pointer rounded-full bg-[#f2a93b] px-5 py-2 text-sm font-semibold text-[#2c4a3b] hover:bg-[#e8a230]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default StateMessage;