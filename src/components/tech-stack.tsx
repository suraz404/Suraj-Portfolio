import { profile } from "@/content/profile";

export function TechStack() {
  return (
    <div>
      <dl className="max-w-2xl divide-y divide-line border-y border-line">
        {profile.techStack.map(({ group, items }) => (
          <div key={group} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="font-serif text-xl italic">{group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <li
                    key={t}
                    className={
                      group === "Exploring"
                        ? "rounded-full border border-dashed border-line px-3 py-1 text-sm text-muted"
                        : "rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-fg/30 hover:bg-surface"
                    }
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
