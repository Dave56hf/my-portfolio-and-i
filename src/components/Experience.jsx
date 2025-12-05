import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <motion.section
      className="py-2 px-6 sm:mx-3 "
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 mb-10">
        <Briefcase className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Experience
        </h2>
      </div>

      <div className="space-y-7 text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
        <p>
          3+ years as a{" "}
          <span className="text-cyan-400 font-semibold">
            Frontend Developer
          </span>{" "}
          and{" "}
          <span className="text-cyan-400 font-semibold">Graphic Designer</span>,
          shipping pixel-perfect, high-performance products.
        </p>

        <p>
          Founded & built{" "}
          <span className="text-cyan-300 font-medium">Orixa</span> — a
          full-stack AI crypto app (React + Node + Tailwind) used by thousands.
        </p>

        <p>
          Worked with startups like{" "}
          <span className="text-cyan-300 font-medium">Quossi</span> and
          delivered 50+ landing pages, dashboards, brands & motion designs for
          clients from X and global communities.
        </p>

        <p className="font-medium text-white">
          Obsessed with clean code, performance, and delightful UX. Ready to
          level up big things with you.
        </p>
      </div>
    </motion.section>
  );
}
