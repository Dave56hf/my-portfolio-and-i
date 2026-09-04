import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "../data";
import CryptoPlatformHero from "../../assets/crypto-platform-hero.jpg";
import TravelAgencyHero from "../../assets/travel-agency-hero.jpg";
import JobHunterHero from "../../assets/job-hunter-hero.jpg";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const thumbImages = {
  "crypto-platform": CryptoPlatformHero,
  "travel-agency": TravelAgencyHero,
  "job-hunter": JobHunterHero,
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

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  const img = thumbImages[project.thumb];
  const detail = project.detail;

  return (
    <AnimatePresence>
      <motion.div
        className="pd-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="pd-panel"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <button className="pd-close focus-ring" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          {img && (
            <div className="pd-media">
              <img src={img} alt={`${project.title} preview`} />
            </div>
          )}

          <div className="pd-body">
            <span className="muted" style={{ fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {project.tag} · {project.year}
            </span>
            <h3 className="serif" style={{ fontSize: 26, margin: "10px 0 14px" }}>
              {project.title}
            </h3>

            {detail?.summary && (
              <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
                {detail.summary}
              </p>
            )}

            {detail?.body?.map((para, i) => (
              <p key={i} className="muted" style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 12 }}>
                {para}
              </p>
            ))}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
              {(detail?.stack || project.stack).map((item) => (
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);

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
          {projects.map((project, index) => {
            const isExternal = Boolean(project.href);
            const Tag = motion.a;
            const interactionProps = isExternal
              ? { href: project.href, target: "_blank", rel: "noreferrer noopener" }
              : {
                  href: undefined,
                  role: "button",
                  tabIndex: 0,
                  onClick: () => setActiveProject(project),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProject(project);
                    }
                  },
                };

            return (
              <Tag
                key={project.title}
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
                  cursor: "pointer",
                }}
                {...interactionProps}
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
                  {!isExternal && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 14,
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {project.linkLabel || "Read more"}
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>

      <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />

      <style>{`
        .work-row .row-arrow { transition: transform 0.2s ease; opacity: 0.5; }
        .work-row:hover .row-arrow { transform: translate(3px, -3px); opacity: 1; color: var(--accent); }
        @media (max-width: 640px) {
          .work-row { grid-template-columns: 1fr !important; }
        }

        .pd-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 20, 18, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 300;
        }
        .pd-panel {
          background: var(--paper, #fff);
          border-radius: 12px;
          max-width: 560px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
        }
        .pd-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--line);
          border-radius: 999px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
        }
        .pd-media {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .pd-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pd-body {
          padding: 28px 28px 32px;
        }
        @media (max-width: 640px) {
          .pd-panel { max-height: 92vh; }
          .pd-body { padding: 22px 20px 26px; }
        }
      `}</style>
    </section>
  );
}
