import FloatingOrbs from "@/components/ui/floating-orbs";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative flex min-h-screen items-center justify-center bg-surface-elevated"
    >
      <FloatingOrbs preset="sparse" />
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-text-primary">Experience</h2>
        <p className="mt-4 text-lg text-text-secondary">
          Section placeholder — timeline goes here.
        </p>
      </div>
    </section>
  );
}
