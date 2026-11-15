"use client";

import { useRef } from "react";
import Link from "next/link";
import Atmosphere from "@/components/motion/Atmosphere";
import { gsap, useGSAP, onIntroDone, MOTION_OK } from "@/lib/motion";
import { site } from "@/data/site";

const Chars = ({ text }: { text: string }) => (
  <>
    {text.split("").map((c, i) => (
      <span key={i} className="hero-char inline-block will-change-transform">
        {c}
      </span>
    ))}
  </>
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .set("[data-hero-hide]", { visibility: "visible" })
          .from(".hero-char", { yPercent: 120, rotate: 6, duration: 1.6, stagger: 0.035 })
          .from(".hero-fade", { y: 30, autoAlpha: 0, duration: 1.4, stagger: 0.1 }, "-=1.2")
          .from(".hero-rule", { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, "-=1.5");
        const off = onIntroDone(() => intro.play());

        // Cinematic exit: the name drifts apart and fades as the next scene arrives.
        const exit = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        exit
          .to(".hero-line-1", { xPercent: -12, ease: "none" }, 0)
          .to(".hero-line-2", { xPercent: 12, ease: "none" }, 0)
          .to(".hero-name", { yPercent: 35, scale: 0.92, autoAlpha: 0.15, ease: "none" }, 0)
          .to(".hero-meta", { yPercent: -60, autoAlpha: 0, ease: "none" }, 0)
          .to(".aurora", { yPercent: 25, ease: "none" }, 0);

        return () => {
          off();
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="scene-dark flex min-h-[100svh] flex-col pt-16">
      <Atmosphere />

      <div className={`mx-auto flex w-full max-w-wide flex-1 flex-col justify-between px-5 pt-10 sm:px-10 sm:pt-16 ${site.showBuddy ? "pb-28 sm:pb-32" : "pb-10 sm:pb-14"}`}>
        <div className="hero-meta flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
          <span data-hero-hide className="hero-fade inline-flex items-center gap-2 text-paper">
            {site.available && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
                </span>
                Available for projects
              </>
            )}
          </span>
          <span data-hero-hide className="hero-fade">
            {site.role} — {site.location}
          </span>
        </div>

        <h1 className="hero-name my-12 origin-bottom text-[clamp(4rem,17vw,17rem)] font-medium leading-[0.82] tracking-[-0.04em]">
          <span data-hero-hide className="hero-line-1 block overflow-hidden pb-[0.04em]">
            <Chars text={first} />
          </span>
          <span data-hero-hide className="hero-line-2 block overflow-hidden pb-[0.04em] text-right sm:pr-[4vw]">
            <Chars text={last} />
            <span className="hero-char inline-block text-accent">.</span>
          </span>
        </h1>

        <div className="hero-meta">
          <div data-hero-hide className="hero-rule mb-8 h-px origin-left bg-paper/20" />
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <p data-hero-hide className="hero-fade max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl md:col-span-6">
              <span className="text-paper">{site.role} & creative builder.</span> {site.tagline}
            </p>
            <div data-hero-hide className="hero-fade flex flex-wrap items-center gap-6 md:col-span-6 md:justify-end">
              <Link
                href="/#work"
                data-magnetic
                className="group inline-flex items-center gap-3 rounded-full border border-paper/25 bg-paper/5 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-paper backdrop-blur transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                Explore the work
                <span className="transition-transform duration-500 group-hover:translate-y-1">↓</span>
              </Link>
              {site.resumeUrl ? (
                <a href={site.resumeUrl} className="link font-mono text-xs uppercase tracking-[0.12em]">
                  Résumé ↗
                </a>
              ) : (
                <Link href="/#contact" className="link font-mono text-xs uppercase tracking-[0.12em]">
                  Get in touch
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
