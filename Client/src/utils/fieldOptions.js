// Fields that need a special control in the builder instead of a plain text box :
//  - fields with a fixed set of choices (layout , theme) are picked with buttons
//  - date fields (launchDate) are picked with a date and time box
// Keep the values in step with the template components (what they accept) and with templateCatalog.js on the server.
// To give another template a picker , add an entry here.

const LIGHT_DARK_OPTIONS = [
  { value : "light" , label : "Light" , description : "Bright card" },
  { value : "dark" , label : "Dark" , description : "Dark card" }
];

const FIELD_OPTIONS = {
  wf001 : {
    layout : [
      { value : "centered" , label : "Centered" , description : "Signup card in the middle" },
      { value : "split" , label : "Split" , description : "Heading left, card right" },
      { value : "minimal" , label : "Minimal" , description : "No card, large text" }
    ],
    theme : LIGHT_DARK_OPTIONS
  },

  sf001 : {
    layout : [
      { value : "card" , label : "Card" , description : "Form in a card" },
      { value : "split" , label : "Split" , description : "Heading panel left, form right" },
      { value : "minimal" , label : "Minimal" , description : "No card, large text" }
    ],
    theme : LIGHT_DARK_OPTIONS
  },

  ic001 : {
    layout : [
      { value : "stack" , label : "Stack" , description : "Social cards, banner, then links" },
      { value : "links-first" , label : "Links first" , description : "Links on top" },
      { value : "compact" , label : "Compact" , description : "Small header, links, small social cards" }
    ],
    // here the theme is the style of the tiles that sit on the card colour
    theme : [
      { value : "dark" , label : "Dark tiles" , description : "Near-black tiles (the original look)" },
      { value : "light" , label : "Light tiles" , description : "White tiles" }
    ]
  }
};

// fields that hold a date and time
const DATETIME_FIELDS = ["launchDate"];

// returns the options of one field of one template , or null when the field is free text
const getFieldOptions = (templateId , field) => FIELD_OPTIONS[templateId]?.[field] ?? null;

const isDateTimeField = (field) => DATETIME_FIELDS.includes(field);

export { FIELD_OPTIONS , DATETIME_FIELDS , getFieldOptions , isDateTimeField };