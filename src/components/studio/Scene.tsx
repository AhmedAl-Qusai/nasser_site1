'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, Led, LedLight, type Cfg, type Ctl, type LedState, type Mat, type Mode, type Pick, type Zone } from './primitives';
import { RoomsHome } from './RoomsHome';
import { RoomsArchitectural } from './RoomsArchitectural';

export type { Mat, Zone, Mode, Cfg, Ctl };

const rng = (s: number) => () => {
  s |= 0;
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function makeTex(m: Mat, rep = 0) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const r = rng(7);
  g.fillStyle = m.base;
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = m.accent;
  if (m.kind === 'marble')
    for (let i = 0; i < 16; i++) {
      g.globalAlpha = 0.15 + r() * 0.35;
      g.lineWidth = 0.6 + r() * 2.4;
      g.beginPath();
      let x = r() * 512;
      let y = 0;
      g.moveTo(x, y);
      for (let k = 0; k < 6; k++) {
        x += (r() - 0.5) * 140;
        y += 90;
        g.quadraticCurveTo(x + (r() - 0.5) * 80, y - 45, x, y);
      }
      g.stroke();
    }
  if (m.kind === 'wood') {
    for (let x = 0; x < 512; x += 2) {
      g.globalAlpha = 0.08 + r() * 0.22;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(x, 0);
      g.bezierCurveTo(x + r() * 6, 170, x - r() * 6, 340, x + r() * 4, 512);
      g.stroke();
    }
  }
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (rep) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep, rep);
  }
  return t;
}

function Room({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  const doorTex = useMemo(() => makeTex(cfg.doors), [cfg.doors]);
  const headTex = useMemo(() => makeTex(cfg.head), [cfg.head]);
  const floorTex = useMemo(() => makeTex(cfg.floor, 4), [cfg.floor]);
  useEffect(() => () => doorTex.dispose(), [doorTex]);
  useEffect(() => () => headTex.dispose(), [headTex]);
  useEffect(() => () => floorTex.dispose(), [floorTex]);

  const n = cfg.night;
  const m = useMemo<LedState>(() => {
    const base = new THREE.Color(cfg.ledColor);
    const scale = Math.min(1, 0.38 + cfg.ledLevel * 0.55);
    const c = base.clone().multiplyScalar(scale);
    if (cfg.ledLevel > 1) c.lerp(new THREE.Color('#ffffff'), (cfg.ledLevel - 1) * 0.55);
    return {
      on: cfg.led,
      col: cfg.ledColor,
      glow: '#' + c.getHexString(),
      level: cfg.led ? cfg.ledLevel * (n ? 1.35 : 1.0) : 0,
    };
  }, [cfg.led, cfg.ledColor, cfg.ledLevel, n]);

  const pick: Pick = (z) => (e) => {
    if (e.delta > 6) return;
    e.stopPropagation();
    ctl.onPick(z);
  };

  const ceil = '#f1ede4';

  return (
    <>
      <color attach="background" args={[n ? '#070c16' : '#c6def2']} />
      <ambientLight intensity={n ? 0.13 : 0.36} />
      <hemisphereLight args={[n ? '#22304a' : '#fffdf8', '#4a3d33', n ? 0.12 : 0.28]} />
      <directionalLight position={[6, 4.5, -0.5]} color="#fff7ea" intensity={n ? 0.02 : 0.58} />

      {cfg.roomLight && (
        <>
          <pointLight position={[0, 2.82, -1.8]} color="#fff5e4" intensity={n ? 4.2 : 2.6} distance={10} decay={1.2} />
          <pointLight position={[0, 2.82, 1.2]} color="#fff5e4" intensity={n ? 3.2 : 2.0} distance={9} decay={1.2} />
        </>
      )}

      <LedLight p={[0, 2.85, -3.9]} m={m} power={2.2} dist={6} />
      <LedLight p={[0, 2.85, 2.5]} m={m} power={1.6} dist={5.5} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} onClick={pick('floor')}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial map={floorTex} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.5, -4.5]} onClick={pick('side')}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={cfg.side} roughness={0.78} />
      </mesh>
      <mesh position={[-4, 1.5, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={pick('side')}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={cfg.side} roughness={0.78} />
      </mesh>
      <mesh position={[4, 1.5, -0.5]} rotation={[0, -Math.PI / 2, 0]} onClick={pick('side')}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={cfg.side} roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.5, 3.5]} rotation={[0, Math.PI, 0]} onClick={pick('side')}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={cfg.side} roughness={0.78} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, -0.5]} onClick={pick('light')}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={ceil} roughness={0.85} />
      </mesh>

      {[
        [-1.65, -2.1],
        [1.65, -2.1],
        [-1.65, 0.9],
        [1.65, 0.9],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 2.985, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} onClick={pick('light')}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 18]} />
            <meshStandardMaterial color="#2b2724" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.008, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={pick('light')}>
            <circleGeometry args={[0.065, 16]} />
            {cfg.roomLight ? (
              <meshBasicMaterial color="#fff6e3" toneMapped={false} />
            ) : (
              <meshStandardMaterial color="#3c3733" roughness={0.7} />
            )}
          </mesh>
        </group>
      ))}

      <Led p={[0, 2.96, -4.22]} s={[7.6, 0.03, 0.05]} m={m} onClick={pick('light')} />
      <Led p={[0, 2.96, 3.12]} s={[7.6, 0.03, 0.05]} m={m} onClick={pick('light')} />
      <Led p={[-3.72, 2.96, -0.5]} s={[0.05, 0.03, 7.3]} m={m} onClick={pick('light')} />
      <Led p={[3.72, 2.96, -0.5]} s={[0.05, 0.03, 7.3]} m={m} onClick={pick('light')} />

      <mesh position={[3.99, 1.6, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4.4, 1.85]} />
        <meshBasicMaterial color={n ? '#0d192e' : '#cde6fb'} toneMapped={false} />
      </mesh>
      <Box p={[3.95, 1.6, -0.5]} s={[0.06, 1.92, 0.05]} c="#2b2622" />
      <Box p={[3.95, 1.6, -0.5]} s={[0.06, 0.05, 4.46]} c="#2b2622" />
      {cfg.mode !== 'furniture' && (
        <>
          <Box p={[3.9, 1.5, -2.9]} s={[0.14, 2.9, 0.85]} c="#d9cebd" />
          <Box p={[3.9, 1.5, 1.9]} s={[0.14, 2.9, 0.85]} c="#d9cebd" />
        </>
      )}

      <RoomsHome cfg={cfg} doorTex={doorTex} headTex={headTex} m={m} pick={pick} n={n} />
      <RoomsArchitectural cfg={cfg} doorTex={doorTex} headTex={headTex} m={m} pick={pick} n={n} />
    </>
  );
}

