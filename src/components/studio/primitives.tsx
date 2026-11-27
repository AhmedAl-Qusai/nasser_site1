'use client';
import { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

export type Mat = { id: string; label: string; kind: 'marble' | 'wood' | 'paint'; base: string; accent: string };
export type Zone = 'doors' | 'bed' | 'side' | 'floor' | 'light';
export type Mode =
  | 'closets'
  | 'walkin'
  | 'bedroom'
  | 'tv'
  | 'coffee'
  | 'display'
  | 'entry'
  | 'laundry'
  | 'vanity'
  | 'storage'
  | 'cladding'
  | 'furniture'
  | 'wpc'
  | 'renovation'
  | 'kitchens'
  | 'commercial'
  | 'pocket';

export type Cfg = {
  mode: Mode;
  doors: Mat;
  style: 'flat' | 'grooved' | 'glass';
  kind: 'hinged' | 'sliding';
  handle: 'hidden' | 'gold' | 'black';
  open: boolean;
  head: Mat;
  bed: string;
  side: string;
  floor: Mat;
  led: boolean;
  ledColor: string;
  ledLevel: number;
  roomLight: boolean;
  night: boolean;
};

export type Ctl = { move: { current: { x: number; y: number } }; onPick: (z: Zone) => void };
export type V3 = [number, number, number];
export type LedState = { on: boolean; col: string; glow: string; level: number };
export type Pick = (z: Zone) => (e: ThreeEvent<MouseEvent>) => void;

export const CLOTH = ['#d9d2c5', '#8c9a8f', '#2f3b4a', '#b08f6a', '#c9a0a0', '#4a4f55', '#e6dcc8'];

export const Box = ({
  p,
  s,
  c,
  onClick,
  r = 0,
  metal = 0.05,
  rough = 0.65,
}: {
  p: V3;
  s: V3;
  c: string;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  r?: number;
  metal?: number;
  rough?: number;
}) => (
  <mesh position={p} rotation={[0, r, 0]} onClick={onClick}>
    <boxGeometry args={s} />
    <meshStandardMaterial color={c} metalness={metal} roughness={rough} />
  </mesh>
);

export const TexBox = ({
  p,
  s,
  tex,
  onClick,
  r = 0,
  rough = 0.45,
}: {
  p: V3;
  s: V3;
  tex: THREE.Texture;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  r?: number;
  rough?: number;
}) => (
  <mesh position={p} rotation={[0, r, 0]} onClick={onClick}>
    <boxGeometry args={s} />
    <meshStandardMaterial map={tex} roughness={rough} />
  </mesh>
);

export const Led = ({
  p,
  s,
  m,
  onClick,
}: {
  p: V3;
  s: V3;
  m: LedState;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}) => (
  <mesh position={p} onClick={onClick}>
    <boxGeometry args={s} />
    {m.on ? (
      <meshBasicMaterial color={m.glow} toneMapped={false} />
    ) : (
      <meshStandardMaterial color="#352e2a" roughness={0.7} />
    )}
  </mesh>
);

export const LedLight = ({
  p,
  m,
  power = 3.2,
  dist = 4.5,
}: {
  p: V3;
  m: LedState;
  power?: number;
  dist?: number;
}) => (m.on ? <pointLight position={p} color={m.col} intensity={m.level * power} distance={dist} decay={1.3} /> : null);

export const HandleBar = ({
  p,
  s = [0.022, 0.45, 0.03],
  handle,
}: {
  p: V3;
  s?: V3;
  handle: Cfg['handle'];
}) =>
  handle === 'hidden' ? null : (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={handle === 'gold' ? '#d4af5a' : '#181a1d'} metalness={0.78} roughness={0.25} />
    </mesh>
  );

export function Door({
  i,
  n,
  bw,
  h,
  d,
  cfg,
  tex,
  pick,
  forceKind,
  slideFactor = 0.96,
  pocketDir,
}: {
  i: number;
  n: number;
  bw: number;
  h: number;
  d: number;
  cfg: Cfg;
  tex: THREE.Texture;
  pick: Pick;
  forceKind?: 'hinged' | 'sliding';
  slideFactor?: number;
  pocketDir?: -1 | 1;
}) {
  const g = useRef<THREE.Group>(null);
  const t = useRef(0);
  const sliding = (forceKind ?? cfg.kind) === 'sliding';
  const cx = -(n * bw) / 2 + (i + 0.5) * bw;
  const s = i % 2 === 0 ? 1 : -1;
  const dir = pocketDir ?? (i < n / 2 ? 1 : -1);
  const lane = sliding && !pocketDir && i % 2 ? 0.048 : 0;
  const dw = sliding && !pocketDir ? bw * 1.03 : bw - 0.01;
  const dh = h - 0.04;
  const off = sliding ? 0 : (-s * dw) / 2;

  useFrame((_, dt) => {
    const o = g.current;
    if (!o) return;
    t.current += ((cfg.open ? 1 : 0) - t.current) * Math.min(1, dt * 5.5);
    if (sliding) o.position.x = cx + dir * t.current * bw * slideFactor;
    else o.rotation.y = s * t.current * 1.62;
  });

  const mat =
    cfg.style === 'glass' ? (
      <meshStandardMaterial color="#7b8f8c" transparent opacity={0.34} roughness={0.08} metalness={0.2} />
    ) : (
      <meshStandardMaterial map={tex} roughness={0.45} />
    );
  const hx = sliding ? (pocketDir ? -pocketDir * (dw / 2 - 0.08) : dir * (dw / 2 - 0.06)) : -s * (dw / 2 - 0.06);

  return (
    <group ref={g} position={[sliding ? cx : cx + (s * bw) / 2, h / 2, pocketDir ? 0 : d / 2 + 0.014 + lane]}>
      <group position={[off, 0, 0]}>
        <mesh onClick={pick('doors')}>
          <boxGeometry args={[dw, dh, 0.028]} />
          {mat}
        </mesh>
        {cfg.style === 'glass' &&
          [
            [-dw / 2 + 0.03, 0, 0.045, dh],
            [dw / 2 - 0.03, 0, 0.045, dh],
            [0, dh / 2 - 0.03, dw, 0.045],
            [0, -dh / 2 + 0.03, dw, 0.045],
          ].map(([x, y, w, hh], k) => (
            <mesh key={k} position={[x, y, 0.002]} onClick={pick('doors')}>
              <boxGeometry args={[w, hh, 0.032]} />
              <meshStandardMaterial map={tex} roughness={0.45} />
            </mesh>
          ))}
        {cfg.style === 'grooved' &&
          [-0.32, -0.16, 0, 0.16, 0.32].map((f) => (
            <mesh key={f} position={[dw * f, 0, 0.016]}>
              <boxGeometry args={[0.014, dh - 0.1, 0.006]} />
              <meshStandardMaterial color="#1d1612" roughness={0.8} />
            </mesh>
          ))}
        <HandleBar
          p={[hx, 0, pocketDir ? 0.022 : 0.03]}
          s={pocketDir ? [0.018, 0.28, 0.012] : [0.022, Math.min(0.52, dh * 0.42), 0.03]}
          handle={cfg.handle}
        />
        {pocketDir && (
          <HandleBar
            p={[hx, 0, -0.022]}
            s={[0.018, 0.28, 0.012]}
            handle={cfg.handle}
          />
        )}
      </group>
    </group>
  );
}

export function DrawerBank({
  w,
  h,
  d,
  rows = 3,
  cfg,
  tex,
  pick,
}: {
  w: number;
  h: number;
  d: number;
  rows?: number;
  cfg: Cfg;
  tex: THREE.Texture;
  pick: Pick;
}) {
  const g = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    const o = g.current;
    if (!o) return;
    t.current += ((cfg.open ? 1 : 0) - t.current) * Math.min(1, dt * 5);
    o.children.forEach((ch, idx) => {
      const factor = idx === rows - 1 ? 0.32 : idx === rows - 2 ? 0.18 : 0.08;
      ch.position.z = t.current * factor;
    });
  });
  const rh = (h - 0.08) / rows;
  return (
    <group>
      <Box p={[0, h / 2, 0]} s={[w, h, d]} c="#dfd8ca" onClick={pick('doors')} />
      <group ref={g}>
        {Array.from({ length: rows }, (_, i) => {
          const cy = 0.05 + (i + 0.5) * rh;
          return (
            <group key={i}>
              <TexBox p={[0, cy, d / 2 + 0.014]} s={[w - 0.02, rh - 0.014, 0.026]} tex={tex} onClick={pick('doors')} />
              <Box p={[0, cy - rh * 0.12, d / 2 - 0.16]} s={[w - 0.08, rh * 0.65, 0.32]} c="#cfc6b5" />
              <HandleBar p={[0, cy + rh * 0.12, d / 2 + 0.036]} s={[Math.min(0.26, w * 0.35), 0.018, 0.024]} handle={cfg.handle} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function Wardrobe({
  n,
  bw,
  h,
  d,
  cfg,
  tex,
  m,
  pick,
  inner: kind = 'closet',
  plinth = true,
  noDoors = false,
  forceKind,
}: {
  n: number;
  bw: number;
  h: number;
  d: number;
  cfg: Cfg;
  tex: THREE.Texture;
  m: LedState;
  pick: Pick;
  inner?: 'closet' | 'shelves';
  plinth?: boolean;
  noDoors?: boolean;
  forceKind?: 'hinged' | 'sliding';
}) {
  const W = n * bw;
  const x0 = -W / 2;
  const inner = '#e8e2d6';
  return (
    <group>
      <Box p={[0, h / 2, -d / 2 + 0.01]} s={[W, h, 0.02]} c={inner} />
      {Array.from({ length: n + 1 }, (_, i) => (
        <Box key={i} p={[x0 + i * bw, h / 2, 0]} s={[0.03, h, d]} c={inner} />
      ))}
      <Box p={[0, h - 0.015, 0]} s={[W, 0.03, d]} c={inner} />
      {plinth && <Box p={[0, 0.06, 0.02]} s={[W, 0.12, d - 0.04]} c="#2c2623" />}
      {Array.from({ length: n }, (_, i) => {
        const cx = x0 + (i + 0.5) * bw;
        const ty = kind === 'shelves' ? 9 : i % 3;
        const lv = h > 1.3 ? [h * 0.24, h * 0.48, h * 0.72] : h > 0.65 ? [h * 0.48] : [];
        return (
          <group key={i}>
            <Led p={[cx - bw / 2 + 0.045, h / 2, d / 2 - 0.07]} s={[0.015, Math.max(0.25, h - 0.24), 0.015]} m={m} onClick={pick('light')} />
            {ty === 9 &&
              lv.map((y, j) => (
                <group key={y}>
                  <Box p={[cx, y, 0]} s={[bw - 0.05, 0.022, d - 0.05]} c={inner} />
                  <Box p={[cx + (j % 2 ? 0.12 : -0.12), y + 0.11, 0]} s={[0.18, 0.2 + (j % 2) * 0.06, 0.18]} c={CLOTH[(i + j + 3) % 7]} />
                </group>
              ))}
            {ty !== 1 && ty !== 9 && (
              <mesh position={[cx, ty === 0 ? h * 0.76 : h * 0.66, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, bw - 0.08, 8]} />
                <meshStandardMaterial color="#b0a89a" metalness={0.8} roughness={0.25} />
              </mesh>
            )}
            {ty !== 1 &&
              ty !== 9 &&
              Array.from({ length: 6 }, (_, j) => (
                <Box
                  key={j}
                  p={[cx - bw / 2 + 0.15 + j * ((bw - 0.3) / 5), ty === 0 ? h * 0.56 : h * 0.5, 0]}
                  s={[0.055, ty === 0 ? h * 0.32 : h * 0.22, Math.min(0.4, d * 0.68)]}
                  c={CLOTH[(i + j) % 7]}
                />
              ))}
            {ty === 1 &&
              [0.2, 0.38, 0.56, 0.74].map((f, j) => (
                <group key={f}>
                  <Box p={[cx, h * f, 0]} s={[bw - 0.05, 0.022, d - 0.05]} c={inner} />
                  <Box p={[cx - 0.12, h * f + 0.1, 0]} s={[bw * 0.48, 0.16, d * 0.58]} c={CLOTH[(i + j + 2) % 7]} />
                </group>
              ))}
            {ty === 2 && [0.12, 0.22, 0.32].map((f) => <Box key={f} p={[cx, h * f, d / 2 - 0.05]} s={[bw - 0.06, h * 0.085, 0.022]} c="#bdb4a3" />)}
          </group>
        );
      })}
      {!noDoors &&
        Array.from({ length: n }, (_, i) => (
          <Door key={i} i={i} n={n} bw={bw} h={h} d={d} cfg={cfg} tex={tex} pick={pick} forceKind={forceKind} />
        ))}
    </group>
  );
}
