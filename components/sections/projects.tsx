import AmbientGlow from "@/components/ui/ambient-glow";
import CardOrbSpill from "@/components/cues/card-orb-spill";
import SpiderNetCrawl from "@/components/cues/spider-net-crawl";
import { MelomanoMark } from "@/components/cues/melomano-mark";

type ProjectCue = "orbs-left" | "net-right";

interface Project {
  id: "portfolio" | "melomano";
  title: string;
  description: string;
  tags: string[];
  accent: string;
  link: string;
  /** Plain text action — no arrow glyphs (Family A). */
  cta: string;
  cue: ProjectCue;
}

const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "This Portfolio",
    description:
      "A glassmorphism portfolio with procedural WebGL shader orbs, tiered rendering (WebGL → CSS → static based on device capability), scroll-driven GSAP animations with RAF lifecycle management, and an adaptive OKLCH color system across light and dark modes. Lighthouse 98-100, fully static build.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "WebGL",
      "GSAP",
      "OKLCH",
      "Vercel",
    ],
    accent: "text-accent",
    link: "https://github.com/noko32/FrutiPortafolio",
    cta: "View source",
    cue: "orbs-left",
  },
  {
    id: "melomano",
    title: "Melomano",
    description:
      "Song aggregator with a Django REST microservice for Camelot-compatible harmonic recommendations and ±5% BPM ranges. Next.js frontend over a PostgreSQL cache, with Django TestCase and Vitest covering the API surface.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Python (Django/DRF)",
      "Drizzle ORM",
      "Neon Postgres",
      "Vitest",
    ],
    accent: "text-accent-green",
    link: "https://melomano.dev",
    cta: "melomano.dev",
    cue: "net-right",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-visible bg-surface px-6 py-24">
      <AmbientGlow preset="projects" />
      <div className="relative z-10 mx-auto max-w-5xl overflow-visible px-4 sm:px-8 md:px-12">
        <p className="text-xs font-semibold tracking-widest text-accent-green uppercase">
          Projects
        </p>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Things I&apos;ve built
        </h2>

        <div className="mt-12 grid items-stretch gap-10 overflow-visible md:grid-cols-2 md:gap-12">
          {PROJECTS.map((project) => (
            <div key={project.id} className="relative flex h-full overflow-visible">
              {project.cue === "orbs-left" ? <CardOrbSpill /> : null}
              {project.cue === "net-right" ? <SpiderNetCrawl /> : null}
              <article className="glass-card group relative z-[2] flex h-full w-full flex-col !bg-surface-elevated px-6 py-6 transition-transform duration-300 hover:-translate-y-1">
                {project.id === "melomano" ? (
                  <h3 className="inline-flex items-center gap-2.5">
                    <MelomanoMark
                      className="h-7 w-7 shrink-0"
                      gradientId="fruti-melomano-card-mark"
                    />
                    <span className="melomano-caps text-lg sm:text-xl">
                      MELOMANO
                    </span>
                  </h3>
                ) : (
                  <h3 className={`text-lg font-bold ${project.accent}`}>
                    {project.title}
                  </h3>
                )}

                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
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

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 self-start text-sm font-semibold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 ${project.accent}`}
                >
                  {project.cta}
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
