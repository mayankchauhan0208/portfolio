import siteContent from "@/content/site.json";

export const profile = siteContent.profile;

export const metrics = [
  { value: "5+", label: "Years of design experience" },
  { value: "Digital + Print", label: "Multi-format delivery" },
  { value: "Campaign Systems", label: "Commercial creative focus" },
  { value: "15 Days", label: "Notice period" }
];

export const projects = [
  {
    title: "Property Master Pvt. Ltd.",
    eyebrow: "Current Role",
    period: "October 2025 - Present",
    summary: "Senior-level ownership of real-estate campaign, sales, presentation, digital, and print communication.",
    details: "Translates marketing and sales requirements into consistent visual systems, coordinates revisions, performs visual quality checks, and prepares execution-ready assets across formats.",
    tags: ["Senior Graphic Designer", "Campaign Ownership", "Stakeholder Collaboration", "Multi-format Delivery"],
    glow: "from-champagne/35 via-white/10 to-transparent"
  },
  {
    title: "Property Master Pvt. Ltd.",
    eyebrow: "Freelance",
    period: "May 2024 - September 2025",
    summary: "Freelance campaign and sales-support design before moving into the full-time senior role.",
    details: "Delivered real-estate marketing creatives and presentation assets across digital and print requirements.",
    tags: ["Freelance Graphic Designer", "Real Estate", "Campaign Creatives", "Presentation Design"],
    glow: "from-signal/35 via-white/10 to-transparent"
  },
  {
    title: "Caterpillar Signs Pvt. Ltd. (Group Bayport)",
    eyebrow: "Graphic Design",
    period: "September 2022 - September 2025",
    summary: "Brand and marketing production across campaign, corporate, social, presentation, and print-ready communication.",
    details: "Maintained production consistency through typography, spacing, image treatment, resizing, version control, and final visual quality checks.",
    tags: ["Graphic Designer", "Marketing Design", "Production Quality", "Visual QA"],
    glow: "from-purple-300/30 via-white/10 to-transparent"
  },
  {
    title: "7P Digital Services LLP",
    eyebrow: "Design + Video",
    period: "March 2022 - September 2022",
    summary: "Digital campaign design and video editing for social, promotional, and platform-specific formats.",
    details: "Created static and motion assets using Photoshop, Illustrator, Premiere Pro, After Effects, and Canva.",
    tags: ["Graphic Designer", "Video Editor", "Campaign Assets", "Motion Content"],
    glow: "from-emerald-200/25 via-white/10 to-transparent"
  }
];

export const softwareSkills = [
  { name: "Adobe Photoshop", logo: "/optimized/tool-icons/adobe-photoshop.webp", fallback: "Ps" },
  { name: "Adobe Illustrator", logo: "/optimized/tool-icons/adobe-illustrator.webp", fallback: "Ai" },
  { name: "Adobe InDesign", logo: "/optimized/tool-icons/adobe-indesign.webp", fallback: "Id" },
  { name: "Adobe After Effects", logo: "/optimized/tool-icons/adobe-after-effects.webp", fallback: "Ae" },
  { name: "Adobe Premiere Pro", logo: "/optimized/tool-icons/adobe-premiere-pro.webp", fallback: "Pr" },
  { name: "Figma", logo: "/optimized/tool-icons/figma.webp", fallback: "Fg" },
  { name: "Microsoft PowerPoint", logo: "/optimized/tool-icons/microsoft-powerpoint.webp", fallback: "Pp" },
  { name: "Canva", logo: "/optimized/tool-icons/canva.webp", fallback: "Ca" }
];

export const coreExpertise = [
  "Campaign & Marketing Design",
  "Brand Communication",
  "Presentation Design",
  "Real Estate Marketing",
  "Multi-format Delivery",
  "Visual Quality Control",
  "Stakeholder Collaboration",
  "Digital & Print Production"
];

export const aiTools = [
  { name: "ChatGPT", use: "Brief exploration and production support", logo: "/optimized/tool-icons/chatgpt.webp", fallback: "GPT" },
  { name: "Adobe Firefly", use: "Image exploration and controlled editing", logo: "/optimized/tool-icons/adobe-firefly.webp", fallback: "Ff" },
  { name: "Midjourney", use: "Early visual concept exploration", logo: "/optimized/tool-icons/midjourney.webp", fallback: "Mj" },
  { name: "Google Flow", use: "Supporting motion and video experiments", logo: "/optimized/tool-icons/google-flow.webp", fallback: "Fl" }
];

export const services = [
  {
    title: "Brand Presence",
    kicker: "Identity / Campaigns",
    body: "Brand assets, marketing creatives, and presentation visuals designed with consistent hierarchy, clear messaging, and premium recall."
  },
  {
    title: "Interface Concepts",
    kicker: "UI / Figma / XD",
    body: "Landing pages, app screens, and product concepts with clean structure, polished spacing, and user-friendly visual flow."
  },
  {
    title: "Motion Content",
    kicker: "Premiere / After Effects",
    body: "Edited videos, reels, and campaign motion assets shaped with clear pacing, strong composition, and brand-focused energy."
  }
];

export const featuredProjectClassifications = [
  {
    title: "Property Master Real Estate Campaigns",
    classification: "Employer Work",
    disclosure: "Campaign and sales-support work created as part of the Property Master role.",
    href: "/work/real-estate",
    image: "/optimized/work/real-estate/trevoc-luxury-launch.webp"
  },
  {
    title: "Caterpillar Signs Pvt. Ltd. (Group Bayport) Brand and Marketing Communication",
    classification: "Employer Work",
    disclosure: "Brand and marketing communication created as part of the Group Bayport role.",
    href: "/work/branding",
    image: "/optimized/work/branding/roastory/roastory-brand-mockups-grid.webp"
  },
  {
    title: "KENT Water Purifier Digital Brand Experience",
    classification: "Personal Concept",
    disclosure: "Personal concept; not commissioned by KENT.",
    href: "/work/branding",
    image: "/optimized/work/branding/kent/kent-01.webp"
  },
  {
    title: "Emaar India Business Centre Visual Exploration",
    classification: "AI-Assisted Concept",
    disclosure: "AI-assisted personal concept; not commissioned by Emaar.",
    href: "/work/ai-generated",
    image: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-01.webp"
  }
];

