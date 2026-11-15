"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Dict, Lang } from "@/content/types";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Item = { label: string; hint: string; group: string; href: string; external?: boolean };

const OPEN_EVENT = "palette:open";

/** Small button that opens quick search (used in the nav). */
export function PaletteButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      aria-label={label}
      className="border border-line/40 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent"
    >
      ⌘K
    </button>
  );
}

/**
 * Quick search: ⌘K / Ctrl+K (or "/") opens it. Type to filter pages and
 * projects, arrows to move, Enter to go, Esc to close.
 */
export default function CommandPalette({ lang, nav, t }: { lang: Lang; nav: Dict["nav"]; t: Dict["palette"] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const items = useMemo<Item[]>(
    () => [
      { label: nav.home, hint: "01", group: t.pages, href: `/${lang}` },
      { label: nav.work, hint: "02", group: t.pages, href: `/${lang}/work` },
      { label: nav.about, hint: "03", group: t.pages, href: `/${lang}/about` },
      { label: nav.photo, hint: "04", group: t.pages, href: `/${lang}/photography` },
      ...projects.map((p) => ({ label: p.title, hint: p.stack.slice(0, 3).join(" · "), group: t.projects, href: `/${lang}/work/${p.slug}` })),
      { label: t.email, hint: site.email, group: t.contact, href: `mailto:${site.email}`, external: true },
      ...site.socials.map((s) => ({ label: s.label, hint: t.newTab, group: t.contact, href: s.href, external: true })),
    ],
    [lang, nav, t],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((it) => `${it.label} ${it.hint} ${it.group}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    document.documentElement.style.overflow = "";
    opener.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  const go = useCallback(
    (it: Item) => {
      close();
      if (it.external) window.open(it.href, it.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
      else router.push(it.href);
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !open)) {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, close, show]);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus in the search box while open
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-sheet/80 backdrop-blur-sm" onClick={close} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label={nav.search} className="palette-in frame relative w-full max-w-xl bg-panel">
        <div className="flex items-center gap-3 border-b border-line/45 px-4">
          <span aria-hidden className="font-mono text-sm text-accent">
            ›
          </span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${active}` : undefined}
            className="h-14 w-full bg-transparent font-mono text-sm text-line outline-none placeholder:text-muted"
          />
        </div>
        <ul ref={list} id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto overscroll-contain py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 font-mono text-sm text-muted">
              {t.empty} “{query}”.
            </li>
          )}
          {results.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={`${it.group}-${it.label}`} role="presentation">
                {header && <p className="label px-4 pb-1 pt-3">{header}</p>}
                <div
                  id={`palette-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(it)}
                  className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2 ${i === active ? "bg-accent text-sheet" : ""}`}
                >
                  <span className="font-display text-2xl font-bold uppercase leading-none">{it.label}</span>
                  <span className={`truncate font-mono text-[11px] uppercase tracking-[0.08em] ${i === active ? "text-sheet/70" : "text-muted"}`}>
                    {it.hint}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between border-t border-line/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <span>{t.hint}</span>
          <span>
            {results.length} {t.results}
          </span>
        </div>
      </div>
    </div>
  );
}
