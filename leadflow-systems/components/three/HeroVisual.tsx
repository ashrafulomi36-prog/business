"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false, loading: () => <NetworkFallback /> });

export function NetworkFallback() {
  const nodes = [
    { x: 60, y: 90, l: "Inquiry" },
    { x: 150, y: 210, l: "Validate" },
    { x: 250, y: 150, l: "Route" },
    { x: 340, y: 70, l: "CRM" },
    { x: 430, y: 190, l: "Task" },
  ];
  const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 4]];
  return (
    <svg viewBox="0 0 500 280" className="h-full w-full" role="img" aria-label="Diagram of an inquiry flowing through connected automation steps">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a!]!.x} y1={nodes[a!]!.y} x2={nodes[b!]!.x} y2={nodes[b!]!.y} stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.25" className="flow-line" />
      ))}
      {nodes.map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r="9" fill="#0c1424" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="3" fill="#38bdf8" />
          <text x={n.x} y={n.y + 28} textAnchor="middle" fill="#9aa8c2" fontSize="11" fontFamily="ui-monospace, monospace">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(!reduced && hasWebGL() ? "3d" : "fallback");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[5/4] w-full" role="img" aria-label="Animated 3D network showing an inquiry flowing through connected automation steps">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl" />
      {mode === "3d" ? <Scene3D running={inView} /> : <NetworkFallback />}
    </div>
  );
}
