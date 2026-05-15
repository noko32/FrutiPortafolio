"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

const VERT_SHADER = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG_SHADER = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 backgroundColor;
uniform float u_scrollVelocity;
uniform vec3 orbColor1A, orbColor1B;
uniform vec3 orbColor2A, orbColor2B;
uniform vec3 orbColor3A, orbColor3B;
uniform vec3 orbColor4A, orbColor4B;
uniform vec3 orbColor5A, orbColor5B;
varying vec2 vUv;

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(.1031, .11369, .13787));
  p3 += dot(p3, p3.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z) * p3.zyx);
}

float snoise3(vec3 p) {
  const float K1 = 0.333333333;
  const float K2 = 0.166666667;
  vec3 i = floor(p + (p.x+p.y+p.z)*K1);
  vec3 d0 = p - (i - (i.x+i.y+i.z)*K2);
  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e*(1.0-e.zxy);
  vec3 i2 = 1.0 - e.zxy*(1.0-e);
  vec3 d1 = d0 - (i1-K2);
  vec3 d2 = d0 - (i2-K1);
  vec3 d3 = d0 - 0.5;
  vec4 h = max(0.6-vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
  vec4 n = h*h*h*h * vec4(dot(d0,hash33(i)), dot(d1,hash33(i+i1)), dot(d2,hash33(i+i2)), dot(d3,hash33(i+1.0)));
  return dot(vec4(31.316), n);
}

vec4 extractAlpha(vec3 c) {
  float a = max(max(c.r, c.g), c.b);
  return vec4(c / (a + 1e-5), a);
}

float light1(float i, float a, float d) { return i / (1.0+d*a); }
float light2(float i, float a, float d) { return i / (1.0+d*d*a); }

struct Orb {
  vec2 center;
  float radius;
  float speed;
  vec3 color1;
  vec3 color2;
};

vec4 drawOrb(vec2 uv, Orb orb) {
  float vel = u_scrollVelocity;
  float squash = 1.0 + vel * 0.15;
  float stretch = 1.0 - vel * 0.08;

  vec2 localUv = (uv - orb.center) / orb.radius;
  localUv.x *= squash;
  localUv.y *= stretch;

  float len = length(localUv);
  if (len > 1.8) return vec4(0.0);

  float ang = atan(localUv.y, localUv.x);
  float invLen = len > 0.0 ? 1.0/len : 0.0;
  float noiseScale = 0.65 + abs(vel) * 0.8;
  float noiseSpeed = orb.speed + abs(vel) * 2.0;
  float n0 = snoise3(vec3(localUv * noiseScale, iTime * noiseSpeed)) * 0.5 + 0.5;
  float innerRadius = 0.6;
  float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
  float d0 = distance(localUv, (r0*invLen)*localUv);
  float v0 = light1(1.0, 10.0, d0);
  v0 *= smoothstep(r0*1.05, r0, len);

  float cl = cos(ang + iTime * 1.5 * orb.speed) * 0.5 + 0.5;

  float a2 = iTime * -0.8 * orb.speed;
  vec2 pos = vec2(cos(a2), sin(a2)) * r0;
  float d = distance(localUv, pos);
  float v1 = light2(1.5, 5.0, d);
  v1 *= light1(1.0, 50.0, d0);

  float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0*0.5), len);
  float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

  vec3 colBase = mix(orb.color1, orb.color2, cl);
  vec3 deepCol = mix(backgroundColor * 0.5, colBase, v0);
  deepCol = (deepCol + v1) * v2 * v3;
  deepCol = clamp(deepCol, 0.0, 1.0);
  return extractAlpha(deepCol);
}

