import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-page px-5 sm:px-8">
      <div className="rule flex flex-col gap-3 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex gap-5">
          {site.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
