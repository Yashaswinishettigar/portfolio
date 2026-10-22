import { motion, useReducedMotion } from 'framer-motion';

// Tiny hover/tap micro-interaction wrapper for buttons and links.
export default function Press({ children, style }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      style={{ display: 'inline-flex', ...style }}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}
