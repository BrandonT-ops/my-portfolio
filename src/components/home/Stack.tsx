import { about } from "@/data/site";
import { projects } from "@/data/projects";

/** How many projects list this technology in their stack (matched on whole words). */
function usage(item: string) {
  const keys = item
    .toLowerCase()
    .split(/\s*[/&]\s*/)
    .map((k) => k.trim())
    .filter(Boolean);
  const tests = keys.map((k) => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "i"));
  return projects.filter((p) => p.stack.some((s) => tests.some((t) => t.test(s)))).length;
}

/**
 * The toolbox as big rows that invert on hover. Each technology carries a
 * small counter: the number of projects on this site that use it.
 */
export default function Stack() {
  const rows = [...about.skills, { group: "Services", items: about.services }];

  return (
    <div className="mt-28 sm:mt-40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <p className="label" data-reveal>
          The stack, layer by layer
        </p>
        <p className="label" data-reveal>
          <span className="text-accent">×n</span> = projects here using it
        </p>
      </div>
      <ul className="border-t-2 border-ink">
        {rows.map((row, i) => (
          <li
            key={row.group}
            className="group/row relative grid gap-4 border-b border-ink/15 px-0 py-8 transition-[background-color,color,padding] duration-500 hover:bg-ink hover:px-5 hover:text-paper md:grid-cols-12 md:gap-10 md:py-10 sm:hover:px-8"
            data-reveal
          >
            <div className="flex items-baseline gap-4 md:col-span-5">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-none tracking-[-0.03em] text-current">
                {row.group}
              </h3>
            </div>
            <ul className="flex flex-wrap content-center gap-2 md:col-span-7">
              {row.items.map((item) => {
                const n = row.group === "Services" ? 0 : usage(item);
                return (
                  <li
                    key={item}
                    title={n ? `Used in ${n} project${n > 1 ? "s" : ""} on this site` : undefined}
                    className="inline-flex items-baseline gap-1.5 rounded-full border border-ink/20 px-4 py-2 group-hover/row:border-paper/30 text-[15px] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper"
                  >
                    {item}
                    {n > 0 && <sup className="font-mono text-[10px] text-accent group-hover/row:text-highlight">×{n}</sup>}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
