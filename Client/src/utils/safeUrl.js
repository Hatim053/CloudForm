// creator supplied links end up in href / src on pages that other people open ,
// so only these schemes are allowed : a "javascript:" link would run code in the viewer's browser
const DEFAULT_PROTOCOLS = ["http:" , "https:" , "mailto:"];

// returns a clean absolute url , or null when there is nothing usable ("" , "#" , a blocked scheme , garbage)
// "www.instagram.com/me" (no scheme) is accepted and becomes https://www.instagram.com/me
const getSafeUrl = (url , allowedProtocols = DEFAULT_PROTOCOLS) => {
  if(typeof url !== "string") return null;
  const trimmed = url.trim();
  if(!trimmed || trimmed === "#") return null;

  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  try {
    // the url parser also strips tabs / line breaks , so "java\nscript:..." can't sneak through
    const parsed = new URL(hasScheme ? trimmed : `https://${trimmed}`);
    return allowedProtocols.includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
};

export { getSafeUrl };