function Walker({ ctl, boxes, z0 }: { ctl: Ctl; boxes: [number, number, number, number][]; z0: number }) {
  const { camera, gl, size } = useThree();
  useEffect(() => {
    const c = camera as THREE.PerspectiveCamera;
    c.fov = size.width < size.height ? 76 : 60;
    c.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  const st = useRef({ yaw: 0, pitch: -0.03, vx: 0, vz: 0, intro: 0 });
  const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    camera.rotation.order = 'YXZ';
    const el = gl.domElement;
    el.style.cursor = 'grab';
    let d: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => {
      d = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const mv = (e: PointerEvent) => {
      if (!d) return;
      st.current.yaw -= (e.clientX - d.x) * 0.005;
      st.current.pitch = THREE.MathUtils.clamp(st.current.pitch - (e.clientY - d.y) * 0.004, -1.2, 1.2);
      d = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      d = null;
      el.style.cursor = 'grab';
    };
    const kd = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName !== 'INPUT') keys.current[e.code] = true;
    };
    const ku = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', mv);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    addEventListener('keydown', kd);
    addEventListener('keyup', ku);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', mv);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      removeEventListener('keydown', kd);
      removeEventListener('keyup', ku);
    };
  }, [camera, gl]);

  useFrame((_, dt0) => {
    const dt = Math.min(dt0, 0.05);
    const s = st.current;
    if (s.intro < 1) {
      s.intro = Math.min(1, s.intro + dt / 1.9);
      const e = 1 - Math.pow(1 - s.intro, 3);
      camera.position.set(0, THREE.MathUtils.lerp(2.3, 1.62, e), THREE.MathUtils.lerp(8.2, z0, e));
      camera.rotation.set(s.pitch, s.yaw, 0);
      return;
    }
    const k = keys.current;
    const j = ctl.move.current;
    let ix = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0) + j.x;
    let iz = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0) + j.y;
    const len = Math.hypot(ix, iz);
    if (len > 1) {
      ix /= len;
      iz /= len;
    }
    const sp = k.ShiftLeft || k.ShiftRight ? 4.2 : 2.3;
    const sin = Math.sin(s.yaw);
    const cos = Math.cos(s.yaw);
    const a = 1 - Math.exp(-9 * dt);
    s.vx += (ix * cos - iz * sin) * sp * a - s.vx * a;
    s.vz += (-ix * sin - iz * cos) * sp * a - s.vz * a;
    const r = 0.28;
    const p = camera.position;
    const nx = p.x + s.vx * dt;
    const nz = p.z + s.vz * dt;
    const hit = (x: number, z: number) =>
      x < -3.65 ||
      x > 3.65 ||
      z < -4.18 ||
      z > 3.15 ||
      boxes.some(([cx, cz, hw, hd]) => Math.abs(x - cx) < hw + r && Math.abs(z - cz) < hd + r);
    if (!hit(nx, p.z)) p.x = nx;
    else s.vx = 0;
    if (!hit(p.x, nz)) p.z = nz;
    else s.vz = 0;
    p.y = 1.62;
    camera.rotation.set(s.pitch, s.yaw, 0);
  });
  return null;
}

