import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RouteStartReset } from "@/components/route-start-reset";
import { SiteChrome } from "@/components/site-chrome";
import { profile } from "@/lib/portfolio-data";

const siteUrl = "https://mayankchauhan.co.in";
const siteDescription =
  "Senior Visual and Graphic Designer with 5+ years of experience in brand systems, campaign design, presentations, digital, print, motion and AI-enhanced creative workflows.";
const socialPreviewImage = "/social-preview.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mayank Chauhan | Senior Visual & Graphic Designer",
    template: "%s | Mayank Chauhan"
  },
  description: siteDescription,
  keywords: [
    "Senior Visual Designer",
    "Senior Graphic Designer",
    "Brand Designer",
    "Campaign Designer",
    "Presentation Designer",
    "Marketing Communication Designer",
    "Digital and Print Designer",
    "AI-Enhanced Creative Workflow"
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
    title: "Mayank Chauhan | Senior Visual & Graphic Designer",
    description: siteDescription,
    url: siteUrl,
    siteName: "Mayank Chauhan Portfolio",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Mayank Chauhan - Senior Visual Designer and Senior Graphic Designer portfolio"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Chauhan | Senior Visual & Graphic Designer",
    description: siteDescription,
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
      jobTitle: "Senior Visual Designer and Senior Graphic Designer",
      description: siteDescription,
      knowsAbout: ["Brand systems", "Campaign design", "Presentation design", "Marketing communication", "Digital and print design", "Motion design", "AI-enhanced creative workflows"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Senior Visual Designer and Senior Graphic Designer",
        experienceRequirements: "5+ years of professional design experience"
      },
      image: `${siteUrl}${socialPreviewImage}`,
      sameAs: [siteUrl, profile.linkedin, profile.behance]
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
