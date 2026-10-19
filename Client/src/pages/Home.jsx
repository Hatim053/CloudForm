import Header from "../Components/Header.jsx";
import HeroSection from "../Components/HeroSection.jsx";
import { ContainerScroll } from "../animations/ContainerScroll.jsx";
import OnBoardingForm from "../Components/OnBoardingForm.jsx";
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