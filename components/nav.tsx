"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-obsidian/55 px-4 py-3 shadow-luxury backdrop-blur-2xl">
        <a href="#top" className="font-display text-sm uppercase tracking-[0.32em] text-white">
          Mayank
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-mercury transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={profile.behance}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Behance portfolio"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-signal/50 hover:text-signal"
          >
            <ExternalLink size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Mayank"
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:bg-signal"
          >
            <Mail size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
