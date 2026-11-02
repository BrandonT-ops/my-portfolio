import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-28">
      <p className="label fade-up flex items-center gap-3">
        {site.available && (
          <span className="inline-flex items-center gap-2 text-ink">
            <span className="h-2 w-2 rounded-full bg-positive" aria-hidden />
            Available for projects
          </span>
        )}
        <span className="hidden sm:inline">
          {site.role} · {site.location}
        </span>
      </p>

      <h1 className="fade-up mt-8 text-[clamp(3.25rem,11vw,9.5rem)] font-medium leading-[0.9] [animation-delay:80ms]">
        {first}
        <br />
        <span className="relative inline-block">
          {rest.join(" ")}
          <span className="text-accent">.</span>
        </span>
      </h1>

      <div className="fade-up mt-10 grid gap-10 [animation-delay:160ms] sm:mt-14 md:grid-cols-12">
        <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl md:col-span-7">
          <span className="text-ink">{site.role} & creative builder.</span> {site.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-6 md:col-span-5 md:justify-end md:self-end">
          <ButtonLink href="/#work">Selected work ↓</ButtonLink>
          {site.resumeUrl ? (
            <a href={site.resumeUrl} className="link font-mono text-xs uppercase tracking-[0.12em]">
              Résumé ↗
            </a>
          ) : (
            <Link href="/#contact" className="link font-mono text-xs uppercase tracking-[0.12em]">
              Get in touch
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
