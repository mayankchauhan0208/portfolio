"use client";

import Link from "next/link";
import { useEffect, type MouseEventHandler, type ReactNode } from "react";

type EventName = "resume_download" | "contact_click" | "project_view";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPortfolioEvent(event: EventName, details: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...details };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.gtag?.("event", event, details);
  window.dispatchEvent(new CustomEvent("portfolio:analytics", { detail: payload }));
}

export function ProjectViewTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    trackPortfolioEvent("project_view", { project_slug: slug, project_title: title });
  }, [slug, title]);
  return null;
}

export function TrackedLink({ href, event, details, className, children }: { href: string; event: EventName; details?: Record<string, string>; className?: string; children: ReactNode }) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = () => trackPortfolioEvent(event, details);
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}
