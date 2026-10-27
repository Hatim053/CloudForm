import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import { TimeLine } from "../animations/TimeLine.jsx";
import AnalyticsSection from "@/components/AnalyticsSection.jsx";
import PartialSubmissionsSection from "@/components/PartialSubmissionsSection.jsx";
import Footer from "@/components/Footer.jsx";
import Accordion from "@/components/Accordian.jsx";
import IncludedGrid from "@/components/IncludedGrid.jsx";
import FreeSlider from "@/components/FreeSlider.jsx";
import Reveal from "@/components/Reveal.jsx";

function Home() {
    
    return (
        <>
        <Header />
         <HeroSection />
         <TimeLine />
          <AnalyticsSection/>
          <PartialSubmissionsSection/>
          <IncludedGrid/>
                          <section id="sliders" className="px-6 py-12 sm:py-16 lg:px-10 bg-cf-bg" aria-labelledby="sliders-title">
                                <div className="mx-auto max-w-7xl">
                                  <div className="max-w-2xl">
                                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cf-forest">Go on, push it</p>
                                    <h2
                                      id="sliders-title"
                                      className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-cf-ink sm:text-5xl"
                                    >
                                      Drag it.
                                      <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
                                        Still free.
                                      </span>
                                    </h2>
                                  </div>
                        
                                  <div className="mt-10 grid gap-6 lg:grid-cols-2">
                                    <Reveal>
                                      <FreeSlider
                                        label="How many forms will you create?"
                                        unit="forms"
                                        min={1}
                                        max={1000}
                                        initial={100}
                                        milestones={[10, 100, 150, 250, 500, 1000]}
                                        currency={"$"}
                                      />
                                    </Reveal>
                                    <Reveal delay={120}>
                                      <FreeSlider
                                        label="How many responses will you collect?"
                                        unit="responses"
                                        min={10}
                                        max={10000}
                                        step={10}
                                        initial={1000}
                                        milestones={[100, 1000, 2500, 5000, 10000]}
                                        currency={"$"}
                                      />
                                    </Reveal>
                                  </div>
                                </div>
                              </section>
          <Accordion/>
         <Footer />
         </>
    )
};

export default Home;