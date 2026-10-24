import { useCallback, useEffect, useMemo, useRef } from "react";
import { getTemplateElements } from "../utils/templateMeta.js";

const SAVE_DEBOUNCE_MS = 2000;
// idle time between two answers is capped , so one forgotten open tab can't inflate the time of a single question
const MAX_GAP_MS = 5 * 60 * 1000;

const createSessionId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

// one id per form per browser tab : a refresh continues the same session , a new tab starts a new one
const getSessionId = (formId) => {
  const key = `cloudform-session-${formId}`;
  try {
    const existing = sessionStorage.getItem(key);
    if(existing) return existing;
    const created = createSessionId();
    sessionStorage.setItem(key , created);
    return created;
  } catch {
    return createSessionId(); // storage blocked (private mode) : the session then lasts until the page reloads
  }
};

const isEmptyValue = (value) => value === null
                                || value === undefined
                                || (typeof value === "string" && value.trim() === "")
                                || (Array.isArray(value) && value.every(isEmptyValue))
                                || (typeof value === "object" && !Array.isArray(value) && Object.values(value).every(isEmptyValue));

const createSessionState = () => ({
  sessionId : null,
  answers : new Map(),
  lastElementId : undefined,
  lastEventAt : 0,
  activeMs : 0, // time the tab was actually visible
  visibleSince : null,
  dirty : false,
  completed : false,
  submitting : false,
  timer : null
});

// the page owns the whole saving flow , so no template needs any api code :
//   onAnswer(elementId , value) -> called by a template on every change , progress is saved shortly after
//   onSubmit(answers)           -> called by a template once , resolves when saved and throws if it failed
function useLiveFormSession({ formId , linkStatus , templateId , elementsData }) {

  const elements = useMemo(() => getTemplateElements(templateId , elementsData) , [templateId , elementsData]);
  const enabled = Boolean(formId && linkStatus && templateId && elementsData);

  // event listeners and timers are created once , so they read the latest values through refs
  const configRef = useRef({ formId , linkStatus , elements });
  useEffect(() => {
    configRef.current = { formId , linkStatus , elements };
  });
  const sessionRef = useRef(createSessionState());

  const save = useCallback(async (status , keepalive = false) => {
    const { formId : currentFormId , linkStatus : currentLinkStatus , elements : currentElements } = configRef.current;
    const s = sessionRef.current;
    const now = Date.now();
    const activeMs = s.activeMs + (s.visibleSince ? now - s.visibleSince : 0);

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/live-form-response/save/${currentLinkStatus}` , {
      method : "POST",
      credentials : "include",
      keepalive : keepalive, // lets the request finish while the page is closing
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        formId : currentFormId,
        sessionId : s.sessionId,
        status : status,
        answers : [...s.answers.values()].filter((answer) => !isEmptyValue(answer.value)),
        totalElements : currentElements.length,
        lastElementId : s.lastElementId,
        timeSpentSeconds : Math.round(activeMs / 1000)
      })
    });

    // the auth middlewares answer some failures with HTTP 200 and the real code only in the body
    const jsonResponse = await response.json().catch(() => null);
    if(!response.ok || jsonResponse?.status !== 200) {
      throw new Error(jsonResponse?.message ?? "Could not save the response");
    }
  } , []);

  // progress saves are best effort : a failure is only logged and retried on the next change or when the viewer leaves
  const flushPartial = useCallback((keepalive = false) => {
    const s = sessionRef.current;
    clearTimeout(s.timer);
    s.timer = null;
    if(!s.dirty || s.completed || s.submitting) return;

    s.dirty = false;
    save("partial" , keepalive).catch((error) => {
      s.dirty = true;
      console.log("could not save progress" , error);
    });
  } , [save]);

  useEffect(() => {
    if(!enabled) return;

    const s = sessionRef.current;
    Object.assign(s , createSessionState() , {
      sessionId : getSessionId(formId),
      lastEventAt : Date.now(),
      visibleSince : document.visibilityState === "visible" ? Date.now() : null
    });

    // the first request of a session : the page was opened (the server adds location + device from this request)
    save("viewed").catch((error) => console.log("could not record the view" , error));

    const onVisibilityChange = () => {
      const now = Date.now();
      if(document.visibilityState === "hidden") {
        if(s.visibleSince) {
          s.activeMs += now - s.visibleSince;
          s.visibleSince = null;
        }
        flushPartial(true);
      } else {
        s.visibleSince = now;
      }
    };
    const onPageHide = () => flushPartial(true);

    document.addEventListener("visibilitychange" , onVisibilityChange);
    window.addEventListener("pagehide" , onPageHide);

    return () => {
      document.removeEventListener("visibilitychange" , onVisibilityChange);
      window.removeEventListener("pagehide" , onPageHide);
      flushPartial(true); // leaving through the router counts as leaving too
    };
  } , [enabled , formId , save , flushPartial]);

  const recordAnswer = (elementId , value , gapMs) => {
    const s = sessionRef.current;
    const element = configRef.current.elements.find((item) => item.id === elementId);
    const previous = s.answers.get(elementId);
    s.answers.set(elementId , {
      elementId,
      elementName : element?.name,
      elementLabel : element?.label,
      value,
      timeSpentMs : (previous?.timeSpentMs ?? 0) + gapMs,
      answeredAt : new Date().toISOString()
    });
    s.lastElementId = elementId;
  };

  const onAnswer = useCallback((elementId , value) => {
    const s = sessionRef.current;
    if(!s.sessionId || s.completed) return;

    const now = Date.now();
    const gapMs = Math.min(now - s.lastEventAt , MAX_GAP_MS);
    s.lastEventAt = now;

    recordAnswer(elementId , value , gapMs);
    s.dirty = true;

    clearTimeout(s.timer);
    s.timer = setTimeout(() => flushPartial(false) , SAVE_DEBOUNCE_MS);
  } , [flushPartial]);

  const onSubmit = useCallback(async (finalAnswers = {}) => {
    const s = sessionRef.current;
    if(!s.sessionId) throw new Error("The form is not ready yet");
    if(s.submitting) throw new Error("Already submitting");

    s.submitting = true;
    clearTimeout(s.timer);
    s.timer = null;

    try {
      // whatever the template hands over is what gets saved , even for a field it never reported through onAnswer
      for(const [elementId , value] of Object.entries(finalAnswers)) {
        recordAnswer(elementId , value , 0);
      }
      await save("completed");
      s.completed = true;
    } finally {
      s.submitting = false;
    }
  } , [save]);

  return { onAnswer, onSubmit };
}

export default useLiveFormSession;