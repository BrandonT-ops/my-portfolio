import Image from "next/image";
import Schematic from "@/components/Schematic";
import type { ProjectMeta } from "@/data/projects";
import { getSystem } from "@/data/systems";

/**
 * A project's picture: its screenshot when there is one, otherwise its
 * system blueprint drawn on the sheet.
 */
export default function Cover({
  project,
  labels,
  alt,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: ProjectMeta;
  /** Translations for blueprint labels. */
  labels?: Record<string, string>;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.cover) {
    return <Image src={project.cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />;
  }
  return (
    <div aria-hidden className="absolute inset-0 bg-panel/55">
      <div className="absolute inset-x-[4%] inset-y-[3%]">
        <Schematic layers={getSystem(project.slug, project.stack, labels)} fontSize={17} gapRatio={0.05} />
      </div>
    </div>
  );
}
