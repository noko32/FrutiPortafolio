"use client";

import { useLenis } from "@/components/providers/smooth-scroll-provider";
import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const HERO_ORBS: OrbDef[] = [
  { center: [0.85, 0.8], radius: 0.35, speed: 0.4 },
  { center: [0.15, 0.45], radius: 0.22, speed: 0.55 },
  { center: [0.72, 0.25], radius: 0.15, speed: 0.65 },
  { center: [0.28, 0.15], radius: 0.1, speed: 0.75 },
  { center: [0.1, 0.85], radius: 0.2, speed: 0.5 },
];

const HERO_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.85, 0.9, 0.95], b: [0.55, 0.65, 0.75] },
  { a: [0.8, 0.88, 0.95], b: [0.5, 0.6, 0.7] },
  { a: [0.9, 0.92, 0.95], b: [0.6, 0.7, 0.8] },
  { a: [0.88, 0.9, 0.94], b: [0.55, 0.62, 0.72] },
  { a: [0.82, 0.88, 0.93], b: [0.52, 0.62, 0.72] },
];

const HERO_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.92, 0.95, 1.0], b: [0.35, 0.6, 1.0] },
  { a: [0.9, 0.97, 0.95], b: [0.3, 0.75, 0.65] },
  { a: [0.95, 0.92, 1.0], b: [0.55, 0.4, 0.95] },
  { a: [0.92, 0.96, 1.0], b: [0.4, 0.65, 0.9] },
  { a: [0.88, 0.93, 1.0], b: [0.35, 0.58, 0.85] },
];

export default function Hero() {
  const lenis = useLenis();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-surface-deep"
    >
      <AmbientGlow preset="hero" />
      <OrbBackground
        orbs={HERO_ORBS}
        lightPalette={HERO_LIGHT}
        darkPalette={HERO_DARK_NEON}
        compositeAlpha={0.85}
        bloomIntensity={0.3}
        cssFallbackPreset="scattered"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-5 px-6 text-center font-display">
        <p className="text-sm font-medium tracking-[0.2em] text-text-inverse/50 uppercase">
          Guadalajara · open to remote
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-inverse drop-shadow-lg sm:text-5xl md:text-6xl">
          Full-Stack &amp; Product Systems Engineer
        </h1>
        <p className="text-xl font-semibold text-text-inverse/80 drop-shadow-md sm:text-2xl">
          Pablo Armenta
        </p>
        <p className="max-w-xl text-base leading-relaxed text-text-inverse/65 drop-shadow-md sm:text-lg">
          4.5 years at Envato. React, TypeScript, Ruby on Rails. Core Web
          Vitals, A/B experimentation, BFF architecture for 500K+ subscribers.
        </p>
        <button
          type="button"
          onClick={() => lenis?.scrollTo("#experience")}
          className="mt-2 text-[1.05rem] font-bold tracking-wide text-text-inverse transition-opacity hover:opacity-80"
        >
          Work <span className="font-medium text-text-inverse/50">↓</span>
        </button>
      </div>
    </section>
  );
}
