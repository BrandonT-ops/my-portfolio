/**
 * Language-neutral facts about Brandon. Everything that needs translating
 * (role, bio, experience, labels) lives in src/content/en.ts and fr.ts.
 */
export const site = {
  name: "Brandon Tapiba",
  url: "https://brandontapiba.vercel.app",
  email: "brandontapiba@gmail.com",
  coordinates: "3.87°N 11.52°E",

  /** Set false to hide the "available" marker. */
  available: true,

  /** Portrait photo in /public. A vertical (4:5) crop works best. */
  portrait: "/brandon.jpg",

  /** Path or URL to a CV, e.g. "/brandon-tapiba-cv.pdf" placed in /public. Leave "" to hide the link. */
  resumeUrl: "",

  /** An external gallery (Instagram, Behance…). Leave "" to hide the link. */
  photographyUrl: "",

  /**
   * Photos for the Photos page. Put files in /public/photos and list them here,
   * e.g. { src: "/photos/market.jpg", alt: "Mokolo market at dusk" }.
   * While the list is empty, the page shows reserved frames.
   */
  photos: [] as { src: string; alt: string }[],

  socials: [
    { label: "GitHub", href: "https://github.com/BrandonT-ops" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tapiba-brandon" },
  ],
} as const;
