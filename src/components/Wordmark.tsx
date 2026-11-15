import Link from "next/link";

/** One colour per letter, from the site's own four: oxblood, blue, gold, green. */
const LETTERS: [string, string][] = [
  ["b", "text-ox"],
  ["r", "text-sky"],
  ["a", "text-gold"],
  ["n", "text-leaf"],
  ["d", "text-ox"],
  ["o", "text-sky"],
  ["n", "text-gold"],
];

/** The site's wordmark: "brandon", each letter in one of four colours. */
export default function Wordmark({ lang, size = "sm" }: { lang: string; size?: "sm" | "lg" }) {
  const cls =
    size === "lg"
      ? "text-[clamp(4rem,16vw,7.5rem)] leading-none tracking-[-0.045em]"
      : "text-[1.75rem] leading-none tracking-[-0.04em]";
  const mark = (
    <span aria-hidden>
      {LETTERS.map(([ch, color], i) => (
        <span key={i} className={color}>
          {ch}
        </span>
      ))}
    </span>
  );
  return size === "lg" ? (
    <span className={`font-display font-semibold ${cls}`}>
      {mark}
      <span className="sr-only">brandon</span>
    </span>
  ) : (
    <Link href={`/${lang}`} aria-label="Brandon Tapiba — home" className={`font-display font-semibold ${cls}`}>
      {mark}
    </Link>
  );
}
