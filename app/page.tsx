import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="isolate">
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
