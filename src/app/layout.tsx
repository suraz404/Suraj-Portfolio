import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";

import { Cursor } from "@/components/cursor";
import { profile } from "@/content/profile";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** A classic book face for the name and other headings. */
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${profile.name}` },
  description: siteDescription,
  creator: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  keywords: [
    "Suraj Agrahari",
    "Suraj Agrahari portfolio",
    "full-stack developer Nepal",
    "web developer Butwal Nepal",
    "full-stack developer",
    "Nepal",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "BSc CSIT",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${profile.name} — Blog` }] },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    siteName: profile.name,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role} in Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#141417" },
  ],
};

/** Applies the saved or system theme before first paint to avoid a flash. */
const themeScript = `(()=>{try{const s=localStorage.getItem("theme");const d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: siteDescription,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Butwal",
    addressCountry: "NP",
  },
  memberOf: profile.experience.map((x) => ({
    "@type": "Organization",
    name: [x.organization, x.place].filter(Boolean).join(", "),
  })),
  alumniOf: profile.education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB"],
  image: `${siteUrl}${profile.photo.full}`,
  sameAs: [profile.contact.github, profile.contact.linkedin, profile.contact.x].filter(Boolean),
  mainEntityOfPage: siteUrl,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  description: siteDescription,
  url: siteUrl,
  author: { "@type": "Person", name: profile.name },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${garamond.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[200] -translate-y-20 rounded-md bg-fg px-3 py-2 text-sm text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
