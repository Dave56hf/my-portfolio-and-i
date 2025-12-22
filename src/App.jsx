import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Send } from "lucide-react";
import StoryCanvas from "./components/StoryCanvas";
import ChapterBlock from "./components/ChapterBlock";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const sceneState = useRef({
    orbit: 0,
    lift: 0.4,
    twist: 0,
    pulse: 0.25,
    hue: 0,
    parallaxX: 0,
    parallaxY: 0,
  });

  const appRef = useRef(null);
  const chapterRefs = useRef([]);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = useMemo(
    () => [
      {
        id: "chapter_intro",
        kicker: "Prologue",
        title: "You are entering a personal story, not a résumé.",
        body:
          "A quiet room. A suspended sculpture breathing with the beat of your cursor. The film grain in the air says this space was handcrafted, not templated.",
        note: "Mouse movement bends the light. Scroll to begin the passage.",
        scene: { orbit: 0.4, lift: 0.5, twist: -0.3, pulse: 0.35, hue: 0.1 },
      },
      {
        id: "chapter_identity",
        kicker: "Identity",
        title: "Journey shaped by curiosity and a refusal to copy-paste paths.",
        body:
          "I grew up dismantling radios, then interfaces. Each rebuild taught me motion with meaning: cameras glide because stories breathe, not because trends demand it.",
        note: "Pinned moment: camera drifts closer as forms morph.",
        scene: { orbit: 1.2, lift: 0.8, twist: 0.4, pulse: 0.45, hue: 0.32 },
      },
      {
        id: "chapter_skills",
        kicker: "Craft",
        title: "Skills are instruments—React, Three.js, GSAP, TypeScript—played to score product moments.",
        body:
          "Instead of buzzword dumping, I choreograph interfaces. Scroll triggers guide timelines, shaders stay lean, and performance budgets are characters in the script.",
        note: "Particles gather as tools orbit, not in a list but in motion.",
        scene: { orbit: 1.9, lift: 0.35, twist: -0.25, pulse: 0.55, hue: 0.58 },
      },
      {
        id: "chapter_projects",
        kicker: "Projects",
        title: "Every project is a scene that solved a real problem.",
        body:
          "I’ve shipped cinematic dashboards, reactive education tools, and live 3D explainers. Each one built with constraints: low draw calls, compressed assets, clear narrative arcs.",
        note: "The sculpture splits into tracks—each a project lane sliding past you.",
        scene: { orbit: 2.6, lift: 0.6, twist: 0.1, pulse: 0.65, hue: 0.75 },
      },
      {
        id: "chapter_philosophy",
        kicker: "Philosophy",
        title: "I build with intention, not automation. Confidence through restraint.",
        body:
          "I avoid AI-looking layouts, overload, and random animation. Camera motion matters more than object spam; light is emotional, not decorative. Silence in interfaces is as important as spectacle.",
        note: "Scene simplifies. Colors narrow to a calm, deliberate palette.",
        scene: { orbit: 3.4, lift: 0.2, twist: -0.15, pulse: 0.2, hue: -0.05 },
      },
      {
        id: "chapter_contact",
        kicker: "Contact",
        title: "Let’s build something meaningful together.",
        body:
          "For founders, senior engineers, and design-led teams: I bring cinematic motion, disciplined Three.js pipelines, and GSAP-driven storytelling to ship memorable products.",
        note: "Outro. The sculpture resolves and light steadies—clarity.",
        scene: { orbit: 4.1, lift: 0, twist: 0.05, pulse: 0.3, hue: 0.12 },
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 1.2 },
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: ".canvas-column",
          anticipatePin: 1,
        },
      });

      chapters.forEach((chapter, index) => {
        timeline.to(sceneState.current, { ...chapter.scene }, index === 0 ? 0 : ">-0.05");

        ScrollTrigger.create({
          trigger: chapterRefs.current[index],
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        });
      });
    }, appRef);

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      sceneState.current.parallaxX = (event.clientX / innerWidth - 0.5) * 1.5;
      sceneState.current.parallaxY = (event.clientY / innerHeight - 0.5) * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [chapters]);

  return (
    <div ref={appRef} className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="canvas-column relative mb-12 lg:mb-0">
          <div className="sticky top-10 h-[85vh] rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 overflow-hidden shadow-[0_30px_120px_-60px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.1),transparent_30%)]" />
            <StoryCanvas narrativeState={sceneState} activeChapter={activeChapter} />
            <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between backdrop-blur-md bg-black/20 text-xs uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3 text-cyan-200/80">
                <Sparkles className="w-4 h-4" />
                <span>Cinematic / Scroll-driven / Three.js</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-cyan-200/70" />
            </div>
          </div>
        </div>

        <main className="space-y-16">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Dave Quest — Frontend & Motion Engineer</p>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-slate-50">
              A handcrafted, story-driven portfolio built with React, Three.js, and GSAP.
            </h1>
            <p className="text-base text-slate-300/90 max-w-2xl">
              Scroll to move the camera, morph the sculpture, and read the chapters. Every motion is deliberate—no templates, no AI sameness.
            </p>
          </header>

          {chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              id={chapter.id}
              ref={(el) => (chapterRefs.current[index] = el)}
            >
              <ChapterBlock
                kicker={chapter.kicker}
                title={chapter.title}
                body={chapter.body}
                note={chapter.note}
                active={activeChapter === index}
              />
            </section>
          ))}

          <section className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 px-7 py-8 shadow-[0_20px_80px_-40px_rgba(34,211,238,0.6)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Open for collaborations</p>
                <h3 className="text-2xl font-semibold text-slate-50 mt-1">Tell me about the story you want to ship.</h3>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 text-slate-950 px-4 py-2 hover:-translate-y-0.5 transition duration-200 shadow-lg"
                  href="mailto:west15455@gmail.com"
                >
                  <Send className="w-4 h-4" /> Email
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-cyan-100 hover:border-cyan-200/80 transition"
                  href="https://x.com/Dave_QuestXS"
                  target="_blank"
                  rel="noreferrer"
                >
                  X / Twitter
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-cyan-100 hover:border-cyan-200/80 transition"
                  href="https://github.com/Dave56hf"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          <footer className="text-sm text-slate-400/80 pt-6 pb-2">© 2025 Dave. Crafted with React, Three.js, GSAP, and intention.</footer>
        </main>
      </div>
    </div>
  );
}
