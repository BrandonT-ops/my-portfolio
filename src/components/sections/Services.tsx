'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Frontend Engineering',
      description: 'Building modern, responsive web applications with React, Next.js, and Angular. Creating seamless user experiences with attention to detail.',
      icon: '⚡',
      features: [
        'React / Next.js Development',
        'Angular Applications',
        'Responsive Design',
        'Performance Optimization',
      ],
      color: 'ruby' as const,
    },
    {
      title: 'Full-Stack Development',
      description: 'End-to-end application development from database design to deployment. Building scalable, secure, and maintainable systems.',
      icon: '🚀',
      features: [
        'API Development (Django, Laravel)',
        'Database Design (PostgreSQL, MySQL)',
        'Docker & DevOps',
        'Cloud Deployment',
      ],
      color: 'seagreen' as const,
    },
    {
      title: 'UI/UX Prototyping',
      description: 'Transforming ideas into intuitive interfaces. Creating user-centered designs that balance aesthetics with functionality.',
      icon: '🎨',
      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Design Systems',
        'Figma Expertise',
      ],
      color: 'skyblue' as const,
    },
    {
      title: 'API Development',
      description: 'Designing and building robust RESTful APIs. Ensuring secure, well-documented, and scalable backend solutions.',
      icon: '🔗',
      features: [
        'RESTful API Design',
        'Authentication & Security',
        'API Documentation',
        'Integration Services',
      ],
      color: 'fawn' as const,
    },
    {
      title: 'Technical Consulting',
      description: 'Providing expert guidance on technology stack selection, architecture design, and best practices implementation.',
      icon: '💡',
      features: [
        'Technology Stack Selection',
        'Architecture Review',
        'Code Quality Assessment',
        'Performance Audits',
      ],
      color: 'skyblue' as const,
    },
    {
      title: 'Educational Tech Systems',
      description: 'Building platforms for education and learning. Creating tools that empower students, teachers, and institutions.',
      icon: '🎓',
      features: [
        'Learning Management Systems',
        'Grade Management',
        'Student Portals',
        'Analytics & Reporting',
      ],
      color: 'ruby' as const,
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-fawn/10">
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
            Services & <span className="text-seagreen">Offerings</span>
          </h2>
          <div className="w-24 h-2 bg-seagreen border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant={service.color} className="h-full flex flex-col">
                {/* Icon */}
                <div className="text-5xl mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-onyx mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-700 mb-4 flex-grow">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-onyx mt-1">▸</span>
                      <span className="text-sm text-gray-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Card variant="default" className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-onyx mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-700 mb-6">
              Let&apos;s discuss how I can help bring your digital project to life.
            </p>
            <Button variant="primary" size="lg" href="#contact">
              Get In Touch
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
