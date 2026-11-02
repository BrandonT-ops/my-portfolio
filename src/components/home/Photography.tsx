import Section from "@/components/ui/Section";
import { site } from "@/data/site";

export default function Photography() {
  return (
    <Section id="photography" index="03" label="Photography">
      <div className="relative overflow-hidden border-2 border-ink bg-ink px-6 py-14 text-paper shadow-hard sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgb(var(--paper) / 0.07) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="text-3xl font-medium leading-[1.1] text-paper sm:text-5xl">
              Beyond engineering, I tell stories with a camera.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
              Portraits, street, nature, events and the occasional product shot — a growing
              collection of how I see things when I&apos;m away from the keyboard.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            {site.photographyUrl ? (
              <a
                href={site.photographyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-paper bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink shadow-[6px_6px_0_0_rgb(var(--highlight))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                View the gallery ↗
              </a>
            ) : (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-paper/60">
                Gallery link coming soon
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
