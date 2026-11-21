'use client';
import { useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
export type Mat = { id: string; label: string; kind: 'marble' | 'wood' | 'flute' | 'paint'; base: string; accent: string };
export type Cfg = { mat: Mat; wall: string; led: boolean; ledColor: string; ledLevel: number };
const rng = (s: number) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function makeTex(m: Mat) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d')!; const r = rng(7);
  g.fillStyle = m.base; g.fillRect(0, 0, 512, 512); g.strokeStyle = m.accent;
  if (m.kind === 'marble') for (let i = 0; i < 16; i++) { g.globalAlpha = 0.15 + r() * 0.35; g.lineWidth = 0.6 + r() * 2.4; g.beginPath(); let x = r() * 512, y = 0; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - 0.5) * 140; y += 90; g.quadraticCurveTo(x + (r() - 0.5) * 80, y - 45, x, y); } g.stroke(); }
  if (m.kind === 'wood') { for (let x = 0; x < 512; x += 2) { g.globalAlpha = 0.08 + r() * 0.22; g.lineWidth = 1; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r() * 6, 170, x - r() * 6, 340, x + r() * 4, 512); g.stroke(); } g.globalAlpha = 0.55; g.lineWidth = 2; for (let x = 0; x < 512; x += 128) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); } }
  if (m.kind === 'flute') for (let x = 0; x < 512; x += 32) { const gr = g.createLinearGradient(x, 0, x + 32, 0); gr.addColorStop(0, m.base); gr.addColorStop(0.5, m.accent); gr.addColorStop(1, m.base); g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(x, 0, 32, 512); }
  g.globalAlpha = 1; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function Room({ cfg }: { cfg: Cfg }) {
  const tex = useMemo(() => makeTex(cfg.mat), [cfg.mat]);
  useEffect(() => () => tex.dispose(), [tex]);
  const k = cfg.led ? cfg.ledLevel : 0; const col = cfg.ledColor;
  const led = <meshStandardMaterial color={cfg.led ? col : '#d9d6cf'} emissive={col} emissiveIntensity={k * 2.4} />;
  const ceil = '#f4f1ea';
  return (<>
    <color attach="background" args={['#0f1722']} />
    <ambientLight intensity={1.15} /><directionalLight position={[2, 4, 5]} intensity={1.5} />
    <pointLight position={[0, 2.6, 1.1]} color={col} intensity={k * 14} distance={7} />
    <pointLight position={[0, 0.5, 0.7]} color={col} intensity={k * 5} distance={3.5} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2.5]}><planeGeometry args={[7, 9]} /><meshStandardMaterial color="#d8d2c6" roughness={0.4} /></mesh>
    <mesh position={[0, 1.5, 0]}><planeGeometry args={[7, 3]} /><meshStandardMaterial color={cfg.wall} /></mesh>
    <mesh position={[-3.5, 1.5, 2.5]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[9, 3]} /><meshStandardMaterial color={cfg.wall} /></mesh>
    <mesh position={[3.5, 1.5, 2.5]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[9, 3]} /><meshStandardMaterial color={cfg.wall} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 2.5]}><planeGeometry args={[7, 9]} /><meshStandardMaterial color={ceil} /></mesh>
    <mesh position={[0, 2.9, 1.2]}><boxGeometry args={[7, 0.2, 2.4]} /><meshStandardMaterial color={ceil} /></mesh>
    <mesh position={[0, 2.78, 2.38]}><boxGeometry args={[6.6, 0.03, 0.05]} />{led}</mesh>
    <mesh position={[0, 2.8, 0.1]}><boxGeometry args={[6.6, 0.03, 0.05]} />{led}</mesh>
    <mesh position={[0, 1.35, 0.07]}><boxGeometry args={[3.8, 2.5, 0.14]} /><meshStandardMaterial map={cfg.mat.kind === 'paint' ? null : tex} color={cfg.mat.kind === 'paint' ? cfg.mat.base : '#ffffff'} roughness={cfg.mat.kind === 'marble' ? 0.25 : 0.65} /></mesh>
    {[-1.95, 1.95].map((x) => (<mesh key={x} position={[x, 1.35, 0.16]}><boxGeometry args={[0.03, 2.5, 0.03]} />{led}</mesh>))}
    <mesh position={[0, 1.7, 0.17]}><boxGeometry args={[1.7, 0.95, 0.05]} /><meshStandardMaterial color="#07090c" roughness={0.2} /></mesh>
    <mesh position={[0, 0.58, 0.34]}><boxGeometry args={[2.6, 0.28, 0.4]} /><meshStandardMaterial color="#6f4e32" roughness={0.6} /></mesh>
    <mesh position={[0, 0.42, 0.5]}><boxGeometry args={[2.4, 0.02, 0.03]} />{led}</mesh>
    <mesh position={[0, 0.01, 2.6]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[3.8, 2.4]} /><meshStandardMaterial color="#c9c0b0" /></mesh>
    <group position={[0, 0, 3.4]}>
      <mesh position={[0, 0.25, 0]}><boxGeometry args={[2.8, 0.4, 0.95]} /><meshStandardMaterial color="#8b8a86" /></mesh>
      <mesh position={[0, 0.62, 0.42]}><boxGeometry args={[2.8, 0.6, 0.2]} /><meshStandardMaterial color="#8b8a86" /></mesh>
    </group>
    <mesh position={[0, 0.2, 2.2]}><cylinderGeometry args={[0.45, 0.45, 0.35, 32]} /><meshStandardMaterial color="#5e4128" /></mesh>
  </>);
}
export default function Scene({ cfg }: { cfg: Cfg }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 6.3], fov: 45 }} aria-label="مشهد ثلاثي الأبعاد لغرفة جلوس">
      <Room cfg={cfg} />
      <OrbitControls enablePan={false} target={[0, 1.4, 0.5]} minDistance={3.5} maxDistance={7.5} minPolarAngle={1.1} maxPolarAngle={1.65} minAzimuthAngle={-0.7} maxAzimuthAngle={0.7} enableDamping />
    </Canvas>
  );
}
