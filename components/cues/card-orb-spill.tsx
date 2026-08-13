"use client";

import OrbBackground from "@/components/ui/orb-background";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

/** Clustered toward the card edge, but keep center+radius ≤ ~0.98 so the right side isn’t clipped. */
const SPILL_ORBS: OrbDef[] = [
  { center: [0.55, 0.4], radius: 0.38, speed: 0.42 },
  { center: [0.28, 0.72], radius: 0.22, speed: 0.58 },
  { center: [0.16, 0.26], radius: 0.13, speed: 0.7 },
];

const SPILL_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.88, 0.93, 0.98], b: [0.5, 0.62, 0.78] },
  { a: [0.85, 0.9, 0.96], b: [0.48, 0.58, 0.72] },
  { a: [0.9, 0.94, 0.98], b: [0.55, 0.68, 0.8] },
];

const SPILL_DARK: { a: RGB; b: RGB }[] = [
  { a: [0.92, 0.96, 1.0], b: [0.35, 0.6, 1.0] },
  { a: [0.9, 0.97, 0.95], b: [0.28, 0.75, 0.65] },
  { a: [0.95, 0.93, 1.0], b: [0.55, 0.4, 0.95] },
];

/**
 * Portfolio card left spill — Fruti OrbBackground in E8b geometry.
 * Translucent orbs may overlap the card edge in front (z above card).
 */
export default function CardOrbSpill() {
  return (
    <div
      className="pointer-events-none absolute z-[3] overflow-visible"
      style={{
        // More under-card overlap so the rightmost orb isn't clipped by the canvas edge
        right: "calc(100% - 64px)",
        top: "4%",
        width: 210,
        height: 170,
      }}
      aria-hidden
    >
      <OrbBackground
        orbs={SPILL_ORBS}
        lightPalette={SPILL_LIGHT}
        darkPalette={SPILL_DARK}
        compositeAlpha={0.9}
        bloomIntensity={0.35}
        cssFallbackPreset="scattered"
        className="!relative !inset-auto h-full w-full"
      />
    </div>
  );
}
