import { Suspense } from "react";
import { useParams } from "react-router-dom";
import templatesToIdMap from "../utils/TemplatesToIdMap.js";
import useFetchLiveForm from "../CustomHooks/useFetchLiveForm.js";
import useLiveFormSession from "../CustomHooks/useLiveFormSession.js";

function LiveFormRender() {
    const {id , status : rawStatus} = useParams();
    // the link looks like .../liveformrender/<id>/status=public , and depending on how the route is declared
    // the param can still carry the "status=" prefix , so it is removed here (a plain "public" is left alone)
    const status = rawStatus?.replace(/^status=/ , "");

    const { form , isLoading , error } = useFetchLiveForm(id , status);
    const { onAnswer , onSubmit } = useLiveFormSession({
        formId : id,
        linkStatus : status,
        templateId : form?.form_id,
        elementsData : form?.elements_data
    });

    const Component = form?.form_id ? templatesToIdMap[form.form_id] : undefined;

    if(isLoading) return <h1>Loading...</h1>;
    if(error) return <h1>{error}</h1>;
    if(!Component) return <h1>This form is no longer available</h1>;

    return (
        <Suspense fallback = {<h1>Loading...</h1>}>
          <Component {...form.elements_data} onAnswer = {onAnswer} onSubmit = {onSubmit} />
        </Suspense>
    )

}

export default LiveFormRender;