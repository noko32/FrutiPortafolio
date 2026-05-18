"use client";

import { useActionState, useRef } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import OrbBackground from "@/components/ui/orb-background";
import AmbientGlow from "@/components/ui/ambient-glow";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import type { OrbDef, RGB } from "@/components/ui/webgl-orbs";

const CONTACT_ORBS: OrbDef[] = [
  { center: [0.78, 0.30], radius: 0.20, speed: 0.45 },
  { center: [0.22, 0.72], radius: 0.16, speed: 0.55 },
];

const CONTACT_LIGHT: { a: RGB; b: RGB }[] = [
  { a: [0.95, 0.88, 0.90], b: [0.80, 0.60, 0.65] },
  { a: [0.93, 0.86, 0.88], b: [0.78, 0.58, 0.62] },
];

const CONTACT_DARK_NEON: { a: RGB; b: RGB }[] = [
  { a: [1.00, 0.92, 0.95], b: [0.95, 0.40, 0.55] },
  { a: [0.98, 0.90, 0.93], b: [0.90, 0.35, 0.50] },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/noko32",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pablo-armenta",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const EMAIL = "pablocesararmenta@gmail.com";

const initialState: ContactState = { success: false, error: null };

export default function Contact() {
  const lenis = useLenis();
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const copiedRef = useRef<HTMLSpanElement>(null);

  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL);
    if (copiedRef.current) {
      copiedRef.current.textContent = "Copied!";
      setTimeout(() => {
        if (copiedRef.current) copiedRef.current.textContent = "Copy";
      }, 2000);
    }
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center justify-center bg-surface-deep px-6 py-24"
    >
      <AmbientGlow preset="contact" />
      <OrbBackground
        orbs={CONTACT_ORBS}
        lightPalette={CONTACT_LIGHT}
        darkPalette={CONTACT_DARK_NEON}
        compositeAlpha={0.85}
        bloomIntensity={0.3}
        cssFallbackPreset="sparse"
      />
      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <h2 className="text-4xl font-bold text-text-inverse sm:text-5xl">
          Get in touch
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-inverse/60">
          I&apos;m looking for my next full-time remote role.
          If you think I could be a good fit, I&apos;d love to talk.
        </p>

        <form
          ref={formRef}
          action={formAction}
          className="mt-10 flex flex-col gap-4 text-left"
        >
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 overflow-hidden opacity-0"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-text-inverse/60">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="glass-input"
                aria-invalid={state.error && !state.success ? "true" : undefined}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-inverse/60">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="glass-input"
                aria-invalid={state.error && !state.success ? "true" : undefined}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-inverse/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What would you like to talk about?"
              className="glass-input resize-none"
              aria-invalid={state.error && !state.success ? "true" : undefined}
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-400" role="alert">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-green-400" role="status">Message sent! I&apos;ll get back to you soon.</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="gloss-button mt-2 px-8 py-3 text-sm font-semibold disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send message"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-text-inverse/40">
          <span>Or email me directly:</span>
          <a
            href={`mailto:${EMAIL}`}
            className="text-text-inverse/60 underline underline-offset-2 transition-colors hover:text-text-inverse"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-glass-border bg-glass-bg px-2 py-0.5 text-text-inverse/50 transition-colors hover:text-text-inverse"
          >
            <span ref={copiedRef}>Copy</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 px-5 py-3 text-text-inverse/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-text-inverse"
              aria-label={link.label}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <button
          onClick={() => lenis?.scrollTo("#hero")}
          className="mt-16 text-xs text-text-inverse/25 transition-colors hover:text-text-inverse/50"
        >
          ↑ Back to top
        </button>
      </div>
    </section>
  );
}
