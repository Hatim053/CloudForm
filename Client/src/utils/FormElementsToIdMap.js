import { lazy } from "react";

const formElementsToIdMap = {
    "cf001" : lazy(() => import("../ComponentsRegistry/CustomForm/CustomForm")),  
    "ic001" : lazy(() => import("../ComponentsRegistry/InfluencerCard/InfluencerCard.jsx")),   
    "ic002" : lazy(() => import("../ComponentsRegistry/CreatorProfileCard/CreatorProfileCard")),
    "sf001" : lazy(() => import("../ComponentsRegistry/ScheduleForm/ScheduleForm")),
    "ic003" : lazy(() => import("../ComponentsRegistry/SocialCard/SocialCard")),
    "wf001" : lazy(() => import("../ComponentsRegistry/WaitlistForm/WaitlistForm")),
};

export default formElementsToIdMap;