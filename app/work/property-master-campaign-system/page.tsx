import type { Metadata } from "next";
import { FlagshipProjectPage } from "@/components/flagship-project-page";
import { getFlagshipProject } from "@/lib/flagship-projects";

const project = getFlagshipProject("property-master-campaign-system")!;
export const metadata: Metadata = { title: { absolute: project.seoTitle }, description: project.description, alternates: { canonical: `/work/${project.slug}` }, openGraph: { title: { absolute: project.seoTitle }, description: project.description, url: `/work/${project.slug}`, images: [{ url: project.image, alt: project.imageAlt }] }, twitter: { card: "summary_large_image", title: { absolute: project.seoTitle }, description: project.description, images: [project.image] } };
export default function Page() { return <FlagshipProjectPage project={project} />; }
