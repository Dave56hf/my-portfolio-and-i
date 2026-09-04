import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="site-section" style={{ background: "var(--paper-alt)" }}>
      <div className="site-container">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 44, maxWidth: 560 }}
        >
          <span className="eyebrow">What I do</span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3.6vw, 36px)", marginTop: 10 }}>
            Design and development, under one roof.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0",
            border: "1px solid var(--line)",
            borderRadius: 6,
            overflow: "hidden",
            background: "var(--paper)",
          }}
          className="skills-grid"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
              style={{
                padding: "28px 28px",
                borderRight: index % 2 === 0 ? "1px solid var(--line)" : "none",
                borderBottom: index < skills.length - 2 ? "1px solid var(--line)" : "none",
              }}
            >
              <h3 className="serif" style={{ fontSize: 19, marginBottom: 10 }}>
                {skill.title}
              </h3>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6 }}>
                {skill.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skills-grid > div { border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
