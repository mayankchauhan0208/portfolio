"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Award, Download, GraduationCap, Instagram, Layers3, Linkedin, Mail, Palette, Phone, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { Spotlight } from "@/components/spotlight";
import { aiTools, coreExpertise, education, featuredProjectClassifications, metrics, portfolioCategories, profile, services, softwareSkills, timeline } from "@/lib/portfolio-data";
import { assetPath } from "@/lib/site-paths";
import { trackPortfolioEvent } from "@/components/analytics-events";

type ContactAction = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const contactActions: ContactAction[] = [
  {
    label: "LinkedIn profile",
    shortLabel: "LinkedIn",
    href: "https://www.linkedin.com/in/mayankchauhan0208/",
    icon: Linkedin,
    external: true
  },
  {
    label: "Call Mayank Chauhan",
    shortLabel: "Call",
    href: "tel:+919992713289",
    icon: Phone
  },
  {
    label: "Email Mayank Chauhan",
    shortLabel: "Email",
    href: "mailto:connect.mayankchauhan@gmail.com",
    icon: Mail
  },
  {
    label: "Instagram profile",
    shortLabel: "Instagram",
    href: "https://www.instagram.com/chauhan_shab0208?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Instagram,
    external: true
  }
];

function ContactIconLinks({ includeBehance = false, labeled = false, className = "" }) {
  const actions = includeBehance
    ? [
        ...contactActions,
        {
          label: "Behance profile",
          shortLabel: "Behance",
          href: profile.behance,
          icon: Palette,
          external: true
        }
      ]
    : contactActions;

  return (
    <div className={`${labeled ? "grid grid-cols-2 gap-3 sm:grid-cols-5" : "flex flex-wrap gap-2"} ${className}`}>
      {actions.map(({ label, shortLabel, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          title={label}
          onClick={() => trackPortfolioEvent("contact_click", { channel: shortLabel.toLowerCase(), source: labeled ? "contact_section" : "hero" })}
          className={
            labeled
              ? "group flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-2 py-3 text-center text-white transition hover:border-signal/50 hover:bg-signal/10 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              : "contact-icon-link grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.065] text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-signal/60 hover:bg-signal/15 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          }
        >
          <Icon size={labeled ? 20 : 18} strokeWidth={1.9} aria-hidden />
          {labeled ? <span className="max-w-full text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.12em]">{shortLabel}</span> : null}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeCreative, setActiveCreative] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);



  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-line",
        { y: 72, opacity: 0, rotateX: -12 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" }
      );
      gsap.fromTo(
        ".reference-model",
        { y: 44, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.35, ease: "power4.out" }
      );
      gsap.to(".ambient-grid", {
        backgroundPosition: "120px 80px",
        duration: 18,
        ease: "none",
        repeat: -1
      });
    }, heroRef);

    return () => ctx.revert();
  }, [loaded]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCreative((current) => (current + 1) % portfolioCategories.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-obsidian">
      <LoadingOverlay onComplete={() => setLoaded(true)} />
      <Spotlight />
      <motion.div
        aria-hidden
        style={{ y: backgroundY }}
        className="pointer-events-none fixed inset-0 opacity-80"
      >
        <div className="absolute left-1/2 top-[-14rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl" />
        <div className="absolute bottom-[-18rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-champagne/10 blur-3xl" />
        <div className="ambient-grid absolute inset-0" />
      </motion.div>

      <Nav />

      <section ref={heroRef} className="reference-hero">
        <div className="reference-glow reference-glow-left" />
        <div className="reference-glow reference-glow-right" />
        <div className="reference-container">
          <div className="reference-intro">
            <p className="intro-line">Hello! I&apos;m</p>
            <h1 className="intro-line" aria-label="Mayank Chauhan — Senior Visual Designer & Senior Graphic Designer">
              <span>Mayank<br />Chauhan</span>
              <span className="sr-only"> — Senior Visual Designer &amp; Senior Graphic Designer</span>
            </h1>
          </div>

          <div className="reference-model" aria-hidden>
            <div className="reference-rim" />
            <Image
              src={assetPath("/images/mayank-portrait.webp")}
              alt="Mayank Chauhan visual designer portfolio portrait"
              fill
              priority
              sizes="(max-width: 768px) 76vw, (max-width: 1024px) 82vw, 32vw"
              className="reference-portrait"
            />
          </div>

          <div className="reference-info">
            <div className="intro-line reference-headline">
              Senior Visual Designer
              <br />
              Senior Graphic Designer
            </div>
            <p className="intro-line reference-support">
              I build brand systems, campaign visuals, presentations and multi-format creative communication across digital, print and motion.
            </p>
          </div>

          <div className="intro-line reference-hero-actions">
            <Link href="#work" aria-label="View selected work" className="reference-cta reference-cta-primary">
              View Selected Work
              <ArrowUpRight size={14} />
            </Link>
            <ContactIconLinks className="reference-contact-icons" />
            <a href={assetPath(profile.resume)} download aria-label="Download resume" onClick={() => trackPortfolioEvent("resume_download", { source: "hero" })} className="reference-cta reference-cta-secondary">
              Download Resume
              <Download size={14} />
            </a>
            <Link href="#contact" onClick={() => trackPortfolioEvent("contact_click", { channel: "contact_section", source: "hero" })} className="reference-cta reference-cta-secondary">
              Contact Me
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-8 md:px-8" aria-label="Design capability highlights">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-12">
          {metrics.map((metric) => {
            const MetricIcon = metric.icon === "award" ? Award : metric.icon === "workflow" ? Workflow : metric.icon === "layers" ? Layers3 : Sparkles;
            const span = metric.size === "compact" ? "md:col-span-6 lg:col-span-2" : metric.size === "wide" ? "md:col-span-12 lg:col-span-4" : "md:col-span-6 lg:col-span-3";
            const isAi = metric.size === "wide";
            return (
              <article
                key={metric.label}
                className={`${span} group relative min-h-40 overflow-hidden rounded-[1.5rem] border p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 ${isAi ? "border-indigo-300/30 bg-gradient-to-br from-blue-500/[0.12] via-black/50 to-purple-500/[0.14] shadow-[0_20px_70px_rgba(99,102,241,0.14)] hover:border-indigo-200/55" : "border-white/10 bg-gradient-to-br from-white/[0.065] via-black/45 to-black/70 hover:border-white/25"}`}
              >
                <div className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${isAi ? "bg-[radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.2),transparent_45%)]" : "bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_45%)]"}`} />
                <MetricIcon className={`relative mb-8 ${isAi ? "text-indigo-200" : "text-signal"}`} size={21} strokeWidth={1.6} aria-hidden="true" />
                <div className="relative font-display text-[clamp(1.45rem,2.2vw,2.15rem)] leading-tight text-white">{metric.value}</div>
                <div className={`relative mt-2 leading-5 text-mercury ${isAi ? "max-w-md text-sm normal-case tracking-normal" : "text-xs uppercase tracking-[0.13em]"}`}>{metric.label}</div>
              </article>
            );
          })}
        </div>
      </section>

      <SectionShell id="about" eyebrow="Profile" title="About Mayank">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-luxury backdrop-blur-2xl">
              <Sparkles className="mb-12 text-signal" size={28} />
              <p className="font-display text-3xl leading-tight text-white">{profile.aboutSnapshot}</p>
              <p className="mt-6 leading-7 text-mercury">
                {profile.aboutSnapshotBody}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 backdrop-blur-2xl md:p-10">
              <div className="space-y-4 text-sm leading-7 text-mercury sm:text-base md:text-lg md:leading-9">
                {profile.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 grid gap-3 md:grid-cols-3 md:gap-4">
                {profile.roles.map((role) => (
                  <div key={role} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 md:p-5">
                    <p className="text-sm uppercase tracking-[0.12em] text-champagne">{role}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {["Lead-generation creatives", "Brand-consistent systems", "Execution-ready assets"].map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <section className="relative px-4 pb-8 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-signal/20 bg-black/30 p-5 shadow-luxury backdrop-blur-2xl md:p-7">
            <div className="mb-5 inline-flex rounded-full border border-signal/20 bg-signal/[0.08] px-5 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">Core Expertise</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.aboutCoreExpertise.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:border-signal/30 hover:bg-signal/[0.1]"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="capabilities" className="relative scroll-mt-24 px-4 py-8 md:px-8" aria-label="Senior design capabilities">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <article className="group relative h-full min-h-[21.5rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-signal/35 hover:bg-white/[0.075]">
                <div className="absolute right-0 top-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-signal/10 blur-3xl transition group-hover:bg-signal/20" />
                <p className="text-xs uppercase tracking-[0.28em] text-champagne">{service.kicker}</p>
                {index === 2 ? (
                  <h3 className="mt-16 font-display text-4xl leading-none text-white">{service.title}</h3>
                ) : (
                  <h2 className="mt-16 font-display text-4xl leading-none text-white">{service.title}</h2>
                )}
                <p className="mt-6 leading-7 text-mercury">{service.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="relative scroll-mt-24 overflow-hidden px-4 py-12 md:px-8 md:py-16">
        <div className="absolute inset-x-0 top-10 mx-auto h-[34rem] max-w-6xl rounded-full bg-[radial-gradient(circle,rgba(142,232,255,0.2),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(18,54,92,0.7),transparent_38%)]" />
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#05070c]/82 px-5 pb-6 pt-10 shadow-luxury backdrop-blur-2xl md:px-10 md:pt-12">
            <div className="absolute inset-0 portfolio-card-grid opacity-[0.08]" />
            <div className="absolute left-1/2 top-[-9rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-signal/15 blur-3xl" />
            <div className="relative mx-auto max-w-6xl text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.34em] text-signal">Campaign systems and case studies</p>
              <h2 className="font-display text-[clamp(2.05rem,9vw,4.75rem)] font-semibold leading-[0.92] text-white md:text-[clamp(2.35rem,4.85vw,4.75rem)]">Selected Work</h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-mercury md:text-base">
                <span className="block">Review focused work across branding,</span>
                <span className="block">real estate marketing, performance ads, digital campaigns, motion, and UI visuals.</span>
                <span className="block">Each category is organized with case-study context and presentation-ready creative sets.</span>
              </p>
            </div>


            <div className="relative mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-2">
              {featuredProjectClassifications.map((project) => (
                <article key={project.title} className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-signal/35">
                  <Link href={project.href} prefetch={false} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-inset">
                    <div className="relative aspect-[16/8] overflow-hidden bg-black/30">
                      <Image src={assetPath(project.image)} alt={project.imageAlt} fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-signal backdrop-blur-xl">{project.classification}</span>
                    </div>
                  </Link>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-2xl leading-tight text-white">{project.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-champagne">{project.disclosure}</p>
                    <dl className="mt-5 grid gap-4 text-sm leading-6">
                      {[
                        ["Brief", project.brief], ["My role", project.role], ["Problem / constraint", project.constraint],
                        ["Design approach / system", project.approach], ["Deliverables / channels", project.deliverables],
                        ["Tools", project.tools], ["Outcome / scale", project.outcome], ["AI involvement", project.ai]
                      ].map(([label, value]) => (
                        <div key={label} className="border-t border-white/10 pt-3">
                          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-signal">{label}</dt>
                          <dd className="mt-1 text-white/72">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Link href={project.href} prefetch={false} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-signal/45 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">
                      View case study <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="relative mx-auto mt-5 flex max-w-6xl flex-wrap gap-2" aria-label="Project classification key">
              {["Employer Work", "Freelance Work", "Personal Concept", "AI-Assisted Personal Concept"].map((label) => (
                <span key={label} className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/65">{label}</span>
              ))}
            </div>

            <div
              className="creative-stage relative mx-auto mt-6 min-h-[22rem] max-w-6xl sm:min-h-[24rem] md:min-h-[27rem]"
            >
              {portfolioCategories.map((category, index) => {
                const rawOffset = (index - activeCreative + portfolioCategories.length) % portfolioCategories.length;
                const signedOffset = rawOffset > Math.floor(portfolioCategories.length / 2) ? rawOffset - portfolioCategories.length : rawOffset;
                const positionClass = signedOffset === 0 ? "niche-position-center" : `niche-position-${signedOffset > 0 ? "right" : "left"}-${Math.abs(signedOffset)}`;
                return (
                <Link
                  key={category.id}
                  href={category.href}
                  prefetch={false}
                  className={`home-niche-card niche-showcase-card ${positionClass} group absolute overflow-hidden rounded-[1.6rem] border border-white/15 bg-black shadow-luxury transition duration-1000 ease-out`}
                  style={{
                    "--niche-accent": category.accent,
                    "--niche-accent-soft": `${category.accent}33`,
                    "--niche-backdrop": category.backdrop
                  } as CSSProperties}
                >
                  <div className="absolute inset-0 niche-card-bg" />
                  <div className="absolute inset-0 portfolio-card-grid opacity-20" />
                  <div className="niche-inner-window absolute inset-x-4 top-14 h-44 overflow-hidden rounded-[1.3rem] border border-white/15 bg-black/28 backdrop-blur-xl">
                    {category.previewImages.length > 0 ? (
                      <>
                        {category.previewImages.slice(0, 3).map((image, imageIndex) => (
                          <div key={image} className={`niche-image-sample niche-image-sample-${imageIndex + 1}`}>
                            <Image
                              src={assetPath(image)}
                              alt={`${category.title} work preview by Mayank Chauhan`}
                              fill
                              sizes="180px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </>
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
                  <div className="niche-ring absolute -right-12 bottom-20 h-36 w-36 rounded-full border" />
                  <div className="niche-haze absolute -left-16 top-40 h-40 w-40 rounded-full blur-2xl" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl">
                    {category.label}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl leading-none text-white">{category.title}</h3>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/62">{category.subtitle}</p>
                  </div>
                </Link>
                );
              })}
            </div>

            <div className="relative mx-auto mt-4 grid max-w-6xl gap-2 rounded-[1.5rem] border border-white/10 bg-black/30 p-2 backdrop-blur-xl md:mt-0 md:grid-cols-4 lg:grid-cols-7">
              {portfolioCategories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCreative(index)}
                  className={`rounded-[1rem] px-3 py-3 text-left transition duration-300 ${
                    activeCreative === index ? "bg-white text-black" : "bg-white/[0.04] text-white/68 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="block text-[0.58rem] uppercase tracking-[0.18em] opacity-70">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-xs font-semibold leading-tight lg:text-[0.8rem]">{category.title}</span>
                </button>
              ))}
            </div>

            <div className="relative mt-6 flex justify-center">
              <Link
                href={portfolioCategories[activeCreative].href}
                prefetch={false}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:bg-signal"
              >
                Open {portfolioCategories[activeCreative].title} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative scroll-mt-24 px-4 py-12 md:px-8" aria-label="AI-enhanced workflow">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.08}>
            <div id="ai-workflow" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-7">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-signal">Supporting Workflow</p>
                  <h2 className="mt-3 font-display text-3xl text-white">AI-Enhanced Workflow</h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-mercury">
                  Uses AI-assisted workflows for research, concept exploration, image development, motion experimentation and production acceleration while maintaining designer-led direction, brand consistency and final quality control.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {aiTools.map((tool, index) => (
                  <Reveal key={tool.name} delay={index * 0.015}>
                    <div className="group flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-champagne/35 hover:bg-white/[0.07]">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[1.15rem] bg-white text-xs font-bold text-black shadow-[0_18px_36px_rgba(0,0,0,0.36)] ring-1 ring-white/20">
                        <span className="absolute inset-0 grid place-items-center">{tool.fallback}</span>
                        {tool.logo ? (
                          <Image
                            src={assetPath(tool.logo)}
                            alt={`${tool.name} logo`}
                            fill
                            sizes="56px"
                            className="relative z-10 object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-champagne">{tool.group}</p>
                        <p className="mt-1 text-base font-medium leading-6 text-white">{tool.name}</p>
                        <p className="mt-1 text-xs leading-5 text-mercury">{tool.use}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <SectionShell id="experience" eyebrow="Career" title="Professional Experience">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative space-y-4">
            <div className="absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-signal via-white/20 to-transparent" />
            {timeline.map((item, index) => (
              <Reveal key={`${item.org}-${item.date}`} delay={index * 0.04}>
                <div className="relative ml-10 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl sm:ml-14 sm:p-6">
                  <span className="absolute left-[-2.75rem] top-7 h-4 w-4 rounded-full border border-signal bg-obsidian shadow-[0_0_24px_rgba(142,232,255,0.7)]" />
                  <p className="text-xs uppercase tracking-[0.24em] text-signal">{item.date}</p>
                  {"exactPeriod" in item ? <p className="mt-2 text-xs text-white/55">Detailed record: {item.exactPeriod}</p> : null}
                  {"employmentType" in item ? <span className="mt-2 inline-flex rounded-full border border-signal/25 bg-signal/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-signal">{item.employmentType}</span> : null}
                  <h3 className="mt-3 font-display text-2xl text-white">{item.title}</h3>
                  <p className="mt-1 text-champagne">{item.org}</p>
                  <p className="mt-4 text-sm leading-7 text-mercury md:text-base">{item.body}</p>
                  {"bullets" in item ? (
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-white/74">
                      {item.bullets.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {"tags" in item ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.08}>
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
                <GraduationCap className="mb-10 text-signal" size={30} />
                <h3 className="font-display text-3xl text-white">Education</h3>
                <div className="mt-7 space-y-4">
                  {education.map((item) => (
                    <div key={item.level} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">{item.level}</p>
                      <p className="mt-2 leading-6 text-white">{item.institution}</p>
                      <p className="mt-1 leading-6 text-mercury">{item.course}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="skills" eyebrow="Creative Stack" title="Digital, Print and Motion">
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-7">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-signal">Software Skills</p>
                  <h3 className="mt-3 font-display text-3xl text-white">Design and production tools</h3>
                </div>
                <p className="max-w-md text-sm leading-6 text-mercury">
                  Core applications used for graphics, UI concepts, presentations, editing, and campaign production.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {softwareSkills.map((tool, index) => (
                  <Reveal key={tool.name} delay={index * 0.02}>
                    <div className="group flex min-h-24 items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-signal/35 hover:bg-white/[0.07]">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[1.15rem] bg-white text-sm font-bold text-black shadow-[0_18px_36px_rgba(0,0,0,0.36)] ring-1 ring-white/20">
                        <span className="absolute inset-0 grid place-items-center">{tool.fallback}</span>
                        {tool.logo ? (
                          <Image
                            src={assetPath(tool.logo)}
                            alt={`${tool.name} logo`}
                            fill
                            sizes="56px"
                            className="relative z-10 object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : null}
                      </div>
                      <p className="text-base font-medium leading-6 text-white">{tool.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl md:p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-champagne">Core Expertise</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {coreExpertise.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm leading-6 text-mercury">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </SectionShell>

      <section id="contact" className="relative scroll-mt-28 px-4 pb-36 pt-16 md:px-8 md:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-luxury backdrop-blur-2xl sm:p-7 md:rounded-[2rem] md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,232,255,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(216,197,155,0.14),transparent_35%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-signal sm:tracking-[0.32em]">Contact</p>
                <h2 className="max-w-3xl font-display text-3xl leading-[1.04] text-white sm:text-5xl md:text-7xl">Contact</h2>
                <p className="mt-4 max-w-3xl font-display text-2xl leading-tight text-white sm:text-4xl">Let&apos;s build clear, premium visual communication.</p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-mercury sm:text-lg sm:leading-8">
                  Open to full-time Senior Visual Designer and Senior Graphic Designer opportunities.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Senior Visual Design", "Senior Graphic Design", "Campaign Systems", "Presentation Design", "Commercial Execution"].map((role) => (
                    <span key={role} className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[0.68rem] font-semibold uppercase leading-none tracking-[0.14em] text-white/72">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <ContactIconLinks includeBehance labeled />
                <a href={assetPath(profile.resume)} download aria-label="Download resume" onClick={() => trackPortfolioEvent("resume_download", { source: "contact_section" })} className="flex min-h-12 min-w-0 items-center justify-between gap-4 rounded-2xl border border-signal/35 bg-signal/15 p-4 font-semibold text-white transition hover:border-signal hover:bg-signal hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian sm:p-5">
                  <span className="flex min-w-0 items-center gap-3"><Download className="shrink-0" size={18} /> <span>Download Resume</span></span>
                  <ArrowUpRight className="shrink-0" size={18} />
                </a>
                <Link href="#work" aria-label="View selected work" className="flex min-h-12 min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-white transition hover:border-signal/40 hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian sm:p-5">
                  <span>View Selected Work</span>
                  <ArrowUpRight className="shrink-0" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <footer className="border-t border-white/10 px-4 pb-32 pt-8 text-center text-xs uppercase tracking-[0.18em] text-white/45 md:px-8">
        Last updated: 2026
      </footer>
    </main>
  );
}
