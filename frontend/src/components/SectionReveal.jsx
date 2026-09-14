import { motion } from "framer-motion";

export default function SectionReveal({ children, className = "", delay = 0, y = 30 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.9, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
