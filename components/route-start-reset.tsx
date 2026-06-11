"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function cameFromSameSite() {
  if (!document.referrer) return false;

  try {
    return new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}

function navigationType() {
  const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return entry?.type;
}

export function RouteStartReset() {
  const pathname = usePathname();
  const initialLoad = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const isInitialLoad = initialLoad.current;
    initialLoad.current = false;

    const isWorkRoute = pathname.startsWith("/work");
    const isFreshOpen = navigationType() === "navigate" && !cameFromSameSite();

    if (isInitialLoad && isWorkRoute && isFreshOpen) {
      window.location.replace("/");
      return;
    }

    if (isInitialLoad && window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    if (!isInitialLoad && window.location.hash) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [pathname]);

  return null;
}
