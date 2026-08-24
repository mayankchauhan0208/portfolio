import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { flagshipProjects, type FlagshipProject } from "@/lib/flagship-projects";
import { ProjectViewTracker, TrackedLink } from "@/components/analytics-events";

const siteUrl = "https://mayankchauhan.co.in";

export function FlagshipProjectPage({ project }: { project: FlagshipProject }) {
  const canonical = `${siteUrl}/work/${project.slug}`;
  const currentIndex = flagshipProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = flagshipProjects[(currentIndex + 1) % flagshipProjects.length];
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.title,
      description: project.description,
      url: canonical,
      image: `${siteUrl}${project.image}`,
      creator: { "@type": "Person", name: "Mayank Chauhan", url: siteUrl },
      genre: project.classification,
      abstract: project.brief,
      keywords: ["visual design", "campaign design", "presentation design", "brand communication"]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Selected Work", item: `${siteUrl}/#work` },
        { "@type": "ListItem", position: 3, name: project.title, item: canonical }
      ]
    }
  ];

  const details = [
    ["Brief", project.brief],
    ["My exact role", project.role],
    ["Problem or constraint", project.constraint],
    ["Design approach and system", project.approach],
    ["Deliverables and channels", project.deliverables],
    ["Tools", project.tools],
    ["Outcome or scale", project.outcome],
    ["AI involvement", project.ai]
  ];

  return (
    <main className="min-h-screen bg-obsidian px-4 pb-24 text-platinum md:px-8">
      <ProjectViewTracker slug={project.slug} title={project.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 py-7 text-xs text-white/60">
        <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#work" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">Selected Work</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="truncate text-white">{project.title}</span>
      </nav>

      <article className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-luxury">
        <div className="relative aspect-[16/8] bg-black/40">
          <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(100vw - 4rem), 1152px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-signal backdrop-blur-xl">{project.classification}</span>
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          <p className="text-sm font-medium leading-6 text-champagne">{project.disclosure}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-white">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-mercury md:text-lg">{project.description}</p>

          <dl className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/30 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:p-5" aria-label="Project summary">
            {[["Role", project.role], ["Year", project.year], ["Classification", project.classification], ["Deliverables", project.deliverables], ["Tools", project.tools]].map(([label, value]) => (
              <div key={label} className="min-w-0 border-white/10 lg:border-l lg:pl-4 first:lg:border-l-0 first:lg:pl-0">
                <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-signal">{label}</dt>
                <dd className="mt-2 text-xs leading-5 text-white/75 lg:line-clamp-3" title={value}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {details.map(([label, value]) => (
              <section key={label} className="rounded-[1.4rem] border border-white/10 bg-black/25 p-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-signal">{label}</h2>
                <p className="mt-3 text-sm leading-7 text-white/74">{value}</p>
              </section>
            ))}
          </div>

          <section className="mt-12" aria-labelledby="project-gallery-heading">
            <h2 id="project-gallery-heading" className="font-display text-3xl text-white">Project gallery</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {project.gallery.map((item, index) => (
                <div key={item.src} className={`relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30 ${index === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"}`}>
                  <Image src={item.src} alt={item.alt} fill sizes={index === 0 ? "(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(100vw - 4rem), 1152px" : "(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2.5rem), 568px"} className="object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-signal/50 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"><ArrowLeft size={15} /> Selected Work</Link>
            <TrackedLink href="/#contact" event="contact_click" details={{ source: project.slug }} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">Contact Me <ArrowUpRight size={15} /></TrackedLink>
            <Link href={`/work/${nextProject.slug}`} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-left text-xs font-bold uppercase leading-5 tracking-[0.14em] text-white transition hover:border-signal/50 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">Next: {nextProject.title} <ArrowRight className="shrink-0" size={15} /></Link>
          </div>
        </div>
      </article>
    </main>
  );
}
