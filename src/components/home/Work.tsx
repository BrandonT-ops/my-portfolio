import Link from "next/link";
import Section from "@/components/ui/Section";
import Cover from "@/components/ui/Cover";
import { featuredProjects, otherProjects } from "@/data/projects";

export default function Work() {
  return (
    <Section id="work" index="01" label="Selected work" title="Products built end to end — from the first sketch to the server.">
      <ol className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink shadow-hard transition-[transform,box-shadow] duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0_0_rgb(var(--ink))]">
                <Cover project={p} />
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-medium transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted">{p.summary}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {p.stack.join(" · ")}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {otherProjects.length > 0 && (
        <div className="mt-20">
          <p className="label mb-4">Also built</p>
          <ul className="border-t border-ink/15">
            {otherProjects.map((p) => (
              <li key={p.slug} className="border-b border-ink/15">
                <Link
                  href={`/work/${p.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[14rem_1fr_auto]"
                >
                  <span className="font-display text-lg font-medium group-hover:text-accent">{p.title}</span>
                  <span className="hidden text-muted sm:block">{p.summary}</span>
                  <span aria-hidden className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
