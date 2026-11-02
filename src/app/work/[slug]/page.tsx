import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/ui/Cover";
import ButtonLink from "@/components/ui/ButtonLink";
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
    <article className="mx-auto max-w-page px-5 pb-10 pt-12 sm:px-8 sm:pt-20">
      <Link href="/#work" className="label link">
        ← All work
      </Link>

      <header className="mt-10 grid gap-10 md:grid-cols-12">
        <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.95] md:col-span-8">
          {project.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="text-lg leading-relaxed text-muted md:col-span-4 md:self-end">{project.summary}</p>
      </header>

      <dl className="mt-12 grid gap-6 border-y border-ink/15 py-6 sm:grid-cols-3">
        <div>
          <dt className="label mb-2">Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt className="label mb-2">Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
        </div>
        {project.links?.length ? (
          <div>
            <dt className="label mb-2">Links</dt>
            <dd className="flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                  {l.label} ↗
                </a>
              ))}
            </dd>
          </div>
        ) : project.year ? (
          <div>
            <dt className="label mb-2">Year</dt>
            <dd>{project.year}</dd>
          </div>
        ) : null}
      </dl>

      <div className="relative mt-14 aspect-[16/9] overflow-hidden border-2 border-ink shadow-hard">
        <Cover project={project} priority sizes="(min-width: 1152px) 1152px, 100vw" />
      </div>

      <div className="mt-20 grid gap-14 md:grid-cols-12">
        <section className="md:col-span-4">
          <h2 className="label mb-4">The problem</h2>
          <p className="font-display text-2xl font-medium leading-snug">{project.context}</p>
        </section>
        <section className="md:col-span-7 md:col-start-6">
          <h2 className="label mb-4">The approach</h2>
          <ol className="space-y-5 text-lg leading-relaxed">
            {project.approach.map((step, i) => (
              <li key={step} className="grid grid-cols-[2.5rem_1fr]">
                <span className="font-mono text-xs leading-8 text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {project.outcome && (
            <>
              <h2 className="label mb-4 mt-14">The outcome</h2>
              <p className="text-lg leading-relaxed">{project.outcome}</p>
            </>
          )}
        </section>
      </div>

      <nav aria-label="Next project" className="mt-24 flex flex-col gap-8 border-t border-ink/15 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <Link href={`/work/${next.slug}`} className="group">
          <span className="label">Next project</span>
          <span className="mt-3 block font-display text-4xl font-medium transition-colors group-hover:text-accent sm:text-5xl">
            {next.title} →
          </span>
        </Link>
        <ButtonLink href={`mailto:${site.email}`} external>
          Work with me
        </ButtonLink>
      </nav>
    </article>
  );
}
