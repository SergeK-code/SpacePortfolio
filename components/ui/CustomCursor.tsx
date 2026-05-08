"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let targetX = x;
    let targetY = y;
    let isDown = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const onDown = () => (isDown = true);
    const onUp = () => (isDown = false);

    const loop = () => {
      // Dot snaps to cursor, ring eases (lightweight trailing)
      x = targetX;
      y = targetY;
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${isDown ? 0.85 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isDown ? 0.9 : 1})`;
      }

      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="sk-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="sk-cursor-dot" aria-hidden="true" />
    </>
  );
}

