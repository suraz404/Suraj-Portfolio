import { cn } from "@/lib/cn";

export type TimelineItem = {
  key: string;
  /** Small label above the title, e.g. "Volunteering" or "BSc CSIT". */
  kicker: string;
  title: string;
  /** Where: organisation or school, and place. */
  subtitle: string;
  /** Right-hand detail, e.g. "2026 – 2027" or "GPA 3.4". */
  meta?: string;
  current?: boolean;
  /** Anything extra under the entry, such as a progress bar. */
  extra?: React.ReactNode;
};

/** One shared look for Experience and Education: entries on a vertical line, newest first. */
export function Timeline({ items, headingLevel = "h3" }: { items: TimelineItem[]; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <ol className="relative ml-1.5 border-l border-line">
      {items.map((it) => (
        <li key={it.key} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 -left-[6px] size-[11px] rounded-full ring-4 ring-bg",
              it.current ? "bg-signal" : "border border-faint bg-bg",
            )}
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label">{it.kicker}</span>
            {it.current ? (
              <span className="rounded-full border border-signal/40 px-2 py-px text-[11px] text-signal">Current</span>
            ) : null}
          </div>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <Heading className="font-serif text-2xl leading-snug text-balance">{it.title}</Heading>
            {it.meta ? <p className="shrink-0 text-sm text-muted tabular-nums">{it.meta}</p> : null}
          </div>
          <p className="mt-1 text-[15px] text-muted">{it.subtitle}</p>
          {it.extra ? <div className="mt-5">{it.extra}</div> : null}
        </li>
      ))}
    </ol>
  );
}
