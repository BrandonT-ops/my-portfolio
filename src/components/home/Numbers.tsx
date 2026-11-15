"use client";

import { useRef } from "react";
import Atmosphere from "@/components/motion/Atmosphere";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";
import { projects } from "@/data/projects";

/** Real figures only: the project count is computed, the rest come from Brandon's CVs. */
const STATS = [
  { value: projects.length, suffix: "", label: "projects shipped", note: "Web, mobile and embedded" },
  { value: 100000, suffix: "+", label: "forest records managed", note: "Restore Forest Cameroon" },
  { value: 400, suffix: "+", label: "exam candidates registered", note: "ESIGN entrance exam, 99.9% uptime" },
  { value: 15, suffix: "", label: "people led in one Scrum team", note: "Autogex, 3 sprints" },
];

const format = (n: number) => Math.round(n).toLocaleString("en-US");

export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el, i) => {
          const end = Number(el.dataset.value);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: end,
            duration: 2.2,
            delay: i * 0.12,
            ease: "expo.out",
            onUpdate: () => (el.textContent = format(counter.v)),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.from(".stat-rule", {
          scaleX: 0,
          duration: 1.6,
          ease: "expo.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="By the numbers" className="scene-dark">
      <Atmosphere />
      <div className="mx-auto max-w-wide px-5 py-28 sm:px-10 sm:py-40">
        <p className="label mb-14 sm:mb-20" data-reveal>
          <span className="text-accent">↳</span> By the numbers
        </p>
        <dl className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-rule mb-6 h-px origin-left bg-paper/30" />
              <dd className="font-display text-[clamp(3rem,4.3vw,5rem)] font-medium leading-none tracking-[-0.04em]">
                <span className="stat-value tabular-nums" data-value={s.value}>
                  {format(s.value)}
                </span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
              <dt className="mt-5 text-lg text-paper">{s.label}</dt>
              <p className="label mt-2">{s.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
