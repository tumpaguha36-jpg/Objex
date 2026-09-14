import { motion } from "framer-motion";

export default function AnimatedText({ text, className = "", delay = 0, gradient = false }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 pr-2 align-baseline">
          <motion.span
            className={`inline-block ${gradient && word === "3D." ? "brand-gradient-text" : ""}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.22, 0.9, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
