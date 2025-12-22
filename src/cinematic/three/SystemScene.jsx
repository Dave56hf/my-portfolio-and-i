import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#00ff88";
const INK = "#050607";

const fract = (x) => x - Math.floor(x);
const prand = (seed) => fract(Math.sin(seed * 12.9898) * 43758.5453123);

function TracePoints({ progressRef, density = 320 }) {
  const pointsRef = useRef(null);

  const { geometry, baseX, baseY, baseZ, speed } = useMemo(() => {
    const positions = new Float32Array(density * 3);
    const bx = new Float32Array(density);
    const by = new Float32Array(density);
    const bz = new Float32Array(density);
    const sp = new Float32Array(density);

    for (let i = 0; i < density; i += 1) {
      const r0 = prand(i * 3.1 + 1.23);
      const r1 = prand(i * 7.7 + 9.87);
      const r2 = prand(i * 11.3 + 4.56);
      const r3 = prand(i * 5.9 + 8.01);

      bx[i] = (r0 - 0.5) * 10;
      by[i] = (r1 - 0.5) * 6;
      bz[i] = -(r2 * 38 + 2);
      sp[i] = 0.35 + r3 * 0.75;

      const base = i * 3;
      positions[base + 0] = bx[i];
      positions[base + 1] = by[i];
      positions[base + 2] = bz[i];
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, baseX: bx, baseY: by, baseZ: bz, speed: sp };
  }, [density]);

  useFrame((state) => {
    const progress = progressRef?.current ?? 0;
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const scrollSpeed = 0.8 + p * 2.2;
    const time = state.clock.getElapsedTime();
    const range = 44;

    const attr = pointsRef.current?.geometry?.attributes?.position;
    const positions = attr?.array;
    if (!positions) return;

    for (let i = 0; i < density; i += 1) {
      const base = i * 3;
      const z = ((time * speed[i] * scrollSpeed * 6.0 + (-baseZ[i])) % range) - range;
      positions[base + 0] = baseX[i] + Math.sin(time * 0.6 + i) * 0.02;
      positions[base + 1] = baseY[i] + Math.cos(time * 0.55 + i * 0.7) * 0.02;
      positions[base + 2] = z;
    }

    attr.needsUpdate = true;

    const group = pointsRef.current?.parent;
    if (!group) return;
    if (progressRef) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, state.pointer.x * 0.15, 0.06);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -state.pointer.y * 0.12, 0.06);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color={ACCENT}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SystemRig({ progressRef, enabled }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (!enabled) return;
    const progress = progressRef?.current ?? 0;
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const ease = p * p * (3 - 2 * p);

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.15 + ease * 0.25,
      0.05
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      ease * 0.25,
      0.05
    );

    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, state.pointer.x * 0.25, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, state.pointer.y * 0.18, 0.04);
    cam.lookAt(0, 0, -10);
  });

  return (
    <group ref={groupRef}>
      <gridHelper args={[28, 28, ACCENT, "#0b1f15"]} position={[0, -1.6, -14]} />
      <TracePoints progressRef={progressRef} />
    </group>
  );
}

export default function SystemScene({ progressRef, className = "" }) {
  const enabled = Boolean(progressRef);
  return (
    <div className={`cine-canvas ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3.6], fov: 46 }}
      >
        <color attach="background" args={[INK]} />
        <fog attach="fog" args={[INK, 6, 22]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[2, 4, 2]} intensity={0.35} color="#d7ffe8" />
        <directionalLight position={[-6, -2, -2]} intensity={0.25} color={ACCENT} />
        <SystemRig progressRef={progressRef} enabled={enabled} />
      </Canvas>
    </div>
  );
}
