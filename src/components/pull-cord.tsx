"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { toggleTheme } from "@/lib/theme";

const MAX_PULL = 70;
const TRIGGER = 24;

let audio: AudioContext | null = null;

/** A short two-part "click", like a pull-chain light switch. Made with Web Audio, so there is no file to load. */
function playClick() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audio ??= new Ctx();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();

    const burst = (at: number, freq: number, volume: number) => {
      const length = Math.floor(ctx.sampleRate * 0.03);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 6);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = 1.4;
      const gain = ctx.createGain();
      gain.gain.value = volume;
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(ctx.currentTime + at);
    };
    burst(0, 2400, 0.9);
    burst(0.065, 1600, 0.6);
  } catch {
    // Audio is a nice extra; ignore browsers that block it.
  }
}

/**
 * A cord hanging from the top of the page. Pull it down and let go, click it,
 * or press Enter/Space on it to switch between light and dark.
 */
export function PullCord() {
  const swingRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLSpanElement>(null);
  const knobRef = useRef<HTMLButtonElement>(null);
  const pull = useRef({ value: 0, velocity: 0 });
  const raf = useRef(0);

  const [hidden, setHidden] = useState(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Only show the cord near the top of the page; it slides away once the visitor scrolls.
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const render = (px: number) => {
    const rope = ropeRef.current;
    const knob = knobRef.current;
    if (!rope || !knob) return;
    const rest = rope.offsetHeight || 1;
    rope.style.transform = `scaleY(${(rest + px) / rest})`;
    knob.style.transform = `translateY(${px}px)`;
  };

  /** Lets the cord spring back up with a little bounce. */
  const release = () => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pull.current = { value: 0, velocity: 0 };
      render(0);
      return;
    }
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const p = pull.current;
      p.velocity += (-420 * p.value - 14 * p.velocity) * dt;
      p.value += p.velocity * dt;
      render(p.value);
      if (Math.abs(p.value) > 0.2 || Math.abs(p.velocity) > 2) raf.current = requestAnimationFrame(step);
      else {
        pull.current = { value: 0, velocity: 0 };
        render(0);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const fire = () => {
    playClick();
    toggleTheme();
    swingRef.current?.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(6deg)" },
        { transform: "rotate(-4deg)" },
        { transform: "rotate(2deg)" },
        { transform: "rotate(0deg)" },
      ],
      { duration: 900, easing: "ease-out" },
    );
  };

  /** A short tug for clicks and the keyboard. */
  const tug = () => {
    pull.current = { value: 0, velocity: 380 };
    release();
    fire();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    cancelAnimationFrame(raf.current);
    const startY = e.clientY - pull.current.value;
    let moved = false;

    const onMove = (ev: PointerEvent) => {
      const raw = Math.max(0, ev.clientY - startY);
      if (raw > 3) moved = true;
      // Rubber band: harder to pull the further it goes.
      pull.current.value = MAX_PULL * (1 - Math.exp(-raw / MAX_PULL));
      pull.current.velocity = 0;
      render(pull.current.value);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (!moved) return tug();
      if (pull.current.value >= TRIGGER) fire();
      release();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  return (
    <div
      inert={hidden}
      className={cn(
        "pointer-events-none fixed top-0 z-[60] transition-[transform,opacity] duration-500 ease-out-soft [--rope:1.5rem] lg:[--rope:4rem] xl:[--rope:5rem]",
        hidden ? "-translate-y-[calc(100%+var(--rope))] opacity-0" : "translate-y-0 opacity-100",
        // Beside the menu button on phones, at the right edge on desktop.
        "right-[6.25rem] lg:right-5 xl:right-[max(1.25rem,calc(50%-38rem-1.75rem))]",
      )}
    >
      <div ref={swingRef} className="flex origin-top flex-col items-center">
        <span ref={ropeRef} aria-hidden="true" className="block h-[var(--rope)] w-px origin-top bg-fg/50 will-change-transform" />
        <button
          ref={knobRef}
          type="button"
          aria-label="Pull to switch between light and dark theme"
          onPointerDown={onPointerDown}
          onClick={(e) => {
            // Mouse and touch go through the pointer handlers; this is for Enter and Space.
            if (e.detail === 0) tug();
          }}
          className="pointer-events-auto -mt-1 grid size-5 touch-none cursor-grab place-items-center rounded-full bg-fg shadow-[0_2px_6px_rgb(0_0_0/0.25)] ring-4 ring-bg transition-[box-shadow] select-none will-change-transform hover:shadow-[0_0_0_6px_var(--signal-soft)] active:cursor-grabbing"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
        </button>
      </div>

      {/* "pull this" with a hand-drawn arrow, always beside the bead. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-1.5 flex items-end gap-0.5 whitespace-nowrap text-muted"
        style={{ top: "calc(var(--rope) - 0.4rem)" }}
      >
        <span className="font-serif text-base italic">pull this</span>
        <svg viewBox="0 0 40 22" fill="none" className="mb-1.5 h-[18px] w-8 text-signal">
          <path d="M2 18c9 3 20 1 30-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M26 7.5l6.5 1.2-1.4 6.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
