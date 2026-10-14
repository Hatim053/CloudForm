// import { useParams } from "react-router-dom";
// import FormPreview from "../components/FormPreview";
// import TemplateElements from "../components/TemplateElements";
// import ElementsConfiguration from "../components/ElementsConfiguration.jsx";
// import Header from "../components/Header.jsx";
// import { useEffect, useState } from "react";

// function FormCreationPage() {

//   const [templatePreviewData , setTemplatePreviewData] = useState(null);
//   const { id } = useParams();
//   console.log(`Template ID ${id}`);
//   const fetchTemplatePreviewData = async () => {

//     const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/template-preview-data/fetch-data/${id}`);
//     const jsonResponse = await response.json();
//     console.log(jsonResponse);
//     const previewData = jsonResponse?.templatePreviewData;
//     setTemplatePreviewData(previewData);
//     console.log(previewData);
//   };

//   useEffect(() => {
//     fetchTemplatePreviewData();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       <Header />
//       {/* Builder body */}
//       <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-5 bg-[#faf9f6] p-6">
//         {/* Left: Elements panel */}
//         <TemplateElements />

//         {/* Middle: Live preview */}
//         <FormPreview id={id} />

//         {/* Right: Element settings */}
//         <ElementsConfiguration />
//       </div>
//     </div>
//   );
// }

// export default FormCreationPage;


import { useParams } from "react-router-dom";
import FormPreview from "../components/FormPreview";
import TemplateElements from "../components/TemplateElements";
import ElementsConfiguration from "../components/ElementsConfiguration.jsx";
import Header from "../components/Header.jsx";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
// adjust this path to wherever TemplateSlice.js lives in your project
import {
  addTemplatePreviewData,
  loadDraft,
  clearDraft,
  selectCachedPreviewData,
} from "../app/TemplateSlice.js";

function FormCreationPage() {

  const dispatch = useDispatch();
  const store = useStore();
  const { id } = useParams();
  console.log(`Template ID ${id}`);

  useEffect(() => {
    // 1. cache hit -> no network request, just rebuild a fresh editable draft from the pristine copy
    const cachedPreviewData = selectCachedPreviewData(store.getState(), id);
    if (cachedPreviewData) {
      dispatch(loadDraft(id, cachedPreviewData));
      return;
    }

    // 2. cache miss -> fetch once, cache the pristine data, then build the draft
    dispatch(clearDraft()); // don't flash the previous template while this one loads
    const controller = new AbortController();

    const fetchTemplatePreviewData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/template-preview-data/fetch-data/${id}`,
          { signal: controller.signal }
        );
        const jsonResponse = await response.json();
        // backend returns the whole Mongoose document ({ _id, id, previewData, createdAt, ... })
        // only the inner `previewData` object is the actual template content
        const previewData = jsonResponse?.templatePreviewData?.previewData;
        if (!previewData) return;

        dispatch(addTemplatePreviewData({ id, data: previewData }));
        dispatch(loadDraft(id, previewData));
      } catch (error) {
        if (error.name !== "AbortError") console.log(error);
      }
    };

    fetchTemplatePreviewData();
    return () => controller.abort(); // ignore stale responses if the id changes / page unmounts
  }, [id, dispatch, store]);

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