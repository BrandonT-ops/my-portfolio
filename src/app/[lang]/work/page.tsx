import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TitleBlock from "@/components/TitleBlock";
import WorkRegister, { type RegisterRow } from "@/components/WorkRegister";
import { clientName, getDict, getProjectText, isLang } from "@/content";
import { projects } from "@/data/projects";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.work, description: d.work.intro, alternates: alternates(lang, "/work") };
}

export default async function Work({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);

  const rows: RegisterRow[] = projects.map((p, i) => ({
    no: `DWG ${String(i + 1).padStart(2, "0")}`,
    href: `/${lang}/work/${p.slug}`,
    title: p.title,
    summary: getProjectText(lang, p.slug).summary,
    client: clientName(lang, p.client) ?? "—",
    year: p.year ?? "—",
    category: p.category,
  }));

  return (
    <>
      <section className="mx-auto max-w-sheet px-5 pt-8 sm:px-10 sm:pt-12">
        <p className="label border-b border-line/25 pb-4">
          <span className="text-accent">DWG 002</span> — {d.work.label}
        </p>
        <div className="grid gap-8 pb-14 pt-10 lg:grid-cols-12 lg:items-end lg:gap-x-10 sm:pb-20">
          <h1 className="text-[clamp(3.75rem,12vw,11rem)] lg:col-span-8">{d.work.title}</h1>
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-4" data-reveal>
            {d.work.intro}
          </p>
        </div>
        <WorkRegister rows={rows} cats={d.work.cats} cols={d.work.cols} allLabel={d.work.all} shownLabel={d.work.shown} />
      </section>
      <TitleBlock d={d} sheet="02 / 04" title={d.work.label} />
    </>
  );
}
