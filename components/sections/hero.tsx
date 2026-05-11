export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center bg-surface-deep"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-inverse">Pablo Armenta</h1>
        <p className="mt-4 text-xl text-text-inverse/70">Full-Stack Developer</p>
        <p className="mt-8 animate-bounce text-sm text-text-inverse/40">
          Scroll down
        </p>
      </div>
    </section>
  );
}
