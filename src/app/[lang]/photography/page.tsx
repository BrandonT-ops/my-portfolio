import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";
import { buildSuggestions } from "@/lib/search-index";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.photo, description: d.photo.title, alternates: alternates(lang, "/photography") };
}

/** Tile shapes for the empty state, so the grid already looks like an image search. */
const RESERVED = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]", "aspect-square", "aspect-[4/3]"];

export default async function Photography({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const ph = d.photo;
  const photos = site.photos;

  return (
    <>
      <Header lang={lang} nav={d.nav} t={d.search} suggestions={buildSuggestions(lang)} />

      <main id="main" className="mx-auto w-full max-w-page px-4 sm:px-6">
        <section className="mx-auto max-w-3xl pb-12 pt-10 text-center sm:pb-16 sm:pt-16">
          <p className="tag">{d.nav.photo}</p>
          <h1 className="mt-5 text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.02]">{ph.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{ph.lead}</p>
          {photos.length === 0 && <p className="mt-3 leading-relaxed text-muted">{ph.body}</p>}
          {site.photographyUrl && (
            <a href={site.photographyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
              {ph.gallery} ↗
            </a>
          )}
        </section>

        <ul className="flex flex-wrap justify-center gap-2" aria-label={ph.label}>
          {ph.subjects.map((s) => (
            <li key={s} className="chip hover:border-line/15 hover:text-line">
              {s}
            </li>
          ))}
        </ul>

        <ul className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {photos.length > 0
            ? photos.map((p, i) => (
                <li key={p.src} data-reveal style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                  <figure className="overflow-hidden rounded-2xl bg-panel">
                    <Image src={p.src} alt={p.alt} width={800} height={1000} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full" />
                    <figcaption className="px-3 py-2 text-sm text-muted">{p.alt}</figcaption>
                  </figure>
                </li>
              ))
            : RESERVED.map((shape, i) => (
                <li key={i} data-reveal style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                  <div className={`flex ${shape} items-center justify-center rounded-2xl bg-panel`}>
                    <span className="rounded-full bg-sheet px-3 py-1 text-xs text-muted">{ph.soon}</span>
                  </div>
                </li>
              ))}
        </ul>
      </main>
    </>
  );
}
