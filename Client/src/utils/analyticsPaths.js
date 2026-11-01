// every link of the creator screens is built here , so renaming a route is a one line change
// routes to register :
//   /analytics                      -> MyFormsPage
//   /analytics/:formId              -> FormResponsesPage
//   /analytics/response/:responseId -> ResponseDetailPage
const ANALYTICS_PATHS = {
  forms : "/analytics",
  formResponses : (formId) => `/analytics/${formId}`,
  responseDetail : (responseId) => `/analytics/response/${responseId}`
};

export { ANALYTICS_PATHS };