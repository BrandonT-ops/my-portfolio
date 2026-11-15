import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Schematic from "@/components/Schematic";
import TitleBlock from "@/components/TitleBlock";
import { clientName, getDict, getProjectText, isLang, LANGS } from "@/content";
import { getProject, projects } from "@/data/projects";
import { getSystem } from "@/data/systems";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLang(lang) || !project) return {};
  return {
    title: project.title,
    description: getProjectText(lang, slug).summary,
    alternates: alternates(lang, `/work/${slug}`),
  };
}

export default async function CaseStudy({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLang(lang) || !project) notFound();

  const d = getDict(lang);
  const s = d.study;
  const t = getProjectText(lang, slug);
  const index = projects.indexOf(project);
  const no = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const system = getSystem(project.slug, project.stack, d.systemLabels);
  const client = clientName(lang, project.client);
  let fig = 0;
  let sec = 0;
  const secNo = () => String(++sec).padStart(2, "0");

  return (
    <article>
      <header className="mx-auto max-w-sheet px-5 pt-8 sm:px-10 sm:pt-12">
        <div className="label flex flex-wrap items-center justify-between gap-3 border-b border-line/25 pb-4">
          <span>
            <span className="text-accent">DWG {no}</span> — {d.work.cats[project.category]}
          </span>
          <Link href={`/${lang}/work`} className="link">
            ← {s.back}
          </Link>
        </div>

        <div className="grid gap-8 pb-12 pt-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h1 className="text-[clamp(3.75rem,13vw,12rem)] lg:col-span-8">
            {project.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-xl leading-relaxed text-muted lg:col-span-4" data-reveal>
            {t.summary}
          </p>
        </div>

        <dl className="frame grid bg-sheet/60 sm:grid-cols-2 lg:grid-cols-4 [&>div]:border-b sm:[&>div:nth-child(odd)]:border-r lg:[&>div]:border-b-0 lg:[&>div]:border-r lg:[&>div:last-child]:border-r-0 [&>div:last-child]:border-b-0" data-reveal>
          <div className="cell">
            <dt className="label mb-2">{s.role}</dt>
            <dd>{t.role}</dd>
          </div>
          <div className="cell">
            <dt className="label mb-2">{client ? s.client : s.year}</dt>
            <dd>
              {client ?? project.year ?? "—"}
              {client && project.year && <span className="text-muted"> · {project.year}</span>}
            </dd>
          </div>
          <div className="cell">
            <dt className="label mb-2">{s.stack}</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          <div className="cell">
            <dt className="label mb-2">{t.status ? s.status : s.links}</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1">
              {t.status ? (
                <span className="text-muted">{t.status}</span>
              ) : project.links?.length ? (
                project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                    {l.label} ↗
                  </a>
                ))
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mx-auto max-w-sheet space-y-20 px-5 pt-20 sm:px-10 sm:pt-28">
        {project.cover && (
          <figure data-reveal>
            <div className="frame">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={project.cover}
                  alt={`${project.title} — ${s.screenshot}`}
                  fill
                  priority
                  sizes="(min-width: 1536px) 1456px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <figcaption className="label mt-4">
              <span className="text-accent">Fig. {++fig}</span> — {s.screenshot}
            </figcaption>
          </figure>
        )}

        <figure data-reveal>
          <div className="frame bg-panel/55">
            <div className="hidden aspect-[1200/440] p-4 md:block">
              <Schematic
                layers={system}
                width={1200}
                height={440}
                fontSize={16}
                label={`${s.diagramAlt} ${project.title}: ${system.map((l) => l.join(" + ")).join(" → ")}.`}
              />
            </div>
            <ol className="space-y-3 p-5 md:hidden">
              {system.map((layer, i) => (
                <li key={i}>
                  <div className="flex flex-wrap gap-2">
                    {layer.map((n) => (
                      <span key={n} className="border border-line/70 bg-sheet px-3 py-2 font-mono text-xs shadow-[3px_3px_0_0_rgb(var(--accent)/0.85)]">
                        {n}
                      </span>
                    ))}
                  </div>
                  {i < system.length - 1 && (
                    <span aria-hidden className="ml-4 mt-3 block font-mono text-signal">
                      ↓
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="label mt-4 flex flex-wrap justify-between gap-3">
            <span>
              <span className="text-accent">Fig. {++fig}</span> — {s.system}
            </span>
            <span>
              {system.flat().length} {s.parts} · {system.length} {s.layers}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-sheet px-5 pt-24 sm:px-10 sm:pt-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
          <section className="lg:col-span-5">
            <h2 className="label mb-6 !font-mono !font-normal !leading-normal" data-reveal>
              <span className="text-accent">{secNo()}</span> — {s.problem}
            </h2>
            <p className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold uppercase leading-[1]" data-reveal>
              {t.context}
            </p>
          </section>

          <section className="lg:col-span-6 lg:col-start-7">
            <h2 className="label mb-6 !font-mono !font-normal !leading-normal" data-reveal>
              <span className="text-accent">{secNo()}</span> — {s.approach}
            </h2>
            <ol className="border-t border-line/30">
              {t.approach.map((step, i) => (
                <li key={step} className="flex gap-5 border-b border-line/30 py-5 text-lg leading-relaxed" data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                  <span className="balloon mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {t.outcome && (
              <div className="frame mt-14 bg-sheet/60 p-6 sm:p-8" data-reveal>
                <h2 className="label mb-4 !font-mono !font-normal !leading-normal">
                  <span className="text-accent">{secNo()}</span> — {s.outcome}
                </h2>
                <p className="text-xl leading-relaxed">{t.outcome}</p>
              </div>
            )}
          </section>
        </div>

        {t.challenges?.length ? (
          <section className="mt-28 sm:mt-40">
            <div className="h-px bg-line/40" data-draw />
            <h2 className="label mb-2 mt-6 !font-mono !font-normal !leading-normal">
              <span className="text-accent">{secNo()}</span> — {s.hard}
            </h2>
            <ol>
              {t.challenges.map((c, i) => (
                <li key={c.title} className="grid gap-6 border-b border-line/30 py-12 lg:grid-cols-12 lg:gap-x-10" data-reveal>
                  <div className="flex gap-5 lg:col-span-5">
                    <span className="balloon mt-1">{i + 1}</span>
                    <h3 className="text-4xl sm:text-5xl">{c.title}</h3>
                  </div>
                  <div className="space-y-5 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
                    <p className="text-muted">{c.problem}</p>
                    <p>
                      <span className="label mr-3 !text-accent">{s.did}</span>
                      {c.solution}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {t.lessons?.length ? (
          <section className="mt-24 grid gap-10 sm:mt-32 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <p className="label mb-6">
                <span className="text-accent">{secNo()}</span> — {s.looking}
              </p>
              <h2 className="text-[clamp(2.75rem,5vw,4.5rem)]" data-reveal>
                {s.lookingTitle}
              </h2>
            </div>
            <ul className="border-t border-line/30 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
              {t.lessons.map((l) => (
                <li key={l} className="flex gap-5 border-b border-line/30 py-5" data-reveal>
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav aria-label={s.next} className="mt-28 sm:mt-40">
          <div className="h-px bg-line/40" data-draw />
          <Link href={`/${lang}/work/${next.slug}`} className="group block pt-6">
            <span className="label">
              {s.next} · DWG {String(((index + 1) % projects.length) + 1).padStart(2, "0")}
            </span>
            <span className="mt-4 block font-display text-[clamp(3.5rem,11vw,10rem)] font-bold uppercase leading-[0.9] transition-colors group-hover:text-accent">
              {next.title} <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
            </span>
          </Link>
        </nav>
      </div>

      <TitleBlock d={d} sheet={`DWG ${no}`} title={project.title} />
    </article>
  );
}
