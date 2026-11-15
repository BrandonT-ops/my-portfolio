import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CuriousButton from "@/components/CuriousButton";
import { CornerNav } from "@/components/Header";
import Schematic from "@/components/Schematic";
import SearchBox from "@/components/SearchBox";
import Wordmark from "@/components/Wordmark";
import { getDict, getProjectText, isLang } from "@/content";
import { flagships, projects } from "@/data/projects";
import { site } from "@/data/site";
import { getSystem } from "@/data/systems";
import { buildSuggestions } from "@/lib/search-index";

type Props = { params: Promise<{ lang: string }> };

/**
 * The home page is the search page: a wordmark and one box. Because a bare
 * search box can leave first-time visitors unsure what to do, it also says
 * what to type, offers four plain shortcuts, and lists six projects below.
 */
export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const t = d.search;
  const other = lang === "en" ? "fr" : "en";

  const tiles = [
    { href: `/${lang}/search?t=projects`, icon: "◆", title: t.tiles.projects, hint: t.tiles.projectsHint, count: projects.length },
    { href: `/${lang}/about`, icon: "●", title: t.tiles.about, hint: t.tiles.aboutHint },
    { href: `/${lang}/photography`, icon: "▣", title: t.tiles.photos, hint: t.tiles.photosHint, count: site.photos.length || undefined },
    { href: `mailto:${site.email}`, icon: "✉", title: t.tiles.contact, hint: t.tiles.contactHint },
  ];

  return (
    <>
      <div className="flex justify-end px-4 py-4 sm:px-6">
        <CornerNav lang={lang} nav={d.nav} />
      </div>

      <main id="main" className="flex flex-1 flex-col items-center px-4 pb-10 pt-[6vh] sm:pt-[9vh]">
        <h1 className="text-center">
          <Wordmark lang={lang} size="lg" />
          <span className="sr-only"> — Brandon Tapiba, {d.meta.role}</span>
        </h1>
        <p className="mt-4 text-center text-lg text-muted">{t.strap}</p>

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
          <p className="mt-3 text-center text-sm text-muted">{t.help}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/search?t=projects`} className="btn btn-primary">
            {t.browseAll.replace("{n}", String(projects.length))} →
          </Link>
          <CuriousButton hrefs={projects.map((p) => `/${lang}/work/${p.slug}`)} label={t.curious} />
        </div>

        {/* Plain shortcuts for visitors who would rather click than type */}
        <ul className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.title}>
              <Link href={tile.href} className="group flex h-full flex-col rounded-3xl bg-panel p-5 transition hover:shadow-lift">
                <span className="flex items-center justify-between">
                  <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-sheet text-accent">
                    {tile.icon}
                  </span>
                  {tile.count ? <span className="tag !bg-sheet">{tile.count}</span> : null}
                </span>
                <span className="mt-4 font-display text-xl font-semibold group-hover:text-accent">{tile.title}</span>
                <span className="mt-1 text-sm leading-snug text-muted">{tile.hint}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          {t.offered}{" "}
          <Link href={`/${other}`} hrefLang={other} lang={other} className="link">
            {t.otherLanguage}
          </Link>
        </p>

        {/* Start here */}
        <section aria-labelledby="start" className="mt-20 w-full max-w-page sm:mt-28">
          <div className="text-center">
            <h2 id="start" className="text-[clamp(2rem,4.5vw,3.25rem)] leading-tight" data-reveal>
              {t.startHere}
            </h2>
            <p className="mt-3 text-lg text-muted" data-reveal>
              {t.startHereSub}
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {flagships.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}>
                <Link href={`/${lang}/work/${p.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-line/10 bg-sheet transition hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden bg-panel">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={`${p.title} — ${d.study.screenshot}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-[4%]" aria-hidden>
                        <Schematic layers={getSystem(p.slug, p.stack, d.systemLabels)} fontSize={19} gapRatio={0.05} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="tag">{d.work.cats[p.category]}</p>
                    <h3 className="mt-3 text-2xl group-hover:text-accent">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{getProjectText(lang, p.slug).summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href={`/${lang}/search?t=projects`} className="btn btn-primary">
              {t.browseAll.replace("{n}", String(projects.length))} →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
