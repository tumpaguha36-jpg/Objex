import { motion } from "framer-motion";

export default function Logo({ size = 28, showTagline = false }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="objex-logo">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
      >
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#EC4899" />
            <stop offset="0.35" stopColor="#A855F7" />
            <stop offset="0.7" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
          stroke="url(#hexGrad)"
          strokeWidth="2.5"
          fill="rgba(168,85,247,0.06)"
        />
        <path
          d="M32 18 L46 26 L46 42 L32 50 L18 42 L18 26 Z"
          stroke="url(#hexGrad)"
          strokeWidth="1.8"
          fill="rgba(6,182,212,0.08)"
        />
        <circle cx="32" cy="34" r="4" fill="url(#hexGrad)" />
      </motion.svg>
      <div className="flex flex-col leading-none">
        <span className="font-display font-extrabold tracking-tight text-lg text-white">
          OBJE<span className="x-gradient">X</span>
        </span>
        {showTagline && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mt-1">
            One Image · One Click · One 3D
          </span>
        )}
      </div>
    </div>
  );
}
