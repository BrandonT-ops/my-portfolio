'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const About: React.FC = () => {
  const timeline = [
    {
      year: '2024',
      title: 'Aspire Tech Pilot & Leadership Program',
      description: 'Leading digital skills initiatives and community impact programs',
      color: 'ruby' as const,
    },
    {
      year: '2023',
      title: 'Founder - The Factory',
      description: 'Launched digital skills initiative to empower communities through technology',
      color: 'seagreen' as const,
    },
    {
      year: '2022',
      title: 'Full-Stack Development',
      description: 'Specialized in Angular, React, Django, and modern web technologies',
      color: 'skyblue' as const,
    },
    {
      year: '2021',
      title: 'Digital Systems Engineering',
      description: 'Started journey in digital engineering and product innovation',
      color: 'fawn' as const,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-onyx mb-4">
            About <span className="text-ruby">Me</span>
          </h2>
          <div className="w-24 h-2 bg-ruby border-3 border-onyx shadow-brutal-sm" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="default" className="h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-onyx mb-6">
                Digital Engineer & Creative Builder
              </h3>

              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  I&apos;m a <strong className="text-onyx">Digital Systems Engineer</strong> with a passion for creating
                  innovative digital solutions that make a real impact. My expertise spans across frontend,
                  backend, and product design.
                </p>

                <p className="text-lg">
                  As part of the <strong className="text-ruby">Aspire Tech Pilot & Leadership Program</strong>,
                  I&apos;m dedicated to empowering the next generation of tech leaders.
                </p>

                <p className="text-lg">
                  I founded <strong className="text-seagreen">The Factory</strong>, a digital skills initiative
                  aimed at bridging the technology gap and creating opportunities for communities to thrive
                  in the digital age.
                </p>

                <p className="text-lg">
                  My vision is simple: <em>blend technology, community impact, and creativity</em> to build
                  solutions that matter.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-3 border-onyx bg-ruby/10 p-4">
                  <div className="text-2xl mb-2">🎓</div>
                  <div className="font-bold text-sm uppercase text-onyx">Education</div>
                  <div className="text-sm text-gray-700">Digital Systems Eng.</div>
                </div>
                <div className="border-3 border-onyx bg-seagreen/10 p-4">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="font-bold text-sm uppercase text-onyx">Mission</div>
                  <div className="text-sm text-gray-700">Tech + Community</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-onyx mb-8">
              My <span className="text-seagreen">Journey</span>
            </h3>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant={item.color} hoverable className="relative pl-16">
                    {/* Year badge */}
                    <div className="absolute left-4 top-6 w-12 h-12 border-3 border-onyx bg-white flex items-center justify-center font-bold text-sm shadow-brutal-sm">
                      {item.year}
                    </div>

                    <h4 className="text-lg font-bold text-onyx mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
