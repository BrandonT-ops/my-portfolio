'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-fawn/10 to-skyblue/10">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-ruby text-white border-3 border-onyx shadow-brutal text-sm font-bold uppercase"
            >
              Digital Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-onyx leading-none mb-6"
            >
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Brandon</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-2 left-0 h-4 bg-fawn -z-0"
                />
              </span>
              <br />
              <span className="text-ruby">Tapiba</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl"
            >
              Digital Engineer & Creative Builder specializing in full-stack development, product innovation, and UI/UX design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" href="#projects">
                View Work
              </Button>
              <Button variant="outline" size="lg" href="#contact">
                Get In Touch
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <div className="border-3 border-onyx bg-white p-4 shadow-brutal-sm">
                <div className="text-3xl font-bold text-ruby">8+</div>
                <div className="text-sm font-bold text-gray-600 uppercase">Projects</div>
              </div>
              <div className="border-3 border-onyx bg-white p-4 shadow-brutal-sm">
                <div className="text-3xl font-bold text-seagreen">5+</div>
                <div className="text-sm font-bold text-gray-600 uppercase">Technologies</div>
              </div>
              <div className="border-3 border-onyx bg-white p-4 shadow-brutal-sm">
                <div className="text-3xl font-bold text-skyblue">3+</div>
                <div className="text-sm font-bold text-gray-600 uppercase">Years Exp</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Large background shape */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-[500px] border-5 border-onyx bg-gradient-to-br from-skyblue/30 to-seagreen/30 shadow-brutal-xl"
              />

              {/* Floating cards */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-10 -left-10 w-40 h-40 bg-ruby border-3 border-onyx shadow-brutal p-4 flex items-center justify-center"
              >
                <span className="text-4xl">💻</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute bottom-10 -right-10 w-40 h-40 bg-fawn border-3 border-onyx shadow-brutal p-4 flex items-center justify-center"
              >
                <span className="text-4xl">🎨</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute top-1/2 -translate-y-1/2 -right-5 w-32 h-32 bg-seagreen border-3 border-onyx shadow-brutal p-4 flex items-center justify-center"
              >
                <span className="text-4xl">⚡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
