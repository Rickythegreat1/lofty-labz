import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldSceneProps {
  /** Live cursor position in viewport-percent [0..100], delivered via ref to
      bypass React render churn — the per-mousemove re-render was the source of
      the trackpad parallax stutter. */
  mouseRef: React.RefObject<{ x: number; y: number }>;
  /** When a constellation is expanded, narrow the depth-of-field on that point. */
  expandedPosition: { x: number; y: number } | null;
  /** Optional motif key — which 3D motif to draw behind an expanded constellation. */
  motif: 'build' | 'voice' | 'signal' | 'engine' | 'lighthouse' | 'reel' | null;
}

/**
 * Three.js starfield scene — composed of an instanced particle field with
 * custom GLSL shaders for per-star twinkle, parallax drift, and a soft DOF
 * focal region driven by the expanded-constellation position.
 *
 * The scene is mounted via React.lazy in StarMap; OptimizedStarfield serves
 * as the Suspense fallback so the page paints fast even before three loads.
 */
export default function StarfieldScene({
  mouseRef,
  expandedPosition,
  motif,
}: StarfieldSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      className="absolute inset-0 pointer-events-none"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <color attach="background" args={['#0a0612']} />
      <Starfield mouseRef={mouseRef} expandedPosition={expandedPosition} />
      {motif && <Motif kind={motif} expandedPosition={expandedPosition} />}
    </Canvas>
  );
}

const STAR_COUNT = 650;

/*
 * Star particle shaders — tuned for CRISP pinpoint stars, not fog blobs.
 *
 * Critical knobs:
 *   gl_PointSize multiplier: keep small (35) so stars are 1–3px on screen.
 *     Higher values (200+) make stars bleed into a single glow cloud.
 *   alpha gradient: smoothstep(0.5, 0.35, d) — sharp core, narrow halo.
 *     A wide gradient (0.5, 0.0) makes every star a blurry disc.
 *   final alpha cap: 0.55 — additive blending + 1.0 alpha = blown-out fog.
 */
