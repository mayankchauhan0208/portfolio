import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, children }: SectionShellProps) {
  return (
    <section id={id} className="relative scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-signal">{eyebrow}</p>
            <h2 className="max-w-3xl font-display text-4xl leading-[0.95] text-white md:text-6xl">{title}</h2>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/25 to-transparent md:max-w-sm" />
        </div>
        {children}
      </div>
    </section>
  );
}
