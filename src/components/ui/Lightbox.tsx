'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-onyx/90" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative z-10 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-3 bg-ruby text-white border-3 border-white shadow-brutal hover:shadow-brutal-lg transition-all font-bold text-xl"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Image Container */}
            <div className="bg-white border-5 border-white shadow-brutal-xl">
              <div className="relative w-full" style={{ minHeight: '300px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Info Section */}
              {(title || description) && (
                <div className="p-6 border-t-3 border-onyx bg-fawn/20">
                  {title && (
                    <h3 className="text-2xl font-bold text-onyx mb-2">{title}</h3>
                  )}
                  {description && (
                    <p className="text-gray-700">{description}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
