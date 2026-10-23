import { Timeline } from "@/components/timeline";
import { profile } from "@/content/profile";

const GROUPS = [
  { kind: "Work", title: "Work experience", empty: "No work roles listed yet. This is where they’ll go." },
  { kind: "Volunteering", title: "Volunteering", empty: "Nothing listed yet." },
] as const;

export function Experience() {
  return (
    <div className="space-y-14">
      {GROUPS.map((g) => {
        // One entry per role, newest first.
        const items = profile.experience
          .filter((x) => x.kind === g.kind)
          .flatMap((x) =>
            x.roles.map((r) => ({
              key: `${x.organization}-${r.title}`,
              kicker: x.organization,
              title: r.title,
              subtitle: x.place ?? "",
              meta: r.period,
              current: r.current,
              extra: r.summary ? <p className="text-[15px] leading-relaxed text-pretty">{r.summary}</p> : undefined,
            })),
          );
        return (
          <section key={g.kind} aria-labelledby={`exp-${g.kind}`}>
            <h3 id={`exp-${g.kind}`} className="mb-6 flex items-center gap-3 font-serif text-2xl italic">
              {g.title}
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </h3>
            {items.length ? (
              <Timeline items={items} headingLevel="h4" />
            ) : (
              <p className="rounded-xl border border-dashed border-line px-5 py-6 text-[15px] text-muted">{g.empty}</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
