"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface OrbConfig {
  size: string;
  drift: string;
  position: string;
  parallaxRange: [number, number];
}

const PRESETS: Record<string, OrbConfig[]> = {
  sparse: [
    {
      size: "aero-orb--sm",
      drift: "aero-orb--drift-3",
      position: "absolute -right-10 top-[20%] opacity-35",
      parallaxRange: [60, -100],
    },
    {
      size: "aero-orb--xs",
      drift: "aero-orb--drift-4",
      position: "absolute left-[5%] bottom-[10%] opacity-30",
      parallaxRange: [40, -70],
    },
  ],
  scattered: [
    {
      size: "aero-orb--md",
      drift: "aero-orb--drift-1",
      position: "absolute -left-12 top-[15%] opacity-30",
      parallaxRange: [80, -130],
    },
    {
      size: "aero-orb--sm",
      drift: "aero-orb--drift-2",
      position: "absolute right-[8%] bottom-[25%] opacity-35",
      parallaxRange: [50, -90],
    },
    {
      size: "aero-orb--xs",
      drift: "aero-orb--drift-5",
      position: "absolute left-[40%] top-[5%] opacity-25",
      parallaxRange: [30, -50],
    },
  ],
};

export default function FloatingOrbs({
  preset = "sparse",
}: {
  preset?: keyof typeof PRESETS;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbs = PRESETS[preset] ?? PRESETS.sparse;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const [from, to] = orbs[i].parallaxRange;
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
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className={`aero-orb ${orb.size} ${orb.drift} ${orb.position}`}
        />
      ))}
    </div>
  );
}
