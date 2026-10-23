import type { ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const LABELS: Record<ProjectStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  sample: "Sample",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-px text-[11px] font-medium",
        status === "sample" && "border-dashed border-faint/60 text-muted",
        status === "in-progress" && "border-line text-muted",
        status === "complete" && "border-fg/20 text-fg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          status === "sample" && "border border-faint",
          status === "in-progress" && "bg-amber-500",
          status === "complete" && "bg-emerald-500",
        )}
      />
      {LABELS[status]}
    </span>
  );
}
