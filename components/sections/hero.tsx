"use client";

import { useLenis } from "@/components/providers/smooth-scroll-provider";
import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const HERO_ORBS: OrbDef[] = [
  { center: [0.85, 0.8], radius: 0.35, speed: 0.4 },
  { center: [0.15, 0.45], radius: 0.22, speed: 0.55 },
  { center: [0.72, 0.25], radius: 0.15, speed: 0.65 },
  { center: [0.28, 0.15], radius: 0.10, speed: 0.75 },
  { center: [0.10, 0.85], radius: 0.20, speed: 0.50 },
];

const HERO_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.85, 0.90, 0.95], b: [0.55, 0.65, 0.75] },
  { a: [0.80, 0.88, 0.95], b: [0.50, 0.60, 0.70] },
  { a: [0.90, 0.92, 0.95], b: [0.60, 0.70, 0.80] },
  { a: [0.88, 0.90, 0.94], b: [0.55, 0.62, 0.72] },
  { a: [0.82, 0.88, 0.93], b: [0.52, 0.62, 0.72] },
];

const HERO_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.92, 0.95, 1.00], b: [0.35, 0.60, 1.00] },
  { a: [0.90, 0.97, 0.95], b: [0.30, 0.75, 0.65] },
  { a: [0.95, 0.92, 1.00], b: [0.55, 0.40, 0.95] },
  { a: [0.92, 0.96, 1.00], b: [0.40, 0.65, 0.90] },
  { a: [0.88, 0.93, 1.00], b: [0.35, 0.58, 0.85] },
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

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-medium tracking-[0.25em] text-text-inverse/50 uppercase">
          Full-Stack & Product Systems Engineer · Guadalajara
        </p>
        <h1 className="text-5xl font-bold leading-tight text-text-inverse drop-shadow-lg sm:text-6xl md:text-7xl">
          Pablo<br />Armenta
        </h1>
        <p className="max-w-xl text-lg text-text-inverse/65 drop-shadow-md">
          Full-Stack Engineer with 4.5 years at Envato specializing in React, TypeScript, and Ruby on Rails. I focus on Core Web Vitals, A/B experimentation, and custom BFF architecture for 500K+ subscribers.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={() => lenis?.scrollTo("#projects")}
            className="gloss-button px-6 py-3 text-sm font-semibold"
          >
            View Work
          </button>
          <button
            onClick={() => lenis?.scrollTo("#contact")}
            className="rounded-full border border-text-inverse/20 px-6 py-3 text-sm font-medium text-text-inverse/70 transition-colors hover:border-text-inverse/40 hover:text-text-inverse"
          >
            Contact Me
          </button>
        </div>
        <p className="mt-6 text-xs text-text-inverse/30 motion-safe:animate-bounce">
          ↓ scroll
        </p>
      </div>
    </section>
  );
}
