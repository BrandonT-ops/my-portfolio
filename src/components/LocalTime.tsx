"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Douala",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Live clock for Yaoundé (West Africa Time). Renders dashes until mounted, so server and browser agree. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, []);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {now} <span className="opacity-60">WAT</span>
    </span>
  );
}
