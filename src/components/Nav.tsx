"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dict, Lang } from "@/content/types";
import { PaletteButton } from "@/components/CommandPalette";

/** Top bar: the sheets of the set (numbered), the language switch and quick search. */
export default function Nav({ lang, labels, searchLabel }: { lang: Lang; labels: Dict["nav"]; searchLabel: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|fr)/, "") || "";
  const other: Lang = lang === "en" ? "fr" : "en";

  const sheets = [
    { no: "01", href: `/${lang}`, label: labels.home, active: rest === "", hideSmall: true },
    { no: "02", href: `/${lang}/work`, label: labels.work, active: rest.startsWith("/work") },
    { no: "03", href: `/${lang}/about`, label: labels.about, active: rest.startsWith("/about") },
    { no: "04", href: `/${lang}/photography`, label: labels.photo, active: rest.startsWith("/photography") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/25 bg-sheet/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-sheet items-center justify-between gap-3 px-5 sm:px-10">
        <Link href={`/${lang}`} className="font-display text-2xl font-bold uppercase leading-none tracking-wide">
          BT<span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-6 sm:text-xs">
          {sheets.map((s) => (
            <li key={s.no} className={s.hideSmall ? "hidden sm:block" : undefined}>
              <Link
                href={s.href}
                aria-current={s.active ? "page" : undefined}
                className={`inline-flex items-baseline gap-1.5 border-b py-1 transition-colors hover:text-accent ${
                  s.active ? "border-accent text-line" : "border-transparent text-muted"
                }`}
              >
                <span className="hidden text-[10px] text-accent lg:inline">{s.no}</span>
                {s.label}
              </Link>
            </li>
          ))}
          <li className="hidden sm:block">
            <a href="#contact" className="py-1 text-muted transition-colors hover:text-accent">
              {labels.contact}
            </a>
          </li>
          <li className="flex items-center border border-line/40">
            <span className="bg-line px-2 py-1 text-sheet" aria-current="true">
              {lang.toUpperCase()}
            </span>
            <Link
              href={`/${other}${rest}`}
              hrefLang={other}
              lang={other}
              aria-label={other === "fr" ? "Version française" : "English version"}
              className="px-2 py-1 text-muted transition-colors hover:text-accent"
            >
              {other.toUpperCase()}
            </Link>
          </li>
          <li className="hidden md:block">
            <PaletteButton label={searchLabel} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
