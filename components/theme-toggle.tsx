"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme("dark");
    document.documentElement.classList.remove("theme-light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("theme-light", nextTheme === "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-3 top-3 z-[90] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-black shadow-luxury transition hover:bg-signal md:right-5 md:top-5"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
