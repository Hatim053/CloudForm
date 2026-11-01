import { useRef , useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight , Wand2 } from "lucide-react";
import Header from "../components/Header.jsx";
import PromptPanel from "../components/ai/PromptPanel.jsx";
import ChangeHistory from "../components/ai/ChangeHistory.jsx";
import TemplatePreviewFrame from "../components/ai/TemplatePreviewFrame.jsx";
import useGenerateTemplate from "../CustomHooks/useGenerateTemplate.js";
import { describeChanges } from "../utils/describeChanges.js";
import { getTemplateName , BUILDER_PATH } from "../utils/aiTemplateNames.js";

// "Create with AI" : the creator describes a page , a live preview appears next to the box , and more requests refine it.
// The AI only fills in the data of one of OUR templates , so the result is an ordinary page : "Use this design" opens it in the
// normal builder (with the AI's data as the starting point) where every detail can still be edited and then published
function AiTemplatePage() {
  const navigate = useNavigate();
  const { generate , isLoading , error , clearError } = useGenerateTemplate();

  const [prompt , setPrompt] = useState("");
  const [draft , setDraft] = useState(null); // { templateId , previewData }
  const [requests , setRequests] = useState([]); // [{ text , changes }]
  const [history , setHistory] = useState([]); // earlier versions , for Undo
  const previewRef = useRef(null);

  const submit = async () => {
    const text = prompt.trim();
    if(text.length < 3 || isLoading) return;

    const result = await generate(text , draft);
    if(!result) return; // the error is shown in the prompt box and the current page stays as it was

    if(draft) setHistory((versions) => [...versions , { draft , requests }]);
    setRequests((list) => [...list , { text , changes : describeChanges(draft , result) }]);
    setDraft(result);
    setPrompt("");

    // on a phone the preview sits below the box , so bring it into view
    if(window.matchMedia?.("(max-width: 1023px)").matches) previewRef.current?.scrollIntoView?.({ behavior : "smooth" , block : "start" });
  };

  const undo = () => {
    const previous = history.at(-1);
    if(!previous) return;
    setDraft(previous.draft);
    setRequests(previous.requests);
    setHistory((versions) => versions.slice(0 , -1));
    clearError();
  };

  const startOver = () => {
    setDraft(null);
    setRequests([]);
    setHistory([]);
    setPrompt("");
    clearError();
  };

  const useDesign = () => navigate(BUILDER_PATH(draft.templateId) , { state : { aiDraft : draft.previewData } });

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <Header />

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a9690]">Create with AI</p>
          <h1 className="text-xl font-semibold text-[#1a2b21] sm:text-2xl">Tell us about your page, we'll build it</h1>
          <p className="mt-1 text-sm text-[#5c6b60]">You can change anything afterwards, in plain words or by hand.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-4">
            <PromptPanel value={prompt} onChange={setPrompt} onSubmit={submit} isLoading={isLoading} hasDraft={Boolean(draft)} error={error} />
            <ChangeHistory requests={requests} canUndo={history.length > 0} onUndo={undo} onReset={startOver} isLoading={isLoading} />
          </div>

          <section ref={previewRef} aria-label="Preview" className="min-w-0 scroll-mt-4">
            {draft ? (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2c4a3b] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                    {getTemplateName(draft.templateId)}
                  </span>
                  <button
                    type="button"
                    onClick={useDesign}
                    disabled={isLoading}
                    className="flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-full bg-[#2c4a3b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#243c2e] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Use this design
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
                <TemplatePreviewFrame templateId={draft.templateId} previewData={draft.previewData} isLoading={isLoading} />
                <p className="mt-3 text-xs text-[#8a9690]">Next you can edit every detail and publish it.</p>
              </>
            ) : (
              <div className="relative flex min-h-[18rem] flex-col items-center justify-center rounded-2xl bg-[#f4f3ef] px-6 py-12 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <Wand2 size={22} className="text-[#2c4a3b]" aria-hidden="true" />
                </span>
                <p className="text-base font-semibold text-[#1a2b21]">Your page will appear here</p>
                <p className="mt-1 max-w-xs text-sm text-[#5c6b60]">Describe it on the left and watch it take shape.</p>
                {isLoading && (
                  <p role="status" className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1a2b21]">Designing your page...</p>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default AiTemplatePage;