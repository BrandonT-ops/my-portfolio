"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps its children and draws a dimension line underneath that shows their
 * real width in pixels, measured live (it updates when the window resizes).
 */
export default function Dimension({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-block">
      {children}
      <span
        aria-hidden
        className="mt-4 flex items-center gap-3 font-mono text-[11px] font-normal normal-case leading-none tracking-[0.14em] text-accent"
      >
        <span className="dim-end" />
        <span className="h-px flex-1 bg-accent/70" />
        <span className="whitespace-nowrap uppercase tabular-nums">
          {label} · {width === null ? "····" : width.toLocaleString("en-US").replace(",", " ")} px
        </span>
        <span className="h-px flex-1 bg-accent/70" />
        <span className="dim-end" />
      </span>
    </span>
  );
}
