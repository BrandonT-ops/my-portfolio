import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-wide flex-col gap-3 border-t border-paper/10 px-5 py-8 font-mono text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#main" className="transition-colors hover:text-paper">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
