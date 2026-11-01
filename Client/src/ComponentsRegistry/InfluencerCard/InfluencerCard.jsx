import { useState } from "react";
import { Bell , ArrowUpRight } from "lucide-react";
import { getSafeUrl } from "../../utils/safeUrl.js";
import { getReadableTextColor } from "../../utils/colorUtils.js";

// unique Id : ic001
// a landing page : it only ever produces a "viewed" record , so it needs no onAnswer / onSubmit
// every previewData field arrives as a flat prop . isPreview : true inside the builder (links never leave the builder)
// name / banner / avatar / subscribeText / subscribeUrl have NO built in sample values : text that is not in the data would show up on every
// creator's live page and could not be edited in the builder , so the sample content belongs in the stored previewData

// the hover gradient of each card comes from the platform NAME and not from the stored data :
// tailwind only creates css for class names written in source files , class names that live inside data get no styles
// (to support another platform add a line here)
const PLATFORM_GRADIENTS = {
  twitter : "from-blue-400 to-blue-600",
  x : "from-gray-600 to-gray-900",
  instagram : "from-purple-400 to-pink-500",
  youtube : "from-red-400 to-red-700",
  linkedin : "from-blue-600 to-blue-900",
  github : "from-gray-600 to-gray-900",
  facebook : "from-blue-500 to-blue-700",
  discord : "from-indigo-400 to-indigo-700",
  website : "from-green-400 to-green-700"
};
const DEFAULT_GRADIENT = "from-gray-500 to-gray-700";

