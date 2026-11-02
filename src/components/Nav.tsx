import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link href="/" className="font-display text-base font-semibold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-7 sm:text-xs">
          {links.map((l) => (
            <li key={l.href} className={l.label === "About" ? "hidden sm:block" : undefined}>
              <Link href={l.href} className="text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
