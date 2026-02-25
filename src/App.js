import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

const MIN_LOADING_MS = 1800;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let loadDone = document.readyState === "complete";
    let minTimeDone = false;

    const tryHide = () => {
      if (!mounted || !loadDone || !minTimeDone) return;
      setTimeout(() => {
        if (mounted) setIsLoading(false);
      }, 400);
    };

    const minTimer = setTimeout(() => {
      minTimeDone = true;
      tryHide();
    }, MIN_LOADING_MS);

    const onLoad = () => {
      loadDone = true;
      tryHide();
    };

    if (loadDone) tryHide();
    else window.addEventListener("load", onLoad);

    return () => {
      mounted = false;
      clearTimeout(minTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Events />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default App;