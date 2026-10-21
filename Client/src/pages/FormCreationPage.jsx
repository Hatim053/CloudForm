import { useParams } from "react-router-dom";
import FormPreview from "../components/FormPreview.jsx";
import TemplateElements from "../components/TemplateElements.jsx";
import ElementsConfiguration from "../components/ElementsConfiguration.jsx";
import Header from "../components/Header.jsx";
import useFetchTemplatePreviewData from "../CustomHooks/useFetchTemplatePreviewData .js";

function FormCreationPage() {

  const { id } = useParams();
  console.log(`Template ID ${id}`);
const { isLoading, error } = useFetchTemplatePreviewData(id);

if(isLoading) {
  return <div>loading ...</div>
}
if(error) {
  return <div>something went wrong{error}</div>
}

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      {/* Builder body */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-5 bg-[#faf9f6] p-6">
        {/* Left: Elements panel */}
        <TemplateElements />

        {/* Middle: Live preview */}
        <FormPreview id={id} />

        {/* Right: Element settings */}
        <ElementsConfiguration />
      </div>
    </div>
  );
}

export default FormCreationPage;