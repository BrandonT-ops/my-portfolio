import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Floating nav. `mix-blend-difference` with white text means it reads as ink
 * over light scenes and paper over dark ones, with no colour switching code.
 */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav
        aria-label="Main"
        className="pointer-events-auto mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-5 text-white sm:px-10"
      >
        <Link href="/" data-magnetic className="font-display text-lg font-semibold tracking-tight">
          {site.name.split(" ")[0]}
          <span className="opacity-60">.</span>
        </Link>
        <ul className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-8 sm:text-xs">
          {links.map((l, i) => (
            <li key={l.href} className={l.label === "About" ? "hidden sm:block" : undefined}>
              <Link href={l.href} className="group relative inline-flex overflow-hidden">
                <span className="mr-1.5 hidden opacity-50 lg:inline">0{i + 1}</span>
                <span className="relative inline-block">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0"
                  >
                    {l.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
