const OS_LABELS = { windows : "Windows" , macos : "macOS" , ios : "iOS" , android : "Android" , linux : "Linux" , other : "Other" };

const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : "");

const toDate = (value) => {
  const date = new Date(value);
  return value && !Number.isNaN(date.getTime()) ? date : null;
};

const formatLocation = (viewer) => {
  const parts = [viewer?.city , viewer?.state , viewer?.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Unknown location";
};

const formatDevice = (viewer) => {
  const parts = [capitalize(viewer?.deviceType) , OS_LABELS[viewer?.os]].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : "Unknown device";
};

const formatOs = (viewer) => OS_LABELS[viewer?.os] ?? "Unknown";

const formatDate = (value) => {
  const date = toDate(value);
  return date ? date.toLocaleDateString(undefined , { day : "numeric" , month : "short" , year : "numeric" }) : "—";
};

const formatTime = (value) => {
  const date = toDate(value);
  return date ? date.toLocaleTimeString(undefined , { hour : "2-digit" , minute : "2-digit" }) : "—";
};

// 45 -> "45s" , 117 -> "1m 57s" , 3720 -> "1h 2m"
const formatDuration = (seconds) => {
  if(!Number.isFinite(seconds)) return "—";
  const total = Math.max(0 , Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  if(hours > 0) return `${hours}h ${minutes}m`;
  if(minutes > 0) return `${minutes}m ${rest}s`;
  return `${rest}s`;
};

const getRespondentLabel = (response) => response?.respondentEmail || "Anonymous";
const getInitials = (label) => (label === "Anonymous" ? "?" : label.slice(0 , 2).toUpperCase());
const shortId = (id) => String(id ?? "").slice(-6).toUpperCase();

// a label is a string or {"01" : "First Name" , "02" : "Last Name"}
const formatLabel = (label) => {
  if(typeof label === "string") return label;
  if(label && typeof label === "object") return Object.values(label).filter((part) => typeof part === "string").join(" / ");
  return "";
};

// an answer is a string , a number , a list ("english , hindi") or an object ({"01" : "John" , "02" : "Doe"})
// it is only ever rendered as text , never as html or a link
const formatAnswerValue = (value) => {
  if(value === null || value === undefined) return "";
  if(typeof value === "string") return value;
  if(typeof value === "number" || typeof value === "boolean") return String(value);
  if(Array.isArray(value)) return value.map(formatAnswerValue).filter(Boolean).join(", ");
  if(typeof value === "object") return Object.values(value).map(formatAnswerValue).filter(Boolean).join(" ");
  return "";
};

export {
  formatLocation,
  formatDevice,
  formatOs,
  formatDate,
  formatTime,
  formatDuration,
  getRespondentLabel,
  getInitials,
  shortId,
  formatLabel,
  formatAnswerValue
};