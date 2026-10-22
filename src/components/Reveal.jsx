import { motion, useReducedMotion } from 'framer-motion';

// Scroll-triggered fade/slide-in. Renders instantly when the user prefers reduced motion.
export default function Reveal({ children, delay = 0, y = 24, amount = 0.2, style, className }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
