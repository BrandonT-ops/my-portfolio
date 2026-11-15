"use client";

import { useMemo, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Schematic from "@/components/Schematic";
import type { Suggestion } from "@/components/SearchBox";
import type { Dict, Lang } from "@/content/types";
import { search, tokens, type ResultType, type SearchItem } from "@/lib/search";

type Tab = "all" | "projects" | "images" | "about";
const TABS: Tab[] = ["all", "projects", "images", "about"];
const ICON: Record<ResultType, string> = { project: "◆", page: "▤", experience: "●", skill: "#", education: "▲", photo: "▣" };

/** Wrap the parts of a text that match the search words in <mark>. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="bg-transparent font-semibold text-line">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * The results page. Everything is searched in the browser from an index
 * built at deploy time, so results appear instantly and the timing shown
 * is the real time the search took.
 */
export default function ResultsView({
  lang,
  items,
  suggestions,
  nav,
  t,
  host,
  panel,
}: {
  lang: Lang;
  items: SearchItem[];
  suggestions: Suggestion[];
  nav: Dict["nav"];
  t: Dict["search"];
  host: string;
  panel: ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const tab: Tab = TABS.includes(params.get("t") as Tab) ? (params.get("t") as Tab) : "all";
  const words = useMemo(() => tokens(q), [q]);

  const { results, ms } = useMemo(() => search(items, q), [items, q]);
  const shown = results.filter((r) =>
    tab === "all"
      ? r.type !== "photo" || q !== ""
      : tab === "projects"
        ? r.type === "project"
        : tab === "images"
          ? r.type === "project" || r.type === "photo"
          : r.type !== "project" && r.type !== "photo",
  );

  const go = (next: Tab) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (next !== "all") sp.set("t", next);
    router.replace(`/${lang}/search${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  const seconds = Math.max(ms / 1000, 0.0001).toFixed(4);
  const showPanel = tab !== "images" && (tab === "about" || !q || shown.some((r) => r.type !== "project") || /brandon|tapiba/i.test(q));

  return (
    <>
      <Header lang={lang} nav={nav} t={t} suggestions={suggestions} q={q} />

      <div className="border-b border-line/10">
        <div role="tablist" aria-label={t.button} className="mx-auto flex max-w-page gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => go(k)}
              className={`whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-medium transition-colors ${
                tab === k ? "border-accent text-accent" : "border-transparent text-muted hover:text-line"
              }`}
            >
              {t.tabs[k]}
            </button>
          ))}
        </div>
      </div>

      <main id="main" className="mx-auto max-w-page px-4 pb-10 pt-5 sm:px-6">
        <p className="text-sm text-muted" aria-live="polite">
          {t.stats.replace("{n}", String(shown.length)).replace("{s}", seconds)}
        </p>
        {!q && <p className="mt-3 rounded-2xl bg-panel px-4 py-3 text-sm text-line">{t.browseHint}</p>}

        {shown.length === 0 ? (
          <div className="py-12">
            <p className="text-xl">
              {t.none} <strong>“{q}”</strong>.
            </p>
            <p className="mt-6 text-muted">{t.noneHint}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.tries.map((s) => (
                <li key={s}>
                  <Link href={`/${lang}/search?q=${encodeURIComponent(s)}`} className="chip">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : tab === "images" ? (
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((r) => (
              <li key={r.id}>
                <Link href={r.href} className="group block" aria-label={`${t.openImage}: ${r.title}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-panel ring-1 ring-line/10 transition group-hover:shadow-lift">
                    {r.cover ? (
                      <Image
                        src={r.cover}
                        alt={r.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className={`object-cover ${r.type === "photo" ? "" : "object-top"}`}
                      />
                    ) : (
                      r.system && (
                        <div className="absolute inset-[4%]">
                          <Schematic layers={r.system} fontSize={19} gapRatio={0.05} />
                        </div>
                      )
                    )}
                  </div>
                  <p className="mt-2 truncate text-sm font-medium group-hover:text-accent">{r.title}</p>
                  <p className="truncate text-xs text-muted">{r.type === "photo" ? r.snippet : r.chips.slice(0, 2).join(" · ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
            <ol className="max-w-2xl space-y-9">
              {shown.map((r) => (
                <li key={r.id}>
                  <article>
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-panel text-xs text-muted">
                        {ICON[r.type]}
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p className="text-sm">{t.types[r.type]}</p>
                        <p className="truncate text-xs text-muted">
                          {host} › {lang} › {r.crumbs}
                        </p>
                      </div>
                    </div>
                    <h3 className="mt-2 text-[1.4rem] font-medium leading-snug">
                      <Link href={r.href} className="text-accent hover:underline">
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-1 line-clamp-3 text-[15px] leading-relaxed text-muted">
                      <Highlight text={r.snippet} words={words} />
                    </p>
                    {r.chips.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {r.chips.slice(0, 5).map((c) => (
                          <li key={c} className="tag">
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              ))}
            </ol>

            {showPanel && <div className="lg:sticky lg:top-24 lg:self-start">{panel}</div>}
          </div>
        )}

        <section aria-labelledby="related" className="mt-16 max-w-2xl">
          <h2 id="related" className="text-xl">
            {t.related}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.tries
              .filter((s) => s.toLowerCase() !== q.toLowerCase())
              .concat(["Angular", "Supabase", "Next.js"])
              .slice(0, 6)
              .map((s) => (
                <li key={s}>
                  <Link
                    href={`/${lang}/search?q=${encodeURIComponent(s)}`}
                    className="flex items-center gap-3 rounded-md bg-panel px-5 py-3 text-[15px] font-medium transition hover:shadow-press"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                    {s}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}
