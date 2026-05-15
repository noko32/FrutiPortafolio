"use client";

import { useEffect } from "react";
import { useOrbTier } from "@/lib/use-orb-tier";
import { ScrollTrigger } from "@/lib/gsap-config";
import WebGLOrbs, { type WebGLOrbsProps } from "@/components/ui/webgl-orbs";
import FloatingOrbs from "@/components/ui/floating-orbs";

interface OrbBackgroundProps extends WebGLOrbsProps {
  cssFallbackPreset?: "sparse" | "scattered";
}

export default function OrbBackground({
  cssFallbackPreset = "sparse",
  ...webglProps
}: OrbBackgroundProps) {
  const tier = useOrbTier();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [tier]);

  if (tier === "static") return null;
  if (tier === "css")
    return <FloatingOrbs preset={cssFallbackPreset} />;

  return <WebGLOrbs {...webglProps} />;
}
