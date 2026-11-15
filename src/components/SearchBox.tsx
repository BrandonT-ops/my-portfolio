"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/content/types";
import { normalize, type ResultType } from "@/lib/search";

export interface Suggestion {
  title: string;
  href: string;
  type: ResultType;
}

const ICON: Record<ResultType, string> = { project: "◆", page: "▤", experience: "●", skill: "#", education: "▲", photo: "▣" };

/**
 * The search box. Typing shows suggestions; Enter searches, or opens the
 * highlighted suggestion. "/" focuses it from anywhere on the page.
 */
export default function SearchBox({
  lang,
  suggestions,
  placeholder,
  clearLabel,
  listLabel,
  initial = "",
  large = false,
  autoFocus = false,
  examples = [],
  popularLabel = "",
}: {
  lang: Lang;
  suggestions: Suggestion[];
  placeholder: string;
  clearLabel: string;
  listLabel: string;
  initial?: string;
  large?: boolean;
  autoFocus?: boolean;
  /** Example searches: cycled in the empty box, and offered when it is focused. */
  examples?: string[];
  popularLabel?: string;
}) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [example, setExample] = useState(0);

  // Cycle the example shown in the empty box, so visitors see what they can type.
  useEffect(() => {
    if (examples.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setExample((e) => (e + 1) % examples.length), 2600);
    return () => window.clearInterval(t);
  }, [examples.length]);

  const hint = examples.length ? `${placeholder.replace(/…$/, "")} — “${examples[example]}”` : placeholder;

  const matches = useMemo<Suggestion[]>(() => {
    const n = normalize(q.trim());
    if (!n) return examples.map((e) => ({ title: e, href: `/${lang}/search?q=${encodeURIComponent(e)}`, type: "skill" as const }));
    return suggestions
      .filter((s) => normalize(s.title).includes(n))
      .sort((a, b) => Number(normalize(b.title).startsWith(n)) - Number(normalize(a.title).startsWith(n)))
      .slice(0, 6);
  }, [q, suggestions, examples, lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? "");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (value: string) => {
    setOpen(false);
    input.current?.blur();
    router.push(`/${lang}/search?q=${encodeURIComponent(value.trim())}`);
  };

  const show = open && matches.length > 0;

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (active >= 0 && matches[active]) {
          setOpen(false);
          router.push(matches[active].href);
        } else submit(q);
      }}
      className="relative w-full"
    >
      <div
        className={`flex items-center gap-3 border border-line/15 bg-sheet transition-shadow duration-300 ease-out focus-within:border-transparent focus-within:shadow-lift hover:shadow-soft ${
          show ? "rounded-t-3xl border-b-transparent shadow-lift" : "rounded-full"
        } ${large ? "h-14 px-6" : "h-12 px-5"}`}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={input}
          type="search"
          name="q"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          enterKeyHint="search"
          placeholder={hint}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={show}
          aria-controls={`${id}-list`}
          aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, matches.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === "Escape") {
              setOpen(false);
              setActive(-1);
            }
          }}
          className="h-full w-full min-w-0 bg-transparent text-base text-line outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            aria-label={clearLabel}
            onClick={() => {
              setQ("");
              setActive(-1);
              input.current?.focus();
            }}
            className="shrink-0 rounded-full p-1 text-muted hover:text-line"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
        <kbd className="hidden shrink-0 rounded-md border border-line/15 px-1.5 py-0.5 font-mono text-[11px] text-muted lg:block">/</kbd>
      </div>

      {show && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label={listLabel}
          className="pop-in absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-3xl border border-t-0 border-line/15 bg-sheet pb-3 shadow-lift"
        >
          <li role="presentation" className="mx-5 mb-2 border-t border-line/10" />
          {!q.trim() && popularLabel && (
            <li role="presentation" className="label px-6 pb-1">
              {popularLabel}
            </li>
          )}
          {matches.map((s, i) => (
            <li
              key={s.href + s.title}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push(s.href);
              }}
              className={`flex cursor-pointer items-center gap-3 px-6 py-2 text-[15px] ${i === active ? "bg-panel" : ""}`}
            >
              <span aria-hidden className="w-4 text-center text-xs text-accent">
                {q.trim() ? ICON[s.type] : "↗"}
              </span>
              <span className="truncate">{s.title}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
