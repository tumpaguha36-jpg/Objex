import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AnimatedCore({ mouse }) {
  const group = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      const tx = (mouse.current.x - 0.5) * 0.6;
      const ty = (0.5 - mouse.current.y) * 0.4;
      group.current.rotation.x += (ty - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (tx * 0.2 - group.current.rotation.z) * 0.04;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4;
      inner.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Outer hexagonal shell (icosahedron for a faceted crystal feel) */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshDistortMaterial
          color="#7C3AED"
          emissive="#A855F7"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={0.22}
          speed={1.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner glowing cube */}
      <group ref={inner}>
        <mesh>
          <boxGeometry args={[0.75, 0.75, 0.75]} />
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.6, i * 0.4, i * 0.2]}>
          <torusGeometry args={[2.4 + i * 0.15, 0.008, 8, 128]} />
          <meshBasicMaterial color={i === 0 ? "#A855F7" : i === 1 ? "#3B82F6" : "#06B6D4"} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ compact = false }) {
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width;
    mouse.current.y = (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
      className={`relative w-full ${compact ? "h-[380px]" : "h-[520px] lg:h-[680px]"}`}
      onMouseMove={onMove}
      data-testid="hero-3d-scene"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 6, 14]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 4, 5]} intensity={2.5} color="#A855F7" />
        <pointLight position={[-6, -3, -4]} intensity={2.2} color="#06B6D4" />
        <pointLight position={[0, -6, 3]} intensity={1.5} color="#EC4899" />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
            <AnimatedCore mouse={mouse} />
          </Float>
          <Sparkles count={90} scale={[10, 6, 6]} size={2} speed={0.4} color="#A855F7" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Radial glow overlays */}
      <div className="absolute inset-0 pointer-events-none hero-glow" />
    </div>
  );
}
