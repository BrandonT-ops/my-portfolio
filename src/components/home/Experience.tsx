import { about } from "@/data/site";

/** Work history, education and certifications (all from site.ts → about). */
export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-label" className="relative bg-paper">
      <div className="mx-auto max-w-wide px-5 pb-32 sm:px-10 sm:pb-48">
        <div className="rule pt-6">
          <p id="experience-label" className="label mb-12 sm:mb-16" data-reveal>
            <span className="text-accent">03</span> — Experience
          </p>
          <h2
            data-split
            className="mb-16 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em] sm:mb-24"
          >
            Where I&apos;ve shipped work.
          </h2>
        </div>

        <ol className="border-t-2 border-ink">
          {about.experience.map((job) => (
            <li
              key={`${job.org}-${job.period}`}
              className="group grid gap-6 border-b border-ink/15 py-10 transition-colors hover:bg-highlight/15 md:grid-cols-12 md:gap-8 md:py-14"
              data-reveal
            >
              <p className="font-mono text-sm text-accent md:col-span-2">{job.period}</p>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{job.role}</h3>
                <p className="mt-2 text-lg">{job.org}</p>
                <p className="label mt-2">{job.place}</p>
              </div>
              <ul className="space-y-3 text-lg leading-relaxed text-muted md:col-span-6">
                {job.points.map((pt) => (
                  <li key={pt} className="grid grid-cols-[1.25rem_1fr]">
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

        <div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-20 sm:mt-32">
          <div>
            <p className="label mb-6" data-reveal>
              Education
            </p>
            <ul className="border-t border-ink/15" data-reveal-stagger>
              {about.education.map((e) => (
                <li key={e.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink/15 py-6">
                  <span className="font-mono text-xs leading-7 text-accent">{e.year}</span>
                  <div>
                    <p className="text-xl font-medium">{e.title}</p>
                    <p className="mt-1">{e.org}</p>
                    <p className="mt-2 text-muted">{e.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-6" data-reveal>
              Certifications & programs
            </p>
            <ul className="border-t border-ink/15" data-reveal-stagger>
              {about.certifications.map((c) => (
                <li key={c.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink/15 py-6">
                  <span className="font-mono text-xs leading-7 text-accent">{c.year}</span>
                  <div>
                    <p className="text-xl font-medium">{c.title}</p>
                    <p className="mt-1 text-muted">{c.org}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
