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
    featured: true,
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
    featured: true,
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
