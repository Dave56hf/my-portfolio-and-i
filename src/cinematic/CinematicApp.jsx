import React, { useLayoutEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cinematic.css";

import SystemScene from "./three/SystemScene";
import TextType from "../components/TextType";
import PortraitImg from "../assets/huu2so.jpg";
import NftImg from "../assets/profiles.png";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import {
  ArrowUpRight,
  Code2,
  Gauge,
  Github,
  Globe2,
  Layers3,
  Mail,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

const navItems = ["work", "skills", "about", "experience", "contact"];

const stats = [
  { value: "50+", label: "Interfaces shipped" },
  { value: "3+", label: "Years building" },
  { value: "4", label: "Web3 products" },
];

const skills = [
  {
    title: "Frontend Development",
    icon: Code2,
    copy: "React, TypeScript, Next.js, Tailwind, responsive systems, and crisp component architecture.",
    tools: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "Smart Contracts",
    icon: ShieldCheck,
    copy: "Solidity-aware product flows, wallet states, transaction UX, and contract integration handoffs.",
    tools: ["Solidity", "EVM", "Tx UX"],
  },
  {
    title: "Web3 Integration",
    icon: WalletCards,
    copy: "Wallet connects, token-gated experiences, on-chain data displays, and crypto app dashboards.",
    tools: ["Wallets", "APIs", "DeFi"],
  },
  {
    title: "UI Engineering",
    icon: Layers3,
    copy: "High-fidelity interfaces with motion, accessibility, clean spacing, and visual systems.",
    tools: ["Figma", "Motion", "Design systems"],
  },
  {
    title: "Performance Optimization",
    icon: Gauge,
    copy: "Fast loading, polished interactions, careful bundles, and interfaces that feel immediate.",
    tools: ["LCP", "Vite", "Edge"],
  },
  {
    title: "NFT Development",
    icon: Sparkles,
    copy: "Collection pages, mint flows, metadata presentation, rarity surfaces, and community launches.",
    tools: ["NFTs", "Mint UI", "Metadata"],
  },
];

const projects = [
  {
    title: "Quest",
    eyebrow: "Crypto market intelligence platform",
    desc: "A crypto operating system built to replace fragmented multi-tool research workflows unified research, an Opportunity Score engine, and an Early Warning System for retail traders.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase"],
    href: "https://quest-xs.vercel.app",
    visual: "trading",
  },
  {
    title: "Notan AI",
    eyebrow: "Video generation landing page",
    desc: "A cinematic AI product launch page with motion, 3D presence, and sharp conversion sections.",
    stack: ["React", "Tailwind", "Three.js"],
    href: "https://github.com/Dave56hf/Notan-AI-PROJECT",
    visual: "dashboard",
  },
  {
    title: "Reo Wallet",
    eyebrow: "Wallet brand and interface",
    desc: "A Web3 wallet presentation with clean onboarding, product storytelling, and polished interface states.",
    stack: ["React", "CSS", "JavaScript"],
    href: "https://github.com/Dave56hf/Reo",
    visual: "wallet",
  },
];

const timeline = [
  {
    period: "Now",
    title: "Independent Web3 and Frontend Engineer",
    copy: "Building premium dashboards, launch pages, wallet flows, and crypto product interfaces for fast-moving teams.",
  },
  {
    period: "Orixa",
    title: "Founder and Product Builder",
    copy: "Founded and built a full-stack AI crypto app with React, Node, and Tailwind, owning the experience from idea to shipped product.",
  },
  {
    period: "Client Work",
    title: "Frontend Developer and Visual Designer",
    copy: "Delivered landing pages, dashboards, brand systems, and motion visuals for startups, X clients, and global communities.",
  },
];

const achievements = [
  { value: "50+", label: "Landing pages, dashboards, brands, and motion systems delivered" },
  { value: "1k+", label: "Users reached through shipped crypto and product experiences" },
  { value: "4", label: "Product verticals: AI, wallet, trading, analytics" },
  { value: "24/7", label: "Builder mindset across performance, polish, and iteration" },
];

const testimonials = [
  {
    quote: "Dave brings the rare mix of visual taste and engineering execution. The interface feels expensive and still loads fast.",
    name: "Startup Founder",
    role: "Web3 product client",
  },
  {
    quote: "He understands product rhythm quickly: what needs to be obvious, what needs motion, and what needs to stay simple.",
    name: "Creative Lead",
    role: "Launch collaboration",
  },
  {
    quote: "The handoff was clean, the details were cared for, and the final site looked like a serious product from day one.",
    name: "Community Builder",
    role: "Dashboard project",
  },
];

const socialLinks = [
  { label: "Email", href: "mailto:west15455@gmail.com", icon: BiLogoGmail },
  { label: "GitHub", href: "https://github.com/Dave56hf", icon: FaGithub },
  { label: "X", href: "https://x.com/Dave_QuestXS", icon: FaXTwitter },
];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <motion.div
      className="sectionIntro"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  );
}

