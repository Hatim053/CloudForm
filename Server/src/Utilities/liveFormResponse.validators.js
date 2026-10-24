// everything the browser sends is untrusted : types , sizes and keys are checked here before anything touches the database

const MAX_ANSWERS = 100;
const MAX_ID_LENGTH = 100;
const MAX_STRING_LENGTH = 5000;
const MAX_ARRAY_ITEMS = 100;
const MAX_OBJECT_KEYS = 50;
const MAX_DEPTH = 3;
const MAX_VALUE_JSON_LENGTH = 20000;
const MAX_LABEL_LENGTH = 200;
const MAX_TOTAL_ELEMENTS = 500;
const MAX_TIME_SPENT_MS = 24 * 60 * 60 * 1000;
const MAX_TIME_SPENT_SECONDS = 7 * 24 * 60 * 60;

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.isValidation = true;
    }
}

const isPlainObject = (value) => {
    if(Object.prototype.toString.call(value) !== "[object Object]") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

// keys starting with $ or containing . are unsafe inside mongo documents , the rest block prototype pollution
const isSafeKey = (key) => typeof key === "string"
                           && key.length > 0
                           && key.length <= 50
                           && !key.startsWith("$")
                           && !key.includes(".")
                           && !["__proto__" , "constructor" , "prototype"].includes(key);

const clamp = (value , min , max) => (Number.isFinite(value) ? Math.min(Math.max(value , min) , max) : min);

const sanitizeValue = (value , depth = 0) => {
    if(typeof value === "string") {
        if(value.length > MAX_STRING_LENGTH) throw new ValidationError("an answer is too long");
        return value;
    }
    if(typeof value === "number") {
        if(!Number.isFinite(value)) throw new ValidationError("an answer has an invalid number");
        return value;
    }
    if(typeof value === "boolean") return value;
    if(value === null || value === undefined) return null;

    if(depth >= MAX_DEPTH) throw new ValidationError("an answer is nested too deeply");

    if(Array.isArray(value)) {
        if(value.length > MAX_ARRAY_ITEMS) throw new ValidationError("an answer has too many items");
        return value.map((item) => sanitizeValue(item , depth + 1));
    }

    if(isPlainObject(value)) {
        const keys = Object.keys(value);
        if(keys.length > MAX_OBJECT_KEYS) throw new ValidationError("an answer has too many fields");
        const clean = {};
        for(const key of keys) {
            if(!isSafeKey(key)) throw new ValidationError("an answer contains an invalid key");
            clean[key] = sanitizeValue(value[key] , depth + 1);
        }
        return clean;
    }

    throw new ValidationError("an answer has an unsupported type");
};

const isEmptyValue = (value) => value === null
                                || value === undefined
                                || (typeof value === "string" && value.trim() === "")
                                || (Array.isArray(value) && value.every(isEmptyValue))
                                || (isPlainObject(value) && Object.values(value).every(isEmptyValue));

// label is only a display snapshot , so anything odd is dropped instead of rejecting the whole request
const sanitizeLabel = (label) => {
    if(typeof label === "string") return label.length <= MAX_LABEL_LENGTH ? label : undefined;
    if(isPlainObject(label)) {
        const keys = Object.keys(label);
        if(keys.length === 0 || keys.length > 10) return undefined;
        const clean = {};
        for(const key of keys) {
            if(!isSafeKey(key) || typeof label[key] !== "string" || label[key].length > MAX_LABEL_LENGTH) return undefined;
            clean[key] = label[key];
        }
        return clean;
    }
    return undefined;
};

const sanitizeText = (text , maxLength) => {
    if(typeof text !== "string") return undefined;
    const trimmed = text.trim();
    return trimmed && trimmed.length <= maxLength ? trimmed : undefined;
};

const sanitizeAnswers = (rawAnswers) => {
    if(rawAnswers === undefined || rawAnswers === null) return [];
    if(!Array.isArray(rawAnswers)) throw new ValidationError("answers must be an array");
    if(rawAnswers.length > MAX_ANSWERS) throw new ValidationError("too many answers");

    const now = Date.now();
    const answersByElementId = new Map(); // one answer per element , the last one sent wins

    for(const raw of rawAnswers) {
        if(!isPlainObject(raw)) throw new ValidationError("every answer must be an object");

        const elementId = sanitizeText(raw.elementId , MAX_ID_LENGTH);
        if(!elementId) throw new ValidationError("every answer needs a valid elementId");

        const value = sanitizeValue(raw.value);
        if(JSON.stringify(value).length > MAX_VALUE_JSON_LENGTH) throw new ValidationError("an answer is too large");

        if(isEmptyValue(value)) { // the viewer cleared this field , so it counts as not answered
            answersByElementId.delete(elementId);
            continue;
        }

        const answeredAt = new Date(raw.answeredAt);
        answersByElementId.set(elementId , {
            elementId,
            elementName : sanitizeText(raw.elementName , MAX_ID_LENGTH),
            elementLabel : sanitizeLabel(raw.elementLabel),
            value,
            timeSpentMs : Math.round(clamp(raw.timeSpentMs , 0 , MAX_TIME_SPENT_MS)),
            answeredAt : Number.isNaN(answeredAt.getTime()) ? new Date(now) : new Date(Math.min(answeredAt.getTime() , now))
        });
    }

    return [...answersByElementId.values()];
};

const sanitizeProgress = ({ totalElements , lastElementId , timeSpentSeconds } , status) => ({
    totalElements : Math.round(clamp(totalElements , 0 , MAX_TOTAL_ELEMENTS)),
    lastElementId : sanitizeText(lastElementId , MAX_ID_LENGTH),
    timeSpentSeconds : status === "viewed" ? 0 : Math.round(clamp(timeSpentSeconds , 0 , MAX_TIME_SPENT_SECONDS))
});


// ---------- query params of the creator's responses list ----------
const LIST_STATUSES = ["partial" , "completed"]; // "viewed" sessions never answered anything , they only feed the views count
const DEVICE_TYPES = ["desktop" , "mobile" , "tablet"];
const MAX_FILTER_LENGTH = 100;
const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;

const parseFilterText = (value , name) => {
    if(typeof value !== "string" || !value.trim() || value.trim().length > MAX_FILTER_LENGTH) {
        throw new ValidationError(`invalid ${name} filter`);
    }
    return value.trim();
};

// date only values ("2026-08-04") for "to" mean the end of that day
const parseFilterDate = (value , name , endOfDay = false) => {
    if(typeof value !== "string") throw new ValidationError(`invalid ${name} date`);
    const date = new Date(value);
    if(Number.isNaN(date.getTime())) throw new ValidationError(`invalid ${name} date`);
    if(endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) date.setTime(date.getTime() + 24 * 60 * 60 * 1000 - 1);
    return date;
};

const parsePositiveInt = (value , fallback , max) => {
    const number = Number.parseInt(value , 10);
    return Number.isFinite(number) && number >= 1 ? Math.min(number , max) : fallback;
};

// every value comes from the query string , so anything that is not a plain string
// (for example ?country[$ne]=x , which express turns into an object) is rejected
const parseResponseListQuery = (query) => {
    const { status , country , city , deviceType , from , to , page , limit } = query ?? {};
    const filter = {};

    if(status === undefined || status === "all") {
        filter.status = { $in : LIST_STATUSES };
    } else if(LIST_STATUSES.includes(status)) {
        filter.status = status;
    } else {
        throw new ValidationError("invalid status filter");
    }

    if(country !== undefined) filter["viewer.country"] = parseFilterText(country , "country");
    if(city !== undefined) filter["viewer.city"] = parseFilterText(city , "city");
    if(deviceType !== undefined) {
        if(!DEVICE_TYPES.includes(deviceType)) throw new ValidationError("invalid deviceType filter");
        filter["viewer.deviceType"] = deviceType;
    }

    if(from !== undefined || to !== undefined) {
        const range = {};
        if(from !== undefined) range.$gte = parseFilterDate(from , "from");
        if(to !== undefined) range.$lte = parseFilterDate(to , "to" , true);
        if(range.$gte && range.$lte && range.$gte > range.$lte) throw new ValidationError("from date is after to date");
        filter.createdAt = range;
    }

    return {
        filter,
        page : parsePositiveInt(page , 1 , 1000000),
        limit : parsePositiveInt(limit , DEFAULT_PAGE_SIZE , MAX_PAGE_SIZE)
    };
};

export { sanitizeAnswers , sanitizeProgress , parseResponseListQuery , ValidationError };