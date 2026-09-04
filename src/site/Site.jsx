import React from "react";
import "./site.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Site() {
  return (
    <div className="site">
      <Header />
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
