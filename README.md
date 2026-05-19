# pabloarmenta.dev

Personal portfolio site — a Frutiger Aero-inspired experience built to showcase front-end craft and full-stack capability.

**Live:** [pabloarmenta.dev](https://pabloarmenta.dev)

## Technical Highlights

- **Procedural WebGL shader orbs** with tiered rendering: WebGL on capable desktops, CSS keyframe fallback on mobile, static on `prefers-reduced-motion`
- **Scroll-driven GSAP animations** with RAF lifecycle management — canvases pause when off-screen, resume on viewport entry
- **Adaptive OKLCH color system** with per-section hue rotation, reactive to light/dark mode via `useSyncExternalStore`
- **Layered visual composition:** section background → ambient glow (radial washes + blurred neon blobs) → shader orbs → glassmorphic cards → content
- **Fully static build** (Lighthouse 98–100 across all categories) despite having a server-action contact form with rate limiting and honeypot protection
- **Accessibility:** `prefers-reduced-motion` respected at three independent layers (WebGL init gate, GSAP skip, CSS `@media` gate)

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, OKLCH design tokens |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll |
| Graphics | Vanilla WebGL 1.0 (procedural fragment shaders, simplex noise) |
| Email | Resend (server action) |
| Hosting | Vercel (static, Fluid Compute for actions) |

## Architecture

The rendering tier is detected at mount via `useOrbTier`:
1. Probe `canvas.getContext("webgl")` success
2. Heuristic: `maxTouchPoints > 0 && innerWidth < 1024` → mobile
3. `prefers-reduced-motion: reduce` → static (no animation)

Each section gets its own `OrbBackground` wrapper that renders the appropriate tier. WebGL instances use ScrollTrigger to gate their RAF loops — at most 1–2 canvases animate simultaneously despite 5 being mounted.

## Local Development

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Contact form email delivery (get one at [resend.com](https://resend.com)) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap (defaults to `https://pabloarmenta.dev`) |

## License

MIT
