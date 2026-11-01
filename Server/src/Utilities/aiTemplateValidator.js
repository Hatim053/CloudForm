import { TEMPLATE_CATALOG } from "./templateCatalog.js";

// whatever the AI sends back is untrusted input , exactly like a form posted by a stranger :
// only the keys of the chosen template survive , every value is re-typed , cut to length and cleaned ,
// links are limited to safe schemes and every missing key is filled in so the builder can list and edit it

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.isValidation = true;
  }
}

class RefusedError extends Error {
  constructor() {
    super("the request was refused");
    this.isRefusal = true;
  }
}

const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const MAX_URL_LENGTH = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

// cuts by characters (not code units) so an emoji is never split in half
const cleanText = (value , max) => {
  const raw = typeof value === "number" && Number.isFinite(value) ? String(value) : value;
  if(typeof raw !== "string") return "";
  const flat = raw.replace(/[\u0000-\u001f\u007f]/g , " ").replace(/\s+/g , " ").trim();
  return Array.from(flat).slice(0 , max).join("");
};

// "" , "#" and anything with a blocked scheme (javascript: , data: ...) become "" ; "www.site.com" becomes https://www.site.com
const cleanUrl = (value , httpsOnly = false) => {
  if(typeof value !== "string") return "";
  const trimmed = value.trim();
  if(!trimmed || trimmed === "#" || trimmed.length > MAX_URL_LENGTH) return "";

  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  try {
    const parsed = new URL(hasScheme ? trimmed : `https://${trimmed}`);
    const allowed = httpsOnly ? ["https:"] : ["http:" , "https:" , "mailto:"];
    if(!allowed.includes(parsed.protocol)) return "";
    if(parsed.protocol !== "mailto:" && !parsed.hostname.includes(".")) return ""; // "https://instagram" is not a real address
    return parsed.href;
  } catch {
    return "";
  }
};

const toIsoDay = (date) => date.toISOString().slice(0 , 10);

// a launch date in the past (or nonsense) would show an already finished countdown , so it becomes today + 30 days
const cleanDate = (value , today) => {
  const fallback = toIsoDay(new Date(today.getTime() + 30 * DAY_MS));
  const parsed = new Date(value);
  if(typeof value !== "string" || Number.isNaN(parsed.getTime())) return fallback;
  const day = toIsoDay(parsed);
  const latest = toIsoDay(new Date(today.getTime() + 5 * 365 * DAY_MS));
  return day >= toIsoDay(today) && day <= latest ? day : fallback;
};

const matchEnum = (value , values) => (
  typeof value === "string" ? values.find((item) => item.toLowerCase() === value.trim().toLowerCase()) : undefined
);

const sanitizeField = (spec , value , ctx) => {
  switch(spec.type) {
    case "text": return cleanText(value , spec.max);
    case "color": return typeof value === "string" && HEX_COLOR.test(value.trim()) ? value.trim() : spec.default;
    case "url": return cleanUrl(value , spec.httpsOnly);
    case "date": return cleanDate(value , ctx.today);
    case "bool": return value === true || value === "true";
    case "enum": return matchEnum(value , spec.values) ?? spec.fallback ?? spec.values[0];
    default: return "";
  }
};

const makeSlug = (rawId , label , used) => {
  const base = String(rawId ?? label ?? "field").toLowerCase().replace(/[^a-z0-9]+/g , "_").replace(/^_+|_+$/g , "").slice(0 , 24) || "field";
  const start = /^[a-z]/.test(base) ? base : `f_${base}`;
  let candidate = start;
  let count = 2;
  while(used.has(candidate)) candidate = `${start}_${count++}`;
  used.add(candidate);
  return candidate;
};

const sanitizeSection = (key , spec , raw , ctx) => {
  const items = [];
  const usedIds = new Set();

  for(const rawItem of Array.isArray(raw) ? raw : []) {
    if(items.length >= spec.max) break;
    if(!isPlainObject(rawItem)) continue;

    const item = {};
    for(const [field , fieldSpec] of Object.entries(spec.item)) {
      if(fieldSpec.type !== "slug") item[field] = sanitizeField(fieldSpec , rawItem[field] , ctx);
    }
    if((spec.requiredKeys ?? []).some((requiredKey) => !item[requiredKey])) continue;

    spec.normalizeItem?.(item , rawItem);
    items.push(spec.item.id?.type === "slug" ? { id : makeSlug(rawItem.id , item.label , usedIds) , ...item } : item);
  }

  if(items.length < spec.min) throw new ValidationError(`${key} needs at least ${spec.min} valid item${spec.min === 1 ? "" : "s"}`);
  return items;
};

const validatePreviewData = (templateId , raw , { today = new Date() } = {}) => {
  const spec = TEMPLATE_CATALOG[templateId];
  if(!spec) throw new ValidationError("unknown template");
  if(!isPlainObject(raw)) throw new ValidationError("previewData must be a JSON object");

  const ctx = { today };
  const previewData = {};
  for(const [key , fieldSpec] of Object.entries(spec.fields)) previewData[key] = sanitizeField(fieldSpec , raw[key] , ctx);
  for(const [key , sectionSpec] of Object.entries(spec.sections)) previewData[key] = sanitizeSection(key , sectionSpec , raw[key] , ctx);
  return previewData;
};

// the whole answer of the model : { templateId , previewData }
const validateGeneration = (parsed , ctx = {}) => {
  if(!isPlainObject(parsed)) throw new ValidationError("the answer must be a JSON object");
  if(parsed.refused === true) throw new RefusedError();

  const ids = Object.keys(TEMPLATE_CATALOG);
  const templateId = typeof parsed.templateId === "string" ? ids.find((id) => id === parsed.templateId.trim().toLowerCase()) : undefined;
  if(!templateId) throw new ValidationError(`templateId must be one of: ${ids.join(", ")}`);

  return { templateId , previewData : validatePreviewData(templateId , parsed.previewData , ctx) };
};

// models sometimes wrap the JSON in a code fence or add a sentence around it , so the object is cut out of the text
const parseModelJson = (text) => {
  if(typeof text !== "string") throw new ValidationError("the answer was empty");
  const unfenced = text.replace(/^\uFEFF/ , "").replace(/```(?:json)?/gi , "").trim();

  const attempts = [unfenced];
  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  if(start !== -1 && end > start) attempts.push(unfenced.slice(start , end + 1));

  for(const candidate of attempts) {
    try {
      return JSON.parse(candidate);
    } catch {
      // try the next form
    }
  }
  throw new ValidationError("the answer was not valid JSON");
};

export { validatePreviewData , validateGeneration , parseModelJson , ValidationError , RefusedError };