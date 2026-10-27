// one fact about the respondent : a small icon , a label , a value and an optional second line
function InfoTile({ icon: Icon , label , value , sub }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-5">
      <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f3ef]">
        <Icon size={15} className="text-[#2c4a3b]" />
      </span>
      <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-[#8a9690]">{label}</p>
      <p className="break-words text-sm font-semibold text-[#1a2b21]">{value}</p>
      {sub && <p className="mt-0.5 break-words text-xs text-[#8a9690]">{sub}</p>}
    </div>
  );
}

export default InfoTile;