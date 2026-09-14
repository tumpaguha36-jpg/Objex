import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  as: Comp = "button",
  href,
  testId,
  ...rest
}) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base = "relative inline-flex items-center justify-center gap-2 font-medium rounded-full px-6 py-3 text-sm transition-colors duration-200 select-none";
  const styles = {
    primary: "text-white brand-gradient shadow-[0_10px_40px_-10px_rgba(168,85,247,0.7)] hover:shadow-[0_20px_60px_-10px_rgba(168,85,247,0.9)]",
    ghost: "text-white/85 border border-white/12 hover:border-white/25 hover:bg-white/[0.04]",
    outline: "text-white border border-purple-500/40 hover:border-cyan-400/60 hover:bg-purple-500/[0.06]",
  };

  const content = (
    <motion.span
      ref={ref}
      className="inline-flex items-center gap-2 will-change-transform"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  if (Comp === "a" || href) {
    return (
      <a href={href} onClick={onClick} className={cn(base, styles[variant], className)} data-testid={testId} data-magnetic {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(base, styles[variant], className)} data-testid={testId} data-magnetic {...rest}>
      {content}
    </button>
  );
}
