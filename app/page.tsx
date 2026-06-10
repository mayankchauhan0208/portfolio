"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, Phone, Sparkles } from "lucide-react";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { Spotlight } from "@/components/spotlight";
import { education, metrics, portfolioCategories, profile, projects, services, skills, timeline } from "@/lib/portfolio-data";
import { assetPath } from "@/lib/site-paths";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeCreative, setActiveCreative] = useState(1);
  const [creativePaused, setCreativePaused] = useState(false);
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
    if (creativePaused) return;

    const timer = window.setInterval(() => {
      setActiveCreative((current) => (current + 1) % portfolioCategories.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [creativePaused]);

  const selected = projects[activeProject];

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
          </div>

          <div className="reference-actions intro-line">
            <a data-cursor="magnetic" href="#contact">
              Connect Now <ArrowUpRight size={16} />
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

      <SectionShell id="about" eyebrow="Profile" title="Premium visuals with clarity, motion, and purpose.">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-luxury backdrop-blur-2xl">
              <Sparkles className="mb-12 text-signal" size={28} />
              <p className="font-display text-3xl leading-tight text-white">Design that feels clean at first glance and considered when you look closer.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-7 backdrop-blur-2xl md:p-10">
              <p className="text-xl leading-9 text-mercury">{profile.positioning}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {profile.roles.map((role) => (
                  <div key={role} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-champagne">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

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

      <section id="work" className="relative scroll-mt-28 overflow-hidden px-4 py-20 md:px-8 md:py-28">
        <div className="absolute inset-x-0 top-10 mx-auto h-[34rem] max-w-6xl rounded-full bg-[radial-gradient(circle,rgba(142,232,255,0.2),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(18,54,92,0.7),transparent_38%)]" />
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#05070c]/82 px-5 pb-8 pt-14 shadow-luxury backdrop-blur-2xl md:px-10 md:pb-12 md:pt-20">
            <div className="absolute inset-0 portfolio-card-grid opacity-[0.08]" />
            <div className="absolute left-1/2 top-[-9rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-signal/15 blur-3xl" />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="mb-5 text-xs uppercase tracking-[0.34em] text-signal">Creative Work</p>
              <h2 className="font-display text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.86] text-white">
                Choose the niche. Enter the right creative world.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-mercury md:text-base">
                A rotating portfolio system for branding, real estate creatives, social media, UI/UX, and AI generated visual concepts.
              </p>
            </div>

            <div
              className="creative-stage relative mx-auto mt-14 min-h-[30rem] max-w-6xl md:min-h-[36rem]"
              onMouseEnter={() => setCreativePaused(true)}
              onMouseLeave={() => setCreativePaused(false)}
              onFocus={() => setCreativePaused(true)}
              onBlur={() => setCreativePaused(false)}
            >
              {portfolioCategories.map((category, index) => {
                const offset = (index - activeCreative + portfolioCategories.length) % portfolioCategories.length;
                return (
                <Link
                  key={category.id}
                  href={category.href}
                  onMouseEnter={() => {
                    setActiveCreative(index);
                    setCreativePaused(true);
                  }}
                  onFocus={() => setActiveCreative(index)}
                  className={`niche-showcase-card niche-position-${offset} group absolute overflow-hidden rounded-[1.6rem] border border-white/15 bg-black shadow-luxury transition duration-700 hover:z-30 hover:border-white/45`}
                  style={{
                    "--niche-accent": category.accent,
                    "--niche-accent-soft": `${category.accent}33`,
                    "--niche-backdrop": category.backdrop
                  } as CSSProperties}
                >
                  <div className="absolute inset-0 niche-card-bg" />
                  <div className="absolute inset-0 portfolio-card-grid opacity-20" />
                  <div className="niche-inner-window absolute inset-x-4 top-16 h-52 overflow-hidden rounded-[1.3rem] border border-white/15 bg-black/28 backdrop-blur-xl">
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
                  <div className="niche-ring absolute -right-12 bottom-24 h-40 w-40 rounded-full border" />
                  <div className="niche-haze absolute -left-16 top-44 h-44 w-44 rounded-full blur-2xl" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl">
                    {category.label}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="mb-2 text-[0.58rem] uppercase tracking-[0.18em] text-[var(--niche-accent)]">
                      Open Niche
                    </p>
                    <h3 className="font-display text-2xl leading-none text-white">{category.title}</h3>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/62">{category.subtitle}</p>
                  </div>
                </Link>
                );
              })}
            </div>

            <div className="relative mx-auto -mt-2 grid max-w-4xl gap-2 rounded-[1.5rem] border border-white/10 bg-black/30 p-2 backdrop-blur-xl md:-mt-8 md:grid-cols-5">
              {portfolioCategories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCreative(index);
                    setCreativePaused(true);
                  }}
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
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:bg-signal"
              >
                Open {portfolioCategories[activeCreative].title} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionShell id="experience" eyebrow="Experience Case Studies" title="Professional roles shaped into focused design stories.">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.03}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                  className={`group w-full rounded-3xl border p-5 text-left transition duration-500 ${
                    activeProject === index
                      ? "border-signal/35 bg-white/[0.095] shadow-glow"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex gap-4">
                      <span className={`mt-1 font-display text-xl ${activeProject === index ? "text-signal" : "text-white/30"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-signal">{project.eyebrow}</p>
                      <h3 className="font-display text-2xl leading-tight text-white">{project.title}</h3>
                      </div>
                    </div>
                    <ArrowUpRight className="mt-1 shrink-0 text-white/50 transition group-hover:text-signal" size={22} />
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-mercury">{project.summary}</p>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <motion.article
              key={selected.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="sticky top-28 min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/15 bg-graphite/95 p-6 shadow-luxury backdrop-blur-2xl md:p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${selected.glow} opacity-45`} />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/10" />
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-signal/20" />
              <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full border border-champagne/20" />
              <div className="relative">
                <div className="mb-24 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/75">
                    {selected.period}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-black">
                    <BriefcaseBusiness size={18} />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.32em] text-champagne">Case Study Focus</p>
                <h3 className="mt-4 font-display text-4xl leading-none text-white md:text-6xl">{selected.title}</h3>
                <p className="mt-7 text-lg leading-8 text-white/82">{selected.details}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.16em] text-mercury">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="skills" eyebrow="Creative Stack" title="Tools for brand visuals, interfaces, and motion-led content.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Reveal key={skill.name} delay={index * 0.03}>
                <div className="group rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-signal/35 hover:bg-white/[0.08]">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black transition group-hover:bg-signal">
                      <Icon size={20} />
                    </div>
                    <span className="font-display text-2xl text-white">{skill.level}</span>
                  </div>
                  <h3 className="text-lg text-white">{skill.name}</h3>
                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-signal to-champagne"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell id="timeline" eyebrow="Experience" title="A steady path from studio practice to senior design work.">
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
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
              <GraduationCap className="mb-10 text-signal" size={30} />
              <h3 className="font-display text-3xl text-white">Education</h3>
              <div className="mt-7 space-y-4">
                {education.map((item) => (
                  <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 leading-7 text-mercury">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <section id="contact" className="relative scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-luxury backdrop-blur-2xl md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,232,255,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(216,197,155,0.14),transparent_35%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-signal">Contact</p>
                <h2 className="font-display text-4xl leading-none text-white md:text-7xl">
                  Build the next visual system with Mayank.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-mercury">
                  Available for graphic design, UI concepts, campaign visuals, brand collateral, and video editing assignments.
                </p>
              </div>
              <div className="space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-5 text-white transition hover:border-signal/40 hover:bg-black/40">
                  <span className="flex items-center gap-3"><Mail size={18} /> {profile.email}</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href={`tel:${profile.phone.replaceAll(" ", "")}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-5 text-white transition hover:border-signal/40 hover:bg-black/40">
                  <span className="flex items-center gap-3"><Phone size={18} /> {profile.phone}</span>
                  <ArrowUpRight size={18} />
                </a>
                <a href={profile.behance} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-white p-5 font-semibold text-black transition hover:bg-signal">
                  <span>View Behance Portfolio</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
