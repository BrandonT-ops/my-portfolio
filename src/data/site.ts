/**
 * Site-wide content. Edit this file to update your details everywhere.
 */
export const site = {
  name: "Brandon Tapiba",
  role: "Digital Systems Engineer",
  url: "https://brandontapiba.vercel.app",
  location: "Yaoundé, Cameroon",
  email: "brandontapiba@gmail.com",

  /** One-line positioning shown under the name in the hero. */
  tagline:
    "I design and build web, mobile and embedded products end to end — from the interface to the infrastructure behind it.",

  /** Your photography page (Instagram, Behance, Flickr, etc.). Leave "" to show "coming soon". */
  photographyUrl: "",

  /** Path or URL to your CV, e.g. "/brandon-tapiba-cv.pdf" placed in /public. Leave "" to hide the button. */
  resumeUrl: "",

  /** Set false to hide the "available for work" dot in the hero. */
  available: true,

  /**
   * Your photo, shown in the About section. Put the file in /public
   * (e.g. public/brandon.jpg) and set "/brandon.jpg". A portrait (4:5) crop works best.
   * Leave "" to show a placeholder frame.
   */
  portrait: "",

  /** The little companion character in the corner (components/motion/Buddy.tsx). Off for now. */
  showBuddy: false,

  socials: [
    { label: "GitHub", href: "https://github.com/BrandonT-ops" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tapiba-brandon" },
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm a Digital Systems Engineer based in Yaoundé, with a Master of Science in Digital Engineering. I design and build scalable products end to end: interfaces, APIs, mobile apps and the embedded systems behind them.",
    "I've built for an AI agency, a Canadian engineering firm working on digital twins of hydropower assets, my engineering school, Cameroon's Ministry of Finance, and freelance clients in agriculture, health and education.",
    "Outside client work I founded The Factory, a digital-skills initiative, and I'm part of the Aspire Tech Pilot and Aspire Leadership programs. Technology is most interesting to me where it meets community and craft.",
  ],

  /** Quick facts shown under the portrait. */
  facts: [
    { label: "Based in", value: "Yaoundé, Cameroon" },
    { label: "Degree", value: "MSc Digital Engineering, 2025" },
    { label: "Speaks", value: "English & French" },
    { label: "Off the keyboard", value: "Basketball, poetry, video games, photography" },
  ],

  /** Work experience, newest first (shown in the Experience section). */
  experience: [
    {
      period: "2025 – 2026",
      role: "Frontend Developer Intern",
      org: "EN Solutions",
      place: "Remote · Montréal, Canada",
      points: [
        "Built responsive web interfaces and reusable UI components for client projects.",
        "Worked on digital twins of hydropower assets.",
        "Integrated REST APIs and managed frontend–backend communication.",
      ],
    },
    {
      period: "2024 – 2025",
      role: "Software Developer",
      org: "Richenel's AI Agency",
      place: "Yaoundé, Cameroon",
      points: [
        "Built the frontend of Maguida.cm, an AI-powered product search engine, in Next.js.",
        "Built core features of the Laboussole e-learning platform.",
        "Connected frontends to backend APIs for real-time search, and improved navigation and mobile design.",
      ],
    },
    {
      period: "2022",
      role: "Intern, Computer Department",
      org: "Ministry of Finance",
      place: "Yaoundé, Cameroon",
      points: [
        "Designed activity UML diagrams for a module of the SYGEPES software.",
        "Helped adapt and implement software for managing the ministry's IT infrastructure.",
        "Built a tool for a staff member to calculate credits and debits on the ministry's payslips.",
        "Studied the department's network architecture and its RAID storage set-up.",
      ],
    },
  ],

  education: [
    {
      year: "2025",
      title: "MSc Digital Engineering",
      org: "Inter-State University Congo–Cameroon",
      note: "5-year scholarship awarded for A-level results.",
    },
    {
      year: "2019",
      title: "GCE Advanced Level",
      org: "Government Bilingual High School Etoug-Ebe",
      note: "Mathematics A, Biology A, Chemistry A, Physics A, Further Mathematics C.",
    },
  ],

  certifications: [
    { year: "2026", title: "Power BI Fundamentals", org: "DataCamp" },
    { year: "2023", title: "Aspire Leaders Program", org: "Aspire Institute · HarvardX coursework" },
    { year: "2023", title: "Scrum Fundamentals Certified", org: "European Center for Leadership & Entrepreneurship Education" },
    { year: "2023", title: "Responsive Web Design", org: "freeCodeCamp" },
  ],

  skills: [
    {
      group: "Frontend",
      items: ["Angular", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS", "Figma"],
    },
    {
      group: "Backend",
      items: ["Django", "Symfony", "Laravel", "Supabase", "PostgreSQL", "REST APIs"],
    },
    {
      group: "Mobile & embedded",
      items: ["Flutter", "Kotlin", "Wear OS", "Raspberry Pi", "Arduino", "ESP32 / NodeMCU"],
    },
    {
      group: "Data & ops",
      items: ["Power BI", "SQL & ETL", "Python", "Java", "C", "Docker & VPS deployment"],
    },
  ],

  services: [
    "Frontend engineering",
    "Full-stack development",
    "Mobile apps",
    "UI/UX prototyping",
    "API development",
    "IoT & embedded prototypes",
  ],
} as const;
