'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Box, CLOTH, Door, DrawerBank, Led, LedLight, TexBox, Wardrobe, type Cfg, type LedState, type Pick } from './primitives';

function Curtains({ open, color, pick }: { open: boolean; color: string; pick: Pick }) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += ((open ? 1 : 0) - t.current) * Math.min(1, dt * 4.5);
    if (leftRef.current) {
      leftRef.current.position.z = -0.5 - 1.15 - t.current * 0.95;
      leftRef.current.scale.z = 1 - t.current * 0.52;
    }
    if (rightRef.current) {
      rightRef.current.position.z = -0.5 + 1.15 + t.current * 0.95;
      rightRef.current.scale.z = 1 - t.current * 0.52;
    }
  });
  return (
    <group>
      <Box p={[3.86, 2.9, -0.5]} s={[0.08, 0.05, 4.8]} c="#26201c" />
      <group ref={leftRef} position={[3.84, 1.45, -1.65]}>
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} p={[(i % 2) * 0.03, 0, -0.95 + i * 0.38]} s={[0.12, 2.85, 0.34]} c={color} onClick={pick('doors')} />
        ))}
      </group>
      <group ref={rightRef} position={[3.84, 1.45, 0.65]}>
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} p={[(i % 2) * 0.03, 0, -0.95 + i * 0.38]} s={[0.12, 2.85, 0.34]} c={color} onClick={pick('doors')} />
        ))}
      </group>
    </group>
  );
}

