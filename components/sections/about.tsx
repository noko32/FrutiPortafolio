import FloatingOrbs from "@/components/ui/floating-orbs";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center bg-surface px-6 py-24"
    >
      <FloatingOrbs preset="scattered" />
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        {/* Left — bio */}
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">
            About Me
          </p>
          <h2 className="text-4xl font-bold leading-snug text-text-primary">
            I build things that<br />feel alive.
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">
            Full-stack developer with a focus on interactive interfaces, smooth animations, and accessible design systems. I care about the space between design and code.
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            Currently available for freelance projects and full-time opportunities. Based in Mexico City, working globally.
          </p>
        </div>

        {/* Right — glass cards */}
        <div className="flex flex-col gap-4">
          {[
            { label: "Frontend", skills: "React · Next.js · TypeScript · Tailwind · GSAP" },
            { label: "Backend",  skills: "Node.js · PostgreSQL · Prisma · REST · GraphQL" },
            { label: "Tooling",  skills: "Git · Vercel · Docker · Figma · Lighthouse" },
          ].map((row) => (
            <div key={row.label} className="glass-card px-6 py-5">
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                {row.label}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{row.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
