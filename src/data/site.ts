/**
 * Site-wide content. Edit this file to update your details everywhere.
 */
export const site = {
  name: "Brandon Tapiba",
  role: "Digital Engineer",
  url: "https://brandontapiba.vercel.app",
  location: "Cameroon",
  email: "brandontapiba@gmail.com",

  /** One-line positioning shown under the name in the hero. */
  tagline:
    "I design and build web products end to end — from interface to infrastructure — and teach others to do the same.",

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
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brandontapiba" },
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm a Digital Systems Engineer working across frontend, backend and product design. I like owning the whole path: understanding the problem, shaping the interface, and shipping the system behind it.",
    "Outside client work I founded The Factory, a digital-skills initiative, and I'm part of the Aspire Tech Pilot and Aspire Leadership programs. Technology is most interesting to me where it meets community and craft.",
  ],

  /** "Journey" timeline — edit years and text to match your real history. */
  timeline: [
    { year: "Now", text: "Aspire Tech Pilot & Aspire Leadership Program" },
    { year: "—", text: "Founder, The Factory — digital-skills initiative" },
    { year: "—", text: "Full-stack work: Angular, React/Next.js, Django, Laravel" },
    { year: "—", text: "Digital Systems Engineering" },
  ],

  skills: [
    {
      group: "Build",
      items: ["Angular 19", "React / Next.js", "Django", "Symfony / Laravel", "Tailwind CSS", "Wear OS", "LLM integrations"],
    },
    {
      group: "Ship",
      items: ["Docker", "PostgreSQL / MariaDB", "VPS & Hostinger", "Firebase", "GitHub"],
    },
    {
      group: "Shape",
      items: ["Figma", "UI component systems", "Product thinking", "Research & architecture"],
    },
  ],

  services: [
    "Frontend engineering",
    "Full-stack development",
    "UI/UX prototyping",
    "API development",
    "Technical consulting",
    "Education technology",
  ],
} as const;
