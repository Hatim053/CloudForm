const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

const isEmptyValue = (value) => value === null
                                || value === undefined
                                || (typeof value === "string" && value.trim() === "")
                                || (Array.isArray(value) && value.length === 0)
                                || (isObject(value) && Object.values(value).every(isEmptyValue));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidPhone = (text) => /^[+()\-.\s\d]{7,25}$/.test(text) && (text.match(/\d/g)?.length ?? 0) >= 7 && (text.match(/\d/g)?.length ?? 0) <= 15;

const REQUIRED_MESSAGE = "This field is required";

// one place for every rule : returns the message to show under the field , or "" when it is fine.
// kind is the lowercase element name ("email" , "phone number" , ...)
const validateElement = (kind , element , value) => {
  const required = element.isRequired === true;

  if(isEmptyValue(value)) return required ? REQUIRED_MESSAGE : "";

  // name and date & time have two boxes , a required element needs both
  if(required && (kind === "name" || kind === "date & time") && ["01" , "02"].some((part) => isEmptyValue(value?.[part]))) return REQUIRED_MESSAGE;

  if(kind === "email" && !EMAIL_REGEX.test(String(value).trim())) return "Enter a valid email address";
  if(kind === "phone number" && !isValidPhone(String(value).trim())) return "Enter a valid phone number";
  return "";
};

export { isObject , isEmptyValue , validateElement , EMAIL_REGEX , isValidPhone };