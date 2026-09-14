import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";

const faqs = [
  { q: "What is OBJEX?", a: "OBJEX is an AI-powered tool that converts a single 2D image into a downloadable interactive 3D model in seconds." },
  { q: "Which image formats are supported?", a: "JPG, JPEG, PNG and WEBP files up to 15 MB. For best results, use clear, well-lit photos with a plain background." },
  { q: "What format is the 3D model?", a: "Every model is exported as a standard GLB file — universally supported by the web, Blender, Unity, Unreal, and AR/VR runtimes." },
  { q: "Do I need an account?", a: "No. OBJEX runs entirely in your browser and works instantly. No signup, no account, no friction." },
  { q: "Can I use OBJEX for commercial projects?", a: "Yes. Creator and Studio plans include a commercial license for the models you generate." },
  { q: "How long does generation take?", a: "Most models are ready within a few seconds in demo mode. Production generations scale with resolution and queue priority." },
  { q: "What happens if the API is unavailable?", a: "OBJEX automatically falls back to a cinematic demo experience so you can still explore the full flow end-to-end." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="relative pt-28 lg:pt-32 pb-24 noise" data-testid="faq-page">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionReveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">FAQ</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            Questions, <span className="brand-gradient-text">answered</span>.
          </h1>
        </SectionReveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <SectionReveal key={f.q} delay={i * 0.04}>
                <div className={`rounded-2xl border ${isOpen ? "border-purple-500/30" : "border-white/[0.08]"} bg-[#0A0A0F] overflow-hidden`}>
                  <button
                    className="w-full flex items-center justify-between gap-6 p-6 text-left"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-display font-semibold text-lg pr-4">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isOpen ? "brand-gradient text-white" : "bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-400 leading-relaxed" data-testid={`faq-panel-${i}`}>
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
