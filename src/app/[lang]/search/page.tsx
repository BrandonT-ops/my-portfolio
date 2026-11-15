import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePanel from "@/components/KnowledgePanel";
import ResultsView from "@/components/ResultsView";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";
import { buildIndex, buildSuggestions } from "@/lib/search-index";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.search.tabs.projects, description: d.work.intro, alternates: alternates(lang, "/search") };
}

export default async function SearchPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);

  return (
    <Suspense fallback={<div className="flex-1" />}>
      <ResultsView
        lang={lang}
        items={buildIndex(lang)}
        suggestions={buildSuggestions(lang)}
        nav={d.nav}
        t={d.search}
        host={new URL(site.url).host}
        panel={<KnowledgePanel lang={lang} d={d} />}
      />
    </Suspense>
  );
}
