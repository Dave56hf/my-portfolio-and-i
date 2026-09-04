import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="site-section">
      <div className="site-container" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56 }} id="about-grid">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">About</span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3.6vw, 36px)", marginTop: 10, marginBottom: 18 }}>
            Building at the edge of design and Web3.
          </h2>
          <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.7, maxWidth: 420 }}>
            I'm a finance student and self-taught developer based in Port
            Harcourt, Nigeria. I got into Web3 about five years ago, and it's
            shaped how I think about products since. I care about
            interfaces that are fast, clear, and don't waste anyone's time.
            When I'm not building client work, I'm usually shipping features
            on my own projects.
          </p>
        </motion.div>

        <div>
          {experience.map((item, index) => (
            <motion.div
              key={item.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: 20,
                padding: "22px 0",
                borderTop: index === 0 ? "1px solid var(--line)" : "1px solid var(--line)",
              }}
            >
              <span className="muted" style={{ fontSize: 13.5, paddingTop: 3 }}>
                {item.period}
              </span>
              <div>
                <h3 className="serif" style={{ fontSize: 18, marginBottom: 6 }}>
                  {item.title}
                </h3>
                <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6 }}>
                  {item.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          #about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
