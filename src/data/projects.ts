export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  techStack: string[];
  problemSolved: string;
  impact: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'fullstack' | 'uiux';
}

export const projects: Project[] = [
  {
    id: 'comparer-app',
    title: 'Comparer Web App',
    description: 'A comprehensive comparison platform built with modern technologies for analyzing and comparing data efficiently.',
    role: 'Full-Stack Developer',
    techStack: ['Angular 19', 'Django', 'Docker', 'PostgreSQL', 'TailwindCSS'],
    problemSolved: 'Created a scalable solution for data comparison with real-time analytics and user-friendly interface.',
    impact: 'Improved data analysis efficiency by 60% and reduced comparison time from hours to minutes.',
    image: '/images/projects/comparer.jpg',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'sygenes',
    title: 'SYGENES School Management',
    description: 'Modern school management system with intuitive UI/UX design and comprehensive administrative features.',
    role: 'UI/UX Designer & Frontend Developer',
    techStack: ['React', 'Next.js', 'Figma', 'TailwindCSS'],
    problemSolved: 'Streamlined school administration processes with an intuitive and accessible interface.',
    impact: 'Reduced administrative workload by 40% and improved user satisfaction scores by 85%.',
    image: '/images/projects/sygenes.jpg',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
    category: 'web',
  },
  {
    id: 'maguida',
    title: 'Maguida.cm Search Engine',
    description: 'Intelligent search engine with AI-powered suggestions for enhanced user discovery experience.',
    role: 'Full-Stack Developer',
    techStack: ['Next.js', 'AI/ML', 'PostgreSQL', 'TailwindCSS'],
    problemSolved: 'Built an intelligent search system with natural language processing and smart recommendations.',
    impact: 'Increased search accuracy by 75% and user engagement by 50%.',
    image: '/images/projects/maguida.jpg',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'esign',
    title: 'ESIGN Exam Registration',
    description: 'Digital platform for exam registration and management with secure authentication and data handling.',
    role: 'Full-Stack Developer',
    techStack: ['Angular', 'Laravel', 'MySQL', 'Bootstrap'],
    problemSolved: 'Digitized the exam registration process, eliminating paper-based workflows.',
    impact: 'Processed 10,000+ registrations with zero errors and reduced processing time by 80%.',
    image: '/images/projects/esign.jpg',
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
    category: 'web',
  },
  {
    id: 'digital-signature',
    title: 'Digital Signature App',
    description: 'Desktop application for creating and managing digital signatures with modern UI redesign.',
    role: 'Frontend Developer',
    techStack: ['Python', 'Tkinter', 'Custom UI'],
    problemSolved: 'Redesigned legacy signature app with modern interface and improved usability.',
    impact: 'Increased user adoption by 120% and reduced signature creation time by 50%.',
    image: '/images/projects/signature.jpg',
    githubUrl: '#',
    featured: false,
    category: 'fullstack',
  },
  {
    id: 'wear-os-sickle-cell',
    title: 'Wear OS Sickle Cell Monitor',
    description: 'Wearable health monitoring app for sickle cell patients with real-time tracking and alerts.',
    role: 'Mobile Developer',
    techStack: ['Wear OS', 'Kotlin', 'Firebase', 'Health APIs'],
    problemSolved: 'Enabled continuous health monitoring for sickle cell patients through wearable technology.',
    impact: 'Helped 500+ patients track their health metrics and receive timely alerts.',
    image: '/images/projects/wearos.jpg',
    githubUrl: '#',
    featured: true,
    category: 'mobile',
  },
  {
    id: 'eduflex',
    title: 'EduFlex Grade Management',
    description: 'Comprehensive grade management platform for educational institutions with analytics and reporting.',
    role: 'Full-Stack Developer',
    techStack: ['Angular', 'Django', 'PostgreSQL', 'Chart.js'],
    problemSolved: 'Automated grade calculation and reporting processes for educational institutions.',
    impact: 'Managed grades for 5,000+ students and reduced grading errors by 95%.',
    image: '/images/projects/eduflex.jpg',
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
    category: 'fullstack',
  },
  {
    id: 'the-factory',
    title: 'The Factory Initiative',
    description: 'Digital skills platform empowering communities through technology education and mentorship.',
    role: 'Founder & Lead Developer',
    techStack: ['Next.js', 'Strapi CMS', 'PostgreSQL', 'TailwindCSS'],
    problemSolved: 'Created accessible platform for digital literacy and skills development in underserved communities.',
    impact: 'Trained 200+ individuals in digital skills and launched 15+ community projects.',
    image: '/images/projects/factory.jpg',
    liveUrl: '#',
    featured: true,
    category: 'web',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
