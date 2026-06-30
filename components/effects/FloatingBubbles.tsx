"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingBubbles({ count = 18 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const bubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 36 + 8,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.15,
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-0 rounded-full animate-bubble"
          style={{
            left: `${b.x}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(186,230,253,0.4))`,
            border: "1px solid rgba(186,230,253,0.6)",
            boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.8), inset -1px -1px 3px rgba(125,211,252,0.3)",
          }}
        />
      ))}
    </div>
  );
}
