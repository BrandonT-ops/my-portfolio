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
   * Where the Photos page reads from: Brandon's Memento wall. Every public
   * picture he posts there appears on the portfolio automatically.
   * `publicKey` is Memento's publishable key (the same one its own web page
   * uses); it only allows reading what is already public.
   */
  memento: {
    url: "https://fgvjghetclremhsweddc.supabase.co",
    publicKey: "sb_publishable_dqmPuSN-eJufXza4wsFjBw_GgfZiaU3",
    memberId: "8aa73cf7-1295-4a23-ae6c-b23cd7795a6c",
    bucket: "moments",
  },

  /**
   * Snapshot of the Memento pictures, shown only if Memento cannot be reached.
   */
  photos: [
    { src: "/photos/sun-bloom-douala.jpg", caption: "The sun seemed to bloom", place: "Bonanjo, Douala, Cameroon", width: 1205, height: 1600 },
    { src: "/photos/mountain-top-nkolbisson.jpg", caption: "The mountain top", place: "Nkolbisson, Yaoundé, Cameroon", width: 1205, height: 1600 },
    { src: "/photos/bonanjo-after-rain.jpg", caption: "Bonanjo after the rain", place: "Douala, Cameroon", width: 1205, height: 1600 },
    { src: "/photos/streets-of-douala.jpg", caption: "The streets of Douala", place: "Bonanjo, Douala, Cameroon", width: 1204, height: 1600 },
    { src: "/photos/gloomy-nights.jpg", caption: "Gloomy nights", place: "Sangmelima, Cameroon", width: 640, height: 640 },
    { src: "/photos/plains-of-batchingou.jpg", caption: "The planes of Batchingou", place: "Batchingou, Bafoussam, Cameroon", width: 1600, height: 1205 },
    { src: "/photos/mountain-sides.jpg", caption: "By the mountain sides", place: "Austria", width: 605, height: 1280 },
    { src: "/photos/glimpse-of-the-air.jpg", caption: "A glimpse of the air", place: "Douala, Cameroon", width: 1205, height: 1600 },
    { src: "/photos/aire-de-repos.jpg", caption: "Aire de repos", place: "Boumyebel, Cameroon", width: 1205, height: 1600 },
    { src: "/photos/somewhere-in-rwanda.jpg", caption: "Somewhere in Rwanda", place: "Kigali, Rwanda", width: 1600, height: 900 },
    { src: "/photos/trees-white-sky.jpg", caption: "", place: "", width: 1600, height: 1201 },
  ] as { src: string; caption: string; place: string; width: number; height: number }[],

  socials: [
    { label: "GitHub", href: "https://github.com/BrandonT-ops" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tapiba-brandon" },
  ],
} as const;
