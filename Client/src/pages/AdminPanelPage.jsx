import { useState, useEffect, useRef } from "react";
import {
  Users,
  FileText,
  Globe,
  Link2,
  Lock,
  LayoutTemplate,
  Tags,
  Code2,
  Plus,
  RefreshCw,
  Pointer,
} from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import useAddTemplateCategory from "../CustomHooks/useAddTemplateCategory.js";
import useAddTemplatePreviewData from "../CustomHooks/useAddTemplatePreviewData.js";


function AdminPanelPage() {

  const templeCatrgoryRef = useRef(null);
  const templatePreviewDataRef = useRef(null);

  const { addTemplateCategory } = useAddTemplateCategory(templeCatrgoryRef);
  const { addTemplatePreviewData } = useAddTemplatePreviewData(templatePreviewDataRef);


  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <style>{`
        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
                Overview
              </p>
              <h1 className="text-2xl font-semibold text-[#1a2b21]">
                Platform statistics
              </h1>
            </div>

            <span className="group flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#5c6b60] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-[#f4f3ef]">
              <RefreshCw
                size={15}
                className="text-[#2c4a3b] transition-transform duration-500 group-hover:rotate-180"
              />
              Refresh data
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Users} label="Registered users" target={1204} tint="#2c4a3b" />
            <StatCard icon={FileText} label="Forms created" target={3482} tint="#1a2b21" />
            <StatCard icon={LayoutTemplate} label="Templates available" target={12} tint="#f2a93b" />
            <StatCard icon={Globe} label="Public forms" target={2110} tint="#2c4a3b" />
            <StatCard icon={Link2} label="Unlisted forms" target={980} tint="#1a2b21" />
            <StatCard icon={Lock} label="Restricted forms" target={392} tint="#c96a4e" />
          </div>
        </div>

    
        <div className="mb-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">
            Manage
          </p>
          <h2 className="text-xl font-semibold text-[#1a2b21]">
            Templates &amp; categories
          </h2>
        </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a2b21]">
                <Code2 size={16} className="text-[#f2a93b]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1a2b21]">
                  Add template data
                </p>
                <p className="text-xs text-[#8a9690]">
                  Paste the template object as JSON
                </p>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
                Template object (JSON)
              </label>
              <textarea
               ref={templatePreviewDataRef}
                rows={12}
                placeholder={`{\n id : "wf001" \n "heading": "Event Registration",\n  "subHeading": "Fill out the form to secure your spot",\n  "inputElements": [ ... ]\n}`}
                className="w-full resize-none rounded-lg bg-[#f4f3ef] px-3 py-2.5 font-mono text-xs leading-relaxed text-[#1a2b21] placeholder:text-[#8a9690] focus:outline-none focus:ring-2 focus:ring-[#f2a93b]/40"
              />
            </div>

            <span className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#f2a93b] py-2.5 text-sm font-semibold text-[#2c4a3b] hover:bg-[#e8a230]">
              <Plus size={15}
              onClick={addTemplatePreviewData}
              />
              Add template preview data
            </span>
          </div>

          {/* Add template category */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a2b21]">
                <Tags size={16} className="text-[#f2a93b]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1a2b21]">
                  Add template category
                </p>
                <p className="text-xs text-[#8a9690]">
                  Used to group and filter templates
                </p>
              </div>
            </div>



            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-medium text-[#5c6b60]">
                Category object (JSON)
              </label>
              <textarea
                rows={12}
                placeholder={`{
    id : "sf001",
    name: "Schedule Form",
    description: "Pin Your Next move",
    tag: "Schedule Timer",
    cover: "from-[#h3903f] to-[#6f3f98]",
    icon: "Clock10",
  }`}
                 ref={templeCatrgoryRef}
                className="w-full resize-none rounded-lg bg-[#f4f3ef] px-3 py-2.5 font-mono text-xs leading-relaxed text-[#1a2b21] placeholder:text-[#8a9690] focus:outline-none focus:ring-2 focus:ring-[#f2a93b]/40"
                
              />
            </div>
            <span className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#1a2b21] py-2.5 text-sm font-semibold text-white hover:bg-[#243c2e]">
              <Plus size={15} 
               onClick={addTemplateCategory}
               cursor={Pointer}
                />
              Add category
            </span>
          </div>
        </div>
      </div>
  );


};

export default AdminPanelPage;