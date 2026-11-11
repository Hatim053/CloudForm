import { getReadableTextColor } from "../../utils/colorUtils.js";

// the form card can be any colour the creator picks , so the text , inputs and chips follow it :
// a dark card gets the dark "glass" look , a light card gets light inputs with dark text.
// (class names are written out in full here so tailwind can see them)
const DARK = {
  mode : "dark",
  heading : "text-white",
  subheading : "text-white/60",
  label : "text-white/80",
  hint : "text-white/40",
  error : "text-red-300",
  footer : "text-white/40",
  input : "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-amber-300/60 aria-[invalid=true]:border-red-400/70 disabled:opacity-60 sm:text-sm",
  panel : "rounded-2xl border border-white/10 bg-black/30",
  chip : "border border-white/15 bg-black/30 text-white hover:bg-black/40",
  chipActive : "border border-amber-400/70 bg-amber-400/25 text-white",
  option : "bg-neutral-900 text-white",
  scheme : "[color-scheme:dark]",
  star : "#6b7280",
  muted : "text-white/50",
  faint : "text-white/30"
};

const LIGHT = {
  mode : "light",
  heading : "text-neutral-900",
  subheading : "text-neutral-500",
  label : "text-neutral-700",
  hint : "text-neutral-400",
  error : "text-red-600",
  footer : "text-neutral-400",
  input : "w-full rounded-2xl border border-black/10 bg-black/[0.04] px-4 py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-amber-500 aria-[invalid=true]:border-red-500 disabled:opacity-60 sm:text-sm",
  panel : "rounded-2xl border border-black/10 bg-black/[0.04]",
  chip : "border border-black/15 bg-black/[0.04] text-neutral-900 hover:bg-black/[0.08]",
  chipActive : "border border-amber-500 bg-amber-400/30 text-neutral-900",
  option : "bg-white text-neutral-900",
  scheme : "[color-scheme:light]",
  star : "#d1d5db",
  muted : "text-neutral-500",
  faint : "text-neutral-400"
};

// only hex colours can be measured , anything else (a colour name) is treated as a light card
const getFormTheme = (formBackground) => (getReadableTextColor(formBackground , "#111827" , "#ffffff") === "#ffffff" ? DARK : LIGHT);

export { getFormTheme };