export const portfolioWorks = [
  {
    title: "Luxury Living Crown Campaign",
    category: "Property Master",
    format: "Social Poster",
    brief: "A royal black, blue, and gold launch visual positioning residential towers as a premium high-value address.",
    image: "/optimized/work/real-estate/trevoc-luxury-launch.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Gold luxury"
  },
  {
    title: "Emaar Business Centre Reveal",
    category: "Commercial Real Estate",
    format: "EDM Campaign",
    brief: "A clean commercial launch creative with bright architectural scale, corporate hierarchy, and booking urgency.",
    image: "/optimized/work/real-estate/emaar-business-centre-coming-soon.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Corporate blue"
  },
  {
    title: "Serenity Hills Escape",
    category: "Luxury Residential",
    format: "Poster Campaign",
    brief: "A nature-led visual direction built around privacy, calm, and aspirational high-rise living.",
    image: "/optimized/work/real-estate/emaar-serenity-hills-escape.webp",
    span: "md:col-span-2 md:row-span-2",
    tone: "Forest luxury"
  },
  {
    title: "Neoliv Golf One OOH",
    category: "Outdoor Campaign",
    format: "15x8 ft Hoarding",
    brief: "A wide-format golf-facing plot campaign using high-contrast green texture, lifestyle promise, and strong recall.",
    image: "/optimized/work/real-estate/neoliv-golf-one-ooh-08.webp",
    span: "md:col-span-4 md:row-span-1",
    tone: "Lifestyle green"
  },
  {
    title: "Own The Greens",
    category: "Outdoor Campaign",
    format: "Luxury Hoarding",
    brief: "An open landscape composition for golf plots, designed for instant readability and premium scale.",
    image: "/optimized/work/real-estate/neoliv-golf-one-ooh-05.webp",
    span: "md:col-span-4 md:row-span-1",
    tone: "Open-air premium"
  },
  {
    title: "Emaar Serenity Explainer",
    category: "Video Thumbnail",
    format: "YouTube Cover",
    brief: "A bolder thumbnail layout made for fast recognition, presenter focus, and property-led attention.",
    image: "/optimized/work/real-estate/emaar-serenity-hills-meta.webp",
    span: "md:col-span-4 md:row-span-1",
    tone: "High contrast"
  },
  {
    title: "Business Address Pin",
    category: "Commercial Real Estate",
    format: "EDM Poster",
    brief: "A polished business-centre creative using a gold pin device to frame workplace aspiration and returns.",
    image: "/optimized/work/real-estate/emaar-business-centre-pin.webp",
    span: "md:col-span-2 md:row-span-2",
    tone: "Navy gold"
  },
  {
    title: "Serenity Hills Master Thumbnail",
    category: "Residential Campaign",
    format: "Social Thumbnail",
    brief: "A direct, high-impact sales visual using project naming, location clarity, and bold color contrast.",
    image: "/optimized/work/real-estate/emaar-serenity-hills-thumbnail.webp",
    span: "md:col-span-4 md:row-span-1",
    tone: "Editorial"
  },
  {
    title: "Tonino Lamborghini Residences",
    category: "Ultra Luxury",
    format: "Investment EDM",
    brief: "A prestige-led brand partnership creative with disciplined hierarchy, scarcity cues, and black-gold restraint.",
    image: "/optimized/work/real-estate/lamborghini-residences-edm.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Prestige black"
  },
  {
    title: "Emaar Night Commercial",
    category: "Commercial Real Estate",
    format: "Premium Poster",
    brief: "A night-time glass facade visual built around growth, stability, and corporate credibility.",
    image: "/optimized/work/real-estate/emaar-business-centre-night.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Midnight blue"
  },
  {
    title: "Legacy of Growth",
    category: "Commercial Real Estate",
    format: "EDM Creative",
    brief: "A polished office-space campaign with architectural framing, gold orbit accents, and leadership messaging.",
    image: "/optimized/work/real-estate/emaar-business-centre-legacy.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Visionary"
  },
  {
    title: "Workspace That Powers Vision",
    category: "Commercial Real Estate",
    format: "Mobile EDM",
    brief: "A feature-heavy mobile creative focused on office space benefits, vertical hierarchy, and conversion clarity.",
    image: "/optimized/work/real-estate/eibc-workspace-vision.webp",
    span: "md:col-span-2 md:row-span-2",
    tone: "Sales utility"
  },
  {
    title: "Future Of Work Landmark",
    category: "Commercial Real Estate",
    format: "Mobile EDM",
    brief: "A low-angle architecture composition designed to make the property feel tall, modern, and commercially strong.",
    image: "/optimized/work/real-estate/eibc-future-work.webp",
    span: "md:col-span-2 md:row-span-2",
    tone: "Urban blue"
  },
  {
    title: "Luxury Breathes In Nature",
    category: "Residential Campaign",
    format: "Mobile EDM",
    brief: "A calm blue-gold residential asset balancing lifestyle warmth with clear price, size, and location cues.",
    image: "/optimized/work/real-estate/emaar-serenity-harmony.webp",
    span: "md:col-span-2 md:row-span-2",
    tone: "Nature premium"
  },
  {
    title: "Luxury & Returns",
    category: "Commercial Real Estate",
    format: "EDM Campaign",
    brief: "A premium office campaign visual using arched framing, gold details, and strong value-led messaging.",
    image: "/optimized/work/real-estate/eibc-luxury-returns.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Blue gold"
  },
  {
    title: "Palwal Prime Land",
    category: "Plotted Township",
    format: "Investment Poster",
    brief: "A clean plotted township campaign combining green entry visuals, price clarity, and practical project details.",
    image: "/optimized/work/real-estate/palwal-prime-land.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Fresh daylight"
  },
  {
    title: "Faridabad Vertical Oasis",
    category: "Residential Campaign",
    format: "Premium Poster",
    brief: "A softer biophilic campaign direction with light gold accents, lifestyle imagery, and luxury apartment positioning.",
    image: "/optimized/work/real-estate/bptp-vertical-oasis.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Soft luxury"
  },
  {
    title: "Private Haven Above The Canopy",
    category: "Residential Campaign",
    format: "Poster Campaign",
    brief: "A serene residential concept using circular framing and airy space to communicate privacy and elevation.",
    image: "/optimized/work/real-estate/bptp-private-haven.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Canopy gold"
  },
  {
    title: "Rare Asset Investment",
    category: "Ultra Luxury",
    format: "Premium EDM",
    brief: "A chess-inspired investment visual with polished restraint, scarcity language, and elite residential appeal.",
    image: "/optimized/work/real-estate/oberoi-rare-assets.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Strategic luxury"
  },
  {
    title: "Oberoi Sky Living",
    category: "Ultra Luxury",
    format: "Mobile Poster",
    brief: "A lifestyle-rich terrace campaign designed around five-star privacy, city views, and high-ticket clarity.",
    image: "/optimized/work/real-estate/oberoi-sky-living.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Skyline luxury"
  },
  {
    title: "Inheritance Reserved",
    category: "Ultra Luxury",
    format: "EDM Poster",
    brief: "A cinematic evening balcony concept selling exclusivity, privacy, and generational aspiration.",
    image: "/optimized/work/real-estate/oberoi-inheritance.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Evening estate"
  },
  {
    title: "AIPL Commercial Future",
    category: "Retail Commercial",
    format: "Social Poster",
    brief: "A bold retail investment creative using mall scale, light trails, and direct ground-floor messaging.",
    image: "/optimized/work/real-estate/aipl-commercial-future.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Retail energy"
  },
  {
    title: "Vamana Greens Development",
    category: "Plotted Township",
    format: "Social Poster",
    brief: "A premium plotted-development creative using deep blue, gold pricing, and polished township framing.",
    image: "/optimized/work/real-estate/vamana-greens-development.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Township premium"
  },
  {
    title: "Vamana Lifestyle Experience",
    category: "Plotted Township",
    format: "Social Poster",
    brief: "A bright residential township creative with lifestyle-focused copy and a softer, more aspirational palette.",
    image: "/optimized/work/real-estate/vamana-greens-lifestyle.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Lifestyle daylight"
  },
  {
    title: "BPTP Landmark Height",
    category: "Residential Campaign",
    format: "Project Poster",
    brief: "A bold launch communication for vertical garden residences, balancing amenity badges with high-rise scale.",
    image: "/optimized/work/real-estate/bptp-landmark-height.webp",
    span: "md:col-span-3 md:row-span-2",
    tone: "Launch blue"
  }
];