void main() {
  vec2 fc = vUv * iResolution.xy;
  vec2 uv = fc / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  uv.x *= aspect;

  Orb orbs[5];
  orbs[0] = Orb(vec2(0.85*aspect, 0.8), 0.35, 0.4, orbColor1A, orbColor1B);
  orbs[1] = Orb(vec2(0.15*aspect, 0.45), 0.22, 0.55, orbColor2A, orbColor2B);
  orbs[2] = Orb(vec2(0.72*aspect, 0.25), 0.15, 0.65, orbColor3A, orbColor3B);
  orbs[3] = Orb(vec2(0.28*aspect, 0.15), 0.10, 0.75, orbColor4A, orbColor4B);
  orbs[4] = Orb(vec2(0.10*aspect, 0.85), 0.20, 0.50, orbColor5A, orbColor5B);

  vec4 result = vec4(0.0);
  for (int i = 0; i < 5; i++) {
    vec4 orb = drawOrb(uv, orbs[i]);
    result.rgb = result.rgb * (1.0 - orb.a * 0.6) + orb.rgb * orb.a * 0.6;
    result.a = max(result.a, orb.a * 0.6);
  }

  gl_FragColor = vec4(result.rgb * result.a, result.a);
}`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function HeroOrbsWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, "position");
    const uvLoc = gl.getAttribLocation(prog, "uv");
    const timeLoc = gl.getUniformLocation(prog, "iTime");
    const resLoc = gl.getUniformLocation(prog, "iResolution");
    const bgLoc = gl.getUniformLocation(prog, "backgroundColor");
    const velLoc = gl.getUniformLocation(prog, "u_scrollVelocity");

    const orbColorLocs = Array.from({ length: 5 }, (_, i) => ({
      a: gl.getUniformLocation(prog, `orbColor${i + 1}A`),
      b: gl.getUniformLocation(prog, `orbColor${i + 1}B`),
    }));

    const verts = new Float32Array([
      -1, -1, 0, 0, 3, -1, 2, 0, -1, 3, 0, 2,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    type RGB = [number, number, number];
    type OrbPalette = { a: RGB; b: RGB }[];

    const LIGHT_ORBS: OrbPalette = [
      { a: [0.85, 0.90, 0.95], b: [0.55, 0.65, 0.75] },
      { a: [0.80, 0.88, 0.95], b: [0.50, 0.60, 0.70] },
      { a: [0.90, 0.92, 0.95], b: [0.60, 0.70, 0.80] },
      { a: [0.88, 0.90, 0.94], b: [0.55, 0.62, 0.72] },
      { a: [0.82, 0.88, 0.93], b: [0.52, 0.62, 0.72] },
    ];

    const DARK_ORBS: OrbPalette = [
      { a: [0.55, 0.70, 0.90], b: [0.25, 0.35, 0.60] },
      { a: [0.40, 0.75, 0.70], b: [0.20, 0.50, 0.45] },
      { a: [0.65, 0.60, 0.85], b: [0.35, 0.30, 0.60] },
      { a: [0.50, 0.72, 0.82], b: [0.28, 0.45, 0.55] },
      { a: [0.60, 0.68, 0.80], b: [0.30, 0.40, 0.55] },
    ];

    function readSurfaceDeep(): RGB {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--aero-surface-deep")
        .trim();
      const el = document.createElement("div");
      el.style.color = raw;
      document.body.appendChild(el);
      const resolved = getComputedStyle(el).color;
      document.body.removeChild(el);
      const m = resolved.match(/[\d.]+/g);
      if (m && m.length >= 3) {
        return [parseFloat(m[0]) / 255, parseFloat(m[1]) / 255, parseFloat(m[2]) / 255];
      }
      return [0.04, 0.03, 0.07];
    }

    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    let bg: RGB = readSurfaceDeep();
    let orbPalette = darkMq.matches ? DARK_ORBS : LIGHT_ORBS;

    function applyTheme() {
      bg = readSurfaceDeep();
      orbPalette = darkMq.matches ? DARK_ORBS : LIGHT_ORBS;
    }

    const onThemeChange = () => applyTheme();
    darkMq.addEventListener("change", onThemeChange);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas!.clientWidth * dpr;
      const h = canvas!.clientHeight * dpr;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    let shaderTime = 0;
    let lastFrameMs = performance.now();
    let running = false;
    let rawVelocity = 0;
    let smoothVelocity = 0;

    function loop() {
      if (!running) return;
      const now = performance.now();
      shaderTime += (now - lastFrameMs) * 0.001;
      lastFrameMs = now;

      smoothVelocity += (rawVelocity - smoothVelocity) * 0.08;
      if (Math.abs(smoothVelocity) < 0.001) smoothVelocity = 0;

      resize();
      gl!.uniform1f(timeLoc, shaderTime);
      gl!.uniform3f(resLoc, canvas!.width, canvas!.height, canvas!.width / canvas!.height);
      gl!.uniform3f(bgLoc, bg[0], bg[1], bg[2]);
      gl!.uniform1f(velLoc, smoothVelocity);
      for (let i = 0; i < 5; i++) {
        const { a, b } = orbPalette[i];
        gl!.uniform3f(orbColorLocs[i].a, a[0], a[1], a[2]);
        gl!.uniform3f(orbColorLocs[i].b, b[0], b[1], b[2]);
      }
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      lastFrameMs = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafRef.current);
    }

    resize();
    start();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: start,
      onEnterBack: start,
      onLeave: stop,
      onLeaveBack: stop,
      onUpdate: (self) => {
        const v = self.getVelocity();
        rawVelocity = Math.sign(v) * Math.min(Math.abs(v) / 3000, 1);
      },
    });

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      trigger.kill();
      window.removeEventListener("resize", onResize);
      darkMq.removeEventListener("change", onThemeChange);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div ref={sectionRef} className="pointer-events-none absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
