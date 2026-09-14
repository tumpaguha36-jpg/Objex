import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";
import { ShoppingBag, Gamepad2, Glasses, Lightbulb, GraduationCap, PenTool } from "lucide-react";

const cases = [
  { icon: ShoppingBag, t: "E-commerce", d: "Turn product photos into interactive 3D previews and AR try-ons that lift conversion.", tone: "from-pink-500/25" },
  { icon: PenTool, t: "Product Design", d: "Iterate faster by exploring sketches and photos as physical volumes in seconds.", tone: "from-purple-500/25" },
  { icon: Gamepad2, t: "Game Development", d: "Prototype props and level assets from concept art without touching the DCC pipeline.", tone: "from-violet-500/25" },
  { icon: Glasses, t: "AR / VR", d: "Push web-ready GLB into your headset, glasses or in-app experience instantly.", tone: "from-blue-500/25" },
  { icon: Lightbulb, t: "Content Creation", d: "Give a 3D life to every visual you post — for reels, threads, posts and websites.", tone: "from-cyan-500/25" },
  { icon: GraduationCap, t: "Education", d: "Make abstract objects tangible — anatomy, chemistry, engineering, history.", tone: "from-pink-500/25" },
];

export default function UseCases() {
  return (
    <div className="relative pt-28 lg:pt-32 pb-24 noise" data-testid="usecases-page">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionReveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">Use Cases</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.02] max-w-4xl">
            Built for every team that <span className="brand-gradient-text">ships 3D</span>.
          </h1>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <SectionReveal key={c.t} delay={i * 0.06}>
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A0F] p-8 h-full overflow-hidden group hover:border-purple-500/30 transition-colors" data-testid={`usecase-${i}`}>
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-60 bg-gradient-radial ${c.tone} to-transparent`}
                     style={{ background: `radial-gradient(circle, rgba(168,85,247,0.28), transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-2xl">{c.t}</h3>
                  <p className="mt-2 text-slate-400 text-sm leading-relaxed">{c.d}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
