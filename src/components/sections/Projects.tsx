'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { projects, type Project } from '@/data/projects';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((project) => project.category === filter);

  const filters = [
    { label: 'All', value: 'all' as const },
    { label: 'Full-Stack', value: 'fullstack' as const },
    { label: 'Web', value: 'web' as const },
    { label: 'Mobile', value: 'mobile' as const },
    { label: 'UI/UX', value: 'uiux' as const },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-onyx mb-4">
            Featured <span className="text-ruby">Projects</span>
          </h2>
          <div className="w-24 h-2 bg-ruby border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            A showcase of real-world solutions that make an impact
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filterItem) => (
            <button
              key={filterItem.value}
              onClick={() => setFilter(filterItem.value)}
              className={`px-6 py-3 font-bold uppercase text-sm border-3 border-onyx transition-all duration-200 ${
                filter === filterItem.value
                  ? 'bg-ruby text-white shadow-brutal'
                  : 'bg-white text-onyx shadow-brutal-sm hover:shadow-brutal'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                variant={project.featured ? 'ruby' : 'default'}
                hoverable
                className="h-full flex flex-col"
              >
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-skyblue/30 to-seagreen/30 border-3 border-onyx mb-4 flex items-center justify-center">
                  <span className="text-6xl">
                    {project.category === 'mobile' ? '📱' :
                     project.category === 'uiux' ? '🎨' :
                     project.category === 'fullstack' ? '🚀' : '💻'}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-ruby text-white text-xs font-bold uppercase border-2 border-onyx">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Title */}
                <h3 className="text-xl font-bold text-onyx mb-3">{project.title}</h3>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 flex-grow">{project.description}</p>

                {/* Role */}
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-600 uppercase">Role:</span>
                  <span className="text-sm text-gray-800 ml-2">{project.role}</span>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-fawn/30 border-2 border-onyx text-xs font-bold text-onyx"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 border-2 border-onyx text-xs font-bold text-onyx">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex-1 px-4 py-2 bg-onyx text-white text-center text-sm font-bold border-3 border-onyx shadow-brutal-sm hover:shadow-brutal transition-all"
                    >
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex-1 px-4 py-2 bg-seagreen text-white text-center text-sm font-bold border-3 border-onyx shadow-brutal-sm hover:shadow-brutal transition-all"
                    >
                      Live
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
