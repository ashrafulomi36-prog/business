"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#38bdf8";

const NODES: [number, number, number][] = [
  [-2.6, 0.9, 0.2],
  [-1.2, -1.3, 0.6],
  [0, 0, 0],
  [1.3, 1.4, -0.4],
  [2.5, -0.5, 0.3],
  [1.1, -1.7, -0.6],
];
// Path a "packet" follows: inquiry in -> hub -> outputs
const PATH = [0, 2, 3, 4];
const EDGES: [number, number][] = [
  [0, 2], [1, 2], [2, 3], [2, 5], [3, 4], [5, 4],
];

function Packet({ running }: { running: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(PATH.map((i) => new THREE.Vector3(...NODES[i]!)), false, "catmullrom", 0.1),
    [],
  );
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = running ? (clock.elapsedTime * 0.12) % 1 : 0.25;
    ref.current.position.copy(curve.getPoint(t));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshBasicMaterial color="#e0f6ff" />
    </mesh>
  );
}

function Network({ running }: { running: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = running ? clock.elapsedTime : 0;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35 + Math.sin(t * 0.25) * 0.2, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.04);
    if (core.current) {
      core.current.rotation.x = t * 0.2;
      core.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={group}>
      {EDGES.map(([a, b], i) => (
        <Line key={i} points={[NODES[a]!, NODES[b]!]} color={ACCENT} lineWidth={1} transparent opacity={0.45} />
      ))}
      {NODES.map((p, i) =>
        i === 2 ? (
          <mesh key={i} ref={core} position={p}>
            <icosahedronGeometry args={[0.62, 1]} />
            <meshStandardMaterial color="#0c1424" emissive={ACCENT} emissiveIntensity={0.25} wireframe />
          </mesh>
        ) : (
          <Float key={i} speed={running ? 1.4 : 0} floatIntensity={0.35} rotationIntensity={0.2}>
            <mesh position={p}>
              <octahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial color="#10203a" emissive={ACCENT} emissiveIntensity={0.55} roughness={0.35} metalness={0.4} />
            </mesh>
          </Float>
        ),
      )}
      <mesh position={NODES[2]!}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      <Packet running={running} />
    </group>
  );
}

export default function Scene3D({ running }: { running: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={running ? "always" : "demand"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 5]} intensity={40} color="#7dd3fc" />
      <pointLight position={[-4, -3, 3]} intensity={18} color="#3b82f6" />
      <Network running={running} />
    </Canvas>
  );
}
