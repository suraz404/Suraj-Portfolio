import { Timeline } from "@/components/timeline";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

function SemesterBar({ current, total, asOf }: { current: number; total: number; asOf: string }) {
  return (
    <div className="max-w-md">
      <div
        role="img"
        aria-label={`Semester ${current} of ${total}, in progress as of ${asOf}`}
        className="flex gap-1.5"
      >
        {Array.from({ length: total }, (_, k) => k + 1).map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              n < current && "bg-fg/60",
              n === current && "bg-signal",
              n > current && "bg-line",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        Semester {current} of {total}, in progress · as of {asOf}
      </p>
    </div>
  );
}

export function Education() {
  const items = profile.education.map((e) => ({
    key: e.institution,
    kicker: e.short,
    title: e.qualification,
    subtitle: [e.institution, e.place].filter(Boolean).join(", "),
    meta: e.result,
    current: e.current,
    extra: e.progress ? <SemesterBar {...e.progress} /> : undefined,
  }));
  return <Timeline items={items} />;
}
