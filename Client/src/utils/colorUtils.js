// reads #rgb , #rgba , #rrggbb and #rrggbbaa , anything else (names , rgb() ...) returns null
const parseHexColor = (value) => {
  if(typeof value !== "string") return null;
  const match = value.trim().match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if(!match) return null;

  let hex = match[1];
  if(hex.length <= 4) hex = hex.split("").map((char) => char + char).join("");

  return {
    r : parseInt(hex.slice(0 , 2) , 16),
    g : parseInt(hex.slice(2 , 4) , 16),
    b : parseInt(hex.slice(4 , 6) , 16)
  };
};

const toLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

// WCAG relative luminance
const getLuminance = ({ r , g , b }) => 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

const getContrastRatio = (colorA , colorB) => {
  const lighter = Math.max(getLuminance(colorA) , getLuminance(colorB));
  const darker = Math.min(getLuminance(colorA) , getLuminance(colorB));
  return (lighter + 0.05) / (darker + 0.05);
};

// the creator can pick any card colour , so the text colour is chosen to stay readable on it :
// whichever of the dark / light text has the stronger contrast against that colour wins
const getReadableTextColor = (backgroundColor , darkText = "#111827" , lightText = "#ffffff") => {
  const background = parseHexColor(backgroundColor);
  if(!background) return darkText; // names / rgb() can't be measured here
  const dark = parseHexColor(darkText);
  const light = parseHexColor(lightText);
  return getContrastRatio(background , dark) >= getContrastRatio(background , light) ? darkText : lightText;
};

export { parseHexColor , getLuminance , getContrastRatio , getReadableTextColor };