import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const ABOUT_ORBS: OrbDef[] = [
  { center: [0.8, 0.3], radius: 0.25, speed: 0.45 },
  { center: [0.15, 0.7], radius: 0.18, speed: 0.55 },
  { center: [0.55, 0.85], radius: 0.12, speed: 0.65 },
];

const ABOUT_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.85, 0.92, 0.88], b: [0.55, 0.72, 0.62] },
  { a: [0.88, 0.95, 0.9], b: [0.58, 0.75, 0.65] },
  { a: [0.82, 0.9, 0.86], b: [0.5, 0.68, 0.58] },
];

const ABOUT_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.9, 1.0, 0.95], b: [0.25, 0.85, 0.65] },
  { a: [0.88, 0.98, 0.93], b: [0.3, 0.8, 0.6] },
  { a: [0.92, 1.0, 0.96], b: [0.2, 0.78, 0.58] },
];

const LANGUAGES = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C2 Cambridge" },
  { name: "Japanese", level: "Basic" },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center bg-surface px-6 py-24"
    >
      <AmbientGlow preset="about" />
      <OrbBackground
        orbs={ABOUT_ORBS}
        lightPalette={ABOUT_LIGHT}
        darkPalette={ABOUT_DARK_NEON}
        compositeAlpha={0.85}
        bloomIntensity={0.3}
        cssFallbackPreset="scattered"
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <p className="text-xs font-semibold tracking-widest text-accent-green uppercase">
          About Me
        </p>
        <h2 className="text-3xl font-bold leading-snug text-text-primary sm:text-4xl">
          I like building things that feel good to use.
        </h2>
        <p className="text-base leading-relaxed text-text-secondary">
          I spent 4.5 years at Envato delivering page-level features across
          Placeit and Envato Elements, two products with 600K+ combined
          subscribers. I owned the For You personalized pages at both products,
          architected a BFF aggregation layer for 500K+ users, and navigated a
          multi-year Flow/JS to React and TypeScript codebase migration.
        </p>
        <p className="text-base leading-relaxed text-text-secondary">
          My stack is React, TypeScript, Next.js, Ruby on Rails, and Node.js. I
          focus on Core Web Vitals, design systems, and the small details that
          make an interface feel right.
        </p>

        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {LANGUAGES.map((lang) => (
            <div key={lang.name} className="flex items-baseline gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                {lang.name}
              </span>
              <span className="text-xs text-text-secondary">({lang.level})</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-text-secondary">
          Based in Guadalajara, MX. Open to remote opportunities worldwide.
        </p>
      </div>
    </section>
  );
}
