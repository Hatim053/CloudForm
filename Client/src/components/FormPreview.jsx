// import TemplatesToIdMap from "../utils/TemplatesToIdMap.js";
// import { Suspense } from "react";

// function FormPreview({ id , previewData}) {

//   const Component = TemplatesToIdMap[id];

//     return (
//           <section className="col-span-6 flex items-center justify-center rounded-2xl bg-[#f4f3ef] p-2">
//             <Suspense fallback={<h1>Preview Is Loading...</h1>}>
//             <Component />
//             </Suspense>
//         </section>
//     )
// };

// export default FormPreview;



import TemplatesToIdMap from "../utils/TemplatesToIdMap.js";
import { Suspense } from "react";
import { useSelector } from "react-redux";
// adjust this path to wherever TemplateSlice.js lives in your project
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
                  <Component previewData={previewData} />
                </Suspense>
              ) : (
                <h1>Preview Is Loading...</h1>
              )}
            </div>
        </section>
    )
};

export default FormPreview;