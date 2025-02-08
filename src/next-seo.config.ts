// src/next-seo.config.ts
import { DefaultSeoProps } from 'next-seo';

const SEOConfig: DefaultSeoProps = {
  title: "My Portfolio",
  description: "Welcome to my portfolio ! Discover me, my projects, articles and competences.",
  openGraph: {
    type: 'website',
    locale: 'en_EN',
    url: 'https://brandontapiba.vercel.app/',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://mon-portfolio.com/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview of my portfolio',
      },
    ],
    profile: {
      firstName: "Brandon",
      lastName: "Tapiba",
      username: "BrandonTapiba",
      gender: "male",
    },
  },
  twitter: {
    handle: '@monprofil',
    site: '@monprofil',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: 'your-facebook-app-id',
  },
  additionalMetaTags: [
    {
      property: 'og:linkedin',
      content: 'https://www.linkedin.com/in/brandontapiba',
    },
    {
      property: 'og:github',
      content: 'https://github.com/BrandonT-ops',
    },
    {
      property: 'og:instagram',
      content: 'https://www.instagram.com/brandon-tapiba',
    },
    {
      property: 'og:youtube',
      content: 'https://www.youtube.com/c/brandontapiba',
    },
  ]  
};

export default SEOConfig;
