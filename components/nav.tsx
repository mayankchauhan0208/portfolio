"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Nav() {
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const sectionIds = ["#top", ...links.map((link) => link.href)];

    const updateActiveSection = () => {
      const current = sectionIds.reduce((active, id) => {
        const element = document.querySelector(id);

        if (!element) {
          return active;
        }

        const top = element.getBoundingClientRect().top;
        return top <= window.innerHeight * 0.42 ? id : active;
      }, "#top");

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-3 left-0 right-0 z-50 px-3 py-3 md:bottom-5 md:px-8"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border border-white/10 bg-obsidian/72 px-3 py-2 shadow-luxury backdrop-blur-2xl md:px-4">
        <a
          href="#top"
          data-active={activeSection === "#top"}
          className="rounded-full px-3 py-2 font-display text-[0.68rem] uppercase tracking-[0.28em] text-white transition data-[active=true]:bg-white data-[active=true]:text-black md:text-sm"
        >
          Mayank
        </a>
        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-active={activeSection === link.href}
              className="shrink-0 rounded-full px-3 py-2 text-[0.64rem] uppercase tracking-[0.16em] text-mercury transition hover:bg-white/10 hover:text-white data-[active=true]:bg-white data-[active=true]:font-bold data-[active=true]:text-black md:text-[0.68rem] md:tracking-[0.18em] lg:px-4"
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
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-signal/50 hover:text-signal"
          >
            <ExternalLink size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Mayank"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:bg-signal"
          >
            <Mail size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
