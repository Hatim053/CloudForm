import { NavLink } from "react-router-dom";


// unique Id : ic003
function  SocialCard  ({ socials = []  , backgroundColorHexcode = "#FFF8F0" , cardColorHexcode = "#C08552"})  {
  const defaultSocials = [
    { platform: "Twitter", url: "#", icon: "𝕏", username: "@creator" },
    { platform: "Instagram", url: "#", icon: "📷", username: "@creator" },
    { platform: "GitHub", url: "#", icon: "🐙", username: "@creator" },
    { platform: "Discord", url: "#", icon: "💬", username: "creator#1234" },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;

  return (
   <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor : backgroundColorHexcode}}>
      <div className="relative max-w-md mx-auto w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 
                        rounded-3xl blur-xl opacity-60"></div>

        {/* Glass Card */}
        <div className="relative backdrop-blur-xl rounded-3xl p-8 
                        border border-white/40 shadow-2xl" style={{backgroundColor : cardColorHexcode}}>
          <h3 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Connect With Us
          </h3>

          <div className="space-y-4">
            {displaySocials.map((social, index) => (
              <NavLink
                key={index}
                to={social.url}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/20 rounded-2xl 
                           hover:bg-white/30 transition-all duration-300 
                           transform hover:scale-105 group border border-white/20"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>
                <div>
                  <p className="font-semibold text-white">{social.platform}</p>
                  <p className="text-white/70 text-sm">{social.username}</p>
                </div>
                <span className="ml-auto text-white/50 group-hover:text-white 
                                 transition-colors duration-300">
                  →
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;