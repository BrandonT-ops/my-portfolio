"use client";

import { useRef } from "react";
import { gsap, useGSAP, markIntroDone } from "@/lib/motion";

/** Runs before first paint (inlined in <head>): flags JS + motion and skips the intro on repeat visits. */
export const introScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion')}if(sessionStorage.getItem('intro-seen')){d.classList.add('intro-seen')}}catch(e){}})();`;

/**
 * First-visit intro: a counter runs to 100, the name flashes in, and the
 * panel lifts away to reveal the hero. Hidden entirely by CSS when motion is
 * reduced, when JS is off, or after the first visit in this tab.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("js-motion") || html.classList.contains("intro-seen")) {
        markIntroDone();
        return;
      }
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}

      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      tl.to(counter, {
        v: 100,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .from(".pl-word", { yPercent: 110, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.2)
        .to(".pl-bar", { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0)
        .to(".pl-word", { yPercent: -110, duration: 0.7, stagger: 0.05, ease: "expo.in" }, "+=0.1")
        .to(root.current, { yPercent: -100, duration: 1.1 }, "-=0.25")
        .add(markIntroDone, "-=0.75")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[80] flex-col justify-between bg-ink p-6 text-paper sm:p-10"
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-[0.14em] text-paper/50">
        <span>Portfolio</span>
        <span>©{new Date().getFullYear()}</span>
      </div>
      <div className="overflow-hidden">
        <p className="flex gap-[0.25em] font-display text-[clamp(2.5rem,9vw,8rem)] font-medium leading-none">
          <span className="pl-word inline-block">Brandon</span>
          <span className="pl-word inline-block">
            Tapiba<span className="text-accent">.</span>
          </span>
        </p>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/50">Loading</span>
          <span ref={count} className="font-display text-6xl font-medium tabular-nums sm:text-8xl">
            000
          </span>
        </div>
        <div className="pl-bar h-px origin-left scale-x-0 bg-paper/60" />
      </div>
    </div>
  );
}
