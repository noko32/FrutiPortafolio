"use client";

import { useEffect, useRef } from "react";

/**
 * Melomano card Spider-Net taste — per-leaf sway from PresenceNet.
 * Visual only: no click / Back / API.
 */

type Leaf = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  r: number;
  r0: number;
  vx: number;
  vy: number;
  hue: number;
  speaker: boolean;
};

const V = 360;
/** Hub under the card’s right edge — enough left room for full rings (r≤130). */
const HUB = { ox: 132, oy: 150 };
/** Must keep hub CSS x under the card: tuck > hub_ox/V * (tuck+spill). */
const TUCK_PX = 180;
const SPILL_PX = 300;

/** Right-crawl fan — radii long enough that rings + nodes clear the card. */
const FAN: { angle: number; radius: number; hue: number; speaker?: boolean }[] =
  [
    { angle: -55, radius: 72, hue: 160 },
    { angle: -38, radius: 98, hue: 210 },
    { angle: -20, radius: 84, hue: 280 },
    { angle: -5, radius: 118, hue: 25 },
    { angle: 12, radius: 90, hue: 160 },
    { angle: 28, radius: 130, hue: 210, speaker: true },
    { angle: 44, radius: 96, hue: 280 },
    { angle: -48, radius: 142, hue: 25 },
    { angle: 6, radius: 155, hue: 210 },
    { angle: 36, radius: 112, hue: 160 },
  ];

function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - x1) * dx + (py - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const sx = x1 + t * dx;
  const sy = y1 + t * dy;
  return { d: Math.hypot(px - sx, py - sy), sx, sy, t };
}

function drawSpeaker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hot: boolean,
) {
  const s = hot ? 1.15 : 1;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.fillStyle = "oklch(18% 0.02 260 / 0.92)";
  ctx.strokeStyle = hot
    ? "oklch(90% 0.06 280 / 0.85)"
    : "oklch(85% 0.05 260 / 0.7)";
  ctx.lineWidth = 1.4;
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = hot
    ? "oklch(92% 0.04 280 / 0.95)"
    : "oklch(85% 0.04 260 / 0.9)";
  ctx.beginPath();
  // cone
  ctx.moveTo(-5, -3.5);
  ctx.lineTo(-1, -3.5);
  ctx.lineTo(4, -7);
  ctx.lineTo(4, 7);
  ctx.lineTo(-1, 3.5);
  ctx.lineTo(-5, 3.5);
  ctx.closePath();
  ctx.fill();
  // waves
  ctx.strokeStyle = ctx.fillStyle as string;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(5, 0, 3.5, -0.9, 0.9);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(5, 0, 6.5, -0.9, 0.9);
  ctx.stroke();
  ctx.restore();
}

