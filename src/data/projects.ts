/**
 * Projects: the language-neutral facts (name, client, dates, stack, links).
 * The words for each project live in src/content/projects.en.ts and
 * src/content/projects.fr.ts, keyed by slug. Each project gets a page at
 * /<lang>/work/<slug>.
 *
 * Images: drop files in /public/work/ and set `cover: "/work/<file>.jpg"`.
 * Without a cover, the project's system blueprint is shown instead.
 */
export type Category = "web" | "mobile" | "embedded";

export interface ProjectMeta {
  slug: string;
  title: string;
  /** Who it was for. Translated through the `clients` table in the dictionaries. */
  client?: string;
  year?: string;
  stack: string[];
  category: Category;
  /** Flagship projects, shown on the home page. */
  featured?: boolean;
  cover?: string;
  links?: { label: string; href: string }[];
}

export const projects: ProjectMeta[] = [
  {
    slug: "maguida",
    title: "Maguida.cm",
    client: "Richenel's AI Agency",
    year: "2024 – 2025",
    stack: [
      "Next.js",
      "AI integration",
      "REST APIs"
    ],
    category: "web",
    featured: true
  },
  {
    slug: "restore-forest-cameroon",
    title: "Restore Forest Cameroon",
    client: "Freelance",
    year: "2023 – 2025",
    stack: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "Data visualisation"
    ],
    category: "web",
    featured: true
  },
  {
    slug: "memento",
    title: "Memento",
    client: "Personal project",
    year: "2026",
    stack: [
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Vercel"
    ],
    category: "web",
    links: [
      {
        label: "memento-wall.vercel.app",
        href: "https://memento-wall.vercel.app"
      }
    ]
  },
  {
    slug: "tomo",
    title: "Tomo",
    client: "Personal project",
    year: "2025",
    stack: [
      "Django",
      "PostGIS",
      "Angular",
      "Ionic / Capacitor",
      "Redis"
    ],
    category: "web",
    featured: true
  },
  {
    slug: "sygenes",
    title: "SYGENES",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2024 – 2025",
    stack: [
      "Symfony",
      "JavaScript",
      "Tailwind CSS",
      "HTML / CSS"
    ],
    category: "web",
    featured: true,
    cover: "/work/sygenes.jpg",
    links: [
      {
        label: "sygenes.esign.cm",
        href: "https://www.sygenes.esign.cm"
      }
    ]
  },
  {
    slug: "hemowatch",
    title: "Hemowatch",
    client: "Freelance",
    year: "2025",
    stack: [
      "Flutter",
      "Wear OS",
      "Health sensors"
    ],
    category: "mobile",
    featured: true
  },
  {
    slug: "global-english-institute",
    title: "Global English Institute",
    client: "Personal project",
    year: "2026",
    stack: [
      "Angular 18",
      "Supabase",
      "Tailwind CSS",
      "Resend"
    ],
    category: "web",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BrandonT-ops/Easy_learning_platform"
      }
    ]
  },
  {
    slug: "laboussole",
    title: "Laboussole E-Learning",
    client: "Richenel's AI Agency",
    year: "2024 – 2025",
    stack: [
      "Web",
      "Authentication",
      "Responsive UI"
    ],
    category: "web",
    cover: "/work/laboussole.jpg",
    links: [
      {
        label: "learn.laboussole-edu.com",
        href: "https://learn.laboussole-edu.com"
      }
    ]
  },
  {
    slug: "comparer",
    title: "Sondy Comparator",
    client: "Freelance",
    year: "2025",
    stack: [
      "Angular 19",
      "Tailwind CSS",
      "Django"
    ],
    category: "web",
    featured: true,
    cover: "/work/comparer.jpg",
    links: [
      {
        label: "sondy-comparator.vercel.app",
        href: "https://sondy-comparator.vercel.app"
      }
    ]
  },
  {
    slug: "autofish",
    title: "Autofish",
    client: "Autofish",
    year: "2025",
    stack: [
      "Django",
      "PostgreSQL",
      "REST APIs",
      "Hostinger VPS"
    ],
    category: "web"
  },
  {
    slug: "esign-registration",
    title: "ESIGN Registration Platform",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2023 – 2025",
    stack: [
      "Figma",
      "Symfony",
      "Responsive UI"
    ],
    category: "web",
    cover: "/work/esign-registration.jpg",
    links: [
      {
        label: "esign.cm",
        href: "https://esign.cm"
      }
    ]
  },
  {
    slug: "medical-school-file-manager",
    title: "Medical School File Manager",
    client: "Personal project",
    year: "2025",
    stack: [
      "Laravel",
      "PHP",
      "MySQL",
      "Google Drive API"
    ],
    category: "web",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BrandonT-ops/Medical-School-File-Manager"
      }
    ]
  },
  {
    slug: "eduflex",
    title: "EduFlex",
    stack: [
      "Web",
      "PostgreSQL"
    ],
    category: "web"
  },
  {
    slug: "fauna-pulse",
    title: "Fauna Pulse",
    client: "Freelance",
    year: "2025",
    stack: [
      "Flutter",
      "Supabase",
      "LLaMA API",
      "Sensors"
    ],
    category: "mobile"
  },
  {
    slug: "smart-haven",
    title: "Smart Haven",
    client: "Freelance",
    year: "2024 – 2025",
    stack: [
      "Flutter",
      "Supabase",
      "LLaMA API",
      "Sensors"
    ],
    category: "mobile"
  },
  {
    slug: "smart-fire-detection",
    title: "Smart Fire Detection System",
    client: "KBH Engineering Challenge 2024",
    year: "2024",
    stack: [
      "Embedded software",
      "Wireless sensor networks",
      "Wi-Fi / Bluetooth"
    ],
    category: "embedded"
  },
  {
    slug: "autogex",
    title: "Autogex",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2023",
    stack: [
      "Java",
      "Scrum"
    ],
    category: "embedded"
  },
  {
    slug: "pras",
    title: "PRAS: Protect, Automate & Save Energy",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2021 – 2023",
    stack: [
      "Python",
      "WebSockets",
      "Machine learning",
      "Sensors"
    ],
    category: "embedded",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BrandonT-ops/pras_formatted_code"
      }
    ]
  },
  {
    slug: "smart-point",
    title: "Smart Point",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2020 – 2021",
    stack: [
      "Embedded systems",
      "Hardware"
    ],
    category: "embedded"
  },
  {
    slug: "digital-signature",
    title: "Digital Signature App",
    stack: [
      "Python",
      "Tkinter"
    ],
    category: "embedded"
  }
];

export const flagships = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
