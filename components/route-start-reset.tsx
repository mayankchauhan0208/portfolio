"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
