import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import TitleBlock from "@/components/TitleBlock";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.photo, description: d.photo.title, alternates: alternates(lang, "/photography") };
}

const RESERVED = 8;

export default async function Photography({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const ph = d.photo;
  const photos = site.photos;
  const frameNo = (i: number) => `${String(Math.floor(i / 4) + 1).padStart(2, "0")}${"ABCD"[i % 4]}`;

  return (
    <>
      <section className="mx-auto max-w-sheet px-5 pt-8 sm:px-10 sm:pt-12">
        <p className="label border-b border-line/25 pb-4">
          <span className="text-accent">DWG 004</span> — {ph.label}
        </p>
        <div className="grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:items-end lg:gap-x-10 sm:pb-20">
          <h1 className="text-[clamp(3.25rem,9vw,8.5rem)] lg:col-span-8">{ph.title}</h1>
          <div className="lg:col-span-4" data-reveal>
            <p className="text-xl leading-relaxed">{ph.lead}</p>
            {photos.length === 0 && <p className="mt-4 leading-relaxed text-muted">{ph.body}</p>}
            {site.photographyUrl && (
              <a href={site.photographyUrl} target="_blank" rel="noopener noreferrer" className="btn mt-6">
                {ph.gallery} ↗
              </a>
            )}
          </div>
        </div>

        <ul className="mb-8 flex flex-wrap gap-2" aria-label={ph.label}>
          {ph.subjects.map((s) => (
            <li key={s} className="border border-line/35 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {s}
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {photos.length > 0
            ? photos.map((p, i) => (
                <li key={p.src} data-reveal style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}>
                  <div className="frame">
                    <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                  <p className="label mt-3">
                    <span className="text-accent">{frameNo(i)}</span> · {p.alt}
                  </p>
                </li>
              ))
            : Array.from({ length: RESERVED }).map((_, i) => (
                <li key={i} data-reveal style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}>
                  <div className="frame">
                    <div className="hatch flex aspect-[4/5] items-center justify-center bg-panel/40">
                      <span className="bg-sheet px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{ph.soon}</span>
                    </div>
                  </div>
                  <p className="label mt-3">
                    <span className="text-accent">
                      {ph.frame} {frameNo(i)}
                    </span>
                  </p>
                </li>
              ))}
        </ul>
      </section>
      <TitleBlock d={d} sheet="04 / 04" title={ph.label} />
    </>
  );
}
