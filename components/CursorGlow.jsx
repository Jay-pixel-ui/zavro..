"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);

    if (!mq.matches) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    let raf;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, .magnetic, .tilt-card";
    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.classList.add("cursor-ring--active");
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove("cursor-ring--active");
      }
    };
    document.querySelectorAll(interactiveSelector).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[150] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,229,255,0.85)]"
        style={{ transition: "background 200ms ease" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[150] w-9 h-9 rounded-full border border-cyan-300/60"
        style={{
          mixBlendMode: "screen",
          transition: "width 200ms ease, height 200ms ease, border-color 200ms ease",
          boxShadow: "0 0 30px rgba(0,229,255,0.25)",
        }}
      />
      <style>{`
        .cursor-ring--active {
          border-color: rgba(255, 184, 0, 0.85) !important;
          box-shadow: 0 0 30px rgba(255, 184, 0, 0.45) !important;
        }
      `}</style>
    </>
  );
}
