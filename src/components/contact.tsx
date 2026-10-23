"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";

import { getSocials } from "@/components/social-links";
import { profile } from "@/content/profile";

const strip = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, "").replace(/\/$/, "");

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the email link still works.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="absolute top-1/2 right-4 grid size-9 -translate-y-1/2 place-items-center rounded-md border border-line bg-bg text-muted transition-colors hover:text-fg"
    >
      {copied ? <Check className="size-4 text-signal" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
    </button>
  );
}

export function Contact() {
  const isDev = process.env.NODE_ENV === "development";
  // Links that aren't set are hidden from visitors; in development they show as reminders.
  const tiles = getSocials().filter((s) => s.href || isDev);

  return (
    <div>
      <ul className="grid max-w-2xl gap-3 sm:grid-cols-2">
        {tiles.map(({ key, label, href, Icon }) => (
          <li key={key} className="relative rounded-xl border border-line">
            {href ? (
              <>
                <a
                  href={href}
                  {...(key === "email" ? {} : { target: "_blank", rel: "me noreferrer" })}
                  className="group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-surface"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-bg transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-xl">{label}</span>
                    <span className="block truncate text-sm text-muted">{strip(href)}</span>
                  </span>
                  {key !== "email" ? (
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
                {key === "email" && profile.contact.email ? <CopyEmail email={profile.contact.email} /> : null}
              </>
            ) : (
              <div className="flex items-center gap-4 p-5 opacity-60">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-dashed border-line">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-serif text-xl">{label}</span>
                  <span className="block text-xs text-muted">Dev only: add this link in profile.ts</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
