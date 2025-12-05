import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Code,
  Wrench,
  Palette,
  Server,
} from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    icon: <Code className="w-6 h-6" />,
    skills: [
      "React",
      "JavaScript",
      "NextJS",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Design",
    icon: <Palette className="w-6 h-6" />,
    skills: ["Figma", "Photoshop"],
  },
  {
    category: "Tools",
    icon: <Wrench className="w-6 h-6" />,
    skills: ["Git", "GitHub", "VS Code", "Vercel", "AWS"],
  },
];

export default function Skills() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <motion.section
      className="py-20 px-6 md:py-32"
      initial={{ x: 50 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills<span className="text-cyan-400">.</span>
        </motion.h2>

        <div className="space-y-6">
          {skillsData.map((item, index) => (
            <motion.div
              key={item.category}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(item.category)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-cyan-400">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">
                    {item.category}
                  </h3>
                </div>
                {expanded[item.category] ? (
                  <ChevronDown className="w-6 h-6 text-cyan-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-cyan-400" />
                )}
              </div>

              {expanded[item.category] && (
                <motion.div
                  className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="bg-cyan-500/10 rounded-lg p-3 text-center text-cyan-300 font-medium hover:bg-cyan-500/20 transition-colors"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
