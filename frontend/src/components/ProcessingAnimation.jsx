import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  "Analyzing image",
  "Building geometry",
  "Generating materials",
  "Optimizing model",
  "Finalizing 3D model",
];

function Wireframe() {
  const outer = useRef();
  const inner = useRef();
  useFrame((_, d) => {
    if (outer.current) {
      outer.current.rotation.y += d * 0.5;
      outer.current.rotation.x += d * 0.25;
    }
    if (inner.current) {
      inner.current.rotation.y -= d * 0.9;
    }
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial color="#A855F7" wireframe transparent opacity={0.65} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.75} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#EC4899" />
      </mesh>
    </group>
  );
}

export default function ProcessingAnimation({ progress = 0 }) {
  const stageIndex = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length));

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] rounded-2xl gradient-border overflow-hidden" data-testid="processing-animation">
      <div className="absolute inset-0 cyber-grid opacity-70" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#050507"]} />
          <ambientLight intensity={0.6} />
          <Wireframe />
        </Canvas>
      </div>
      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="scan-line w-full h-24" />
      </div>

      {/* HUD */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 bg-[#0A0A0F]/60 border border-cyan-500/25 px-2.5 py-1 rounded-full">
            OBJEX · AI Engine
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 bg-[#0A0A0F]/60 border border-white/10 px-2.5 py-1 rounded-full" data-testid="processing-progress">
            {Math.round(progress)}%
          </div>
        </div>

        <div className="max-w-md">
          <div className="font-display font-extrabold text-3xl lg:text-4xl mb-4 leading-tight">
            Creating your <span className="brand-gradient-text">3D model</span>…
          </div>
          <ul className="space-y-2">
            {STAGES.map((s, i) => {
              const active = i === stageIndex;
              const done = i < stageIndex;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      done ? "bg-cyan-400" : active ? "bg-purple-400 animate-pulse" : "bg-white/15"
                    }`}
                  />
                  <span
                    className={`text-sm font-mono uppercase tracking-[0.14em] ${
                      done ? "text-cyan-200" : active ? "text-white" : "text-slate-500"
                    }`}
                    data-testid={`processing-stage-${i}`}
                  >
                    {s}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full brand-gradient"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
