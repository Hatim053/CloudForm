import { Sparkles , Loader2 } from "lucide-react";

const MAX_LENGTH = 600;

const EXAMPLES = [
  "A waitlist for my meditation app launching in January",
  "A booking form for my photography studio",
  "A link page for a stand-up comedian with tour dates",
  "A profile card for a fitness coach"
];

// the box where the creator describes the page , and later what to change.
// It is a plain form : no chat bubbles , the creator is using the platform , not talking to a bot
function PromptPanel({ value , onChange , onSubmit , isLoading = false , hasDraft = false , error = null }) {
  const canSubmit = value.trim().length >= 3 && !isLoading;

  const handleSubmit = (event) => {
    event.preventDefault();
    if(canSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:p-5">
      <label htmlFor="ai-prompt" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1a2b21]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2b21]">
          <Sparkles size={13} className="text-[#f2a93b]" aria-hidden="true" />
        </span>
        {hasDraft ? "What would you like to change?" : "Describe the page you need"}
      </label>

      <textarea
        id="ai-prompt"
        rows={hasDraft ? 3 : 5}
        maxLength={MAX_LENGTH}
        value={value}
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if(event.key === "Enter" && (event.ctrlKey || event.metaKey)) handleSubmit(event);
        }}
        placeholder={hasDraft ? "e.g. Make the colors darker and add a LinkedIn link" : "e.g. A waitlist for my meditation app launching in January"}
        className="w-full resize-none rounded-xl bg-[#f4f3ef] px-3.5 py-3 text-base text-[#1a2b21] outline-none placeholder:text-[#8a9690] focus:ring-2 focus:ring-[#f2a93b]/40 disabled:opacity-60 sm:text-sm"
      />

      <div className="mt-1.5 flex items-center justify-between gap-3 text-xs text-[#8a9690]">
        <span>Any language works</span>
        <span>{value.length}/{MAX_LENGTH}</span>
      </div>

      {error && (
        <p role="alert" className="mt-3 break-words rounded-lg bg-[#fbeeea] px-3 py-2 text-sm text-[#c96a4e]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-4 flex min-h-[2.75rem] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#f2a93b] px-5 py-2.5 text-sm font-semibold text-[#2c4a3b] hover:bg-[#e8a230] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Designing your page...
          </>
        ) : hasDraft ? "Update page" : "Create my page"}
      </button>

      {!hasDraft && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-[#5c6b60]">Not sure where to start? Try one:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                disabled={isLoading}
                onClick={() => onChange(example)}
                className="cursor-pointer rounded-full bg-[#f4f3ef] px-3 py-1.5 text-left text-xs font-medium text-[#5c6b60] hover:bg-[#e8e6e0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

export default PromptPanel;