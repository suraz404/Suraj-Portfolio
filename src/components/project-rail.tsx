"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { GitHubIcon } from "@/components/brand-icons";
import { StatusBadge } from "@/components/status-badge";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

type RailState = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  current: number;
  edges: { start: boolean; end: boolean };
  go: (dir: 1 | -1) => void;
};

const RailContext = createContext<RailState | null>(null);

function useRail() {
  const ctx = useContext(RailContext);
  if (!ctx) throw new Error("Rail parts must be used inside <ProjectRail>");
  return ctx;
}

/** Shares scroll state between the arrows (in the section heading) and the row of cards. */
export function ProjectRail({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: projects.length <= 1 });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const left = track.getBoundingClientRect().left;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - left);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setCurrent(nearest);
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement ?? track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  }, []);

  return <RailContext.Provider value={{ trackRef, current, edges, go }}>{children}</RailContext.Provider>;
}

export function RailControls() {
  const { current, edges, go } = useRail();
  const btn =
    "grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-fg/30 hover:bg-surface disabled:pointer-events-none disabled:opacity-30";
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only" aria-live="polite">
        Project {current + 1} of {projects.length}
      </span>
      <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Previous project" className={btn}>
        <ArrowLeft className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Next project" className={btn}>
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { live, source } = project.links;

  return (
    <li data-card className="group w-[80vw] max-w-[400px] shrink-0 snap-start sm:w-[360px] xl:w-[400px]">
      <article aria-labelledby={`project-${project.slug}`} className="h-full">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:shadow-[0_24px_40px_-24px_rgb(0_0_0/0.35)]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 360px, 80vw"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <h3 id={`project-${project.slug}`} className="font-serif text-2xl">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
          {project.year ? <span className="ml-auto text-xs text-faint">{project.year}</span> : null}
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        {live || source ? (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                Live demo <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
            {source ? (
              <a
                href={source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-3.5 text-sm transition-colors hover:bg-surface-2"
              >
                <GitHubIcon className="size-3.5" /> Source
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </li>
  );
}

/** The row of cards. It lines up with the section heading and runs off the right edge of the screen. */
export function RailTrack() {
  const { trackRef } = useRail();
  return (
    <div
      ref={trackRef}
      role="region"
      aria-label="Projects, scroll horizontally"
      tabIndex={0}
      className="no-scrollbar -mr-4 snap-x snap-mandatory overflow-x-auto scroll-smooth pr-4 pb-4 outline-offset-4 sm:-mr-6 sm:pr-6 lg:-mr-[max(2rem,calc((100vw-76rem)/2+2rem))] lg:pr-[max(2rem,calc((100vw-76rem)/2+2rem))]"
    >
      <ul className="flex w-max gap-6 pt-1 sm:gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </ul>
    </div>
  );
}
