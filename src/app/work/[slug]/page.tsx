import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/ui/Cover";
import ButtonLink from "@/components/ui/ButtonLink";
import Atmosphere from "@/components/motion/Atmosphere";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import Schematic from "@/components/ui/Schematic";
import { getSystem } from "@/data/systems";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudy({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const system = getSystem(project.slug, project.stack);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="scene-dark">
        <Atmosphere />
        <div className="mx-auto max-w-wide px-5 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-48">
          <Link href="/#work" className="label link" data-reveal>
            ← All work
          </Link>
          <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-x-8 md:items-end">
            <h1
              data-split
              className="text-[clamp(3.25rem,10vw,10rem)] font-medium leading-[0.88] tracking-[-0.04em] md:col-span-8"
            >
              {project.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="text-xl leading-relaxed text-paper/70 md:col-span-4" data-reveal="0.2">
              {project.summary}
            </p>
          </div>

          <dl className="mt-20 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            <div>
              <dt className="label mb-3">Role</dt>
              <dd className="text-lg">{project.role}</dd>
            </div>
            {project.client && (
              <div>
                <dt className="label mb-3">For</dt>
                <dd className="text-lg">
                  {project.client}
                  {project.year && <span className="text-paper/60"> · {project.year}</span>}
                </dd>
              </div>
            )}
            {!project.client && project.year && (
              <div>
                <dt className="label mb-3">Year</dt>
                <dd className="text-lg">{project.year}</dd>
              </div>
            )}
            <div>
              <dt className="label mb-3">Stack</dt>
              <dd className="text-lg">{project.stack.join(", ")}</dd>
            </div>
            {project.links?.length ? (
              <div>
                <dt className="label mb-3">Links</dt>
                <dd className="flex flex-wrap gap-4 text-lg">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                      {l.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
            {project.status && (
              <div>
                <dt className="label mb-3">Status</dt>
                <dd className="text-lg text-paper/70">{project.status}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {project.cover && (
        <>
      <div className="bg-ink px-5 pb-0 sm:px-10">
        <div
          className="relative mx-auto aspect-[16/9] max-w-wide translate-y-24 overflow-hidden border-2 border-ink shadow-hard-accent"
          data-reveal
        >
          <div className="absolute inset-0" data-zoom>
            <Cover project={project} index={index} priority sizes="(min-width: 1600px) 1600px, 100vw" />
          </div>
        </div>
      </div>
        </>
      )}

      <section aria-labelledby="system-label" className={`scene-dark border-t border-paper/10 ${project.cover ? "mt-24" : ""}`}>
        <div className="grid-lines" aria-hidden />
        <div className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="system-label" className="label" data-reveal>
              <span className="text-accent">00</span> — How it fits together
            </h2>
            <p className="label" data-reveal>
              {system.flat().length} parts · {system.length} layers
            </p>
          </div>

          <div className="mt-12 hidden aspect-[1200/460] md:block" data-reveal>
            <Schematic
              layers={system}
              width={1200}
              height={460}
              fontSize={16}
              label={`System diagram for ${project.title}: ${system.map((l) => l.join(" and ")).join(", then ")}.`}
            />
          </div>

          <ol className="mt-10 space-y-3 md:hidden" data-reveal-stagger>
            {system.map((layer, i) => (
              <li key={i}>
                <div className="flex flex-wrap gap-2">
                  {layer.map((n) => (
                    <span key={n} className="border border-paper/60 bg-ink px-3 py-2 font-mono text-xs shadow-[3px_3px_0_0_rgb(var(--accent)/0.6)]">
                      {n}
                    </span>
                  ))}
                </div>
                {i < system.length - 1 && (
                  <span aria-hidden className="ml-4 mt-3 block font-mono text-highlight">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-wide px-5 pb-32 pt-28 sm:px-10 sm:pb-48 sm:pt-40">
        <div className="grid gap-20 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <section className="md:col-span-5">
            <h2 className="label mb-6" data-reveal>
              <span className="text-accent">01</span> — The problem
            </h2>
            <p data-split className="font-display text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-4xl">
              {project.context}
            </p>
          </section>
          <section className="md:col-span-6 md:col-start-7">
            <h2 className="label mb-6" data-reveal>
              <span className="text-accent">02</span> — The approach
            </h2>
            <ol className="border-t border-ink/15 text-lg leading-relaxed" data-reveal-stagger>
              {project.approach.map((step, i) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] border-b border-ink/15 py-6">
                  <span className="font-mono text-xs leading-8 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {project.outcome && (
              <>
                <h2 className="label mb-6 mt-20" data-reveal>
                  <span className="text-accent">03</span> — The outcome
                </h2>
                <p className="text-xl leading-relaxed" data-reveal>
                  {project.outcome}
                </p>
              </>
            )}
          </section>
        </div>

        {project.challenges?.length ? (
          <section className="mt-28 sm:mt-40">
            <h2 className="label mb-10" data-reveal>
              <span className="text-accent">{project.outcome ? "04" : "03"}</span> — The hard parts
            </h2>
            <ol className="border-t-2 border-ink">
              {project.challenges.map((c, i) => (
                <li key={c.title} className="grid gap-6 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-x-8 md:py-14" data-reveal>
                  <span className="font-mono text-sm text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:col-span-4">{c.title}</h3>
                  <div className="space-y-5 text-lg leading-relaxed md:col-span-7">
                    <p className="text-muted">{c.problem}</p>
                    <p>
                      <span className="label mr-3 text-accent">What we did</span>
                      {c.solution}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {project.lessons?.length ? (
          <section className="mt-28 grid gap-10 sm:mt-40 md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-5">
              <h2 className="label mb-6" data-reveal>
                <span className="text-accent">↺</span> — Looking back
              </h2>
              <p data-split className="font-display text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl">
                What I&apos;d do differently today.
              </p>
            </div>
            <ul className="border-t border-ink/15 text-lg leading-relaxed md:col-span-7" data-reveal-stagger>
              {project.lessons.map((l) => (
                <li key={l} className="grid grid-cols-[2rem_1fr] border-b border-ink/15 py-6">
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <nav aria-label="Next project" className="scene-dark">
        <Atmosphere glows={false} horizon />
        <div className="mx-auto flex max-w-wide flex-col gap-12 px-5 py-32 sm:px-10 sm:py-44 lg:flex-row lg:items-end lg:justify-between">
          <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block">
            <span className="label">Next project</span>
            <span className="mt-6 block font-display text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] transition-colors duration-500 group-hover:text-highlight">
              {next.title}
              <span className="inline-block transition-transform duration-700 group-hover:translate-x-4"> →</span>
            </span>
          </Link>
          <div data-magnetic className="self-start lg:self-auto">
            <ButtonLink href={`mailto:${site.email}`} external>
              Work with me
            </ButtonLink>
          </div>
        </div>
      </nav>
    </article>
  );
}
