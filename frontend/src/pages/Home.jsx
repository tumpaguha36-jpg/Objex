import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Box, Zap, Download, Layers } from "lucide-react";
import HeroScene from "../components/HeroScene";
import AnimatedText from "../components/AnimatedText";
import MagneticButton from "../components/MagneticButton";
import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div className="relative">
      {/* HERO */}
      <section ref={heroRef} className="relative pt-28 lg:pt-32 pb-16 min-h-[92vh] noise" data-testid="home-hero">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:col-span-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300 border border-cyan-500/25 bg-cyan-500/[0.05] rounded-full px-3 py-1.5 mb-6"
              data-testid="hero-eyebrow"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI · 2D → 3D · Instant
            </motion.div>

            <h1 className="font-display font-black tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
              <AnimatedText text="Turn Any Image" delay={0.3} />
              <br />
              <span className="brand-gradient-text">
                <AnimatedText text="Into 3D." delay={0.55} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="mt-6 text-slate-300 text-lg max-w-xl leading-relaxed"
            >
              Transform a simple 2D image into an interactive 3D model in seconds.
              Upload, generate, download GLB. No plugins. No pipelines. Just OBJEX.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                testId="hero-cta-create"
                as="a"
                href="/create"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign("/create");
                }}
                className="px-7 py-3.5 text-base"
              >
                Create 3D <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                testId="hero-cta-how"
                variant="ghost"
                as="a"
                href="/how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign("/how-it-works");
                }}
                className="px-7 py-3.5 text-base"
              >
                See How It Works
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-10 flex items-center gap-6 text-xs font-mono uppercase tracking-[0.2em] text-slate-500"
            >
              <div>GLB Export</div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div>Real-time Viewer</div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div>Demo · No Signup</div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 0.9, 0.3, 1] }}
            >
              <HeroScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="relative py-6 border-y border-white/[0.06] bg-[#08080c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Trusted by teams shipping in
          </div>
          <div className="flex flex-wrap items-center gap-8 text-slate-300/80 font-display font-semibold text-sm">
            <span>· E-Commerce</span>
            <span>· Game Studios</span>
            <span>· AR / VR</span>
            <span>· Product Design</span>
            <span>· Education</span>
          </div>
        </div>
      </section>

      {/* 2D -> AI -> 3D Transformation */}
      <section className="relative py-28 noise" data-testid="home-transform">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">The Transformation</div>
            <h2 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight max-w-3xl leading-[1.02]">
              From flat pixels to <span className="brand-gradient-text">volumetric 3D</span>.
            </h2>
            <p className="mt-5 text-slate-400 max-w-2xl">
              OBJEX interprets the geometry hidden inside a 2D image and reconstructs it as a
              real 3D mesh with materials — ready to drop into any pipeline.
            </p>
          </SectionReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "2D Image", desc: "Input pixels", tone: "from-pink-500/30 to-transparent" },
              { label: "AI Processing", desc: "Neural depth + shape", tone: "from-purple-500/30 to-transparent" },
              { label: "3D Geometry", desc: "Wireframe mesh", tone: "from-blue-500/30 to-transparent" },
              { label: "Final Model", desc: "Textured GLB", tone: "from-cyan-500/30 to-transparent" },
            ].map((step, i) => (
              <SectionReveal key={step.label} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A0F] p-6 h-52 overflow-hidden group hover:border-purple-500/30 transition-colors">
                  <div className={`absolute inset-0 opacity-70 bg-gradient-to-br ${step.tone}`} />
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                      Stage 0{i + 1}
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl">{step.label}</div>
                      <div className="text-slate-400 text-sm mt-1">{step.desc}</div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-28" data-testid="home-how">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">How It Works</div>
            <h2 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight max-w-3xl leading-[1.02]">
              Three steps. <span className="brand-gradient-text">One click.</span>
            </h2>
          </SectionReveal>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Upload", d: "Upload an image of your object.", icon: Layers },
              { n: "02", t: "Generate", d: "OBJEX processes the image and creates a 3D model.", icon: Zap },
              { n: "03", t: "Download", d: "Preview your model and download it as GLB.", icon: Download },
            ].map((s, i) => (
              <SectionReveal key={s.n} delay={i * 0.12}>
                <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0A0F] p-8 h-full overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-40 bg-purple-500/40 group-hover:opacity-60 transition-opacity" />
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400">Step {s.n}</div>
                  <div className="mt-6 w-12 h-12 rounded-xl brand-gradient flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-2xl">{s.t}</h3>
                  <p className="mt-2 text-slate-400 text-sm">{s.d}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28" data-testid="home-cta">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="relative rounded-3xl gradient-border p-10 lg:p-16 overflow-hidden">
              <div className="absolute inset-0 opacity-70 hero-glow" />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">Ready · Free Demo</div>
                  <h3 className="font-display font-extrabold text-3xl lg:text-5xl leading-tight max-w-2xl">
                    Bring your first image. <span className="brand-gradient-text">Leave with a 3D model.</span>
                  </h3>
                </div>
                <MagneticButton
                  testId="cta-final-create"
                  as="a"
                  href="/create"
                  onClick={(e) => { e.preventDefault(); window.location.assign("/create"); }}
                  className="px-8 py-4 text-base"
                >
                  <Box className="w-4 h-4" /> Create 3D
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
