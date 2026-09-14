import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { name: "Nebula Cube", tag: "Geometric", geom: "box", color: "#EC4899" },
  { name: "Ion Torus", tag: "Sci-Fi", geom: "torusKnot", color: "#A855F7" },
  { name: "Prism Core", tag: "Industrial", geom: "octahedron", color: "#7C3AED" },
  { name: "Vector Sphere", tag: "Abstract", geom: "sphere", color: "#3B82F6" },
  { name: "Neon Ico", tag: "Crystal", geom: "icosahedron", color: "#06B6D4" },
  { name: "Signal Dodeca", tag: "Volumetric", geom: "dodecahedron", color: "#EC4899" },
];

function Shape({ geom, color }) {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.5;
      ref.current.rotation.x += d * 0.25;
    }
  });
  const geometry = {
    box: <boxGeometry args={[1.2, 1.2, 1.2]} />,
    sphere: <sphereGeometry args={[0.9, 32, 32]} />,
    torusKnot: <torusKnotGeometry args={[0.7, 0.25, 128, 16]} />,
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1.1, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  }[geom];
  return (
    <group ref={ref}>
      <mesh>
        {geometry}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh>
        {geometry}
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function GalleryTile({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 0.9, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl gradient-border overflow-hidden bg-[#0A0A0F] group"
      data-testid={`gallery-item-${index}`}
    >
      <div className="aspect-square relative">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={["#0A0A0F"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#A855F7" />
          <pointLight position={[-3, -2, -3]} intensity={1.8} color="#06B6D4" />
          <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
            <Shape geom={item.geom} color={item.color} />
          </Float>
        </Canvas>
        <div className="absolute inset-0 pointer-events-none cyber-grid opacity-40" />
      </div>
      <div className="p-5 border-t border-white/[0.06]">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 mb-1">{item.tag}</div>
        <div className="flex items-center justify-between">
          <div className="font-display font-semibold">{item.name}</div>
          <Link
            to="/create"
            className="text-xs text-slate-300 hover:text-white group-hover:brand-gradient-text transition-colors"
            data-testid={`gallery-cta-${index}`}
          >
            Try in Studio →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <div className="relative pt-28 lg:pt-32 pb-24 noise" data-testid="gallery-page">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionReveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">Gallery</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] max-w-4xl">
            A living <span className="brand-gradient-text">library</span> of 3D creations.
          </h1>
          <p className="mt-5 text-slate-400 max-w-2xl">
            A taste of what OBJEX can generate. Every asset here is a live 3D scene.
          </p>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <GalleryTile key={it.name} item={it} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
