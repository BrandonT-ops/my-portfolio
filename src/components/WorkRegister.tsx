"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/data/projects";

export interface RegisterRow {
  no: string;
  href: string;
  title: string;
  summary: string;
  client: string;
  year: string;
  category: Category;
}

/** The drawing register: every project in one table, filterable by type. */
export default function WorkRegister({
  rows,
  cats,
  cols,
  allLabel,
  shownLabel,
}: {
  rows: RegisterRow[];
  cats: Record<Category, string>;
  cols: { no: string; project: string; client: string; year: string; type: string };
  allLabel: string;
  shownLabel: string;
}) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const shown = rows.filter((r) => filter === "all" || r.category === filter);
  const options: [Category | "all", string, number][] = [
    ["all", allLabel, rows.length],
    ...(Object.keys(cats) as Category[]).map((c): [Category, string, number] => [c, cats[c], rows.filter((r) => r.category === c).length]),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={cols.type} className="flex flex-wrap gap-2">
          {options.map(([key, label, n]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                filter === key ? "border-accent bg-accent text-sheet" : "border-line/40 text-muted hover:border-line hover:text-line"
              }`}
            >
              {label} <span className="opacity-70">({n})</span>
            </button>
          ))}
        </div>
        <p className="label" aria-live="polite">
          {String(shown.length).padStart(2, "0")} / {String(rows.length).padStart(2, "0")} {shownLabel}
        </p>
      </div>

      <div className="frame mt-8 bg-sheet/60">
        <div className="label hidden grid-cols-[4.5rem_1fr_15rem_8rem_11rem_2rem] gap-4 border-b border-line/45 px-5 py-3 lg:grid">
          <span>{cols.no}</span>
          <span>{cols.project}</span>
          <span>{cols.client}</span>
          <span>{cols.year}</span>
          <span>{cols.type}</span>
          <span />
        </div>
        <ul>
          {shown.map((r) => (
            <li key={r.href} className="border-b border-line/20 last:border-b-0">
              <Link
                href={r.href}
                className="group grid gap-x-4 gap-y-2 px-5 py-5 transition-colors hover:bg-panel/70 lg:grid-cols-[4.5rem_1fr_15rem_8rem_11rem_2rem] lg:items-baseline"
              >
                <span className="font-mono text-xs text-accent">{r.no}</span>
                <span>
                  <span className="block font-display text-3xl font-bold uppercase leading-none transition-colors group-hover:text-accent sm:text-4xl">
                    {r.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-[15px] leading-snug text-muted">{r.summary}</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{r.client}</span>
                <span className="font-mono text-xs text-muted">{r.year}</span>
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{cats[r.category]}</span>
                <span aria-hidden className="hidden text-right text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent lg:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
