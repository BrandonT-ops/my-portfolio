"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, MOTION_OK, EASE, prefersReducedMotion } from "@/lib/motion";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/**
 * Global motion layer:
 * - Lenis smooth scrolling, driven by GSAP's ticker and synced with ScrollTrigger
 * - scroll progress bar
 * - curtain transition between pages
 * - declarative scroll reveals via data attributes:
 *     data-split            heading revealed line by line from behind a mask
 *     data-reveal           element fades and rises in
 *     data-reveal-stagger   direct children rise in one after another
 *     data-parallax="0.15"  element drifts vertically while scrolling (fraction of its height)
 *     data-zoom             element eases from slightly zoomed-in to its natural size while scrolling past
 */
export default function MotionProvider() {
  const pathname = usePathname();
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const firstPath = useRef(true);

  // Smooth scroll + progress bar (once)
  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const bar = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      bar.scrollTrigger?.kill();
      bar.kill();
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Link handling: curtain for page changes, smooth scroll for in-page anchors
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      const samePage = url.pathname === location.pathname;
      if (samePage && url.hash) {
        const target = document.querySelector(decodeURIComponent(url.hash));
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
        else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        history.pushState(null, "", url.hash);
        return;
      }
      if (samePage || prefersReducedMotion() || navigating.current) return;

      e.preventDefault();
      e.stopPropagation();
      navigating.current = true;
      gsap.fromTo(
        curtainRef.current,
        { yPercent: 100, autoAlpha: 1 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        },
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // On every page: reset scroll, lift the curtain, build the reveals
  useEffect(() => {
    const hash = location.hash ? document.querySelector(decodeURIComponent(location.hash)) : null;
    if (lenis) {
      lenis.scrollTo((hash as HTMLElement) ?? 0, { immediate: true, force: true });
    }

    if (!firstPath.current && navigating.current) {
      gsap.to(curtainRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
        delay: 0.1,
        onComplete: () => {
          gsap.set(curtainRef.current, { autoAlpha: 0 });
          navigating.current = false;
        },
      });
    }
    firstPath.current = false;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const splits: SplitText[] = [];

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              ease: EASE,
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
        splits.push(split);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          autoAlpha: 0,
          duration: 1.4,
          ease: EASE,
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 50,
          autoAlpha: 0,
          duration: 1.2,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom 30%", scrub: true },
          },
        );
      });

      return () => splits.forEach((s) => s.revert());
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      mm.revert();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent"
      />
      <div
        ref={curtainRef}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[70] flex items-end bg-ink p-8"
      >
        <span className="font-display text-[12vw] font-medium leading-none text-paper/10">B.</span>
      </div>
    </>
  );
}
