import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import Dimension from "@/components/Dimension";
import LocalTime from "@/components/LocalTime";
import TitleBlock from "@/components/TitleBlock";
import { getDict, getProjectText, isLang } from "@/content";
import { flagships, projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ lang: string }> };

const STAT_VALUES = [String(projects.length), "100,000+", "400+", "15"];

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const [first, ...rest] = site.name.split(" ");

  return (
    <>
      {/* Sheet header + hero */}
      <section className="mx-auto max-w-sheet px-5 pb-24 pt-8 sm:px-10 sm:pb-32 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line/25 pb-4">
          <p className="label">
            <span className="text-accent">DWG 001</span> — {d.hero.sheet}
          </p>
          <p className="label flex flex-wrap gap-x-6 gap-y-1">
            {site.available && (
              <span className="inline-flex items-center gap-2 text-line">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                {d.hero.available}
              </span>
            )}
            <span>{d.meta.location}</span>
            <LocalTime />
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(4.5rem,28.5vw,15rem)] leading-[0.82] lg:text-[min(19.3vw,20rem)]">
              <Dimension label={d.hero.width}>
                <span className="block">{first}</span>
                <span className="block">
                  {rest.join(" ")}
                  <span className="text-accent">.</span>
                </span>
              </Dimension>
            </h1>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted" data-reveal>
              <span className="text-line">{d.meta.role}.</span> {d.hero.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-4" data-reveal>
              <Link href={`/${lang}/work`} className="btn btn-solid">
                {d.hero.ctaWork} <span aria-hidden>→</span>
              </Link>
              <Link href={`/${lang}/about`} className="btn">
                {d.hero.ctaAbout}
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <figure className="group mx-auto max-w-sm lg:max-w-none" data-reveal>
              <div className="frame">
                <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                  <Image
                    src={site.portrait}
                    alt={`${site.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 24rem"
                    className="object-cover object-[50%_28%] grayscale contrast-[1.1] transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[rgb(46_104_190)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" aria-hidden />
                </div>
              </div>
              <figcaption className="label mt-4 flex justify-between gap-4">
                <span>{d.hero.detail}</span>
                <span>{d.hero.scale}</span>
              </figcaption>
            </figure>

            <div className="mt-10" data-reveal>
              <p className="label mb-4 border-b border-line/25 pb-3">{d.hero.notesTitle}</p>
              <ol className="space-y-4">
                {d.hero.notes.map((n, i) => (
                  <li key={n} className="flex gap-4 text-[15px] leading-relaxed text-muted">
                    <span className="balloon">{i + 1}</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="flag-title" className="mx-auto max-w-sheet px-5 pb-24 sm:px-10 sm:pb-36">
        <div className="h-px bg-line/40" data-draw />
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12 pt-6 sm:pb-16">
          <div>
            <p className="label mb-5">
              <span className="text-accent">A</span> — {d.home.flagLabel}
            </p>
            <h2 id="flag-title" className="text-[clamp(3rem,8vw,7rem)]" data-reveal>
              {d.home.flagTitle}
            </h2>
          </div>
          <Link href={`/${lang}/work`} className="btn" data-reveal>
            {d.home.allWork} ({projects.length}) <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-14">
          {flagships.map((p, i) => {
            const t = getProjectText(lang, p.slug);
            return (
              <li key={p.slug} data-reveal style={{ "--d": `${(i % 2) * 120}ms` } as React.CSSProperties}>
                <Link href={`/${lang}/work/${p.slug}`} className="group block">
                  <div className="label mb-3 flex justify-between">
                    <span>
                      <span className="text-accent">DWG {String(i + 1).padStart(2, "0")}</span> · {d.work.cats[p.category]}
                    </span>
                    <span>{p.year}</span>
                  </div>
                  <div className="frame transition-colors duration-300 group-hover:border-accent">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                        <Cover project={p} labels={d.systemLabels} alt={`${p.title} — ${d.study.screenshot}`} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-5xl transition-colors group-hover:text-accent sm:text-6xl">{p.title}</h3>
                      <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{t.summary}</p>
                    </div>
                    <span className="label mt-3 whitespace-nowrap transition-colors group-hover:text-accent">
                      {d.home.open} <span aria-hidden>→</span>
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="border border-line/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Quantities */}
      <section aria-labelledby="qty-label" className="mx-auto max-w-sheet px-5 pb-24 sm:px-10 sm:pb-36">
        <p id="qty-label" className="label mb-5">
          <span className="text-accent">B</span> — {d.home.quantities}
        </p>
        <dl className="frame grid bg-sheet/60 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {d.home.stats.map((s, i) => (
            <div key={s.label} className="cell border-b last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-child(n+3)]:border-b-0">
              <dd className="font-display text-[clamp(4rem,7vw,6.5rem)] font-bold leading-none tabular-nums">
                {STAT_VALUES[i].replace("+", "")}
                {STAT_VALUES[i].endsWith("+") && <span className="text-accent">+</span>}
              </dd>
              <dt className="mt-4 text-lg">{s.label}</dt>
              <p className="label mt-2">{s.note}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* About teaser */}
      <section aria-labelledby="about-label" className="mx-auto max-w-sheet px-5 sm:px-10">
        <div className="h-px bg-line/40" data-draw />
        <div className="grid gap-10 pt-6 lg:grid-cols-12 lg:gap-x-10">
          <p id="about-label" className="label lg:col-span-3">
            <span className="text-accent">C</span> — {d.home.aboutLabel}
          </p>
          <div className="lg:col-span-9">
            <p className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.95]" data-reveal>
              {d.home.statement}
            </p>
            <Link href={`/${lang}/about`} className="btn mt-10" data-reveal>
              {d.home.aboutLink} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <TitleBlock d={d} sheet="01 / 04" title={d.hero.sheet} />
    </>
  );
}
