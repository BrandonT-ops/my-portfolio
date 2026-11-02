import Section from "@/components/ui/Section";
import { about } from "@/data/site";

export default function About() {
  return (
    <Section id="about" index="02" label="About">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
            Engineering, product and community —{" "}
            <span className="bg-highlight/70 px-1 box-decoration-clone">built by the same hands.</span>
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="label mb-4">Journey</p>
          <ol className="border-t border-ink/15">
            {about.timeline.map((item) => (
              <li key={item.text} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-ink/15 py-4">
                <span className="font-mono text-xs text-accent">{item.year}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {about.skills.map((s) => (
          <div key={s.group}>
            <p className="label mb-4">{s.group}</p>
            <ul className="space-y-2">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="label mb-4">Services</p>
          <ul className="space-y-2">
            {about.services.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
