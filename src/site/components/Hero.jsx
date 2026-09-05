import React from "react";
import { motion } from "framer-motion";
import Portrait from "../../assets/huu2so.jpg";

const easeOut = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section id="top" style={{ paddingTop: 64, paddingBottom: 48 }}>
      <div
        className="site-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <span className="eyebrow">Frontend Developer &amp; UI/UX Designer</span>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(34px, 5.4vw, 58px)",
              marginTop: 14,
              marginBottom: 22,
            }}
          >
            I build clean, usable
            <br />
            interfaces for web &amp; Web3 products.
          </h1>
          <p
            className="muted"
            style={{ fontSize: 17, maxWidth: 480, lineHeight: 1.6, marginBottom: 32 }}
          >
            I'm a frontend developer and product
            designer with roughly five years in the Web3 community. I design
            in Figma and build in React, and I care about interfaces that
            feel considered, not templated.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#work" className="btn btn-primary focus-ring">
              View my work
            </a>
            <a href="#contact" className="btn btn-secondary focus-ring">
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
          style={{ justifySelf: "center" }}
          className="hero-portrait-wrap"
        >
          <div
            style={{
              width: "100%",
              maxWidth: 300,
              aspectRatio: "4 / 5",
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "var(--paper-alt)",
            }}
          >
            <img
              src={Portrait}
              alt="Portrait of David West"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          #top .site-container {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: left;
          }
          .hero-portrait-wrap { justify-self: start !important; order: -1; }
          .hero-portrait-wrap > div { max-width: 180px !important; }
        }
      `}</style>
    </section>
  );
}
