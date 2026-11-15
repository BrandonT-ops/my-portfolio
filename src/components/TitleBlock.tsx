import LocalTime from "@/components/LocalTime";
import { CrosshairToggle } from "@/components/Crosshair";
import type { Dict } from "@/content/types";
import { site } from "@/data/site";

/**
 * The title block that closes every sheet, as on a technical drawing:
 * who drew it, where, which sheet this is, and how to get in touch.
 */
export default function TitleBlock({ d, sheet, title }: { d: Dict; sheet: string; title: string }) {
  const rev = new Date().toISOString().slice(0, 7).replace("-", ".");
  const b = d.block;

  return (
    <footer id="contact" className="mx-auto max-w-sheet scroll-mt-20 px-5 pb-12 pt-24 sm:px-10 sm:pt-36">
      <div className="frame bg-sheet/60" data-reveal>
        <div className="grid lg:grid-cols-12">
          <div className="cell border-b lg:col-span-7 lg:border-b-0 lg:border-r">
            <p className="label">{b.cta}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block break-all font-display text-[clamp(1.9rem,5.2vw,4.75rem)] font-bold uppercase leading-[0.95] transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-solid mt-8">
              {b.ctaButton} <span aria-hidden>→</span>
            </a>
          </div>

          <dl className="grid grid-cols-2 lg:col-span-5 [&>div]:border-b [&>div:nth-child(odd)]:border-r [&>div:nth-last-child(-n+2)]:border-b-0">
            <div className="cell">
              <dt className="label mb-2">{b.drawnBy}</dt>
              <dd className="font-mono text-sm uppercase tracking-[0.08em]">{site.name}</dd>
            </div>
            <div className="cell">
              <dt className="label mb-2">{b.location}</dt>
              <dd className="font-mono text-sm uppercase tracking-[0.08em]">
                {d.meta.location}
                <br />
                <LocalTime className="text-muted" />
              </dd>
            </div>
            <div className="cell">
              <dt className="label mb-2">{b.sheet}</dt>
              <dd className="font-mono text-sm uppercase tracking-[0.08em]">
                <span className="text-accent">{sheet}</span> · {title}
              </dd>
            </div>
            <div className="cell">
              <dt className="label mb-2">
                {b.revision} · {b.scale}
              </dt>
              <dd className="font-mono text-sm uppercase tracking-[0.08em]">{rev} · 1:1</dd>
            </div>
            <div className="cell">
              <dt className="label mb-2">{b.links}</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm uppercase tracking-[0.08em]">
                {site.socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                    {s.label} ↗
                  </a>
                ))}
              </dd>
            </div>
            <div className="cell">
              <dt className="label mb-2">
                <span className="hidden lg:inline">{b.crosshair} · </span>↑
              </dt>
              <dd className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <CrosshairToggle label={b.crosshair} onText={b.on} offText={b.off} />
                <a href="#main" className="link font-mono text-sm uppercase tracking-[0.08em]">
                  {b.top}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="label mt-6">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
