import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, GalleryHorizontalEnd, Sparkles } from "lucide-react";
import { LegacyWorkHashRouter } from "@/components/legacy-work-hash-router";
import { portfolioCategories, portfolioWorks } from "@/lib/portfolio-data";

const featuredWorks = portfolioWorks.slice(0, 3);

function imageSizeFor(src: string) {
  if (src.includes("thumbnail")) {
    return { width: 1920, height: 1080 };
  }

  return { width: 1080, height: 1920 };
}

export const metadata = {
  title: "Creative Portfolio Library | Mayank Chauhan",
  description:
    "A premium category index for Mayank Chauhan's branding, real estate creatives, social media systems, UI/UX concepts, and AI-assisted visual direction."
};

export default function WorkPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-obsidian text-platinum">
      <LegacyWorkHashRouter />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-12rem] top-[-18rem] h-[42rem] w-[42rem] rounded-full bg-signal/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-[18rem] h-[34rem] w-[34rem] rounded-full bg-champagne/10 blur-3xl" />
        <div className="ambient-grid absolute inset-0 opacity-80" />
      </div>

      <header className="relative z-20 px-4 py-6 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-obsidian/68 px-4 py-3 shadow-luxury backdrop-blur-2xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-mercury transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={15} /> Home
          </Link>
          <span className="font-display text-sm uppercase tracking-[0.32em] text-white">Portfolio Library</span>
          <Link
            href="/#contact"
            className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-signal md:inline-flex"
          >
            Connect
          </Link>
        </nav>
      </header>

      <section className="relative z-10 px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs uppercase tracking-[0.3em] text-signal">
              <Sparkles size={14} /> Creative Index
            </p>
            <h1 className="font-display text-[clamp(3.2rem,10vw,10.5rem)] font-semibold uppercase leading-[0.78] text-white">
              Choose
              <br />
              Your
              <br />
              Library
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mercury md:text-lg">
              Five focused rooms for Mayank&apos;s portfolio: branding, real estate campaigns, social media, UI/UX, and AI-assisted visual direction. Each page has its own tone and presentation flow.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-luxury backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,232,255,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(218,196,143,0.18),transparent_34%)]" />
            <div className="relative grid gap-4 sm:grid-cols-3">
              {featuredWorks.map((work, index) => {
                const size = imageSizeFor(work.image);

                return (
                  <div
                    key={work.title}
                    className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={size.width}
                      height={size.height}
                      priority={index === 0}
                      sizes={index === 0 ? "(min-width: 768px) 44vw, 92vw" : "(min-width: 768px) 20vw, 92vw"}
                      className="h-auto w-full p-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-signal">{work.format}</p>
                      <h2 className="mt-2 font-display text-xl leading-tight text-white">{work.title}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 border-y border-white/10 py-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-signal">
                <GalleryHorizontalEnd size={15} /> Category Rooms
              </p>
              <h2 className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">Open A Dedicated Page</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-mercury md:text-right">
              The library is now page-based, so each category can grow into a proper case-study gallery instead of sitting in one long scroll.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {portfolioCategories.map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative min-h-[31rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black shadow-luxury transition duration-500 hover:-translate-y-2 hover:border-white/35"
                style={{
                  "--niche-accent": category.accent,
                  "--niche-accent-soft": `${category.accent}33`,
                  "--niche-backdrop": category.backdrop
                } as CSSProperties}
              >
                <div className="absolute inset-0 niche-card-bg" />
                <div className="absolute inset-0 portfolio-card-grid opacity-20" />
                <div className="niche-haze absolute -left-14 top-20 h-44 w-44 rounded-full blur-2xl" />

                <div className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl">
                  {String(index + 1).padStart(2, "0")} / {category.label}
                </div>

                <div className="absolute inset-x-4 top-16 h-56 overflow-hidden rounded-[1.25rem] border border-white/15 bg-black/30 backdrop-blur-xl">
                  {category.previewImages.length > 0 ? (
                    category.previewImages.slice(0, 3).map((image, imageIndex) => (
                      <div key={image} className={`niche-image-sample niche-image-sample-${imageIndex + 1}`}>
                        <Image
                          src={image}
                          alt={`${category.title} preview ${imageIndex + 1}`}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_32%)]" />
                      <div className="niche-sample niche-sample-main">
                        <span>{category.motif}</span>
                      </div>
                      <div className="niche-sample niche-sample-a" />
                      <div className="niche-sample niche-sample-b" />
                      <div className="niche-sample niche-sample-c" />
                      <div className="niche-bar niche-bar-1" />
                      <div className="niche-bar niche-bar-2" />
                      <div className="niche-bar niche-bar-3" />
                    </>
                  )}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-3 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--niche-accent)]">Dedicated Page</p>
                  <h3 className="font-display text-3xl leading-none text-white">{category.title}</h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/64">{category.subtitle}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-black transition group-hover:bg-[var(--niche-accent)]">
                    Open Page <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
