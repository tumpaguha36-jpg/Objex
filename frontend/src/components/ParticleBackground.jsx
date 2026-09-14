export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute inset-0 hero-glow" />
      <div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 60%)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.30), transparent 60%)" }}
      />
    </div>
  );
}