export const portfolioCategories = [
  {
    id: "branding",
    title: "Brand Systems",
    label: "Identity Systems",
    subtitle: "Identity design, logo systems, brand guidelines, mockups, product visuals, and premium visual systems.",
    href: "/work/branding",
    accent: "#d8dde2",
    backdrop: "linear-gradient(145deg, #050608 0%, #1b1d20 50%, #d8dde2 130%)",
    motif: "BR",
    caseStudy: {
      overview: "A focused collection of identity-led visual systems, brand applications, and presentation-ready brand worlds.",
      challenge: "Keep the brand language consistent across logos, typography, color, mockups, and marketing touchpoints without making the layouts feel repetitive.",
      role: "Created visual layouts, organized brand assets, refined presentation flow, and prepared polished brand-facing creative applications.",
      direction: "Clean hierarchy, controlled spacing, premium typography, restrained color systems, and realistic mockup presentation.",
      deliverables: ["Logo systems", "Brand applications", "Guideline-style decks", "Mockups", "Presentation layouts"],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Canva"],
      outcome: "Built a cleaner visual direction for brand and marketing use while improving consistency across presentation and campaign assets."
    },
    previewImages: [
      "/optimized/work/branding/kent/kent-01.webp",
      "/optimized/work/branding/cavaro/cavaro-01.webp",
      "/optimized/work/branding/aurix/aurix-01.webp",
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate Marketing",
    label: "Property Campaigns",
    subtitle: "Property launch campaigns, sales creatives, outdoor layouts, digital assets, and premium real-estate communication.",
    href: "/work/real-estate",
    accent: "#8ee8ff",
    backdrop: "linear-gradient(145deg, #06111f 0%, #0d3158 50%, #8ee8ff 120%)",
    motif: "RE",
    caseStudy: {
      overview: "A real-estate marketing collection built around launch communication, premium property presentation, and sales-support visuals.",
      challenge: "Communicate high-value property offerings clearly across formats while balancing project imagery, offer messaging, location details, and brand credibility.",
      role: "Designed campaign creatives, sales visuals, brochures, banners, thumbnails, and social-ready assets for property marketing communication.",
      direction: "Premium spacing, strong image treatment, readable offer hierarchy, clean typography, and polished real-estate visual framing.",
      deliverables: ["Launch creatives", "Brochures", "Banners", "Outdoor layouts", "Social posts", "Sales communication assets"],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Canva"],
      outcome: "Improved presentation quality through stronger hierarchy, spacing, typography, and image treatment across real-estate marketing assets."
    },
    previewImages: [
      "/optimized/work/real-estate/trevoc-luxury-launch.webp",
      "/optimized/work/real-estate/emaar-business-centre-coming-soon.webp",
      "/optimized/work/real-estate/emaar-serenity-hills-escape.webp"
    ]
  },
  {
    id: "social-media",
    title: "Digital Campaigns",
    label: "Social Campaigns",
    subtitle: "Social posts, thumbnails, carousels, campaign banners, and digital-first marketing layouts.",
    href: "/work/social-media",
    accent: "#ff8bbd",
    backdrop: "linear-gradient(145deg, #190911 0%, #3a1830 52%, #ff8bbd 120%)",
    motif: "SM",
    caseStudy: {
      overview: "A digital campaign collection covering social creatives, thumbnails, carousels, promotional layouts, and campaign communication.",
      challenge: "Create quick-to-read visuals that can hold attention in busy digital feeds while keeping brand tone and message clarity intact.",
      role: "Designed social posts, campaign banners, thumbnail concepts, carousel layouts, and promotional assets for digital communication.",
      direction: "Bold visual hooks, short readable messaging, consistent layout systems, strong contrast, and feed-friendly composition.",
      deliverables: ["Social posts", "Carousels", "Story formats", "Thumbnails", "Campaign banners", "Promotional layouts"],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Figma"],
      outcome: "Designed execution-ready assets for social media, digital campaigns, and promotional communication."
    },
    previewImages: [
      "/optimized/work/social-media/nike/nike-01.webp",
      "/optimized/work/social-media/orient-electric/orient-electric-01.webp",
      "/optimized/work/social-media/kyro/kyro-01.webp"
    ]
  },
  {
    id: "ui-ux",
    title: "UI Visual Design",
    label: "Product Concepts",
    subtitle: "Landing pages, app screens, dashboards, interface concepts, and polished digital product visuals.",
    href: "/work/ui-ux",
    accent: "#9effc4",
    backdrop: "linear-gradient(145deg, #07120e 0%, #12372c 52%, #9effc4 120%)",
    motif: "UX",
    caseStudy: {
      overview: "A UI visual design collection focused on website, app, dashboard, and landing-page concepts with strong visual structure.",
      challenge: "Make screens feel polished and easy to scan while maintaining hierarchy, spacing, and component consistency across multiple page types.",
      role: "Created screen layouts, visual concepts, responsive presentation boards, interface sections, and component-led design compositions.",
      direction: "Clear page hierarchy, consistent components, spacious layouts, refined typography, and responsive visual presentation.",
      deliverables: ["Landing pages", "App screens", "Dashboards", "Website concepts", "Responsive boards", "UI component layouts"],
      tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"],
      outcome: "Organized UI visuals into a more structured and recruiter-friendly presentation with cleaner hierarchy and spacing."
    },
    previewImages: [
      "/optimized/work/ui-ux/greenaura/greenaura-01.webp",
      "/optimized/work/ui-ux/aurea-dental/aurea-dental-01.webp",
      "/optimized/work/ui-ux/fitness/fitness-ui-app.webp"
    ]
  },
  {
    id: "videos",
    title: "Motion & Video",
    label: "Motion / Reels",
    subtitle: "Video edits, reels, launch films, walkthroughs, and motion-led campaign previews.",
    href: "/work/videos",
    accent: "#ffcf6b",
    backdrop: "linear-gradient(145deg, #120905 0%, #3a1f12 52%, #ffcf6b 120%)",
    motif: "VD",
    caseStudy: {
      overview: "A motion and video collection covering reels, edits, launch previews, thumbnails, and video-led campaign communication.",
      challenge: "Shape video content so the message is clear quickly, with pacing, titles, framing, and thumbnail visuals supporting the campaign purpose.",
      role: "Edited videos, created motion-led campaign previews, refined thumbnails, arranged visual pacing, and supported reel-style communication.",
      direction: "Clean motion titles, sharp pacing, readable on-screen text, strong opening frames, and brand-aligned visual storytelling.",
      deliverables: ["Video edits", "Reels", "Launch films", "Walkthrough previews", "Motion titles", "Thumbnails"],
      tools: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Photoshop"],
      outcome: "Created video-led communication assets that feel clearer, more structured, and easier to present across campaign use cases."
    },
    previewImages: [
      "/work/videos/video-01.webp",
      "/work/videos/video-05.webp",
      "/work/videos/video-09.webp"
    ]
  },
  {
    id: "meta-ads",
    title: "Performance Ad Creatives",
    label: "Paid Social",
    subtitle: "Performance ad layouts, paid-social variations, launch offers, carousel concepts, and campaign-ready creatives.",
    href: "/work/meta-ads",
    accent: "#7dd3ff",
    backdrop: "linear-gradient(145deg, #06111f 0%, #102f5f 50%, #7dd3ff 120%)",
    motif: "MA",
    caseStudy: {
      overview: "A performance ad creative collection focused on paid-social layouts, offer-led visuals, and campaign-ready creative variations.",
      challenge: "Keep ad creatives readable and visually direct while fitting different placements such as square feed, story, compact, and landscape formats.",
      role: "Designed ad variations, offer layouts, campaign hooks, placement-specific adaptations, and organized creative sets for presentation.",
      direction: "Strong hooks, clear offer hierarchy, readable typography, placement-aware composition, and consistent visual framing.",
      deliverables: ["Square ads", "Story creatives", "Landscape placements", "Compact ad layouts", "Offer creatives", "Carousel-style concepts"],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
      outcome: "Created execution-ready ad creative sets with clearer visual hooks, offer readability, and consistent campaign presentation."
    },
    previewImages: [
      "/optimized/work/meta-ads/elan-106/meta-ad-01.webp",
      "/optimized/work/meta-ads/emaar-commerce-park/meta-ad-02.webp",
      "/optimized/work/meta-ads/godrej-retreat/meta-ad-03.webp"
    ]
  },
  {
    id: "ai-generated",
    title: "AI Creative Workflows",
    label: "Concept Visuals",
    subtitle: "AI-assisted visual workflows, concept scenes, image experiments, and campaign-ready art direction.",
    href: "/work/ai-generated",
    accent: "#b7a4ff",
    backdrop: "linear-gradient(145deg, #0a0a18 0%, #211d54 52%, #b7a4ff 120%)",
    motif: "AI",
    caseStudy: {
      overview: "An AI-assisted creative workflow collection showing image creation, visual experiments, concept scenes, and production support assets.",
      challenge: "Develop consistent visual outputs from AI-generated material while improving composition, realism, naming, and presentation quality.",
      role: "Created and refined AI-assisted visuals, directed prompts, selected stronger outputs, organized image sets, and prepared them for portfolio presentation.",
      direction: "Consistent composition, premium lighting, clean framing, realistic image treatment, and campaign-ready visual selection.",
      deliverables: ["AI-assisted images", "Concept scenes", "Visual experiments", "Prompt-led explorations", "Image sets", "Presentation boards"],
      tools: ["ChatGPT", "Gemini", "Midjourney", "Adobe Firefly", "FLUX", "Photoshop"],
      outcome: "Built a structured visual workflow for AI-assisted concept development, image exploration, and creative production support."
    },
    previewImages: [
      "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-01.webp",
      "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-02.webp",
      "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-03.webp"
    ]
  }
];

export const videoProjects = [
  {
    title: "Property Campaign Reel",
    category: "Real Estate Video",
    format: "Edited Reel",
    brief:
      "A vertical real-estate campaign edit shaped for fast viewing, clear project recall, and social-first engagement.",
    poster: "/work/videos/video-01.webp",
    src: "/work/videos/video-01.mp4",
    width: 720,
    height: 1280,
    duration: "0:48"
  },
  {
    title: "Launch Communication Reel",
    category: "Real Estate Video",
    format: "Short Video",
    brief:
      "A compact campaign video built around clean pacing, project highlights, and a polished sales-ready rhythm.",
    poster: "/work/videos/video-02.webp",
    src: "/work/videos/video-02.mp4",
    width: 720,
    height: 1280,
    duration: "0:33"
  },
  {
    title: "172 Sq. Yds Builder Floor",
    category: "Builder Floor",
    format: "Property Reel",
    brief:
      "A focused builder-floor showcase using vertical framing, benefit-led sequencing, and quick property detail delivery.",
    poster: "/work/videos/video-03.webp",
    src: "/work/videos/video-03.mp4",
    width: 720,
    height: 1280,
    duration: "0:57"
  },
  {
    title: "Builder Floor Buying Tips",
    category: "Real Estate Education",
    format: "Expert Tips Reel",
    brief:
      "An informational short designed to make advice easy to follow while keeping the edit energetic and social-friendly.",
    poster: "/work/videos/video-04.webp",
    src: "/work/videos/video-04.mp4",
    width: 720,
    height: 1280,
    duration: "0:41"
  },
  {
    title: "Malibu Town 4 BHK Walkthrough",
    category: "Luxury Builder Floor",
    format: "Walkthrough Reel",
    brief:
      "A vertical walkthrough edit for a premium builder floor, balancing location appeal, interiors, and buying intent.",
    poster: "/work/videos/video-05.webp",
    src: "/work/videos/video-05.mp4",
    width: 720,
    height: 1280,
    duration: "0:58"
  },
  {
    title: "Sector 85 4 BHK Builder Floor",
    category: "Builder Floor",
    format: "Short Property Video",
    brief:
      "A property-led reel with clean transitions, compact feature highlights, and a strong sales communication structure.",
    poster: "/work/videos/video-06.webp",
    src: "/work/videos/video-06.mp4",
    width: 720,
    height: 1280,
    duration: "0:54"
  },
  {
    title: "Sector 85 Builder Floor Highlight",
    category: "Builder Floor",
    format: "Short Video",
    brief:
      "A quick social edit presenting a builder-floor offer with direct visuals, readable pacing, and conversion clarity.",
    poster: "/work/videos/video-07.webp",
    src: "/work/videos/video-07.mp4",
    width: 720,
    height: 1280,
    duration: "0:52"
  },
  {
    title: "Client Presentation Video",
    category: "Campaign Video",
    format: "Long Reel",
    brief:
      "A longer vertical campaign edit structured for presentation viewing, project storytelling, and sustained attention.",
    poster: "/work/videos/video-08.webp",
    src: "/work/videos/video-08.mp4",
    width: 720,
    height: 1280,
    duration: "1:38"
  },
  {
    title: "Faridabad Real Estate Bridge",
    category: "Market Update",
    format: "Explainer Reel",
    brief:
      "A real-estate update video edited for clear context, local relevance, and fast social-platform consumption.",
    poster: "/work/videos/video-09.webp",
    src: "/work/videos/video-09.mp4",
    width: 720,
    height: 1280,
    duration: "0:53"
  },
  {
    title: "Gurgaon Reel Ad",
    category: "Real Estate Ad",
    format: "Ad Video",
    brief:
      "A promotional reel with campaign pacing, real-estate offer clarity, and a short-form ad structure.",
    poster: "/work/videos/video-10.webp",
    src: "/work/videos/video-10.mp4",
    width: 720,
    height: 1280,
    duration: "0:42"
  },
  {
    title: "Puri Kohinoor Sector 89",
    category: "Project Reel",
    format: "Short Video",
    brief:
      "A project-focused short video presenting key property appeal through clean sequencing and vertical-first framing.",
    poster: "/work/videos/video-11.webp",
    src: "/work/videos/video-11.mp4",
    width: 720,
    height: 1280,
    duration: "0:48"
  },
  {
    title: "Project Walkthrough Edit",
    category: "Real Estate Video",
    format: "Walkthrough Reel",
    brief:
      "A vertical property walkthrough edit built for smooth viewing, fast project understanding, and sales support.",
    poster: "/work/videos/video-12.webp",
    src: "/work/videos/video-12.mp4",
    width: 720,
    height: 1280,
    duration: "0:55"
  },
  {
    title: "Sector 63A Investment Reel",
    category: "Investment Campaign",
    format: "Explainer Reel",
    brief:
      "A short investment-led reel that combines project positioning, locality cues, and smart-buy messaging.",
    poster: "/work/videos/video-13.webp",
    src: "/work/videos/video-13.mp4",
    width: 720,
    height: 1280,
    duration: "0:57"
  }
];

export const metaAdsProjects = [
  {
    title: "Elan 106 Meta Ads",
    category: "Luxury Real Estate",
    format: "Meta Ad Set",
    brief:
      "A premium campaign group for Elan 106, adapted across square, landscape, and feed-friendly formats for consistent paid-social delivery.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/elan-106/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/elan-106/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/elan-106/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Elan The Presidential Meta Ads",
    category: "Luxury Real Estate",
    format: "Meta Ad Set",
    brief:
      "A high-end residential campaign system created for premium positioning, clear offer visibility, and refined social-media presence.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/elan-presidential/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/elan-presidential/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/elan-presidential/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Emaar Commerce Park Meta Ads",
    category: "Commercial Real Estate",
    format: "Meta Ad Set",
    brief:
      "A commercial project campaign with formats designed for business audiences, project recall, and high-intent lead generation.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/emaar-commerce-park/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Vertical Story Creative", src: "/optimized/work/meta-ads/emaar-commerce-park/meta-ad-02.webp", width: 1080, height: 1920 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/emaar-commerce-park/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Godrej Retreat Meta Ads",
    category: "Residential Campaign",
    format: "Meta Ad Set",
    brief:
      "A residential paid-social set adapted for feed, story, and landscape placements with a consistent project message.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/godrej-retreat/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Portrait Feed Creative", src: "/optimized/work/meta-ads/godrej-retreat/meta-ad-02.webp", width: 1080, height: 1350 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/godrej-retreat/meta-ad-03.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/godrej-retreat/meta-ad-04.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Paragon Meta Ads",
    category: "Real Estate Campaign",
    format: "Meta Ad Set",
    brief:
      "A clean paid-social campaign group shaped for lead capture, fast readability, and consistent brand recall across placements.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/paragon/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/paragon/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/paragon/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Reach Airia Corporate Tower Meta Ads 01",
    category: "Commercial Real Estate",
    format: "Meta Ad Set",
    brief:
      "A commercial tower campaign set with a sharp paid-social structure for visibility, enquiry intent, and project clarity.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/reach-airia-01/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/reach-airia-01/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/reach-airia-01/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Reach Airia Corporate Tower Meta Ads 02",
    category: "Commercial Real Estate",
    format: "Meta Ad Set",
    brief:
      "A second paid-social variation for the same project, exploring a different visual hierarchy and lead-focused message.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/reach-airia-02/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/reach-airia-02/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/reach-airia-02/meta-ad-03.webp", width: 610, height: 324 }
    ]
  },
  {
    title: "Reach Airia Corporate Tower Meta Ads 03",
    category: "Commercial Real Estate",
    format: "Meta Ad Set",
    brief:
      "A third campaign direction for Reach Airia, keeping brand consistency while testing a fresh composition for Meta placements.",
    images: [
      { title: "Square Feed Creative", src: "/optimized/work/meta-ads/reach-airia-03/meta-ad-01.webp", width: 1080, height: 1080 },
      { title: "Landscape Placement", src: "/optimized/work/meta-ads/reach-airia-03/meta-ad-02.webp", width: 1920, height: 1080 },
      { title: "Compact Ad Placement", src: "/optimized/work/meta-ads/reach-airia-03/meta-ad-03.webp", width: 610, height: 324 }
    ]
  }
];

