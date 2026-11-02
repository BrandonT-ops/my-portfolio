"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Matches only when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Large screens with a fine pointer: horizontal scroll, cursor, magnetic buttons. */
export const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export const EASE = "expo.out";

/*
 * Intro handshake: the preloader marks the intro as done; the hero waits for it
 * so its entrance plays right as the curtain lifts.
 */
let introDone = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn: () => void) {
  if (introDone) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
