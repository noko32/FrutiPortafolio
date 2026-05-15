"use client";

import { useSyncExternalStore } from "react";

function subscribeToDarkMode(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getIsDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getIsDarkServer(): boolean {
  return false;
}

type GlowBlob = {
  color: string;
  size: string;
  position: string;
  blur: string;
  opacity: string;
};

type GradientWash = {
  gradient: string;
  opacity: string;
};

export type AmbientPreset = "hero" | "about" | "experience" | "projects" | "contact";

// ── Dark mode: saturated blobs on near-black surfaces ──

const DARK_BLOBS: Record<AmbientPreset, GlowBlob[]> = {
  hero: [
    { color: "oklch(55% 0.18 250)", size: "60% 50%", position: "top-[-10%] right-[-10%]", blur: "blur-[120px]", opacity: "opacity-40" },
    { color: "oklch(50% 0.15 200)", size: "45% 45%", position: "bottom-[5%] left-[-5%]", blur: "blur-[100px]", opacity: "opacity-30" },
    { color: "oklch(45% 0.12 300)", size: "35% 40%", position: "top-[30%] left-[20%]", blur: "blur-[140px]", opacity: "opacity-20" },
  ],
  about: [
    { color: "oklch(48% 0.14 165)", size: "50% 50%", position: "top-[-15%] left-[-10%]", blur: "blur-[130px]", opacity: "opacity-35" },
    { color: "oklch(42% 0.12 220)", size: "40% 45%", position: "bottom-[-5%] right-[-5%]", blur: "blur-[110px]", opacity: "opacity-25" },
  ],
  experience: [
    { color: "oklch(45% 0.13 230)", size: "55% 45%", position: "top-[-10%] right-[-15%]", blur: "blur-[140px]", opacity: "opacity-30" },
    { color: "oklch(40% 0.10 280)", size: "40% 50%", position: "bottom-[0%] left-[-10%]", blur: "blur-[120px]", opacity: "opacity-25" },
  ],
  projects: [
    { color: "oklch(45% 0.14 165)", size: "45% 40%", position: "top-[10%] right-[-10%]", blur: "blur-[120px]", opacity: "opacity-30" },
    { color: "oklch(40% 0.11 250)", size: "50% 45%", position: "bottom-[-10%] left-[-5%]", blur: "blur-[130px]", opacity: "opacity-25" },
  ],
  contact: [
    { color: "oklch(50% 0.16 260)", size: "50% 50%", position: "top-[10%] left-[20%]", blur: "blur-[150px]", opacity: "opacity-35" },
    { color: "oklch(45% 0.13 320)", size: "40% 40%", position: "bottom-[10%] right-[10%]", blur: "blur-[120px]", opacity: "opacity-25" },
  ],
};

const DARK_WASHES: Record<AmbientPreset, GradientWash> = {
  hero: {
    gradient: "radial-gradient(ellipse 80% 60% at 70% 30%, oklch(30% 0.08 250 / 0.6), transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, oklch(25% 0.06 200 / 0.4), transparent 65%)",
    opacity: "opacity-100",
  },
  about: {
    gradient: "radial-gradient(ellipse 70% 60% at 25% 35%, oklch(28% 0.07 165 / 0.5), transparent 65%), radial-gradient(ellipse 50% 50% at 80% 70%, oklch(25% 0.05 220 / 0.35), transparent 60%)",
    opacity: "opacity-100",
  },
  experience: {
    gradient: "radial-gradient(ellipse 75% 55% at 75% 25%, oklch(32% 0.07 230 / 0.45), transparent 65%), radial-gradient(ellipse 55% 50% at 15% 75%, oklch(28% 0.06 280 / 0.35), transparent 60%)",
    opacity: "opacity-100",
  },
  projects: {
    gradient: "radial-gradient(ellipse 65% 55% at 80% 60%, oklch(28% 0.07 165 / 0.45), transparent 65%), radial-gradient(ellipse 55% 45% at 15% 30%, oklch(25% 0.06 250 / 0.35), transparent 60%)",
    opacity: "opacity-100",
  },
  contact: {
    gradient: "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(25% 0.08 260 / 0.5), transparent 60%), radial-gradient(ellipse 45% 45% at 70% 80%, oklch(22% 0.06 320 / 0.35), transparent 55%)",
    opacity: "opacity-100",
  },
};

// ── Light mode: subtle, high-lightness blobs on bright surfaces ──

const LIGHT_BLOBS: Record<AmbientPreset, GlowBlob[]> = {
  hero: [
    { color: "oklch(88% 0.06 250)", size: "55% 45%", position: "top-[-10%] right-[-10%]", blur: "blur-[130px]", opacity: "opacity-20" },
    { color: "oklch(90% 0.04 200)", size: "40% 40%", position: "bottom-[5%] left-[-5%]", blur: "blur-[110px]", opacity: "opacity-15" },
  ],
  about: [
    { color: "oklch(92% 0.04 165)", size: "50% 45%", position: "top-[-10%] left-[-8%]", blur: "blur-[120px]", opacity: "opacity-20" },
    { color: "oklch(90% 0.05 230)", size: "40% 40%", position: "bottom-[-5%] right-[-5%]", blur: "blur-[100px]", opacity: "opacity-15" },
  ],
  experience: [
    { color: "oklch(91% 0.05 230)", size: "50% 40%", position: "top-[-10%] right-[-12%]", blur: "blur-[130px]", opacity: "opacity-18" },
    { color: "oklch(93% 0.03 280)", size: "35% 40%", position: "bottom-[0%] left-[-8%]", blur: "blur-[110px]", opacity: "opacity-15" },
  ],
  projects: [
    { color: "oklch(91% 0.04 165)", size: "45% 38%", position: "top-[10%] right-[-8%]", blur: "blur-[120px]", opacity: "opacity-18" },
    { color: "oklch(90% 0.05 250)", size: "42% 40%", position: "bottom-[-8%] left-[-5%]", blur: "blur-[110px]", opacity: "opacity-15" },
  ],
  contact: [
    { color: "oklch(88% 0.06 260)", size: "48% 45%", position: "top-[10%] left-[20%]", blur: "blur-[140px]", opacity: "opacity-22" },
    { color: "oklch(90% 0.04 320)", size: "38% 38%", position: "bottom-[10%] right-[10%]", blur: "blur-[110px]", opacity: "opacity-15" },
  ],
};

const LIGHT_WASHES: Record<AmbientPreset, GradientWash> = {
  hero: {
    gradient: "radial-gradient(ellipse 75% 55% at 65% 35%, oklch(92% 0.04 250 / 0.35), transparent 65%), radial-gradient(ellipse 55% 45% at 25% 75%, oklch(94% 0.03 200 / 0.25), transparent 60%)",
    opacity: "opacity-100",
  },
  about: {
    gradient: "radial-gradient(ellipse 65% 55% at 30% 30%, oklch(94% 0.03 165 / 0.30), transparent 60%), radial-gradient(ellipse 50% 45% at 75% 65%, oklch(93% 0.03 230 / 0.25), transparent 55%)",
    opacity: "opacity-100",
  },
  experience: {
    gradient: "radial-gradient(ellipse 70% 50% at 70% 30%, oklch(95% 0.03 230 / 0.30), transparent 60%), radial-gradient(ellipse 50% 45% at 20% 70%, oklch(94% 0.03 280 / 0.22), transparent 55%)",
    opacity: "opacity-100",
  },
  projects: {
    gradient: "radial-gradient(ellipse 60% 50% at 75% 55%, oklch(94% 0.03 165 / 0.28), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 35%, oklch(93% 0.03 250 / 0.22), transparent 55%)",
    opacity: "opacity-100",
  },
  contact: {
    gradient: "radial-gradient(ellipse 65% 55% at 50% 40%, oklch(92% 0.04 260 / 0.32), transparent 58%), radial-gradient(ellipse 45% 40% at 65% 75%, oklch(94% 0.03 320 / 0.22), transparent 52%)",
    opacity: "opacity-100",
  },
};

interface AmbientGlowProps {
  preset: AmbientPreset;
}

export default function AmbientGlow({ preset }: AmbientGlowProps) {
  const isDark = useSyncExternalStore(subscribeToDarkMode, getIsDark, getIsDarkServer);

  const blobs = isDark ? DARK_BLOBS[preset] : LIGHT_BLOBS[preset];
  const wash = isDark ? DARK_WASHES[preset] : LIGHT_WASHES[preset];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-0 ${wash.opacity}`}
        style={{ backgroundImage: wash.gradient }}
      />
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${blob.position} ${blob.blur} ${blob.opacity}`}
          style={{
            width: blob.size.split(" ")[0],
            height: blob.size.split(" ")[1],
            backgroundColor: blob.color,
          }}
        />
      ))}
    </div>
  );
}
