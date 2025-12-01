'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 bg-white">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-onyx">
              Hi, I&apos;m <span className="text-ruby">Brandon Tapiba</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              Digital Engineer & Full-Stack Developer
            </p>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building modern web applications with Angular, React, and Django.
            Passionate about creating intuitive user experiences and scalable solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" href="#projects">
              View My Work
            </Button>
            <Button variant="outline" size="lg" href="#contact">
              Get In Touch
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ruby">8+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-seagreen">5+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-skyblue">3+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Years</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
