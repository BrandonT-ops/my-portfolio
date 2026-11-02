/**
 * Projects. Each one gets a case-study page at /work/<slug>.
 *
 * Content below is a starting draft written from the project briefs —
 * review every line and add real outcomes. `outcome` is optional and the
 * section is hidden until you fill it in, so nothing invented ever shows.
 *
 * Images: drop files in /public/work/ and set `cover: "/work/<file>.jpg"`.
 * Without a cover, a typographic placeholder is shown.
 */
export interface Project {
  slug: string;
  title: string;
  /** One sentence, shown in lists. */
  summary: string;
  role: string;
  stack: string[];
  year?: string;
  /** Featured projects appear as cards on the home page; others in the index list. */
  featured?: boolean;
  cover?: string;
  links?: { label: string; href: string }[];
  /** Case-study body. */
  context: string;
  approach: string[];
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: "memento",
    title: "Memento",
    summary: "A shared photo wall where members post, browse and moderate pictures.",
    role: "Full-stack developer & designer",
    stack: ["Vite", "Supabase", "PostgreSQL", "Vercel"],
    year: "2026",
    featured: true,
    links: [{ label: "memento-gold-mu.vercel.app", href: "https://memento-gold-mu.vercel.app" }],
    context:
      "A community needed one place to collect and share its pictures, with sign-in so members own their posts and a way to keep the public wall clean.",
    approach: [
      "Built sign-in with email links and Google through Supabase Auth.",
      "Designed a public wall plus a personal page for each member's own pictures.",
      "Added an admin moderation area, with access enforced in the database by row-level security rules.",
      "Created two looks that follow the device theme: “Magazine” in light mode and “Gallery” in dark mode.",
    ],
  },
  {
    slug: "tomo",
    title: "Tomo",
    summary: "A ride-hailing platform built for Cameroon, with mobile-money payments.",
    role: "Full-stack developer & architect",
    stack: ["Django", "PostGIS", "Angular", "Ionic / Capacitor", "Redis"],
    year: "2025",
    featured: true,
    context:
      "Getting a safe, fairly priced ride in Cameroon often means negotiating on the street. Riders and drivers needed a local app that works with how people actually pay.",
    approach: [
      "Designed the backend as Django apps for users, drivers, vehicles, rides, ratings, payments and notifications.",
      "Used PostGIS to find nearby drivers, and Django Channels with Redis for live ride updates.",
      "Supported cash, MTN Mobile Money and Orange Money, with a wallet and commission tracking.",
      "Added safety features: QR-code driver verification, an SOS button and two-way ratings.",
      "Built the web and mobile apps with Angular and Ionic/Capacitor, in English and French.",
    ],
  },
  {
    slug: "global-english-institute",
    title: "Global English Institute",
    summary: "A language-school website with an online placement test and sign-ups.",
    role: "Full-stack developer",
    stack: ["Angular 18", "Supabase", "Tailwind CSS", "Resend"],
    year: "2026",
    featured: true,
    links: [{ label: "GitHub", href: "https://github.com/BrandonT-ops/Easy_learning_platform" }],
    context:
      "The institute handled placement tests and registrations by hand, so prospective students waited and staff re-typed the same details.",
    approach: [
      "Built the public site with program pages, contact details and legal pages.",
      "Created an online placement test whose results are stored in Supabase.",
      "Sent registration and test confirmation emails from Supabase Edge Functions using Resend.",
      "Gave staff an admin dashboard for tests, registrations, testimonials and site settings.",
    ],
  },
  {
    slug: "medical-school-file-manager",
    title: "Medical School File Manager",
    summary: "A file system for a medical school, with nested folders and role-based access.",
    role: "Full-stack developer",
    stack: ["Laravel", "PHP", "MySQL", "Google Drive API"],
    year: "2025",
    featured: true,
    links: [{ label: "GitHub", href: "https://github.com/BrandonT-ops/Medical-School-File-Manager" }],
    context:
      "Course material was scattered across chats and personal drives, with no way to organise it by academic year or control who could change what.",
    approach: [
      "Organised files in unlimited nested folders, grouped by academic level (years 1–7).",
      "Defined roles for admins, level moderators, folder owners and standard users.",
      "Made storage swappable between the local server and Google Drive through configuration.",
      "Added archiving and restore, school branding settings and a statistics dashboard, all in a neo-brutalist interface.",
    ],
  },
  {
    slug: "comparer",
    title: "Comparer",
    summary: "A comparison web app with an Angular frontend and a containerised Django API.",
    role: "Full-stack developer",
    stack: ["Angular", "Django", "PostgreSQL", "Docker"],
    featured: true,
    context:
      "Users needed a single place to compare options side by side instead of juggling tabs and spreadsheets.",
    approach: [
      "Designed the comparison flow and component library in Angular.",
      "Built a Django REST API backed by PostgreSQL.",
      "Containerised the stack with Docker for consistent local and production environments.",
    ],
  },
  {
    slug: "maguida",
    title: "Maguida.cm",
    summary: "A Next.js search engine with AI-assisted suggestions.",
    role: "Full-stack developer",
    stack: ["Next.js", "LLM integration", "PostgreSQL"],
    featured: true,
    links: [{ label: "maguida.cm", href: "https://maguida.cm" }],
    context:
      "Local search results were hard to discover; people needed help phrasing what they were looking for.",
    approach: [
      "Built the search experience in Next.js with server-rendered results for speed and SEO.",
      "Integrated a language model to suggest and refine queries as people type.",
    ],
  },
  {
    slug: "sygenes",
    title: "SYGENES",
    summary: "UI/UX and frontend for a school management system.",
    role: "UI/UX designer & frontend developer",
    stack: ["Figma", "Frontend", "Design system"],
    context:
      "School administration ran on fragmented tools; staff needed one clear interface for daily work.",
    approach: [
      "Mapped the main administrative workflows with staff and turned them into Figma flows.",
      "Built a reusable UI component system and implemented the frontend from it.",
    ],
  },
  {
    slug: "wear-os-sickle-cell",
    title: "Sickle Cell Monitor",
    summary: "A Wear OS app for monitoring people living with sickle cell disease.",
    role: "Mobile developer",
    stack: ["Wear OS", "Kotlin", "Firebase"],
    context:
      "Early warning signs of a crisis are easy to miss day to day; a watch is always on the wrist.",
    approach: [
      "Designed a glanceable interface for the small round screen.",
      "Collected readings on the watch and synced them to Firebase.",
    ],
  },
  {
    slug: "esign-registration",
    title: "ESIGN Exam Registration",
    summary: "An online platform for exam registration.",
    role: "Full-stack developer",
    stack: ["Web", "Database"],
    context: "Exam registration was a paper process with long queues and manual data entry.",
    approach: ["Built an online registration flow with validation and an admin view of submissions."],
  },
  {
    slug: "eduflex",
    title: "EduFlex",
    summary: "A grade management platform for schools.",
    role: "Full-stack developer",
    stack: ["Web", "PostgreSQL"],
    context: "Teachers were computing and reporting grades by hand.",
    approach: ["Built grade entry, automatic calculation and report generation."],
  },
  {
    slug: "digital-signature",
    title: "Digital Signature App",
    summary: "A redesign of a desktop digital-signature tool built with Tkinter.",
    role: "UI redesign",
    stack: ["Python", "Tkinter"],
    context: "The existing desktop tool worked but was hard to use.",
    approach: ["Redesigned the interface and interaction flow within Tkinter's constraints."],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
