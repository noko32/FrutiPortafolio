"use client";

let _prefersReduced: boolean | null = null;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (_prefersReduced === null) {
    _prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }
  return _prefersReduced;
}
