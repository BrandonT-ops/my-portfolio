'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      color: 'ruby' as const,
      icon: '💻',
      skills: [
        'Angular 19',
        'React / Next.js',
        'Django',
        'Symfony / Laravel',
        'TailwindCSS',
        'Docker',
        'PostgreSQL / MariaDB',
        'Wear OS Apps',
        'Embedded UI Systems',
        'AI/LLM Integration',
      ],
    },
    {
      title: 'Tools & Platforms',
      color: 'seagreen' as const,
      icon: '⚙️',
      skills: [
        'GitHub',
        'Hostinger',
        'VPS + Docker',
        'Google Drive',
        'Firebase',
        'Figma',
        'UI/UX Tools',
        'CI/CD Pipelines',
      ],
    },
    {
      title: 'Soft Skills',
      color: 'skyblue' as const,
      icon: '🎯',
      skills: [
        'Presentation & Communication',
        'Leadership',
        'Research & Debugging',
        'Architecture Design',
        'Project & Product Thinking',
        'Team Collaboration',
        'Mentorship',
        'Problem Solving',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-fawn/10">
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
            Skills & <span className="text-seagreen">Expertise</span>
          </h2>
          <div className="w-24 h-2 bg-seagreen border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern digital solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card variant={category.color} className="h-full">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-onyx">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-onyx" />
                      <span className="text-gray-800 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <Card variant="fawn" className="text-center">
            <p className="text-lg text-gray-800">
              <strong className="text-onyx">Always Learning:</strong> Staying updated with the latest technologies
              and best practices in web development, UI/UX design, and digital innovation.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
