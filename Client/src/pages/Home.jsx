import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import { ContainerScroll } from "../animations/ContainerScroll.jsx";
import OnBoardingForm from "../components/OnBoardingForm.jsx";
import { HeroScroll } from "../animations/HeroScroll.jsx";

function Home() {
    
    return (
        <>
        <Header />
    
         <HeroSection />
         
        <ContainerScroll children={<HeroSection mr="" ml=""/>}/>
            <HeroScroll />
          <OnBoardingForm />
      
        </>
    )
};

export default Home;