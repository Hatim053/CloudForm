import CountingRing from "./CountingRing.jsx";


function StatCard({ icon: Icon, label, target, tint }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8a9690]">
          {label}
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: tint }}
        >
          <Icon size={15} className="text-white" />
        </span>
      </div>

      <CountingRing target={target} />
    </div>
  );
}

export default StatCard;