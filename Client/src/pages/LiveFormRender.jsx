import { lazy , Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreatorProfileCard = lazy(() => import("../ComponentsRegistry/CreatorProfileCard/CreatorProfileCard"));
const CustomForm  = lazy(() => import("../ComponentsRegistry/CustomForm/CustomForm"));
const ScheduleForm = lazy(() => import("../ComponentsRegistry/ScheduleForm/ScheduleForm"));
const SocialCard = lazy(() => import("../ComponentsRegistry/SocialCard/SocialCard"));
const WaitlistForm = lazy(() => import("../ComponentsRegistry/WaitlistForm/WaitlistForm"));
const InfluencerCard = lazy(() => import("../ComponentsRegistry/InfluencerCard/InfluencerCard.jsx"));

const formElementsToIdMap = {
    "cf001" : function renderElement(props) {
          return < CustomForm props = {props} />
    },  
    "ic001" : function renderElement(props) {
          return <InfluencerCard props = {props} />
        },   
    "ic002" : function renderElement(props) {
          return <CreatorProfileCard props = {props} />
        },
     "sf001" : function renderElement(props) {
         return <ScheduleForm props = {props} />
        },
     "ic003" : function renderElement(props) {
        return <SocialCard props = {props} />
    },
      "wf001" : function renderElement(props) {
         return <WaitlistForm props = {props} />
    },
};

function LiveFormRender() {
    const {id , status} = useParams();
    const [formId , setFormId] = useState("");
    const [formElements , setFormElements] = useState([]);
    
    const getFormData = useCallback(async(id , status) => {
       try {
         const formData = await fetch(`${import.meta.env.VITE_SERVER_URL}/liveform/show/${id}/status=${status}`);
         const jonFormData = await formData.json();
         setFormId(jonFormData?.form_id);
         setFormElements(jonFormData?.elements);
       } catch (error) {
        console.log('something went wrong' , error);
       }
    });

    useEffect(() => {

     getFormData(id , status);

    } , [id , status]);

    return (
        <Suspense fallback = {<h1>Loading...</h1>}>
          {formId && formElementsToIdMap.formId(formElements)}
        </Suspense>
    )

}

export default LiveFormRender;