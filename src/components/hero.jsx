import React from "react";
import LogoLoop from "./LogoLoop";
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
    <div className="my-1 mx-5 pt-8 md:pt-16  lg:pt-15 ">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl mb-5 xl:text-8xl font-bold text-white leading-tight">
        Hi, I'm{" "}
        <span className="inline-flex items-baseline sm:items-baseline ">
          Dave
          <span className="text-cyan-400">.</span>
        </span>
        <br />
      </h1>
      <span className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl mb-5 xl:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-500">
        <TextType
          text={["Frontend Developer", "Graphics Designer", "Web3 Enthusiast"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </span>

      <div>
        <button className="px-6 py-2 my-7 bg-cyan-700 rounded-full font-bold text-white">
          {" "}
          Hire me
        </button>
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
    </div>
  );
}
