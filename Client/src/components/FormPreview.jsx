import TemplatesToIdMap from "../utils/TemplatesToIdMap.js";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectPreviewData } from "../app/TemplateSlice.js";

function FormPreview({ id }) {

  const Component = TemplatesToIdMap[id];
  // live data: only selected elements, edited values, internal keys already stripped
  const previewData = useSelector(selectPreviewData);

    return (
<section className="min-h-0 min-w-0 overflow-y-auto rounded-2xl bg-[#f4f3ef] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:h-full">
    <div className="flex min-h-full w-full items-center justify-center">
              {previewData ? (
                <Suspense fallback={<h1>Preview Is Loading...</h1>}>
                  <Component {...previewData} isPreview />
                </Suspense>
              ) : (
                <h1>Preview Is Loading...</h1>
              )}
            </div>
        </section>
    )
};

export default FormPreview;