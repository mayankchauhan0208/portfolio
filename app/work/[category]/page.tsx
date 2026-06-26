import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, GalleryHorizontalEnd, LayoutGrid, Sparkles } from "lucide-react";
import { PreviewImage } from "@/components/preview-image";
import { PreviewVideo } from "@/components/preview-video";
import { aiGeneratedProjects, logoProjects, metaAdsProjects, portfolioCategories, portfolioWorks, socialProjects, uiUxProjects, videoProjects } from "@/lib/portfolio-data";
import { assetPath } from "@/lib/site-paths";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

const conceptTiles = ["Visual Direction", "Campaign System", "Presentation Mockup", "Creative Board", "Launch Layout", "Brand Surface"];

function imageSizeFor(src: string) {
  if (src.includes("ooh")) {
    return { width: 4500, height: 2400 };
  }

  if (src.includes("thumbnail")) {
    return { width: 1920, height: 1080 };
  }

  if (
    src.includes("palwal") ||
    src.includes("oberoi-sky") ||
    src.includes("bptp-private") ||
    src.includes("workspace") ||
    src.includes("future-work") ||
    src.includes("harmony")
  ) {
    return { width: 768, height: 1376 };
  }

  return { width: 1080, height: 1920 };
}

function fullQualitySrcFor(src: string) {
  if (!src.startsWith("/optimized/work/")) {
    return src;
  }

  const originalSrc = src.replace("/optimized", "");

  if (src.endsWith("/fitness-ui-app.webp") || src.endsWith("/interior-consistency-03.webp")) {
    return originalSrc.replace(/\.webp$/, ".jpg");
  }

  return originalSrc.replace(/\.webp$/, ".png");
}

function getCategory(slug: string) {
  return portfolioCategories.find((category) => category.id === slug);
}

type GalleryImage = {
  width: number;
  height: number;
};

function galleryCardClassFor(image: GalleryImage, index: number, total = 0) {
  const isLandscape = image.width / image.height >= 1.35;
  const isSquare = Math.abs(image.width - image.height) <= Math.max(image.width, image.height) * 0.08;
  const isTallFeature = image.height / image.width >= 2.8;
  const isOpeningOrClosing = index === 0 || index === total - 1;

  return [
    "project-gallery-card group",
    isLandscape ? "project-gallery-card-wide" : "",
    isSquare ? "project-gallery-card-square" : "",
    isTallFeature ? "project-gallery-card-feature" : "",
    isOpeningOrClosing && total > 5 ? "project-gallery-card-anchor" : ""
  ]
    .filter(Boolean)
    .join(" ");
}

