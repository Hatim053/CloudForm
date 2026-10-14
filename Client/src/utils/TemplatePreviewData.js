
// socialHandles  links  inputElements
const TemplatePreviewData = {
  "ic002" : {
   socialHandles : [
    { platform: "twitter", url: "#", icon: "𝕏", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
    { platform: "instagram", url: "#", icon: "📷", color: "bg-gray-100 hover:bg-pink-100 text-gray-700" },
    { platform: "linkedin", url: "#", icon: "💼", color: "bg-gray-100 hover:bg-blue-100 text-gray-700" },
    { platform: "website", url: "#", icon: "🌐", color: "bg-gray-100 hover:bg-green-100 text-gray-700" },
  ],
},
  "ic001" : { 
   "id" : "ic001",
   "previewData" : {
    socialsHandles :  [
    { platform: "Twitter",   handle: "@zakirkhan",   url: "https://github.com/Hatim053?tab=repositories", color: "from-blue-400 to-blue-600",   icon: "𝕏",  followers: "1.2M" },
    { platform: "Instagram", handle: "@zakirkhan",   url: "#", color: "from-purple-400 to-pink-500", icon: "📷", followers: "8.4M" },
    { platform: "YouTube",   handle: "@zakirkhan",   url: "#", color: "from-red-400 to-red-700",     icon: "▶️", followers: "12M"  },
    { platform: "LinkedIn",  handle: "/in/zakir",    url: "#", color: "from-blue-600 to-blue-900",   icon: "💼", followers: "120K" },
  ],
  links : [
    {text: "Mumbai Residency | 12th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 13th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 14th June - 4PM & 9PM" , url : "#"},
    {text: "Mumbai Residency | 19th June - 4PM & 9PM" , url : "#"}
  ]
  }
},
  "sf001" : { 
   "id" : "sf001",
    "previewData" : {
     inputElements : [
    { id: "name" , icon: "User", label: "name", placeholder : "enter your name",  type: "text" },
    { id: "email" , icon: "Mail", label: "email", placeholder : "enter your email" , type: "email" },
    { id: "phone" , icon: "Phone", label: "phone", placeholder : "enter your phone" ,type: "tel" },
    { id: "date" , icon: "Calendar", label: "date", placeholder : "enter your date" ,type: "date" },
  ]
  }
},
 "wf001" : {
   "id" : "wf001",
  "previewData" : {
    brandOrEventName : "Brand/event name",
    heading : "Join the Waitlist",
    subHeading : "Be the first to know when we launch",
    launchDate : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    submitButtonName : "Join the Waitlist"
  },
  "ic003" : {
    socialHandles : [
    { platform: "Twitter", url: "#", icon: "𝕏", username: "@creator" },
    { platform: "Instagram", url: "#", icon: "📷", username: "@creator" },
    { platform: "GitHub", url: "#", icon: "🐙", username: "@creator" },
    { platform: "Discord", url: "#", icon: "💬", username: "creator#1234" },
  ]
  }
},
   "cf001" : { 
    "id" : "cf001",
    "previewData" : {
    "heading" : "Event Registration",
    "subHeading" : "Fill out the form to secure your spot",
    "submitButtonName" : "Register Now ->",
    "inputElements" : [
      {
        id : "cf001ni",
        name : "Name", 
        label : {
          "01" : "First Name",
          "02" : "Last Name"
        },
        placeholder : {
          "01" : "first",
          "02" : "second"
        },
        isRequired : true, 
    },
      {
        id : "cf001cni",
        name : "Phone Number", 
        label : "Phone Number",
        placeholder : "enter your number",
        isRequired : true
      
      },
      {
         id : "cf001dati",
         name : "Date & Time",
         label : {
          "01" : "Date",
          "02" : "Time"
         },
         placeholder : {
          "01" : "Preffered Date",
          "02" : "Time Slot"
         },
         isRequired : true,
      },
      {
          id : "cf001dsi",
          name : "Dropdown",
          label : "country",
          placeholder : "India",
          isRequired : true
      },
      {
          id : "cf001ei",
          name : "Email",
          label : "E-mail",
          placeholder : "enter your email",
          isRequired : true
      },
      {
          id : "cf001lti",
          name : "Long Text",
          label : "Feedback",
          placeholder : "suggestions are welcome",
          isRequired :  false
      },
      {
          id : "cf001mfi",
          name : "Multi-Files",
          label : "Attachments",
          placeholder : "Drop files or browse",
          isRequired : true
      },
      {
          id : "cf001msi",
          name : "Multi-Select",
          label : "preferred langauges",
          optionList : ["english" , "hindi" , "marathi"],
          isRequired : false
      },
      {
          id : "cf001sti",
          name : "ShortText",
          label : "About You",
          placeholder : "why you want to join us",
          isRequired : true
      },
      {
        id : "cf001sfi",
        name : "single-File",
        label : "Resume",
        placeholder : "Tap to upload photo",
        isRequired : true
      },
      {
          id : "cf001shi",
          name : "socials",
          selectedOption : "linkedin",
          isRequired : false,
          optionList : [
  { id : "twitter", label: "Twitter / X", icon: "𝕏", placeholder: "@username", color: "#000" },
  { id: "linkedin", label: "LinkedIn", icon: "in", placeholder: "linkedin.com/in/you", color: "#0077b5" },
  { id: "github", label: "GitHub", icon: "⌥", placeholder: "github.com/you", color: "#24292e" },
  { id: "instagram", label: "Instagram", icon: "◈", placeholder: "@handle", color: "#e1306c" },
  { id: "facebook", label: "Facebook", icon: "f", placeholder: "facebook.com/you", color: "#1877f2" },
  { id: "youtube", label: "YouTube", icon: "▶", placeholder: "youtube.com/@you", color: "#ff0000" }
  ],
    },
      {
          id : "cf001sr",
          name : "Rating-Scale",
          label : "Rate Us",
          ratingLevel : [1,2,3,4,5],
          isRequired : false,
      },
      {
          id : "cf001di",
          name : "Date",
          label : "Date",
          placeholder : "Arrival Date",
          isRequired : false
      },
      {
          id : "cf001ti",
          name : "Time",
          label : "Time",
          placeholder : "Arrival Time",
          isRequired : false

      }
    ]
  }
}
}

export default TemplatePreviewData;