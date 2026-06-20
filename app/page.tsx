"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Download, GraduationCap, Mail, Phone, Sparkles } from "lucide-react";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { Spotlight } from "@/components/spotlight";
import { aiTools, coreExpertise, education, hobbies, metrics, portfolioCategories, profile, services, softwareSkills, timeline } from "@/lib/portfolio-data";
import { assetPath } from "@/lib/site-paths";

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
        { y: 96, opacity: 0, rotateX: -18, filter: "blur(10px)" },
        { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.15, stagger: 0.09, ease: "power4.out" }
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
            <h2 className="intro-line">Hello! I&apos;m</h2>
            <h1 className="intro-line">
              MAYANK
              <br />
              <span>CHAUHAN</span>
            </h1>
          </div>

          <div className="reference-model" aria-hidden>
            <div className="reference-rim" />
            <Image
              src={assetPath("/images/mayank-portrait.png")}
              alt="Mayank Chauhan portrait"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 46vw"
              className="reference-portrait"
            />
          </div>

          <div className="reference-info">
            <h3 className="intro-line">A Creative</h3>
            <h2 className="intro-line reference-accent">Graphic</h2>
            <h2 className="intro-line">Designer</h2>
            <p className="intro-line">
              UI design, brand visuals, campaign creatives, and video editing.
            </p>
            <a
              href={assetPath(profile.resume)}
              download
              className="intro-line mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black shadow-luxury transition hover:bg-signal"
            >
              Download Resume
              <Download size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
              <div className="font-display text-3xl text-white">{metric.value}</div>
              <div className="mt-2 text-xs uppercase leading-5 tracking-[0.14em] text-mercury">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionShell id="about" eyebrow="About Me" title={profile.aboutHeading}>
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
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-7 backdrop-blur-2xl md:p-10">
              <div className="space-y-5 text-base leading-8 text-mercury md:text-lg md:leading-9">
                {profile.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {profile.roles.map((role) => (
                  <div key={role} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                    <p className="whitespace-nowrap text-sm uppercase tracking-[0.12em] text-champagne">{role}</p>
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

      <section className="relative px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <article className="group relative min-h-[19rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-signal/35 hover:bg-white/[0.075]">
                <div className="absolute right-0 top-0 h-36 w-36 translate-x-10 -translate-y-10 rounded-full bg-signal/10 blur-3xl transition group-hover:bg-signal/20" />
                <p className="text-xs uppercase tracking-[0.28em] text-champagne">{service.kicker}</p>
                <h3 className="mt-16 font-display text-4xl leading-none text-white">{service.title}</h3>
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
              <p className="mb-4 text-xs uppercase tracking-[0.34em] text-signal">Creative Work</p>
              <h2 className="font-display text-[clamp(2.05rem,9vw,4.75rem)] font-semibold leading-[0.92] text-white md:text-[clamp(2.35rem,4.85vw,4.75rem)]">
                <span className="block md:whitespace-nowrap">Choose the niche.</span>
                <span className="block md:whitespace-nowrap">Enter the right creative world.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-mercury md:text-base">
                <span className="block">Explore focused creative worlds for branding,</span>
                <span className="block">real estate campaigns, Meta ads, social media, videos, and UI/UX.</span>
                <span className="block">Built with AI-generated concepts and presentation-ready case studies.</span>
              </p>
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
                              alt={`${category.title} preview ${imageIndex + 1}`}
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
                  <span className="mt-1 block text-sm font-semibold leading-tight">{category.title}</span>
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

      <SectionShell id="skills" eyebrow="Creative Stack" title="Software skills, AI tools, and creative expertise.">
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

          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-7">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-signal">AI Tools</p>
                  <h3 className="mt-3 font-display text-3xl text-white">AI-assisted creative workflow</h3>
                </div>
                <p className="max-w-md text-sm leading-6 text-mercury">
                  Tools used for prompt strategy, concept visuals, research, content, presentation systems, and video experimentation.
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
                        <p className="text-base font-medium leading-6 text-white">{tool.name}</p>
                        <p className="mt-1 text-xs leading-5 text-mercury">{tool.use}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="experience" eyebrow="Experience" title="Professional journey, education, and creative practice.">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative space-y-4">
            <div className="absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-signal via-white/20 to-transparent" />
            {timeline.map((item, index) => (
              <Reveal key={`${item.org}-${item.date}`} delay={index * 0.04}>
                <div className="relative ml-14 rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                  <span className="absolute left-[-2.75rem] top-7 h-4 w-4 rounded-full border border-signal bg-obsidian shadow-[0_0_24px_rgba(142,232,255,0.7)]" />
                  <p className="text-xs uppercase tracking-[0.24em] text-signal">{item.date}</p>
                  <h3 className="mt-3 font-display text-2xl text-white">{item.title}</h3>
                  <p className="mt-1 text-champagne">{item.org}</p>
                  <p className="mt-4 leading-7 text-mercury">{item.body}</p>
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

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
                <Sparkles className="mb-10 text-signal" size={30} />
                <h3 className="font-display text-3xl text-white">Hobbies</h3>
                <div className="mt-7 grid gap-3">
                  {hobbies.map((hobby) => (
                    <p key={hobby} className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-6 text-mercury">
                      {hobby}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <section id="contact" className="relative scroll-mt-28 px-4 py-16 md:px-8 md:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-luxury backdrop-blur-2xl sm:p-7 md:rounded-[2rem] md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,232,255,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(216,197,155,0.14),transparent_35%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-signal sm:tracking-[0.32em]">Contact</p>
                <h2 className="max-w-3xl font-display text-3xl leading-[1.04] text-white sm:text-5xl md:text-7xl">
                  Build the next visual system with Mayank.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-mercury sm:text-lg sm:leading-8">
                  Available for graphic design, UI concepts, campaign visuals, brand collateral, and video editing assignments.
                </p>
              </div>
              <div className="space-y-3">
                <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-white transition hover:border-signal/40 hover:bg-black/40 sm:p-5">
                  <span className="flex min-w-0 items-center gap-3"><Mail className="shrink-0" size={18} /> <span className="min-w-0 break-all">{profile.email}</span></span>
                  <ArrowUpRight className="shrink-0" size={18} />
                </a>
                <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-white transition hover:border-signal/40 hover:bg-black/40 sm:p-5">
                  <span className="flex min-w-0 items-center gap-3"><Phone className="shrink-0" size={18} /> <span>{profile.phone}</span></span>
                  <ArrowUpRight className="shrink-0" size={18} />
                </a>
                <a href={profile.behance} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 font-semibold text-black transition hover:bg-signal sm:p-5">
                  <span>View Behance Portfolio</span>
                  <ArrowUpRight className="shrink-0" size={18} />
                </a>
                <a href={assetPath(profile.resume)} download className="flex items-center justify-between gap-4 rounded-2xl border border-signal/35 bg-signal/15 p-4 font-semibold text-white transition hover:border-signal hover:bg-signal hover:text-black sm:p-5">
                  <span>Download Resume</span>
                  <Download className="shrink-0" size={18} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
