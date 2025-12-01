'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '@/components/ui/Lightbox';
import { galleryImages, categoryLabels, type GalleryCategory } from '@/data/gallery';

const Photography: React.FC = () => {
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter((image) => image.category === filter);

  const categories: Array<{ label: string; value: 'all' | GalleryCategory }> = [
    { label: 'All', value: 'all' },
    ...Object.entries(categoryLabels).map(([value, label]) => ({
      label,
      value: value as GalleryCategory,
    })),
  ];

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <section id="photography" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-skyblue/10 to-seagreen/10">
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
            Photography & <span className="text-skyblue">Creative</span>
          </h2>
          <div className="w-24 h-2 bg-skyblue border-3 border-onyx shadow-brutal-sm mx-auto" />
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Beyond engineering, I explore visual storytelling through photography. Here&apos;s a growing collection of my work.
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
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-6 py-3 font-bold uppercase text-sm border-3 border-onyx transition-all duration-200 ${
                filter === category.value
                  ? 'bg-skyblue text-white shadow-brutal'
                  : 'bg-white text-onyx shadow-brutal-sm hover:shadow-brutal'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden border-3 border-onyx shadow-brutal hover:shadow-brutal-lg transition-all duration-300 bg-white">
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-skyblue/30 to-fawn/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-6xl">
                    {image.category === 'portraits' ? '👤' :
                     image.category === 'nature' ? '🌿' :
                     image.category === 'street' ? '🏙️' :
                     image.category === 'events' ? '🎉' :
                     image.category === 'abstract' ? '🎨' : '📷'}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-onyx/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <p className="text-fawn text-sm">{image.description}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-white border-2 border-onyx text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {categoryLabels[image.category]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No images found in this category.</p>
          </div>
        )}

        {/* Note about images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 bg-fawn border-3 border-onyx shadow-brutal">
            <p className="text-sm text-onyx">
              <strong>Note:</strong> Images are placeholders. Replace with your actual photography by updating <code className="font-mono text-xs">src/data/gallery.ts</code>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={selectedImage.url}
          imageAlt={selectedImage.title}
          title={selectedImage.title}
          description={selectedImage.description}
        />
      )}
    </section>
  );
};

export default Photography;
