import Link from "next/link";
import { notFound } from "next/navigation";
import CuriousButton from "@/components/CuriousButton";
import { CornerNav } from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import Wordmark from "@/components/Wordmark";
import { getDict, isLang } from "@/content";
import { projects } from "@/data/projects";
import { buildSuggestions } from "@/lib/search-index";

type Props = { params: Promise<{ lang: string }> };

/**
 * The home page is the search page and nothing else: a wordmark, one box,
 * two buttons. The box cycles example searches and one line says what to
 * type; four plain links underneath serve visitors who would rather click.
 */
export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const t = d.search;
  const other = lang === "en" ? "fr" : "en";

  const links = [
    { href: `/${lang}/search?t=projects`, label: t.tabs.projects, dot: "bg-ox" },
    { href: `/${lang}/about`, label: d.nav.about, dot: "bg-sky" },
    { href: `/${lang}/photography`, label: d.nav.photo, dot: "bg-gold" },
    { href: `/${lang}/contact`, label: d.nav.contact, dot: "bg-leaf" },
  ];

  return (
    <>
      <div className="flex justify-end px-4 py-4 sm:px-6">
        <CornerNav lang={lang} nav={d.nav} />
      </div>

      <main id="main" className="flex flex-1 flex-col items-center px-4 pb-16 pt-[10vh] sm:pt-[14vh]">
        <h1 className="text-center">
          <Wordmark lang={lang} size="lg" />
          <span className="sr-only"> — Brandon Tapiba, {d.meta.role}</span>
        </h1>
        <p className="mt-4 text-center text-muted">{t.strap}</p>

        <div className="mt-8 w-full max-w-2xl">
          <SearchBox
            lang={lang}
            suggestions={buildSuggestions(lang)}
            placeholder={t.placeholder}
            clearLabel={t.clear}
            listLabel={t.suggestions}
            examples={t.examples}
            popularLabel={t.popular}
            large
          />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/search?t=projects`} className="btn">
            {t.browseAll.replace("{n}", String(projects.length))}
          </Link>
          <CuriousButton hrefs={projects.map((p) => `/${lang}/work/${p.slug}`)} label={t.curious} />
        </div>

        <p className="mt-8 text-center text-sm text-muted">{t.help}</p>

        <ul className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="inline-flex items-center gap-2 text-line hover:text-accent hover:underline">
                <span className={`h-2 w-2 rounded-full ${l.dot}`} aria-hidden />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          {t.offered}{" "}
          <Link href={`/${other}`} hrefLang={other} lang={other} className="link">
            {t.otherLanguage}
          </Link>
        </p>
      </main>
    </>
  );
}
