"use client";

import { useEffect, useRef } from "react";

/**
 * Dark-scene backdrop: drifting colour glows, a fading grid, film grain and a
 * spotlight that follows the mouse. Place inside a `.scene-dark` element.
 */
export default function Atmosphere({
  grid = true,
  horizon = false,
  glows = true,
}: {
  grid?: boolean;
  horizon?: boolean;
  glows?: boolean;
}) {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    const scene = el?.parentElement;
    if (!el || !scene || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = scene.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    scene.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      {glows && (
        <div className="aurora" aria-hidden>
          <span />
          <span />
        </div>
      )}
      {grid && <div className="grid-lines" aria-hidden />}
      {horizon && <div className="horizon" aria-hidden />}
      <div ref={spot} className="spotlight" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
