import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from './components/Contact'
import BackgroundAnimation from './components/BackgroundAnimation'
import Aos from "aos";
import "aos/dist/aos.css"


const App = () => {
 useEffect(() => {
  Aos.init();
  
 }, [])
 
  return (
    <>
      <BackgroundAnimation />
      <Navbar />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Home />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

export default App;
