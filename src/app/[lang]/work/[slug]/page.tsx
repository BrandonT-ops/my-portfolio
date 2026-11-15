import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Schematic from "@/components/Schematic";
import { clientName, getDict, getProjectText, isLang, LANGS } from "@/content";
import { getProject, projects } from "@/data/projects";
import { getSystem } from "@/data/systems";
import { alternates } from "@/lib/seo";
import { buildSuggestions } from "@/lib/search-index";

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

/** A project, laid out like a product page: big headline, rounded cards, one idea per section. */
export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLang(lang) || !project) notFound();

  const d = getDict(lang);
  const s = d.study;
  const t = getProjectText(lang, slug);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const nextText = getProjectText(lang, next.slug);
  const system = getSystem(project.slug, project.stack, d.systemLabels);
  const client = clientName(lang, project.client);

  const diagram = (
    <>
      <div className="hidden aspect-[1200/430] md:block">
        <Schematic
          layers={system}
          width={1200}
          height={430}
          fontSize={16}
          label={`${s.diagramAlt} ${project.title}: ${system.map((l) => l.join(" + ")).join(" → ")}.`}
        />
      </div>
      <ol className="space-y-3 md:hidden">
        {system.map((layer, i) => (
          <li key={i}>
            <div className="flex flex-wrap gap-2">
              {layer.map((n) => (
                <span key={n} className="rounded-2xl border border-line/80 bg-sheet px-3 py-2 font-mono text-xs shadow-[3px_3px_0_0_rgb(var(--accent)/0.22)]">
                  {n}
                </span>
              ))}
            </div>
            {i < system.length - 1 && (
              <span aria-hidden className="ml-4 mt-3 block text-accent">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </>
  );

  return (
    <>
      <Header lang={lang} nav={d.nav} t={d.search} suggestions={buildSuggestions(lang)} />

      <main id="main" className="mx-auto w-full max-w-page px-4 sm:px-6">
        <article>
          {/* Hero */}
          <header className="pb-12 pt-10 text-center sm:pb-16 sm:pt-16">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href={`/${lang}/search?t=projects`} className="hover:text-accent">
                {d.search.projectsCrumb}
              </Link>{" "}
              › <span className="text-line">{project.title}</span>
            </nav>
            <p className="mt-8">
              <span className="tag">{d.work.cats[project.category]}</span>
            </p>
            <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.98]">
              {project.title}
              <span className="text-signal">.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted">{t.summary}</p>
            {project.links?.length ? (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {project.links.map((l, i) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn-primary" : ""}`}>
                    {d.search.visit} {l.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
            {t.status && (
              <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-panel px-4 py-2 text-sm text-line">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden />
                {t.status}
              </p>
            )}
          </header>

          {/* Visual: screenshot in a browser frame, or the system diagram */}
          <div data-reveal>
            {project.cover ? (
              <figure className="overflow-hidden rounded-2xl border border-line/10 bg-panel shadow-soft">
                <div className="flex items-center gap-2 px-5 py-3.5" aria-hidden>
                  <span className="h-3 w-3 rounded-full bg-line/15" />
                  <span className="h-3 w-3 rounded-full bg-line/15" />
                  <span className="h-3 w-3 rounded-full bg-line/15" />
                  <span className="ml-3 flex-1 truncate rounded-full bg-sheet px-4 py-1 text-xs text-muted">
                    {project.links?.[0]?.href.replace(/^https?:\/\/(www\.)?/, "") ?? project.title}
                  </span>
                </div>
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <Image
                    src={project.cover}
                    alt={`${project.title} — ${s.screenshot}`}
                    fill
                    priority
                    sizes="(min-width: 1216px) 1168px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            ) : (
              <figure className="card">
                <figcaption className="label mb-4 flex flex-wrap justify-between gap-2">
                  <span>{s.system}</span>
                  <span>
                    {system.flat().length} {s.parts} · {system.length} {s.layers}
                  </span>
                </figcaption>
                {diagram}
              </figure>
            )}
          </div>

          {/* At a glance */}
          <section aria-label={d.search.atAGlance} className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              [s.role, t.role],
              [client ? s.client : s.year, [client, project.year].filter(Boolean).join(" · ") || "—"],
              [s.stack, project.stack.join(", ")],
            ].map(([k, v], i) => (
              <div key={k} className="card-outline" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <p className="label">{k}</p>
                <p className="mt-2 text-lg leading-snug">{v}</p>
              </div>
            ))}
          </section>

          {/* Problem */}
          <section className="mx-auto max-w-4xl py-20 text-center sm:py-28">
            <h2 className="label !font-sans !text-xs !font-medium" data-reveal>
              {s.problem}
            </h2>
            <p className="mt-6 font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.02em]" data-reveal>
              {t.context}
            </p>
          </section>

          {/* Approach */}
          <section aria-labelledby="approach">
            <h2 id="approach" className="text-[clamp(2.25rem,5vw,3.75rem)]" data-reveal>
              {s.approach}
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {t.approach.map((step, i) => (
                <li
                  key={step}
                  className={`card flex gap-5 ${t.approach.length % 2 === 1 && i === t.approach.length - 1 ? "md:col-span-2" : ""}`}
                  data-reveal
                  style={{ "--d": `${(i % 2) * 80}ms` } as React.CSSProperties}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-white ${["bg-ox", "bg-sky", "bg-leaf", "bg-gold"][i % 4]}`}>
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-lg leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Outcome */}
          {t.outcome && (
            <section className="mt-6 rounded-2xl bg-panel p-8 sm:p-12" data-reveal>
              <h2 className="label">{s.outcome}</h2>
              <p className="mt-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-snug">{t.outcome}</p>
            </section>
          )}

          {/* Diagram (when the hero showed a screenshot) */}
          {project.cover && (
            <section className="mt-20 sm:mt-28" aria-labelledby="system">
              <h2 id="system" className="text-[clamp(2.25rem,5vw,3.75rem)]" data-reveal>
                {s.system}
              </h2>
              <div className="card mt-8" data-reveal>
                {diagram}
              </div>
            </section>
          )}

          {/* Hard parts */}
          {t.challenges?.length ? (
            <section className="mt-20 sm:mt-28" aria-labelledby="hard">
              <h2 id="hard" className="text-[clamp(2.25rem,5vw,3.75rem)]" data-reveal>
                {s.hard}
              </h2>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {t.challenges.map((c) => (
                  <div key={c.title} className="card-outline" data-reveal>
                    <h3 className="text-2xl leading-tight sm:text-3xl">{c.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted">{c.problem}</p>
                    <div className="mt-5 rounded-2xl bg-panel p-5">
                      <p className="label !text-accent">{s.did}</p>
                      <p className="mt-2 leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Lessons */}
          {t.lessons?.length ? (
            <section className="mt-20 sm:mt-28" aria-labelledby="lessons">
              <p className="label" data-reveal>
                {s.looking}
              </p>
              <h2 id="lessons" className="mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]" data-reveal>
                {s.lookingTitle}
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {t.lessons.map((l, i) => (
                  <li key={l} className="card" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                    <p className="leading-relaxed">{l}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Next */}
          <nav aria-label={s.next} className="mt-20 sm:mt-28">
            <Link
              href={`/${lang}/work/${next.slug}`}
              className="group flex flex-wrap items-end justify-between gap-6 rounded-2xl bg-panel p-8 transition hover:shadow-lift sm:p-12"
              data-reveal
            >
              <span>
                <span className="text-sm text-muted">{s.next}</span>
                <span className="mt-2 block font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.02em]">{next.title}</span>
                <span className="mt-3 block max-w-xl text-muted">{nextText.summary}</span>
              </span>
              <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-line text-2xl text-sheet transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
