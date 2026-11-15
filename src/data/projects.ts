/**
 * Projects. Each one gets a case-study page at /work/<slug>.
 *
 * Sources: Brandon's CVs (2025/2026), his GitHub repositories and past work
 * sessions. Figures in `outcome` come from the CVs; `outcome` is optional and
 * the section is hidden when it is empty, so nothing invented ever shows.
 *
 * Images: drop files in /public/work/ and set `cover: "/work/<file>.jpg"`.
 * Without a cover, a typographic placeholder is shown.
 */
export type Category = "web" | "mobile" | "embedded";

export const CATEGORY_LABEL: Record<Category, string> = {
  web: "Web platforms",
  mobile: "Mobile & IoT apps",
  embedded: "Embedded, desktop & academic",
};

export interface Project {
  slug: string;
  title: string;
  /** One sentence, shown in lists. */
  summary: string;
  role: string;
  /** Who it was for: an employer, a school, or "Freelance" / "Personal project". */
  client?: string;
  /** e.g. "2024 – 2025" or "2025". */
  year?: string;
  stack: string[];
  category: Category;
  /** Featured projects appear as large cards on the home page; others in the grouped list. */
  featured?: boolean;
  cover?: string;
  links?: { label: string; href: string }[];
  /** A short note when the project is no longer online, shown on the case study. */
  status?: string;
  /** Case-study body. */
  context: string;
  approach: string[];
  outcome?: string;
  /** The hard parts, in Brandon's own account: what made it difficult and what the team did. */
  challenges?: { title: string; problem: string; solution: string }[];
}

