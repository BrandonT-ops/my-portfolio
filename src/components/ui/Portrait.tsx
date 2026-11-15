import Image from "next/image";
import { site } from "@/data/site";

/**
 * Framed portrait for the About section. Uses `site.portrait` when set,
 * otherwise a tidy placeholder with initials so the layout is ready for a photo.
 */
export default function Portrait() {
  const src: string = site.portrait;
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <figure className="relative" data-reveal>
      <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-ink shadow-hard">
        <div className="absolute inset-0" data-zoom>
          {src ? (
            <Image
              src={src}
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden className="absolute inset-0 isolate flex items-end justify-between bg-ink p-6 text-paper">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(60% 55% at 70% 30%, rgb(var(--accent) / 0.35), transparent 70%)",
                }}
              />
              <div
                className="absolute inset-0 -z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(var(--paper) / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--paper) / 0.07) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage: "radial-gradient(ellipse at center, #000 25%, transparent 80%)",
                }}
              />
              <div className="grain" />
              <span className="font-display text-[clamp(5rem,14vw,11rem)] font-medium leading-none tracking-[-0.05em]">
                {initials}
                <span className="text-accent">.</span>
              </span>
              <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">
                Photo soon
              </span>
            </div>
          )}
        </div>
      </div>
      <figcaption className="label mt-4 flex justify-between">
        <span>{site.name}</span>
        <span>{site.location}</span>
      </figcaption>
    </figure>
  );
}
