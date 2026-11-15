"use client";

import { useEffect, useRef } from "react";

/**
 * A field of dots on a canvas. A slow wave travels through it; near the
 * pointer the dots are pushed away and light up, and a click sends a ripple.
 * Draws only while on screen. With reduced motion it renders once, still.
 */
export default function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const style = getComputedStyle(document.documentElement);
    const rgb = (name: string) => style.getPropertyValue(name).trim().split(/\s+/).join(",");
    const PAPER = rgb("--paper");
    const HOT = rgb("--highlight");

    const GAP = 30;
    const RADIUS = 170;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const ripples: { x: number; y: number; t: number }[] = [];

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;
      const t = time / 1000;

      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          let px = x;
          let py = y;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          let heat = 0;
          if (dist < RADIUS) {
            heat = 1 - dist / RADIUS;
            const push = heat * heat * 26;
            px += (dx / (dist || 1)) * push;
            py += (dy / (dist || 1)) * push;
          }
          for (const rp of ripples) {
            const rd = Math.hypot(x - rp.x, y - rp.y);
            const front = (t - rp.t) * 520;
            const band = 1 - Math.min(Math.abs(rd - front) / 60, 1);
            if (band > 0) {
              const fade = Math.max(0, 1 - (t - rp.t) / 1.6);
              heat = Math.max(heat, band * fade);
              py -= band * fade * 8;
            }
          }
          const wave = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.018 - t * 0.9);
          const alpha = 0.07 + wave * 0.1 + heat * 0.75;
          const size = 1.1 + heat * 2.2;
          ctx.fillStyle = heat > 0.08 ? `rgba(${HOT},${alpha})` : `rgba(${PAPER},${alpha})`;
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
      }
      while (ripples.length && t - ripples[0].t > 1.6) ripples.shift();
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      frame = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const leave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    const down = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() / 1000 });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    if (reduce) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerdown", down);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerdown", down);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`} />;
}