const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aDepth;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uFocal;
  uniform float uHasFocal;
  uniform float uReducedMotion;

  varying float vTwinkle;
  varying float vDistToFocal;
  varying float vDepth;

  void main() {
    vec3 pos = position;

    // Floaty drift — every star wanders in a tiny ellipse on its own phase.
    // Magnitude 0.04 ≈ 1–2px on screen over a 6–8s cycle. Closer stars (high
    // aDepth) drift slightly more; deep stars stay still. Zeroed under
    // prefers-reduced-motion.
    float driftAmt = (1.0 - uReducedMotion) * 0.04 * aDepth;
    pos.x += sin(uTime * 0.15 + aPhase) * driftAmt;
    pos.y += cos(uTime * 0.12 + aPhase * 1.3) * driftAmt;

    // Parallax drift — deeper stars drift less. Magnitude bumped to 0.32
    // for a more pronounced parallax sense. Smoothing is done on the
    // uMouse uniform on the CPU side, so this can be a flat multiply.
    pos.x += uMouse.x * 0.32 * (1.0 - aDepth);
    pos.y += -uMouse.y * 0.32 * (1.0 - aDepth);

    // Per-star twinkle (halt under reduced motion by holding phase steady).
    float twinkleTime = mix(uTime, 0.0, uReducedMotion);
    vTwinkle = 0.5 + 0.5 * sin(twinkleTime * (0.4 + aDepth * 0.6) + aPhase);

    // Distance from this star to the focal screen point — used to fade out
    // distant stars (depth-of-field-ish) when a constellation is expanded.
    vec2 ndc = pos.xy / 3.5;
    vDistToFocal = distance(ndc, uFocal);
    vDepth = aDepth;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // CRITICAL: keep multiplier low — stars must read as pinpoints, not haze.
    // Dropped 35 → 28 so the brightest particles cap smaller and the
    // constellation lines win the legibility contest.
    gl_PointSize = aSize * (28.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  uniform vec3 uColorCore;
  uniform vec3 uColorBrass;
  uniform float uHasFocal;

  varying float vTwinkle;
  varying float vDistToFocal;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    // Sharp core with a tiny halo — NOT a smooth fog gradient.
    float core = smoothstep(0.5, 0.35, d);
    float halo = smoothstep(0.5, 0.45, d) * 0.18;
    float alpha = (core + halo) * vTwinkle;

    // Focal DOF: attenuate stars far from focal when a constellation is open.
    float focalFade = mix(1.0, 1.0 - smoothstep(0.25, 1.0, vDistToFocal), uHasFocal);
    alpha *= focalFade;

    // Mix a touch of brass into deeper stars; close stars stay paper-white.
    vec3 col = mix(uColorCore, uColorBrass, vDepth * 0.35);
    // Cap final alpha so additive blending doesn't blow out into haze.
    gl_FragColor = vec4(col, alpha * 0.55);
  }
`;

function Starfield({
  mouseRef,
  expandedPosition,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  expandedPosition: { x: number; y: number } | null;
}) {
  const ref = useRef<THREE.Points>(null!);

  // Honor prefers-reduced-motion at scene level. The uniform is read by the
  // vertex shader to halt drift + twinkle for users who've opted out.
  const reducedMotionRef = useRef(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reducedMotionRef.current = mq.matches ? 1 : 0;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const phases = new Float32Array(STAR_COUNT);
    const depths = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      // Spread across an 8x4.5x4 box around origin. Z-depth bumped 3 → 4
      // so the field reads as background, not midground — gives constellation
      // lines more contrast room.
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 4.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 4;
      // Smaller, tighter size distribution — closest stars cap around 2.5px.
      sizes[i] = 0.35 + Math.random() * 0.6;
      phases[i] = Math.random() * Math.PI * 2;
      depths[i] = Math.random();
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geom.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERTEX,
      fragmentShader: STAR_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uFocal: { value: new THREE.Vector2(0, 0) },
        uHasFocal: { value: 0 },
        uReducedMotion: { value: 0 },
        uColorCore: { value: new THREE.Color('#faf7fb') },
        uColorBrass: { value: new THREE.Color('#c9a961') },
      },
    });

    return { geometry: geom, material: mat };
  }, []);

  // Mouse position arrives in [0, 100] (% of viewport). Map to [-1, +1].
  const targetMouse = useMemo(() => new THREE.Vector2(0, 0), []);
  const targetFocal = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const mouse = mouseRef.current ?? { x: 50, y: 50 };
    targetMouse.x = (mouse.x - 50) / 50;
    targetMouse.y = (mouse.y - 50) / 50;
    // Exponential damping toward the target. lambda=2.2 is gentle enough to
    // smooth trackpad jitter, fast enough to feel responsive. The damp
    // formula is frame-rate independent unlike a flat lerp factor.
    const cur = material.uniforms.uMouse.value;
    cur.x = THREE.MathUtils.damp(cur.x, targetMouse.x, 2.2, delta);
    cur.y = THREE.MathUtils.damp(cur.y, targetMouse.y, 2.2, delta);
    material.uniforms.uTime.value += delta;
    material.uniforms.uReducedMotion.value = reducedMotionRef.current;

    if (expandedPosition) {
      targetFocal.x = (expandedPosition.x - 50) / 50;
      targetFocal.y = -(expandedPosition.y - 50) / 50;
      material.uniforms.uHasFocal.value = THREE.MathUtils.lerp(
        material.uniforms.uHasFocal.value,
        1,
        Math.min(1, delta * 3)
      );
    } else {
      material.uniforms.uHasFocal.value = THREE.MathUtils.lerp(
        material.uniforms.uHasFocal.value,
        0,
        Math.min(1, delta * 3)
      );
    }
    material.uniforms.uFocal.value.lerp(targetFocal, Math.min(1, delta * 3));
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}

/**
 * Constellation motif — a single decorative 3D form drawn behind the
 * lifted constellation. Each practice gets its own geometry. Subtle by
 * design — the constellation itself is the focal subject; the motif is
 * atmospheric.
 */
function Motif({
  kind,
  expandedPosition,
}: {
  kind: NonNullable<StarfieldSceneProps['motif']>;
  expandedPosition: { x: number; y: number } | null;
}) {
  const ref = useRef<THREE.Group>(null!);
  // Drive an opacity ref so we can react to the motif having just arrived.
  const opacity = useRef(0);

  // Map the constellation's screen-position into world coordinates.
  const targetPos = useMemo(() => new THREE.Vector3(0, 0, -1.5), []);

  useEffect(() => {
    opacity.current = 0;
  }, [kind]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (expandedPosition) {
      targetPos.x = ((expandedPosition.x - 50) / 50) * 3.5;
      targetPos.y = -((expandedPosition.y - 50) / 50) * 2.2;
      ref.current.position.lerp(targetPos, Math.min(1, delta * 3));
      opacity.current = THREE.MathUtils.lerp(opacity.current, 1, Math.min(1, delta * 1.6));
    } else {
      opacity.current = THREE.MathUtils.lerp(opacity.current, 0, Math.min(1, delta * 3));
    }
    ref.current.rotation.z += delta * 0.06;
    ref.current.rotation.y += delta * 0.04;
    ref.current.traverse((obj) => {
      const m = (obj as THREE.Mesh).material as THREE.Material | undefined;
      if (m && 'opacity' in m) {
        (m as THREE.MeshBasicMaterial).opacity = opacity.current * 0.35;
        (m as THREE.MeshBasicMaterial).transparent = true;
      }
    });
  });

  return (
    <group ref={ref}>
      {kind === 'build' && <BuildMotif />}
      {kind === 'voice' && <VoiceMotif />}
      {kind === 'signal' && <SignalMotif />}
      {kind === 'engine' && <EngineMotif />}
      {kind === 'lighthouse' && <LighthouseMotif />}
      {kind === 'reel' && <ReelMotif />}
    </group>
  );
}

function BuildMotif() {
  // Schematic grid plane — blueprint feel.
  return (
    <gridHelper args={[2.4, 12, '#c9a961', '#4f2c9c']} rotation={[Math.PI / 2.4, 0, 0]} />
  );
}

function VoiceMotif() {
  // Radial torus stack — waveform feel.
  return (
    <>
      <mesh>
        <torusGeometry args={[0.8, 0.01, 8, 64]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.2, 0.008, 8, 64]} />
        <meshBasicMaterial color="#9b7fd9" transparent opacity={0.25} />
      </mesh>
    </>
  );
}

function SignalMotif() {
  return (
    <>
      <mesh>
        <ringGeometry args={[0.6, 0.62, 64]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.9, 0.92, 64]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.2} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.2, 1.22, 64]} />
        <meshBasicMaterial color="#9b7fd9" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

function EngineMotif() {
  return (
    <mesh>
      <torusKnotGeometry args={[0.55, 0.08, 128, 16]} />
      <meshBasicMaterial color="#c9a961" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function LighthouseMotif() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <coneGeometry args={[1.4, 1.8, 32, 1, true]} />
      <meshBasicMaterial color="#c9a961" wireframe transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ReelMotif() {
  // Film-reel: face-on torus (the rim) with a small inner ring (spindle plate).
  // Sits flat-on facing the camera so it reads as a circle, not an ellipse.
  return (
    <>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.0, 0.04, 12, 96]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.025, 10, 64]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <circleGeometry args={[0.08, 24]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

// Avoid the unused-import warning on ThreeEvent — kept available for future
// pointer-driven motif interactions.
export type _ThreeEvent = ThreeEvent<MouseEvent>;