function InfluencerCard({
  name,
  banner,
  avatar,
  socialHandles,
  socialsHandles, // the spelling the ic001 sample data uses
  socialhandles, // the spelling this component used before
  links,
  subscribeText, // plain text fields : the builder can only edit text fields , so these are the ones creators can change
  subscribeUrl, // the top bar only shows on a live page when it has somewhere to go
  subscribeBtn, // { name , url } : still read when the flat fields above are empty
  backgroundColorHexcode = "#6b5a14",
  cardColorHexcode = "#8a7218",
  isPreview = false
}) {
  const [failedAvatar, setFailedAvatar] = useState(null);

  const socials = (Array.isArray(socialHandles) ? socialHandles : Array.isArray(socialsHandles) ? socialsHandles : Array.isArray(socialhandles) ? socialhandles : [])
                  .filter((social) => social && typeof social === "object");
  const linkItems = (Array.isArray(links) ? links : [])
                    .filter((item) => item && typeof item.text === "string" && item.text.trim() !== "");

  const safeSubscribeUrl = getSafeUrl(subscribeUrl || subscribeBtn?.url);
  const subscribeLabel = subscribeText || subscribeBtn?.name || "Subscribe";
  const showTopBar = isPreview || Boolean(safeSubscribeUrl);

  const avatarUrl = getSafeUrl(avatar , ["https:"]); // images only over https
  const showAvatar = Boolean(avatarUrl) && failedAvatar !== avatarUrl;
  const displayName = name || (isPreview ? "@yourname" : "");
  const bannerText = typeof banner === "string" ? banner.trim() : "";

  // the creator can pick any card colour : the name and the bell stay readable on it
  const ink = getReadableTextColor(cardColorHexcode , "#1f1f1f" , "#f5e9c2");
  const bellBackground = ink === "#f5e9c2" ? "bg-[#f5e9c2]/20" : "bg-black/10";

  // inside the builder a click must never navigate away and lose the creator's work
  const stayInBuilder = (event) => {
    if(isPreview) event.preventDefault();
  };

  const subscribeClass = "flex min-h-[2.75rem] items-center gap-2 rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-semibold text-[#f5e9c2]";

  return (
    <div className={`w-full flex items-center justify-center p-4 sm:p-6 ${isPreview ? "" : "min-h-screen"}`} style={{backgroundColor : backgroundColorHexcode}}>
      <div className="w-full max-w-md rounded-3xl p-5 sm:p-7 shadow-2xl" style={{backgroundColor : cardColorHexcode}}>
        {/* Top bar */}
        {showTopBar && (
          <div className="flex items-center justify-between gap-3">
            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${bellBackground}`} style={{color : ink}}>
              <Bell className="h-4 w-4" aria-hidden="true" />
            </div>
            {safeSubscribeUrl ? (
              <a href={safeSubscribeUrl} target="_blank" rel="noopener noreferrer" onClick={stayInBuilder} className={subscribeClass}>
                {subscribeLabel}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span className={`${subscribeClass} cursor-default`}>
                {subscribeLabel}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            )}
          </div>
        )}

        {/* Profile */}
        <div className={`${showTopBar ? "mt-5" : ""} flex flex-col items-center text-center`}>
          <div
            className="h-24 w-24 rounded-full bg-[#f5e9c2] overflow-hidden ring-4"
            style={{"--tw-ring-color" : backgroundColorHexcode}}
          >
            {showAvatar ? (
              <img
                src={avatarUrl}
                alt={displayName}
                referrerPolicy="no-referrer"
                decoding="async"
                onError={() => setFailedAvatar(avatarUrl)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-3xl" role="img" aria-label={displayName || "Profile photo"}>😎</div>
            )}
          </div>
          {displayName && <h1 className="mt-3 max-w-full break-words text-xl font-bold" style={{color : ink}}>{displayName}</h1>}
        </div>

        {/* Dynamic social cards */}
        {socials.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {socials.map((social, i) => {
              const socialUrl = getSafeUrl(social.url);
              const gradient = PLATFORM_GRADIENTS[String(social.platform ?? "").toLowerCase()] ?? DEFAULT_GRADIENT;
              const cardClass = "group relative overflow-hidden rounded-2xl bg-[#1f1f1f] p-4 transition-transform hover:-translate-y-0.5 motion-reduce:transform-none";

              const content = (
                <>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <div className="text-2xl" aria-hidden="true">{social.icon}</div>
                    <div className="text-[11px] uppercase tracking-wide text-[#f5e9c2]/60 group-hover:text-white/80 break-words">
                      {social.platform}
                    </div>
                    <div className="text-sm font-semibold text-[#f5e9c2] group-hover:text-white truncate">
                      {social.handle}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-base font-bold text-[#f5e9c2] group-hover:text-white">
                        {social.followers}
                      </span>
                      <span className="text-[11px] text-[#f5e9c2]/60 group-hover:text-white/70">
                        Followers
                      </span>
                    </div>
                  </div>
                </>
              );

              return socialUrl ? (
                <a key={i} href={socialUrl} target="_blank" rel="noopener noreferrer" onClick={stayInBuilder} className={cardClass}>
                  {content}
                </a>
              ) : (
                <div key={i} className={cardClass}>{content}</div>
              );
            })}
          </div>
        )}

        {/* Banner */}
        {bannerText && (
          <div className="mt-5 rounded-xl bg-[#1f1f1f] px-4 py-3 text-center text-xs font-semibold text-[#f5e9c2] break-words">
            {bannerText}
          </div>
        )}

        {/* Link list : long show names wrap instead of being cut off , rows without a usable link are plain text */}
        {linkItems.length > 0 && (
          <div className="mt-4 space-y-2.5">
            {linkItems.map((linkObj, i) => {
              const linkUrl = getSafeUrl(linkObj.url);
              const rowClass = "flex items-center justify-between gap-3 rounded-xl bg-[#f5e9c2] px-4 py-3 text-sm font-medium text-[#1f1f1f]";

              return linkUrl ? (
                <a key={i} href={linkUrl} target="_blank" rel="noopener noreferrer" onClick={stayInBuilder} className={`${rowClass} hover:bg-white transition`}>
                  <span className="min-w-0 break-words">{linkObj.text}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <div key={i} className={rowClass}>
                  <span className="min-w-0 break-words">{linkObj.text}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfluencerCard;