import { generateJson , AiProviderError } from "../Utilities/aiClient.js";
import { createDefaultAcquire } from "../Utilities/aiRateLimiter.js";
import { MAX_PROMPT_LENGTH , buildSystemPrompt , buildUserPrompt , buildRepairPrompt , cleanUserPrompt } from "../Utilities/aiTemplatePrompt.js";
import { validateGeneration , parseModelJson , RefusedError } from "../Utilities/aiTemplateValidator.js";

const MIN_PROMPT_LENGTH = 3;
const MAX_DRAFT_JSON_LENGTH = 30000;

const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

const send = (res , status , message , extra = {}) => res.status(status).json({ status , message , ...extra });

// the model gets two tries : the second one is told what was wrong with the first
const runGeneration = async ({ prompt , currentDraft , today , generate }) => {
  const system = buildSystemPrompt(today);
  const user = buildUserPrompt({ prompt , current : currentDraft });
  const temperature = currentDraft ? 0.4 : 0.7;

  let problem = null;
  for(let attempt = 1; attempt <= 2; attempt++) {
    try {
      const text = await generate({ system , user : problem ? buildRepairPrompt(user , problem) : user , temperature });
      return validateGeneration(parseModelJson(text) , { today });
    } catch (error) {
      const canRetry = error?.isValidation || (error instanceof AiProviderError && error.kind === "bad_output");
      if(!canRetry || attempt === 2) throw error;
      problem = error.message;
    }
  }
};

// dependencies are passed in so the flow can be tested without a real AI provider
const createGenerateTemplate = ({ generate , acquireSlot , now = () => new Date() }) => async (req , res) => {
  try {
    const userId = req?.user?._id?.toString();
    if(!userId) return send(res , 401 , "Please log in to create a page with AI.");

    const { prompt: rawPrompt , current } = req?.body ?? {};

    if(typeof rawPrompt !== "string") return send(res , 400 , "Tell us a little more about the page you want.");
    if(rawPrompt.length > MAX_PROMPT_LENGTH) return send(res , 400 , `Please keep your description under ${MAX_PROMPT_LENGTH} characters.`);
    const prompt = cleanUserPrompt(rawPrompt);
    if(prompt.length < MIN_PROMPT_LENGTH) return send(res , 400 , "Tell us a little more about the page you want.");

    const today = now();

    // the draft the browser sends back is untrusted too : it is rebuilt through the same validator before the model ever sees it
    let currentDraft = null;
    if(current !== undefined && current !== null) {
      try {
        if(!isPlainObject(current) || JSON.stringify(current).length > MAX_DRAFT_JSON_LENGTH) throw new Error("bad draft");
        currentDraft = validateGeneration({ templateId : current.templateId , previewData : current.previewData } , { today });
      } catch {
        return send(res , 400 , "We couldn't read your current page. Please start again.");
      }
    }

    const slot = acquireSlot(userId);
    if(!slot.allowed) {
      const retryAfterSeconds = Math.max(1 , Math.ceil(slot.retryAfterMs / 1000));
      res.set("Retry-After" , String(retryAfterSeconds));
      return send(res , 429 , "We're getting a lot of requests right now. Please try again in a little while." , { retryAfterSeconds });
    }

    const { templateId , previewData } = await runGeneration({ prompt , currentDraft , today , generate });
    return send(res , 200 , "template ready" , { templateId , previewData });

  } catch (error) {
    if(error instanceof RefusedError || (error instanceof AiProviderError && error.kind === "blocked")) {
      return send(res , 422 , "We can't create that kind of page. Try describing a different page.");
    }
    if(error instanceof AiProviderError) {
      if(error.kind === "rate_limited") return send(res , 429 , "Our AI helper is busy right now. Please try again in a minute.");
      if(error.kind === "config") {
        console.log("the AI provider is not configured correctly :" , error.message); // never the prompt , only the reason
        return send(res , 503 , "Creating pages with AI isn't available right now.");
      }
      if(error.kind === "unavailable") return send(res , 503 , "Our AI helper isn't responding. Please try again in a moment.");
    }
    if(error?.isValidation || error?.kind === "bad_output") {
      return send(res , 422 , "We couldn't turn that into a page. Try describing it in different words.");
    }

    console.log("error while generating a template" , error?.message);
    return send(res , 500 , "Something went wrong while creating your page.");
  }
};

const generateTemplate = createGenerateTemplate({ generate : generateJson , acquireSlot : createDefaultAcquire() });

export { generateTemplate , createGenerateTemplate , runGeneration };