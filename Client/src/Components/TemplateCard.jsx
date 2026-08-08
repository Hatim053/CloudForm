

function TemplateCard({ name , cover , tag , icon : Icon , description }) {

return (
     <div
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md"
              >
                {/* Cover image */}
                <div
                  className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${cover}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Icon size={22} className="text-white" />
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#2c4a3b]">
                    {tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#1a2b21]">
                      {name}
                    </p>
                    <p className="text-xs leading-relaxed text-[#8a9690]">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#8a9690] opacity-0 transition-opacity group-hover:opacity-100">
                      6 questions
                    </span>
                    <span className="rounded-full bg-[#f4f3ef] px-4 py-1.5 text-xs font-semibold text-[#1a2b21] transition-colors group-hover:bg-[#1a2b21] group-hover:text-white">
                      Use template
                    </span>
                  </div>
                </div>
              </div>
)

};

export default TemplateCard;