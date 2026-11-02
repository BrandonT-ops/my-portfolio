import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  children: ReactNode;
}

/** Numbered editorial section: thin rule, mono eyebrow, optional display title. */
export default function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-20">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="rule pt-6 pb-14 sm:pb-20">
          <p id={`${id}-label`} className="label mb-10 sm:mb-14">
            <span className="text-accent">{index}</span> — {label}
          </p>
          {title && (
            <h2 className="mb-12 max-w-3xl text-3xl font-medium leading-[1.1] sm:text-5xl">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
