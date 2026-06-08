"use client";

import { useEffect } from "react";

const legacyHashRoutes: Record<string, string> = {
  "#logo-design": "/work/branding",
  "#branding": "/work/branding",
  "#real-estate": "/work/real-estate",
  "#social-media": "/work/social-media",
  "#ui-ux": "/work/ui-ux",
  "#ai-generated": "/work/ai-generated"
};

export function LegacyWorkHashRouter() {
  useEffect(() => {
    const target = legacyHashRoutes[window.location.hash];

    if (target) {
      window.history.replaceState(null, "", target);
      window.location.replace(target);
    }
  }, []);

  return null;
}
