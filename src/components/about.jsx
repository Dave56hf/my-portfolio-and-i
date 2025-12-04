import React from "react";
import { Code2, Palette, Zap } from "lucide-react";
import PotImg from "../assets/huu2so.jpg";

export default function About() {
  return (
    <section className="py-20 px-6 md:py-32 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-25 justify-between items-center">
        {/* Left Side - Gradient Block */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative z-10 w-70 h-80 md:w-66 md:h-full lg:w-80 rounded-3xl overflow-hidden border-4 border-cyan-500/50 ">
            <img
              src={PotImg}
              alt="Dave - Frontend Developer & Designer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            About<span className="text-cyan-400">.</span>
          </h2>

          <div className="space-y-5 text-gray-300 text-lg md:text-xl leading-relaxed">
            <p>Web Developer transitioning to a career in technology.</p>
            <p>
              Currently, my focus is on learning and mastering modern web
              development with{" "}
              <span className="text-cyan-400 font-medium">
                React, TypeScript, Tailwind CSS
              </span>{" "}
              and <span className="text-cyan-400 font-medium">Next.js</span>.
            </p>
            <p>
              As a designer at heart, I also create stunning visuals and motion
              graphics using Figma, After Effects and Blender.
            </p>
            <p className="text-white font-medium">
              I build things that look good and work even better.
            </p>
          </div>

          {/* Optional mini icons */}
          <div className="flex gap-6 pt-6">
            <Code2 className="w-8 h-8 text-cyan-400" />
            <Palette className="w-8 h-8 text-cyan-400" />
            <Zap className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
