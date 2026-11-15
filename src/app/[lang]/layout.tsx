import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/outfit";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "../globals.css";
import Footer from "@/components/Footer";
import Reveal, { jsFlag } from "@/components/Reveal";
import { getDict, isLang, LANGS } from "@/content";
import { alternates } from "@/lib/seo";
import { site } from "@/data/site";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  const title = `${site.name} — ${d.meta.role}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: d.meta.description,
    authors: [{ name: site.name, url: site.socials[0].href }],
    creator: site.name,
    alternates: alternates(lang),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: d.meta.description,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: d.meta.role,
    url: `${site.url}/${lang}`,
    email: `mailto:${site.email}`,
    image: `${site.url}${site.portrait}`,
    sameAs: site.socials.map((s) => s.href),
    address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Inter-State University Congo–Cameroon" },
    knowsLanguage: ["en", "fr"],
    knowsAbout: ["Web development", "Angular", "Next.js", "Django", "Flutter", "Embedded systems", "UI/UX design"],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {d.nav.skip}
        </a>
        {children}
        <Footer lang={lang} d={d} />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
