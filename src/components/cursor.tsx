"use client";

import { useEffect, useRef } from "react";

/**
 * An arrow cursor that follows the pointer on a spring and turns to face
 * the direction of travel. It squashes slightly while moving and grows a
 * little over links and buttons.
 *
 * Only runs for fine pointers that can hover, and never when the visitor
 * prefers reduced motion; the native cursor is used in those cases.
 */

const INTERACTIVE = 'a, button, [role="tab"], summary, label, [data-cursor]';

type Spring = { value: number; velocity: number; target: number };

const spring = (value: number): Spring => ({ value, velocity: 0, target: value });

/** Advances a damped spring by dt seconds (unit mass). */
function step(s: Spring, stiffness: number, damping: number, dt: number) {
  const force = stiffness * (s.target - s.value) - damping * s.velocity;
  s.velocity += force * dt;
  s.value += s.velocity * dt;
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = ref.current;
    if (!el) return;

    let enabled = false;
    let raf = 0;
    let last = 0;
    let visible = false;
    let idleTimer = 0;
    let hovering = false;

    const x = spring(-100);
    const y = spring(-100);
    const rotation = spring(0);
    const scale = spring(1);

    // Pointer velocity, used for the direction the arrow faces.
    let prev = { x: 0, y: 0, t: 0 };
    let prevAngle = 0;
    let totalRotation = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (!visible) {
        x.value = x.target = e.clientX;
        y.value = y.target = e.clientY;
        prev = { x: e.clientX, y: e.clientY, t: now };
        visible = true;
        el.style.opacity = "1";
      }
      x.target = e.clientX;
      y.target = e.clientY;

      const dt = now - prev.t;
      if (dt > 0) {
        const vx = (e.clientX - prev.x) / dt;
        const vy = (e.clientY - prev.y) / dt;
        if (Math.hypot(vx, vy) > 0.1) {
          const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
          // Take the shortest way round so the arrow never spins a full turn.
          let diff = angle - prevAngle;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          totalRotation += diff;
          prevAngle = angle;
          rotation.target = totalRotation;

          scale.target = hovering ? 1.1 : 0.95;
          window.clearTimeout(idleTimer);
          idleTimer = window.setTimeout(() => (scale.target = hovering ? 1.15 : 1), 150);
        }
      }
      prev = { x: e.clientX, y: e.clientY, t: now };
    };

    const onOver = (e: PointerEvent) => {
      hovering = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
      scale.target = hovering ? 1.15 : 1;
    };
    const onDown = () => (scale.target = 0.85);
    const onUp = () => (scale.target = hovering ? 1.15 : 1);
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = (now: number) => {
      const elapsed = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      // Fixed sub-steps keep the springs stable at any frame rate.
      const steps = Math.max(1, Math.ceil(elapsed / (1 / 240)));
      const dt = elapsed / steps;
      for (let i = 0; i < steps; i++) {
        step(x, 400, 45, dt);
        step(y, 400, 45, dt);
        step(rotation, 300, 60, dt);
        step(scale, 500, 35, dt);
      }
      el.style.transform = `translate3d(${x.value}px, ${y.value}px, 0) translate(-50%, -50%) rotate(${rotation.value}deg) scale(${scale.value})`;
      raf = requestAnimationFrame(tick);
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      document.documentElement.classList.add("has-cursor");
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      last = 0;
      onLeave();
    };

    const sync = () => (capable.matches && !reduced.matches ? enable() : disable());
    sync();
    capable.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      capable.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[300] opacity-0 transition-opacity duration-200 will-change-transform"
    >
      <svg width="26" height="28" viewBox="0 0 26 28" className="drop-shadow-[0_2px_3px_rgb(0_0_0/0.18)]">
        <path
          d="M13 2.2 23.4 24.6a.9.9 0 0 1-1.2 1.2L13.4 21.9a1 1 0 0 0-.8 0L3.8 25.8a.9.9 0 0 1-1.2-1.2L13 2.2Z"
          fill="var(--fg)"
          stroke="var(--bg)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
