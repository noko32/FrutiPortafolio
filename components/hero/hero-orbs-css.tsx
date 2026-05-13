"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion-prefs";

const ORBS = [
  {
    size: "aero-orb--lg",
    drift: "aero-orb--drift-1",
    pos: "absolute -right-16 -top-16 opacity-50",
    z: "z-0",
    parallaxRange: [80, -120],
  },
  {
    size: "aero-orb--md",
    drift: "aero-orb--drift-5",
    pos: "absolute bottom-[8%] left-[3%] opacity-40",
    z: "z-0",
    parallaxRange: [40, -60],
  },
  {
    size: "aero-orb--md",
    drift: "aero-orb--drift-2",
    pos: "absolute left-[8%] top-[35%]",
    z: "z-20",
    parallaxRange: [120, -200],
  },
  {
    size: "aero-orb--sm",
    drift: "aero-orb--drift-3",
    pos: "absolute bottom-[18%] right-[20%]",
    z: "z-20",
    parallaxRange: [150, -260],
  },
  {
    size: "aero-orb--xs",
    drift: "aero-orb--drift-4",
    pos: "absolute left-[25%] top-[12%]",
    z: "z-20",
    parallaxRange: [180, -320],
  },
] as const;

export default function HeroOrbsCSS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      ScrollTrigger.refresh();

      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        const [from, to] = ORBS[i].parallaxRange;
        gsap.fromTo(
          el,
          { y: from },
          {
            y: to,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => {
            parallaxRefs.current[i] = el;
          }}
          className={`${orb.pos} ${orb.z}`}
        >
          <div className={`aero-orb ${orb.size} ${orb.drift}`} />
        </div>
      ))}
    </div>
  );
}
