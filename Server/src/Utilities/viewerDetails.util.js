import Bowser from "bowser";
import geoip from "geoip-lite";

// full country names ("IN" -> "India") without shipping a lookup table
const regionNames = new Intl.DisplayNames(["en"] , { type : "region" });

const getCountryName = (code) => {
    try {
        return regionNames.of(code) ?? code;
    } catch {
        return code;
    }
};

const getOs = (name = "") => {
    const osName = name.toLowerCase();
    if(osName.includes("windows")) return "windows";
    if(osName === "ios" || osName.includes("ipados")) return "ios";
    if(osName.includes("android")) return "android";
    if(osName.includes("mac")) return "macos";
    if(/linux|ubuntu|debian|fedora|mint|arch|centos|red hat|suse|gentoo/.test(osName)) return "linux";
    return "other";
};

const getDeviceType = (type = "") => {
    if(type === "mobile") return "mobile";
    if(type === "tablet") return "tablet";
    return "desktop";
};

// everything is derived from the request itself , nothing here comes from the request body
// req.ip is only correct behind a proxy once app.set("trust proxy" , ...) is configured
const getViewerDetails = (req) => {
    const userAgent = req?.get?.("user-agent") ?? req?.headers?.["user-agent"] ?? "";
    let parsed = {};
    try {
        // bowser throws on an empty user agent (scripts , some bots , health checks) , which must not break saving
        parsed = userAgent ? Bowser.parse(userAgent) : {};
    } catch {
        parsed = {};
    }

    const ip = (req?.ip ?? "").replace(/^::ffff:/ , "");
    const location = ip ? geoip.lookup(ip) : null; // null for localhost / private ips

    return {
        country : location?.country ? getCountryName(location.country) : undefined,
        state : location?.region || undefined, // geoip-lite only knows the region code (e.g. "MH")
        city : location?.city || undefined,
        deviceType : getDeviceType(parsed.platform?.type),
        os : getOs(parsed.os?.name),
        browser : parsed.browser?.name ? parsed.browser.name.slice(0 , 50) : undefined
    };
};

export { getViewerDetails };