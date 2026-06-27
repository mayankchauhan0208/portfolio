import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RouteStartReset } from "@/components/route-start-reset";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://mayankchauhan.co.in"),
  title: {
    default: "Mayank Chauhan | Visual Designer & Creative Brand Designer",
    template: "%s | Mayank Chauhan"
  },
  description:
    "Portfolio of Mayank Chauhan, a visual designer creating brand communication, campaign creatives, UI concepts, real-estate marketing visuals, motion/video assets, and AI-assisted creative workflows.",
  keywords: [
    "Mayank Chauhan",
    "Visual Designer",
    "Creative Brand Designer",
    "Brand Design",
    "Campaign Creatives",
    "UI Visual Design",
    "Real Estate Marketing",
    "Motion & Video",
    "AI-assisted Creative Workflows",
    "Portfolio India"
  ],
  authors: [{ name: "Mayank Chauhan" }],
  creator: "Mayank Chauhan",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Mayank Chauhan | Visual Designer Portfolio",
    description: "Brand, campaign, UI visual, real-estate marketing, motion/video, and AI-assisted creative work by Mayank Chauhan.",
    url: "/",
    siteName: "Mayank Chauhan Portfolio",
    images: [
      {
        url: "/optimized/images/mayank-portrait.webp",
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
    description: "Visual design portfolio covering brand communication, campaign creatives, UI concepts, motion/video, and AI-assisted creative workflows.",
    images: ["/optimized/images/mayank-portrait.webp"]
  }
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
        <RouteStartReset />
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
