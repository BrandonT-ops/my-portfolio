"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/motion";

/**
 * Endless ticker. Scrolling speeds it up and flips its direction with the
 * scroll direction. Static (and still readable) when motion is reduced.
 */
export default function Marquee({ items, className = "" }: { items: readonly string[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector<HTMLElement>(".mq-track")!;
        const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        let direction = 1;
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            if (self.direction !== direction) direction = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
            gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
        return () => st.kill();
      });
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 sm:px-10">{item}</span>
          <span className="text-[0.5em] opacity-70" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div className="mq-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
