import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const EXP_ORBS: OrbDef[] = [
  { center: [0.88, 0.35], radius: 0.20, speed: 0.50 },
  { center: [0.12, 0.75], radius: 0.15, speed: 0.60 },
];

const EXP_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.88, 0.85, 0.95], b: [0.62, 0.55, 0.78] },
  { a: [0.90, 0.88, 0.96], b: [0.65, 0.58, 0.80] },
];

const EXP_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [0.95, 0.90, 1.00], b: [0.55, 0.35, 0.90] },
  { a: [0.93, 0.88, 1.00], b: [0.60, 0.40, 0.95] },
];

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  accent: string;
  dot: string;
}

const EXPERIENCE: TimelineEntry[] = [
  {
    company: "Envato Elements",
    role: "Software Engineer",
    period: "Apr 2024 — Mar 2026",
    accent: "text-accent",
    dot: "bg-accent",
    bullets: [
      "Owned end-to-end delivery of the flagship 'For You' personalized pages, composing shared design system components and architecting a custom BFF (Backend-for-Frontend) aggregation layer to serve recommendation data to 500K+ active subscribers, boosting engagement CTR by 30%",
      "Led web performance optimization and Core Web Vitals (CWV) initiatives, lifting mobile Lighthouse scores from 20s to 50s and desktop scores from 60s to 90+ on legacy, dependency-locked pages through code splitting, image payload reduction, and INP/LCP tuning",
      "Shipped high-urgency, visual-fidelity landing pages under critical ≤2-day marketing and legal deadlines, ensuring pixel-perfect responsive layouts and strict design-system/A11y accessibility compliance",
      "Operated across the multi-year codebase migration from Flow/JS to React and TypeScript, authoring typed interfaces and refactoring legacy Ruby on Rails backend controllers and views",
    ],
  },
  {
    company: "Placeit by Envato",
    role: "Software Engineer",
    period: "Nov 2021 — Apr 2024",
    accent: "text-accent-green",
    dot: "bg-accent-green",
    bullets: [
      "Managed page-level visual redesigns and feature delivery for 5 core high-traffic subscriber pages, building modular component trees inside Envato's custom proprietary Neon SPA framework and integrating with Ruby on Rails APIs",
      "Achieved a 15% reduction in subscriber churn by designing and running 50+ concurrent server-side and client-side experiments on a custom in-house A/B testing platform (A/B infra)",
      "Built a GDPR-compliant GDPR/privacy user-tracking infrastructure, integrating telemetry pipelines (Segment, Cookiebot) to enable high-fidelity user segmentation (churn-risk, billing tier) across all high-traffic sub-pages",
      "Grew from frontend specialist to full-stack contributor, progressively owning Ruby on Rails backend features as product demands required end-to-end delivery",
    ],
  },
  {
    company: "UAG",
    role: "Web Developer",
    period: "Feb — Aug 2019",
    accent: "text-accent-warm",
    dot: "bg-accent-warm",
    bullets: [
      "Built an internal marketing automation tool with ASP.NET Core",
      "First professional exposure to full-stack web development and agile workflows",
    ],
  },
];

const EDUCATION = [
  { label: "B.S. Software Engineering", detail: "Universidad Autónoma de Guadalajara, 2017–2021" },
  { label: "Cambridge C2 Proficiency", detail: "English, highest level certification" },
  { label: "Gray Hat Offensive Security", detail: "Ethical hacking and penetration testing" },
  { label: "IBM Hackapalooza", detail: "4th place, competitive hackathon" },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-surface-elevated px-6 py-24"
    >
      <AmbientGlow preset="experience" />
      <OrbBackground
        orbs={EXP_ORBS}
        lightPalette={EXP_LIGHT}
        darkPalette={EXP_DARK_NEON}
        compositeAlpha={0.85}
        bloomIntensity={0.3}
        cssFallbackPreset="sparse"
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">
          Experience
        </p>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Where I&apos;ve worked
        </h2>

        <div className="relative mt-12">
          {/* Vertical timeline line */}
          <div className="absolute top-0 left-[7px] h-full w-px bg-glass-border" />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((entry) => (
              <div key={entry.company} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 border-surface-elevated ${entry.dot}`}
                />

                <div className="glass-card px-6 py-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${entry.accent}`}>
                        {entry.company}
                      </h3>
                      <p className="text-sm text-text-secondary">{entry.role}</p>
                    </div>
                    <p className="text-xs font-medium text-text-secondary/70">
                      {entry.period}
                    </p>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-secondary/40" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <p className="text-xs font-semibold tracking-widest text-accent-coral uppercase">
            Education & Certifications
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {EDUCATION.map((item) => (
              <div key={item.label} className="glass-card px-5 py-4">
                <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