export const projects: Project[] = [
  /* ---------- Featured ---------- */
  {
    slug: "maguida",
    title: "Maguida.cm",
    summary: "An AI-integrated product search engine that gives shoppers personalised buying advice.",
    role: "Frontend developer",
    client: "Richenel's AI Agency",
    year: "2024 – 2025",
    stack: ["Next.js", "AI integration", "REST APIs"],
    category: "web",
    featured: true,
    status: "No longer online: the agency ended its hosting.",
    context:
      "Shoppers in Cameroon had no easy way to search across local products and get advice on what to buy.",
    approach: [
      "Built the frontend in Next.js with a responsive interface for searching and browsing 400+ products.",
      "Integrated AI features that give personalised purchasing advice.",
      "Server-rendered key pages with Next.js so search engines could index them.",
      "Worked with the backend team to cache responses and keep search and AI recommendations fast.",
      "Built a library of reusable components to keep the codebase lean and ready for future updates.",
    ],
    outcome:
      "Serves 200+ monthly users. Customer satisfaction rose by about 10%, data processing time dropped by 20%, and reusable components cut frontend development time by 25%.",
    challenges: [
      {
        title: "Getting backend-driven pages onto Google",
        problem:
          "Every page was assembled from data the backend sent on request. A search engine visiting the site found very little to index, so individual pages could not be found on Google.",
        solution:
          "We rendered pages on the server with Next.js, so the content is already in the page when a crawler arrives. There were too many pages to do this for all of them, so we server-rendered the home page, the most popular products and the categories, and left the rest to load in the browser.",
      },
      {
        title: "Keeping the interface in step with a slow backend",
        problem:
          "Search results and AI advice arrived late, so the interface often waited on the backend and the two fell out of step.",
        solution:
          "We worked on it from both sides: the frontend kept some responses for reuse instead of asking again, and we added caching with the backend team.",
      },
    ],
  },
  {
    slug: "restore-forest-cameroon",
    title: "Restore Forest Cameroon",
    summary: "A reforestation platform for managing forest resources and tracking progress across Cameroon.",
    role: "Frontend developer",
    client: "Freelance",
    year: "2023 – 2025",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Data visualisation"],
    category: "web",
    featured: true,
    context:
      "Reforestation teams needed one place to record forest resources and see how replanting was going region by region.",
    approach: [
      "Built the Angular frontend on top of a Spring Boot and PostgreSQL backend.",
      "Created interactive forms for entering and managing forest resource records.",
      "Added data visualisations showing reforestation progress and tree-species distribution across 10 regions.",
      "Optimised API communication between frontend and backend, using reusable Angular components.",
    ],
    outcome:
      "Manages 100,000+ forest resource entries. Data entry became 30% faster, data fetch times fell by 40%, and reusable components cut development time by 25%.",
  },
  {
    slug: "memento",
    title: "Memento",
    summary: "A shared photo wall where members post, browse and moderate pictures.",
    role: "Full-stack developer & designer",
    client: "Personal project",
    year: "2026",
    stack: ["Vite", "Supabase", "PostgreSQL", "Vercel"],
    category: "web",
    featured: true,
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
    client: "Personal project",
    year: "2025",
    stack: ["Django", "PostGIS", "Angular", "Ionic / Capacitor", "Redis"],
    category: "web",
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
    slug: "sygenes",
    title: "SYGENES",
    summary: "ESIGN's digital grade management system for higher education.",
    role: "Frontend lead",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2024 – 2025",
    stack: ["Symfony", "JavaScript", "Tailwind CSS", "HTML / CSS"],
    cover: "/work/sygenes.jpg",
    category: "web",
    featured: true,
    links: [{ label: "sygenes.esign.cm", href: "https://www.sygenes.esign.cm" }],
    context:
      "The school managed grades through scattered spreadsheets; staff and students needed one clear, reliable system.",
    approach: [
      "Led frontend development of a user-centred grade management system.",
      "Built responsive interfaces with HTML, CSS, JavaScript and Tailwind CSS.",
      "Used a component-based architecture that talks to the Symfony backend through service calls.",
      "Added theme customisation, dynamic notifications and two-step delete confirmation.",
      "Wrote system documentation and kept improving the product from user feedback.",
    ],
  },
  {
    slug: "hemowatch",
    title: "Hemowatch",
    summary: "A phone and Wear OS watch app that monitors people living with sickle cell disease.",
    role: "Mobile developer",
    client: "Freelance",
    year: "2025",
    stack: ["Flutter", "Wear OS", "Health sensors"],
    category: "mobile",
    featured: true,
    context:
      "Early warning signs of a sickle cell crisis are easy to miss day to day, but a watch is always on the wrist.",
    approach: [
      "Built a mobile app that collects health data in real time from Wear OS devices.",
      "Read heart rate, oxygen saturation, respiratory rate and body temperature from the watch's sensors.",
      "Designed a Flutter interface showing live health metrics.",
      "Added automatic alerts when readings cross set thresholds.",
    ],
  },

  /* ---------- Web platforms ---------- */
  {
    slug: "global-english-institute",
    title: "Global English Institute",
    summary: "A language-school website with an online placement test and sign-ups.",
    role: "Full-stack developer",
    client: "Personal project",
    year: "2026",
    stack: ["Angular 18", "Supabase", "Tailwind CSS", "Resend"],
    category: "web",
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
    slug: "laboussole",
    title: "Laboussole E-Learning",
    summary: "A responsive e-learning platform with multimedia courses and progress tracking.",
    role: "Software developer",
    client: "Richenel's AI Agency",
    year: "2024 – 2025",
    stack: ["Web", "Authentication", "Responsive UI"],
    cover: "/work/laboussole.jpg",
    category: "web",
    links: [{ label: "learn.laboussole-edu.com", href: "https://learn.laboussole-edu.com" }],
    context: "Learners needed courses they could follow on any device, with their progress saved.",
    approach: [
      "Designed and built core features: multimedia courses, user authentication and progress tracking.",
      "Worked with a multidisciplinary team on feature planning, testing and iterative improvements.",
      "Optimised the UI for cross-platform use, engagement and accessibility.",
    ],
  },
  {
    slug: "comparer",
    title: "Sondy Comparator",
    summary: "A product and service comparison platform with search and filtering.",
    role: "Frontend developer",
    client: "Freelance",
    year: "2025",
    stack: ["Angular 19", "Tailwind CSS", "Django"],
    cover: "/work/comparer.jpg",
    category: "web",
    featured: true,
    links: [{ label: "sondy-comparator.vercel.app", href: "https://sondy-comparator.vercel.app" }],
    context:
      "People needed one place to compare products and services side by side instead of juggling tabs and spreadsheets.",
    approach: [
      "Built the responsive, mobile-first frontend with Angular 19 and Tailwind CSS.",
      "Designed interactive components for searching, filtering and comparing.",
      "Integrated with a Django backend to display live product data.",
    ],
  },
  {
    slug: "autofish",
    title: "Autofish",
    summary: "The backend and API for the AutoFish platform, deployed on a VPS.",
    role: "Backend developer",
    client: "Autofish",
    year: "2025",
    stack: ["Django", "PostgreSQL", "REST APIs", "Hostinger VPS"],
    category: "web",
    context: "The AutoFish platform needed a reliable backend and API for its apps to build on.",
    approach: [
      "Built the backend in Django, with the core business logic and API endpoints.",
      "Designed and managed the PostgreSQL schema for data integrity and fast queries.",
      "Implemented secure user authentication and data handling.",
      "Deployed to a Hostinger VPS with production settings, and maintained the deployment pipeline.",
    ],
  },
  {
    slug: "esign-registration",
    title: "ESIGN Registration Platform",
    summary: "The online registration platform for ESIGN's competitive entrance exam.",
    role: "Frontend developer & designer",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2023 – 2025",
    stack: ["Figma", "Symfony", "Responsive UI"],
    cover: "/work/esign-registration.jpg",
    category: "web",
    links: [{ label: "esign.cm", href: "https://esign.cm" }],
    context: "Entrance-exam registration was a paper process with queues and manual data entry.",
    approach: [
      "Designed the interface in Figma and built a responsive frontend for mobile, tablet and desktop.",
      "Implemented automatic receipt generation for each completed registration.",
      "Worked with the backend team on data flow and optimised API integration.",
    ],
    outcome:
      "Supported 400+ exam candidates with 99.9% uptime during peak registration, and cut registration time by 15%.",
  },
  {
    slug: "medical-school-file-manager",
    title: "Medical School File Manager",
    summary: "A file system for a medical school, with nested folders and role-based access.",
    role: "Full-stack developer",
    client: "Personal project",
    year: "2025",
    stack: ["Laravel", "PHP", "MySQL", "Google Drive API"],
    category: "web",
    links: [{ label: "GitHub", href: "https://github.com/BrandonT-ops/Medical-School-File-Manager" }],
    context:
      "Course material was scattered across chats and personal drives, with no way to organise it by academic year or control who could change what.",
    approach: [
      "Organised files in unlimited nested folders, grouped by academic level (years 1–7).",
      "Defined roles for admins, level moderators, folder owners and standard users.",
      "Made storage swappable between the local server and Google Drive through configuration.",
      "Added archiving and restore, school branding settings and a statistics dashboard.",
    ],
  },
  {
    slug: "eduflex",
    title: "EduFlex",
    summary: "A grade management platform for schools.",
    role: "Full-stack developer",
    stack: ["Web", "PostgreSQL"],
    category: "web",
    context: "Teachers were computing and reporting grades by hand.",
    approach: ["Built grade entry, automatic calculation and report generation."],
  },

  /* ---------- Mobile & IoT ---------- */
  {
    slug: "fauna-pulse",
    title: "Fauna Pulse",
    summary: "A Flutter app that helps farmers monitor soil health and crop conditions.",
    role: "Mobile developer",
    client: "Freelance",
    year: "2025",
    stack: ["Flutter", "Supabase", "LLaMA API", "Sensors"],
    category: "mobile",
    context: "Farmers needed to see soil and crop conditions without walking every field.",
    approach: [
      "Built a Flutter app that displays sensor readings on soil activity and the growing environment.",
      "Stored and retrieved sensor data through a Supabase backend.",
      "Connected to the LLaMA API for AI-powered insights and in-app help.",
      "Designed dashboards that show real-time soil health at a glance.",
    ],
  },
  {
    slug: "smart-haven",
    title: "Smart Haven",
    summary: "A Flutter app that monitors poultry health and coop conditions in real time.",
    role: "Mobile developer",
    client: "Freelance",
    year: "2024 – 2025",
    stack: ["Flutter", "Supabase", "LLaMA API", "Sensors"],
    category: "mobile",
    context: "Poultry farmers lose birds when temperature, humidity or health problems go unnoticed.",
    approach: [
      "Built a Flutter app for real-time monitoring of poultry health and environmental conditions.",
      "Used Supabase for data storage, live updates and history of sensor readings.",
      "Added a LLaMA-powered assistant for analysis and questions.",
      "Showed health metrics, environmental factors and automatic alerts in one interface.",
    ],
  },

  /* ---------- Embedded & engineering school ---------- */
  {
    slug: "smart-fire-detection",
    title: "Smart Fire Detection System",
    summary: "Embedded software for real-time fire detection over a wireless sensor network.",
    role: "Embedded software developer",
    client: "KBH Engineering Challenge 2024",
    year: "2024",
    stack: ["Embedded software", "Wireless sensor networks", "Wi-Fi / Bluetooth"],
    category: "embedded",
    context: "Fires spread fast when nobody is close enough to notice smoke or rising heat.",
    approach: [
      "Programmed sensor modules for smoke, temperature and gas, with threshold-based alerts.",
      "Designed the communication protocol between sensors and the central monitoring unit.",
      "Integrated Wi-Fi and Bluetooth modules for remote monitoring and timely alerts.",
      "Tested and debugged for accurate detection and stable connectivity.",
    ],
  },
  {
    slug: "autogex",
    title: "Autogex",
    summary: "A Java regular-expression tool, built by a 15-person team using Scrum.",
    role: "Scrum lead & developer",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2023",
    stack: ["Java", "Scrum"],
    category: "embedded",
    context: "A school software project run like a real product team, with sprints and user stories.",
    approach: [
      "Managed a team of 15 people through the build using Scrum.",
      "Wrote the specifications and user stories; planned and ran 3 sprints.",
      "Implemented the module that cleans regular expressions by removing redundancies and mistakes.",
    ],
  },
  {
    slug: "pras",
    title: "PRAS: Protect, Automate & Save Energy",
    summary: "A smart-home hub that controls household devices from sensor data and a machine-learning model.",
    role: "Software developer",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2021 – 2023",
    stack: ["Python", "WebSockets", "Machine learning", "Sensors"],
    category: "embedded",
    links: [{ label: "GitHub", href: "https://github.com/BrandonT-ops/pras_formatted_code" }],
    context: "Households waste energy and miss safety issues when nobody is watching their devices.",
    approach: [
      "Built the central control software in Python to manage household equipment and sensor data.",
      "Connected the hub to a web server over HTTP and WebSockets for real-time data.",
      "Integrated four environmental sensors for monitoring and automatic control.",
      "Deployed a machine-learning model on the hub to improve automation decisions.",
    ],
  },
  {
    slug: "smart-point",
    title: "Smart Point",
    summary: "An embedded system with five peripheral devices, built by a team of five.",
    role: "Embedded developer",
    client: "International Advanced School of Digital Engineering (ESIGN)",
    year: "2020 – 2021",
    stack: ["Embedded systems", "Hardware"],
    category: "embedded",
    context: "A first-year engineering project covering both the software and the physical build.",
    approach: [
      "Designed, implemented and tested the software for the system's 5 peripheral devices.",
      "Helped fabricate the hardware and wire its electrical connections.",
    ],
  },
  {
    slug: "digital-signature",
    title: "Digital Signature App",
    summary: "A redesign of a desktop digital-signature tool built with Tkinter.",
    role: "UI redesign",
    stack: ["Python", "Tkinter"],
    category: "embedded",
    context: "The existing desktop tool worked but was hard to use.",
    approach: ["Redesigned the interface and interaction flow within Tkinter's constraints."],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
