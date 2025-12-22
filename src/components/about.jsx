import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // Correct import
import { Code2, Palette, Zap } from "lucide-react";
import PotImg from "../assets/huu2so.jpg";

export default function About() {
  return (
    <motion.section
      className="py-20 px-6 md:py-32"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left – Your Photo */}
        <div className="relative flex justify-center md:justify-end mb-12 md:mb-0">
          <div className="relative z-10 w-80 h-96 md:w-96 md:h-[500px] rounded-3xl overflow-hidden border-4 border-cyan-500/40 shadow-2xl">
            <img
              src={PotImg}
              alt="Dave – Frontend Developer & Designer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right – Text */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            About<span className="text-cyan-400">.</span>
          </h2>

          <div className="space-y-5 text-gray-300 text-lg md:text-xl leading-relaxed">
            <p>Web Developer transitioning to a full-time career in tech.</p>

            <p>
              Mastering{" "}
              <span className="text-cyan-400 font-medium">
                React, TypeScript, Next.js, Tailwind
              </span>{" "}
              and shipping production-grade apps.
            </p>

            <p>
              Designer at heart — crafting visuals, branding & motion graphics
              with Figma, After Effects and Blender.
            </p>

            <p className="text-white font-semibold text-xl">
              I don’t just code and design.
              <br />I create experiences people love.
            </p>
          </div>

          <div className="flex gap-6 pt-4">
            <Code2 className="w-9 h-9 text-cyan-400" />
            <Palette className="w-9 h-9 text-cyan-400" />
            <Zap className="w-9 h-9 text-cyan-400" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
