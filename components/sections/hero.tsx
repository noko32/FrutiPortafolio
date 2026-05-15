"use client";

import { useState } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import HeroOrbsCSS from "@/components/hero/hero-orbs-css";
import HeroOrbsWebGL from "@/components/hero/hero-orbs-webgl";

export default function Hero() {
  const [useWebGL, setUseWebGL] = useState(false);
  const lenis = useLenis();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-surface-deep"
    >
      {useWebGL ? <HeroOrbsWebGL /> : <HeroOrbsCSS />}

      <button
        onClick={() => setUseWebGL((v) => !v)}
        className="absolute right-4 top-16 z-50 rounded-sm bg-white/10 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        {useWebGL ? "WebGL" : "CSS"} — click to switch
      </button>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm font-medium tracking-[0.25em] text-text-inverse/50 uppercase">
          Software Engineer · Guadalajara
        </p>
        <h1 className="text-5xl font-bold leading-tight text-text-inverse drop-shadow-lg sm:text-6xl md:text-7xl">
          Pablo<br />Armenta
        </h1>
        <p className="max-w-md text-lg text-text-inverse/65 drop-shadow-md">
          Full-stack engineer with 4.5 years shipping products used by 500K+ people. I focus on performance, design systems, and making things feel right.
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
