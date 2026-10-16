import { motion } from 'motion/react';

export default function SectionTitle({ oznaka, naslov, children }) {
  return (
    <motion.div
      className="naslov-sekcije"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="oznaka-sekcije">{oznaka}</p>
      <h2>{naslov}</h2>
      {children}
    </motion.div>
  );
}
