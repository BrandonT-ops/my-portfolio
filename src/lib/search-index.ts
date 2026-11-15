import { clientName, getDict, getProjectText } from "@/content";
import type { Lang } from "@/content/types";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getSystem } from "@/data/systems";
import type { SearchItem } from "@/lib/search";
import { usage } from "@/lib/usage";

/** Everything the search engine knows about Brandon, in one language. */
export function buildIndex(lang: Lang): SearchItem[] {
  const d = getDict(lang);
  const a = d.about;
  const items: SearchItem[] = [];

  for (const p of projects) {
    const t = getProjectText(lang, p.slug);
    items.push({
      id: `project-${p.slug}`,
      type: "project",
      title: p.title,
      href: `/${lang}/work/${p.slug}`,
      crumbs: `work › ${p.slug}`,
      snippet: t.summary,
      text: [t.role, clientName(lang, p.client), p.year, d.work.cats[p.category], t.context, ...t.approach, t.outcome, t.status]
        .filter(Boolean)
        .join(" "),
      chips: p.stack,
      featured: p.featured,
      cover: p.cover,
      system: p.cover ? undefined : getSystem(p.slug, p.stack, d.systemLabels),
      category: p.category,
    });
  }

  items.push({
    id: "page-about",
    type: "page",
    title: a.title,
    href: `/${lang}/about`,
    crumbs: "about",
    snippet: a.paragraphs[0],
    text: [...a.paragraphs, ...a.facts.map((f) => `${f.label} ${f.value}`), "Brandon Tapiba", d.meta.role, d.nav.about].join(" "),
    chips: a.facts.map((f) => f.value).slice(0, 3),
    featured: true,
  });
  items.push({
    id: "page-photos",
    type: "page",
    title: d.photo.title,
    href: `/${lang}/photography`,
    crumbs: "photography",
    snippet: d.photo.lead,
    text: `${d.nav.photo} photo photos photography photographie ${d.photo.label}`,
    chips: d.photo.subjects.slice(0, 4),
  });

  a.experience.forEach((job, i) =>
    items.push({
      id: `experience-${i}`,
      type: "experience",
      title: `${job.role} · ${job.org}`,
      href: `/${lang}/about#experience`,
      crumbs: "about › experience",
      snippet: job.points.join(" "),
      text: `${a.experienceTitle} experience expérience ${job.place}`,
      chips: [job.period, job.place],
    }),
  );

  [...a.education, ...a.certifications].forEach((e, i) =>
    items.push({
      id: `education-${i}`,
      type: "education",
      title: e.title,
      href: `/${lang}/about#education`,
      crumbs: "about › education",
      snippet: "note" in e ? `${e.org}. ${e.note}` : e.org,
      text: `${a.educationTitle} ${a.certsTitle} education formation certification`,
      chips: [e.year],
    }),
  );

  for (const group of a.skills) {
    for (const item of group.items) {
      const n = usage(item);
      if (!n) continue;
      const key = item.split(/\s*[/&]\s*/)[0];
      const used = projects.filter((p) => p.stack.some((s) => s.toLowerCase().includes(key.toLowerCase()))).map((p) => p.title);
      items.push({
        id: `skill-${item}`,
        type: "skill",
        title: item,
        href: `/${lang}/search?q=${encodeURIComponent(key)}&t=projects`,
        crumbs: `skills › ${group.group.toLowerCase()}`,
        snippet: `${d.search.usedIn.replace("{n}", String(n))}: ${used.join(", ")}.`,
        text: `${group.group} skill compétence stack`,
        chips: [group.group],
      });
    }
  }

  site.photos.forEach((ph, i) =>
    items.push({
      id: `photo-${i}`,
      type: "photo",
      title: ph.caption || ph.place || d.search.untitled,
      href: `/${lang}/photography#photo-${i + 1}`,
      crumbs: "photography",
      snippet: ph.place,
      text: `${d.nav.photo} photo photos photography photographie image`,
      chips: ph.place ? [ph.place.split(", ").slice(-1)[0]] : [],
      cover: ph.src,
      width: ph.width,
      height: ph.height,
    }),
  );

  return items;
}

/** The light list the search box uses for suggestions. */
export const buildSuggestions = (lang: Lang) =>
  buildIndex(lang)
    .filter((it) => it.type !== "education" && it.type !== "photo")
    .map(({ title, href, type }) => ({ title, href, type }));
