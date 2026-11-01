// the optional filters of the responses list (status has its own toggle)
const EMPTY_FILTERS = { country : "" , city : "" , deviceType : "" , from : "" , to : "" };

const countActiveFilters = (filters) => Object.values(filters).filter((value) => value && value.trim?.() !== "").length;

export { EMPTY_FILTERS , countActiveFilters };