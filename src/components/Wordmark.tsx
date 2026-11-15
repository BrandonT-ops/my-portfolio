import Link from "next/link";

/** The site's own wordmark: "brandon" with a coral full stop. */
export default function Wordmark({ lang, size = "sm" }: { lang: string; size?: "sm" | "lg" }) {
  const cls =
    size === "lg"
      ? "text-[clamp(3.75rem,15vw,7.5rem)] leading-none tracking-[-0.045em]"
      : "text-[1.75rem] leading-none tracking-[-0.04em]";
  const mark = (
    <>
      brandon<span className="text-signal">.</span>
    </>
  );
  return size === "lg" ? (
    <span className={`font-display font-semibold text-line ${cls}`}>{mark}</span>
  ) : (
    <Link href={`/${lang}`} aria-label="Brandon Tapiba — home" className={`font-display font-semibold text-line ${cls}`}>
      {mark}
    </Link>
  );
}
