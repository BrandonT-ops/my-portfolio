// src/components/AnimatedText.tsx
'use client';

import { motion } from 'framer-motion';

export default function AnimatedText({ text }: { text: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-4xl font-bold"
    >
      {text}
    </motion.h1>
  );
}
