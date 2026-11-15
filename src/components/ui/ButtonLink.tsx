import Link from "next/link";
import type { ReactNode } from "react";

/** The one brutalist button: ink border, hard shadow that settles on press. */
export default function ButtonLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper shadow-hard-accent transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_rgb(var(--accent))] active:translate-x-1 active:translate-y-1 active:shadow-none";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
