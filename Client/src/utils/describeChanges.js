import { getTemplateName } from "./aiTemplateNames.js";

// "what changed" is worked out here by comparing the old and the new page , in the platform's own words.
// The model's raw answer is never shown to the creator
const FIELD_LABELS = {
  brandOrEventName : "Name",
  heading : "Heading",
  subHeading : "Subheading",
  launchDate : "Launch date",
  submitButtonName : "Button text",
  backgroundImageUrl : "Background image",
  successHeading : "Confirmation message",
  successMessage : "Confirmation message",
  name : "Name",
  banner : "Banner",
  avatar : "Photo",
  bio : "Bio",
  subscribeText : "Subscribe button",
  subscribeUrl : "Subscribe button",
  followText : "Follow button",
  followUrl : "Follow button"
};

const SECTION_LABELS = {
  inputElements : "Form fields",
  socialHandles : "Social links",
  links : "Links"
};

const MAX_CHIPS = 6;

const isColorKey = (key) => /(color|hexcode)/i.test(key);
const prettify = (key) => key.replace(/([A-Z])/g , " $1").replace(/^./ , (char) => char.toUpperCase());

// previous / next : { templateId , previewData }
const describeChanges = (previous , next) => {
  if(!previous || !next) return [];
  if(previous.templateId !== next.templateId) return [`Switched to ${getTemplateName(next.templateId)}`];

  const before = previous.previewData ?? {};
  const after = next.previewData ?? {};
  const labels = new Set();

  for(const key of new Set([...Object.keys(before) , ...Object.keys(after)])) {
    if(JSON.stringify(before[key]) === JSON.stringify(after[key])) continue;

    if(Array.isArray(before[key]) || Array.isArray(after[key])) {
      const label = SECTION_LABELS[key] ?? prettify(key);
      const delta = (after[key]?.length ?? 0) - (before[key]?.length ?? 0);
      labels.add(delta === 0 ? label : `${label} (${delta > 0 ? "+" : ""}${delta})`);
    } else {
      labels.add(isColorKey(key) ? "Colors" : (FIELD_LABELS[key] ?? prettify(key)));
    }
  }

  const list = [...labels];
  return list.length > MAX_CHIPS ? [...list.slice(0 , MAX_CHIPS) , `+${list.length - MAX_CHIPS} more`] : list;
};

export { describeChanges };