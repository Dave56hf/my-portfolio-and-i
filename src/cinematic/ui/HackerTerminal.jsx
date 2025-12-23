import React, { useEffect, useState } from "react";
import Terminal, { TerminalLine, TerminalRule } from "./Terminal";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randPick(items) {
  return items[randInt(0, items.length - 1)];
}

function randHex(len) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < len; i += 1) out += chars[randInt(0, chars.length - 1)];
  return out;
}

function buildRun() {
  const build = randHex(7);
  const session = randHex(8);
  const edge = randPick(["edge-ams", "edge-fra", "edge-lhr", "edge-nyc", "edge-sin"]);
  const latencyMs = randInt(9, 42);
  const lcpMs = randInt(850, 1700);
  const bundleKb = randInt(140, 320);
  const focus = randPick([
    "performance-first interfaces",
    "latency-aware UI",
    "built under constraints",
    "animation with purpose",
    "accessible by default",
  ]);
  const now = randPick([
    "shipping UI that feels fast",
    "turning designs into clean React",
    "optimizing motion + performance",
    "building dashboards and flows",
  ]);

  return [
    {
      kind: "line",
      dim: true,
      delayMs: 240,
      content: (
        <>
          <span className="termTag">[boot]</span> cinematic portfolio{" "}
          <span className="termAccent">v1.0</span> <span className="termOk">ONLINE</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 200,
      content: (
        <>
          <span className="termTag">[session]</span> id{" "}
          <span className="termAccent">{session}</span> / build{" "}
          <span className="termAccent">{build}</span> / {edge} / rtt{" "}
          <span className="termOk">{latencyMs}ms</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: false,
      delayMs: 220,
      content: (
        <>
          <span className="termTag">[profile]</span> Dave{" "}
          <span className="termDim">— frontend developer</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 220,
      content: (
        <>
          <span className="termTag">[focus]</span>{" "}
          <span className="termAccent">{focus}</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 220,
      content: (
        <>
          <span className="termTag">[stack]</span> React + TypeScript + Tailwind + Node{" "}
          <span className="termDim">| Git + Figma</span>
        </>
      ),
    },
    { kind: "rule", delayMs: 170 },
    {
      kind: "line",
      dim: true,
      delayMs: 240,
      content: (
        <>
          <span className="termTag">[projects]</span> Portfolio{" "}
          <span className="termDim">(LIVE)</span> • Orixa{" "}
          <span className="termDim">(SHIPPED)</span> • Client Work • CryptoTrack{" "}
          <span className="termDim">(WIP)</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 220,
      content: (
        <>
          <span className="termTag">[now]</span> {now}{" "}
          <span className="termDim">| LCP {lcpMs}ms • bundle {bundleKb}kb</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 220,
      content: (
        <>
          <span className="termTag">[contact]</span>{" "}
          <span className="termAccent">west15455@gmail.com</span>{" "}
          <span className="termDim">| github.com/Dave56hf | x.com/Dave_QuestXS</span>
        </>
      ),
    },
    {
      kind: "line",
      dim: true,
      delayMs: 200,
      content: (
        <>
          <span className="termTag">[hint]</span> jump:{" "}
          <span className="termAccent">#projects</span>{" "}
          <span className="termAccent">#skills</span>{" "}
          <span className="termAccent">#about</span>{" "}
          <span className="termAccent">#contact</span>
        </>
      ),
    },
  ];
}

export default function HackerTerminal({ reducedMotion = false }) {
  const [script, setScript] = useState(() => buildRun());
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const timeouts = new Set();

    const schedule = (fn, ms) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        if (!cancelled) fn();
      }, ms);
      timeouts.add(id);
    };

    const step = (index) => {
      if (cancelled) return;

      const next = index + 1;
      setVisibleCount(next);

      if (next >= script.length) {
        schedule(() => setScript(buildRun()), 2400);
        return;
      }

      schedule(() => step(next), script[next].delayMs ?? 200);
    };

    schedule(() => setVisibleCount(0), 0);
    schedule(() => step(-1), script[0]?.delayMs ?? 220);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, [reducedMotion, script]);

  const visibleScript = reducedMotion ? script : script.slice(0, visibleCount);
  const isStreaming = reducedMotion ? false : visibleCount < script.length;

  return (
    <div className="heroTerminal" aria-label="Live terminal">
      <Terminal cmd="tail -f ./telemetry.log" cwd="~/portfolio/cinematic">
        {visibleScript.map((item, idx) => {
          if (item.kind === "rule") return <TerminalRule key={`r-${idx}`} />;
          return (
            <TerminalLine key={`l-${idx}`} dim={item.dim}>
              {item.content}
            </TerminalLine>
          );
        })}
        <TerminalLine dim>
          {isStreaming ? "streaming..." : "awaiting input"}{" "}
          <span className="termCursor" aria-hidden="true">
            ƒ-^
          </span>
        </TerminalLine>
      </Terminal>
    </div>
  );
}
