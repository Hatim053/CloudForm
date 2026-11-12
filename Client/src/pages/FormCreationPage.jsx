import { useParams, useLocation } from "react-router-dom";
import FormPreview from "../components/FormPreview.jsx";
import TemplateElements from "../components/TemplateElements.jsx";
import ElementsConfiguration from "../components/ElementsConfiguration.jsx";
import Header from "../components/Header.jsx";
import useFetchTemplatePreviewData from "../CustomHooks/useFetchTemplatePreviewData .js";

function FormCreationPage() {
  const { id } = useParams();
  const location = useLocation();
  // location.state.aiDraft is set when the creator arrives from "Create with AI" : it becomes the starting page
  const { isLoading, error } = useFetchTemplatePreviewData(id, location.state?.aiDraft);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[#5c6b60]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
<div className="min-h-screen bg-white font-sans lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
        Something went wrong: {String(error?.message ?? error)}
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white font-sans lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
    <Header />
    <main className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 bg-[#faf9f6] p-3 sm:gap-5 sm:p-4 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-1 lg:p-6">

      <div className="min-w-0 lg:col-span-3 lg:h-full lg:min-h-0">
        <TemplateElements />
      </div>

  <div className="min-w-0 lg:col-span-6 lg:h-full lg:min-h-0">
  <FormPreview id={id} />
</div>

     
      <div className="min-w-0 lg:col-span-3 lg:h-full lg:min-h-0">
        <ElementsConfiguration />
      </div>
    </main>
  </div>
);
};

export default FormCreationPage;