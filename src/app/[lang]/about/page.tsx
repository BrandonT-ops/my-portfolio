import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";
import { buildSuggestions } from "@/lib/search-index";
import { usage } from "@/lib/usage";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.about, description: d.about.paragraphs[0], alternates: alternates(lang, "/about") };
}

export default async function About({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const a = d.about;

  return (
    <>
      <Header lang={lang} nav={d.nav} t={d.search} suggestions={buildSuggestions(lang)} />

      <main id="main" className="mx-auto w-full max-w-page px-4 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="tag">{d.meta.role}</p>
            <h1 className="mt-5 text-[clamp(3rem,8vw,6rem)] leading-[0.98]">
              {site.name}
              <span className="text-signal">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{a.paragraphs[0]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/contact`} className="btn btn-primary">
                {d.block.ctaButton}
              </Link>
              <Link href={`/${lang}/search?t=projects`} className="btn">
                {d.search.tabs.projects} →
              </Link>
              {site.resumeUrl && (
                <a href={site.resumeUrl} className="btn">
                  CV ↓
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-panel shadow-soft lg:max-w-none">
              <Image src={site.portrait} alt={site.name} fill priority sizes="(min-width: 1024px) 36vw, 24rem" className="object-cover object-[50%_28%]" />
            </div>
          </div>
        </section>

        {/* Facts */}
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.facts.map((f, i) => (
            <div key={f.label} className="card" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <dt className="label">{f.label}</dt>
              <dd className="mt-2 text-lg leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* More about */}
        <section className="mx-auto max-w-3xl space-y-6 py-20 text-center text-xl leading-relaxed sm:py-28">
          {a.paragraphs.slice(1).map((p) => (
            <p key={p} data-reveal>
              {p}
            </p>
          ))}
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="exp" className="scroll-mt-28">
          <h2 id="exp" className="text-[clamp(2.25rem,5vw,3.75rem)]" data-reveal>
            {a.experienceTitle}
          </h2>
          <ol className="mt-8 space-y-4">
            {a.experience.map((job) => (
              <li key={job.org} className="card-outline grid gap-6 lg:grid-cols-12 lg:gap-x-10" data-reveal>
                <div className="lg:col-span-5">
                  <p className="tag">{job.period}</p>
                  <h3 className="mt-4 text-2xl leading-tight sm:text-3xl">{job.role}</h3>
                  <p className="mt-2 text-lg">{job.org}</p>
                  <p className="mt-1 text-sm text-muted">{job.place}</p>
                </div>
                <ul className="space-y-3 leading-relaxed text-muted lg:col-span-7">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line/40" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Education + certifications */}
        <section id="education" className="mt-20 grid scroll-mt-28 gap-4 sm:mt-28 lg:grid-cols-2">
          {[
            { title: a.educationTitle, rows: a.education.map((e) => ({ year: e.year, title: e.title, sub: e.org, note: e.note })) },
            { title: a.certsTitle, rows: a.certifications.map((c) => ({ year: c.year, title: c.title, sub: c.org, note: "" })) },
          ].map((col) => (
            <div key={col.title} className="card" data-reveal>
              <h2 className="text-3xl">{col.title}</h2>
              <ul className="mt-6 divide-y divide-line/10">
                {col.rows.map((r) => (
                  <li key={r.title} className="grid grid-cols-[3.5rem_1fr] gap-4 py-4">
                    <span className="pt-0.5 text-sm font-medium text-accent">{r.year}</span>
                    <div>
                      <p className="text-lg font-medium leading-snug">{r.title}</p>
                      <p className="mt-1 text-sm text-muted">{r.sub}</p>
                      {r.note && <p className="mt-1 text-sm text-muted">{r.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Stack */}
        <section className="mt-20 sm:mt-28" aria-labelledby="stack">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="stack" className="text-[clamp(2.25rem,5vw,3.75rem)]" data-reveal>
              {a.stackTitle}
            </h2>
            <p className="text-sm text-muted">{a.stackNote}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {a.skills.map((row) => (
              <div key={row.group} className="card-outline" data-reveal>
                <h3 className="text-2xl">{row.group}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {row.items.map((item) => {
                    const n = usage(item);
                    const key = item.split(/\s*[/&]\s*/)[0];
                    return (
                      <li key={item}>
                        {n > 0 ? (
                          <Link href={`/${lang}/search?q=${encodeURIComponent(key)}&t=projects`} className="chip">
                            {item} <span className="text-xs text-accent">×{n}</span>
                          </Link>
                        ) : (
                          <span className="chip hover:border-line/15 hover:text-line">{item}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mt-6 rounded-2xl bg-panel p-8 sm:p-12" data-reveal>
          <h2 className="text-3xl sm:text-4xl">{a.servicesTitle}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 text-lg sm:grid-cols-2 lg:grid-cols-3">
            {a.services.map((sv) => (
              <li key={sv} className="flex items-center gap-3">
                <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line/25 text-xs text-line">
                  ✓
                </span>
                {sv}
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/contact`} className="btn btn-primary mt-10">
            {d.block.ctaButton} →
          </Link>
        </section>
      </main>
    </>
  );
}
