// lib/ai/constants.js
// Languages offered in the selector + example prompts shown as chips.

export const LANGUAGES = [
  { code: "auto", label: "Auto-detect" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "hinglish", label: "Hinglish" },
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "ur", label: "اردو (Urdu)" },
];

export const EXAMPLES = {
  hi: [
    "मेरे कैफ़े के लिए ग्राहक फीडबैक फॉर्म बनाओ",
    "योग क्लास के लिए रजिस्ट्रेशन फॉर्म चाहिए",
  ],
  hinglish: [
    "Gym ke liye waitlist form banao",
    "Wedding photography ke liye client inquiry form",
  ],
  en: [
    "Customer feedback form for my cafe",
    "Waitlist form for a new fitness app",
  ],
  mr: ["माझ्या दुकानासाठी ग्राहक अभिप्राय फॉर्म तयार करा"],
  gu: ["મારા સલૂન માટે બુકિંગ ફોર્મ બનાવો"],
  bn: ["আমার কোচিং সেন্টারের জন্য ভর্তি ফর্ম বানাও"],
  ta: ["என் கடைக்கான வாடிக்கையாளர் கருத்து படிவம் உருவாக்கு"],
  default: [
    "Customer feedback form for my cafe",
    "Gym ke liye waitlist form banao",
  ],
};

export const MAX_PROMPT_LENGTH = 600;