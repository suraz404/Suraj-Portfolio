import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  intro?: React.ReactNode;
  /** Keep the heading for screen readers only, when the section draws its own visible title. */
  hideTitle?: boolean;
  /** Extra controls shown at the right of the heading, e.g. carousel arrows. */
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** A section of the page, separated from the previous one by a full-width hairline. */
export function Section({ id, title, intro, hideTitle = false, aside, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  if (hideTitle) {
    return (
      <section id={id} aria-labelledby={headingId} className={cn("rule-top py-20 sm:py-28", className)}>
        <h2 id={headingId} className="sr-only">
          {title}
        </h2>
        {children}
      </section>
    );
  }
  return (
    <section id={id} aria-labelledby={headingId} className={cn("rule-top py-20 sm:py-28", className)}>
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 id={headingId} className="font-serif text-4xl font-medium tracking-[0.06em] uppercase sm:text-5xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-[17px] leading-relaxed text-muted text-pretty">{intro}</p> : null}
        </div>
        {aside}
      </header>
      {children}
    </section>
  );
}
