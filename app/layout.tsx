import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RouteStartReset } from "@/components/route-start-reset";
import { SiteChrome } from "@/components/site-chrome";
import { profile } from "@/lib/portfolio-data";

const siteUrl = "https://mayankchauhan.co.in";
const siteDescription =
  "Portfolio of Mayank Chauhan, a visual designer creating brand communication, campaign creatives, UI visual design, real-estate marketing visuals, motion/video assets, and AI-assisted creative workflows in India.";
const socialPreviewImage = "/optimized/images/mayank-portrait.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mayank Chauhan | Visual Designer & Creative Brand Designer",
    template: "%s | Mayank Chauhan"
  },
  description: siteDescription,
  keywords: [
    "Mayank Chauhan",
    "Mayank Chauhan Portfolio",
    "Visual Designer India",
    "Creative Brand Designer",
    "Campaign Designer",
    "UI Visual Design",
    "Graphic Designer India",
    "Real Estate Marketing Designer",
    "Motion and Video Creative",
    "AI-assisted Creative Workflows"
  ],
  authors: [{ name: "Mayank Chauhan" }],
  creator: "Mayank Chauhan",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Mayank Chauhan | Visual Designer Portfolio",
    description:
      "Explore the portfolio of Mayank Chauhan, featuring brand communication, campaign creatives, UI visual design, real-estate marketing visuals, motion/video assets, and AI-assisted creative workflows.",
    url: siteUrl,
    siteName: "Mayank Chauhan Portfolio",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 1600,
        alt: "Mayank Chauhan visual designer portfolio preview"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Chauhan | Visual Designer Portfolio",
    description:
      "Visual design portfolio by Mayank Chauhan covering brand communication, campaign creatives, UI visuals, motion/video, and AI-assisted creative workflows.",
    images: [socialPreviewImage]
  },
  robots: {
    index: true,
    follow: true
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Mayank Chauhan",
      url: siteUrl,
      jobTitle: "Visual Designer",
      description:
        "Visual designer creating brand communication, campaign creatives, UI visual design, real-estate marketing visuals, motion/video assets, and AI-assisted creative workflows.",
      image: `${siteUrl}${socialPreviewImage}`,
      sameAs: [profile.behance]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Mayank Chauhan Portfolio",
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en-IN",
      author: {
        "@id": `${siteUrl}/#person`
      }
    }
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080b"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-obsidian font-sans text-platinum antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <RouteStartReset />
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
