import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";

export const metadata: Metadata = {
  title: "Mayank Chauhan | Graphic Designer, UI Designer & Video Editor",
  description:
    "Premium portfolio of Mayank Chauhan, a graphic designer, UI designer, and video editor creating brand systems, campaign visuals, and motion-led digital experiences.",
  keywords: ["Mayank Chauhan", "Graphic Designer", "UI Designer", "Video Editor", "Portfolio", "Brand Design"],
  authors: [{ name: "Mayank Chauhan" }],
  openGraph: {
    title: "Mayank Chauhan | Premium Creative Portfolio",
    description: "Graphic design, UI design, and video editing portfolio with brand and motion-led creative work.",
    type: "website"
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
