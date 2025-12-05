import React from "react";
import LogoLoop from "./LogoLoop";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import TextType from "./TextType";

export default function hero() {
  const techLogos = [
    {
      node: <SiReact className="text-cyan-600 " />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiNextdotjs className="text-white " />,
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: <SiTypescript className="text-cyan-500 " />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss className="text-cyan-400 " />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];
  return (
    <motion.div
      className="px-6 pt-12 pb-20 md:pt-20 lg:pt-24 xl:pt-32 text-center md:text-left "
      initial={{ x: 50 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none">
        Hi, I'm{" "}
        <span className="inline-flex items-baseline sm:items-baseline ">
          Dave
          <span className="text-cyan-400">.</span>
        </span>
        <br />
      </h1>
      <span className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">
        <TextType
          text={["Frontend Developer", "Graphics Designer", "Web3 Enthusiast"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </span>

      <div className="my-10">
        <a
          href="mailto:west15455@gmail.com"
          className="inline-block px-8 py-4 bg-cyan-700 hover:bg-cyan-600 transition-all duration-300 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          rel="noopener noreferrer"
          target="_blank"
        >
          Hire Me
        </a>
      </div>

      <div
        style={{ height: "100px", position: "relative", overflow: "hidden" }}
        className="mt-4 sm:text-2xl"
      >
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={30}
          gap={37}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Technology partners"
        />
      </div>
    </motion.div>
  );
}
