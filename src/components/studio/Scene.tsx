'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
export type Mat = { id: string; label: string; kind: 'marble' | 'wood' | 'flute' | 'paint'; base: string; accent: string };
export type Zone = 'main' | 'side' | 'floor' | 'light';
export type Cfg = { main: Mat; side: string; floor: Mat; led: boolean; ledColor: string; ledLevel: number; night: boolean };
export type Ctl = { move: { current: { x: number; y: number } }; onPick: (z: Zone) => void };
const rng = (s: number) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function makeTex(m: Mat, rep = 0) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d')!; const r = rng(7);
  g.fillStyle = m.base; g.fillRect(0, 0, 512, 512); g.strokeStyle = m.accent;
  if (m.kind === 'marble') for (let i = 0; i < 16; i++) { g.globalAlpha = 0.15 + r() * 0.35; g.lineWidth = 0.6 + r() * 2.4; g.beginPath(); let x = r() * 512, y = 0; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - 0.5) * 140; y += 90; g.quadraticCurveTo(x + (r() - 0.5) * 80, y - 45, x, y); } g.stroke(); }
  if (m.kind === 'wood') { for (let x = 0; x < 512; x += 2) { g.globalAlpha = 0.08 + r() * 0.22; g.lineWidth = 1; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r() * 6, 170, x - r() * 6, 340, x + r() * 4, 512); g.stroke(); } g.globalAlpha = 0.55; g.lineWidth = 2; for (let x = 0; x < 512; x += 128) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); } }
  if (m.kind === 'flute') for (let x = 0; x < 512; x += 32) { const gr = g.createLinearGradient(x, 0, x + 32, 0); gr.addColorStop(0, m.base); gr.addColorStop(0.5, m.accent); gr.addColorStop(1, m.base); g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(x, 0, 32, 512); }
  g.globalAlpha = 1; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); } return t;
}
const B = { minX: -4.55, maxX: 4.55, minZ: -5.2, maxZ: 4.55 };
const BOXES: [number, number, number, number][] = [[0, -2.2, 1.75, 0.6], [0, -3.5, 0.65, 0.65], [0, -5.45, 1.45, 0.35], [-2.4, 1.6, 1.4, 0.9], [4, -5, 0.45, 0.45], [3.5, -4.2, 0.3, 0.3]];
function Room({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  const mainTex = useMemo(() => makeTex(cfg.main), [cfg.main]);
  const floorTex = useMemo(() => makeTex(cfg.floor, 4), [cfg.floor]);
  useEffect(() => () => mainTex.dispose(), [mainTex]); useEffect(() => () => floorTex.dispose(), [floorTex]);
  const k = cfg.led ? cfg.ledLevel : 0, col = cfg.ledColor, n = cfg.night;
  const led = { color: cfg.led ? col : '#d8d4cb', emissive: col, emissiveIntensity: k * (n ? 3 : 2) };
  const pick = (z: Zone) => (e: ThreeEvent<MouseEvent>) => { if (e.delta > 6) return; e.stopPropagation(); ctl.onPick(z); };
  const ceil = '#f1ede4'; const paint = cfg.main.kind === 'paint';
  const L = ({ p, s, z = 'light' as Zone }: { p: [number, number, number]; s: [number, number, number]; z?: Zone }) => (<mesh position={p} onClick={pick(z)}><boxGeometry args={s} /><meshStandardMaterial {...led} /></mesh>);
  return (<>
    <color attach="background" args={[n ? '#070b12' : '#cfe3f5']} />
    <ambientLight intensity={n ? 0.3 : 1.1} /><directionalLight position={[8, 6, 1]} intensity={n ? 0.05 : 1.6} />
    <pointLight position={[0, 2.9, -1.2]} color={col} intensity={k * (n ? 26 : 14)} distance={9} />
    <pointLight position={[0, 2.9, 2.5]} color={col} intensity={k * (n ? 20 : 10)} distance={8} />
    <pointLight position={[0, 2.6, -5.1]} color={col} intensity={k * (n ? 16 : 8)} distance={6} />
    <pointLight position={[3.5, 1.5, -4.2]} color="#ffcf99" intensity={n ? 9 : 0} distance={6} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.3]} onClick={pick('floor')}><planeGeometry args={[10, 10.5]} /><meshStandardMaterial map={floorTex} roughness={0.35} /></mesh>
    <mesh position={[0, 1.6, -5.25]}><planeGeometry args={[10, 3.2]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[-5, 1.6, -0.3]} rotation={[0, Math.PI / 2, 0]} onClick={pick('side')}><planeGeometry args={[10.5, 3.2]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[5, 1.6, -0.3]} rotation={[0, -Math.PI / 2, 0]} onClick={pick('side')}><planeGeometry args={[10.5, 3.2]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[0, 1.6, 4.95]} rotation={[0, Math.PI, 0]} onClick={pick('side')}><planeGeometry args={[10, 3.2]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, -0.3]}><planeGeometry args={[10, 10.5]} /><meshLambertMaterial color={ceil} /></mesh>
    <mesh position={[0, 3.12, -0.3]}><boxGeometry args={[8.4, 0.16, 9]} /><meshLambertMaterial color={ceil} /></mesh>
    <L p={[0, 3.03, -4.82]} s={[8.5, 0.03, 0.05]} /><L p={[0, 3.03, 4.22]} s={[8.5, 0.03, 0.05]} /><L p={[-4.22, 3.03, -0.3]} s={[0.05, 0.03, 9.1]} /><L p={[4.22, 3.03, -0.3]} s={[0.05, 0.03, 9.1]} />
    <mesh position={[0, 2.55, -0.3]} rotation={[Math.PI / 2, 0, 0]} onClick={pick('light')}><torusGeometry args={[0.75, 0.035, 8, 40]} /><meshStandardMaterial {...led} /></mesh>
    <mesh position={[0, 1.5, -5.15]} onClick={pick('main')}><boxGeometry args={[5, 2.7, 0.12]} /><meshStandardMaterial map={paint ? null : mainTex} color={paint ? cfg.main.base : '#ffffff'} roughness={cfg.main.kind === 'marble' ? 0.25 : 0.65} /></mesh>
    <L p={[-2.55, 1.5, -5.05]} s={[0.03, 2.7, 0.03]} /><L p={[2.55, 1.5, -5.05]} s={[0.03, 2.7, 0.03]} />
    <mesh position={[0, 1.75, -5.05]}><boxGeometry args={[1.9, 1.07, 0.05]} /><meshStandardMaterial color="#06080b" roughness={0.2} /></mesh>
    <mesh position={[0, 0.55, -4.9]}><boxGeometry args={[2.8, 0.3, 0.45]} /><meshLambertMaterial color="#6b4a30" /></mesh>
    <L p={[0, 0.38, -4.7]} s={[2.6, 0.02, 0.03]} />
    <mesh position={[-4.95, 1.7, -1.5]} rotation={[0, Math.PI / 2, 0]} onClick={pick('side')}><circleGeometry args={[0.58, 40]} /><meshStandardMaterial color="#d6dedc" metalness={0.15} roughness={0.08} emissive="#9fb0ad" emissiveIntensity={0.25} /></mesh>
    <mesh position={[-4.94, 1.7, -1.5]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.62, 0.02, 8, 40]} /><meshStandardMaterial {...led} /></mesh>
    <mesh position={[4.97, 1.8, -0.8]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[6, 2.2]} /><meshBasicMaterial color={n ? '#16233a' : '#d6ebff'} /></mesh>
    {[-4.2, 2.4].map((z) => (<mesh key={z} position={[4.85, 1.5, z]}><boxGeometry args={[0.15, 3, 1.1]} /><meshLambertMaterial color="#d9cebd" /></mesh>))}
    <mesh position={[0, 0.012, -3]}><boxGeometry args={[4.2, 0.02, 3.2]} /><meshLambertMaterial color="#cdc3b1" /></mesh>
    <mesh position={[0, 0.25, -2.2]}><boxGeometry args={[3.2, 0.42, 1]} /><meshLambertMaterial color="#8d8779" /></mesh>
    <mesh position={[0, 0.68, -1.78]}><boxGeometry args={[3.2, 0.6, 0.2]} /><meshLambertMaterial color="#8d8779" /></mesh>
    {[-1.65, 1.65].map((x) => (<mesh key={x} position={[x, 0.45, -2.2]}><boxGeometry args={[0.2, 0.55, 1]} /><meshLambertMaterial color="#7c766a" /></mesh>))}
    <mesh position={[0, 0.2, -3.5]}><cylinderGeometry args={[0.55, 0.55, 0.36, 28]} /><meshLambertMaterial color="#5c4029" /></mesh>
    <mesh position={[-2.4, 0.74, 1.6]}><boxGeometry args={[2.2, 0.06, 1]} /><meshLambertMaterial color="#6b4a30" /></mesh>
    {[[-1.5, 1.3], [-1.5, 1.9], [-3.3, 1.3], [-3.3, 1.9]].map(([x, z]) => (<mesh key={`${x}${z}`} position={[x, 0.36, z]}><boxGeometry args={[0.12, 0.72, 0.12]} /><meshLambertMaterial color="#5c4029" /></mesh>))}
    {[-3.1, -1.7].map((x) => [0.75, 2.45].map((z) => (<mesh key={`${x}${z}`} position={[x, 0.25, z]}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshLambertMaterial color="#a39a88" /></mesh>)))}
    <mesh position={[4, 0.3, -5]}><cylinderGeometry args={[0.28, 0.22, 0.6, 14]} /><meshLambertMaterial color="#b9ad98" /></mesh>
    <mesh position={[4, 1.0, -5]}><sphereGeometry args={[0.5, 14, 12]} /><meshLambertMaterial color="#47684f" /></mesh>
    <mesh position={[3.5, 0.75, -4.2]}><cylinderGeometry args={[0.02, 0.02, 1.5, 6]} /><meshLambertMaterial color="#2b2b2b" /></mesh>
    <mesh position={[3.5, 1.5, -4.2]}><sphereGeometry args={[0.2, 14, 12]} /><meshStandardMaterial color="#ffe1b8" emissive="#ffcf99" emissiveIntensity={n ? 2.5 : 0.3} /></mesh>
  </>);
}
function Walker({ ctl }: { ctl: Ctl }) {
  const { camera, gl } = useThree();
  const st = useRef({ yaw: 0, pitch: -0.03, vx: 0, vz: 0, intro: 0 }); const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    camera.rotation.order = 'YXZ'; const el = gl.domElement; el.style.cursor = 'grab'; let d: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => { d = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing'; };
    const mv = (e: PointerEvent) => { if (!d) return; st.current.yaw -= (e.clientX - d.x) * 0.005; st.current.pitch = THREE.MathUtils.clamp(st.current.pitch - (e.clientY - d.y) * 0.004, -1.2, 1.2); d = { x: e.clientX, y: e.clientY }; };
    const up = () => { d = null; el.style.cursor = 'grab'; };
    const kd = (e: KeyboardEvent) => { if ((e.target as HTMLElement).tagName !== 'INPUT') keys.current[e.code] = true; }; const ku = (e: KeyboardEvent) => { keys.current[e.code] = false; };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); addEventListener('keydown', kd); addEventListener('keyup', ku);
    return () => { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); removeEventListener('keydown', kd); removeEventListener('keyup', ku); };
  }, [camera, gl]);
  useFrame((_, dt0) => {
    const dt = Math.min(dt0, 0.05), s = st.current;
    if (s.intro < 1) { s.intro = Math.min(1, s.intro + dt / 3); const e = 1 - Math.pow(1 - s.intro, 3); camera.position.set(0, THREE.MathUtils.lerp(2.6, 1.65, e), THREE.MathUtils.lerp(11, 3.7, e)); camera.rotation.set(s.pitch, s.yaw, 0); return; }
    const k = keys.current, j = ctl.move.current;
    let ix = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0) + j.x, iz = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0) + j.y;
    const len = Math.hypot(ix, iz); if (len > 1) { ix /= len; iz /= len; }
    const sp = k.ShiftLeft || k.ShiftRight ? 4.2 : 2.3, sin = Math.sin(s.yaw), cos = Math.cos(s.yaw), a = 1 - Math.exp(-9 * dt);
    s.vx += (ix * cos - iz * sin) * sp * a - s.vx * a; s.vz += (-ix * sin - iz * cos) * sp * a - s.vz * a;
    const r = 0.28, p = camera.position, nx = p.x + s.vx * dt, nz = p.z + s.vz * dt;
    const hit = (x: number, z: number) => x < B.minX || x > B.maxX || z < B.minZ || z > B.maxZ || BOXES.some(([cx, cz, hw, hd]) => Math.abs(x - cx) < hw + r && Math.abs(z - cz) < hd + r);
    if (!hit(nx, p.z)) p.x = nx; else s.vx = 0; if (!hit(p.x, nz)) p.z = nz; else s.vz = 0;
    p.y = 1.65; camera.rotation.set(s.pitch, s.yaw, 0);
  });
  return null;
}
export default function Scene({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 62, near: 0.1, far: 40, position: [0, 2.6, 11] }} gl={{ antialias: true, powerPreference: 'high-performance' }} style={{ touchAction: 'none' }} aria-label="استوديو ثلاثي الأبعاد: تجوّل داخل الغرفة">
      <Room cfg={cfg} ctl={ctl} /><Walker ctl={ctl} />
    </Canvas>
  );
}
