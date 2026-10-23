import { profile } from "@/content/profile";

export function About() {
  const [first, ...rest] = profile.about;
  return (
    <div>
      <div className="grid gap-12 xl:grid-cols-[1fr_15rem]">
        <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-pretty">
          <p className="font-serif text-2xl leading-snug">{first}</p>
          {rest.map((p) => (
            <p key={p} className="text-muted">
              {p}
            </p>
          ))}
        </div>
        <aside className="self-start border-l border-signal/60 pl-5">
          <p className="font-serif text-2xl leading-snug text-balance italic">
            “Why it works, where it can fail, and how to make it better.”
          </p>
        </aside>
      </div>
    </div>
  );
}
