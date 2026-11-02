"use client";

import { useRef } from "react";
import { gsap, useGSAP, DESKTOP } from "@/lib/motion";

/**
 * A ring that trails the pointer (the native cursor stays visible).
 * It grows over links and shows a label over elements with data-cursor="View".
 * Elements with data-magnetic are pulled gently towards the pointer.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP} and (pointer: fine)`, () => {
      const el = ring.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      let magnet: HTMLElement | null = null;

      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          gsap.to(magnet, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.3,
            y: (e.clientY - (r.top + r.height / 2)) * 0.3,
            duration: 0.6,
            ease: "power3",
          });
        }
      };

      const over = (e: PointerEvent) => {
        const t = e.target as Element;
        const labelled = t.closest<HTMLElement>("[data-cursor]");
        const interactive = t.closest("a, button");
        const m = t.closest<HTMLElement>("[data-magnetic]");
        if (m !== magnet) {
          if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
          magnet = m;
        }
        if (labelled) {
          label.current!.textContent = labelled.dataset.cursor ?? "";
          gsap.to(el, { width: 96, height: 96, backgroundColor: "rgb(158 0 49)", borderColor: "rgb(158 0 49)", duration: 0.4 });
          gsap.to(label.current, { autoAlpha: 1, duration: 0.3 });
        } else {
          gsap.to(label.current, { autoAlpha: 0, duration: 0.2 });
          gsap.to(el, {
            width: interactive ? 56 : 28,
            height: interactive ? 56 : 28,
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(255,255,255,1)",
            duration: 0.4,
          });
        }
      };

      const enter = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });

      window.addEventListener("pointermove", move);
      document.addEventListener("pointerover", over);
      document.documentElement.addEventListener("pointerenter", enter);
      document.documentElement.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerenter", enter);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-7 w-7 items-center justify-center rounded-full border border-white mix-blend-difference lg:flex"
    >
      <span
        ref={label}
        className="invisible font-mono text-[11px] uppercase tracking-[0.14em] text-white"
      />
    </div>
  );
}
