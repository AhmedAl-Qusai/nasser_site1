'use client';
import * as THREE from 'three';
import { Box, CLOTH, DrawerBank, Led, LedLight, TexBox, Wardrobe, type Cfg, type LedState, type Pick } from './primitives';

export function RoomsHome({
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
      {mode === 'closets' && (
        <>
          <group position={[0, 0, -4.15]}>
            <Wardrobe n={6} bw={1.15} h={2.72} d={0.62} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>
          <Led p={[0, 2.75, -3.82]} s={[6.85, 0.025, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[0, 0.04, -3.83]} s={[6.8, 0.02, 0.025]} m={m} onClick={pick('light')} />
          <LedLight p={[-2.1, 1.9, -3.55]} m={m} power={3.4} dist={4.5} />
          <LedLight p={[0, 1.9, -3.55]} m={m} power={3.6} dist={4.5} />
          <LedLight p={[2.1, 1.9, -3.55]} m={m} power={3.4} dist={4.5} />
          <TexBox p={[0, 0.2, -1.85]} s={[1.55, 0.36, 0.52]} tex={doorTex} onClick={pick('doors')} />
          <Box p={[0, 0.42, -1.85]} s={[1.5, 0.09, 0.48]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[0, 0.012, -2.1]} s={[4.2, 0.02, 2.8]} c="#cdc3b1" />
          <Box p={[-3.95, 1.35, -1.3]} s={[0.04, 2.2, 0.95]} c="#cfdadb" metal={0.55} rough={0.08} />
          <Led p={[-3.96, 1.35, -1.3]} s={[0.02, 2.28, 1.03]} m={m} onClick={pick('light')} />
        </>
      )}

      {mode === 'bedroom' && (
        <>
          <group position={[-2.35, 0, -4.12]}>
            <Wardrobe n={2} bw={1.05} h={2.72} d={0.62} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>
          <LedLight p={[-2.35, 1.9, -3.5]} m={m} power={3.2} dist={4.2} />

          <TexBox p={[0.45, 1.45, -4.43]} s={[3.3, 2.75, 0.06]} tex={headTex} onClick={pick('bed')} />
          {[-1.05, -0.88, -0.71, -0.54, -0.37, -0.2].map((dx) => (
            <TexBox key={dx} p={[0.45 + dx, 1.45, -4.38]} s={[0.09, 2.75, 0.05]} tex={doorTex} onClick={pick('doors')} />
          ))}
          <Led p={[0.45, 2.82, -4.37]} s={[3.28, 0.025, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[-1.18, 1.45, -4.37]} s={[0.025, 2.72, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[2.08, 1.45, -4.37]} s={[0.025, 2.72, 0.03]} m={m} onClick={pick('light')} />
          <LedLight p={[0.45, 1.8, -3.9]} m={m} power={3.8} dist={4.8} />

          <Box p={[0.45, 0.92, -4.32]} s={[2.18, 1.15, 0.12]} c={cfg.bed} onClick={pick('bed')} />
          <TexBox p={[0.45, 0.26, -3.32]} s={[2.12, 0.28, 2.15]} tex={doorTex} onClick={pick('doors')} />
          <Led p={[0.45, 0.09, -2.26]} s={[2.0, 0.02, 0.025]} m={m} onClick={pick('light')} />
          <Box p={[0.45, 0.54, -3.32]} s={[1.98, 0.28, 2.02]} c="#f4f0e8" onClick={pick('bed')} />
          <Box p={[0.45, 0.71, -2.95]} s={[2.0, 0.1, 1.28]} c={cfg.bed} onClick={pick('bed')} />
          {[-0.45, 0.45].map((dx) => (
            <Box key={dx} p={[0.45 + dx, 0.78, -3.98]} s={[0.72, 0.18, 0.42]} c="#f7f3eb" />
          ))}

          {[-0.92, 1.82].map((x) => (
            <group key={x} position={[x, 0, -4.18]}>
              <DrawerBank w={0.54} h={0.52} d={0.44} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
              <Led p={[0, 0.04, 0.22]} s={[0.48, 0.018, 0.02]} m={m} onClick={pick('light')} />
              <Box p={[0, 1.4, 0]} s={[0.015, 1.5, 0.015]} c={hw} metal={0.7} rough={0.3} />
              <mesh position={[0, 0.82, 0]}>
                <sphereGeometry args={[0.1, 14, 12]} />
                <meshStandardMaterial color="#ffe4bd" emissive="#ffc978" emissiveIntensity={n || m.on ? 2.2 : 0.4} />
              </mesh>
            </group>
          ))}

          <group position={[2.85, 0, -3.65]}>
            <DrawerBank w={1.1} h={0.76} d={0.48} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.78, 0]} s={[1.14, 0.04, 0.52]} tex={headTex} onClick={pick('bed')} />
            <Box p={[0, 1.48, -0.22]} s={[0.78, 1.05, 0.03]} c="#d5e0df" metal={0.55} rough={0.08} />
            <Led p={[0, 1.48, -0.24]} s={[0.85, 1.12, 0.018]} m={m} onClick={pick('light')} />
            <Box p={[0, 0.24, 0.55]} s={[0.44, 0.44, 0.44]} c={cfg.bed} onClick={pick('bed')} />
          </group>
          <Box p={[0.45, 0.012, -3.1]} s={[3.6, 0.02, 2.7]} c="#cfc6b4" />
        </>
      )}

      {mode === 'walkin' && (
        <>
          <group position={[0, 0, -4.15]}>
            <Wardrobe n={6} bw={1.12} h={2.72} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>
          <group position={[-3.65, 0, -1.1]} rotation={[0, Math.PI / 2, 0]}>
            <Wardrobe n={3} bw={1.1} h={2.72} d={0.58} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>
          <group position={[3.65, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]}>
            <Wardrobe n={2} bw={1.05} h={2.72} d={0.52} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" noDoors />
          </group>
          <LedLight p={[0, 2.0, -3.55]} m={m} power={3.8} dist={5} />
          <LedLight p={[-3.0, 1.9, -1.1]} m={m} power={3.0} dist={4.2} />
          <LedLight p={[3.0, 1.9, -1.5]} m={m} power={3.0} dist={4.2} />

          <group position={[0, 0, -1.55]}>
            <DrawerBank w={2.1} h={0.86} d={0.92} rows={3} cfg={cfg} tex={doorTex} pick={pick} />
            <TexBox p={[0, 0.89, 0]} s={[2.18, 0.045, 0.98]} tex={headTex} onClick={pick('bed')} />
            <Led p={[0, 0.04, 0.47]} s={[2.0, 0.02, 0.025]} m={m} onClick={pick('light')} />
            <LedLight p={[0, 0.5, -0.85]} m={m} power={2.2} dist={3.2} />
          </group>
          <Box p={[-2.1, 0.23, -1.55]} s={[0.62, 0.46, 0.62]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[0, 0.012, -1.55]} s={[3.8, 0.02, 2.6]} c="#cdc3b1" />
        </>
      )}

      {mode === 'tv' && (
        <>
          <TexBox p={[0, 1.52, -4.44]} s={[4.4, 2.68, 0.06]} tex={headTex} onClick={pick('bed')} />
          {[-2.05, -1.9, -1.75, 1.75, 1.9, 2.05].map((x) => (
            <TexBox key={x} p={[x, 1.52, -4.39]} s={[0.08, 2.68, 0.05]} tex={doorTex} onClick={pick('doors')} />
          ))}
          <Led p={[-2.2, 1.52, -4.38]} s={[0.025, 2.66, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[2.2, 1.52, -4.38]} s={[0.025, 2.66, 0.03]} m={m} onClick={pick('light')} />
          <Led p={[0, 2.85, -4.38]} s={[4.4, 0.025, 0.03]} m={m} onClick={pick('light')} />
          <Box p={[0, 1.68, -4.36]} s={[2.05, 1.16, 0.05]} c="#0a0d12" metal={0.35} rough={0.18} />
          <Box p={[0, 1.0, -4.32]} s={[1.2, 0.07, 0.08]} c="#1c1f24" metal={0.5} rough={0.3} />

          <group position={[0, 0.28, -4.16]}>
            <Wardrobe n={4} bw={0.95} h={0.48} d={0.46} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
          </group>
          <TexBox p={[0, 0.78, -4.16]} s={[3.86, 0.035, 0.49]} tex={headTex} onClick={pick('bed')} />
          <Led p={[0, 0.26, -3.96]} s={[3.65, 0.02, 0.025]} m={m} onClick={pick('light')} />

          {[-2.85, 2.85].map((x) => (
            <group key={x} position={[x, 0, -4.2]}>
              <Wardrobe n={1} bw={0.95} h={2.65} d={0.44} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
            </group>
          ))}
          <LedLight p={[0, 1.7, -3.7]} m={m} power={3.8} dist={5} />
          <LedLight p={[-2.85, 1.6, -3.7]} m={m} power={2.4} dist={3.8} />
          <LedLight p={[2.85, 1.6, -3.7]} m={m} power={2.4} dist={3.8} />

          <Box p={[0, 0.24, -1.15]} s={[2.9, 0.42, 0.96]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[0, 0.66, -0.72]} s={[2.9, 0.52, 0.2]} c={cfg.bed} onClick={pick('bed')} />
          {[-1.48, 1.48].map((x) => (
            <Box key={x} p={[x, 0.42, -1.15]} s={[0.2, 0.52, 0.96]} c={cfg.bed} onClick={pick('bed')} />
          ))}
          <mesh position={[0, 0.2, -2.45]} onClick={pick('bed')}>
            <cylinderGeometry args={[0.56, 0.56, 0.34, 28]} />
            <meshStandardMaterial map={headTex} roughness={0.4} />
          </mesh>
          <Box p={[0, 0.012, -2.0]} s={[4.2, 0.02, 3.1]} c="#cdc3b1" />
        </>
      )}

      {mode === 'display' && (
        <>
          <TexBox p={[0, 1.78, -4.46]} s={[5.8, 1.95, 0.04]} tex={headTex} onClick={pick('bed')} />
          <group position={[0, 0, -4.18]}>
            <Wardrobe n={5} bw={1.14} h={0.82} d={0.5} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <TexBox p={[0, 0.84, -4.16]} s={[5.76, 0.04, 0.54]} tex={headTex} onClick={pick('bed')} />

          {[-2.28, 2.28].map((x) => (
            <group key={x} position={[x, 0.86, -4.24]}>
              <Wardrobe n={1} bw={1.14} h={1.88} d={0.38} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
            </group>
          ))}

          {[-1.14, 0, 1.14].map((cx, colIdx) => (
            <group key={cx}>
              <TexBox p={[cx - 0.57, 1.8, -4.25]} s={[0.035, 1.88, 0.36]} tex={doorTex} onClick={pick('doors')} />
              {colIdx === 2 && <TexBox p={[cx + 0.57, 1.8, -4.25]} s={[0.035, 1.88, 0.36]} tex={doorTex} onClick={pick('doors')} />}
              {[1.32, 1.8, 2.28, 2.72].map((y, rowIdx) => (
                <group key={y}>
                  <TexBox p={[cx, y, -4.25]} s={[1.1, 0.03, 0.36]} tex={doorTex} onClick={pick('doors')} />
                  <Led p={[cx, y - 0.02, -4.1]} s={[1.04, 0.016, 0.02]} m={m} onClick={pick('light')} />
                  {rowIdx < 3 &&
                    Array.from({ length: 6 }, (_, b) => (
                      <Box
                        key={b}
                        p={[cx - 0.38 + b * 0.065, y - 0.34, -4.24]}
                        s={[0.048, 0.24 + (b % 3) * 0.04, 0.22]}
                        c={CLOTH[(colIdx * 3 + rowIdx + b) % 7]}
                      />
                    ))}
                  {rowIdx < 3 && (
                    <mesh position={[cx + 0.28, y - 0.34, -4.22]}>
                      <cylinderGeometry args={[0.07, 0.05, 0.22, 16]} />
                      <meshStandardMaterial color={rowIdx % 2 ? '#d4af5a' : '#e8e0d2'} metalness={rowIdx % 2 ? 0.65 : 0.1} roughness={0.3} />
                    </mesh>
                  )}
                </group>
              ))}
            </group>
          ))}
          <LedLight p={[-1.2, 1.9, -3.7]} m={m} power={3.4} dist={4.5} />
          <LedLight p={[1.2, 1.9, -3.7]} m={m} power={3.4} dist={4.5} />

          <Box p={[-2.1, 0.26, -1.65]} s={[0.88, 0.44, 0.86]} c={cfg.bed} onClick={pick('bed')} />
          <Box p={[-2.1, 0.65, -2.02]} s={[0.88, 0.48, 0.18]} c={cfg.bed} onClick={pick('bed')} />
          <mesh position={[-1.2, 0.28, -1.65]} onClick={pick('bed')}>
            <cylinderGeometry args={[0.28, 0.28, 0.52, 24]} />
            <meshStandardMaterial map={headTex} roughness={0.4} />
          </mesh>
          <Box p={[0, 0.012, -2.1]} s={[4.5, 0.02, 2.9]} c="#cdc3b1" />
        </>
      )}

      {mode === 'coffee' && (
        <>
          <group position={[-0.85, 0, -4.18]}>
            <Wardrobe n={2} bw={0.85} h={0.88} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <group position={[0.42, 0, -4.18]}>
            <DrawerBank w={0.84} h={0.88} d={0.6} rows={3} cfg={cfg} tex={doorTex} pick={pick} />
          </group>
          <group position={[1.48, 0, -4.18]}>
            <Wardrobe n={1} bw={1.25} h={2.58} d={0.6} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>

          <TexBox p={[-0.42, 0.91, -4.16]} s={[2.58, 0.045, 0.65]} tex={headTex} onClick={pick('bed')} />
          <TexBox p={[-0.42, 1.32, -4.46]} s={[2.58, 0.78, 0.03]} tex={headTex} onClick={pick('bed')} />

          <group position={[-0.42, 1.72, -4.28]}>
            <Wardrobe n={3} bw={0.85} h={0.86} d={0.36} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
          </group>
          <Led p={[-0.42, 1.7, -4.14]} s={[2.5, 0.022, 0.025]} m={m} onClick={pick('light')} />
          <Led p={[-0.42, 0.05, -3.86]} s={[2.5, 0.02, 0.02]} m={m} onClick={pick('light')} />
          <LedLight p={[-0.42, 1.45, -3.85]} m={m} power={3.8} dist={4.2} />

          <Box p={[-1.05, 1.15, -4.2]} s={[0.46, 0.42, 0.36]} c="#c8c0b4" metal={0.28} rough={0.28} />
          <Box p={[-1.05, 1.38, -4.2]} s={[0.48, 0.04, 0.38]} c="#d4af5a" metal={0.6} rough={0.25} />
          <Box p={[-1.05, 1.12, -3.98]} s={[0.18, 0.04, 0.14]} c="#3d352e" />
          <Box p={[-0.5, 1.12, -4.22]} s={[0.16, 0.36, 0.18]} c="#48433e" metal={0.25} />
          <mesh position={[-0.5, 1.38, -4.22]}>
            <cylinderGeometry args={[0.08, 0.05, 0.16, 16]} />
            <meshStandardMaterial color="#cfd8dc" transparent opacity={0.55} roughness={0.1} />
          </mesh>
          {[0.05, 0.25, 0.45].map((x, k) => (
            <mesh key={x} position={[x, 0.98, -4.12]}>
              <cylinderGeometry args={[0.042, 0.034, 0.09, 14]} />
              <meshStandardMaterial color={k === 1 ? '#d4af5a' : '#f4f0e8'} roughness={0.25} />
            </mesh>
          ))}

          <mesh position={[-0.35, 0.76, -2.55]} onClick={pick('bed')}>
            <cylinderGeometry args={[0.45, 0.45, 0.04, 24]} />
            <meshStandardMaterial map={headTex} roughness={0.35} />
          </mesh>
          <mesh position={[-0.35, 0.38, -2.55]}>
            <cylinderGeometry args={[0.035, 0.035, 0.76, 10]} />
            <meshStandardMaterial color="#232528" metalness={0.7} />
          </mesh>
          {[-0.95, 0.25].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.56, -2.55]} onClick={pick('bed')}>
                <cylinderGeometry args={[0.2, 0.2, 0.07, 20]} />
                <meshStandardMaterial color={cfg.bed} roughness={0.7} />
              </mesh>
              <mesh position={[x, 0.28, -2.55]}>
                <cylinderGeometry args={[0.025, 0.025, 0.56, 8]} />
                <meshStandardMaterial color="#232528" metalness={0.7} />
              </mesh>
            </group>
          ))}
          <Box p={[-0.2, 0.012, -2.6]} s={[3.6, 0.02, 2.5]} c="#cdc3b1" />
        </>
      )}

      {mode === 'entry' && (
        <>
          <group position={[-2.75, 0, -4.38]}>
            <Box p={[0, 1.32, 0]} s={[1.18, 2.64, 0.1]} c="#261d18" />
            <Box p={[0, 1.28, 0.04]} s={[1.02, 2.52, 0.06]} c="#3b2b22" />
            <Box p={[0.38, 1.25, 0.09]} s={[0.03, 1.3, 0.04]} c="#d4af5a" metal={0.8} rough={0.2} />
          </group>

          <group position={[-1.1, 0, -4.18]}>
            <Wardrobe n={2} bw={0.95} h={2.68} d={0.56} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>

          <group position={[0.85, 0, -4.2]}>
            <Wardrobe n={2} bw={0.88} h={0.92} d={0.46} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
            <TexBox p={[0, 0.95, 0]} s={[1.82, 0.045, 0.5]} tex={headTex} onClick={pick('bed')} />
            <mesh position={[-0.35, 1.07, 0]}>
              <cylinderGeometry args={[0.08, 0.05, 0.2, 12]} />
              <meshStandardMaterial color="#d4af5a" metalness={0.75} roughness={0.25} />
            </mesh>
            <Box p={[0, 1.82, -0.22]} s={[0.92, 1.32, 0.03]} c="#d5e2e0" metal={0.6} rough={0.06} />
            <Led p={[0, 1.82, -0.24]} s={[1.0, 1.4, 0.02]} m={m} onClick={pick('light')} />
          </group>

          <group position={[2.55, 0, -4.2]}>
            <DrawerBank w={1.35} h={0.46} d={0.5} rows={1} cfg={cfg} tex={doorTex} pick={pick} />
            <Box p={[0, 0.51, 0]} s={[1.32, 0.09, 0.46]} c={cfg.bed} onClick={pick('bed')} />
            {Array.from({ length: 7 }, (_, i) => (
              <TexBox key={i} p={[-0.54 + i * 0.18, 1.62, -0.22]} s={[0.08, 2.15, 0.04]} tex={doorTex} onClick={pick('doors')} />
            ))}
            <Led p={[0, 2.7, -0.18]} s={[1.3, 0.02, 0.025]} m={m} onClick={pick('light')} />
          </group>
          <LedLight p={[-1.1, 1.9, -3.6]} m={m} power={3.0} dist={4.2} />
          <LedLight p={[1.4, 1.8, -3.7]} m={m} power={3.4} dist={4.5} />
          <Box p={[0.3, 0.012, -2.35]} s={[4.4, 0.02, 2.3]} c="#cdc3b1" />
        </>
      )}

      {mode === 'laundry' && (
        <>
          {[-1.55, -0.72].map((x, idx) => (
            <group key={x} position={[x, 0, -4.15]}>
              <Box p={[0, 0.45, 0]} s={[0.76, 0.88, 0.64]} c="#f4f2ed" rough={0.3} />
              <Box p={[0, 0.8, 0.33]} s={[0.7, 0.12, 0.02]} c="#dfd9ce" />
              <mesh position={[0.18, 0.8, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.032, 0.032, 0.02, 16]} />
                <meshStandardMaterial color={hw} metalness={0.7} />
              </mesh>
              <mesh position={[0, 0.42, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.24, 0.24, 0.04, 28]} />
                <meshStandardMaterial color="#1d2228" metalness={0.65} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.42, 0.355]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.17, 0.17, 0.02, 24]} />
                <meshStandardMaterial color={idx === 0 ? '#89a7b8' : '#a89f91'} transparent opacity={0.55} roughness={0.1} />
              </mesh>
            </group>
          ))}

          <group position={[0.22, 0, -4.15]}>
            <DrawerBank w={0.95} h={0.9} d={0.64} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
          </group>

          <TexBox p={[-0.62, 0.93, -4.13]} s={[2.76, 0.05, 0.68]} tex={headTex} onClick={pick('bed')} />
          <TexBox p={[-0.62, 1.36, -4.46]} s={[2.76, 0.82, 0.03]} tex={headTex} onClick={pick('bed')} />
          <Box p={[0.25, 0.96, -4.12]} s={[0.56, 0.03, 0.44]} c="#cfd4d8" metal={0.5} rough={0.25} />
          <Box p={[0.25, 1.12, -4.32]} s={[0.04, 0.28, 0.04]} c={hw} metal={0.75} rough={0.25} />

          <group position={[-1.12, 1.78, -4.26]}>
            <Wardrobe n={2} bw={0.88} h={0.9} d={0.38} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" plinth={false} />
          </group>
          <mesh position={[0.25, 1.95, -4.22]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.95, 10]} />
            <meshStandardMaterial color={hw} metalness={0.8} />
          </mesh>
          {[-0.05, 0.15, 0.35, 0.52].map((x, k) => (
            <Box key={x} p={[x, 1.65, -4.22]} s={[0.05, 0.5, 0.34]} c={CLOTH[(k + 1) % 7]} />
          ))}

          <Led p={[-0.62, 1.75, -4.12]} s={[2.7, 0.022, 0.025]} m={m} onClick={pick('light')} />
          <LedLight p={[-0.62, 1.5, -3.8]} m={m} power={3.6} dist={4.4} />

          <group position={[1.55, 0, -4.15]}>
            <Wardrobe n={2} bw={0.88} h={2.68} d={0.64} cfg={cfg} tex={doorTex} m={m} pick={pick} />
          </group>
          <LedLight p={[1.55, 1.8, -3.6]} m={m} power={2.8} dist={4} />
          <Box p={[0, 0.012, -2.4]} s={[3.8, 0.02, 2.1]} c="#d5cfc2" />
        </>
      )}

      {mode === 'vanity' && (
        <>
          <TexBox p={[-0.35, 1.52, -4.45]} s={[3.6, 2.76, 0.05]} tex={headTex} onClick={pick('bed')} />
          {[-2.05, -1.9, 1.2, 1.35].map((x) => (
            <TexBox key={x} p={[x, 1.52, -4.4]} s={[0.08, 2.76, 0.05]} tex={doorTex} onClick={pick('doors')} />
          ))}

          <group position={[-0.35, 0.32, -4.14]}>
            <DrawerBank w={2.65} h={0.54} d={0.56} rows={2} cfg={cfg} tex={doorTex} pick={pick} />
          </group>
          <TexBox p={[-0.35, 0.89, -4.12]} s={[2.72, 0.06, 0.6]} tex={headTex} onClick={pick('bed')} />
          <Led p={[-0.35, 0.3, -3.9]} s={[2.55, 0.022, 0.025]} m={m} onClick={pick('light')} />

          {[-1.0, 0.3].map((x) => (
            <group key={x}>
              <mesh position={[x, 1.0, -4.1]}>
                <cylinderGeometry args={[0.26, 0.21, 0.16, 28]} />
                <meshStandardMaterial color="#f8f6f2" roughness={0.14} />
              </mesh>
              <Box p={[x, 1.12, -4.34]} s={[0.038, 0.28, 0.038]} c={hw} metal={0.8} rough={0.2} />
              <Box p={[x, 1.24, -4.26]} s={[0.035, 0.035, 0.16]} c={hw} metal={0.8} rough={0.2} />
              <Box p={[x, 1.78, -4.39]} s={[0.88, 1.18, 0.03]} c="#d5e3e2" metal={0.6} rough={0.06} />
              <Led p={[x, 1.78, -4.41]} s={[0.96, 1.26, 0.02]} m={m} onClick={pick('light')} />
              <mesh position={[x + 0.52, 2.05, -4.1]}>
                <sphereGeometry args={[0.075, 12, 10]} />
                <meshStandardMaterial color="#ffe5be" emissive="#ffc875" emissiveIntensity={n || m.on ? 2.2 : 0.4} />
              </mesh>
            </group>
          ))}
          <LedLight p={[-1.0, 1.7, -3.8]} m={m} power={3.2} dist={4} />
          <LedLight p={[0.3, 1.7, -3.8]} m={m} power={3.2} dist={4} />
          <LedLight p={[-0.35, 0.25, -3.7]} m={m} power={2.0} dist={3} />

          <group position={[2.0, 0, -4.18]}>
            <Wardrobe n={1} bw={0.98} h={2.62} d={0.48} cfg={cfg} tex={doorTex} m={m} pick={pick} inner="shelves" />
          </group>
          <Box p={[-0.1, 0.012, -2.45]} s={[3.5, 0.02, 2.0]} c="#cdc3b1" />
        </>
      )}
    </>
  );
}
