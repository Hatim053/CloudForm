import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import { TimeLine } from "../animations/TimeLine.jsx";
import { HeroScroll } from "../animations/HeroScroll.jsx";
import AnalyticsSection from "@/components/AnalyticsSection.jsx";
import PartialSubmissionsSection from "@/components/PartialSubmissionsSection.jsx";
import SectionLink from "@/components/SectionLink.jsx";

function Home() {
    
    return (
        <>
        <Header />
     
         <HeroSection />
         <TimeLine />
        {/* <ContainerScroll children={<HeroSection mr="" ml=""/>}/> */}
            <HeroScroll />
          {/* <OnBoardingForm /> */}
          <AnalyticsSection/>
          <PartialSubmissionsSection/>
          {/* <SectionLink/> */}
        </>
    )
};

export default Home;