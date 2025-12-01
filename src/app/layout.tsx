import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Brandon Tapiba | Digital Engineer & Creative Builder",
  description: "Full-stack developer, UI/UX designer, and digital innovator. Specializing in Angular, React, Django, and modern web technologies. Building impactful digital solutions.",
  keywords: [
    "Brandon Tapiba",
    "Digital Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Angular",
    "React",
    "Next.js",
    "Django",
    "Portfolio",
    "Web Development",
    "Cameroon Developer",
  ],
  authors: [{ name: "Brandon Tapiba", url: "https://github.com/BrandonT-ops" }],
  creator: "Brandon Tapiba",
  publisher: "Brandon Tapiba",
  metadataBase: new URL('https://brandontapiba.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brandontapiba.vercel.app",
    siteName: "Brandon Tapiba Portfolio",
    title: "Brandon Tapiba | Digital Engineer & Creative Builder",
    description: "Full-stack developer and UI/UX designer specializing in modern web technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brandon Tapiba Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Tapiba | Digital Engineer",
    description: "Full-stack developer and UI/UX designer",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
