import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";
import HeroScene from "../components/HeroScene";
import { Camera, Cpu, Grid3x3, Layers, Palette } from "lucide-react";

const steps = [
  { icon: Camera, t: "Image ingestion", d: "Your image is normalized, aligned and analyzed for shape cues, silhouette, and material hints." },
  { icon: Cpu, t: "Neural depth", d: "OBJEX predicts a per-pixel depth field from monocular cues — the foundation of the 3D reconstruction." },
  { icon: Grid3x3, t: "Volumetric mesh", d: "Depth is lifted into a volumetric field and meshed into a watertight surface with clean topology." },
  { icon: Palette, t: "Material bake", d: "Diffuse and roughness are projected back onto the mesh from the source image for a natural look." },
  { icon: Layers, t: "GLB export", d: "The final asset is packaged as a standard GLB ready for the web, Blender, Unity, Unreal, or AR/VR." },
];

export default function HowItWorks() {
  return (
    <div className="relative pt-28 lg:pt-32 pb-24 noise" data-testid="how-page">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionReveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">How It Works</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] max-w-4xl">
            The pipeline behind <span className="brand-gradient-text">one-click 3D</span>.
          </h1>
          <p className="mt-5 text-slate-400 max-w-2xl">
            OBJEX runs a modern neural pipeline that turns a flat image into a fully textured
            3D asset. Here is what happens between upload and download.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 items-center">
          <div className="space-y-4">
            {steps.map((s, i) => (
              <SectionReveal key={s.t} delay={i * 0.08}>
                <div className="relative flex gap-5 rounded-2xl border border-white/[0.08] bg-[#0A0A0F] p-6 hover:border-purple-500/30 transition-colors" data-testid={`how-step-${i}`}>
                  <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 mb-1">
                      Stage {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="font-display font-bold text-xl">{s.t}</div>
                    <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="sticky top-24">
            <HeroScene compact />
          </div>
        </div>
      </div>
    </div>
  );
}
