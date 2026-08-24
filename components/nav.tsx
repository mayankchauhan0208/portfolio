"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Nav() {
  const [activeSection, setActiveSection] = useState("#top");
  const linkStripRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sectionIds = ["#top", ...links.map((link) => link.href)];

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.42;
      const sections = sectionIds
        .map((id) => ({ id, element: document.querySelector(id) }))
        .filter((item): item is { id: string; element: Element } => Boolean(item.element))
        .sort((a, b) => a.element.getBoundingClientRect().top - b.element.getBoundingClientRect().top);

      const current = sections.reduce(
        (active, item) => (item.element.getBoundingClientRect().top <= activationLine ? item.id : active),
        "#top"
      );

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

  useEffect(() => {
    const strip = linkStripRef.current;
    if (!strip) return;

    if (activeSection === "#top") {
      strip.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const activeLink = linkRefs.current[activeSection];
    if (!activeLink) return;

    const stripRect = strip.getBoundingClientRect();
    const activeLinkRect = activeLink.getBoundingClientRect();
    const targetLeft =
      strip.scrollLeft +
      (activeLinkRect.left - stripRect.left) -
      (strip.clientWidth - activeLinkRect.width) / 2;

    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeSection]);

  return (
    <motion.header
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-3 left-0 right-0 z-50 px-2 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-3 md:bottom-5 md:px-8"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 rounded-full border border-white/10 bg-obsidian/78 px-2.5 py-2 shadow-luxury backdrop-blur-2xl sm:gap-2 sm:px-3 md:px-4">
        <a
          href="#top"
          data-active={activeSection === "#top"}
          className="flex min-h-11 items-center rounded-full px-3 py-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-white transition data-[active=true]:bg-white data-[active=true]:text-black sm:tracking-[0.28em] md:text-sm"
        >
          Home
        </a>
        <div ref={linkStripRef} className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
          {links.map((link) => (
            <a
              ref={(element) => {
                linkRefs.current[link.href] = element;
              }}
              key={link.href}
              href={link.href}
              data-active={activeSection === link.href}
              className="flex min-h-11 shrink-0 items-center rounded-full px-3 py-2 text-[0.62rem] uppercase tracking-[0.12em] text-mercury transition hover:bg-white/10 hover:text-white data-[active=true]:bg-white data-[active=true]:font-bold data-[active=true]:text-black sm:tracking-[0.16em] md:text-[0.68rem] md:tracking-[0.18em] lg:px-4"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="hidden min-h-11 shrink-0 items-center rounded-full border border-signal/30 px-4 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white transition hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal lg:flex"
          >
            Download Resume
          </a>
          <a
            href={profile.behance}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-signal/50 hover:text-signal"
          >
            <ExternalLink size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Mayank"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition hover:bg-signal"
          >
            <Mail size={16} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
