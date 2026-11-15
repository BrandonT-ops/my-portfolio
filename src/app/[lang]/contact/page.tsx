import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import Header from "@/components/Header";
import LocalTime from "@/components/LocalTime";
import { getDict, isLang } from "@/content";
import { site } from "@/data/site";
import { alternates } from "@/lib/seo";
import { buildSuggestions } from "@/lib/search-index";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return { title: d.nav.contact, description: d.contact.lead, alternates: alternates(lang, "/contact") };
}

export default async function Contact({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);
  const c = d.contact;
  // The form appears once the email service is configured (see api/contact/route.ts).
  const formReady = Boolean(process.env.RESEND_API_KEY);

  return (
    <>
      <Header lang={lang} nav={d.nav} t={d.search} suggestions={buildSuggestions(lang)} />

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6">
        <section className="pb-10 pt-12 sm:pt-20">
          <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-none">{c.title}</h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">{c.lead}</p>
        </section>

        <section className="card-outline" aria-labelledby="email-label">
          <p id="email-label" className="label mb-3">
            {c.emailLabel}
          </p>
          <CopyEmail email={site.email} copy={c.copy} copied={c.copied} />
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
            {c.mailApp} ↗
          </a>
        </section>

        {formReady && (
          <section className="card-outline mt-4" aria-labelledby="form-title">
            <h2 id="form-title" className="mb-6 text-2xl">
              {c.formTitle}
            </h2>
            <ContactForm t={c} />
          </section>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <section className="card" aria-labelledby="elsewhere">
            <p id="elsewhere" className="label mb-4">
              {c.elsewhere}
            </p>
            <ul className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn !bg-sheet">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <p className="label mb-4">{c.basedIn}</p>
            <p className="text-lg">{d.meta.location}</p>
            <p className="mt-1 text-sm text-muted">
              <LocalTime />
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
