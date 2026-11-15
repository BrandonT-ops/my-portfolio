"use client";

import { useRef } from "react";
import Image from "next/image";
import LocalTime from "@/components/ui/LocalTime";
import { gsap, useGSAP, onIntroDone, MOTION_OK } from "@/lib/motion";
import { site } from "@/data/site";

/**
 * Engineer ID badge hanging from a lanyard in the hero. It drops in and
 * swings after the intro, tilts in 3D under the pointer, and the photo
 * turns from black-and-white to colour on hover.
 */
export default function Badge() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const swing = root.current!.querySelector<HTMLElement>(".badge-swing")!;
        const card = root.current!.querySelector<HTMLElement>(".badge-card")!;
        const glare = root.current!.querySelector<HTMLElement>(".badge-glare")!;

        gsap.set(swing, { yPercent: -130, rotation: -14, transformOrigin: "50% 0%" });
        const off = onIntroDone(() => {
          gsap.to(swing, { yPercent: 0, duration: 1.1, ease: "power3.out", delay: 0.5 });
          gsap.to(swing, { rotation: 4, duration: 2.6, ease: "elastic.out(1.1, 0.25)", delay: 0.5 });
        });

        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 16);
          ry(px * 20);
          glare.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          glare.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        const nudge = () =>
          gsap.fromTo(swing, { rotation: 10 }, { rotation: 4, duration: 2.2, ease: "elastic.out(1.2, 0.2)", overwrite: true });

        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        card.addEventListener("click", nudge);
        return () => {
          off();
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          card.removeEventListener("click", nudge);
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-hero-hide className="pointer-events-none absolute right-[5vw] top-0 z-10 hidden w-[min(19vw,17rem)] lg:block" style={{ perspective: "900px" }}>
      <div className="badge-swing rotate-[4deg]">
        {/* lanyard */}
        <div className="mx-auto h-[9vh] w-3 border-x-2 border-ink bg-accent" />
        <div className="mx-auto -mt-px h-4 w-9 rounded-b-md border-2 border-t-0 border-ink bg-paper" />

        <div
          className="badge-card group pointer-events-auto relative -mt-1 border-2 border-ink bg-paper text-ink shadow-[8px_8px_0_0_rgb(var(--accent))] [transform-style:preserve-3d]"
        >
          <div className="flex items-center justify-between border-b-2 border-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span>Engineer · ID 001</span>
            <span className="h-2 w-6 rounded-full border-2 border-ink" aria-hidden />
          </div>

          <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-ink">
            {site.portrait ? (
              <Image
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="20vw"
                className="object-cover object-[50%_28%] grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-medium text-paper">
                BT<span className="text-accent">.</span>
              </span>
            )}
            <div
              className="badge-glare pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.9), transparent 55%)" }}
            />
          </div>

          <div className="px-3 pb-3 pt-2.5">
            <p className="font-display text-xl font-semibold leading-tight tracking-tight">{site.name}</p>
            <p className="mt-0.5 text-[13px] text-muted">{site.role}</p>
            <dl className="mt-3 space-y-1 border-t border-ink/20 pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em]">
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Loc</dt>
                <dd>3.87°N 11.52°E</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Time</dt>
                <dd>
                  <LocalTime />
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Status</dt>
                <dd className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden />
                  {site.available ? "Available" : "Booked"}
                </dd>
              </div>
            </dl>
            {/* barcode */}
            <div
              aria-hidden
              className="mt-3 h-6"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgb(var(--ink)) 0 2px, transparent 2px 5px, rgb(var(--ink)) 5px 6px, transparent 6px 10px, rgb(var(--ink)) 10px 13px, transparent 13px 15px)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
