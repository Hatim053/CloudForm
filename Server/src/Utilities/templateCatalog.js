// WHAT THE AI MAY PRODUCE. The page templates themselves are React code in the frontend registry and the AI never writes code :
// it only picks one of these templates and fills in its data (previewData) , exactly like a creator would in the builder.
// Keep this file in step with the frontend templates : a template that is not listed here can't be chosen by the AI ,
// and a field that is not listed for a template is thrown away. To support a new template add one entry here.

const text = (max , hint) => ({ type : "text" , max , hint });
const color = (fallback , hint) => ({ type : "color" , default : fallback , hint });
const url = (httpsOnly = false) => ({ type : "url" , httpsOnly });

const SOCIAL_PLATFORMS = ["Twitter" , "X" , "Instagram" , "YouTube" , "LinkedIn" , "GitHub" , "Facebook" , "Discord" , "Website"];

const TEMPLATE_CATALOG = {
  wf001 : {
    name : "Waitlist page",
    useWhen : "collecting e-mails before a product, app, course or event launches (shows a countdown)",
    fields : {
      brandOrEventName : text(60 , "product, brand or event name"),
      brandOrEventNameColor : color("#000000" , "must contrast with backgroundColorHexcode"),
      heading : text(80),
      subHeading : text(160),
      launchDate : { type : "date" },
      submitButtonName : text(30),
      backgroundColorHexcode : color("#FEF3C7"),
      backgroundImageUrl : url(true)
    },
    sections : {}
  },

  sf001 : {
    name : "Booking / contact form",
    useWhen : "booking a demo, call, appointment or session, or any form that collects a few details (name, e-mail, phone, date ...)",
    fields : {
      heading : text(80),
      subHeading : text(160),
      submitButtonName : text(30),
      successHeading : text(60 , "shown after sending"),
      successMessage : text(160 , "shown after sending"),
      backgroundColorHexcode : color("#FEF3C7")
    },
    sections : {
      inputElements : {
        min : 1,
        max : 10,
        hint : "the form fields , in order",
        item : {
          id : { type : "slug" , max : 30 , hint : "lowercase_with_underscores , unique" },
          icon : { type : "enum" , values : ["User" , "Mail" , "Phone" , "Calendar"] },
          label : text(40),
          placeholder : text(60),
          type : { type : "enum" , values : ["text" , "email" , "tel" , "date" , "time" , "number" , "url"] },
          isRequired : { type : "bool" }
        },
        requiredKeys : ["label"],
        // an unknown icon is replaced by the one that fits the field type
        normalizeItem : (item , rawItem) => {
          const sentIcon = typeof rawItem.icon === "string" ? rawItem.icon.trim().toLowerCase() : "";
          const icon = ["User" , "Mail" , "Phone" , "Calendar"].find((name) => name.toLowerCase() === sentIcon);
          item.icon = icon ?? ({ email : "Mail" , tel : "Phone" , date : "Calendar" }[item.type] ?? "User");
        }
      }
    }
  },

  ic001 : {
    name : "Link page with social cards",
    useWhen : "a creator, artist or influencer who wants one page with social profiles, a headline banner and a list of important links",
    fields : {
      name : text(40 , "display name or @handle"),
      banner : text(120 , "one headline line , e.g. an announcement"),
      avatar : url(true),
      subscribeText : text(20),
      subscribeUrl : url(),
      backgroundColorHexcode : color("#6b5a14"),
      cardColorHexcode : color("#8a7218" , "must contrast with backgroundColorHexcode")
    },
    sections : {
      socialHandles : {
        min : 0,
        max : 6,
        item : {
          platform : { type : "enum" , values : SOCIAL_PLATFORMS , fallback : "Website" },
          handle : text(40),
          url : url(),
          icon : text(8 , "one emoji that matches the platform"),
          followers : text(10 , "\"\" unless the user gave a number")
        },
        requiredKeys : ["platform"]
      },
      links : {
        min : 0,
        max : 8,
        item : { text : text(100) , url : url() },
        requiredKeys : ["text"]
      }
    }
  },

  ic002 : {
    name : "Profile card",
    useWhen : "a personal profile card with a photo, a short bio, social icons and one follow button",
    fields : {
      name : text(40),
      bio : text(160),
      avatar : url(true),
      followText : text(20),
      followUrl : url(),
      backgroundColorHexcode : color("#ffffff"),
      cardColorHexcode : color("#8B0000" , "must contrast with backgroundColorHexcode")
    },
    sections : {
      socialHandles : {
        min : 0,
        max : 6,
        item : {
          platform : { type : "enum" , values : ["twitter" , "instagram" , "linkedin" , "website" , "youtube" , "github" , "facebook"] , fallback : "website" },
          url : url(),
          icon : text(8 , "one emoji that matches the platform")
        },
        requiredKeys : ["platform"]
      }
    }
  }
};

export { TEMPLATE_CATALOG };