import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import CryptoPlatformHero from "../../assets/crypto-platform-hero.jpg";
import TravelAgencyHero from "../../assets/travel-agency-hero.jpg";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const thumbImages = {
  questxs: CryptoPlatformHero,
  "crypto-platform": CryptoPlatformHero,
  "travel-agency": TravelAgencyHero,
};

function Thumb({ id, title }) {
  const img = thumbImages[id];

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: 6,
        border: "1px solid var(--line)",
        background: "var(--paper-alt)",
        overflow: "hidden",
      }}
    >
      {img ? (
        <img
          src={img}
          alt={`${title} preview`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="muted" style={{ fontSize: 13, padding: "0 20px", textAlign: "center" }}>
            {title}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="site-section">
      <div className="site-container">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 48, maxWidth: 560 }}
        >
          <span className="eyebrow">Selected work</span>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3.6vw, 36px)", marginTop: 10 }}>
            A few things I've built and designed.
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              className="work-row focus-ring"
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: 32,
                alignItems: "center",
                padding: "32px 0",
                borderTop: index === 0 ? "none" : "1px solid var(--line)",
                textDecoration: "none",
                color: "var(--ink)",
              }}
            >
              <Thumb id={project.thumb} title={project.title} />

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="muted"
                    style={{ fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    {project.tag}
                  </span>
                  <span className="muted" style={{ fontSize: 12.5 }}>
                    · {project.year}
                  </span>
                </div>
                <h3 className="serif" style={{ fontSize: 23, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  {project.title}
                  <ArrowUpRight size={18} className="row-arrow" aria-hidden />
                </h3>
                <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.6, maxWidth: 560, marginBottom: 14 }}>
                  {project.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: 12.5,
                        padding: "4px 10px",
                        borderRadius: 3,
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .work-row .row-arrow { transition: transform 0.2s ease; opacity: 0.5; }
        .work-row:hover .row-arrow { transform: translate(3px, -3px); opacity: 1; color: var(--accent); }
        @media (max-width: 640px) {
          .work-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
