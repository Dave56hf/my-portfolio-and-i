import React from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import Experience from "../components/Experience";
import Contact from "../components/contact";
import About from "../components/about";
import Footer from "../components/footer";
import Skills from "../components/Skills";

export default function ClassicApp() {
  return (
    <div className="background">
      <Header />
      <Hero />
      <Experience />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

