import React, { useEffect, useState } from "react";
import { nav } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(250,249,246,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        className="site-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <a
          href="#top"
          className="serif focus-ring"
          style={{ fontSize: 19, textDecoration: "none", color: "var(--ink)" }}
        >
          David West
        </a>

        <nav
          style={{ display: "flex", gap: 32 }}
          className="desktop-nav"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring"
              style={{
                fontSize: 14.5,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn btn-primary focus-ring desktop-cta"
          style={{ fontSize: 14 }}
        >
          Get in touch
        </a>

        <button
          className="mobile-toggle focus-ring"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--ink)",
              position: "relative",
              transition: "transform 0.2s ease",
              transform: open ? "rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--ink)",
              marginTop: 5,
              transition: "opacity 0.2s ease, transform 0.2s ease",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--ink)",
              marginTop: 5,
              transition: "transform 0.2s ease",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--paper)",
          }}
        >
          <div
            className="site-container"
            style={{ display: "flex", flexDirection: "column", padding: "16px 24px 24px" }}
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "12px 0",
                  fontSize: 17,
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: 16, justifyContent: "center" }}
            >
              Get in touch
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 761px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}
