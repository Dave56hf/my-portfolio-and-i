import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Experience from "./components/Experience";
import Contact from "./components/contact";
import About from "./components/about";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="background">
      <Header />
      <Hero />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
