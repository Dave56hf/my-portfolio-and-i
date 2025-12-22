import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CinematicChapter({
  id,
  label,
  pin = false,
  pinDistance = 0.9,
  progressRef,
  children,
  className = "",
}) {
  const rootRef = useRef(null);

  const resolvedPinDistance = useMemo(() => {
    if (!pin) return null;
    if (typeof pinDistance === "number") {
      return `+=${Math.max(0, Math.round(pinDistance * window.innerHeight))}`;
    }
    return pinDistance;
  }, [pin, pinDistance]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const content = rootRef.current?.querySelector("[data-chapter-content]");
      const labelEl = rootRef.current?.querySelector("[data-chapter-label]");
      const lines = rootRef.current?.querySelectorAll("[data-term-line]") ?? [];

      const hasLines = lines.length > 0;

      if (hasLines) {
        gsap.set(lines, { autoAlpha: 0, x: -8 });
      } else if (content) {
        gsap.set(content, { autoAlpha: 0, y: 12 });
      }

      if (labelEl) gsap.set(labelEl, { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: pin ? resolvedPinDistance ?? "+=80%" : "bottom 40%",
          scrub: pin ? 1 : false,
          pin,
          anticipatePin: 1,
          onUpdate:
            progressRef && typeof progressRef === "object"
              ? (self) => {
                  progressRef.current = self.progress;
                }
              : undefined,
        },
      });

      if (labelEl) tl.to(labelEl, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power1.out" }, 0);

      if (hasLines) {
        tl.to(
          lines,
          {
            autoAlpha: 1,
            x: 0,
            duration: pin ? 1 : 0.22,
            stagger: pin ? 0.03 : 0.025,
            ease: "none",
          },
          0
        );
      } else if (content) {
        tl.to(content, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power1.out" }, 0);
      }
    }, rootRef);

    return () => ctx.revert();
  }, [pin, resolvedPinDistance, progressRef]);

  return (
    <section id={id} ref={rootRef} className={`cinematic-chapter ${className}`}>
      {label ? (
        <div className="cinematic-chapterLabel" data-chapter-label>
          {label}
        </div>
      ) : null}
      <div data-chapter-content>{children}</div>
    </section>
  );
}
