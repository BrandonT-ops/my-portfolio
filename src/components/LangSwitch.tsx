"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/content/types";

/** EN/FR switch that keeps the visitor on the same page (and the same search). */
export default function LangSwitch({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|fr)/, "");
  const other: Lang = lang === "en" ? "fr" : "en";
  const href = `/${other}${rest}`;

  return (
    <div className="flex items-center rounded-full border border-line/15 p-0.5 text-xs font-medium">
      <span className="rounded-full bg-line px-2.5 py-1 text-sheet" aria-current="true">
        {lang.toUpperCase()}
      </span>
      <a
        href={href}
        hrefLang={other}
        lang={other}
        aria-label={other === "fr" ? "Version française" : "English version"}
        onClick={(e) => {
          if (window.location.search) {
            e.preventDefault();
            router.push(href + window.location.search);
          }
        }}
        className="rounded-full px-2.5 py-1 text-muted transition-colors hover:text-accent"
      >
        {other.toUpperCase()}
      </a>
    </div>
  );
}
