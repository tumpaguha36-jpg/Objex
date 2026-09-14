import SectionReveal from "../components/SectionReveal";
import ParticleBackground from "../components/ParticleBackground";
import MagneticButton from "../components/MagneticButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    tagline: "Try OBJEX with demo mode.",
    features: ["Up to 5 models / month", "GLB export", "Standard resolution", "Community support"],
    highlight: false,
    testId: "plan-starter",
  },
  {
    name: "Creator",
    price: "$19",
    period: "/mo",
    tagline: "For creators and freelancers.",
    features: ["150 models / month", "High-resolution meshes", "Priority queue", "Commercial license"],
    highlight: true,
    testId: "plan-creator",
  },
  {
    name: "Studio",
    price: "$79",
    period: "/mo",
    tagline: "For studios and teams.",
    features: ["Unlimited models", "Team seats", "API access", "Dedicated pipeline support"],
    highlight: false,
    testId: "plan-studio",
  },
];

export default function Pricing() {
  return (
    <div className="relative pt-28 lg:pt-32 pb-24 noise" data-testid="pricing-page">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionReveal>
          <div className="text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">Pricing</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.02]">
              Simple <span className="brand-gradient-text">pricing</span>. Real 3D.
            </h1>
            <p className="mt-5 text-slate-400 max-w-2xl mx-auto">
              Start free with demo generations. Upgrade when you are ready to ship.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <SectionReveal key={p.name} delay={i * 0.08}>
              <div
                className={`relative rounded-2xl p-8 h-full ${
                  p.highlight
                    ? "gradient-border pulse-glow"
                    : "border border-white/[0.08] bg-[#0A0A0F]"
                }`}
                data-testid={p.testId}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white bg-purple-600/90 px-2.5 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="font-display font-semibold text-lg">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display font-black text-5xl">{p.price}</span>
                  <span className="text-slate-500 text-sm">{p.period}</span>
                </div>
                <p className="mt-2 text-slate-400 text-sm">{p.tagline}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <MagneticButton
                    testId={`${p.testId}-cta`}
                    onClick={() => window.location.assign("/create")}
                    variant={p.highlight ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    {p.highlight ? "Start Creating" : "Choose " + p.name}
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