const BASE_BOXES: Record<Mode, [number, number, number, number][]> = {
  closets: [[0, -4.15, 3.5, 0.45], [0, -1.85, 0.85, 0.35]],
  bedroom: [[-2.35, -4.12, 1.15, 0.45], [0.45, -3.32, 1.12, 1.12], [2.85, -3.65, 0.65, 0.5]],
  walkin: [[0, -4.15, 3.5, 0.45], [-3.65, -1.1, 0.4, 1.75], [3.65, -1.5, 0.4, 1.2], [0, -1.55, 1.15, 0.55], [-2.1, -1.55, 0.38, 0.38]],
  tv: [[0, -4.2, 3.5, 0.4], [0, -1.15, 1.55, 0.55], [0, -2.45, 0.62, 0.55]],
  display: [[0, -4.2, 3.1, 0.42], [-2.1, -1.65, 0.52, 0.52], [-1.2, -1.65, 0.32, 0.32]],
  coffee: [[0, -4.18, 2.2, 0.45], [-0.35, -2.55, 0.85, 0.45]],
  entry: [[0, -4.2, 3.5, 0.45]],
  laundry: [[0, -4.15, 2.7, 0.48]],
  vanity: [[0, -4.15, 2.7, 0.45]],
  storage: [[0, -4.18, 3.5, 0.45], [-3.62, -1.0, 0.4, 1.75], [3.62, -1.0, 0.4, 1.75], [0, -1.55, 0.98, 0.52]],
  cladding: [[0, -4.3, 3.5, 0.35], [0.25, -1.2, 1.5, 0.55], [0.25, -2.45, 0.58, 0.52]],
  furniture: [[0, -4.18, 2.3, 0.4], [-0.35, -1.45, 1.6, 0.58], [-2.15, -2.35, 0.55, 1.12], [1.95, -2.45, 0.55, 0.55], [0.1, -2.55, 0.72, 0.45]],
  wpc: [[-3.38, -3.65, 0.65, 0.2], [-1.28, -3.65, 0.52, 0.2], [1.28, -3.65, 0.52, 0.2], [3.38, -3.65, 0.65, 0.2]],
  renovation: [[0, -4.18, 3.4, 0.4], [0, -1.55, 1.25, 0.52]],
  kitchens: [[0, -4.12, 3.5, 0.48], [0.35, -1.65, 1.35, 0.58], [0.35, -0.82, 0.95, 0.25]],
  commercial: [[-0.45, -4.18, 2.5, 0.42], [-0.65, -2.15, 1.65, 0.48], [2.25, -1.7, 0.75, 1.2]],
  pocket: [[-2.45, -2.25, 1.4, 0.22], [2.45, -2.25, 1.4, 0.22], [0, -4.16, 1.3, 0.4]],
};

const START_Z: Record<Mode, number> = {
  closets: 2.3,
  bedroom: 2.4,
  walkin: 2.5,
  tv: 1.9,
  display: 2.1,
  coffee: 1.3,
  entry: 1.7,
  laundry: 1.4,
  vanity: 1.3,
  storage: 2.3,
  cladding: 2.0,
  furniture: 2.2,
  wpc: 1.7,
  renovation: 2.1,
  kitchens: 2.4,
  commercial: 2.2,
  pocket: 1.8,
};

export default function Scene({ cfg, ctl }: { cfg: Cfg; ctl: Ctl }) {
  useEffect(() => {
    const t = [60, 350, 1200].map((ms) => setTimeout(() => window.dispatchEvent(new Event('resize')), ms));
    return () => t.forEach(clearTimeout);
  }, [cfg.mode]);

  const boxes = useMemo(() => {
    const base = BASE_BOXES[cfg.mode];
    if (cfg.mode === 'pocket' && !cfg.open) return [...base, [0, -2.25, 1.1, 0.18] as [number, number, number, number]];
    if (cfg.mode === 'wpc' && !cfg.open) return [...base, [0, -3.65, 3.6, 0.18] as [number, number, number, number]];
    return base;
  }, [cfg.mode, cfg.open]);

  return (
    <Canvas
      key={cfg.mode}
      dpr={[1, 1.5]}
      camera={{ fov: 60, near: 0.1, far: 40, position: [0, 2.3, 8.2] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'none' }}
      aria-label="استوديو ثلاثي الأبعاد: تجوّل داخل الغرفة"
    >
      <Room cfg={cfg} ctl={ctl} />
      <Walker ctl={ctl} boxes={boxes} z0={START_Z[cfg.mode]} />
    </Canvas>
  );
}
