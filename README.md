# Brandon Tapiba — Portfolio (search-engine edition)

A portfolio that works like a **search engine about Brandon**: a clean home page with one
search box, results pages with tabs and a side panel, and project pages laid out like
product pages. Built with **Next.js 16**, **Tailwind CSS** and **TypeScript**, in
**English and French**. It has its own wordmark and colours.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en or /fr)
npm run build
npm run lint
```

## Pages

Every page exists in both languages (`/en/...` and `/fr/...`). `/` redirects to French for
browsers that prefer French, otherwise to English.

| Address | What it is |
| --- | --- |
| `/en` | Home: wordmark, one search box with example searches, two buttons, four plain links |
| `/en/search?q=...&t=...` | Results. Tabs: All, Projects, Images, About. `/en/work` redirects here |
| `/en/work/<slug>` | One product-style page per project |
| `/en/about` | Profile: bio, experience, education, certifications, toolbox |
| `/en/photography` | Photo grid, read live from Brandon's Memento wall (also searchable) |
| `/en/contact` | Email with copy button, links, optional message form |

## Contact page

`/en/contact` shows the email address with a copy button, plus LinkedIn and GitHub. It can
also show a message form that emails Brandon:

1. Create an API key at [resend.com](https://resend.com) (API Keys).
2. In Vercel: Project → Settings → Environment Variables, add `RESEND_API_KEY` with that key.
3. Redeploy. The form appears on the Contact page.

Without the key the form stays hidden, so nothing on the site is ever broken. Messages are
sent by `src/app/api/contact/route.ts`. With Resend's default test sender, messages can only
be delivered to the Resend account owner's own address, so the Resend account should be
registered with the email in `src/data/site.ts`. Never commit the key to the repository.

## How the search works

- `src/lib/search-index.ts` builds, at deploy time, a list of everything findable: projects,
  pages, jobs, education and skills, in each language.
- `src/lib/search.ts` ranks that list in the visitor's browser. Every word of the query must
  appear in an item; matches in the title count most, then tags, then body text. Accents are
  ignored, so "experience" finds "Expérience".
- Nothing is sent to a server, so results are instant, and the time shown under the tabs is
  the real time the search took.
- The search box suggests matches as you type. Press `/` anywhere to jump to it.

## Where to edit things

| What | File |
| --- | --- |
| Email, links, portrait, résumé link, photos | `src/data/site.ts` |
| Project facts (name, client, year, stack, links, screenshot) | `src/data/projects.ts` |
| Project words | `src/content/projects.en.ts` and `projects.fr.ts` |
| Everything else you can read on the site | `src/content/en.ts` and `fr.ts` |
| System diagrams | `src/data/systems.ts` |
| Colours | `src/app/globals.css` (`:root` variables) |

**Rule of thumb:** whenever you change a sentence in an `en` file, change the same entry in the
`fr` file. Both share one TypeScript type, so the build fails if an entry is missing.

New projects appear in the search automatically. To add one: add its facts to `projects.ts`,
its words under the same slug in both `projects.*.ts` files, and optionally a diagram in
`systems.ts`. Only publish numbers you can stand behind; empty sections are not shown.

### Photos come from Memento

`src/lib/memento.ts` reads Brandon's public pictures from his Memento wall. A new public
picture there appears on the portfolio within about 30 minutes, with no redeploy. Only
pictures he posted himself and made public are included. If Memento cannot be reached, the
snapshot in `public/photos/` (listed in `src/data/site.ts`) is shown instead.

### Colours

```css
--sheet:  255 255 255;  /* page background */
--panel:  245 246 248;  /* soft grey surface for cards */
--line:   27 27 31;     /* text */
--muted:  92 96 108;    /* secondary text */
--accent: 11 104 176;   /* blue: links, buttons, focus */
--signal: 255 107 74;   /* orange: the wordmark's full stop, small highlights */
```

## SEO & accessibility

- Per-page titles and descriptions in both languages, canonical URLs and `hreflang` alternates
- `sitemap.xml`, `robots.txt`, Open Graph image, `Person` structured data
- Static pages, self-hosted fonts, no animation library
- Skip link, visible focus styles, keyboard-operable search and tabs, respects
  `prefers-reduced-motion`

## Deployment

Import the repository at [vercel.com/new](https://vercel.com/new) and keep the Next.js defaults.
After moving to your own domain, update `url` in `src/data/site.ts`.
