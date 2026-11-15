import { projects } from "@/data/projects";

/** How many projects list this technology in their stack (matched on whole words). */
export function usage(item: string) {
  const tests = item
    .toLowerCase()
    .split(/\s*[/&]\s*/)
    .map((k) => k.trim())
    .filter(Boolean)
    .map((k) => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "i"));
  return projects.filter((p) => p.stack.some((s) => tests.some((t) => t.test(s)))).length;
}
