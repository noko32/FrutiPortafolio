import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const ABOUT_ORBS: OrbDef[] = [
  { center: [0.80, 0.30], radius: 0.25, speed: 0.45 },
  { center: [0.15, 0.70], radius: 0.18, speed: 0.55 },
  { center: [0.55, 0.85], radius: 0.12, speed: 0.65 },
];

const ABOUT_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.85, 0.92, 0.88], b: [0.55, 0.72, 0.62] },
  { a: [0.88, 0.95, 0.90], b: [0.58, 0.75, 0.65] },
  { a: [0.82, 0.90, 0.86], b: [0.50, 0.68, 0.58] },
];

const ABOUT_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.90, 1.00, 0.95], b: [0.25, 0.85, 0.65] },
  { a: [0.88, 0.98, 0.93], b: [0.30, 0.80, 0.60] },
  { a: [0.92, 1.00, 0.96], b: [0.20, 0.78, 0.58] },
];

const SKILL_CARDS = [
  {
    label: "Frontend",
    skills: "React · TypeScript · Flow · Next.js · Neon SPA · Tailwind · GSAP",
    accentClass: "text-accent",
    dotClass: "bg-accent",
  },
  {
    label: "Backend",
    skills: "Ruby on Rails · Node.js · Express · REST APIs",
    accentClass: "text-accent-green",
    dotClass: "bg-accent-green",
  },
  {
    label: "Performance",
    skills: "Core Web Vitals · Lighthouse · Design Systems · A/B Testing",
    accentClass: "text-accent-warm",
    dotClass: "bg-accent-warm",
  },
  {
    label: "Platform",
    skills: "Datadog · Segment · ConfigCat · Rollbar",
    accentClass: "text-accent-coral",
    dotClass: "bg-accent-coral",
  },
] as const;

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
      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xs font-semibold tracking-widest text-accent-green uppercase">
            About Me
          </p>
          <h2 className="text-3xl font-bold leading-snug text-text-primary sm:text-4xl">
            I like building things that feel good to use.
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">
            I spent 4.5 years at Envato working across Placeit and Envato
            Elements, two products with 600K+ combined users. I started on the
            frontend and grew into full-stack. At both Placeit and Elements I built
            and owned the For You pages, surfacing the right data on the main app
            for subscribed users. I also worked on sitewide rebrands, A/B
            experimentation, and a Lighthouse push from the 60s to the 90s.
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            My stack is React, TypeScript, Ruby on Rails, and Node.js. I care
            a lot about performance, design systems, and the small details
            that make an interface feel polished.
          </p>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="flex items-baseline gap-1.5">
                <span className="text-sm font-medium text-text-primary">{lang.name}</span>
                <span className="text-xs text-text-secondary">({lang.level})</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-secondary">
            Based in Guadalajara, MX. Open to remote opportunities worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {SKILL_CARDS.map((row) => (
            <div key={row.label} className="glass-card px-6 py-5">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${row.dotClass}`} />
                <p className={`text-xs font-semibold tracking-widest uppercase ${row.accentClass}`}>
                  {row.label}
                </p>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{row.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
