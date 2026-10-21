"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  const reduceMotion = useReducedMotion();
  useFrame((state, delta) => { if (!reduceMotion && group.current) { group.current.rotation.y += delta * 0.11; group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.1; } });
  const nodes: [number, number, number][] = [[0,1.35,0],[1.25,.48,.25],[.8,-.95,0],[-.8,-.95,.1],[-1.25,.48,0],[0,0,1.2]];
  return <group ref={group}>
    <Float speed={reduceMotion ? 0 : 1.1} rotationIntensity={reduceMotion ? 0 : .12} floatIntensity={reduceMotion ? 0 : .24}>
      <mesh><icosahedronGeometry args={[.8,1]}/><meshStandardMaterial color="#1a4966" metalness={.72} roughness={.23} wireframe/></mesh>
      <mesh><octahedronGeometry args={[.54,0]}/><meshStandardMaterial color="#77e9e0" metalness={.7} roughness={.2} emissive="#1a8d9b" emissiveIntensity={.35}/></mesh>
      {nodes.map((p,i)=><group key={i} position={p}><mesh><sphereGeometry args={[i===5?.12:.085,20,20]}/><meshStandardMaterial color={i%2===0?"#83f2e7":"#7bb6ff"} emissive={i%2===0?"#2d9f9d":"#2c67b2"} emissiveIntensity={1.5}/></mesh><mesh><sphereGeometry args={[.16,16,16]}/><meshBasicMaterial color="#79e9e2" transparent opacity={.09}/></mesh></group>)}
      {nodes.map((p,i)=><Line key={`l${i}`} points={[[0,0,0],p]} color={i%2===0?"#74e6df":"#70aaff"} transparent opacity={.55} lineWidth={1}/>) }
    </Float>
    <Sparkles count={48} scale={4.8} size={2.2} speed={reduceMotion ? 0 : .22} color="#82caff" opacity={.6}/>
  </group>;
}
export default function WorkflowScene() {
  return <Canvas fallback={<div className="subtle-grid" style={{position:"absolute",inset:0,borderRadius:"50%"}} aria-label="Static workflow illustration"/>} dpr={[1,1.5]} camera={{position:[0,0,5.2],fov:42}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}}><ambientLight intensity={1.1}/><pointLight position={[2,3,3]} intensity={30} color="#6cbbff"/><pointLight position={[-3,-2,2]} intensity={20} color="#6ef0df"/><Suspense fallback={null}><Core/></Suspense></Canvas>;
}
