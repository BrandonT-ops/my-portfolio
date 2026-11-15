import Image from "next/image";
import Schematic from "@/components/ui/Schematic";
import type { Project } from "@/data/projects";
import { getSystem } from "@/data/systems";

/**
 * Project cover. Shows the real image when `cover` is set; otherwise the
 * project's system blueprint on a dark drafting sheet.
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

  const glowAt = ["18% 88%", "86% 14%", "82% 86%", "14% 18%"][index % 4];

  return (
    <div aria-hidden className="absolute inset-0 isolate overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(55% 65% at ${glowAt}, rgb(var(--accent) / 0.28), transparent 70%)` }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--paper) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--paper) / 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="grain" />

      <div className="absolute inset-x-[7%] top-[6%] flex items-center justify-between gap-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55 sm:text-[11px]">
        <span className="truncate">
          <span className="text-highlight">●</span> System / {project.title}
        </span>
        <span>{project.year ?? project.category}</span>
      </div>

      <div className="absolute inset-x-[4%] bottom-[2%] top-[10%]">
        <Schematic layers={getSystem(project.slug, project.stack)} fontSize={17} gapRatio={0.05} />
      </div>
    </div>
  );
}
