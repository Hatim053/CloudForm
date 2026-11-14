import { FlipWords } from "../animations/FlipWords.jsx";
import HeroDemo from "./HeroDemo.jsx";

const FLIP_WORDS = ["connect", "matter", "convert", "get results", "influence"];

function HeroSection({ ml = "ml-[2.5vw]", mr = "mr-[2.5vw]", mt = "mt-6 sm:mt-8" }) {
    return (
        <header className={`${ml} ${mr} ${mt} rounded-2xl border border-[#dfe8e1] bg-[#f4f7f4] font-dm`}>
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
                {/* Copy */}
                <div className="text-center lg:text-left">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2f4d3a]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#4b6455]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        see what's new
                    </div>

                    <h1 className="font-syne mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#2f4d3a] sm:text-5xl lg:text-6xl">
                        Build forms that<br />
                        <span>
                            actually {<FlipWords words={FLIP_WORDS} />}
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#4b6455] sm:text-lg lg:mx-0">
                        The modern form builder for teams who care about design and results. No code, no limits.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                        <button className="w-full rounded-xl bg-[#2f4d3a] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#3a5c46] sm:w-auto">
                            Start building free →
                        </button>
                        <button className="w-full rounded-xl border border-[#2f4d3a]/25 bg-white px-8 py-3.5 text-sm font-semibold text-[#2f4d3a] transition-colors hover:border-[#2f4d3a]/50 sm:w-auto">
                            View live demos
                        </button>
                    </div>
                </div>

                {/* Animated product demo */}
                <div className="mx-auto w-full max-w-xl">
                    <HeroDemo />
                </div>
            </div>
        </header>
    );
}

export default HeroSection;