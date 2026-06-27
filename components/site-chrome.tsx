"use client";

import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { RoleTicker } from "@/components/role-ticker";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <RoleTicker />
    </>
  );
}
