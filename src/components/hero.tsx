import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { profile } from "@/content/profile";


/** Thin viewfinder corners around the portrait. */
function Corners() {
  const base = "absolute size-3 border-fg/40";
  return (
    <span aria-hidden="true" className="pointer-events-none absolute -inset-2.5">
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}

function Portrait() {
  // Checked on the server, so a missing photo falls back to the monogram instead of a broken image.
  const hasPhoto = existsSync(path.join(process.cwd(), "public", profile.photo.src));
  return (
    <figure className="mx-auto w-full max-w-[260px] sm:max-w-[290px] md:mx-0 md:w-[280px] md:max-w-none xl:w-[340px]">
      <div className="relative">
        <Corners />
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2 ring-1 ring-line">
          {hasPhoto ? (
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              fill
              priority
              sizes="(min-width: 1280px) 340px, 290px"
              className="object-cover object-[50%_30%] transition-transform duration-700 ease-out-soft hover:scale-[1.03]"
            />
          ) : (
            <div className="grid h-full place-items-center">
              <span className="font-serif text-7xl text-muted">{profile.initials}</span>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-8 text-center">
        <p className="font-serif text-[1.35rem] leading-snug text-balance italic">
          “Turning ideas into products, one commit at a time.”
        </p>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
          <svg viewBox="0 0 28 8" aria-hidden="true" className="h-2 w-7 text-signal" fill="none">
            <path d="M1 5c4-4 7 2 11-1s7-3 10 0 4 1 5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-serif text-base italic">Suraj</span>
        </p>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const { headline } = profile;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative flex flex-col justify-center pt-24 pb-20 sm:pt-28 lg:min-h-[100svh] lg:pt-16 lg:pb-16">
      {/* Faint dot field, fading out toward the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
        <div>
          <h1 id="hero-heading">
            <span className="block font-serif text-[1.75rem] text-muted italic sm:text-[2rem]">Namaste, I’m</span>
            <span className="mt-1 block font-serif text-[3.5rem] leading-[0.95] font-medium tracking-[-0.02em] sm:text-[5.5rem]">
              {profile.name}
            </span>
            <span className="mt-6 block max-w-lg text-[1.375rem] leading-snug tracking-tight text-muted text-balance sm:text-[1.75rem]">
              {headline.lead}{" "}
              <em className="font-serif text-[1.15em] text-fg">{headline.emphasis}</em>{" "}
              {headline.tail}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-pretty">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-lg bg-fg px-5 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              See my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-lg border border-line px-5 text-[15px] font-medium transition-colors hover:border-fg/30 hover:bg-surface"
            >
              Get in touch
              <ArrowUpRight
                className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div>
          <Portrait />
        </div>
      </div>

    </section>
  );
}
