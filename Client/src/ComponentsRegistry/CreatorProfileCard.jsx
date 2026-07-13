

// unique Id : ic002
function CreatorProfileCard({ name, bio, avatar="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/famous-places-in-bhopal_0_1200.jpg.webp", backgroundColorHexcode , cardColorHexcode ,   socials = [] }, folllowBtn = { name : "" , url: "" }) {
  const defaultSocials = [
    { platform: "twitter", url: "#", icon: "𝕏", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
    { platform: "instagram", url: "#", icon: "📷", color: "bg-gray-100 hover:bg-pink-100 text-gray-700" },
    { platform: "linkedin", url: "#", icon: "💼", color: "bg-gray-100 hover:bg-blue-100 text-gray-700" },
    { platform: "website", url: "#", icon: "🌐", color: "bg-gray-100 hover:bg-green-100 text-gray-700" },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;
  
  const handleClick = () => {
    window.location.href = folllowBtn.url || "#";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6" style={{backgroundColor : (backgroundColorHexcode|| "#ffff")}}>
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center 
                      hover:shadow-2xl transition-all duration-500" style={{backgroundColor : (cardColorHexcode || "#8B0000")}}>
        {/* Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-indigo-100">
          <img
            src={avatar || "https://via.placeholder.com/200"}
            alt={name || "Creator"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{name || "John Doe"}</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-6 px-2 sm:px-4">
          {bio || "Digital creator sharing insights about design, tech, and creativity."}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {displaySocials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center 
                          text-lg transition-all duration-300 transform hover:scale-110 
                          hover:shadow-md ${social.color}`}
              title={social.platform}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <button
          className="mt-6 px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 
                     text-white font-semibold rounded-full transition-all 
                     duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
          onClick={handleClick}
        >
          {folllowBtn.name || "follow"}
        </button>
      </div>
    </div>
  );
};


export default CreatorProfileCard;