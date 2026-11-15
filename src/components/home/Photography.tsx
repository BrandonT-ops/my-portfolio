"use client";

import { useRef } from "react";
import Atmosphere from "@/components/motion/Atmosphere";
import Marquee from "@/components/motion/Marquee";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";
import { site } from "@/data/site";

const SUBJECTS = ["Portraits", "Street", "Nature", "Events", "Product", "Abstract"] as const;

export default function Photography() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The dark panel opens up from a framed card to the full screen.
        gsap.fromTo(
          ".photo-panel",
          { clipPath: "inset(14% 8% 14% 8% round 32px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
          },
        );
        gsap.from(".photo-aperture", {
          scale: 0.4,
          rotate: -90,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "top 10%", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="photography" ref={root} aria-labelledby="photography-label" className="relative bg-paper">
      <div className="photo-panel scene-dark min-h-[100svh]">
        <Atmosphere />
        <div className="mx-auto flex min-h-[100svh] max-w-wide flex-col justify-between px-5 py-28 sm:px-10 sm:py-36">
          <div className="flex items-start justify-between gap-6">
            <p id="photography-label" className="label" data-reveal>
              <span className="text-accent">03</span> — Photography
            </p>
            {/* Aperture mark */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="photo-aperture h-20 w-20 text-paper/50 sm:h-28 sm:w-28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="50" cy="50" r="46" />
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="4"
                  x2="72"
                  y2="62"
                  transform={`rotate(${i * 60} 50 50)`}
                />
              ))}
            </svg>
          </div>

          <div className="my-16">
            <h2 data-split className="max-w-5xl text-[clamp(2.75rem,7.5vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.035em]">
              Beyond engineering, I tell stories with a camera.
            </h2>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-paper/65 sm:text-xl" data-reveal>
              A growing collection of how I see things when I&apos;m away from the keyboard —
              light, people and the places in between.
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <ul className="flex flex-wrap gap-2" data-reveal-stagger>
              {SUBJECTS.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-paper/20 bg-paper/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/75 backdrop-blur"
                >
                  {s}
                </li>
              ))}
            </ul>
            {site.photographyUrl ? (
              <a
                href={site.photographyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:bg-highlight"
              >
                View the gallery ↗
              </a>
            ) : (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-paper/55">Gallery link coming soon</p>
            )}
          </div>
        </div>

        <Marquee
          items={SUBJECTS}
          className="border-t border-paper/10 py-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.02em] text-paper/15"
        />
      </div>
    </section>
  );
}
