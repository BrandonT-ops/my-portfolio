"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLenis } from "@/components/motion/MotionProvider";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Item = { label: string; hint: string; group: string; run: "section" | "route" | "link"; target: string };

const SECTIONS: [string, string][] = [
  ["Work", "work"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Photography", "photography"],
  ["Contact", "contact"],
];

const OPEN_EVENT = "palette:open";

/** Small button that opens the palette (used in the nav). */
export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      aria-label="Open quick search"
      className="hidden items-center gap-1.5 rounded border border-white/40 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:border-white md:inline-flex"
    >
      <span aria-hidden>⌘K</span>
      <span className="sr-only">Quick search</span>
    </button>
  );
}

/**
 * Quick search: ⌘K / Ctrl+K (or "/") opens it. Type to filter sections and
 * projects, arrows to move, Enter to go, Esc to close.
 */
export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const items = useMemo<Item[]>(
    () => [
      ...SECTIONS.map(([label, id]) => ({ label, hint: "Section", group: "Go to", run: "section" as const, target: id })),
      ...projects.map((p) => ({ label: p.title, hint: p.stack.slice(0, 3).join(" · "), group: "Projects", run: "route" as const, target: `/work/${p.slug}` })),
      { label: "Send an email", hint: site.email, group: "Contact", run: "link" as const, target: `mailto:${site.email}` },
      ...site.socials.map((s) => ({ label: s.label, hint: "Opens in a new tab", group: "Contact", run: "link" as const, target: s.href })),
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => `${it.label} ${it.hint} ${it.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    getLenis()?.start();
    opener.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
    getLenis()?.stop();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  const go = useCallback(
    (it: Item) => {
      close();
      if (it.run === "link") {
        window.open(it.target, it.target.startsWith("mailto:") ? "_self" : "_blank", "noopener");
      } else if (it.run === "route") {
        router.push(it.target);
      } else if (pathname === "/") {
        const el = document.getElementById(it.target);
        const lenis = getLenis();
        if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
        else el?.scrollIntoView();
        history.replaceState(null, "", `#${it.target}`);
      } else {
        router.push(`/#${it.target}`);
      }
    },
    [close, pathname, router],
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
    <div className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick search"
        className="palette-in relative w-full max-w-xl border-2 border-ink bg-paper text-ink shadow-[10px_10px_0_0_rgb(var(--accent))]"
      >
        <div className="flex items-center gap-3 border-b-2 border-ink px-4">
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
            placeholder="Jump to a project or section…"
            aria-label="Search projects and sections"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${active}` : undefined}
            className="h-14 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
          />
          <kbd className="font-mono text-[10px] uppercase text-muted">Esc</kbd>
        </div>
        <ul ref={list} id="palette-list" role="listbox" data-lenis-prevent className="max-h-[52vh] overflow-y-auto overscroll-contain py-2">
          {results.length === 0 && <li className="px-4 py-6 font-mono text-sm text-muted">Nothing matches “{query}”.</li>}
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
                  className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2.5 ${i === active ? "bg-ink text-paper" : ""}`}
                >
                  <span className="font-display text-lg font-medium">{it.label}</span>
                  <span className={`truncate font-mono text-[11px] uppercase tracking-[0.08em] ${i === active ? "text-paper/60" : "text-muted"}`}>
                    {it.hint}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between border-t-2 border-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <span>↑↓ move · ↵ open</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
