"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { onIntroDone } from "@/lib/motion";
import BuddyFigure from "./BuddyFigure";

/**
 * A small companion (a cartoon mini-Brandon) in the corner that reacts to where you are:
 *   hero → waves hello · work → types on a laptop, sweating · about → explains
 *   photography → takes pictures · contact → dances
 * It dozes off when the page is still and wakes up when you scroll or move.
 * Between 22:00 and 06:00 (visitor's local time) it wears a nightcap and
 * tells you to go to bed. With reduced motion it changes pose without animating.
 */

type Scene = "hero" | "work" | "about" | "photo" | "contact";
type Pose = "sleep" | "wave" | "type" | "explain" | "camera" | "dance";

const POSE: Record<Scene, Pose> = {
  hero: "wave",
  work: "type",
  about: "explain",
  photo: "camera",
  contact: "dance",
};

const SAY: Record<"day" | "night", Record<Scene, string>> = {
  day: {
    hero: "Hey there! 👋",
    work: "Shipping it… 💦",
    about: "So basically…",
    photo: "Say cheese! 📸",
    contact: "Say hi! ✉️",
  },
  night: {
    hero: "Hi… it’s pretty late 🌙",
    work: "Still working? Go to bed!",
    about: "Quick story, then bed.",
    photo: "Last shot, then sleep.",
    contact: "Write tomorrow — sleep now 😴",
  },
};

const SECTIONS: [string, Scene][] = [
  ["contact", "contact"],
  ["photography", "photo"],
  ["about", "about"],
  ["work", "work"],
];

const IDLE_MS = 5000;
const BUBBLE_MS = 3200;

const isNight = () => {
  const h = new Date().getHours();
  return h >= 22 || h < 6;
};

export default function Buddy() {
  const pathname = usePathname();
  const [scene, setScene] = useState<Scene>("hero");
  const [awake, setAwake] = useState(true);
  const [night, setNight] = useState(false);
  const [bubble, setBubble] = useState(false);
  const idle = useRef<number | undefined>(undefined);
  const sceneRef = useRef<Scene>("hero");
  const nightRef = useRef(false);
  const bubbleTimer = useRef<number | undefined>(undefined);

  const say = useCallback(() => {
    setBubble(true);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(false), BUBBLE_MS);
  }, []);

  const wake = useCallback(() => {
    setAwake(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      setAwake(false);
      setBubble(false);
    }, IDLE_MS);
  }, []);

  // Day / night, rechecked every minute.
  useEffect(() => {
    const check = () => {
      const n = isNight();
      if (n === nightRef.current) return;
      nightRef.current = n;
      setNight(n);
      say();
    };
    const first = window.setTimeout(check, 0);
    const t = window.setInterval(check, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, [say]);

  // Greet once the intro has lifted.
  useEffect(() => {
    const off = onIntroDone(() => {
      wake();
      window.setTimeout(say, 400);
    });
    return () => {
      off();
      window.clearTimeout(idle.current);
      window.clearTimeout(bubbleTimer.current);
    };
  }, [wake, say]);

  // Which section is under the middle of the screen?
  useEffect(() => {
    const current = (): Scene => {
      if (pathname !== "/") return "work";
      const mid = window.innerHeight / 2;
      for (const [id, s] of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) return s;
      }
      return "hero";
    };
    // Speak up whenever the visitor arrives in a new scene.
    const detect = () => {
      const s = current();
      if (s === sceneRef.current) return;
      sceneRef.current = s;
      setScene(s);
      say();
    };
    const first = window.setTimeout(detect, 0);
    let last = 0;
    const onActivity = () => {
      const now = performance.now();
      if (now - last < 150) return;
      last = now;
      detect();
      wake();
    };
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("wheel", onActivity, { passive: true });
    window.addEventListener("touchmove", onActivity, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("wheel", onActivity);
      window.removeEventListener("touchmove", onActivity);
      window.removeEventListener("pointermove", onActivity);
    };
  }, [pathname, wake, say]);

  const pose: Pose = awake ? POSE[scene] : "sleep";
  const line = SAY[night ? "night" : "day"][scene];

  return (
    <div className="buddy-wrap pointer-events-none fixed bottom-3 left-3 z-40 sm:bottom-5 sm:left-5">
      <div
        aria-hidden
        className={`buddy-bubble absolute bottom-[calc(100%-0.5rem)] left-10 w-max max-w-[15rem] border-2 border-ink bg-paper px-3 py-2 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-ink shadow-hard-sm sm:left-14 sm:text-xs ${
          bubble && awake ? "is-on" : ""
        }`}
      >
        {line}
      </div>

      <button
        type="button"
        onClick={() => {
          wake();
          say();
        }}
        data-pose={pose}
        data-night={night || undefined}
        aria-label={`Little companion${awake ? `: “${line}”` : ", asleep"}. Click to wake it up.`}
        className="buddy pointer-events-auto block w-14 cursor-pointer sm:w-20"
      >
        <BuddyFigure />
      </button>
    </div>
  );
}
