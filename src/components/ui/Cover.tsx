import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Project cover. Shows the real image when `cover` is set, otherwise a
 * typographic placeholder so the layout never looks broken.
 */
export default function Cover({
  project,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-end justify-between bg-highlight/25 p-5 text-ink"
      style={{
        backgroundImage:
          "radial-gradient(rgb(var(--ink) / 0.12) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <span className="font-display text-3xl font-medium leading-none sm:text-4xl">
        {project.title}
        <span className="text-accent">.</span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {project.stack[0]}
      </span>
    </div>
  );
}
