"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "crosshair";
const EVENT = "crosshair:toggle";

const allowed = () => matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

const readStored = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/**
 * CAD-style crosshair: two hairlines follow the pointer across the whole
 * sheet, with a live X/Y readout. Desktop pointers only; off with reduced
 * motion; the visitor can switch it off from the title block.
 */
export default function Crosshair() {
  const h = useRef<HTMLDivElement>(null);
  const v = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setOn(allowed() && readStored() !== "off"), 0);
    const toggle = () =>
      setOn((cur) => {
        const next = !cur;
        try {
          localStorage.setItem(KEY, next ? "on" : "off");
        } catch {}
        return next;
      });
    window.addEventListener(EVENT, toggle);
    return () => {
      window.clearTimeout(start);
      window.removeEventListener(EVENT, toggle);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.crosshair = on ? "on" : "off";
    if (!on) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (h.current) h.current.style.transform = `translate3d(0, ${y}px, 0)`;
        if (v.current) v.current.style.transform = `translate3d(${x}px, 0, 0)`;
        if (tag.current) {
          const flipX = x > window.innerWidth - 150;
          const flipY = y > window.innerHeight - 40;
          tag.current.style.transform = `translate3d(${x + (flipX ? -128 : 14)}px, ${y + (flipY ? -24 : 12)}px, 0)`;
          tag.current.textContent = `X ${String(x).padStart(4, "0")}  Y ${String(Math.round(y + window.scrollY)).padStart(5, "0")}`;
        }
        for (const el of [h.current, v.current, tag.current]) if (el) el.style.opacity = "1";
      });
    };
    const leave = () => {
      for (const el of [h.current, v.current, tag.current]) if (el) el.style.opacity = "0";
    };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [on]);

  if (!on) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div ref={h} className="absolute inset-x-0 top-0 h-px bg-accent/45 opacity-0 transition-opacity duration-300" />
      <div ref={v} className="absolute inset-y-0 left-0 w-px bg-accent/45 opacity-0 transition-opacity duration-300" />
      <div
        ref={tag}
        className="absolute left-0 top-0 whitespace-pre bg-sheet/85 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-accent opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}

/** Switch in the title block. Shows the state that <Crosshair /> publishes on <html>. */
export function CrosshairToggle({ label, onText, offText }: { label: string; onText: string; offText: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const read = () => setOn(document.documentElement.dataset.crosshair === "on");
    const first = window.setTimeout(read, 50);
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-crosshair"] });
    return () => {
      window.clearTimeout(first);
      mo.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENT))}
      aria-pressed={on}
      aria-label={label}
      className="hidden items-center gap-2 font-mono text-sm uppercase tracking-[0.1em] hover:text-accent lg:inline-flex"
    >
      <span className={`h-2.5 w-2.5 border border-current ${on ? "bg-accent" : ""}`} aria-hidden />
      {on ? onText : offText}
    </button>
  );
}
