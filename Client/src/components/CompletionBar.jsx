// completed (100) is dark , anything less is amber
function CompletionBar({ percent = 0 }) {
  const value = Math.max(0 , Math.min(100 , Math.round(percent)));

  return (
    <div className="flex items-center gap-2">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-1.5 w-full min-w-[4rem] max-w-[7rem] rounded-full bg-[#f4f3ef]"
      >
        <div
          className={value === 100 ? "h-1.5 rounded-full bg-[#1a2b21]" : "h-1.5 rounded-full bg-[#f2a93b]"}
          style={{ width : `${value}%` }}
        />
      </div>
      <span className={value === 100 ? "text-xs font-semibold text-[#1a2b21]" : "text-xs font-semibold text-[#c9922f]"}>
        {value}%
      </span>
    </div>
  );
}

export default CompletionBar;