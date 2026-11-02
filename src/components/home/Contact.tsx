import Section from "@/components/ui/Section";
import ButtonLink from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <Section id="contact" index="04" label="Contact">
      <h2 className="max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[1]">
        Have a product to build, a team to teach, or an idea to test?
      </h2>
      <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-xl font-medium underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-3xl"
        >
          {site.email}
        </a>
        <ButtonLink href={`mailto:${site.email}`} external>
          Start a conversation →
        </ButtonLink>
      </div>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
        {site.socials.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
              {s.label} ↗
            </a>
          </li>
        ))}
        {site.photographyUrl && (
          <li>
            <a href={site.photographyUrl} target="_blank" rel="noopener noreferrer" className="link">
              Photography ↗
            </a>
          </li>
        )}
      </ul>
    </Section>
  );
}
