import {
  MessageSquareText, CalendarCheck2, Briefcase,
  GraduationCap, HeartHandshake, ShoppingBag, ClipboardList, Users, Sparkles,
  Pen , PanelsRightBottom , Clock10 , UserRoundCheck , User2 , UserCircle2Icon,
  Type , AlignLeft ,  ListChecks , Star , Calendar , Upload , PhoneCall ,
  InboxIcon , Clock , Navigation , UserCircle , StretchHorizontal , 
  Mail , Phone  

} from "lucide-react";

const TemplatesIconMap = {
    "MessageSquareText" : MessageSquareText,
    "CalendarCheck2" : CalendarCheck2,
    "Briefcase" : Briefcase,
    "GraduationCap" : GraduationCap,
    "HeartHandshake" : HeartHandshake,
    "ShoppingBag" : ShoppingBag,
    "ClipboardList" : ClipboardList,
    "Users" : Users,
    "Sparkles" : Sparkles,
    "Pen" : Pen,
    "PanelsRightBottom" : PanelsRightBottom,
    "Clock10" : Clock10,
    "UserRoundCheck" : UserRoundCheck,
    "User2" : User2,
    "UserCircle2Icon" : UserCircle2Icon,
};

const ElementsIconMap = {
      "Short-text" : Type,
      "Long-text" : AlignLeft,
      "Multiple-choice" : ListChecks,
      "Rating-scale" : Star,
      "Date" : Calendar,
      "File-upload" : Upload,
      "Phone-number" : PhoneCall,
      "Email" : InboxIcon,
       "Name" : UserCircle,
       "Time" : Clock,
       "Social" : Navigation,
       "Drop-down" : StretchHorizontal,
       "Mail" : Mail,
       "Phone" : Phone,
       "Calendar" : Calendar
};

export {
  TemplatesIconMap,
  ElementsIconMap,
};