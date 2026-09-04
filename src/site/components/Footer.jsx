import React from "react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
      <div
        className="site-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <span className="muted" style={{ fontSize: 13 }}>
          © {new Date().getFullYear()} David West
        </span>
        <span className="muted" style={{ fontSize: 13 }}>
          Built with React &amp; Tailwind
        </span>
      </div>
    </footer>
  );
}
