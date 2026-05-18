"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/motion-prefs";

export interface AeroAsset {
  src: string;
  width: number;
  height: number;
  /** Tailwind positioning classes (e.g. "right-0 top-[20%]") */
  position: string;
  /** CSS width the image renders at (used for `sizes` prop) */
  displayWidth: number;
  /** Vertical scroll parallax range [from, to] in px */
  parallaxRange?: [number, number];
  /** Tailwind opacity + blend classes, can include dark: variants */
  className?: string;
}

export default function AeroDecoration({
  assets,
  className,
}: {
  assets: AeroAsset[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const assetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      assetRefs.current.forEach((el, i) => {
        if (!el) return;
        const range = assets[i].parallaxRange;
        if (!range) return;
        gsap.fromTo(
          el,
          { y: range[0] },
          {
            y: range[1],
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {assets.map((asset, i) => (
        <div
          key={asset.src}
          ref={(el) => {
            assetRefs.current[i] = el;
          }}
          className={`absolute ${asset.position}`}
        >
          <Image
            src={asset.src}
            width={asset.width}
            height={asset.height}
            sizes={`${asset.displayWidth}px`}
            alt=""
            className={asset.className ?? "opacity-80 dark:opacity-25 dark:mix-blend-screen"}
            draggable={false}
            style={{ width: asset.displayWidth, height: "auto" }}
          />
        </div>
      ))}
    </div>
  );
}
