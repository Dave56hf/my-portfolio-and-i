import React from "react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFigma,
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Node", icon: SiNodedotjs },
  { name: "Git", icon: SiGit },
  { name: "Figma", icon: SiFigma },
];

export default function SkillGrid() {
  return (
    <div className="skillGrid">
      {skills.map((s) => {
        const Icon = s.icon;
        return (
          <div className="skillTile" key={s.name}>
            <Icon className="skillIcon" aria-hidden />
            <div className="skillName">{s.name}</div>
          </div>
        );
      })}
    </div>
  );
}

