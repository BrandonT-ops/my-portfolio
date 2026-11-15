import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TitleBlock from "@/components/TitleBlock";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";
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
      <section className="mx-auto max-w-sheet px-5 pt-8 sm:px-10 sm:pt-12">
        <p className="label border-b border-line/25 pb-4">
          <span className="text-accent">DWG 003</span> — {a.label}
        </p>
        <h1 className="pb-14 pt-10 text-[clamp(3.75rem,12vw,11rem)] sm:pb-20">{a.title}</h1>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <figure className="group lg:col-span-5" data-reveal>
            <div className="lg:sticky lg:top-24">
              <div className="frame">
                <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                  <Image
                    src={site.portrait}
                    alt={site.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[50%_28%] grayscale contrast-[1.1] transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[rgb(46_104_190)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" aria-hidden />
                </div>
              </div>
              <figcaption className="label mt-4 flex justify-between gap-4">
                <span>{a.portrait}</span>
                <span>{site.coordinates}</span>
              </figcaption>
            </div>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed">
              {a.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl text-line" : "text-muted"} data-reveal>
                  {p}
                </p>
              ))}
            </div>

            <p className="label mb-4 mt-16">{a.factsTitle}</p>
            <dl className="frame grid bg-sheet/60 sm:grid-cols-2 [&>div]:border-b sm:[&>div:nth-child(odd)]:border-r sm:[&>div:nth-last-child(-n+2)]:border-b-0 [&>div:last-child]:border-b-0" data-reveal>
              {a.facts.map((f) => (
                <div key={f.label} className="cell">
                  <dt className="label mb-2">{f.label}</dt>
                  <dd className="text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>

            {site.resumeUrl && (
              <a href={site.resumeUrl} className="btn mt-8">
                CV <span aria-hidden>↓</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="exp-title" className="mx-auto max-w-sheet px-5 pt-28 sm:px-10 sm:pt-40">
        <div className="h-px bg-line/40" data-draw />
        <p className="label mb-5 mt-6">
          <span className="text-accent">A</span> — {a.experienceTitle}
        </p>
        <ol className="mt-10 border-t border-line/30" id="exp-title">
          {a.experience.map((job) => (
            <li key={job.org} className="grid gap-6 border-b border-line/30 py-12 lg:grid-cols-12 lg:gap-x-10" data-reveal>
              <p className="font-mono text-sm text-accent lg:col-span-2">{job.period}</p>
              <div className="lg:col-span-4">
                <h3 className="text-4xl sm:text-5xl">{job.role}</h3>
                <p className="mt-3 text-lg">{job.org}</p>
                <p className="label mt-2">{job.place}</p>
              </div>
              <ul className="space-y-3 text-lg leading-relaxed text-muted lg:col-span-6">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-4">
                    <span aria-hidden className="text-accent">
                      —
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Education + certifications */}
      <section className="mx-auto grid max-w-sheet gap-16 px-5 pt-24 sm:px-10 sm:pt-32 lg:grid-cols-2 lg:gap-x-10">
        <div>
          <p className="label mb-5">
            <span className="text-accent">B</span> — {a.educationTitle}
          </p>
          <ul className="border-t border-line/30">
            {a.education.map((e) => (
              <li key={e.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line/30 py-6" data-reveal>
                <span className="font-mono text-xs leading-7 text-accent">{e.year}</span>
                <div>
                  <p className="font-display text-3xl font-bold uppercase leading-none">{e.title}</p>
                  <p className="mt-2">{e.org}</p>
                  <p className="mt-2 text-muted">{e.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-5">
            <span className="text-accent">C</span> — {a.certsTitle}
          </p>
          <ul className="border-t border-line/30">
            {a.certifications.map((c) => (
              <li key={c.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line/30 py-6" data-reveal>
                <span className="font-mono text-xs leading-7 text-accent">{c.year}</span>
                <div>
                  <p className="font-display text-3xl font-bold uppercase leading-none">{c.title}</p>
                  <p className="mt-2 text-muted">{c.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack-title" className="mx-auto max-w-sheet px-5 pt-28 sm:px-10 sm:pt-40">
        <div className="h-px bg-line/40" data-draw />
        <div className="mb-10 mt-6 flex flex-wrap items-end justify-between gap-4">
          <p className="label" id="stack-title">
            <span className="text-accent">D</span> — {a.stackTitle}
          </p>
          <p className="label">
            <span className="text-accent">×n</span> {a.stackNote.replace(/^×n\s*/, "")}
          </p>
        </div>
        <div className="frame bg-sheet/60" data-reveal>
          {a.skills.map((row, i) => (
            <div key={row.group} className="grid gap-4 border-b border-line/30 p-5 last:border-b-0 sm:p-7 lg:grid-cols-12 lg:items-center lg:gap-x-10">
              <div className="flex items-baseline gap-4 lg:col-span-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-4xl sm:text-5xl">{row.group}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 lg:col-span-8">
                {row.items.map((item) => {
                  const n = usage(item);
                  return (
                    <li key={item} className="inline-flex items-baseline gap-1.5 border border-line/35 px-3.5 py-2 font-mono text-xs uppercase tracking-[0.06em]">
                      {item}
                      {n > 0 && <sup className="text-[10px] text-accent">×{n}</sup>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="label mb-5 mt-20">
          <span className="text-accent">E</span> — {a.servicesTitle}
        </p>
        <ul className="grid gap-x-10 border-t border-line/30 sm:grid-cols-2 lg:grid-cols-3">
          {a.services.map((sv, i) => (
            <li key={sv} className="flex items-center gap-4 border-b border-line/30 py-5 text-lg" data-reveal>
              <span className="balloon">{i + 1}</span>
              {sv}
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/work`} className="btn btn-solid mt-12">
          {d.hero.ctaWork} <span aria-hidden>→</span>
        </Link>
      </section>

      <TitleBlock d={d} sheet="03 / 04" title={a.label} />
    </>
  );
}
