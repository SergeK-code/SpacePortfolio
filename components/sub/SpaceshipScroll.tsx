"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const PATH_D =
  "M 50 0 C 32 12, 68 18, 50 30 S 28 48, 50 58 S 72 76, 50 86 S 34 94, 50 100";

type Pos = { x: number; y: number; angle: number };

const SpaceshipScroll = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const lastProgressRef = useRef<number>(0);
  const shipRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetPosRef = useRef<Pos>({ x: 50, y: 0, angle: 0 });
  const currentPosRef = useRef<Pos>({ x: 50, y: 0, angle: 0 });
  const lastParticleSpawnRef = useRef<number>(0);
  const lastParticlePosRef = useRef<{ x: number; y: number }>({
    x: 50,
    y: 0,
  });
  const hasScrolledRef = useRef(false);

  // ── Resize listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Scroll → target position (no React state) ────────────────────────────
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (v <= 0) return;

      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
        setHasScrolled(true);
      }

      const path = document.getElementById(
        "spaceship-path",
      ) as SVGPathElement | null;
      if (!path) return;

      const total = path.getTotalLength();
      const distance = total * Math.min(v, 1);
      const current = path.getPointAtLength(distance);

      const lookAhead = 2;
      const ahead = path.getPointAtLength(
        Math.min(total, distance + lookAhead),
      );

      const prevProgress = lastProgressRef.current ?? v;
      const scrollingDown = v >= prevProgress;
      lastProgressRef.current = v;

      const nearbyDistance = scrollingDown
        ? Math.min(total, distance + lookAhead)
        : Math.max(0, distance - lookAhead);
      const nearby = path.getPointAtLength(nearbyDistance);

      const angle =
        Math.atan2(nearby.y - current.y, nearby.x - current.x) *
        (180 / Math.PI);

      targetPosRef.current = { x: current.x, y: current.y, angle };
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // ── RAF loop — drives DOM directly, zero re-renders ──────────────────────
  useEffect(() => {
    if (!hasScrolled) return;

    const loop = () => {
      const target = targetPosRef.current;
      const cur = currentPosRef.current;

      // Lerp position
      const lerpFactor = 0.08;
      const newX = cur.x + (target.x - cur.x) * lerpFactor;
      const newY = cur.y + (target.y - cur.y) * lerpFactor;
      const clampedX = Math.max(8, Math.min(92, newX));

      // Lerp angle with wrap-around fix
      let angleDiff = target.angle - cur.angle;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      const newAngle = cur.angle + angleDiff * 0.12;

      currentPosRef.current = { x: clampedX, y: newY, angle: newAngle };

      // Mutate ship DOM directly
      if (shipRef.current) {
        shipRef.current.style.left = `${clampedX}%`;
        shipRef.current.style.top = `${newY}%`;
        shipRef.current.style.transform = `translate(-50%, -50%) rotate(${newAngle + 90}deg)`;
      }

      // ── Particles ────────────────────────────────────────────────────
      const container = particleContainerRef.current;
      if (container) {
        const now = Date.now();
        const dx = clampedX - lastParticlePosRef.current.x;
        const dy = newY - lastParticlePosRef.current.y;
        const moved = Math.sqrt(dx * dx + dy * dy);

        if (now - lastParticleSpawnRef.current > 60 && moved > 0.3) {
          lastParticleSpawnRef.current = now;
          lastParticlePosRef.current = { x: clampedX, y: newY };

          if (container.children.length >= 14) {
            container.removeChild(container.firstChild!);
          }

          const dot = document.createElement("div");
          dot.dataset.born = String(now);
          dot.style.cssText = `
                        position:fixed;
                        left:${clampedX}%;
                        top:${newY}%;
                        width:6px;
                        height:6px;
                        border-radius:50%;
                        background:radial-gradient(circle,#a855f7,#06b6d4);
                        pointer-events:none;
                        transform:translate(-50%,-50%);
                        will-change:opacity,transform;
                        z-index:30;
                    `;
          container.appendChild(dot);
        }

        // Fade existing particles
        Array.from(container.children).forEach((child) => {
          const el = child as HTMLElement;
          const born = parseInt(el.dataset.born ?? "0", 10);
          const age = now - born;
          if (age > 800) {
            container.removeChild(el);
          } else {
            el.style.opacity = String(1 - age / 800);
            el.style.transform = `translate(-50%,-50%) scale(${1 - age / 1600})`;
          }
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hasScrolled]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* ── Path SVG — always in DOM so getPointAtLength works ── */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[30]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path id="spaceship-path" d={PATH_D} fill="none" stroke="none" />
        <path
          d={PATH_D}
          fill="none"
          stroke="url(#trailGradient)"
          strokeWidth="0.3"
          opacity="0.15"
          strokeDasharray="2 4"
        />
      </svg>

      {/* ── Spaceship — mounted only after first scroll ── */}
      {hasScrolled && (
        <div
          ref={shipRef}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 31,
            willChange: "transform, left, top",
            left: "50%",
            top: "0%",
          }}
        >
          <div
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(168,85,247,0.8)) drop-shadow(0 0 16px rgba(6,182,212,0.4))",
            }}
          >
            <svg
              width={isMobile ? 28 : 48}
              height={isMobile ? 28 : 48}
              viewBox="0 0 64 64"
            >
              <defs>
                <linearGradient
                  id="shipGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <linearGradient
                  id="wingGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <radialGradient id="cockpitGradient">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </radialGradient>
              </defs>

              {/* Body */}
              <ellipse
                cx="32"
                cy="36"
                rx="8"
                ry="18"
                fill="url(#shipGradient)"
              />
              {/* Nose */}
              <polygon points="32,4 24,28 40,28" fill="#e2e8f0" />
              {/* Left wing */}
              <polygon
                points="24,30 8,44 20,44 24,38"
                fill="url(#wingGradient)"
              />
              {/* Right wing */}
              <polygon
                points="40,30 56,44 44,44 40,38"
                fill="url(#wingGradient)"
              />
              {/* Cockpit */}
              <circle
                cx="32"
                cy="28"
                r="5"
                fill="url(#cockpitGradient)"
                opacity="0.9"
              />
              {/* Engine glow */}
              <ellipse
                cx="32"
                cy="54"
                rx="5"
                ry="3"
                fill="#06b6d4"
                opacity="0.8"
              />
              {/* Engine flame — only framer-motion usage */}
              <motion.ellipse
                cx="32"
                cy="58"
                rx="3"
                animate={{
                  ry: [4, 7, 4],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                fill="#a855f7"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* ── Particle container — always mounted, filled imperatively ── */}
      <div
        ref={particleContainerRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 30,
          willChange: "contents",
        }}
      />
    </div>
  );
};

export default SpaceshipScroll;
