"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";

import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { backgroundTab, type BackgroundTab } from "@/lib/background-tab";
import { cn } from "@/lib/cn";

const TABS: Array<{ id: BackgroundTab; label: string }> = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

/** Experience and Education share one block: click a title to switch between them. */
export function Background() {
  const tab = useSyncExternalStore(backgroundTab.subscribe, backgroundTab.get, () => "experience" as const);
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Opening /#experience (or /#education) picks the matching tab.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (id === "education" || id === "experience") backgroundTab.set(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Slide the underline beneath the active title.
  useLayoutEffect(() => {
    const btn = listRef.current?.querySelector<HTMLElement>(`[data-tab="${tab}"]`);
    const bar = barRef.current;
    if (!btn || !bar) return;
    bar.style.width = `${btn.offsetWidth}px`;
    bar.style.transform = `translateX(${btn.offsetLeft}px)`;
  }, [tab]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = tab === "education" ? "experience" : "education";
    backgroundTab.set(next);
    listRef.current?.querySelector<HTMLElement>(`[data-tab="${next}"]`)?.focus();
  };

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Experience and education"
        onKeyDown={onKeyDown}
        className="relative mb-12 flex flex-wrap items-baseline gap-x-3 gap-y-2 pb-3 sm:gap-x-5"
      >
        {TABS.map((t, i) => (
          <span key={t.id} className="flex items-baseline gap-3 sm:gap-5">
            {i > 0 ? (
              <span aria-hidden="true" className="font-serif text-2xl text-faint sm:text-4xl">
                /
              </span>
            ) : null}
            <button
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              data-tab={t.id}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => backgroundTab.set(t.id)}
              className={cn(
                "font-serif text-2xl font-medium tracking-[0.02em] uppercase transition-colors duration-300 sm:text-5xl sm:tracking-[0.06em]",
                tab === t.id ? "text-fg" : "text-faint hover:text-muted",
              )}
            >
              {t.label}
            </button>
          </span>
        ))}
        <span
          ref={barRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] rounded-full bg-signal transition-[transform,width] duration-500 ease-out-soft"
        />
      </div>

      {TABS.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={tab !== t.id}
          className="animate-rise max-w-2xl"
        >
          {t.id === "education" ? <Education /> : <Experience />}
        </div>
      ))}
    </div>
  );
}
