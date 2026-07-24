import CreatorProfileCard from "../ComponentsRegistry/CreatorProfileCard/CreatorProfileCard";
import CustomForm from "../ComponentsRegistry/CustomForm/CustomForm";
import ScheduleForm from "../ComponentsRegistry/ScheduleForm/ScheduleForm";
import SocialCard from "../ComponentsRegistry/SocialCard/SocialCard";
import WaitlistForm from "../ComponentsRegistry/WaitlistForm/WaitlistForm";


const formElementsToIdMap = [
    {
        id : "cf001",
        element : function renderElement(props) {
          return < CustomForm props = {props} />
        }
    }, 
     {
        id : "ic001",
        element : function renderElement(props) {
          return <InfluencerCard props = {props} />
        }
    },   
    {
        id : "ic002",
        element : function renderElement(props) {
          return <CreatorProfileCard props = {props} />
        }
    },
    {
        id : "sf001",
        element : function renderElement(props) {
         return <ScheduleForm props = {props} />
        }
    },
    {
        id : "ic003",
        element : function renderElement(props) {
        return <SocialCard props = {props} />
        }
    },
    {
        id : "wf001",
        element : function renderElement(props) {
         return <WaitlistForm />
        }
    },
];

function LiveFormRender() {

}

export default LiveFormRender;