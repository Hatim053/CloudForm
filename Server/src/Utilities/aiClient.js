// one function for every provider : generateJson({ system , user }) -> the model's text (a JSON string)
// .env :
//   AI_PROVIDER = groq | gemini | openai-compatible      (default groq)
//   AI_API_KEY  = the key of that provider
//   AI_MODEL    = a model that is on the provider's FREE tier. Free model lists change every few months : check the provider's page
//   AI_BASE_URL = only for openai-compatible (e.g. https://openrouter.ai/api/v1) , optional override for the others
//   AI_TIMEOUT_MS = default 25000

class AiProviderError extends Error {
  // kind : config | rate_limited | unavailable | bad_output | blocked
  constructor(kind , message , extra = {}) {
    super(message);
    this.kind = kind;
    Object.assign(this , extra);
  }
}

const getConfig = (env) => {
  const provider = (env.AI_PROVIDER || "groq").toLowerCase();
  const apiKey = env.AI_API_KEY;
  const model = env.AI_MODEL;
  if(!apiKey || !model) throw new AiProviderError("config" , "AI_API_KEY and AI_MODEL must be set");

  if(provider === "gemini") {
    return { style : "gemini" , apiKey , model , baseUrl : env.AI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta" };
  }
  if(provider === "groq") {
    return { style : "openai" , apiKey , model , baseUrl : env.AI_BASE_URL || "https://api.groq.com/openai/v1" };
  }
  if(provider === "openai-compatible") {
    if(!env.AI_BASE_URL) throw new AiProviderError("config" , "AI_BASE_URL must be set for openai-compatible");
    return { style : "openai" , apiKey , model , baseUrl : env.AI_BASE_URL };
  }
  throw new AiProviderError("config" , `unknown AI_PROVIDER "${provider}"`);
};

const MAX_OUTPUT_TOKENS = 2048;

const buildGeminiRequest = (config , { system , user , temperature }) => ({
  url : `${config.baseUrl}/models/${encodeURIComponent(config.model)}:generateContent`,
  init : {
    method : "POST",
    headers : { "Content-Type" : "application/json" , "x-goog-api-key" : config.apiKey },
    body : JSON.stringify({
      systemInstruction : { parts : [{ text : system }] },
      contents : [{ role : "user" , parts : [{ text : user }] }],
      generationConfig : { responseMimeType : "application/json" , temperature , maxOutputTokens : MAX_OUTPUT_TOKENS }
    })
  }
});

const buildOpenAiRequest = (config , { system , user , temperature }) => ({
  url : `${config.baseUrl.replace(/\/$/ , "")}/chat/completions`,
  init : {
    method : "POST",
    headers : { "Content-Type" : "application/json" , Authorization : `Bearer ${config.apiKey}` },
    body : JSON.stringify({
      model : config.model,
      messages : [{ role : "system" , content : system } , { role : "user" , content : user }],
      temperature,
      max_tokens : MAX_OUTPUT_TOKENS,
      response_format : { type : "json_object" }
    })
  }
});

const readGeminiText = (data) => {
  if(data?.promptFeedback?.blockReason) throw new AiProviderError("blocked" , "the provider blocked the request");
  const candidate = data?.candidates?.[0];
  const text = (candidate?.content?.parts ?? []).filter((part) => typeof part?.text === "string" && !part.thought).map((part) => part.text).join("");
  if(!text.trim()) throw new AiProviderError(candidate?.finishReason === "SAFETY" ? "blocked" : "bad_output" , "the provider returned no text");
  return text;
};

const readOpenAiText = (data) => {
  const choice = data?.choices?.[0];
  const text = choice?.message?.content;
  if(typeof text !== "string" || !text.trim()) throw new AiProviderError("bad_output" , "the provider returned no text");
  if(choice.finish_reason === "length") throw new AiProviderError("bad_output" , "the provider's answer was cut off");
  return text;
};

// the provider's error body is never copied : it can contain parts of the prompt
const toProviderError = (response) => {
  if(response.status === 429) {
    const retryAfter = Number(response.headers?.get?.("retry-after"));
    return new AiProviderError("rate_limited" , "the provider's rate limit was reached" , { retryAfterSeconds : Number.isFinite(retryAfter) ? retryAfter : undefined });
  }
  if([400 , 401 , 403 , 404].includes(response.status)) return new AiProviderError("config" , `the provider rejected the request (${response.status})` , { httpStatus : response.status });
  return new AiProviderError("unavailable" , `the provider failed (${response.status})` , { httpStatus : response.status });
};

const generateJson = async ({ system , user , temperature = 0.6 } , { env = process.env , fetchImpl = globalThis.fetch } = {}) => {
  const config = getConfig(env);
  const timeoutMs = Number(env.AI_TIMEOUT_MS) || 25000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort() , timeoutMs);

  try {
    const { url , init } = (config.style === "gemini" ? buildGeminiRequest : buildOpenAiRequest)(config , { system , user , temperature });
    const response = await fetchImpl(url , { ...init , signal : controller.signal });
    if(!response.ok) throw toProviderError(response);

    const data = await response.json();
    return config.style === "gemini" ? readGeminiText(data) : readOpenAiText(data);
  } catch (error) {
    if(error instanceof AiProviderError) throw error;
    if(error?.name === "AbortError") throw new AiProviderError("unavailable" , "the provider took too long");
    throw new AiProviderError("unavailable" , "could not reach the provider");
  } finally {
    clearTimeout(timer);
  }
};

export { generateJson , AiProviderError , getConfig , buildGeminiRequest , buildOpenAiRequest , readGeminiText , readOpenAiText };