export function generateStaticParams() {
  return portfolioCategories.map((category) => ({
    category: category.id
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategory(params.category);

  if (!category) {
    return {
      title: "Portfolio Category"
    };
  }

  return {
    title: `${category.title} Portfolio`,
    description: `${category.title} work by Mayank Chauhan, covering visual design, brand communication, campaign creatives, UI visual design, real-estate marketing, motion/video, and AI-assisted creative workflows. ${category.subtitle}`,
    openGraph: {
      title: `${category.title} Portfolio | Mayank Chauhan`,
      description: `${category.title} work by Mayank Chauhan. ${category.subtitle}`
    },
    twitter: {
      title: `${category.title} Portfolio | Mayank Chauhan`,
      description: `${category.title} work by Mayank Chauhan. ${category.subtitle}`
    }
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.category);

  if (!category) {
    notFound();
  }

  const categoryStyle = {
    "--niche-accent": category.accent,
    "--niche-backdrop": category.backdrop,
    "--niche-accent-soft": `${category.accent}33`
  } as CSSProperties;

  const caseStudyCards = [
    { label: "Challenge", value: category.caseStudy.challenge },
    { label: "My Role", value: category.caseStudy.role },
    { label: "Design Direction", value: category.caseStudy.direction },
    { label: "Outcome", value: category.caseStudy.outcome }
  ];

  return (
    <>
      <style>{`
        .project-gallery-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-auto-flow: row;
          gap: 1.25rem;
        }

        .project-gallery-grid--project {
          align-items: start;
        }

        .project-gallery-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-radius: 1.5rem;
          border: 1px solid rgb(255 255 255 / 0.1);
          background: rgb(0 0 0 / 0.48);
          padding: 0.85rem;
          box-shadow: 0 24px 80px rgb(0 0 0 / 0.32);
        }

        .project-gallery-figure {
          position: relative;
          overflow: hidden;
          border-radius: 1.15rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          background:
            radial-gradient(circle at 50% 0%, rgb(126 233 255 / 0.08), transparent 42%),
            rgb(0 0 0 / 0.62);
        }

        .project-gallery-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          padding: 0.4rem;
          border-radius: 1rem;
          transition:
            transform 700ms ease,
            filter 700ms ease;
        }

        .project-gallery-card:hover .project-gallery-image {
          transform: scale(1.01);
          filter: saturate(1.04) contrast(1.02);
        }

        .project-gallery-meta {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 0.1rem 0.15rem;
        }

        .project-gallery-tag {
          display: inline-flex;
          align-items: center;
          min-height: 1.8rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.06);
          padding: 0.45rem 0.75rem;
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          white-space: nowrap;
          color: rgb(255 255 255 / 0.78);
        }

        .project-gallery-title {
          min-width: 0;
          flex: 1 1 14rem;
          color: rgb(255 255 255 / 0.88);
          font-size: 0.88rem;
          font-weight: 700;
          line-height: 1.35;
        }

        @media (min-width: 768px) {
          .project-gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.6rem;
          }

          .project-gallery-card-wide,
          .project-gallery-card-feature {
            grid-column: span 2;
          }

          .project-gallery-card-square {
            min-height: 100%;
          }

          .project-gallery-card-wide .project-gallery-image {
            padding: 0.25rem;
          }
        }

        @media (min-width: 1280px) {
          .project-gallery-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.9rem;
          }

          .project-gallery-grid--project {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .project-gallery-grid:not(.project-gallery-grid--project) .project-gallery-card-anchor {
            grid-column: span 2;
          }

          .project-gallery-card-feature {
            grid-column: span 2;
          }

          .project-gallery-card-square:not(.project-gallery-card-wide):not(.project-gallery-card-feature) {
            max-width: none;
          }
        }
      `}</style>
      <main className="min-h-screen overflow-hidden bg-obsidian text-platinum" style={categoryStyle}>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-14rem] top-[-18rem] h-[42rem] w-[42rem] rounded-full bg-[var(--niche-accent-soft)] blur-3xl" />
        <div className="absolute right-[-12rem] top-[20rem] h-[34rem] w-[34rem] rounded-full bg-champagne/10 blur-3xl" />
        <div className="ambient-grid absolute inset-0 opacity-80" />
      </div>

      <header className="relative z-20 px-4 py-6 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-obsidian/68 px-4 py-3 shadow-luxury backdrop-blur-2xl">
          <Link
            href="/work"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-mercury transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={15} /> Library
          </Link>
          <span className="font-display text-sm uppercase tracking-[0.28em] text-white">{category.title}</span>
          <Link
            href="/#contact"
            prefetch={false}
            className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[var(--niche-accent)] md:inline-flex"
          >
            Connect
          </Link>
        </nav>
      </header>

      <section className="relative z-10 px-4 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--niche-accent)]">
              <Sparkles size={14} /> {category.label}
            </p>
            <h1 className="font-display text-6xl font-semibold uppercase leading-none text-white md:text-8xl lg:text-9xl">
              {category.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mercury md:text-lg">{category.subtitle}</p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-2 border-y border-white/10 py-5">
          {portfolioCategories.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              prefetch={false}
              className={`rounded-full border px-3 py-2 text-center text-[0.64rem] uppercase leading-tight tracking-[0.16em] transition sm:px-4 sm:text-[0.68rem] ${
                item.id === category.id
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:border-[var(--niche-accent)] hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12 md:px-8 md:pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-luxury backdrop-blur-xl md:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--niche-accent)]">Case Study Context</p>
              <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">How this work was approached</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-mercury md:text-base">{category.caseStudy.overview}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {caseStudyCards.map((item) => (
                <article key={item.label} className="rounded-[1.35rem] border border-white/10 bg-black/24 p-4">
                  <p className="mb-2 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[var(--niche-accent)]">{item.label}</p>
                  <p className="text-sm leading-6 text-white/72">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[var(--niche-accent)]">Deliverables</p>
              <div className="flex flex-wrap gap-2">
                {category.caseStudy.deliverables.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs leading-none text-white/76">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[var(--niche-accent)]">Tools Used</p>
              <div className="flex flex-wrap gap-2">
                {category.caseStudy.tools.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs leading-none text-white/76">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {category.id === "real-estate" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--niche-accent)]">
                  <LayoutGrid size={15} /> Campaign Wall
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">Real Estate Marketing Archive</h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-6 text-mercury md:block">
                Premium EDMs, OOH designs, social posters, thumbnails, and commercial property layouts in one focused collection.
              </p>
            </div>

            <div className="project-gallery-grid">
              {portfolioWorks.map((work, index) => {
                const size = imageSizeFor(work.image);

                return (
                  <article
                    key={work.title}
                    className={galleryCardClassFor(size, index, portfolioWorks.length)}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(142,232,255,0.13),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="relative p-3">
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(work.image)}
                          previewSrc={assetPath(fullQualitySrcFor(work.image))}
                          alt={work.title}
                          width={size.width}
                          height={size.height}
                          sizes="(min-width: 1536px) 23vw, (min-width: 1280px) 30vw, (min-width: 640px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">Real Estate Marketing</span>
                        <span className="project-gallery-title">{work.title}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {category.id === "branding" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {logoProjects.map((project) => (
              <div key={project.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0906] p-5 shadow-luxury backdrop-blur-xl md:p-8">
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[var(--niche-accent)]">{project.format}</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-6xl">{project.title}</h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-mercury md:text-base">{project.brief}</p>
                </div>

                <div className="project-gallery-grid project-gallery-grid--project">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={galleryCardClassFor(image, index, project.images.length)}
                    >
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(image.src)}
                          previewSrc={assetPath(fullQualitySrcFor(image.src))}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-gallery-title">{image.title}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id === "social-media" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {socialProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[2rem] border border-lime-300/20 bg-[#060806] p-5 shadow-luxury backdrop-blur-xl md:p-8"
              >
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-lime-300">{project.format}</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-6xl">{project.title}</h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-mercury md:text-base">{project.brief}</p>
                </div>

                <div className="project-gallery-grid project-gallery-grid--project">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={galleryCardClassFor(image, index, project.images.length)}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(190,255,0,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(image.src)}
                          previewSrc={assetPath(fullQualitySrcFor(image.src))}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-gallery-title">{image.title}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id === "meta-ads" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {metaAdsProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[2rem] border border-sky-300/20 bg-[#050913] p-5 shadow-luxury backdrop-blur-xl md:p-8"
              >
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-sky-200">{project.format}</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-6xl">{project.title}</h2>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/45">{project.category}</p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-mercury md:text-base">{project.brief}</p>
                </div>

                <div className="project-gallery-grid project-gallery-grid--project">
                  {project.images.map((image, index) => (
                    <article key={image.src} className={galleryCardClassFor(image, index, project.images.length)}>
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(125,211,255,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(image.src)}
                          previewSrc={assetPath(image.src)}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-gallery-title">{image.title}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id === "ui-ux" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {uiUxProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[2rem] border border-emerald-200/20 bg-[#06100d] p-5 shadow-luxury backdrop-blur-xl md:p-8"
              >
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-emerald-200">{project.format}</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-6xl">{project.title}</h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-mercury md:text-base">{project.brief}</p>
                </div>

                <div className="project-gallery-grid project-gallery-grid--project">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={galleryCardClassFor(image, index, project.images.length)}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(158,255,196,0.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(image.src)}
                          previewSrc={assetPath(fullQualitySrcFor(image.src))}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-gallery-title">{image.title}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id === "ai-generated" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {aiGeneratedProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[#080817] p-5 shadow-luxury backdrop-blur-xl md:p-8"
              >
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-violet-200">{project.format}</p>
                    <h2 className="font-display text-4xl leading-none text-white md:text-6xl">{project.title}</h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-mercury md:text-base">{project.brief}</p>
                </div>

                <div className="project-gallery-grid project-gallery-grid--project">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={galleryCardClassFor(image, index, project.images.length)}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_12%,rgba(183,164,255,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <figure className="project-gallery-figure">
                        <PreviewImage
                          src={assetPath(image.src)}
                          previewSrc={assetPath(fullQualitySrcFor(image.src))}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="project-gallery-image"
                        />
                      </figure>
                      <div className="project-gallery-meta">
                        <span className="project-gallery-tag">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-gallery-title">{image.title}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id === "videos" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--niche-accent)]">
                  <GalleryHorizontalEnd size={15} /> Playback Gallery
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">Video Work Preview</h2>
              </div>
              <p className="hidden max-w-md text-right text-sm leading-6 text-mercury md:block">
                Lightweight poster cards open into a full-screen video viewer with play, stop, mute, and close controls.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
              {videoProjects.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-[2rem] border border-amber-200/20 bg-[#100b06] p-4 shadow-luxury backdrop-blur-xl md:p-5"
                >
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/50">
                    <PreviewVideo
                      src={project.src ? assetPath(project.src) : undefined}
                      poster={assetPath(project.poster)}
                      title={project.title}
                      width={project.width}
                      height={project.height}
                      sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 44vw, 92vw"
                      className="h-[31rem] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-3 pt-5 md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-amber-200">{project.format}</p>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/70">
                        {project.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl leading-none text-white">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-mercury">{project.brief}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {category.id !== "branding" && category.id !== "real-estate" && category.id !== "social-media" && category.id !== "meta-ads" && category.id !== "ui-ux" && category.id !== "ai-generated" && category.id !== "videos" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--niche-accent)]">
                  <GalleryHorizontalEnd size={15} /> Category Presentation
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">Creative Direction System</h2>
              </div>
              <p className="hidden max-w-md text-right text-sm leading-6 text-mercury md:block">
                A polished category page built for future case studies, thumbnails, campaign boards, and presentation-ready creative sets.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {conceptTiles.map((tile, index) => (
                <article key={tile} className="group relative min-h-[24rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/35 p-5 shadow-luxury">
                  <div className="absolute inset-0 opacity-70" style={{ background: category.backdrop }} />
                  <div className="absolute inset-0 portfolio-card-grid opacity-20" />
                  <div className="niche-haze absolute -right-14 -top-14 h-40 w-40 rounded-full blur-2xl" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/75">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="text-white/45 transition group-hover:text-white" size={20} />
                    </div>
                    <div className="grid place-items-center py-10">
                      <div className="grid h-32 w-32 place-items-center rounded-full border border-white/20 bg-black/35 font-display text-5xl text-white shadow-glow">
                        {category.motif}
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-[0.62rem] uppercase tracking-[0.2em] text-[var(--niche-accent)]">{category.label}</p>
                      <h3 className="font-display text-3xl leading-none text-white">{tile}</h3>
                      <p className="mt-4 text-sm leading-6 text-white/65">{category.subtitle}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      </main>
    </>
  );
}
