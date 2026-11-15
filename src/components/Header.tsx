import Image from "next/image";
import Link from "next/link";
import LangSwitch from "@/components/LangSwitch";
import SearchBox, { type Suggestion } from "@/components/SearchBox";
import Wordmark from "@/components/Wordmark";
import type { Dict, Lang } from "@/content/types";
import { site } from "@/data/site";

/** Small links in the top-right corner: profile, photos, language, and Brandon's face. */
export function CornerNav({ lang, nav }: { lang: Lang; nav: Dict["nav"] }) {
  return (
    <div className="flex items-center gap-3 text-sm sm:gap-5">
      <Link href={`/${lang}/about`} className="hidden text-line hover:text-accent sm:block">
        {nav.about}
      </Link>
      <Link href={`/${lang}/photography`} className="hidden text-line hover:text-accent sm:block">
        {nav.photo}
      </Link>
      <LangSwitch lang={lang} />
      <Link href={`/${lang}/about`} aria-label={nav.about} className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition hover:ring-accent">
        <Image src={site.portrait} alt="" fill sizes="36px" className="object-cover object-[50%_25%]" />
      </Link>
    </div>
  );
}

/** Sticky header for every page except the home page: wordmark, search box, corner links. */
export default function Header({
  lang,
  nav,
  t,
  suggestions,
  q = "",
}: {
  lang: Lang;
  nav: Dict["nav"];
  t: Dict["search"];
  suggestions: Suggestion[];
  q?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/10 bg-sheet/95 backdrop-blur">
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap">
        <Wordmark lang={lang} />
        <div className="order-3 w-full lg:order-none lg:max-w-xl lg:flex-1">
          <SearchBox key={q} lang={lang} suggestions={suggestions} placeholder={t.placeholder} clearLabel={t.clear} listLabel={t.suggestions} initial={q} examples={q ? [] : t.examples} popularLabel={t.popular} />
        </div>
        <div className="ml-auto">
          <CornerNav lang={lang} nav={nav} />
        </div>
      </div>
      <nav aria-label="Sections" className="mx-auto flex max-w-page gap-5 overflow-x-auto px-4 pb-3 text-sm sm:hidden">
        <Link href={`/${lang}/search?t=projects`} className="whitespace-nowrap text-muted hover:text-accent">
          {t.tabs.projects}
        </Link>
        <Link href={`/${lang}/about`} className="whitespace-nowrap text-muted hover:text-accent">
          {nav.about}
        </Link>
        <Link href={`/${lang}/photography`} className="whitespace-nowrap text-muted hover:text-accent">
          {nav.photo}
        </Link>
        <a href="#contact" className="whitespace-nowrap text-muted hover:text-accent">
          {nav.contact}
        </a>
      </nav>
    </header>
  );
}
