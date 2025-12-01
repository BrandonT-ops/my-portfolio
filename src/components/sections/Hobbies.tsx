'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const Hobbies: React.FC = () => {
  const hobbies = [
    {
      title: 'Photography',
      description: 'Capturing moments and telling stories through visual media, from portraits to urban landscapes.',
      icon: '📷',
      color: 'ruby' as const,
      link: '#photography',
    },
    {
      title: 'Graphic Design',
      description: 'Creating visual content and brand identities that communicate ideas effectively.',
      icon: '🎨',
      color: 'skyblue' as const,
    },
    {
      title: 'Tech Communities',
      description: 'Building and participating in tech communities, mentoring aspiring developers.',
      icon: '👥',
      color: 'seagreen' as const,
    },
    {
      title: 'Building Digital Tools',
      description: 'Creating useful applications and tools that solve real-world problems.',
      icon: '🔧',
      color: 'fawn' as const,
    },
    {
      title: 'Reading & Research',
      description: 'Staying updated with latest tech trends, UX principles, and industry best practices.',
      icon: '📚',
      color: 'skyblue' as const,
    },
    {
      title: 'UI/UX Experimentation',
      description: 'Exploring new design patterns, interaction models, and user experience principles.',
      icon: '✨',
      color: 'ruby' as const,
    },
    {
      title: 'Teaching Digital Literacy',
      description: 'Volunteering to teach digital skills and empower communities through technology.',
      icon: '🎓',
      color: 'seagreen' as const,
    },
    {
      title: 'Creative Coding',
      description: 'Experimenting with generative art, animations, and interactive experiences.',
      icon: '💻',
      color: 'fawn' as const,
    },
  ];

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-onyx mb-4">
            Hobbies & <span className="text-fawn">Interests</span>
          </h2>
          <div className="w-24 h-2 bg-fawn border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            When I&apos;m not coding, I&apos;m exploring creativity, building community, and continuously learning.
          </p>
        </motion.div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {hobby.link ? (
                <a href={hobby.link}>
                  <Card variant={hobby.color} hoverable className="h-full text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-5xl mb-4">{hobby.icon}</div>
                      <h3 className="text-xl font-bold text-onyx mb-3">{hobby.title}</h3>
                      <p className="text-gray-700 text-sm">{hobby.description}</p>
                    </div>
                  </Card>
                </a>
              ) : (
                <Card variant={hobby.color} hoverable className="h-full text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4">{hobby.icon}</div>
                    <h3 className="text-xl font-bold text-onyx mb-3">{hobby.title}</h3>
                    <p className="text-gray-700 text-sm">{hobby.description}</p>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Quote/Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card variant="default" className="max-w-3xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-gray-800 italic">
              &quot;The best way to predict the future is to create it. I believe in blending technology, creativity, and community impact to build meaningful solutions.&quot;
            </blockquote>
            <p className="mt-4 text-ruby font-bold">— Brandon Tapiba</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;
