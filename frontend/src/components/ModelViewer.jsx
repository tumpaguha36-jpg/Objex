import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Grid, ContactShadows, Center, Bounds } from "@react-three/drei";
import { Maximize2, RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react";
import { motion } from "framer-motion";

useGLTF.preload("/models/demo-object.glb");

function Model({ url, wireframe }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
        if (c.material) {
          c.material.wireframe = wireframe;
          c.material.needsUpdate = true;
        }
      }
    });
  }, [scene, wireframe]);
  return <primitive object={scene} />;
}

function CamController({ controlsRef }) {
  const { camera } = useThree();
  useEffect(() => {
    if (controlsRef) controlsRef.current = { camera };
  }, [controlsRef, camera]);
  return null;
}

export default function ModelViewer({ url = "/models/demo-object.glb" }) {
  const wrapperRef = useRef(null);
  const controlsRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const reset = () => controlsRef.current?.reset?.();
  const zoom = (dir) => {
    const c = controlsRef.current;
    if (!c || !c.object) return;
    const factor = dir > 0 ? 0.85 : 1.15;
    c.object.position.multiplyScalar(factor);
    c.update?.();
  };
  const fullscreen = () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[520px] lg:h-[640px] rounded-2xl overflow-hidden gradient-border"
      data-testid="model-viewer"
    >
      <Canvas shadows camera={{ position: [3, 2, 4], fov: 40 }} dpr={[1, 2]}>
        <color attach="background" args={["#0A0A0F"]} />
        <fog attach="fog" args={["#0A0A0F", 8, 20]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.6}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-6, 3, -4]} intensity={2} color="#A855F7" />
        <pointLight position={[6, -2, 4]} intensity={1.6} color="#06B6D4" />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model url={url} wireframe={wireframe} />
            </Center>
          </Bounds>
          <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          <Grid
            position={[0, -1.2, 0]}
            args={[20, 20]}
            cellColor="#252532"
            sectionColor="#7C3AED"
            fadeDistance={12}
            fadeStrength={1.2}
            infiniteGrid
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          ref={(r) => {
            if (r) controlsRef.current = r;
          }}
          enablePan
          enableZoom
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minDistance={2}
          maxDistance={12}
        />
        <CamController controlsRef={controlsRef} />
      </Canvas>

      {/* Overlay HUD */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/80 bg-[#0A0A0F]/60 border border-cyan-500/20 backdrop-blur px-2.5 py-1 rounded-full">
          OBJEX · 3D Viewer
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 bg-[#0A0A0F]/60 border border-white/10 backdrop-blur px-2.5 py-1 rounded-full">
          GLB · Ready
        </div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0A0A0F]/85 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5"
      >
        <ViewerButton onClick={() => zoom(1)} label="Zoom In" testId="viewer-zoom-in">
          <ZoomIn className="w-4 h-4" />
        </ViewerButton>
        <ViewerButton onClick={() => zoom(-1)} label="Zoom Out" testId="viewer-zoom-out">
          <ZoomOut className="w-4 h-4" />
        </ViewerButton>
        <ViewerButton onClick={reset} label="Reset" testId="viewer-reset">
          <RotateCcw className="w-4 h-4" />
        </ViewerButton>
        <ViewerButton
          onClick={() => setAutoRotate((v) => !v)}
          label={autoRotate ? "Pause" : "Rotate"}
          testId="viewer-autorotate"
          active={autoRotate}
        >
          <Move3D className="w-4 h-4" />
        </ViewerButton>
        <ViewerButton
          onClick={() => setWireframe((v) => !v)}
          label="Wire"
          testId="viewer-wireframe"
          active={wireframe}
        >
          <span className="font-mono text-[10px]">WIRE</span>
        </ViewerButton>
        <ViewerButton onClick={fullscreen} label="Fullscreen" testId="viewer-fullscreen">
          <Maximize2 className="w-4 h-4" />
        </ViewerButton>
      </motion.div>
    </div>
  );
}

function ViewerButton({ children, onClick, label, testId, active }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      data-testid={testId}
      className={`px-3 py-2 rounded-full text-xs flex items-center gap-1.5 transition-colors ${
        active
          ? "text-white bg-purple-500/25 border border-purple-400/40"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
