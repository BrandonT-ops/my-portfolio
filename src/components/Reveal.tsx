"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Inlined in <head>: marks that JS is running, so content is only hidden when it can be revealed. */
export const jsFlag = `document.documentElement.classList.add("js")`;

/**
 * Reveals elements marked data-reveal (fade up) or data-draw (line draws in)
 * the first time they scroll into view. One observer for the whole page.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-draw]:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
