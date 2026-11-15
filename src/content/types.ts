import type { Category } from "@/data/projects";

export type Lang = "en" | "fr";
export const LANGS: Lang[] = ["en", "fr"];
export const isLang = (v: string): v is Lang => v === "en" || v === "fr";

export interface ProjectText {
  /** One sentence, shown in lists. */
  summary: string;
  role: string;
  context: string;
  approach: string[];
  outcome?: string;
  /** A short note when the project is no longer online. */
  status?: string;
  /** The hard parts: what made it difficult and what the team did. */
  challenges?: { title: string; problem: string; solution: string }[];
  /** What Brandon would do differently today, in the first person. */
  lessons?: string[];
}

export interface Dict {
  meta: { role: string; description: string; location: string };
  nav: { home: string; work: string; about: string; photo: string; contact: string; search: string; skip: string };
  hero: {
    sheet: string;
    available: string;
    tagline: string;
    ctaWork: string;
    ctaAbout: string;
    notesTitle: string;
    notes: string[];
    detail: string;
    scale: string;
    width: string;
  };
  home: {
    flagLabel: string;
    flagTitle: string;
    allWork: string;
    open: string;
    quantities: string;
    stats: { label: string; note: string }[];
    aboutLabel: string;
    statement: string;
    aboutLink: string;
  };
  work: {
    label: string;
    title: string;
    intro: string;
    all: string;
    cats: Record<Category, string>;
    cols: { no: string; project: string; client: string; year: string; type: string };
    shown: string;
  };
  study: {
    back: string;
    role: string;
    client: string;
    stack: string;
    links: string;
    status: string;
    year: string;
    screenshot: string;
    system: string;
    parts: string;
    layers: string;
    problem: string;
    approach: string;
    outcome: string;
    hard: string;
    did: string;
    looking: string;
    lookingTitle: string;
    next: string;
    diagramAlt: string;
  };
  about: {
    label: string;
    title: string;
    portrait: string;
    paragraphs: string[];
    factsTitle: string;
    facts: { label: string; value: string }[];
    experienceTitle: string;
    experience: { period: string; role: string; org: string; place: string; points: string[] }[];
    educationTitle: string;
    education: { year: string; title: string; org: string; note: string }[];
    certsTitle: string;
    certifications: { year: string; title: string; org: string }[];
    stackTitle: string;
    stackNote: string;
    skills: { group: string; items: string[] }[];
    servicesTitle: string;
    services: string[];
  };
  photo: {
    label: string;
    title: string;
    lead: string;
    body: string;
    soon: string;
    frame: string;
    subjects: string[];
    gallery: string;
  };
  block: {
    cta: string;
    ctaButton: string;
    drawnBy: string;
    location: string;
    contact: string;
    sheet: string;
    of: string;
    revision: string;
    scale: string;
    links: string;
    top: string;
    crosshair: string;
    on: string;
    off: string;
  };
  palette: {
    open: string;
    placeholder: string;
    pages: string;
    projects: string;
    contact: string;
    email: string;
    newTab: string;
    empty: string;
    hint: string;
    results: string;
  };
  /** Translations for client names that are not proper nouns. */
  clients: Record<string, string>;
  /** Translations for blueprint box labels (French only; English uses the labels as written). */
  systemLabels: Record<string, string>;
}
