import type { Category } from "@/data/projects";

export type ResultType = "project" | "page" | "experience" | "skill" | "education" | "photo";

/** One thing the search can find. Built on the server (see lib/search-index.ts), searched in the browser. */
export interface SearchItem {
  id: string;
  type: ResultType;
  title: string;
  href: string;
  /** Breadcrumb shown above the title, e.g. "work › maguida". */
  crumbs: string;
  snippet: string;
  /** Extra searchable text that is not displayed. */
  text: string;
  chips: string[];
  featured?: boolean;
  /** Projects only: screenshot path, or the blueprint to draw when there is none. */
  cover?: string;
  system?: string[][];
  /** Photos only: pixel size, for the image grid. */
  width?: number;
  height?: number;
  category?: Category;
}

/** Lower-case and strip accents, so "experience" finds "Expérience". */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const tokens = (q: string) => normalize(q).split(/\s+/).filter(Boolean);

/**
 * Rank items against a query. Every word must appear somewhere in the item;
 * matches in the title count most, then tags, then body text.
 */
export function search(items: SearchItem[], q: string): { results: SearchItem[]; ms: number } {
  const start = performance.now();
  const words = tokens(q);
  let results: SearchItem[];

  if (words.length === 0) {
    results = [...items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  } else {
    const scored: [number, SearchItem][] = [];
    for (const it of items) {
      const title = normalize(it.title);
      const chips = normalize(it.chips.join(" "));
      const body = normalize(`${it.snippet} ${it.text} ${it.crumbs}`);
      let score = 0;
      let all = true;
      for (const w of words) {
        let s = 0;
        if (title.includes(w)) s += title.startsWith(w) ? 8 : 6;
        if (chips.includes(w)) s += 3;
        if (body.includes(w)) s += 1;
        if (s === 0) {
          all = false;
          break;
        }
        score += s;
      }
      if (all) scored.push([score + (it.featured ? 0.5 : 0) + (it.type === "project" ? 0.25 : 0), it]);
    }
    results = scored.sort((a, b) => b[0] - a[0]).map(([, it]) => it);
  }
  return { results, ms: performance.now() - start };
}
