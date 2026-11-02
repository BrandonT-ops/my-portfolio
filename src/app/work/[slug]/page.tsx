import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/ui/Cover";
import ButtonLink from "@/components/ui/ButtonLink";
import Atmosphere from "@/components/motion/Atmosphere";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

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
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="scene-dark">
        <Atmosphere />
        <div className="mx-auto max-w-wide px-5 pb-24 pt-36 sm:px-10 sm:pb-32 sm:pt-48">
          <Link href="/#work" className="label link" data-reveal>
            ← All work
          </Link>
          <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-end">
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

          <dl className="mt-20 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-3" data-reveal-stagger>
            <div>
              <dt className="label mb-3">Role</dt>
              <dd className="text-lg">{project.role}</dd>
            </div>
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
            ) : project.year ? (
              <div>
                <dt className="label mb-3">Year</dt>
                <dd className="text-lg">{project.year}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

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

      <div className="mx-auto max-w-wide px-5 pb-32 pt-48 sm:px-10 sm:pb-48 sm:pt-64">
        <div className="grid gap-20 md:grid-cols-12">
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
