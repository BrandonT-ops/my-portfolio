# Brandon Tapiba — Portfolio

Personal portfolio built with **Next.js 16**, **Tailwind CSS** and **TypeScript**.
Editorial layout with a light neo-brutalist touch: warm paper background, Onyx ink,
Ruby Red as the single accent, and hard offset shadows on interactive elements.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where to edit things

Almost everything lives in two data files. You rarely need to touch components.

| What | File |
| --- | --- |
| Name, email, tagline, social links, **photography link**, résumé link | `src/data/site.ts` |
| About text, journey timeline, skills, services | `src/data/site.ts` (`about`) |
| Projects and case studies | `src/data/projects.ts` |
| Colours | `src/app/globals.css` (`:root` variables) |
| Fonts | `src/app/layout.tsx` + `tailwind.config.ts` |

### Photography link

Set `photographyUrl` in `src/data/site.ts` to the page where you post your photos
(Instagram, Behance, Flickr…). The photography section and the contact links pick it up
automatically. While it's empty, the section shows "Gallery link coming soon".

### Résumé

Put your PDF in `public/` (e.g. `public/brandon-tapiba-cv.pdf`) and set
`resumeUrl: "/brandon-tapiba-cv.pdf"`. A "Résumé" link appears in the hero.

### Adding a project

Add an entry to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",              // URL: /work/my-project
  title: "My Project",
  summary: "One sentence for lists.",
  role: "Full-stack developer",
  stack: ["Next.js", "PostgreSQL"],
  featured: true,                  // big card on the home page; false = "Also built" list
  cover: "/work/my-project.jpg",   // optional, put the image in public/work/
  links: [{ label: "Live site", href: "https://..." }],
  context: "The problem, in a sentence or two.",
  approach: ["Step one.", "Step two."],
  outcome: "Real, measurable result.", // optional, hidden until filled in
}
```

Each project automatically gets a case-study page and a sitemap entry.
Without a `cover`, a typographic placeholder is shown, so screenshots can be added later.

> The project texts are a first draft written from short briefs. Review them and add real
> outcomes; nothing is shown for `outcome` until you write it.

### Colours

The palette is defined once as CSS variables in `src/app/globals.css`:

```css
--paper:     250 247 240;  /* background */
--ink:       18 22 25;     /* Onyx — text, borders, shadows */
--muted:     84 90 96;     /* secondary text */
--accent:    158 0 49;     /* Ruby Red — the single accent */
--highlight: 229 198 135;  /* Soft Fawn — highlights, placeholders */
--positive:  9 129 74;     /* Sea Green — "available" dot */
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, JSON-LD, nav + footer
│   ├── page.tsx              # home: Hero → Work → About → Photography → Contact
│   ├── work/[slug]/page.tsx  # case-study pages (statically generated)
│   ├── opengraph-image.tsx   # social preview image
│   ├── sitemap.ts, robots.ts
│   └── globals.css           # palette + base styles
├── components/
│   ├── Nav.tsx, Footer.tsx
│   ├── home/                 # home-page sections
│   └── ui/                   # Section, ButtonLink, Cover
└── data/
    ├── site.ts               # personal details & about content
    └── projects.ts           # projects & case studies
```

## SEO & accessibility

- Per-page titles and descriptions, canonical URLs, Open Graph image
- `sitemap.xml` and `robots.txt` generated from the project list
- `Person` structured data (JSON-LD)
- Fully static output, self-hosted fonts (no external font requests)
- Skip link, visible focus styles, AA text contrast, respects `prefers-reduced-motion`

## Deployment

### Vercel (recommended)
1. Go to [vercel.com/new](https://vercel.com/new) and import `BrandonT-ops/my-portfolio`.
2. Keep the detected Next.js defaults and deploy.
3. Every branch you push gets its own preview URL; `main` becomes the production site.

### Netlify
Import the repo at [app.netlify.com](https://app.netlify.com). Netlify detects Next.js and
installs its runtime automatically. Build command `npm run build`.

### Hostinger (Node.js hosting) or any VPS
```bash
npm ci
npm run build
npm start -- -p 3000      # run behind Nginx/Apache as a reverse proxy, managed by pm2
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
```bash
docker build -t portfolio . && docker run -d -p 3000:3000 portfolio
```

After deploying on your own domain, update `url` in `src/data/site.ts` so the canonical
links, sitemap and social previews point to it.
