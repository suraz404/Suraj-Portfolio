"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { Coder } from "@/components/coder";
import { LocalTime } from "@/components/local-time";
import { NepalFlag } from "@/components/nepal-flag";
import { Robot } from "@/components/robot";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import { backgroundTab } from "@/lib/background-tab";
import { cn } from "@/lib/cn";
import { sections } from "@/lib/site";

/** Tracks which section is currently in view. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  const tab = useSyncExternalStore(backgroundTab.subscribe, backgroundTab.get, () => "experience" as const);

  useEffect(() => {
    const els = sections
      // "education" shares the experience block, so only the block itself is observed.
      .filter((s) => s.id !== "education")
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Inside the shared block, highlight whichever tab is open.
  return active === "experience" ? tab : active;
}

/** Index links to Education or Experience also open that tab. */
function pickTab(id: string) {
  if (id === "education" || id === "experience") backgroundTab.set(id);
}

function Identity({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3">
      <span className="relative shrink-0">
        <Image
          src={profile.photo.avatar}
          alt=""
          width={size === "lg" ? 52 : 44}
          height={size === "lg" ? 52 : 44}
          priority
          className={cn(
            "rounded-full object-cover ring-1 ring-line ring-offset-2 ring-offset-bg transition-transform duration-500 ease-out-soft group-hover:scale-105",
            size === "lg" ? "size-[52px]" : "size-11",
          )}
        />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-xl">{profile.name}</span>
        <span className="block text-xs text-muted">{profile.role}</span>
      </span>
    </a>
  );
}

function LocalLine() {
  return (
    <p className="flex items-center gap-2 text-xs text-muted">
      <NepalFlag className="h-5 w-auto shrink-0" />
      {profile.location} · <LocalTime timeZone={profile.timeZone} /> local time
    </p>
  );
}

export function Sidebar() {
  const active = useActiveSection();
  const [hovered, setHovered] = useState<string | null>(null);
  const [robotY, setRobotY] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // The robot goes to the hovered link, otherwise to the section in view, otherwise the first link.
  const target = hovered ?? active ?? sections[0].id;

  useLayoutEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${target}"]`);
    if (link) setRobotY(link.offsetTop + link.offsetHeight / 2);
  }, [target]);

  return (
    <aside className="no-scrollbar sticky top-0 hidden h-dvh flex-col justify-between gap-8 overflow-y-auto border-r border-line py-10 pr-8 lg:flex">
      <div>
        <Identity />
        <div className="mt-5">
          <LocalLine />
        </div>

        <nav aria-label="Sections" className="relative mt-14">
          <Robot y={robotY} />
          <ol ref={listRef} className="relative ml-11 border-l border-line" onPointerLeave={() => setHovered(null)}>
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-id={s.id}
                    onClick={() => pickTab(s.id)}
                    onPointerEnter={() => setHovered(s.id)}
                    onFocus={() => setHovered(s.id)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative -ml-px flex items-center border-l py-2 pl-4 text-[15px] transition-[color,border-color,padding] duration-300 ease-out-soft",
                      isActive ? "border-fg font-medium text-fg" : "border-transparent text-muted hover:pl-5 hover:text-fg",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="space-y-4">
        <Coder className="-ml-2 block w-full max-w-[13rem]" />
        <div className="flex items-center justify-between">
          <SocialLinks className="-ml-2" />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

/** Phones and tablets: a button at the top right opens a panel from the right edge. */
export function MobileNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const button = buttonRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      button?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <NepalFlag className="absolute top-4 left-4 z-40 h-10 w-auto drop-shadow-[0_3px_6px_rgb(0_0_0/0.2)]" />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="fixed top-4 right-4 z-50 inline-flex h-11 items-center gap-2 rounded-full bg-bg/85 pr-4 pl-1.5 text-sm font-medium shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] ring-1 ring-line backdrop-blur-md"
      >
        <Image src={profile.photo.avatar} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
        <Menu className="size-4" aria-hidden="true" />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col justify-between border-l border-line bg-bg p-6 shadow-2xl transition-[transform,visibility] duration-500 ease-out-soft",
          open ? "visible translate-x-0" : "invisible translate-x-full",
        )}
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <Identity size="lg" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted ring-1 ring-line hover:text-fg"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4">
            <LocalLine />
          </div>

          <nav aria-label="Sections" className="mt-10">
            <ul>
              {sections.map((s, i) => (
                <li
                  key={s.id}
                  className={cn("transition-all duration-500 ease-out-soft", open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0")}
                  style={{ transitionDelay: open ? `${100 + i * 45}ms` : "0ms" }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => {
                      pickTab(s.id);
                      setOpen(false);
                    }}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "flex items-center justify-between py-2.5 font-serif text-3xl",
                      active === s.id ? "text-fg" : "text-muted",
                    )}
                  >
                    {s.label}
                    {active === s.id ? <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4">
          <SocialLinks className="-ml-2" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
