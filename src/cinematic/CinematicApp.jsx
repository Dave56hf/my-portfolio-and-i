import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cinematic.css";

import SystemScene from "./three/SystemScene";
import SectionHeading from "./ui/SectionHeading";
import ProjectGrid from "./ui/ProjectGrid";
import SkillGrid from "./ui/SkillGrid";
import Terminal, { TerminalLine, TerminalRule } from "./ui/Terminal";
import HackerTerminal from "./ui/HackerTerminal";
import TextType from "../components/TextType";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CinematicApp() {
  const rootRef = useRef(null);
  const pageProgressRef = useRef(0);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          pageProgressRef.current = self.progress;
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="cinematic-root cinematic-background">
      <SystemScene
        progressRef={prefersReducedMotion() ? undefined : pageProgressRef}
        className="cine-bgFixed"
      />

      <div className="topbar">
        <div className="topbarLeft">
          <span className="sigil">::</span> dave@portfolio{" "}
          <span className="dim">/ cinematic</span>
        </div>
        <nav className="topbarRight" aria-label="Sections">
          <a className="topbarLink" href="#projects">
            projects
          </a>
          <a className="topbarLink" href="#skills">
            skills
          </a>
          <a className="topbarLink" href="#about">
            about
          </a>
          <a className="topbarLink" href="#contact">
            contact
          </a>
        </nav>
      </div>

      <aside className="dock" aria-label="Quick links">
        <a className="dockBtn" href="mailto:west15455@gmail.com" aria-label="Email">
        <BiLogoGmail />
        </a>
        <a
          className="dockBtn"
          href="https://github.com/Dave56hf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          className="dockBtn"
          href="https://x.com/Dave_QuestXS"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="X"
        >
          <FaXTwitter />
        </a>
      </aside>

      <main className="cineMain">
        <section id="boot" className="cineSection cineHero">
          <div className="heroGrid">
            <div className="heroLeft">
              <div className="heroKicker">$ boot</div>
              <h1 className="heroTitle">
                Hi, I'm Dave.
                <br />
                <span className="heroTitleDim">frontend developer</span>
              </h1>
              <div className="heroTyped">
                <span className="heroPrompt">$</span>{" "}
                <TextType
                  text={["performance-first interfaces", "latency-aware UI", "built under constraints"]}
                  typingSpeed={55}
                  pauseDuration={1100}
                  deletingSpeed={25}
                  cursorCharacter="█"
                />
              </div>

              <Terminal cmd="cat ./status.txt">
                <TerminalLine>online</TerminalLine>
                <TerminalLine dim>availability: active</TerminalLine>
                <TerminalRule />
                <TerminalLine dim>input: scroll</TerminalLine>
              </Terminal>
            </div>

            <div className="heroSide">
              <HackerTerminal reducedMotion={prefersReducedMotion()} />
            </div>
          </div>
        </section>

        <section id="projects" className="cineSection">
          <SectionHeading right="(4)">
            <span className="hash">#</span>projects
          </SectionHeading>
          <ProjectGrid />
        </section>

        <section id="skills" className="cineSection">
          <SectionHeading>
            <span className="hash">#</span>skills
          </SectionHeading>
          <SkillGrid />
        </section>

        <section id="about" className="cineSection">
          <SectionHeading>
            <span className="hash">#</span>about<span className="dim"> --me</span>
          </SectionHeading>
          <Terminal cmd="cat ./about.md">
            <TerminalLine>builder. ships. iterates.</TerminalLine>
            <TerminalLine dim>stack: react · typescript · node</TerminalLine>
            <TerminalLine dim>tools: figma · blender</TerminalLine>
            <TerminalRule />
            <TerminalLine dim>bias toward performance and clarity</TerminalLine>
          </Terminal>
        </section>

        <section id="contact" className="cineSection">
          <SectionHeading>
            <span className="hash">#</span>contacts
          </SectionHeading>
          <Terminal cmd="exec contact">
            <TerminalLine>
              email: <a href="mailto:west15455@gmail.com">west15455@gmail.com</a>
            </TerminalLine>
            <TerminalLine>
              github:{" "}
              <a href="https://github.com/Dave56hf" target="_blank" rel="noreferrer noopener">
                github.com/Dave56hf
              </a>
            </TerminalLine>
            <TerminalLine>
              x:{" "}
              <a href="https://x.com/Dave_QuestXS" target="_blank" rel="noreferrer noopener">
                x.com/Dave_QuestXS
              </a>
            </TerminalLine>
            <TerminalLine>
              whatsapp:{" "}
              <a href="https://wa.me/qr/YVJCNRNTMY24H1" target="_blank" rel="noreferrer noopener">
                wa.me/qr/YVJCNRNTMY24H1
              </a>
            </TerminalLine>
          </Terminal>
        </section>
      </main>
    </div>
  );
}
