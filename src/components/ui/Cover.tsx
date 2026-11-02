import Image from "next/image";
import type { Project } from "@/data/projects";

const GLOWS = [
  ["var(--accent)", "var(--highlight)"],
  ["var(--highlight)", "var(--positive)"],
  ["var(--positive)", "var(--accent)"],
  ["var(--accent)", "76 29 149"],
];

/**
 * Project cover. Shows the real image when `cover` is set; otherwise a dark,
 * glowing typographic placeholder so the layout never looks unfinished.
 */
export default function Cover({
  project,
  index = 0,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  index?: number;
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

  const [a, b] = GLOWS[index % GLOWS.length];

  return (
    <div aria-hidden className="absolute inset-0 isolate overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at 25% 80%, rgb(${a} / 0.75), transparent 70%), radial-gradient(50% 60% at 85% 15%, rgb(${b} / 0.55), transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--paper) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--paper) / 0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 80%)",
        }}
      />
      <div className="grain" />
      <div className="absolute inset-0 flex flex-col justify-between px-[12%] py-[8%]">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
          {project.stack.slice(0, 2).join(" / ")}
        </span>
        <span className="font-display text-[clamp(2rem,4.5vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.03em]">
          {project.title}
          <span className="text-highlight">.</span>
        </span>
      </div>
    </div>
  );
}
