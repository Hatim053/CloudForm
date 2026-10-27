const STATUS_STYLES = {
  completed : { label : "Completed" , className : "bg-[#e6f0ea] text-[#2c4a3b]" },
  partial : { label : "Partial" , className : "bg-[#fdf6e8] text-[#9a6a10]" },
  viewed : { label : "Viewed" , className : "bg-[#f4f3ef] text-[#5c6b60]" }
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.viewed;

  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  );
}

export default StatusBadge;