function MagneticButton({ href, children, variant = "primary" }) {
  const btnRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (event) => {
    if (reduceMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  };

  const handleLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={btnRef}
      className={`magneticBtn magneticBtn--${variant}`}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden />
    </a>
  );
}

function TradingMockup() {
  return (
    <div className="tradingMock visualPanel" aria-label="Trading interface mockup">
      <div className="mockTop">
        <span>ORX / USDC</span>
        <strong>+18.42%</strong>
      </div>
      <div className="chartBars">
        {[32, 62, 46, 78, 54, 88, 66, 96, 72, 104, 84, 118].map((height, index) => (
          <span style={{ height }} key={`${height}-${index}`} />
        ))}
      </div>
      <div className="orderBook">
        <span>Bid 0.8421</span>
        <span>Ask 0.8490</span>
        <span>TVL $2.4M</span>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="dashboardMock visualPanel" aria-label="Dashboard screenshot mockup">
      <div className="mockTop">
        <span>Generation Console</span>
        <strong>Live</strong>
      </div>
      <div className="dashGrid">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="dashRows">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function WalletMockup() {
  return (
    <div className="walletMock visualPanel" aria-label="Web3 wallet mockup">
      <div className="walletCard">
        <span>Balance</span>
        <strong>12.84 ETH</strong>
      </div>
      <div className="walletActions">
        <span>Send</span>
        <span>Swap</span>
        <span>Stake</span>
      </div>
      <div className="tokenList">
        <span>USDC</span>
        <span>ORX</span>
        <span>MATIC</span>
      </div>
    </div>
  );
}

function CaseStudyMockup() {
  return (
    <div className="caseMock visualPanel" aria-label="Project case study mockup">
      <div className="caseLine" />
      <div className="caseSplit">
        <span />
        <span />
      </div>
      <div className="caseMetrics">
        <strong>Alerts</strong>
        <strong>Portfolio</strong>
        <strong>Signals</strong>
      </div>
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === "trading") return <TradingMockup />;
  if (type === "wallet") return <WalletMockup />;
  if (type === "case") return <CaseStudyMockup />;
  return <DashboardMockup />;
}

export default function CinematicApp() {
  const rootRef = useRef(null);
  const pageProgressRef = useRef(0);
  const reduceMotion = useReducedMotion();

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
      <SystemScene progressRef={reduceMotion ? undefined : pageProgressRef} className="cine-bgFixed" />

      <header className="topbar">
        <a className="brandMark" href="#top" aria-label="Dave home">
          <span>Dave</span>
          <strong>Web3 Frontend Engineer</strong>
        </a>
        <nav className="topbarRight" aria-label="Sections">
          {navItems.map((item) => (
            <a className="topbarLink" href={`#${item}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <aside className="dock" aria-label="Quick links">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              className="dockBtn"
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
              aria-label={link.label}
              key={link.label}
            >
              <Icon />
            </a>
          );
        })}
      </aside>

      <main id="top" className="cineMain">
        <section className="heroSection">
          <motion.div
            className="heroCopy"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span className="eyebrow heroEyebrow" variants={reveal}>
              Premium Web3 interfaces, engineered end-to-end
            </motion.span>
            <motion.h1 className="heroTitle" variants={reveal}>
              We builds digital products for the on-chain era.
            </motion.h1>
            <motion.div className="heroTyped" variants={reveal}>
              <TextType
                text={[
                  "Frontend engineer for Web3 founders.",
                  "Crypto dashboards with luxury-grade UI.",
                  "React systems that feel fast and expensive.",
                ]}
                typingSpeed={42}
                pauseDuration={1300}
                deletingSpeed={22}
                cursorCharacter="_"
              />
            </motion.div>
            <motion.p className="heroLead" variants={reveal}>
              I design and develop polished product experiences across React,
              TypeScript, Tailwind, Node, Web3 integrations, dashboards, wallet
              flows, AI tools, and NFT launches.
            </motion.p>
            <motion.div className="heroActions" variants={reveal}>
              <MagneticButton href="mailto:west15455@gmail.com">Start a project</MagneticButton>
              <MagneticButton href="#work" variant="ghost">
                View case studies
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="heroVisual"
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <div className="portraitFrame">
              <img src={PortraitImg} alt="Dave illustrated developer portrait" />
            </div>
            <div className="floatingStat statOne">
              <span>Revenue-minded UI</span>
              <strong>Launch ready</strong>
            </div>
            <div className="floatingStat statTwo">
              <span>Stack</span>
              <strong>React + Web3</strong>
            </div>
            <div className="miniChain" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.div
            className="heroStats"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {stats.map((item) => (
              <motion.div className="metricCard" variants={reveal} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="about" className="cineSection aboutSection">
          <SectionIntro
            eyebrow="About Dave"
            title="Developer discipline with a creative studio finish."
            copy="A Web Developer transitioning into a full-time tech career, mastering React, TypeScript, Next.js, Tailwind, and production-grade app delivery."
          />
          <motion.div
            className="aboutGrid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <motion.div className="imageStoryCard" variants={reveal}>
              <img src={NftImg} alt="Dave Web3 identity artwork" />
              <div className="imageCaption">
                <span>NFT collection language</span>
                <strong>Visual identity for on-chain products</strong>
              </div>
            </motion.div>
            <motion.div className="storyPanel" variants={reveal}>
              <p>
                I bridge product design taste with front-end execution: clean
                code, fast interfaces, refined motion, and experiences that
                make crypto products feel trustworthy.
              </p>
              <p>
                Designer at heart, I craft visuals, branding, and motion with
                Figma, After Effects, and Blender, then turn that thinking into
                React interfaces people can actually use.
              </p>
              <div className="highlightGrid">
                <span>Performance-first builds</span>
                <span>Wallet and transaction UX</span>
                <span>Dashboard storytelling</span>
                <span>Case-study level polish</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="skills" className="cineSection">
          <SectionIntro
            eyebrow="Capabilities"
            title="A bento system for shipping serious Web3 products."
            copy="Skills are presented as product capabilities because premium teams hire outcomes, not badges."
          />
          <motion.div
            className="skillBento"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.article
                  className={`skillCard skillCard--${index}`}
                  variants={reveal}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  key={skill.title}
                >
                  <Icon className="skillIcon" aria-hidden />
                  <h3>{skill.title}</h3>
                  <p>{skill.copy}</p>
                  <div className="toolRow">
                    {skill.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section id="work" className="cineSection projectsSection">
          <SectionIntro
            eyebrow="Selected Work"
            title="Image-first case studies for crypto, AI, wallet, and analytics products."
            copy="The work is framed like product evidence: dashboard screenshots, Web3 mockups, trading interfaces, NFT visuals, 3D blockchain energy, and case-study outcomes."
          />
          <div className="projectStack">
            {projects.map((project, index) => {
              const isExternal = /^https?:\/\//.test(project.href);
              return (
                <motion.a
                  className={`projectShowcase projectShowcase--${index}`}
                  href={project.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  initial={{ opacity: 0, y: 56 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -10 }}
                  key={project.title}
                >
                  <ProjectVisual type={project.visual} />
                  <div className="projectCopy">
                    <span className="eyebrow">{project.eyebrow}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="stackRow">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="projectArrow" aria-hidden />
                </motion.a>
              );
            })}
          </div>
        </section>

        <section id="experience" className="cineSection experienceSection">
          <SectionIntro
            eyebrow="Experience"
            title="A modern progression from visual craft to shipped products."
            copy="3+ years as a Frontend Developer and Graphic Designer, building pixel-perfect, high-performance products."
          />
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.article
                className="timelineItem"
                initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                key={item.title}
              >
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="cineSection achievementSection">
          <SectionIntro
            eyebrow="Proof"
            title="Built for founders who care about numbers and feeling."
          />
          <motion.div
            className="achievementGrid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            {achievements.map((item) => (
              <motion.div className="achievementCard" variants={reveal} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="cineSection testimonialSection">
          <SectionIntro
            eyebrow="Testimonials"
            title="Clean execution, premium taste, and product thinking."
          />
          <motion.div
            className="testimonialGrid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            {testimonials.map((item) => (
              <motion.article className="testimonialCard" variants={reveal} key={item.name}>
                <p>"{item.quote}"</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="cineSection contactSection">
          <motion.div
            className="contactShell"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contactCopy">
              <span className="eyebrow">Contact</span>
              <h2>Let’s build the interface your Web3 product deserves.</h2>
              <p>
                Send the brief, roadmap, or rough idea. I can help turn it into
                a fast, cinematic, conversion-ready product experience.
              </p>
              <div className="contactLinks">
                <a href="mailto:west15455@gmail.com">
                  <Mail size={18} aria-hidden />
                  west15455@gmail.com
                </a>
                <a href="https://github.com/Dave56hf" target="_blank" rel="noreferrer noopener">
                  <Github size={18} aria-hidden />
                  github.com/Dave56hf
                </a>
                <a href="https://wa.me/qr/YVJCNRNTMY24H1" target="_blank" rel="noreferrer noopener">
                  <Globe2 size={18} aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>
            <form className="contactForm" action="mailto:west15455@gmail.com" method="post">
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@company.com" />
              </label>
              <label>
                Project
                <textarea name="message" placeholder="Tell me what you are building" rows="5" />
              </label>
              <button type="submit">
                Send inquiry
                <ArrowUpRight size={18} aria-hidden />
              </button>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
