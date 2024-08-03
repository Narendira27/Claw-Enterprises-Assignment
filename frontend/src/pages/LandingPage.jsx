import { useState } from "react";
import {
  FeatureSection,
  FooterSection,
  HeroSection,
  Navbar,
} from "../components";
import Authentication from "../components/Authentication";

const LandingPage = () => {
  const [popup, setPopup] = useState({ open: false, page: "Login" });
  return (
    <main className="flex flex-col min-h-screen min-w-screen transition-colors  bg-white dark:bg-[#1e1e1e]">
      <Navbar setPopup={setPopup} info={"LandingPage"} />
      <HeroSection setPopup={setPopup} />
      <FeatureSection />
      <FooterSection setPopup={setPopup} />
      {popup.open ? (
        <div className="fixed w-full h-full z-50 flex flex-col justify-center items-center bg-gray-100/50">
          <Authentication popup={popup} setPopup={setPopup} />
        </div>
      ) : null}
    </main>
  );
};

export default LandingPage;
