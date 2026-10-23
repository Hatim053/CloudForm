import TemplatesToIdMap from "../utils/TemplatesToIdMap.js";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectPreviewData } from "../app/TemplateSlice.js";

function FormPreview({ id }) {

  const Component = TemplatesToIdMap[id];
  // live data: only selected elements, edited values, internal keys already stripped
  const previewData = useSelector(selectPreviewData);

    return (
          <section className="col-span-6 flex max-h-screen overflow-y-auto rounded-2xl bg-[#f4f3ef] p-2">
            {/* my-auto centers vertically like before, but unlike items-center it never pushes overflowing content out of reach */}
            <div className="my-auto flex w-full justify-center">
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