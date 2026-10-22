import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { MathUtils } from 'three';
import { tokens } from '../theme/theme.js';

function Sculpture({ simple, reduced }) {
  const tilt = useRef(null);
  const core = useRef(null);
  const ring = useRef(null);

  useFrame((state, delta) => {
    if (!tilt.current || !core.current || !ring.current) return;

    // Subtle cursor response (disabled on small screens and for reduced motion).
    const px = reduced || simple ? 0 : state.pointer.x;
    const py = reduced || simple ? 0 : state.pointer.y;
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, px * 0.45, 3, delta);
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, -py * 0.3, 3, delta);

    // Slow, natural idle rotation.
    if (!reduced) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.z += delta * 0.05;
      ring.current.rotation.z -= delta * 0.08;
    }
  });

  const detail = simple ? 3 : 5;

  return (
    <group ref={tilt} scale={simple ? 0.82 : 1}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.7}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh ref={core}>
          <icosahedronGeometry args={[1.45, detail]} />
          {simple ? (
            <meshStandardMaterial color="#1a1a22" metalness={1} roughness={0.22} envMapIntensity={1.2} />
          ) : (
            <MeshDistortMaterial
              color="#1a1a22"
              metalness={1}
              roughness={0.18}
              distort={0.24}
              speed={reduced ? 0 : 1.1}
              envMapIntensity={1.2}
            />
          )}
        </mesh>

        <mesh ref={ring} rotation={[Math.PI / 2.35, 0.2, 0]}>
          <torusGeometry args={[2.15, 0.012, 12, 180]} />
          <meshBasicMaterial color={tokens.accent} transparent opacity={0.75} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D({ simple = false }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <Canvas
      // Cap the device pixel ratio to keep fill-rate reasonable on hi-DPI screens.
      dpr={[1, simple ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      gl={{ antialias: !simple, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      // Track the pointer across the whole page, not just over the canvas.
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 3]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={1.2} color={tokens.accent} />

      <Sculpture simple={simple} reduced={reduced} />

      {/* Procedural studio lighting: no network request for an HDR file. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[-5, 3, -2]} scale={[8, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[5, -2, -4]} scale={[6, 3, 1]} color={tokens.accent} />
        <Lightformer form="ring" intensity={1.6} position={[0, 5, 2]} scale={4} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
