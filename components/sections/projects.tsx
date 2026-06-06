import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const PROJ_ORBS: OrbDef[] = [
  { center: [0.82, 0.70], radius: 0.22, speed: 0.45 },
  { center: [0.18, 0.25], radius: 0.16, speed: 0.55 },
];

const PROJ_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.95, 0.92, 0.85], b: [0.80, 0.70, 0.52] },
  { a: [0.93, 0.90, 0.83], b: [0.78, 0.68, 0.50] },
];

const PROJ_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.95, 0.95, 0.90], b: [0.90, 0.65, 0.30] },
  { a: [0.97, 0.93, 0.88], b: [0.85, 0.60, 0.25] },
];

interface Project {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  link?: string;
  status?: string;
}

const PROJECTS: Project[] = [
  {
    title: "This Portfolio",
    description:
      "A glassmorphism portfolio with procedural WebGL shader orbs, tiered rendering (WebGL → CSS → static based on device capability), scroll-driven GSAP animations with RAF lifecycle management, and an adaptive OKLCH color system across light and dark modes. Lighthouse 98-100, fully static build.",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "WebGL", "GSAP", "OKLCH", "Vercel"],
    accent: "text-accent",
    link: "https://github.com/noko32/FrutiPortafolio",
  },
  {
    title: "Melomano",
    description:
      "Song information aggregator that pulls lyrics, BPM/key, credits, sample relationships, and album art from 5 APIs into one page. Streaming architecture with per-component Suspense renders fast data in ~0.4s while slower APIs load progressively. 46 unit tests, GitHub Actions CI.",
    tags: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Tailwind v4", "Vitest", "Vercel"],
    accent: "text-accent-green",
    link: "https://melomano.dev",
  },
  {
    title: "Envato Elements",
    description:
      "Personalization aggregator for 500K+ users, dark mode rollout across the platform, and a Core Web Vitals push that took Lighthouse from the 60s to the 90s.",
    tags: ["React", "TypeScript", "Ruby on Rails", "A/B Testing", "Design Systems"],
    accent: "text-accent-warm",
    link: "https://elements.envato.com/",
  },
  {
    title: "Placeit by Envato",
    description:
      "Redesigned the main site and most subsites for 123K+ users. Built tracking infrastructure and helped build an A/B platform that ran 50+ experiments at a time.",
    tags: ["Vanilla JS", "Ruby on Rails", "ConfigCat", "Segment", "GDPR"],
    accent: "text-accent-coral",
    link: "https://placeit.net/",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-surface px-6 py-24"
    >
      <AmbientGlow preset="projects" />
      <OrbBackground
        orbs={PROJ_ORBS}
        lightPalette={PROJ_LIGHT}
        darkPalette={PROJ_DARK_NEON}
        compositeAlpha={0.85}
        bloomIntensity={0.3}
        cssFallbackPreset="sparse"
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="text-xs font-semibold tracking-widest text-accent-green uppercase">
          Projects
        </p>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Things I&apos;ve built
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="glass-card group px-6 py-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className={`text-lg font-bold ${project.accent}`}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                    >
                      {project.title}
                      <span className="ml-1.5 text-xs opacity-50">&#8599;</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                {project.status && (
                  <span className="shrink-0 rounded-full border border-accent-green/30 bg-accent-green/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent-green">
                    {project.status}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-glass-border bg-glass-bg px-2.5 py-0.5 text-[11px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
