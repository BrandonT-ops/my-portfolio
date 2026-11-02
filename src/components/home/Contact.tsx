"use client";

import { useRef } from "react";
import Atmosphere from "@/components/motion/Atmosphere";
import { gsap, useGSAP, MOTION_OK } from "@/lib/motion";
import { site } from "@/data/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".contact-char", {
          yPercent: 115,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".contact-title", start: "top 85%", once: true },
        });
        // The horizon glow rises as the page ends.
        gsap.from(".horizon", {
          yPercent: 30,
          scale: 0.85,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: root },
  );

  const words = ["Let’s", "talk."];

  return (
    <section id="contact" ref={root} aria-labelledby="contact-label" className="scene-dark">
      <Atmosphere glows={false} horizon />
      <div className="mx-auto flex min-h-[100svh] max-w-wide flex-col justify-between px-5 pb-16 pt-32 sm:px-10 sm:pt-44">
        <p id="contact-label" className="label" data-reveal>
          <span className="text-accent">04</span> — Contact
        </p>

        <div className="my-16">
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-paper/65 sm:text-xl" data-reveal>
            Have a product to build, a team to teach, or an idea to test? I&apos;d love to hear about it.
          </p>
          <h2 className="contact-title text-[clamp(4.5rem,16vw,16rem)] font-medium leading-[0.85] tracking-[-0.045em]">
            {words.map((w, wi) => (
              <span key={w} className="mr-[0.18em] inline-flex overflow-hidden pb-[0.05em]">
                {w.split("").map((c, i) => (
                  <span
                    key={i}
                    className={`contact-char inline-block ${wi === 1 && i === w.length - 1 ? "text-accent" : ""}`}
                  >
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <a
            href={`mailto:${site.email}`}
            className="group font-display text-2xl font-medium sm:text-4xl md:col-span-7"
            data-reveal
          >
            <span className="bg-gradient-to-r from-highlight to-highlight bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_2px]">
              {site.email}
            </span>
          </a>

          <div className="flex md:col-span-5 md:justify-end" data-reveal>
            <a
              href={`mailto:${site.email}`}
              data-magnetic
              className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-accent text-center font-mono text-xs uppercase tracking-[0.12em] text-paper sm:h-44 sm:w-44"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-highlight transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-ink">
                Start a<br />conversation
              </span>
            </a>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]" data-reveal-stagger>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                {s.label} ↗
              </a>
            </li>
          ))}
          {site.photographyUrl && (
            <li>
              <a href={site.photographyUrl} target="_blank" rel="noopener noreferrer" className="link">
                Photography ↗
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
