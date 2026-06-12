import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, GalleryHorizontalEnd, LayoutGrid, Sparkles } from "lucide-react";
import { PreviewImage } from "@/components/preview-image";
import { aiGeneratedProjects, logoProjects, portfolioCategories, portfolioWorks, socialProjects, uiUxProjects } from "@/lib/portfolio-data";
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

export function generateStaticParams() {
  return portfolioCategories.map((category) => ({
    category: category.id
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategory(params.category);

  if (!category) {
    return {
      title: "Portfolio Category | Mayank Chauhan"
    };
  }

  return {
    title: `${category.title} | Mayank Chauhan Portfolio`,
    description: `${category.title} portfolio category by Mayank Chauhan. ${category.subtitle}`
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

  return (
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
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-mercury transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={15} /> Library
          </Link>
          <span className="font-display text-sm uppercase tracking-[0.28em] text-white">{category.title}</span>
          <Link
            href="/#contact"
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
              className={`rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition ${
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

      {category.id === "real-estate" && (
        <section className="relative z-10 px-4 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--niche-accent)]">
                  <LayoutGrid size={15} /> Campaign Wall
                </p>
                <h2 className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">Real Estate Creative Archive</h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-6 text-mercury md:block">
                Premium EDMs, OOH designs, social posters, thumbnails, and commercial property layouts in one focused collection.
              </p>
            </div>

            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 2xl:columns-4">
              {portfolioWorks.map((work) => {
                const size = imageSizeFor(work.image);

                return (
                  <article
                    key={work.title}
                    className="work-gallery-card group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#090b0f] shadow-luxury"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(142,232,255,0.13),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="relative p-3">
                      <figure className="relative overflow-hidden rounded-[1.25rem] bg-black/60">
                        <PreviewImage
                          src={assetPath(work.image)}
                          previewSrc={assetPath(fullQualitySrcFor(work.image))}
                          alt={work.title}
                          width={size.width}
                          height={size.height}
                          sizes="(min-width: 1536px) 23vw, (min-width: 1280px) 30vw, (min-width: 640px) 46vw, 92vw"
                          className="h-auto w-full p-2 transition duration-700 group-hover:scale-[1.02]"
                        />
                      </figure>
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

                <div className="grid gap-5 lg:grid-cols-2">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 p-3 shadow-luxury ${
                        index === 1 || index === 5 ? "lg:col-span-2" : ""
                      }`}
                    >
                      <PreviewImage
                        src={assetPath(image.src)}
                        previewSrc={assetPath(fullQualitySrcFor(image.src))}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        sizes={index === 1 || index === 5 ? "(min-width: 1024px) 72vw, 92vw" : "(min-width: 1024px) 36vw, 92vw"}
                        className="h-auto w-full rounded-[1.15rem] object-cover transition duration-700 group-hover:scale-[1.015]"
                      />
                      <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")} / {image.title}
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

                <div className="grid gap-5 lg:grid-cols-2">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/65 p-3 shadow-luxury ${
                        index === 1 ? "lg:col-span-2" : ""
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(190,255,0,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <PreviewImage
                        src={assetPath(image.src)}
                        previewSrc={assetPath(fullQualitySrcFor(image.src))}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        sizes={index === 1 ? "(min-width: 1024px) 72vw, 92vw" : "(min-width: 1024px) 36vw, 92vw"}
                        className="relative h-auto w-full rounded-[1.15rem] object-cover transition duration-700 group-hover:scale-[1.015]"
                      />
                      <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-lime-300/25 bg-black/55 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-lime-200 backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")} / {image.title}
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

                <div className="grid gap-5 lg:grid-cols-2">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/55 p-3 shadow-luxury ${
                        index === 0 || index === project.images.length - 1 ? "lg:col-span-2" : ""
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(158,255,196,0.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <PreviewImage
                        src={assetPath(image.src)}
                        previewSrc={assetPath(fullQualitySrcFor(image.src))}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        sizes={index === 0 || index === project.images.length - 1 ? "(min-width: 1024px) 72vw, 92vw" : "(min-width: 1024px) 36vw, 92vw"}
                        className="relative h-auto w-full rounded-[1.15rem] object-cover transition duration-700 group-hover:scale-[1.015]"
                      />
                      <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-emerald-200/25 bg-black/55 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-emerald-100 backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")} / {image.title}
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

                <div className="mx-auto grid max-w-5xl gap-5">
                  {project.images.map((image, index) => (
                    <article
                      key={image.src}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/55 p-3 shadow-luxury"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_12%,rgba(183,164,255,0.2),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <PreviewImage
                        src={assetPath(image.src)}
                        previewSrc={assetPath(fullQualitySrcFor(image.src))}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 72vw, 92vw"
                        className="relative h-auto w-full rounded-[1.15rem] object-cover transition duration-700 group-hover:scale-[1.015]"
                      />
                      <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-violet-200/25 bg-black/55 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-violet-100 backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")} / {image.title}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {category.id !== "branding" && category.id !== "real-estate" && category.id !== "social-media" && category.id !== "ui-ux" && category.id !== "ai-generated" && (
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
  );
}
