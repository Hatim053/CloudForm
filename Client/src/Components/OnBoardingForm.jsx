import { useState } from "react";

const questions = [
  { q: "How did you hear about us?", options: ["Social Media", "A Friend / Colleague", "Search Engine", "Newsletter / Blog"] },
  { q: "What best describes your goal?", options: ["Build a product", "Grow my audience", "Launch a campaign", "Just exploring"] },
  { q: "How often do you build forms?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
];

export default function SurveyForm() {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const q = questions[qIndex];

  const handleNext = () => {
    if (qIndex < questions.length - 1) { setQIndex((i) => i + 1); setSelected(null); }
    else setDone(true);
  };

  if (done) {
    return (
      <div className="font-dm bg-white p-8 w-full text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thanks for sharing!</h3>
        <p className="text-sm text-gray-400 mb-6">Your responses have been recorded.</p>
        <button onClick={() => { setQIndex(0); setSelected(null); setDone(false); }} className="px-6 py-2.5 border-2 border-gray-900 text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="font-dm bg-white p-6 sm:p-8 w-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
          Question {qIndex + 1} of {questions.length}
        </span>
        <div className="flex-1 h-0.5 bg-stone-100">
          <div className="h-full bg-gray-900 transition-all duration-500" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug mb-6">{q.q}</h3>

      <div className="flex flex-col gap-2.5 mb-8">
        {q.options.map((opt, i) => (
          <button key={opt} onClick={() => setSelected(i)} className={`px-4 py-3.5 border-[1.5px] rounded-xl text-sm text-left flex items-center gap-3 transition-all duration-150 ${selected === i ? "border-gray-900 bg-gray-50" : "border-stone-200 bg-stone-50 hover:border-stone-400"}`}>
            <span className={`w-5 h-5 rounded-full border-[1.5px] flex-shrink-0 flex items-center justify-center text-xs transition-all ${selected === i ? "bg-gray-900 border-gray-900 text-white" : "border-stone-300"}`}>
              {selected === i ? "✓" : String.fromCharCode(65 + i)}
            </span>
            <span className={`font-medium ${selected === i ? "text-gray-900" : "text-stone-600"}`}>{opt}</span>
          </button>
        ))}
      </div>

      <button onClick={handleNext} disabled={selected === null} className={`w-full py-3 font-bold text-sm rounded-xl transition-all ${selected !== null ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-stone-100 text-stone-400 cursor-not-allowed"}`}>
        {qIndex < questions.length - 1 ? "Next Question →" : "Submit Answers ✓"}
      </button>
    </div>
  );
}