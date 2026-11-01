import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import templatesToIdMap from "../../utils/TemplatesToIdMap.js";

// shows the REAL template of the page , exactly as the builder preview does (isPreview : nothing can be submitted , links stay inert)
// while the AI is working the old preview stays visible under a light veil , so the page never flashes empty
function TemplatePreviewFrame({ templateId , previewData , isLoading = false }) {
  const Component = templatesToIdMap[templateId];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#f4f3ef] p-2">
      <div aria-busy={isLoading} className={isLoading ? "max-h-[70vh] overflow-y-auto opacity-50 transition-opacity" : "max-h-[70vh] overflow-y-auto transition-opacity"}>
        {Component && previewData ? (
          <Suspense fallback={<p className="py-16 text-center text-sm text-[#5c6b60]">Loading preview...</p>}>
            <Component {...previewData} isPreview />
          </Suspense>
        ) : (
          <p className="py-16 text-center text-sm text-[#5c6b60]">This kind of page can't be previewed yet.</p>
        )}
      </div>

      {isLoading && (
        <div role="status" className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#1a2b21] shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
            <Loader2 size={16} className="animate-spin text-[#2c4a3b]" aria-hidden="true" />
            Designing your page...
          </span>
        </div>
      )}
    </div>
  );
}

export default TemplatePreviewFrame;