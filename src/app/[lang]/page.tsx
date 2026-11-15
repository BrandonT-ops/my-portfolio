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

/** The home page is the search page: a wordmark, one box, two buttons. */
export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const t = d.search;
  const other = lang === "en" ? "fr" : "en";

  return (
    <>
      <div className="flex justify-end px-4 py-4 sm:px-6">
        <CornerNav lang={lang} nav={d.nav} />
      </div>

      <main id="main" className="flex flex-1 flex-col items-center px-4 pb-16 pt-[9vh] sm:pt-[13vh]">
        <h1 className="text-center">
          <Wordmark lang={lang} size="lg" />
          <span className="sr-only"> — Brandon Tapiba, {d.meta.role}</span>
        </h1>
        <p className="mt-4 text-center text-muted">{t.strap}</p>

        <div className="mt-8 w-full max-w-2xl">
          <SearchBox lang={lang} suggestions={buildSuggestions(lang)} placeholder={t.placeholder} clearLabel={t.clear} listLabel={t.suggestions} large autoFocus />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/search`} className="btn">
            {t.button}
          </Link>
          <CuriousButton hrefs={projects.map((p) => `/${lang}/work/${p.slug}`)} label={t.curious} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="mr-1 text-muted">{t.tryLabel}:</span>
          {t.tries.map((s) => (
            <Link key={s} href={`/${lang}/search?q=${encodeURIComponent(s)}`} className="chip">
              {s}
            </Link>
          ))}
        </div>

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
