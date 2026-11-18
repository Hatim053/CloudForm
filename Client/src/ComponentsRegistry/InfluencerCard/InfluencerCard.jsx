import { useState } from "react";
import { Bell , ArrowUpRight } from "lucide-react";
import { getSafeUrl } from "../../utils/safeUrl.js";
import { getReadableTextColor } from "../../utils/colorUtils.js";

// unique Id : ic001
//
// layout : "stack" (default , the original look) | "links-first" | "compact"
// theme  : "dark" (default , the original look : near-black tiles) | "light" (white tiles)
//          the theme is the style of the tiles that sit on the card colour , the card and page colours stay the creator's own
// Pages saved before layout / theme existed have neither prop , so they render exactly as before.
// Any other value falls back to the default.

const LAYOUTS = ["stack" , "links-first" , "compact"];
const THEMES = ["dark" , "light"];

// every class is written out in full so Tailwind can find it
const THEME_CLASSES = {
  dark : {
    tile : "bg-[#1f1f1f]",
    tileLabel : "text-[#f5e9c2]/60 group-hover:text-white/80",
    tileValue : "text-[#f5e9c2] group-hover:text-white",
    tileFollowers : "text-[#f5e9c2]/60 group-hover:text-white/70",
    banner : "bg-[#1f1f1f] text-[#f5e9c2]",
    link : "bg-[#f5e9c2] text-[#1f1f1f]",
    linkHover : "hover:bg-white",
    button : "bg-[#1f1f1f] text-[#f5e9c2]",
  },
  light : {
    tile : "bg-white",
    tileLabel : "text-[#1f1f1f]/60 group-hover:text-white/80",
    tileValue : "text-[#1f1f1f] group-hover:text-white",
    tileFollowers : "text-[#1f1f1f]/60 group-hover:text-white/70",
    banner : "bg-white text-[#1f1f1f]",
    link : "bg-white text-[#1f1f1f]",
    linkHover : "hover:bg-[#f5e9c2]",
    button : "bg-white text-[#1f1f1f]",
  },
};

const pickOption = (value , allowed , fallback) => {
  const clean = typeof value === "string" ? value.trim().toLowerCase() : "";
  return allowed.includes(clean) ? clean : fallback;
};

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
  layout = "stack",
  theme = "dark",
  isPreview = false
}) {
  const [failedAvatar, setFailedAvatar] = useState(null);

  const activeLayout = pickOption(layout , LAYOUTS , "stack");
  const t = THEME_CLASSES[pickOption(theme , THEMES , "dark")];

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

  const subscribeClass = `flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${t.button}`;

  /* ---------------- pieces shared by the layouts ---------------- */

  const topBar = showTopBar && (
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
  );

  const renderAvatar = (sizeClass , emojiClass) => (
    <div
      className={`${sizeClass} shrink-0 rounded-full bg-[#f5e9c2] overflow-hidden ring-4`}
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
        <div className={`h-full w-full grid place-items-center ${emojiClass}`} role="img" aria-label={displayName || "Profile photo"}>😎</div>
      )}
    </div>
  );

  // photo and name in the middle (stack + links-first)
  const profileCentered = (
    <div className={`${showTopBar ? "mt-5" : ""} flex flex-col items-center text-center`}>
      {renderAvatar("h-24 w-24" , "text-3xl")}
      {displayName && <h1 className="mt-3 max-w-full break-words text-xl font-bold" style={{color : ink}}>{displayName}</h1>}
    </div>
  );

  // photo on the left , name beside it (compact)
  const profileRow = (
    <div className={`${showTopBar ? "mt-5" : ""} flex items-center gap-4`}>
      {renderAvatar("h-16 w-16" , "text-2xl")}
      {displayName && <h1 className="min-w-0 break-words text-lg font-bold" style={{color : ink}}>{displayName}</h1>}
    </div>
  );

  // Dynamic social cards (smaller , three to a row , in the compact layout)
  const renderSocials = (marginClass , compact) => socials.length > 0 && (
    <div className={`${marginClass} grid ${compact ? "grid-cols-3 gap-2" : "grid-cols-2 gap-3"}`}>
      {socials.map((social, i) => {
        const socialUrl = getSafeUrl(social.url);
        const gradient = PLATFORM_GRADIENTS[String(social.platform ?? "").toLowerCase()] ?? DEFAULT_GRADIENT;
        const cardClass = `group relative overflow-hidden rounded-2xl ${t.tile} ${compact ? "p-3" : "p-4"} transition-transform hover:-translate-y-0.5 motion-reduce:transform-none`;

        const content = (
          <>
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            <div className="relative z-10 flex flex-col gap-1.5">
              <div className={compact ? "text-xl" : "text-2xl"} aria-hidden="true">{social.icon}</div>
              <div className={`text-[11px] uppercase tracking-wide ${t.tileLabel} break-words`}>
                {social.platform}
              </div>
              <div className={`text-sm font-semibold ${t.tileValue} truncate`}>
                {social.handle}
              </div>
              {String(social.followers ?? "").trim() !== "" && (
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={`text-base font-bold ${t.tileValue}`}>
                    {social.followers}
                  </span>
                  <span className={`text-[11px] ${t.tileFollowers}`}>
                    Followers
                  </span>
                </div>
              )}
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
  );

  // Banner
  const renderBanner = (marginClass) => bannerText && (
    <div className={`${marginClass} rounded-xl px-4 py-3 text-center text-xs font-semibold break-words ${t.banner}`}>
      {bannerText}
    </div>
  );

  // Link list : long show names wrap instead of being cut off , rows without a usable link are plain text
  const renderLinks = (marginClass) => linkItems.length > 0 && (
    <div className={`${marginClass} space-y-2.5`}>
      {linkItems.map((linkObj, i) => {
        const linkUrl = getSafeUrl(linkObj.url);
        const rowClass = `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium ${t.link}`;

        return linkUrl ? (
          <a key={i} href={linkUrl} target="_blank" rel="noopener noreferrer" onClick={stayInBuilder} className={`${rowClass} ${t.linkHover} transition`}>
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
  );

  /* ---------------- the three layouts : the same pieces in a different order ---------------- */

  const body = activeLayout === "links-first" ? (
    <>
      {profileCentered}
      {renderLinks("mt-6")}
      {renderBanner("mt-5")}
      {renderSocials("mt-5" , false)}
    </>
  ) : activeLayout === "compact" ? (
    <>
      {profileRow}
      {renderBanner("mt-4")}
      {renderLinks("mt-4")}
      {renderSocials("mt-4" , true)}
    </>
  ) : (
    <>
      {profileCentered}
      {renderSocials("mt-6" , false)}
      {renderBanner("mt-5")}
      {renderLinks("mt-4")}
    </>
  );

  return (
    <div className={`w-full flex items-center justify-center p-4 sm:p-6 ${isPreview ? "" : "min-h-screen"}`} style={{backgroundColor : backgroundColorHexcode}}>
      <div className="w-full max-w-md rounded-3xl p-5 sm:p-7 shadow-2xl" style={{backgroundColor : cardColorHexcode}}>
        {topBar}
        {body}
      </div>
    </div>
  );
}

export default InfluencerCard;