import React from "react";

function ProjectCard({ title, meta, desc, stack, href }) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      className="projCard"
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
    >
      <div className="projTop">
        <div className="projTitle">{title}</div>
        <div className="projMeta">{meta}</div>
      </div>
      <div className="projPreview" aria-hidden>
        <pre>
{`$ ${title.toLowerCase().replace(/\s+/g, "-")} --status
> ${meta}
> ${stack.join(" + ")}`}
        </pre>
      </div>
      <div className="projDesc">{desc}</div>
      <div className="projStack">
        {stack.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function ProjectGrid() {
  const projects = [
    {
      title: "Portfolio",
      meta: "LIVE",
      desc: "This site. Built as a system UI, not a landing page.",
      stack: ["React", "GSAP", "Three"],
      href: "/",
    },
    {
      title: "Orixa",
      meta: "SHIPPED",
      desc: "Full-stack crypto app. UI, perf, and product shipped end-to-end.",
      stack: ["React", "Node", "Tailwind"],
      href: "#projects",
    },
    {
      title: "Client Work",
      meta: "DELIVERED",
      desc: "Landing pages, dashboards, brands. Fast iterations, clean handoff.",
      stack: ["React", "Figma"],
      href: "#projects",
    },
    {
      title: "CryptoTrack",
      meta: "WIP",
      desc: "Tracking + alerts. Building the core flow and data pipeline.",
      stack: ["React", "API", "Charts"],
      href: "#projects",
    },
  ];

  return (
    <div className="projGrid">
      {projects.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </div>
  );
}
