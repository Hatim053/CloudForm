// the friendly name of each template the AI can pick (shown to the creator , never the id)
const AI_TEMPLATE_NAMES = {
  wf001 : "Waitlist page",
  sf001 : "Booking form",
  ic001 : "Link page",
  ic002 : "Profile card"
};

const getTemplateName = (templateId) => AI_TEMPLATE_NAMES[templateId] ?? "Page";

// TODO: set this to the route of your form creation page (the one that reads :id with useParams)
const BUILDER_PATH = (templateId) => `/form-creation/${templateId}`;

export { AI_TEMPLATE_NAMES , getTemplateName , BUILDER_PATH };