export const logoProjects = [
  {
    title: "KENT Water Purifier Digital Brand Experience",
    category: "Brand Systems",
    format: "Website Experience + Brand System",
    brief:
      "A self-initiated digital brand experience concept built around purity, trust, technology, product clarity, responsive UI, and promotional storytelling. This personal concept was not commissioned by KENT.",
    images: [
      {
        title: "Premium Website Experience Cover",
        src: "/optimized/work/branding/kent/kent-01.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Brand Vision",
        src: "/optimized/work/branding/kent/kent-02.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Visual Direction",
        src: "/optimized/work/branding/kent/kent-03.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Experience Overview",
        src: "/optimized/work/branding/kent/kent-04.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Homepage Hero Experience",
        src: "/optimized/work/branding/kent/kent-05.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Homepage Journey",
        src: "/optimized/work/branding/kent/kent-06.webp",
        width: 1024,
        height: 1536
      },
      {
        title: "Product Experience",
        src: "/optimized/work/branding/kent/kent-07.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Trust and Conversion Experience",
        src: "/optimized/work/branding/kent/kent-08.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Design System and UI Experience",
        src: "/optimized/work/branding/kent/kent-09.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Offers and Promotions",
        src: "/optimized/work/branding/kent/kent-010.webp",
        width: 1672,
        height: 941
      }
    ]
  },
  {
    title: "Valtora Gaming Chair Brand System",
    category: "Brand Systems",
    format: "Gaming Brand Identity + Product System",
    brief:
      "A high-impact gaming chair identity with a sharp metallic logo, black-red performance palette, product naming, packaging, campaign applications, brand voice, and complete usage guidelines.",
    images: [
      {
        title: "Brand Identity Presentation",
        src: "/optimized/work/branding/valtora/veltora-01.webp",
        width: 1122,
        height: 1402
      },
      {
        title: "Logo Construction",
        src: "/optimized/work/branding/valtora/veltora-02.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Variations",
        src: "/optimized/work/branding/valtora/veltora-03.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Color System",
        src: "/optimized/work/branding/valtora/veltora-04.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Typography System",
        src: "/optimized/work/branding/valtora/veltora-05.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Pattern and Visual System",
        src: "/optimized/work/branding/valtora/veltora-06.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Product Identity",
        src: "/optimized/work/branding/valtora/veltora-07.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Packaging System",
        src: "/optimized/work/branding/valtora/veltora-08.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Advertising and Brand Applications",
        src: "/optimized/work/branding/valtora/veltora-09.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Guidelines Overview",
        src: "/optimized/work/branding/valtora/veltora-010.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Voice and Brand Guidelines",
        src: "/optimized/work/branding/valtora/veltora-011.webp",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Cavaro House of Objects Brand System",
    category: "Brand Systems",
    format: "Furniture Brand Identity + Guidelines",
    brief:
      "A warm luxury furniture identity built around architecture, natural materials, timeless objects, packaging, showroom experience, campaign storytelling, and refined editorial brand guidelines.",
    images: [
      {
        title: "Brand Guidelines Cover",
        src: "/optimized/work/branding/cavaro/cavaro-01.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Brand Philosophy",
        src: "/optimized/work/branding/cavaro/cavaro-02.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Logo System",
        src: "/optimized/work/branding/cavaro/cavaro-03.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Color and Materials",
        src: "/optimized/work/branding/cavaro/cavaro-04.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Typography and Graphic Language",
        src: "/optimized/work/branding/cavaro/cavaro-05.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Object Collection",
        src: "/optimized/work/branding/cavaro/cavaro-06.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Packaging System",
        src: "/optimized/work/branding/cavaro/cavaro-07.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Showroom Experience",
        src: "/optimized/work/branding/cavaro/cavaro-08.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Campaign Storytelling",
        src: "/optimized/work/branding/cavaro/cavaro-09.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Timeless Design Campaign",
        src: "/optimized/work/branding/cavaro/cavaro-010.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Care and Guidance",
        src: "/optimized/work/branding/cavaro/cavaro-011.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Brand Promise",
        src: "/optimized/work/branding/cavaro/cavaro-012.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Closing Brand Story",
        src: "/optimized/work/branding/cavaro/cavaro-013.webp",
        width: 1402,
        height: 1122
      }
    ]
  },
  {
    title: "Aurix Audio Technology Brand System",
    category: "Brand Systems",
    format: "Brand Identity + Product World",
    brief:
      "A futuristic audio brand identity with a custom wordmark, silver-black visual system, product mockups, UI presentation, retail environments, and campaign-ready brand applications.",
    images: [
      {
        title: "Brand Presentation Cover",
        src: "/optimized/work/branding/aurix/aurix-01.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Strategy",
        src: "/optimized/work/branding/aurix/aurix-02.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Construction",
        src: "/optimized/work/branding/aurix/aurix-03.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo System",
        src: "/optimized/work/branding/aurix/aurix-04.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Color Palette",
        src: "/optimized/work/branding/aurix/aurix-05.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Typography Guidelines",
        src: "/optimized/work/branding/aurix/aurix-06.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Business Card Mockup",
        src: "/optimized/work/branding/aurix/aurix-07.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Stationery System",
        src: "/optimized/work/branding/aurix/aurix-08.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Product Packaging",
        src: "/optimized/work/branding/aurix/aurix-09.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Headphones Product Render",
        src: "/optimized/work/branding/aurix/aurix-010.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Earbuds Product Render",
        src: "/optimized/work/branding/aurix/aurix-011.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Mobile App Experience",
        src: "/optimized/work/branding/aurix/aurix-012.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Product Landing Page",
        src: "/optimized/work/branding/aurix/aurix-013.webp",
        width: 1024,
        height: 1536
      },
      {
        title: "Outdoor Billboard",
        src: "/optimized/work/branding/aurix/aurix-014.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Campaign Tile System",
        src: "/optimized/work/branding/aurix/aurix-015.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Retail Store Concept",
        src: "/optimized/work/branding/aurix/aurix-016.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Lifestyle Campaign",
        src: "/optimized/work/branding/aurix/aurix-017.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Guidelines Overview",
        src: "/optimized/work/branding/aurix/aurix-018.webp",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Roastory Coffee Brand Identity",
    category: "Brand Systems",
    format: "Brand Guidelines",
    brief:
      "A complete coffee identity presentation with monogram construction, logo system, clear space, and premium mockup applications.",
    images: [
      {
        title: "Brand Guidelines Cover",
        src: "/optimized/work/branding/roastory/roastory-guidelines-cover.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Application Mockups",
        src: "/optimized/work/branding/roastory/roastory-brand-mockups-grid.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Clear Space",
        src: "/optimized/work/branding/roastory/roastory-clear-space.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Logo Construction",
        src: "/optimized/work/branding/roastory/roastory-logo-construction.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Logo System Overview",
        src: "/optimized/work/branding/roastory/roastory-logo-system.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Identity Collage",
        src: "/optimized/work/branding/roastory/roastory-identity-collage.webp",
        width: 1536,
        height: 1024
      }
    ]
  }
];

export const socialProjects = [
  {
    title: "Nike Morning Discipline Concept Campaign",
    category: "Digital Campaigns",
    format: "Spec Sports Campaign + Social Story System",
    brief:
      "A gritty black-and-white performance campaign built around early-morning discipline, solitude, and self-competition. The set uses massive editorial typography, rain-lit athletic scenes, restrained neon accents, and multiple vertical, square, and landscape formats for a premium social rollout.",
    images: [
      {
        title: "Nobody Is Watching Story Poster",
        src: "/optimized/work/social-media/nike/nike-01.webp",
        width: 941,
        height: 1672
      },
      {
        title: "Nobody Is Watching Square Post",
        src: "/optimized/work/social-media/nike/nike-02.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Nobody Is Watching Landscape Banner",
        src: "/optimized/work/social-media/nike/nike-03.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Nobody Is Watching Vertical Creative",
        src: "/optimized/work/social-media/nike/nike-04.webp",
        width: 1122,
        height: 1402
      },
      {
        title: "Difference Isn't Talent Story Poster",
        src: "/optimized/work/social-media/nike/nike-05.webp",
        width: 1023,
        height: 1537
      },
      {
        title: "Difference Isn't Talent Square Post",
        src: "/optimized/work/social-media/nike/nike-06.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Difference Isn't Talent Landscape Banner",
        src: "/optimized/work/social-media/nike/nike-07.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Difference Isn't Talent Wide Creative",
        src: "/optimized/work/social-media/nike/nike-08.webp",
        width: 1537,
        height: 1023
      },
      {
        title: "Every Record Was Once An Excuse",
        src: "/optimized/work/social-media/nike/nike-09.webp",
        width: 1448,
        height: 1086
      },
      {
        title: "Every Record Track Banner",
        src: "/optimized/work/social-media/nike/nike-010.webp",
        width: 1448,
        height: 1086
      },
      {
        title: "You Said Tomorrow Gym Poster",
        src: "/optimized/work/social-media/nike/nike-011.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "You Said Tomorrow Track Poster",
        src: "/optimized/work/social-media/nike/nike-012.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "You Said Tomorrow Shoe-Up Post",
        src: "/optimized/work/social-media/nike/nike-013.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "You Said Tomorrow Wide Gym Banner",
        src: "/optimized/work/social-media/nike/nike-014.webp",
        width: 1402,
        height: 1122
      }
    ]
  },
  {
    title: "Orient Electric Aero O2 Social Campaign",
    category: "Digital Campaigns",
    format: "Smart Home Product Campaign + Social Adaptations",
    brief:
      "A clean lifestyle-led product campaign for Orient Electric's Aero O2 oxygen-enriching fan, combining bright home imagery, fresh green messaging, benefit icons, square posts, landscape banners, and story-first layouts for social media rollout.",
    images: [
      {
        title: "Primary Product Poster",
        src: "/optimized/work/social-media/orient-electric/orient-electric-01.webp",
        width: 1122,
        height: 1402
      },
      {
        title: "Square Social Post",
        src: "/optimized/work/social-media/orient-electric/orient-electric-02.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Landscape Campaign Banner",
        src: "/optimized/work/social-media/orient-electric/orient-electric-03.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Vertical Story Creative",
        src: "/optimized/work/social-media/orient-electric/orient-electric-04.webp",
        width: 1086,
        height: 1448
      }
    ]
  },
  {
    title: "Kyro Energy Drink Social Campaign",
    category: "Digital Campaigns",
    format: "Product Launch Campaign + Performance Posts",
    brief:
      "A high-voltage energy drink campaign built for social impact: aggressive typography, neon-green product energy, benefit-led icon systems, vertical reels/post formats, landscape banners, and punchy launch messaging designed to stop the scroll.",
    images: [
      {
        title: "Launch Poster",
        src: "/optimized/work/social-media/kyro/kyro-01.webp",
        width: 1122,
        height: 1402
      },
      {
        title: "Landscape Campaign Banner",
        src: "/optimized/work/social-media/kyro/kyro-02.webp",
        width: 1672,
        height: 941
      },
      {
        title: "Square Social Post",
        src: "/optimized/work/social-media/kyro/kyro-03.webp",
        width: 1254,
        height: 1254
      },
      {
        title: "Vertical Story Creative",
        src: "/optimized/work/social-media/kyro/kyro-04.webp",
        width: 1024,
        height: 1536
      }
    ]
  }
];

export const uiUxProjects = [
  {
    title: "GreenAura Fresh Produce Website",
    category: "UI Visual Design",
    format: "Organic Grocery Website Presentation",
    brief:
      "A premium farm-fresh grocery website experience covering brand philosophy, logo, color, typography, homepage anatomy, product flow, farm storytelling, testimonials, order journey, responsive layouts, and design system components.",
    images: [
      {
        title: "Cover Presentation",
        src: "/optimized/work/ui-ux/greenaura/greenaura-01.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Philosophy and Values",
        src: "/optimized/work/ui-ux/greenaura/greenaura-02.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Philosophy System",
        src: "/optimized/work/ui-ux/greenaura/greenaura-03.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo System",
        src: "/optimized/work/ui-ux/greenaura/greenaura-04.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Color Strategy",
        src: "/optimized/work/ui-ux/greenaura/greenaura-05.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Typography System",
        src: "/optimized/work/ui-ux/greenaura/greenaura-06.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Visual Language",
        src: "/optimized/work/ui-ux/greenaura/greenaura-07.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Homepage Hero Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-08.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Homepage Anatomy",
        src: "/optimized/work/ui-ux/greenaura/greenaura-09.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Product Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-10.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Farm Stories Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-11.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Testimonial Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-12.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Order and Contact Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-13.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Responsive Experience",
        src: "/optimized/work/ui-ux/greenaura/greenaura-14.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Design System",
        src: "/optimized/work/ui-ux/greenaura/greenaura-15.webp",
        width: 1402,
        height: 1122
      },
      {
        title: "Final Showcase",
        src: "/optimized/work/ui-ux/greenaura/greenaura-16.webp",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Aurea Dental Website Design",
    category: "UI Visual Design",
    format: "Luxury Dental Website Presentation",
    brief:
      "A premium dental website design system covering brand philosophy, logo, color, typography, homepage, services, doctors, patient stories, contact flow, and responsive experience.",
    images: [
      {
        title: "Cover Presentation",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-01.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Philosophy",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-02.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo System",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-03.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Color Strategy",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-04.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Typography System",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-05.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Design Language",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-06.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Homepage Hero Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-07.webp",
        width: 1536,
        height: 1024
      },
      {
        title: "Homepage Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-08.webp",
        width: 1197,
        height: 1315
      },
      {
        title: "Services Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-09.webp",
        width: 1024,
        height: 1536
      },
      {
        title: "Doctor Showcase Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-010.webp",
        width: 1198,
        height: 1313
      },
      {
        title: "Patient Stories Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-011.webp",
        width: 1199,
        height: 1312
      },
      {
        title: "Contact and Appointment Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-012.webp",
        width: 1199,
        height: 1312
      },
      {
        title: "Responsive Experience",
        src: "/optimized/work/ui-ux/aurea-dental/aurea-dental-013.webp",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Fitness Mobile App UI",
    category: "UI Visual Design",
    format: "Mobile App Case Study",
    brief:
      "A complete health-tech app concept covering onboarding, dashboard, workout tracking, meal planning, and progress analytics with a soft blue interface system.",
    images: [
      {
        title: "Fitness App Case Study",
        src: "/optimized/work/ui-ux/fitness/fitness-ui-app.webp",
        width: 1440,
        height: 10308
      }
    ]
  }
];

export const aiGeneratedProjects = [
  {
    title: "Emaar India Business Centre Visual Exploration",
    category: "AI Creative Workflows",
    format: "Commercial Architecture Concept Visuals",
    brief:
      "AI-assisted personal concept exploring commercial architecture across day, dusk, and night moods. This project was not commissioned by Emaar and is presented only as a concept study.",
    images: [
      {
        title: "Night Facade Concept",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-01.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Daytime Commercial Tower",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-02.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Dusk Launch Perspective",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-03.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Elevated City View",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-04.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Sunset Glass Facade",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-05.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Blue Hour Skyline",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-06.webp",
        width: 1344,
        height: 768
      },
      {
        title: "Aerial Site Context",
        src: "/optimized/work/ai-generated/emaar-india-business-centre/emaar-IBC-07.webp",
        width: 2048,
        height: 2048
      }
    ]
  },
  {
    title: "Interior Image Creation: Matching Consistency",
    category: "AI Creative Workflows",
    format: "Interior Concept Angles",
    brief:
      "AI-generated interior image creation focused on matching consistency across multiple angles. The set keeps the same dark conference room language, black geometric pendant lights, warm wooden table, matte wall panels, and moody premium lighting while exploring alternate camera views.",
    images: [
      {
        title: "Wide Dining Conference View",
        src: "/optimized/work/ai-generated/interior-consistency/interior-consistency-01.webp",
        width: 1675,
        height: 939
      },
      {
        title: "Left Angle Table View",
        src: "/optimized/work/ai-generated/interior-consistency/interior-consistency-02.webp",
        width: 1676,
        height: 938
      },
      {
        title: "Straight Front Composition",
        src: "/optimized/work/ai-generated/interior-consistency/interior-consistency-03.webp",
        width: 2048,
        height: 1147
      },
      {
        title: "Window Side Angle",
        src: "/optimized/work/ai-generated/interior-consistency/interior-consistency-04.webp",
        width: 1674,
        height: 939
      }
    ]
  },
  {
    title: "Warm Cafe Lifestyle AI Visuals",
    category: "AI Creative Workflows",
    format: "Lifestyle Concept Visuals",
    brief:
      "An AI-generated lifestyle image set exploring a warm modern cafe environment, neutral wardrobe styling, and consistent couple-focused visual direction across environmental, portrait, and narrative compositions.",
    images: [
      {
        title: "Cafe Lifestyle Couple Scene",
        src: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/01-cafe-lifestyle-couple-scene.webp",
        originalSrc: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/01-cafe-lifestyle-couple-scene.webp",
        width: 1448,
        height: 1086
      },
      {
        title: "Warm Modern Cafe Interior",
        src: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/02-warm-modern-cafe-interior.webp",
        originalSrc: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/02-warm-modern-cafe-interior.webp",
        width: 1448,
        height: 1086
      },
      {
        title: "Neutral Studio Couple Portrait",
        src: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/03-neutral-studio-couple-portrait.webp",
        originalSrc: "/optimized/work/ai-generated/warm-cafe-lifestyle-ai-visuals/03-neutral-studio-couple-portrait.webp",
        width: 1122,
        height: 1402
      }
    ]
  }
];

export const portfolioLibraries = [
  {
    title: "Brand Systems",
    subtitle: "Identity systems, monograms, lockups, brand rules, and mockups",
    href: "/work/branding",
    gradient: "from-champagne/30 via-white/5 to-transparent"
  },
  {
    title: "Real Estate Marketing",
    subtitle: "Property launches, sales campaigns, EDMs, OOH, and digital assets",
    href: "/work/real-estate",
    gradient: "from-signal/30 via-white/5 to-transparent"
  },
  {
    title: "Digital Campaigns",
    subtitle: "Social posts, campaign banners, carousels, and launch creatives",
    href: "/work/social-media",
    gradient: "from-lime-300/25 via-white/5 to-transparent"
  },
  {
    title: "UI Visual Design",
    subtitle: "App screens, landing pages, dashboards, and product visuals",
    href: "/work/ui-ux",
    gradient: "from-fuchsia-300/25 via-white/5 to-transparent"
  },
  {
    title: "AI Creative Workflows",
    subtitle: "AI-assisted concepts, art direction tests, and campaign imagery",
    href: "/work/ai-generated",
    gradient: "from-emerald-200/25 via-white/5 to-transparent"
  }
];

export const timeline = [
  {
    date: "October 2025 - Present",
    title: "Senior Graphic Designer",
    org: "Property Master Pvt. Ltd.",
    body: "Own visual execution for premium real-estate campaigns across sales presentations, brochures, digital advertising, social media, print collateral, reels, and customer-facing communication.",
    bullets: [
      "Translate marketing and sales requirements into clear visual systems with consistent hierarchy, typography, spacing, and image treatment.",
      "Coordinate stakeholder revisions and prepare execution-ready assets across digital, print, presentation, and video formats.",
      "Maintain visual quality and brand consistency across recurring campaign deliverables."
    ],
    tags: ["Campaign Ownership", "Stakeholder Collaboration", "Quality Control", "Multi-format Delivery"]
  },
  {
    date: "May 2024 - September 2025",
    title: "Freelance Graphic Designer",
    org: "Property Master Pvt. Ltd.",
    body: "Delivered campaign creatives and sales-support assets on a freelance basis before moving into the full-time senior role.",
    bullets: ["Produced real-estate marketing visuals and presentation assets across digital and print requirements."],
    tags: ["Freelance", "Campaign Creatives", "Presentation Design"]
  },
  {
    date: "September 2022 - September 2025",
    title: "Graphic Designer",
    org: "Caterpillar Signs Pvt. Ltd. (Group Bayport)",
    body: "Produced brand and marketing communication across campaign creatives, corporate presentations, social media, promotional collateral, and print-ready layouts.",
    bullets: [
      "Maintained consistency through typography, spacing, image treatment, resizing, version control, and final visual checks.",
      "Collaborated with internal teams to convert briefs and feedback into execution-ready assets across formats."
    ],
    tags: ["Brand Communication", "Production Quality", "Visual QA", "Print-ready Design"]
  },
  {
    date: "March 2022 - September 2022",
    title: "Graphic Designer & Video Editor",
    org: "7P Digital Services LLP",
    body: "Created digital campaign assets, social media creatives, reels, and promotional videos for platform-specific formats.",
    bullets: ["Combined static and motion workflows while maintaining visual hierarchy and brand consistency."],
    tags: ["Campaign Creatives", "Social Media", "Video Editing", "Motion Content"]
  },
  {
    date: "December 2020 - March 2022",
    title: "Earlier Experience",
    org: "CityMall, Krash IT Services, and YPR Eng. and Sol. Pvt. Ltd.",
    body: "Early marketing and graphic-design experience spanning December 2020 to March 2022.",
    bullets: [
      "CityMall, Gurugram - Intern, Marketing | December 2021 - March 2022",
      "Krash IT Services - Graphic Designer Intern | May 2021 - October 2021",
      "YPR Eng. and Sol. Pvt. Ltd. - Graphic Designer Intern | December 2020 - May 2021"
    ],
    tags: ["Marketing Support", "Graphic Design", "Production Foundations"]
  }
];

export const education = [
  {
    level: "Graduation",
    institution: "J.C. Bose University of Science and Technology, YMCA, Faridabad, Haryana",
    course: "B.Sc. in Animation & Multimedia | First Division | 2022"
  },
  {
    level: "Class 12",
    institution: "S.N.D. Public School, Palwal, Haryana",
    course: "CBSE | Science (Non-Medical) | 2019"
  },
  {
    level: "Class 10",
    institution: "B.S.M. High School, Hazipur, Gurugram",
    course: "HBSE | 2017"
  }
];

export const hobbies = [
  "Exploring AI-assisted visual workflows",
  "Editing videos and motion concepts",
  "Studying design trends and references",
  "Sketching layouts and creative ideas"
];
