import TemplateSearchBar from "./TemplateSearchBar.jsx";

function TemplateTopBar() {

    return (
         <div className="flex items-center justify-between bg-[#2c4a3b] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a93b]">
            <span className="text-lg font-bold text-[#2c4a3b]">C</span>
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
              Templates
            </p>
            <p className="text-base font-semibold text-white">
              Choose a starting point
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TemplateSearchBar />
          <span className="rounded-full bg-[#f2a93b] px-5 py-2 text-sm font-medium text-[#2c4a3b]">
           Generate With AI
          </span>
        </div>
      </div>

    )
};

export default TemplateTopBar;