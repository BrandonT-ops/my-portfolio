import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { DefaultSeo } from "next-seo";
// import SEOConfig from "@/next-seo.config";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brandon Tapiba's Portfolio",
  description: "Problem Solver and Developer",
  icons: "/public/assets/icon.svg",
  applicationName: "Brandon's Portfolio",
  authors: { url: "Brandon Tapiba" },
  keywords: ["Development", "Portfolio", "Front-end", "Leadership"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <DefaultSeo
          title="Brandon Tapiba's Portfolio"
          description="Welcome to my portfolio ! Discover me, my projects, articles and competences"
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://brandontapiba.vercel.app/",
            siteName: "My Portfolio",
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
              gender: "Male",
            },
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
          facebook={{
            appId: "your-facebook-app-id",
          }}
          additionalMetaTags={[
            {
              property: "og:linkedin",
              content: "https://www.linkedin.com/in/brandontapiba",
            },
            {
              property: "og:github",
              content: "https://github.com/BrandonT-ops",
            },
            {
              property: "og:instagram",
              content: "https://www.instagram.com/brandon-tapiba",
            },
            {
              property: "og:youtube",
              content: "https://www.youtube.com/c/brandontapiba",
            },
          ]}
        /> */}
        {/* <DefaultSeo {...SEOConfig} /> */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
