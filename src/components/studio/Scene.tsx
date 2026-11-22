'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
export type Mat = { id: string; label: string; kind: 'marble' | 'wood' | 'paint'; base: string; accent: string };
export type Zone = 'doors' | 'bed' | 'side' | 'floor' | 'light';
export type Mode = 'closets' | 'walkin' | 'bedroom' | 'tv' | 'coffee';
export type Cfg = { mode: Mode; doors: Mat; style: 'flat' | 'grooved' | 'glass'; kind: 'hinged' | 'sliding'; handle: 'hidden' | 'gold' | 'black'; open: boolean; head: Mat; bed: string; side: string; floor: Mat; led: boolean; ledColor: string; ledLevel: number; night: boolean };
export type Ctl = { move: { current: { x: number; y: number } }; onPick: (z: Zone) => void };
const rng = (s: number) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function makeTex(m: Mat, rep = 0) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d')!; const r = rng(7);
  g.fillStyle = m.base; g.fillRect(0, 0, 512, 512); g.strokeStyle = m.accent;
  if (m.kind === 'marble') for (let i = 0; i < 16; i++) { g.globalAlpha = 0.15 + r() * 0.35; g.lineWidth = 0.6 + r() * 2.4; g.beginPath(); let x = r() * 512, y = 0; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - 0.5) * 140; y += 90; g.quadraticCurveTo(x + (r() - 0.5) * 80, y - 45, x, y); } g.stroke(); }
  if (m.kind === 'wood') { for (let x = 0; x < 512; x += 2) { g.globalAlpha = 0.08 + r() * 0.22; g.lineWidth = 1; g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r() * 6, 170, x - r() * 6, 340, x + r() * 4, 512); g.stroke(); } }
  g.globalAlpha = 1; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); } return t;
}
type V3 = [number, number, number];
const Box = ({ p, s, c, onClick, r = 0 }: { p: V3; s: V3; c: string; onClick?: (e: ThreeEvent<MouseEvent>) => void; r?: number }) => (<mesh position={p} rotation={[0, r, 0]} onClick={onClick}><boxGeometry args={s} /><meshLambertMaterial color={c} /></mesh>);
type LedP = { color: string; emissive: string; emissiveIntensity: number };
const Led = ({ p, s, m }: { p: V3; s: V3; m: LedP }) => (<mesh position={p}><boxGeometry args={s} /><meshStandardMaterial {...m} /></mesh>);
const CLOTH = ['#d9d2c5', '#8c9a8f', '#2f3b4a', '#b08f6a', '#c9a0a0', '#4a4f55', '#e6dcc8'];
type Pick = (z: Zone) => (e: ThreeEvent<MouseEvent>) => void;
function Door({ i, n, bw, h, d, cfg, tex, pick }: { i: number; n: number; bw: number; h: number; d: number; cfg: Cfg; tex: THREE.Texture; pick: Pick }) {
  const g = useRef<THREE.Group>(null); const t = useRef(0);
  const sliding = cfg.kind === 'sliding'; const cx = -(n * bw) / 2 + (i + 0.5) * bw; const s = i % 2 === 0 ? 1 : -1; const dir = i < n / 2 ? 1 : -1;
  const lane = sliding && i % 2 ? 0.05 : 0; const dw = sliding ? bw * 1.04 : bw - 0.008; const dh = h - 0.04; const off = sliding ? 0 : -s * dw / 2;
  useFrame((_, dt) => {
    const o = g.current; if (!o) return; t.current += ((cfg.open ? 1 : 0) - t.current) * Math.min(1, dt * 5);
    if (sliding) o.position.x = cx + dir * t.current * bw * 0.96; else o.rotation.y = s * t.current * 1.7;
  });
  const mat = cfg.style === 'glass' ? <meshStandardMaterial color="#8fa39e" transparent opacity={0.3} roughness={0.08} /> : <meshStandardMaterial map={tex} roughness={0.5} />;
  const hx = sliding ? dir * (dw / 2 - 0.06) : -s * (dw / 2 - 0.06);
  return (
    <group ref={g} position={[sliding ? cx : cx + s * bw / 2, h / 2, d / 2 + 0.014 + lane]}>
      <group position={[off, 0, 0]}>
        <mesh onClick={pick('doors')}><boxGeometry args={[dw, dh, 0.026]} />{mat}</mesh>
        {cfg.style === 'glass' && [[-dw / 2 + 0.03, 0, 0.04, dh], [dw / 2 - 0.03, 0, 0.04, dh], [0, dh / 2 - 0.03, dw, 0.04], [0, -dh / 2 + 0.03, dw, 0.04]].map(([x, y, w, hh], k) => (<mesh key={k} position={[x, y, 0.002]}><boxGeometry args={[w, hh, 0.03]} /><meshStandardMaterial map={tex} roughness={0.5} /></mesh>))}
        {cfg.style === 'grooved' && [-dw / 4, 0, dw / 4].map((x) => (<mesh key={x} position={[x, 0, 0.0145]}><boxGeometry args={[0.012, dh - 0.12, 0.002]} /><meshBasicMaterial color="#000" transparent opacity={0.28} /></mesh>))}
        {cfg.handle !== 'hidden' && <mesh position={[hx, 0, 0.03]}><boxGeometry args={[0.022, 0.55, 0.03]} /><meshStandardMaterial color={cfg.handle === 'gold' ? '#c9a24f' : '#16181a'} metalness={0.7} roughness={0.3} /></mesh>}
      </group>
    </group>
  );
}
function Wardrobe({ n, bw, h, d, cfg, tex, m, pick, inner: kind = 'closet', plinth = true }: { n: number; bw: number; h: number; d: number; cfg: Cfg; tex: THREE.Texture; m: LedP; pick: Pick; inner?: 'closet' | 'shelves'; plinth?: boolean }) {
  const W = n * bw, x0 = -W / 2, inner = '#e8e2d6';
  return (<group>
    <Box p={[0, h / 2, -d / 2 + 0.01]} s={[W, h, 0.02]} c={inner} />
    {Array.from({ length: n + 1 }, (_, i) => <Box key={i} p={[x0 + i * bw, h / 2, 0]} s={[0.03, h, d]} c={inner} />)}
    <Box p={[0, h - 0.015, 0]} s={[W, 0.03, d]} c={inner} />{plinth && <Box p={[0, 0.06, 0.02]} s={[W, 0.12, d - 0.04]} c="#2c2c2c" />}
    {Array.from({ length: n }, (_, i) => { const cx = x0 + (i + 0.5) * bw, ty = kind === 'shelves' ? 9 : i % 3, lv = h > 1.2 ? [h * 0.25, h * 0.5, h * 0.75] : h > 0.6 ? [h * 0.5] : [];
      return (<group key={i}>
        <Led p={[cx - bw / 2 + 0.05, h / 2, d / 2 - 0.07]} s={[0.012, h - 0.3, 0.012]} m={m} />
        {ty === 9 && lv.map((y, j) => (<group key={y}><Box p={[cx, y, 0]} s={[bw - 0.05, 0.02, d - 0.05]} c={inner} /><Box p={[cx + (j % 2 ? 0.12 : -0.12), y + 0.11, 0]} s={[0.16, 0.2 + (j % 2) * 0.06, 0.16]} c={CLOTH[(i + j + 3) % 7]} /></group>))}
        {ty !== 1 && ty !== 9 && <mesh position={[cx, ty === 0 ? 2.0 : 1.7, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.012, 0.012, bw - 0.08, 8]} /><meshStandardMaterial color="#9a9a9a" metalness={0.8} roughness={0.3} /></mesh>}
        {ty !== 1 && ty !== 9 && Array.from({ length: 7 }, (_, j) => <Box key={j} p={[cx - bw / 2 + 0.14 + j * ((bw - 0.28) / 6), ty === 0 ? 1.55 : 1.4, 0]} s={[0.05, ty === 0 ? 0.85 : 0.55, 0.38]} c={CLOTH[(i + j) % 7]} />)}
        {ty === 1 && [0.5, 0.95, 1.4, 1.85, 2.3].map((y, j) => (<group key={y}><Box p={[cx, y, 0]} s={[bw - 0.05, 0.02, d - 0.05]} c={inner} /><Box p={[cx - 0.15, y + 0.12, 0]} s={[bw * 0.5, 0.2 + (j % 2) * 0.06, d * 0.6]} c={CLOTH[(i + j + 2) % 7]} /></group>))}
        {ty === 2 && [0.3, 0.55, 0.8].map((y) => <Box key={y} p={[cx, y, d / 2 - 0.05]} s={[bw - 0.06, 0.22, 0.02]} c="#bdb4a3" />)}
      </group>); })}
    {Array.from({ length: n }, (_, i) => <Door key={i} i={i} n={n} bw={bw} h={h} d={d} cfg={cfg} tex={tex} pick={pick} />)}
  </group>);
}
function Room({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  const doorTex = useMemo(() => makeTex(cfg.doors), [cfg.doors]); const headTex = useMemo(() => makeTex(cfg.head), [cfg.head]); const floorTex = useMemo(() => makeTex(cfg.floor, 4), [cfg.floor]);
  useEffect(() => () => doorTex.dispose(), [doorTex]); useEffect(() => () => headTex.dispose(), [headTex]); useEffect(() => () => floorTex.dispose(), [floorTex]);
  const k = cfg.led ? cfg.ledLevel : 0, col = cfg.ledColor, n = cfg.night, mode = cfg.mode, bed = mode === 'bedroom';
  const m: LedP = { color: cfg.led ? col : '#d8d4cb', emissive: col, emissiveIntensity: k * (n ? 3 : 2) };
  const pick: Pick = (z) => (e) => { if (e.delta > 6) return; e.stopPropagation(); ctl.onPick(z); };
  const ceil = '#f1ede4'; const dm = (map: THREE.Texture) => <meshStandardMaterial map={map} roughness={0.5} />;
  return (<>
    <color attach="background" args={[n ? '#070b12' : '#cfe3f5']} />
    <ambientLight intensity={n ? 0.3 : 1.1} /><directionalLight position={[8, 6, 1]} intensity={n ? 0.05 : 1.5} />
    <pointLight position={[0, 2.8, -1]} color={col} intensity={k * (n ? 22 : 12)} distance={9} /><pointLight position={[0, 2.8, 2]} color={col} intensity={k * (n ? 16 : 8)} distance={8} />
    <pointLight position={bed ? [0, 1.5, -4] : mode === 'coffee' ? [0, 1.6, -3.8] : [0, 2.3, -3.8]} color={col} intensity={k * (n ? 14 : 7)} distance={5} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} onClick={pick('floor')}><planeGeometry args={[8, 8]} /><meshStandardMaterial map={floorTex} roughness={0.35} /></mesh>
    <mesh position={[0, 1.5, -4.5]} onClick={pick('side')}><planeGeometry args={[8, 3]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[-4, 1.5, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={pick('side')}><planeGeometry args={[8, 3]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[4, 1.5, -0.5]} rotation={[0, -Math.PI / 2, 0]} onClick={pick('side')}><planeGeometry args={[8, 3]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh position={[0, 1.5, 3.5]} rotation={[0, Math.PI, 0]}><planeGeometry args={[8, 3]} /><meshLambertMaterial color={cfg.side} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, -0.5]} onClick={pick('light')}><planeGeometry args={[8, 8]} /><meshLambertMaterial color={ceil} /></mesh>
    <Led p={[0, 2.97, -4.2]} s={[7.6, 0.03, 0.05]} m={m} /><Led p={[0, 2.97, 3.1]} s={[7.6, 0.03, 0.05]} m={m} /><Led p={[-3.7, 2.97, -0.5]} s={[0.05, 0.03, 7.3]} m={m} /><Led p={[3.7, 2.97, -0.5]} s={[0.05, 0.03, 7.3]} m={m} />
    <mesh position={[3.99, 1.6, -0.5]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[4.5, 1.8]} /><meshBasicMaterial color={n ? '#16233a' : '#d6ebff'} /></mesh>
    <Box p={[3.9, 1.5, -2.9]} s={[0.15, 2.9, 0.9]} c="#d9cebd" /><Box p={[3.9, 1.5, 1.9]} s={[0.15, 2.9, 0.9]} c="#d9cebd" />
    {mode === 'closets' && (<>
      <group position={[0, 0, -4.2]}><Wardrobe n={6} bw={1.2} h={2.7} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} /></group>
      <Box p={[0, 0.22, -1.8]} s={[1.5, 0.44, 0.5]} c="#a39a88" /><Box p={[0, 0.012, -2.2]} s={[3.6, 0.02, 3]} c="#cdc3b1" />
      <mesh position={[-3.97, 1.2, -1.2]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[0.9, 2.1]} /><meshStandardMaterial color="#d6dedc" metalness={0.15} roughness={0.08} emissive="#9fb0ad" emissiveIntensity={0.25} /></mesh>
    </>)}
    {mode === 'walkin' && (<>
      <group position={[0, 0, -4.2]}><Wardrobe n={6} bw={1.2} h={2.7} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} /></group>
      <group position={[-3.7, 0, -0.6]} rotation={[0, Math.PI / 2, 0]}><Wardrobe n={4} bw={1.2} h={2.7} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} /></group>
      <mesh position={[0, 0.44, -1.4]} onClick={pick('doors')}><boxGeometry args={[2.2, 0.88, 0.9]} />{dm(doorTex)}</mesh>
      <Box p={[0, 0.9, -1.4]} s={[2.3, 0.04, 1]} c="#ece7dd" />{[0.25, 0.5, 0.75].map((y) => <Box key={y} p={[0, y, -0.94]} s={[2.0, 0.005, 0.01]} c="#1b1b1b" />)}
      <Box p={[-2.6, 0.22, -1.4]} s={[0.7, 0.44, 0.7]} c="#a39a88" /><Box p={[0, 0.012, -1.4]} s={[3.6, 0.02, 2.4]} c="#cdc3b1" />
    </>)}
    {mode === 'bedroom' && (<>
      <group position={[-3.7, 0, -0.6]} rotation={[0, Math.PI / 2, 0]}><Wardrobe n={4} bw={1.2} h={2.7} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} /></group>
      <mesh position={[0, 0.95, -4.43]} onClick={pick('bed')}><boxGeometry args={[2.5, 1.3, 0.12]} />{dm(headTex)}</mesh>
      <Led p={[0, 1.62, -4.36]} s={[2.4, 0.025, 0.03]} m={m} />
      <mesh position={[0, 0.3, -3.4]} onClick={pick('bed')}><boxGeometry args={[2.1, 0.3, 2.2]} />{dm(headTex)}</mesh>
      <Box p={[0, 0.6, -3.4]} s={[1.98, 0.3, 2.08]} c={cfg.bed} onClick={pick('bed')} /><Box p={[0, 0.78, -3.0]} s={[2.0, 0.1, 1.3]} c="#efeae0" onClick={pick('bed')} />
      <Box p={[-0.5, 0.82, -4.0]} s={[0.7, 0.16, 0.4]} c="#f4f0e8" /><Box p={[0.5, 0.82, -4.0]} s={[0.7, 0.16, 0.4]} c="#f4f0e8" />
      {[-1.5, 1.5].map((x) => (<group key={x}><mesh position={[x, 0.35, -4.25]} onClick={pick('doors')}><boxGeometry args={[0.5, 0.5, 0.4]} />{dm(doorTex)}</mesh><Led p={[x, 0.09, -4.05]} s={[0.4, 0.015, 0.02]} m={m} /><mesh position={[x, 0.72, -4.25]}><sphereGeometry args={[0.1, 12, 10]} /><meshStandardMaterial color="#ffe1b8" emissive="#ffcf99" emissiveIntensity={n ? 2.4 : 0.3} /></mesh></group>))}
      <Box p={[0, 0.012, -3.2]} s={[3.4, 0.02, 2.6]} c="#cfc6b4" /><mesh position={[0, 0.2, -2.0]}><boxGeometry args={[1.6, 0.4, 0.45]} /><meshLambertMaterial color={cfg.bed} /></mesh>
      <mesh position={[3.72, 0.4, -1.5]} onClick={pick('doors')}><boxGeometry args={[0.45, 0.8, 1.6]} />{dm(doorTex)}</mesh><Box p={[3.97, 1.4, -1.5]} s={[0.04, 1.0, 0.8]} c="#d6dedc" />
    </>)}
    {mode === 'tv' && (<>
      <mesh position={[0, 1.5, -4.46]} onClick={pick('bed')}><boxGeometry args={[4.6, 2.7, 0.06]} />{dm(headTex)}</mesh>
      <Led p={[-2.3, 1.5, -4.4]} s={[0.03, 2.7, 0.03]} m={m} /><Led p={[2.3, 1.5, -4.4]} s={[0.03, 2.7, 0.03]} m={m} /><Led p={[0, 2.83, -4.4]} s={[4.6, 0.03, 0.03]} m={m} />
      <mesh position={[0, 1.75, -4.4]}><boxGeometry args={[1.9, 1.08, 0.05]} /><meshStandardMaterial color="#06080b" roughness={0.2} /></mesh>
      <mesh position={[0, 0.7, -4.2]} onClick={pick('doors')}><boxGeometry args={[2.7, 0.38, 0.45]} />{dm(doorTex)}</mesh>{[-0.45, 0.45].map((x) => <Box key={x} p={[x * 1.5, 0.7, -3.97]} s={[0.005, 0.3, 0.01]} c="#1b1b1b" />)}
      <Led p={[0, 0.49, -4.05]} s={[2.5, 0.02, 0.03]} m={m} />
      {[-2.8, 2.8].map((x) => (<group key={x} position={[x, 0, -4.3]}><Wardrobe n={1} bw={0.9} h={2.5} d={0.4} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" /></group>))}
      <Box p={[0, 0.25, -1.2]} s={[2.9, 0.42, 1.0]} c={cfg.bed} onClick={pick('bed')} /><Box p={[0, 0.68, -0.72]} s={[2.9, 0.55, 0.2]} c={cfg.bed} onClick={pick('bed')} />{[-1.5, 1.5].map((x) => <Box key={x} p={[x, 0.42, -1.2]} s={[0.2, 0.55, 1.0]} c={cfg.bed} />)}
      <mesh position={[0, 0.2, -2.6]}><cylinderGeometry args={[0.55, 0.55, 0.36, 28]} /><meshLambertMaterial color="#5c4029" /></mesh><Box p={[0, 0.012, -2.2]} s={[4, 0.02, 3.2]} c="#cdc3b1" />
    </>)}
    {mode === 'coffee' && (<>
      <group position={[0, 0, -4.2]}><Wardrobe n={5} bw={0.8} h={0.9} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" /></group>
      <mesh position={[0, 0.92, -4.17]} onClick={pick('bed')}><boxGeometry args={[4.1, 0.04, 0.66]} />{dm(headTex)}</mesh>
      <mesh position={[0, 1.26, -4.49]} onClick={pick('bed')}><boxGeometry args={[4.1, 0.62, 0.02]} />{dm(headTex)}</mesh>
      <group position={[0, 1.55, -4.32]}><Wardrobe n={5} bw={0.8} h={0.8} d={0.35} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} /></group>
      <Led p={[0, 1.53, -4.2]} s={[4, 0.02, 0.03]} m={m} /><Led p={[0, 0.07, -3.88]} s={[4, 0.015, 0.02]} m={m} />
      <Box p={[-0.9, 1.14, -4.3]} s={[0.32, 0.4, 0.3]} c="#26282b" /><Box p={[-0.9, 1.36, -4.3]} s={[0.34, 0.05, 0.32]} c="#c9a24f" />
      {[0.1, 0.35, 0.6].map((x, k) => <mesh key={x} position={[x, 0.99, -4.15]}><cylinderGeometry args={[0.04, 0.035, 0.09, 12]} /><meshLambertMaterial color={k % 2 ? '#f1eee8' : '#c9a24f'} /></mesh>)}
      {[1.2, 1.5].map((x) => <Box key={x} p={[x, 1.02, -4.25]} s={[0.2, 0.18, 0.2]} c="#e6dcc8" />)}
      {[-0.7, 0.7].map((x) => (<group key={x}><mesh position={[x, 0.62, -3.3]}><cylinderGeometry args={[0.2, 0.2, 0.06, 20]} /><meshLambertMaterial color={cfg.bed} /></mesh><mesh position={[x, 0.31, -3.3]}><cylinderGeometry args={[0.025, 0.025, 0.62, 8]} /><meshStandardMaterial color="#2b2b2b" metalness={0.7} /></mesh></group>))}
      <Box p={[0, 0.012, -2.6]} s={[3.2, 0.02, 2.6]} c="#cdc3b1" />
    </>)}
  </>);
}
function Walker({ ctl, boxes, z0 }: { ctl: Ctl; boxes: [number, number, number, number][]; z0: number }) {
  const { camera, gl, size } = useThree();
  useEffect(() => { const c = camera as THREE.PerspectiveCamera; c.fov = size.width < size.height ? 78 : 62; c.updateProjectionMatrix(); }, [camera, size.width, size.height]);
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
    if (s.intro < 1) { s.intro = Math.min(1, s.intro + dt / 2.8); const e = 1 - Math.pow(1 - s.intro, 3); camera.position.set(0, THREE.MathUtils.lerp(2.4, 1.65, e), THREE.MathUtils.lerp(9, z0, e)); camera.rotation.set(s.pitch, s.yaw, 0); return; }
    const k = keys.current, j = ctl.move.current;
    let ix = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0) + j.x, iz = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0) + j.y;
    const len = Math.hypot(ix, iz); if (len > 1) { ix /= len; iz /= len; }
    const sp = k.ShiftLeft || k.ShiftRight ? 4.2 : 2.3, sin = Math.sin(s.yaw), cos = Math.cos(s.yaw), a = 1 - Math.exp(-9 * dt);
    s.vx += (ix * cos - iz * sin) * sp * a - s.vx * a; s.vz += (-ix * sin - iz * cos) * sp * a - s.vz * a;
    const r = 0.28, p = camera.position, nx = p.x + s.vx * dt, nz = p.z + s.vz * dt;
    const hit = (x: number, z: number) => x < -3.65 || x > 3.65 || z < -4.2 || z > 3.15 || boxes.some(([cx, cz, hw, hd]) => Math.abs(x - cx) < hw + r && Math.abs(z - cz) < hd + r);
    if (!hit(nx, p.z)) p.x = nx; else s.vx = 0; if (!hit(p.x, nz)) p.z = nz; else s.vz = 0;
    p.y = 1.65; camera.rotation.set(s.pitch, s.yaw, 0);
  });
  return null;
}
const BOXES: Record<Mode, [number, number, number, number][]> = {
  closets: [[0, -4.2, 3.6, 0.5], [0, -1.8, 0.8, 0.3]],
  walkin: [[0, -4.2, 3.6, 0.5], [-3.7, -0.6, 0.35, 2.45], [0, -1.4, 1.2, 0.55], [-2.6, -1.4, 0.4, 0.4]],
  bedroom: [[0, -3.4, 1.1, 1.15], [1.5, -4.2, 0.3, 0.25], [-1.5, -4.2, 0.3, 0.25], [-3.7, -0.6, 0.35, 2.45], [3.7, -1.5, 0.3, 0.85], [0, -2.0, 0.85, 0.25]],
  tv: [[0, -4.3, 3.6, 0.35], [0, -1.2, 1.5, 0.55], [0, -2.6, 0.6, 0.5]],
  coffee: [[0, -4.2, 2.1, 0.5], [-0.7, -3.3, 0.25, 0.25], [0.7, -3.3, 0.25, 0.25]],
};
const START_Z: Record<Mode, number> = { closets: 2.9, walkin: 2.9, bedroom: 2.9, tv: 1.4, coffee: 0.4 };
export default function Scene({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  // يعيد قياس الحاوية بعد استقرار تخطيط الصفحة (يمنع ظهور المشهد في جزء من الشاشة على الجوال)
  useEffect(() => { const t = [60, 350, 1200].map((ms) => setTimeout(() => window.dispatchEvent(new Event('resize')), ms)); return () => t.forEach(clearTimeout); }, [cfg.mode]);
  return (
    <Canvas key={cfg.mode} dpr={[1, 1.5]} camera={{ fov: 62, near: 0.1, far: 40, position: [0, 2.4, 9] }} gl={{ antialias: true, powerPreference: 'high-performance' }} style={{ touchAction: 'none' }} aria-label="استوديو ثلاثي الأبعاد: تجوّل داخل الغرفة">
      <Room cfg={cfg} ctl={ctl} /><Walker ctl={ctl} boxes={BOXES[cfg.mode]} z0={START_Z[cfg.mode]} />
    </Canvas>
  );
}
