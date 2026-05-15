import FloatingOrbs from "@/components/ui/floating-orbs";
import AmbientGlow from "@/components/ui/ambient-glow";

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
      "Built a personalization aggregator that served 500K+ users, pulling recommendation data from multiple services into one place",
      "Took full ownership of key parts of the platform-wide dark mode rollout: token system, component migration, and cross-page QA",
      "Worked on a sitewide rebrand, redesigning asset-type landing pages with a new component-driven design system",
      "Pushed Lighthouse scores from the 60s to the 90s on desktop (20s to 50s on mobile) in a large legacy codebase where most dependencies couldn't be easily upgraded",
    ],
  },
  {
    company: "Placeit by Envato",
    role: "Software Engineer",
    period: "Nov 2021 — Apr 2024",
    accent: "text-accent-green",
    dot: "bg-accent-green",
    bullets: [
      "Started on frontend and grew into full-stack, working with Vanilla JS (ES5) and Ruby on Rails",
      "Implemented ambient color detection for video mockups so backgrounds would automatically match uploaded media",
      "Single-handedly redesigned the main site and most subsites for 123K+ monthly active users",
      "Built GDPR-compliant tracking infrastructure and helped build a server-side A/B experimentation platform that ran 50+ concurrent experiments",
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
      <FloatingOrbs preset="sparse" />
      <div className="mx-auto max-w-3xl">
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
