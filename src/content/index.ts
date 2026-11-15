import { en } from "@/content/en";
import { fr } from "@/content/fr";
import { projectsEn } from "@/content/projects.en";
import { projectsFr } from "@/content/projects.fr";
import type { Dict, Lang, ProjectText } from "@/content/types";

export * from "@/content/types";

const dicts: Record<Lang, Dict> = { en, fr };
const texts: Record<Lang, Record<string, ProjectText>> = { en: projectsEn, fr: projectsFr };

export const getDict = (lang: Lang): Dict => dicts[lang];

/** The words for one project in the given language (falls back to English). */
export const getProjectText = (lang: Lang, slug: string): ProjectText => texts[lang][slug] ?? projectsEn[slug];

/** Client names that are not proper nouns are translated; the rest pass through. */
export const clientName = (lang: Lang, client?: string) => (client ? (dicts[lang].clients[client] ?? client) : undefined);
