export type GalleryCategory = 'portraits' | 'nature' | 'street' | 'events' | 'abstract' | 'tech';

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  url: string;
  thumbnail?: string;
}

export const galleryImages: GalleryImage[] = [
  // Portraits
  {
    id: 'portrait-1',
    title: 'Urban Portrait',
    description: 'Capturing the essence of city life through portraiture',
    category: 'portraits',
    url: '/images/gallery/portrait-1.jpg',
  },
  {
    id: 'portrait-2',
    title: 'Golden Hour',
    description: 'Natural light portrait during golden hour',
    category: 'portraits',
    url: '/images/gallery/portrait-2.jpg',
  },
  {
    id: 'portrait-3',
    title: 'Studio Session',
    description: 'Professional studio portrait with dramatic lighting',
    category: 'portraits',
    url: '/images/gallery/portrait-3.jpg',
  },

  // Nature
  {
    id: 'nature-1',
    title: 'Mountain Vista',
    description: 'Breathtaking mountain landscape at sunrise',
    category: 'nature',
    url: '/images/gallery/nature-1.jpg',
  },
  {
    id: 'nature-2',
    title: 'Ocean Waves',
    description: 'Capturing the power and beauty of the ocean',
    category: 'nature',
    url: '/images/gallery/nature-2.jpg',
  },
  {
    id: 'nature-3',
    title: 'Forest Path',
    description: 'Serene forest trail in morning light',
    category: 'nature',
    url: '/images/gallery/nature-3.jpg',
  },

  // Street
  {
    id: 'street-1',
    title: 'City Nights',
    description: 'Urban nightlife and street photography',
    category: 'street',
    url: '/images/gallery/street-1.jpg',
  },
  {
    id: 'street-2',
    title: 'Market Life',
    description: 'Vibrant scenes from local markets',
    category: 'street',
    url: '/images/gallery/street-2.jpg',
  },
  {
    id: 'street-3',
    title: 'Urban Architecture',
    description: 'Modern architecture meets street photography',
    category: 'street',
    url: '/images/gallery/street-3.jpg',
  },

  // Events
  {
    id: 'event-1',
    title: 'Tech Conference',
    description: 'Capturing moments from technology events',
    category: 'events',
    url: '/images/gallery/event-1.jpg',
  },
  {
    id: 'event-2',
    title: 'Community Gathering',
    description: 'Local community events and celebrations',
    category: 'events',
    url: '/images/gallery/event-2.jpg',
  },
  {
    id: 'event-3',
    title: 'Workshop Session',
    description: 'Educational workshops and training events',
    category: 'events',
    url: '/images/gallery/event-3.jpg',
  },

  // Abstract
  {
    id: 'abstract-1',
    title: 'Light Patterns',
    description: 'Abstract light and shadow compositions',
    category: 'abstract',
    url: '/images/gallery/abstract-1.jpg',
  },
  {
    id: 'abstract-2',
    title: 'Color Theory',
    description: 'Exploring color and form',
    category: 'abstract',
    url: '/images/gallery/abstract-2.jpg',
  },
  {
    id: 'abstract-3',
    title: 'Geometric',
    description: 'Geometric patterns in urban environments',
    category: 'abstract',
    url: '/images/gallery/abstract-3.jpg',
  },

  // Tech/Product
  {
    id: 'tech-1',
    title: 'Product Photography',
    description: 'Tech product showcases and documentation',
    category: 'tech',
    url: '/images/gallery/tech-1.jpg',
  },
  {
    id: 'tech-2',
    title: 'Workspace',
    description: 'Modern tech workspace photography',
    category: 'tech',
    url: '/images/gallery/tech-2.jpg',
  },
  {
    id: 'tech-3',
    title: 'Innovation',
    description: 'Capturing technology and innovation',
    category: 'tech',
    url: '/images/gallery/tech-3.jpg',
  },
];

export const categoryLabels: Record<GalleryCategory, string> = {
  portraits: 'Portraits',
  nature: 'Nature',
  street: 'Street',
  events: 'Events',
  abstract: 'Abstract',
  tech: 'Tech/Product',
};
