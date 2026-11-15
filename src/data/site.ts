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
   * Photos for the Photos page, pulled from Brandon's Memento wall.
   * To add one: put the file in /public/photos and add a line here with its
   * caption, place and pixel size. Captions are shown as written.
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
