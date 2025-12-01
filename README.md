# Brandon Tapiba's Portfolio

> A modern, high-end personal portfolio showcasing digital engineering, creative work, and professional projects with a bold **Neo-Brutalism** design aesthetic.

## 🎨 Design Philosophy

This portfolio embraces **Neo-Brutalism** design principles:
- **Bold borders** and **hard shadows**
- **Strong visual hierarchy** with big typography
- **Simple color blocks** and minimal rounded corners
- **High contrast** between technical and creative sections
- **Accessible** and **responsive** across all devices

### Color Palette

```
Onyx:       #121619 (Primary Dark)
Ruby Red:   #9e0031 (Accent 1)
Sea Green:  #09814a (Accent 2)
Sky Surge:  #05b2dc (Accent 3)
Soft Fawn:  #e5c687 (Accent 4)
```

## ✨ Features

- **Hero Section** – Bold introduction with animated typography
- **About Me** – Professional background with journey timeline
- **Skills** – Categorized technical, tools, and soft skills
- **Projects** – Featured work with filtering by category
- **Photography Gallery** – Image showcase with category filters and lightbox
- **Hobbies** – Personal interests and creative pursuits
- **Services** – Professional offerings and expertise
- **Contact Form** – Get in touch section with contact info
- **Responsive Design** – Mobile-first, optimized for all screen sizes
- **SEO Optimized** – Comprehensive metadata and Open Graph tags
- **Smooth Animations** – Powered by Framer Motion

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom brutalism design tokens
- **Animations:** Framer Motion
- **Icons/Emojis:** Native Unicode emojis
- **Deployment:** Vercel (recommended)

## 📂 Project Structure

```
my-portfolio/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx           # Root layout with Navbar/Footer
│   │   ├── page.tsx             # Home page with all sections
│   │   └── globals.css          # Global styles & Tailwind
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Navigation bar
│   │   │   └── Footer.tsx       # Footer
│   │   ├── sections/            # Page sections
│   │   │   ├── Hero.tsx         # Hero section
│   │   │   ├── About.tsx        # About me section
│   │   │   ├── Skills.tsx       # Skills section
│   │   │   ├── Projects.tsx     # Projects showcase
│   │   │   ├── Photography.tsx  # Photo gallery
│   │   │   ├── Hobbies.tsx      # Hobbies section
│   │   │   ├── Services.tsx     # Services offered
│   │   │   └── Contact.tsx      # Contact form
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button.tsx       # Brutalist button
│   │       ├── Card.tsx         # Brutalist card
│   │       └── Lightbox.tsx     # Image lightbox
│   └── data/                    # Data files
│       ├── projects.ts          # Projects data
│       └── gallery.ts           # Gallery images data
├── public/                      # Static assets
│   └── images/                  # Images (projects, gallery, etc.)
├── tailwind.config.ts           # Tailwind configuration
├── next.config.ts               # Next.js configuration
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/BrandonT-ops/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Customization Guide

### 1. Update Personal Information

**Hero Section** (`src/components/sections/Hero.tsx`):
- Update name, title, and description
- Modify CTAs and stats

**About Section** (`src/components/sections/About.tsx`):
- Update bio text
- Modify timeline events

**Contact Section** (`src/components/sections/Contact.tsx`):
- Update email, location, and social links

### 2. Add/Update Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  description: 'Brief description',
  role: 'Your Role',
  techStack: ['Tech1', 'Tech2'],
  problemSolved: 'What problem did you solve?',
  impact: 'What was the impact?',
  image: '/images/projects/project-name.jpg',
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...',
  featured: true,
  category: 'fullstack', // 'web' | 'mobile' | 'fullstack' | 'uiux'
}
```

### 3. Add/Update Gallery Images

Edit `src/data/gallery.ts`:

```typescript
{
  id: 'image-id',
  title: 'Image Title',
  description: 'Image description',
  category: 'portraits', // 'portraits' | 'nature' | 'street' | 'events' | 'abstract' | 'tech'
  url: '/images/gallery/image-name.jpg',
}
```

### 4. Update Color Palette

Edit `tailwind.config.ts`:

```typescript
colors: {
  onyx: "#121619",
  ruby: "#9e0031",
  // ... add your colors
}
```

### 5. Modify Skills

Edit the `skillCategories` array in `src/components/sections/Skills.tsx`

### 6. Update Services

Edit the `services` array in `src/components/sections/Services.tsx`

### 7. Customize Hobbies

Edit the `hobbies` array in `src/components/sections/Hobbies.tsx`

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the `.next` folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

**VPS with Docker:**
1. Build the Docker image
2. Run with `docker-compose up -d`
3. Set up Nginx reverse proxy

## 🔧 Environment Variables

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
```

## 📊 Performance & SEO

- **Lighthouse Score Target:** 95+
- **SEO:** Comprehensive meta tags, Open Graph, Twitter Cards
- **Performance:** Image optimization, lazy loading, code splitting
- **Accessibility:** WCAG 2.1 AA compliant
- **Mobile-First:** Fully responsive design

## 🎨 Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Update navigation in `src/components/layout/Navbar.tsx`

Example:
```typescript
// src/components/sections/NewSection.tsx
export default function NewSection() {
  return (
    <section id="new-section" className="py-20 px-4">
      {/* Your content */}
    </section>
  );
}

// src/app/page.tsx
import NewSection from '@/components/sections/NewSection';
// Add <NewSection /> to the main component
```

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:
1. Open an issue
2. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

**Brandon Tapiba**
- Website: [brandontapiba.vercel.app](https://brandontapiba.vercel.app)
- GitHub: [@BrandonT-ops](https://github.com/BrandonT-ops)
- LinkedIn: [Brandon Tapiba](https://linkedin.com/in/brandontapiba)
- Email: brandon.tapiba@example.com

---

Built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion. Designed with Neo-Brutalism aesthetics.
