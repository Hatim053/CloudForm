import { lazy } from "react";

const TemplatesToIdMap = {
    "cf001" : lazy(() => import("../ComponentsRegistry/CustomForm/CustomForm.jsx")),  
    "ic001" : lazy(() => import("../ComponentsRegistry/InfluencerCard/InfluencerCard.jsx")),   
    "ic002" : lazy(() => import("../ComponentsRegistry/CreatorProfileCard/CreatorProfileCard.jsx")),
    "sf001" : lazy(() => import("../ComponentsRegistry/ScheduleForm/ScheduleForm.jsx")),
    "ic003" : lazy(() => import("../ComponentsRegistry/SocialCard/SocialCard.jsx")),
    "wf001" : lazy(() => import("../ComponentsRegistry/WaitlistForm/WaitlistForm.jsx")),
};


export default TemplatesToIdMap;