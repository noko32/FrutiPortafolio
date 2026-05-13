"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion-prefs";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  if (
    !lenisRef.current &&
    typeof window !== "undefined" &&
    !prefersReducedMotion()
  ) {
    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
  }

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
