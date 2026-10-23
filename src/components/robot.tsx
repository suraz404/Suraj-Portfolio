"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * A small robot that floats beside the section index and glides to whichever
 * section is active. It tilts toward where it is heading, fires a tiny thruster
 * while moving, blinks while idle, and waves if you click it.
 */
export function Robot({ y }: { y: number | null }) {
  const [moving, setMoving] = useState<0 | 1 | -1>(0);
  const [hi, setHi] = useState(0);
  const last = useRef<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (y === null) return;
    const prev = last.current;
    last.current = y;
    if (prev === null || prev === y) return;
    // Lean toward the direction of travel until it arrives.
    setMoving(y > prev ? 1 : -1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMoving(0), 650);
    return () => window.clearTimeout(timer.current);
  }, [y]);

  const sayHi = () => setHi((n) => n + 1);

  return (
    <div
      className="absolute left-0 transition-[top,opacity] duration-700 ease-out-soft"
      style={{ top: y ?? 0, opacity: y === null ? 0 : 1 }}
    >
      <button
        type="button"
        onClick={sayHi}
        aria-label="Say hi to the robot"
        className="relative -translate-y-1/2 rounded-md"
      >
        {hi > 0 ? (
          <span
            key={hi}
            role="status"
            className="animate-rise absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-full bg-fg px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-bg"
          >
            Namaste!
          </span>
        ) : null}
        <span className="animate-bob block">
          <svg
            viewBox="0 0 32 42"
            className="block h-9 w-7 transition-transform duration-500 ease-out-soft"
            style={{ transform: `rotate(${moving * 10}deg)` }}
            aria-hidden="true"
          >
            {/* antenna */}
            <line x1="16" y1="3.5" x2="16" y2="8" stroke="var(--fg)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="16" cy="3" r="1.8" fill="var(--signal)" />
            {/* head */}
            <rect x="6.5" y="8" width="19" height="13" rx="4.5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.4" />
            <g className="animate-blink">
              <circle cx="12.5" cy="14.5" r="1.7" fill="var(--fg)" />
              <circle cx="19.5" cy="14.5" r="1.7" fill="var(--fg)" />
            </g>
            {/* body */}
            <rect x="9.5" y="22.5" width="13" height="9.5" rx="3" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.4" />
            <circle cx="16" cy="27.2" r="1.3" fill="var(--signal)" />
            {/* arms */}
            <line x1="9.5" y1="25" x2="5.5" y2="28.5" stroke="var(--fg)" strokeWidth="1.4" strokeLinecap="round" />
            <line
              key={hi}
              x1="22.5"
              y1="25"
              x2="26.5"
              y2="21.5"
              stroke="var(--fg)"
              strokeWidth="1.4"
              strokeLinecap="round"
              className={hi > 0 ? "animate-wave" : undefined}
            />
            {/* thruster */}
            <path
              d="M13.5 33.5h5l-2.5 5z"
              fill="var(--signal)"
              className={cn("transition-opacity duration-200", moving ? "animate-flame opacity-100" : "opacity-0")}
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
