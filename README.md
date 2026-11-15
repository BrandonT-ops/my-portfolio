# Brandon Tapiba — Portfolio

A portfolio drawn as an engineer's **drafting sheet**: blueprint-blue paper, white linework,
one orange accent. Built with **Next.js 16**, **Tailwind CSS** and **TypeScript**, in
**English and French**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en or /fr)
npm run build    # production build
npm run lint
```

## Pages

Every page exists in both languages (`/en/...` and `/fr/...`). `/` redirects to French for
browsers that prefer French, otherwise to English.

| Sheet | Address | What it is |
| --- | --- | --- |
| 01 | `/en` | Home: name, portrait, six flagship projects, key numbers |
| 02 | `/en/work` | Drawing register: all projects, filterable by type |
| — | `/en/work/<slug>` | One sheet per project: system blueprint, problem, approach, outcome, hard parts |
| 03 | `/en/about` | Profile: bio, experience, education, certifications, stack |
| 04 | `/en/photography` | Photo contact sheet |

## Where to edit things

| What | File |
| --- | --- |
| Email, links, portrait, résumé link, photos | `src/data/site.ts` |
| Project facts (name, client, year, stack, links, screenshot) | `src/data/projects.ts` |
| Project words, English | `src/content/projects.en.ts` |
| Project words, French | `src/content/projects.fr.ts` |
| Everything else you can read on the site (labels, bio, experience) | `src/content/en.ts` and `src/content/fr.ts` |
| System blueprints | `src/data/systems.ts` |
| Colours | `src/app/globals.css` (`:root` variables) |

**Rule of thumb:** whenever you change a sentence in an `en` file, change the same entry in the
`fr` file. Both dictionaries share one TypeScript type, so the build fails if an entry is missing
from one of them.

### Adding a project

1. Add its facts to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",              // address: /en/work/my-project
  title: "My Project",
  client: "Freelance",             // optional
  year: "2026",                    // optional
  stack: ["Next.js", "PostgreSQL"],
  category: "web",                 // "web" | "mobile" | "embedded"
  featured: true,                  // optional: show on the home page
  cover: "/work/my-project.jpg",   // optional screenshot in public/work/
  links: [{ label: "Live site", href: "https://..." }],
}
```

2. Add its words under the same slug in `projects.en.ts` and `projects.fr.ts`:
   `summary`, `role`, `context`, `approach`, and optionally `outcome`, `status`,
   `challenges` (the hard parts) and `lessons` (what you'd do differently).
3. Optionally draw its blueprint in `src/data/systems.ts`: a list of layers read left to right.
   French box labels go in `systemLabels` in `src/content/fr.ts`.

Only publish numbers you can stand behind. Sections with no content are simply not shown.

### Photos

Put images in `public/photos/` and list them in `photos` in `src/data/site.ts`. Until then the
Photos page shows reserved frames.

### Colours

```css
--sheet:  13 36 68;     /* blueprint blue, the paper */
--panel:  19 49 89;     /* lighter wash for panels */
--line:   233 241 255;  /* linework and text */
--muted:  163 187 222;  /* annotations */
--accent: 255 142 66;   /* warm orange, the one highlight */
--signal: 126 211 255;  /* cyan, data flowing in diagrams */
```

## Design notes

- **One signature interaction:** a CAD-style crosshair follows the pointer with a live X/Y
  readout (`components/Crosshair.tsx`). Visitors can switch it off in the title block; it is
  off on touch devices and with reduced motion.
- **Live dimension line:** the line under the name on the home page shows its real width in
  pixels and updates when the window resizes (`components/Dimension.tsx`).
- **System blueprints:** each project's architecture, with dashes flowing along the wires
  (`components/Schematic.tsx`).
- **Title block:** every page ends with one, like a technical drawing (`components/TitleBlock.tsx`).
- **Quick search:** ⌘K / Ctrl+K or `/` (`components/CommandPalette.tsx`).
- **Calm motion:** content fades up once as it scrolls into view (`components/Reveal.tsx`).
  No animation library; everything is CSS plus one small observer.

## SEO & accessibility

- Per-page titles and descriptions in both languages, canonical URLs and `hreflang` alternates
- `sitemap.xml` with both languages, `robots.txt`, Open Graph image, `Person` structured data
- Static pages, self-hosted fonts
- Skip link, visible focus styles, respects `prefers-reduced-motion`; content is visible without JavaScript

## Deployment

Import the repository at [vercel.com/new](https://vercel.com/new) and keep the Next.js defaults.
Every branch gets a preview address; `main` is the live site. After moving to your own domain,
update `url` in `src/data/site.ts`.
