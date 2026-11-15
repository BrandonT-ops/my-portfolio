import Image from "next/image";
import Link from "next/link";
import type { Dict, Lang } from "@/content/types";
import { site } from "@/data/site";

/** The card beside the results that sums Brandon up, like a search engine's side panel. */
export default function KnowledgePanel({ lang, d }: { lang: Lang; d: Dict }) {
  const a = d.about;
  return (
    <aside aria-label={site.name} className="overflow-hidden rounded-2xl border border-line/10 bg-sheet shadow-soft">
      <div className="relative aspect-[5/4] bg-panel">
        <Image src={site.portrait} alt={site.name} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover object-[50%_22%]" />
      </div>
      <div className="p-6">
        <h2 className="text-3xl">{site.name}</h2>
        <p className="mt-1 text-muted">{d.meta.role}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-line/85">{a.paragraphs[0]}</p>

        <dl className="mt-5 space-y-2.5 border-t border-line/10 pt-5 text-[15px]">
          {a.facts.map((f) => (
            <div key={f.label} className="flex gap-2">
              <dt className="shrink-0 font-semibold">{f.label}:</dt>
              <dd className="text-line/85">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={`/${lang}/about`} className="btn btn-primary">
            {d.search.panelMore}
          </Link>
          <Link href={`/${lang}/contact`} className="btn">
            {d.nav.contact}
          </Link>
          {site.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="btn">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