export function RoomsArchitectural({
  cfg,
  doorTex,
  headTex,
  m,
  pick,
  n,
}: {
  cfg: Cfg;
  doorTex: THREE.Texture;
  headTex: THREE.Texture;
  m: LedState;
  pick: Pick;
  n: boolean;
}) {
  const mode = cfg.mode;
  const hw = cfg.handle === 'gold' ? '#d4af5a' : '#1b1d20';

  return (
    <>
      {mode === 'storage' && (
        <>
          <group position={[-2.2, 0, -4.18]}>
            <Wardrobe n={2} bw={1.05} h={2.72} d={0.56} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <group position={[0, 0, -4.2]}>
            <Wardrobe n={2} bw={1.1} h={2.72} d={0.52} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" noDoors />
          </group>
          <group position={[2.2, 0, -4.18]}>
            <Wardrobe n={2} bw={1.05} h={2.72} d={0.56} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>

          <group position={[-3.62, 0, -1.0]} rotation={[0, Math.PI / 2, 0]}>
            <Wardrobe n={3} bw={1.1} h={2.72} d={0.5} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" noDoors />
          </group>
          <group position={[3.62, 0, -1.0]} rotation={[0, -Math.PI / 2, 0]}>
            <Wardrobe n={3} bw={1.1} h={2.72} d={0.5} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" noDoors />
          </group>

          <group position={[0, 0, -1.55]}>
            <DrawerBank w={1.75} h={0.86} d={0.86} rows={3} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.89, 0]} s={[1.82, 0.045, 0.92]} tex={headTex} onClick={pick('bed')} />
            <Led p={[0, 0.04, 0.44]} s={[1.68, 0.02, 0.025]} m={m} onClick={pick('light')} />
          </group>

          <LedLight p={[0, 2.1, -3.6]} m={m} power={3.8} dist={5} />
          <LedLight p={[-2.9, 1.9, -1.0]} m={m} power={2.8} dist={4} />
          <LedLight p={[2.9, 1.9, -1.0]} m={m} power={2.8} dist={4} />
        </>
      )}

      {mode === 'cladding' && (
        <>
          <Box p={[-2.45, 1.35, -4.95]} s={[1.4, 2.7, 0.05]} c="#e8dfd1" />
          <LedLight p={[-2.45, 2.1, -4.7]} m={m} power={2.6} dist={3.2} />

          <TexBox p={[0.35, 1.5, -4.43]} s={[2.75, 2.85, 0.06]} tex={headTex} onClick={pick('bed')} />
          <Led p={[-1.04, 1.5, -4.38]} s={[0.028, 2.82, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[1.74, 1.5, -4.38]} s={[0.028, 2.82, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[0.35, 2.88, -4.38]} s={[2.8, 0.028, 0.03]} m={m} onClick={pick('light')} />

          {cfg.style === 'glass' ? (
            <>
              {[-3.3, 2.35, 3.25].map((x) => (
                <group key={x}>
                  <TexBox p={[x, 1.5, -4.43]} s={[0.84, 2.85, 0.04]} tex={doorTex} onClick={pick('doors')} />
                  <Box p={[x, 1.5, -4.39]} s={[0.74, 2.72, 0.02]} c="#7d8f8e" metal={0.75} rough={0.06} onClick={pick('doors')} />
                </group>
              ))}
            </>
          ) : cfg.style === 'flat' ? (
            <>
              {[-3.35, 2.25, 3.15].map((x) => (
                <TexBox key={x} p={[x, 1.5, -4.41]} s={[0.84, 2.85, 0.06]} tex={doorTex} onClick={pick('doors')} />
              ))}
            </>
          ) : (
            <>
              {[-3.65, -3.47, -3.29, -3.11, -1.72, -1.54, -1.36, -1.18, 1.92, 2.1, 2.28, 2.46, 2.64, 2.82, 3.0, 3.18, 3.36, 3.54].map((x) => (
                <TexBox key={x} p={[x, 1.5, -4.4]} s={[0.1, 2.85, 0.07]} tex={doorTex} onClick={pick('doors')} />
              ))}
            </>
          )}

          <group position={[-2.42, 0, -4.42]}>
            <TexBox p={[0, 2.68, 0.02]} s={[1.08, 0.34, 0.06]} tex={doorTex} onClick={pick('doors')} />
            <Door i={0} n={1} bw={1.06} h={2.5} d={0.06} cfg={cfg} tex={doorTex} pick={pick} forceKind="hinged" />
          </group>

          <group position={[0.35, 0.25, -4.16]}>
            <DrawerBank w={2.6} h={0.42} d={0.44} rows={1} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.44, 0]} s={[2.66, 0.035, 0.48]} tex={headTex} onClick={pick('bed')} />
          </group>
          <Led p={[0.35, 0.23, -3.96]} s={[2.5, 0.022, 0.025]} m={m} onClick={pick('light')} />
          <LedLight p={[0.35, 1.7, -3.7]} m={m} power={4.0} dist={5} />

          <Box p={[0.25, 0.24, -1.2]} s={[2.8, 0.42, 0.95]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[0.25, 0.65, -0.76]} s={[2.8, 0.5, 0.18]} c={cfg.bed} onClick={pick('bed')} />
          <mesh position={[0.25, 0.2, -2.45]} onClick={pick('bed')}>
            <cylinderGeometry args={[0.52, 0.52, 0.34, 26]} />
            <meshStandardMaterial map={headTex} roughness={0.4} />
          </mesh>
          <Box p={[0.2, 0.012, -2.0]} s={[4.2, 0.02, 3.0]} c="#cdc3b1" />
        </>
      )}

      {mode === 'furniture' && (
        <>
          <Curtains open={cfg.open} color={cfg.bed} pick={pick} />

          <group position={[0, 0, -4.18]}>
            <Wardrobe n={4} bw={1.08} h={0.86} d={0.46} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <TexBox p={[0, 0.89, -4.16]} s={[4.38, 0.04, 0.5]} tex={headTex} onClick={pick('bed')} />
          <Box p={[0, 1.85, -4.44]} s={[1.7, 1.15, 0.04]} c="#dfd6c5" />
          <TexBox p={[0, 1.85, -4.46]} s={[1.82, 1.26, 0.03]} tex={doorTex} />
          <Led p={[0, 2.52, -4.4]} s={[1.82, 0.022, 0.025]} m={m} onClick={pick('light')} />
          <LedLight p={[0, 1.9, -3.7]} m={m} power={3.4} dist={4.5} />

          <TexBox p={[-0.35, 0.08, -1.45]} s={[3.05, 0.1, 1.0]} tex={doorTex} />
          <Box p={[-0.35, 0.28, -1.45]} s={[2.98, 0.34, 0.94]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[-0.35, 0.66, -1.04]} s={[2.98, 0.5, 0.2]} c={cfg.bed} onClick={pick('bed')} />
          {[-1.1, -0.35, 0.4].map((x, k) => (
            <Box key={x} p={[x, 0.54, -1.24]} s={[0.42, 0.34, 0.14]} c={k === 1 ? '#e8dfd1' : '#c9a77a'} />
          ))}

          <TexBox p={[-2.15, 0.08, -2.35]} s={[0.98, 0.1, 2.1]} tex={doorTex} />
          <Box p={[-2.15, 0.28, -2.35]} s={[0.92, 0.34, 2.04]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[-2.54, 0.66, -2.35]} s={[0.2, 0.5, 2.04]} c={cfg.bed} onClick={pick('bed')} />

          <group position={[1.95, 0, -2.45]} rotation={[0, -0.45, 0]}>
            <TexBox p={[0, 0.08, 0]} s={[0.88, 0.1, 0.86]} tex={doorTex} />
            <Box p={[0, 0.28, 0]} s={[0.84, 0.34, 0.82]} c={cfg.bed} onClick={pick('bed')} />
            <Box p={[0, 0.62, -0.34]} s={[0.84, 0.46, 0.18]} c={cfg.bed} onClick={pick('bed')} />
          </group>

          <TexBox p={[0.1, 0.18, -2.55]} s={[1.3, 0.32, 0.76]} tex={doorTex} onClick={pick('doors')} />
          <TexBox p={[0.1, 0.36, -2.55]} s={[1.36, 0.045, 0.82]} tex={headTex} onClick={pick('bed')} />
          <Led p={[0.1, 0.04, -2.55]} s={[1.2, 0.018, 0.68]} m={m} onClick={pick('light')} />
          <Box p={[-0.1, 0.012, -2.15]} s={[4.8, 0.02, 3.2]} c="#cfc6b4" />
        </>
      )}

      {mode === 'wpc' && (
        <>
          <Box p={[0, 1.5, -4.46]} s={[7.8, 3.0, 0.05]} c="#e9e1d3" />
          {[-2.35, 0, 2.35].map((x) => (
            <LedLight key={x} p={[x, 2.1, -4.1]} m={m} power={2.8} dist={3.6} />
          ))}

          <Box p={[-3.38, 1.5, -3.65]} s={[1.24, 3.0, 0.18]} c={cfg.side} onClick={pick('side')} />
          <Box p={[-1.28, 1.5, -3.65]} s={[1.0, 3.0, 0.18]} c={cfg.side} onClick={pick('side')} />
          <Box p={[1.28, 1.5, -3.65]} s={[1.0, 3.0, 0.18]} c={cfg.side} onClick={pick('side')} />
          <Box p={[3.38, 1.5, -3.65]} s={[1.24, 3.0, 0.18]} c={cfg.side} onClick={pick('side')} />
          <Box p={[0, 2.75, -3.65]} s={[7.8, 0.5, 0.18]} c={cfg.side} onClick={pick('side')} />

          <group position={[-2.28, 0, -3.65]}>
            <TexBox p={[-0.52, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0.52, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0, 2.52, 0]} s={[1.14, 0.09, 0.22]} tex={headTex} onClick={pick('bed')} />
            <Door i={0} n={1} bw={0.96} h={2.48} d={0.14} cfg={cfg} tex={doorTex} pick={pick} forceKind="hinged" />
            <Led p={[0, 2.59, 0.11]} s={[1.1, 0.022, 0.025]} m={m} onClick={pick('light')} />
          </group>

          <group position={[0, 0, -3.65]}>
            <TexBox p={[-0.82, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0.82, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0, 2.52, 0]} s={[1.74, 0.09, 0.22]} tex={headTex} onClick={pick('bed')} />
            <Door i={0} n={2} bw={0.78} h={2.48} d={0.14} cfg={cfg} tex={doorTex} pick={pick} forceKind="hinged" />
            <Door i={1} n={2} bw={0.78} h={2.48} d={0.14} cfg={cfg} tex={doorTex} pick={pick} forceKind="hinged" />
            <Led p={[0, 2.59, 0.11]} s={[1.7, 0.022, 0.025]} m={m} onClick={pick('light')} />
          </group>

          <group position={[2.28, 0, -3.65]}>
            <TexBox p={[-0.52, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0.52, 1.25, 0]} s={[0.09, 2.52, 0.22]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[0, 2.52, 0]} s={[1.14, 0.09, 0.22]} tex={headTex} onClick={pick('bed')} />
            <Box p={[0, 2.34, 0]} s={[0.94, 0.28, 0.04]} c="#b8c9c7" rough={0.18} />
            <Door i={1} n={1} bw={0.96} h={2.18} d={0.14} cfg={cfg} tex={doorTex} pick={pick} forceKind="hinged" />
            <Led p={[0, 2.59, 0.11]} s={[1.1, 0.022, 0.025]} m={m} onClick={pick('light')} />
          </group>

          <Box p={[-3.38, 0.07, -3.55]} s={[1.24, 0.14, 0.03]} c="#2d241f" />
          <Box p={[3.38, 0.07, -3.55]} s={[1.24, 0.14, 0.03]} c="#2d241f" />
          <Box p={[0, 0.012, -1.55]} s={[2.4, 0.02, 3.4]} c="#cdc3b1" />
        </>
      )}

      {mode === 'renovation' && (
        <>
          <Box p={[0, 2.88, -0.5]} s={[7.4, 0.16, 7.4]} c="#ebe5d9" onClick={pick('light')} />
          <Box p={[0, 2.78, -0.5]} s={[5.2, 0.08, 5.2]} c="#f5f1e8" onClick={pick('light')} />
          <Led p={[0, 2.74, -3.08]} s={[5.15, 0.025, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[0, 2.74, 2.08]} s={[5.15, 0.025, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[-2.58, 2.74, -0.5]} s={[0.03, 0.025, 5.15]} m={m} onClick={pick('light')} />
          <Led p={[2.58, 2.74, -0.5]} s={[0.03, 0.025, 5.15]} m={m} onClick={pick('light')} />

          <mesh position={[0, 2.35, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.028, 12, 36]} />
            <meshStandardMaterial color="#ffe4b8" emissive="#ffc872" emissiveIntensity={n || m.on ? 2.2 : 0.5} />
          </mesh>

          {[-2.45, 2.45].map((x) => (
            <group key={x} position={[x, 1.48, -4.43]}>
              {cfg.style === 'grooved' ? (
                [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((dx) => (
                  <TexBox key={dx} p={[dx, 0, 0.02]} s={[0.09, 2.4, 0.05]} tex={doorTex} onClick={pick('doors')} />
                ))
              ) : cfg.style === 'glass' ? (
                <Box p={[0, 0, 0.02]} s={[1.45, 2.35, 0.03]} c="#9cb0ae" metal={0.7} rough={0.07} onClick={pick('doors')} />
              ) : (
                <>
                  <Box p={[-0.72, 0, 0.02]} s={[0.04, 2.3, 0.03]} c="#d5ccb9" />
                  <Box p={[0.72, 0, 0.02]} s={[0.04, 2.3, 0.03]} c="#d5ccb9" />
                  <Box p={[0, 1.13, 0.02]} s={[1.48, 0.04, 0.03]} c="#d5ccb9" />
                  <Box p={[0, -1.13, 0.02]} s={[1.48, 0.04, 0.03]} c="#d5ccb9" />
                </>
              )}
            </group>
          ))}

          <TexBox p={[0, 1.58, -4.43]} s={[2.55, 2.58, 0.06]} tex={headTex} onClick={pick('bed')} />
          <Led p={[-1.28, 1.58, -4.38]} s={[0.026, 2.55, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[1.28, 1.58, -4.38]} s={[0.026, 2.55, 0.03]} m={m} onClick={pick('light')} />
          <group position={[0, 0, -4.16]}>
            <Wardrobe n={3} bw={0.84} h={0.84} d={0.48} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
            <TexBox p={[0, 0.87, 0]} s={[2.56, 0.04, 0.52]} tex={headTex} onClick={pick('bed')} />
          </group>
          <LedLight p={[0, 1.85, -3.65]} m={m} power={3.8} dist={5} />

          <TexBox p={[0, 0.16, -1.75]} s={[1.85, 0.28, 0.62]} tex={doorTex} onClick={pick('doors')} />
          <Box p={[0, 0.35, -1.75]} s={[1.8, 0.1, 0.58]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[0, 0.012, -2.0]} s={[4.0, 0.02, 2.8]} c="#cfc6b4" />
        </>
      )}

      {mode === 'kitchens' && (
        <>
          <group position={[-2.95, 0, -4.12]}>
            <Box p={[0, 1.28, 0]} s={[1.02, 2.56, 0.68]} c="#434850" metal={0.25} rough={0.35} />
            <Box p={[-0.25, 1.32, 0.35]} s={[0.48, 2.42, 0.03]} c="#525862" metal={0.28} rough={0.3} />
            <Box p={[0.25, 1.32, 0.35]} s={[0.48, 2.42, 0.03]} c="#525862" metal={0.28} rough={0.3} />
            <Box p={[-0.05, 1.32, 0.38]} s={[0.022, 1.15, 0.03]} c={hw} metal={0.7} rough={0.25} />
            <Box p={[0.05, 1.32, 0.38]} s={[0.022, 1.15, 0.03]} c={hw} metal={0.7} rough={0.25} />
          </group>

          <group position={[-1.92, 0, -4.12]}>
            <Wardrobe n={1} bw={0.96} h={2.56} d={0.64} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
            <Box p={[0, 1.15, 0.335]} s={[0.84, 0.58, 0.03]} c="#2b2f35" metal={0.25} rough={0.25} />
            <Box p={[0, 1.12, 0.352]} s={[0.68, 0.36, 0.01]} c="#4d3b2c" />
            <Box p={[0, 1.36, 0.355]} s={[0.68, 0.022, 0.025]} c={hw} metal={0.7} />
            <Box p={[0, 1.72, 0.335]} s={[0.84, 0.4, 0.03]} c="#2b2f35" metal={0.25} rough={0.25} />
            <Box p={[0, 1.7, 0.352]} s={[0.64, 0.24, 0.01]} c="#3d352e" />
          </group>

          <group position={[0.76, 0, -4.12]}>
            <Wardrobe n={4} bw={1.08} h={0.88} d={0.64} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <TexBox p={[0.76, 0.91, -4.1]} s={[4.38, 0.05, 0.68]} tex={headTex} onClick={pick('bed')} />
          <TexBox p={[0.76, 1.34, -4.44]} s={[4.38, 0.82, 0.03]} tex={headTex} onClick={pick('bed')} />

          <Box p={[0.15, 0.945, -4.08]} s={[0.86, 0.02, 0.5]} c="#23272d" metal={0.2} rough={0.2} />
          {[
            [-0.05, -4.18],
            [0.35, -4.18],
            [-0.05, -3.96],
            [0.35, -3.96],
          ].map(([bx, bz], k) => (
            <mesh key={k} position={[bx, 0.958, bz]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, 0.08, 20]} />
              <meshBasicMaterial color="#d96b43" />
            </mesh>
          ))}
          <Box p={[0.15, 1.88, -4.12]} s={[0.92, 0.08, 0.48]} c="#484e56" metal={0.28} rough={0.3} />
          <Box p={[0.15, 2.28, -4.22]} s={[0.32, 0.75, 0.28]} c="#484e56" metal={0.28} rough={0.3} />

          <Box p={[1.85, 0.945, -4.08]} s={[0.78, 0.025, 0.46]} c="#adb4ba" metal={0.7} rough={0.22} />
          <Box p={[1.85, 1.12, -4.3]} s={[0.038, 0.32, 0.038]} c={hw} metal={0.8} />

          <group position={[-0.86, 1.74, -4.26]}>
            <Wardrobe n={1} bw={1.08} h={0.82} d={0.38} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
          </group>
          <group position={[1.84, 1.74, -4.26]}>
            <Wardrobe n={2} bw={1.08} h={0.82} d={0.38} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
          </group>
          <Led p={[0.76, 1.72, -4.12]} s={[4.3, 0.022, 0.025]} m={m} onClick={pick('light')} />
          <LedLight p={[0.15, 1.48, -3.75]} m={m} power={3.6} dist={4.4} />
          <LedLight p={[1.85, 1.48, -3.75]} m={m} power={3.6} dist={4.4} />

          <group position={[0.35, 0, -1.65]}>
            <DrawerBank w={2.4} h={0.88} d={0.94} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.91, 0]} s={[2.52, 0.055, 1.04]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[-1.23, 0.45, 0]} s={[0.055, 0.9, 1.04]} tex={headTex} onClick={pick('bed')} />
            <TexBox p={[1.23, 0.45, 0]} s={[0.055, 0.9, 1.04]} tex={headTex} onClick={pick('bed')} />
            <Led p={[0, 0.04, 0.48]} s={[2.35, 0.02, 0.025]} m={m} onClick={pick('light')} />
            <LedLight p={[0, 0.4, -0.95]} m={m} power={2.2} dist={3.2} />
          </group>

          {[-0.4, 0.35, 1.1].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.64, -0.82]} onClick={pick('bed')}>
                <cylinderGeometry args={[0.19, 0.19, 0.06, 20]} />
                <meshStandardMaterial color={cfg.bed} roughness={0.65} />
              </mesh>
              <mesh position={[x, 0.32, -0.82]}>
                <cylinderGeometry args={[0.025, 0.025, 0.64, 8]} />
                <meshStandardMaterial color="#232528" metalness={0.7} />
              </mesh>
            </group>
          ))}
        </>
      )}

      {mode === 'commercial' && (
        <>
          <TexBox p={[-0.45, 1.65, -4.45]} s={[4.9, 2.2, 0.04]} tex={headTex} onClick={pick('bed')} />
          <group position={[-0.45, 0, -4.18]}>
            <Wardrobe n={4} bw={1.18} h={0.88} d={0.48} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <TexBox p={[-0.45, 0.91, -4.16]} s={[4.8, 0.045, 0.52]} tex={headTex} onClick={pick('bed')} />

          {[1.45, 1.98, 2.5].map((y, rIdx) => (
            <group key={y}>
              <TexBox p={[-0.45, y, -4.24]} s={[4.75, 0.032, 0.36]} tex={doorTex} onClick={pick('doors')} />
              <Led p={[-0.45, y - 0.02, -4.08]} s={[4.68, 0.018, 0.02]} m={m} onClick={pick('light')} />
              {rIdx < 2 &&
                Array.from({ length: 8 }, (_, k) => (
                  <mesh key={k} position={[-2.35 + k * 0.54, y - 0.36, -4.22]}>
                    <cylinderGeometry args={[0.065, 0.055, 0.22, 14]} />
                    <meshStandardMaterial color={k % 2 ? '#d4af5a' : '#e9e0d1'} metalness={k % 2 ? 0.65 : 0.1} roughness={0.3} />
                  </mesh>
                ))}
            </group>
          ))}

          <group position={[-0.65, 0, -2.15]}>
            <TexBox p={[0, 0.54, 0]} s={[3.1, 1.06, 0.72]} tex={doorTex} onClick={pick('doors')} />
            {Array.from({ length: 15 }, (_, i) => (
              <TexBox key={i} p={[-1.4 + i * 0.2, 0.54, 0.37]} s={[0.08, 1.02, 0.03]} tex={doorTex} onClick={pick('doors')} />
            ))}
            <TexBox p={[0, 1.1, 0]} s={[3.2, 0.06, 0.8]} tex={headTex} onClick={pick('bed')} />
            <Led p={[0, 0.05, 0.39]} s={[3.05, 0.024, 0.025]} m={m} onClick={pick('light')} />

            <Box p={[-0.98, 1.3, 0]} s={[0.56, 0.36, 0.38]} c="#c8c0b4" metal={0.28} rough={0.3} />
            <Box p={[-0.98, 1.49, 0]} s={[0.58, 0.035, 0.4]} c="#d4af5a" metal={0.6} rough={0.25} />
            <Box p={[-0.98, 1.26, 0.21]} s={[0.36, 0.04, 0.08]} c="#3a332e" />

            <Box p={[-0.1, 1.18, 0.04]} s={[0.12, 0.14, 0.12]} c="#44403c" />
            <Box p={[-0.1, 1.32, 0.06]} s={[0.36, 0.24, 0.03]} c="#2d3035" />
            <Box p={[-0.1, 1.32, 0.078]} s={[0.31, 0.19, 0.005]} c="#f3e9d6" />

            <Box p={[0.92, 1.15, 0.02]} s={[0.96, 0.04, 0.52]} c="#36302b" />
            <Box p={[0.92, 1.35, 0.02]} s={[0.88, 0.02, 0.44]} c="#e6dfd3" />
            {[-0.24, 0, 0.24].map((dx) => (
              <Box key={dx} p={[0.92 + dx, 1.41, 0.02]} s={[0.14, 0.08, 0.14]} c="#d9a566" />
            ))}
            <mesh position={[0.92, 1.36, 0.02]}>
              <boxGeometry args={[0.95, 0.42, 0.5]} />
              <meshStandardMaterial color="#cfe2e6" transparent opacity={0.32} roughness={0.08} />
            </mesh>
            <Led p={[0.92, 1.56, 0.02]} s={[0.92, 0.02, 0.025]} m={m} onClick={pick('light')} />
          </group>

          <LedLight p={[-0.45, 1.9, -3.65]} m={m} power={3.8} dist={5} />
          <LedLight p={[-0.65, 0.5, -1.45]} m={m} power={2.4} dist={3.4} />

          {[[-2.4], [-0.95]].map(([z], k) => (
            <group key={k} position={[2.25, 0, z]}>
              <mesh position={[0, 0.74, 0]} onClick={pick('bed')}>
                <cylinderGeometry args={[0.42, 0.42, 0.04, 24]} />
                <meshStandardMaterial map={headTex} roughness={0.35} />
              </mesh>
              <mesh position={[0, 0.37, 0]}>
                <cylinderGeometry args={[0.032, 0.032, 0.74, 10]} />
                <meshStandardMaterial color="#2b2623" metalness={0.4} />
              </mesh>
              {[-0.65, 0.65].map((cx, ci) => (
                <group key={cx} position={[cx, 0, 0]} rotation={[0, ci === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
                  <Box p={[0, 0.44, 0]} s={[0.46, 0.07, 0.46]} c={cfg.bed} onClick={pick('bed')} />
                  <Box p={[0, 0.68, -0.2]} s={[0.46, 0.42, 0.08]} c={cfg.bed} onClick={pick('bed')} />
                  {[
                    [-0.18, -0.18],
                    [0.18, -0.18],
                    [-0.18, 0.18],
                    [0.18, 0.18],
                  ].map(([lx, lz], li) => (
                    <Box key={li} p={[lx, 0.21, lz]} s={[0.035, 0.42, 0.035]} c="#3b2f28" />
                  ))}
                </group>
              ))}
            </group>
          ))}
        </>
      )}

      {mode === 'pocket' && (
        <>
          <Box p={[-2.45, 1.5, -2.14]} s={[2.8, 3.0, 0.08]} c={cfg.side} onClick={pick('side')} />
          <Box p={[-2.45, 1.5, -2.36]} s={[2.8, 3.0, 0.08]} c={cfg.side} onClick={pick('side')} />
          <Box p={[2.45, 1.5, -2.14]} s={[2.8, 3.0, 0.08]} c={cfg.side} onClick={pick('side')} />
          <Box p={[2.45, 1.5, -2.36]} s={[2.8, 3.0, 0.08]} c={cfg.side} onClick={pick('side')} />
          <Box p={[0, 2.75, -2.25]} s={[2.3, 0.5, 0.3]} c={cfg.side} onClick={pick('side')} />

          <TexBox p={[-1.08, 1.25, -2.11]} s={[0.08, 2.52, 0.06]} tex={headTex} onClick={pick('bed')} />
          <TexBox p={[1.08, 1.25, -2.11]} s={[0.08, 2.52, 0.06]} tex={headTex} onClick={pick('bed')} />
          <TexBox p={[0, 2.52, -2.25]} s={[2.24, 0.06, 0.32]} tex={headTex} onClick={pick('bed')} />
          <Led p={[0, 2.48, -2.09]} s={[2.12, 0.022, 0.025]} m={m} onClick={pick('light')} />

          <group position={[0, 0, -2.25]}>
            <Door i={0} n={2} bw={1.06} h={2.48} d={0.04} cfg={cfg} tex={doorTex} pick={pick} forceKind="sliding" slideFactor={0.96} pocketDir={-1} />
            <Door i={1} n={2} bw={1.06} h={2.48} d={0.04} cfg={cfg} tex={doorTex} pick={pick} forceKind="sliding" slideFactor={0.96} pocketDir={1} />
          </group>

          <TexBox p={[0, 1.52, -4.43]} s={[3.2, 2.68, 0.05]} tex={headTex} onClick={pick('bed')} />
          <Led p={[-1.6, 1.52, -4.38]} s={[0.025, 2.65, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[1.6, 1.52, -4.38]} s={[0.025, 2.65, 0.03]} m={m} onClick={pick('light')} />
          <group position={[0, 0, -4.16]}>
            <DrawerBank w={2.3} h={0.78} d={0.48} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.81, 0]} s={[2.36, 0.04, 0.52]} tex={headTex} onClick={pick('bed')} />
          </group>
          <LedLight p={[0, 2.0, -3.5]} m={m} power={4.2} dist={5} />
          <LedLight p={[0, 2.1, -1.7]} m={m} power={2.8} dist={4} />
          <Box p={[0, 0.012, -3.3]} s={[3.0, 0.02, 1.6]} c="#cdc3b1" />
        </>
      )}
    </>
  );
}
