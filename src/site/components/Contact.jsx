import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { contact } from "../data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section id="contact" className="site-section" style={{ background: "var(--paper-alt)" }}>
      <div className="site-container">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 640 }}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4.4vw, 42px)", marginTop: 10, marginBottom: 18 }}>
            Have a project in mind? Let's talk.
          </h2>
          <p className="muted" style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Whether it's a product to design, a frontend to build, or just an
            idea you want to sanity-check, my inbox is open.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href={`mailto:${contact.email}`} className="btn btn-primary focus-ring">
              <Mail size={17} aria-hidden />
              {contact.email}
            </a>
          </div>

          <div style={{ display: "flex", gap: 22, marginTop: 32, flexWrap: "wrap" }}>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-link focus-ring"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5 }}
            >
              <FaGithub size={16} aria-hidden /> {contact.githubLabel}
            </a>
            <a
              href={contact.x}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-link focus-ring"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5 }}
            >
              <FaXTwitter size={16} aria-hidden /> {contact.xLabel}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-link focus-ring"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5 }}
            >
              <FaLinkedin size={16} aria-hidden /> {contact.linkedinLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
