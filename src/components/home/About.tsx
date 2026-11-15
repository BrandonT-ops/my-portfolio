"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";
import Portrait from "@/components/ui/Portrait";
import { about } from "@/data/site";

const STATEMENT =
  "I design and build digital products end to end, then teach others to do the same. Engineering, product and community — built by the same hands.";
const EMPHASIS = new Set(["teach", "hands."]);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".about-word",
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from(".about-timeline li", {
          xPercent: -6,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-timeline", start: "top 85%", once: true },
        });
        gsap.from(".about-rule", {
          scaleX: 0,
          duration: 1.6,
          ease: "expo.inOut",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-skills", start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} aria-labelledby="about-label" className="relative bg-paper">
      <div className="mx-auto max-w-wide px-5 pb-32 pt-32 sm:px-10 sm:pb-48 sm:pt-48">
        <p id="about-label" className="label mb-12 sm:mb-16" data-reveal>
          <span className="text-accent">02</span> — About
        </p>

        <p className="about-statement max-w-[22ch] font-display text-[clamp(2.25rem,5.6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className={`about-word ${EMPHASIS.has(w) ? "text-accent" : ""}`}>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-28 grid gap-16 sm:mt-40 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Portrait />
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted" data-reveal-stagger>
              {about.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            <p className="label mb-6 mt-20" data-reveal>
              Journey
            </p>
            <ol className="about-timeline border-t border-ink/15">
              {about.timeline.map((item) => (
                <li
                  key={item.text}
                  className="group grid grid-cols-[5rem_1fr] gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-highlight/20"
                >
                  <span className="font-mono text-xs leading-7 text-accent">{item.year}</span>
                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="about-skills mt-28 grid gap-14 sm:mt-40 sm:grid-cols-2 lg:grid-cols-4">
          {[...about.skills, { group: "Services", items: about.services }].map((s, i) => (
            <div key={s.group}>
              <div className="about-rule mb-6 h-px origin-left bg-ink" />
              <p className="label mb-6">
                <span className="text-accent">0{i + 1}</span> {s.group}
              </p>
              <ul className="space-y-3 text-lg" data-reveal-stagger>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
