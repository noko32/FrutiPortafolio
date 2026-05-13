"use client";

import { useState } from "react";
import HeroOrbsCSS from "@/components/hero/hero-orbs-css";
import HeroOrbsWebGL from "@/components/hero/hero-orbs-webgl";

export default function Hero() {
  const [useWebGL, setUseWebGL] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-surface-deep"
    >
      {useWebGL ? <HeroOrbsWebGL /> : <HeroOrbsCSS />}

      {/* Experiment toggle — remove after PD */}
      <button
        onClick={() => setUseWebGL((v) => !v)}
        className="absolute right-4 top-4 z-50 rounded-sm bg-white/10 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        {useWebGL ? "WebGL" : "CSS"} — click to switch
      </button>

      {/* z-10: sits between back orbs (z-0) and front orbs (z-20) */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-medium tracking-[0.25em] text-text-inverse/50 uppercase">
          Full-Stack Developer · Mexico City
        </p>
        <h1 className="text-6xl font-bold leading-tight text-text-inverse drop-shadow-lg md:text-7xl">
          Pablo<br />Armenta
        </h1>
        <p className="max-w-md text-lg text-text-inverse/65 drop-shadow-md">
          Building fast, beautiful products at the intersection of design and engineering.
        </p>
        <div className="mt-4 flex gap-4">
          <button className="gloss-button px-6 py-3 text-sm font-semibold">
            View Work
          </button>
          <button className="rounded-full border border-text-inverse/20 px-6 py-3 text-sm font-medium text-text-inverse/70 transition-colors hover:border-text-inverse/40 hover:text-text-inverse">
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
