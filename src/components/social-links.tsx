import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/brand-icons";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

export function getSocials() {
  const { email, github, linkedin, x } = profile.contact;
  return [
    { key: "github", label: "GitHub", href: github, Icon: GitHubIcon },
    { key: "linkedin", label: "LinkedIn", href: linkedin, Icon: LinkedInIcon },
    { key: "x", label: "X", href: x, Icon: XIcon },
    { key: "email", label: "Email", href: email ? `mailto:${email}` : null, Icon: Mail },
  ];
}

/** Icon-only social links. Links that are not set yet are left out. */
export function SocialLinks({ className }: { className?: string }) {
  const items = getSocials().filter((s) => s.href);
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href!}
            {...(key === "email" ? {} : { target: "_blank", rel: "me noreferrer" })}
            aria-label={label}
            title={label}
            className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