export default function SpiderNetCrawl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const leaves: Leaf[] = FAN.map((f) => {
      const a = (f.angle * Math.PI) / 180;
      const ox = HUB.ox + Math.cos(a) * f.radius;
      const oy = HUB.oy + Math.sin(a) * f.radius;
      return {
        ox,
        oy,
        x: ox,
        y: oy,
        r: 3.6,
        r0: 3.6,
        vx: 0,
        vy: 0,
        hue: f.hue,
        speaker: Boolean(f.speaker),
      };
    });

    const hub = { x: HUB.ox, y: HUB.oy, ox: HUB.ox, oy: HUB.oy, r: 5 };
    const pointer = { x: HUB.ox, y: HUB.oy, inside: false };

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = reduceMq.matches;
    const onReduce = () => {
      reduce = reduceMq.matches;
    };
    reduceMq.addEventListener("change", onReduce);

    /** Hit area = card slot + spill. */
    function mapPointer(clientX: number, clientY: number) {
      const slot = hostRef.current?.parentElement;
      if (!slot) return;
      const sr = slot.getBoundingClientRect();
      const pad = 56;
      if (
        clientX < sr.left - pad ||
        clientX > sr.right + SPILL_PX ||
        clientY < sr.top - pad ||
        clientY > sr.bottom + pad
      ) {
        pointer.inside = false;
        return;
      }
      const cr = canvas!.getBoundingClientRect();
      pointer.x = ((clientX - cr.left) / Math.max(cr.width, 1)) * V;
      pointer.y = ((clientY - cr.top) / Math.max(cr.height, 1)) * (V * 0.9);
      pointer.inside = true;
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.buttons === 0 && !e.isPrimary) return;
      mapPointer(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => mapPointer(e.clientX, e.clientY);
    const onUp = () => {
      pointer.inside = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    let raf = 0;
    let alive = true;
    let t0 = performance.now();

    function frame(now: number) {
      if (!alive) return;
      const t = (now - t0) * 0.001;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;
      if (!cssW || !cssH) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const bw = Math.floor(cssW * dpr);
      const bh = Math.floor(cssH * dpr);
      if (canvas!.width !== bw || canvas!.height !== bh) {
        canvas!.width = bw;
        canvas!.height = bh;
      }

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cssW, cssH);
      ctx!.save();

      // Fit virtual net: hub near left of this wide canvas (= under card right edge).
      const scale = Math.min(cssW / V, cssH / (V * 0.9));
      ctx!.translate(0, (cssH - V * 0.9 * scale) / 2);
      ctx!.scale(scale, scale);

      const px = pointer.inside ? pointer.x : hub.ox;
      const py = pointer.inside ? pointer.y : hub.oy;

      // --- Per-leaf spring (PresenceNet) ---
      leaves.forEach((L, i) => {
        const dx = px - L.ox;
        const dy = py - L.oy;
        const dist = Math.hypot(dx, dy) || 1;
        const sway =
          pointer.inside && !reduce ? Math.min(18, 260 / dist) : 0;
        const idleX = !pointer.inside && !reduce ? Math.sin(t * 0.9 + i) * 1.4 : 0;
        const idleY =
          !pointer.inside && !reduce ? Math.cos(t * 0.7 + i * 0.6) * 1.1 : 0;
        const tx = L.ox + (dx / dist) * sway * 0.55 + idleX;
        const ty = L.oy + (dy / dist) * sway * 0.55 + idleY;
        L.vx += (tx - L.x) * 0.12;
        L.vy += (ty - L.y) * 0.12;
        L.vx *= 0.78;
        L.vy *= 0.78;
        if (reduce) {
          L.x = L.ox;
          L.y = L.oy;
          L.vx = 0;
          L.vy = 0;
        } else {
          L.x += L.vx;
          L.y += L.vy;
        }
        const near = Math.hypot(px - L.x, py - L.y);
        L.r =
          L.r0 *
          (near < 48 && pointer.inside && !reduce
            ? 1.35 + (1 - near / 48) * 0.7
            : 1);
      });

      {
        const dx = px - hub.ox;
        const dy = py - hub.oy;
        const dist = Math.hypot(dx, dy) || 1;
        const sway =
          pointer.inside && !reduce ? Math.min(6, 120 / dist) : 0;
        hub.x += (hub.ox + (dx / dist) * sway * 0.35 - hub.x) * 0.15;
        hub.y += (hub.oy + (dy / dist) * sway * 0.35 - hub.y) * 0.15;
        if (reduce) {
          hub.x = hub.ox;
          hub.y = hub.oy;
        }
      }

      // Full rings — complete circles so they meet the card instead of cutting off mid-arc
      for (const [r, dash] of [
        [28, false],
        [58, true],
        [92, true],
        [130, false],
      ] as const) {
        ctx!.beginPath();
        ctx!.strokeStyle = "oklch(82% 0.05 260 / 0.38)";
        ctx!.lineWidth = 1;
        if (dash) ctx!.setLineDash([3, 3]);
        else ctx!.setLineDash([]);
        ctx!.arc(hub.x, hub.y, r, 0, Math.PI * 2);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      // Cross-links between leaves (sorted by rest angle ≈ fan order)
      for (let i = 0; i < leaves.length - 1; i++) {
        const a = leaves[i]!;
        const b = leaves[i + 1]!;
        const seg = distToSegment(px, py, a.x, a.y, b.x, b.y);
        const hot = pointer.inside && !reduce && seg.d < 14;
        ctx!.beginPath();
        ctx!.strokeStyle = hot
          ? "oklch(88% 0.06 280 / 0.55)"
          : "oklch(80% 0.04 260 / 0.32)";
        ctx!.lineWidth = hot ? 1.7 : 0.95;
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Rods hub → leaf (each rod follows its own leaf)
      for (const L of leaves) {
        const seg = distToSegment(px, py, hub.x, hub.y, L.x, L.y);
        const hot =
          pointer.inside &&
          !reduce &&
          seg.d < 16 &&
          seg.t > 0.06 &&
          seg.t < 0.94;
        ctx!.beginPath();
        ctx!.strokeStyle = hot
          ? `oklch(90% 0.1 ${L.hue} / 0.85)`
          : `oklch(80% 0.09 ${L.hue} / 0.62)`;
        ctx!.lineWidth = hot ? 2.4 : 1.45;
        ctx!.moveTo(hub.x, hub.y);
        ctx!.lineTo(L.x, L.y);
        ctx!.stroke();
        if (hot) {
          ctx!.beginPath();
          ctx!.fillStyle = "oklch(92% 0.05 280 / 0.8)";
          ctx!.arc(seg.sx, seg.sy, 3.8, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Nodes
      for (const L of leaves) {
        if (L.speaker) continue;
        const hot = L.r > L.r0 * 1.12;
        ctx!.beginPath();
        ctx!.fillStyle = hot
          ? `oklch(90% 0.08 ${L.hue} / 0.7)`
          : `oklch(82% 0.06 ${L.hue} / 0.45)`;
        ctx!.strokeStyle = "oklch(95% 0.02 260 / 0.5)";
        ctx!.lineWidth = 1;
        ctx!.arc(L.x, L.y, L.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
      }

      // Hub
      ctx!.beginPath();
      ctx!.fillStyle = "oklch(75% 0.08 280 / 0.55)";
      ctx!.strokeStyle = "oklch(95% 0.03 280 / 0.55)";
      ctx!.lineWidth = 1.2;
      ctx!.arc(hub.x, hub.y, hub.r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.stroke();

      const speaker = leaves.find((L) => L.speaker);
      if (speaker) {
        drawSpeaker(
          ctx!,
          speaker.x,
          speaker.y,
          speaker.r > speaker.r0 * 1.12,
        );
      }

      ctx!.restore();
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      reduceMq.removeEventListener("change", onReduce);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 z-[1] overflow-hidden"
      style={{
        // Tuck under card + spill to the right; overflow-y clips rings to card height
        left: `calc(100% - ${TUCK_PX}px)`,
        width: TUCK_PX + SPILL_PX,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
