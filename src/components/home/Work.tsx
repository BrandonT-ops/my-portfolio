"use client";

import { useRef } from "react";
import Link from "next/link";
import Cover from "@/components/ui/Cover";
import { gsap, useGSAP, DESKTOP } from "@/lib/motion";
import { featuredProjects, otherProjects } from "@/data/projects";

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const total = String(featuredProjects.length).padStart(2, "0");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const track = root.current!.querySelector<HTMLElement>(".work-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const n = Math.min(featuredProjects.length, Math.max(1, Math.ceil(self.progress * featuredProjects.length)));
              const el = root.current?.querySelector(".work-count");
              if (el) el.textContent = String(n).padStart(2, "0");
            },
          },
        });

        gsap.to(".work-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".work-pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Depth: covers drift against the slide, cards lift and settle as they cross the screen.
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".work-cover-inner"),
            { xPercent: -4 },
            {
              xPercent: 4,
              ease: "none",
              scrollTrigger: { containerAnimation: slide, trigger: card, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(card, {
            yPercent: 12,
            rotate: 2,
            ease: "none",
            scrollTrigger: { containerAnimation: slide, trigger: card, start: "left right", end: "left 55%", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} aria-labelledby="work-label" className="relative bg-paper">
      <div className="mx-auto max-w-wide px-5 pt-32 sm:px-10 sm:pt-48">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p id="work-label" className="label mb-8" data-reveal>
              <span className="text-accent">01</span> — Selected work
            </p>
            <h2 data-split className="max-w-4xl text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              Products built end to end — from the first sketch to the server.
            </h2>
          </div>
          <p className="label hidden motion-safe:lg:block" data-reveal>
            Scroll to explore →
          </p>
        </div>
      </div>

      <div className="work-pin relative motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:overflow-hidden">
        <div className="work-track mx-auto flex max-w-wide flex-col gap-20 px-5 py-20 sm:px-10 motion-reduce:lg:grid motion-reduce:lg:grid-cols-2 motion-reduce:lg:gap-x-16 motion-safe:lg:mx-0 motion-safe:lg:w-max motion-safe:lg:max-w-none motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:gap-[6vw] motion-safe:lg:py-0 motion-safe:lg:pl-[8vw] motion-safe:lg:pr-[8vw]">
          {featuredProjects.map((p, i) => (
            <article key={p.slug} className="work-card shrink-0 motion-safe:lg:w-[min(46vw,52rem)]" data-reveal>
              <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
                <div className="glow-card">
                  <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-ink shadow-hard transition-[transform,box-shadow] duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:shadow-[12px_12px_0_0_rgb(var(--accent))]">
                    <div className="work-cover-inner absolute inset-y-0 -left-[6%] -right-[6%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                      <Cover project={p} index={i} sizes="(min-width: 1024px) 46vw, 100vw" />
                    </div>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-[3rem_1fr] gap-x-4">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-lg text-muted">{p.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <li key={s} className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </article>
          ))}

          {otherProjects.length > 0 && (
            <aside className="shrink-0 motion-safe:lg:w-[min(34vw,32rem)]" data-reveal>
              <p className="label mb-6">Also built</p>
              <ul className="border-t border-ink/15">
                {otherProjects.map((p) => (
                  <li key={p.slug} className="border-b border-ink/15">
                    <Link href={`/work/${p.slug}`} className="group flex items-baseline justify-between gap-6 py-6">
                      <span>
                        <span className="block font-display text-2xl font-medium transition-colors group-hover:text-accent">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-muted">{p.summary}</span>
                      </span>
                      <span aria-hidden className="text-xl text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-10 hidden items-center gap-6 px-10 font-mono text-xs uppercase tracking-[0.14em] text-muted motion-safe:lg:flex">
          <span>
            <span className="work-count text-ink">01</span> / {total}
          </span>
          <div className="h-px flex-1 bg-ink/15">
            <div className="work-progress h-px origin-left scale-x-0 bg-accent" />
          </div>
          <span>Keep scrolling →</span>
        </div>
      </div>
    </section>
  );
}
