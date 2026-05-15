"use client";

import { useState, useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion-prefs";

export type OrbTier = "webgl" | "css" | "static";

function detectTier(): OrbTier {
  if (prefersReducedMotion()) return "static";

  const testCanvas = document.createElement("canvas");
  const gl = testCanvas.getContext("webgl");
  if (!gl) return "css";

  if (navigator.maxTouchPoints > 0 && window.innerWidth < 1024) return "css";

  return "webgl";
}

export function useOrbTier(): OrbTier {
  const [tier, setTier] = useState<OrbTier>("css");

  useEffect(() => {
    const detected = detectTier();
    if (detected !== "css") setTier(detected);
  }, []);

  return tier;
}
