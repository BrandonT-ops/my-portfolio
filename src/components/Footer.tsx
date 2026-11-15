import Link from "next/link";
import LocalTime from "@/components/LocalTime";
import type { Dict, Lang } from "@/content/types";
import { site } from "@/data/site";

/** Grey footer bar, the way search engines end a page: where, then the links. */
export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  return (
    <footer id="contact" className="mt-24 bg-panel text-sm text-muted">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 border-b border-line/10 px-4 py-4 sm:px-6">
        <p className="flex flex-wrap items-center gap-x-3">
          <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden />
          {d.meta.location} · <LocalTime />
        </p>
        <Link href={`/${lang}/contact`} className="font-medium text-accent hover:underline">
          {d.nav.contact} →
        </Link>
      </div>
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
        <p>
          © {new Date().getFullYear()} {d.search.footer}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href={`/${lang}/search?t=projects`} className="hover:text-accent">
              {d.search.tabs.projects}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/about`} className="hover:text-accent">
              {d.nav.about}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/photography`} className="hover:text-accent">
              {d.nav.photo}
            </Link>
          </li>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
