import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="rule-top flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        Created by <span className="font-serif text-base text-fg italic">{profile.name}</span>
      </p>
      <p className="text-xs text-faint">© {new Date().getFullYear()} · All rights reserved</p>
    </footer>
  );
}
