"use client";

import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";
import What_We_Provide from "./component/What_We_Provide";
import Footer from "./component/Footer";
// import PricingPage from "./component/Pricing";

export default function Home() {
  return (
    <div>
       <NavBar/>
      <HeroSection />
      <What_We_Provide />
      <Footer />
     
     
    </div>
  );
}
