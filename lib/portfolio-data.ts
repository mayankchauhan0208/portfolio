import {
  Aperture,
  BadgeCheck,
  Boxes,
  Clapperboard,
  Layers3,
  PenTool,
  Sparkles,
  Wand2
} from "lucide-react";

export const profile = {
  name: "Mayank Chauhan",
  roles: ["Graphic Designer", "UI Designer", "Video Editor"],
  location: "India",
  phone: "+91 9992713289",
  email: "mayankchauhan0208@gmail.com",
  behance: "https://www.behance.net/mayankchauhan0208",
  intro:
    "I design sharp brand visuals, intuitive UI concepts, and motion-ready digital assets that help brands look polished, confident, and memorable.",
  positioning:
    "Mayank brings graphic design, UI thinking, and video editing together into one refined creative practice. His work is clean, expressive, and built for brands that need premium visual communication across social, digital, print, and presentation formats."
};

export const metrics = [
  { value: "3+", label: "Senior design years" },
  { value: "6", label: "Creative roles" },
  { value: "8", label: "Design tools" },
  { value: "2025", label: "Senior milestone" }
];

export const projects = [
  {
    title: "Group Bayport Creative Systems",
    eyebrow: "Senior Design",
    period: "February 2025 - Present",
    summary:
      "Premium brand and marketing assets created with consistency, speed, and strong visual control.",
    details:
      "Creating polished visual assets for a global-facing brand environment, with a focus on layout discipline, clean typography, image treatment, and campaign-ready execution.",
    tags: ["Brand Systems", "Marketing Design", "Production Design", "Visual QA"],
    glow: "from-signal/35 via-white/10 to-transparent"
  },
  {
    title: "Property Master Visual Experience",
    eyebrow: "Real Estate Visuals",
    period: "3 Years",
    summary:
      "Real-estate visuals shaped with premium spacing, hierarchy, and sales-ready clarity.",
    details:
      "Transformed property communication into premium layouts, campaign graphics, and presentation-ready assets designed to feel trustworthy, refined, and high-value.",
    tags: ["Luxury Real Estate", "Campaigns", "Presentation Design", "Digital Collateral"],
    glow: "from-champagne/35 via-white/10 to-transparent"
  },
  {
    title: "7P Digital Motion Studio",
    eyebrow: "Design + Motion",
    period: "7 Months",
    summary:
      "Digital content, social creatives, and edited video assets for fast-moving campaigns.",
    details:
      "Combined Photoshop, Illustrator, Premiere Pro, After Effects, and Canva workflows to create clear, energetic assets with strong pacing and visual structure.",
    tags: ["Video Editing", "Social Content", "Motion Graphics", "Campaign Assets"],
    glow: "from-purple-300/30 via-white/10 to-transparent"
  },
  {
    title: "Citymall Product Communication",
    eyebrow: "Retail Design",
    period: "3 Months",
    summary:
      "Commercial graphics created for a consumer-facing brand environment where clarity, speed, and adaptability mattered.",
    details:
      "Supported design production with marketplace-ready visuals, clean composition, and brand-sensitive execution for digital touchpoints.",
    tags: ["Consumer Design", "Digital Graphics", "Brand Adaptation"],
    glow: "from-emerald-200/25 via-white/10 to-transparent"
  },
  {
    title: "Foundation Studio Roles",
    eyebrow: "Studio Foundations",
    period: "Krash IT Services + YPR Eng. & Sol.",
    summary:
      "Early studio experience that built Mayank's hands-on production discipline across graphic design workflows.",
    details:
      "Developed foundational skills in layout, tool fluency, client-facing asset preparation, and iterative creative delivery.",
    tags: ["Graphic Design", "Tool Fluency", "Layout", "Creative Operations"],
    glow: "from-sky-200/25 via-white/10 to-transparent"
  }
];

export const skills = [
  { name: "Adobe Photoshop", level: 94, icon: Wand2 },
  { name: "Adobe Illustrator", level: 91, icon: PenTool },
  { name: "Adobe Premiere Pro", level: 88, icon: Clapperboard },
  { name: "Adobe After Effects", level: 82, icon: Sparkles },
  { name: "Figma", level: 86, icon: Layers3 },
  { name: "Adobe XD", level: 80, icon: Boxes },
  { name: "Canva", level: 84, icon: Aperture },
  { name: "Visual Design Systems", level: 90, icon: BadgeCheck }
];

export const services = [
  {
    title: "Brand Presence",
    kicker: "Identity / Campaigns",
    body: "Polished visual systems, marketing creatives, and brand assets designed to feel consistent across every touchpoint."
  },
  {
    title: "Interface Concepts",
    kicker: "UI / Figma / XD",
    body: "Clean, structured interface directions with strong hierarchy, premium spacing, and presentation-ready thinking."
  },
  {
    title: "Motion Content",
    kicker: "Premiere / After Effects",
    body: "Edited videos, social motion pieces, and energetic campaign assets built with rhythm, clarity, and brand recall."
  }
];

export const portfolioWorks = [
  {
    title: "Luxury Living Crown Campaign",
    category: "Property Master",
    format: "Social Poster",
    brief: "A royal black, blue, and gold launch visual positioning residential towers as a premium high-value address.",
    image: "/work/real-estate/trevoc-luxury-launch.jpg",
    span: "md:col-span-3 md:row-span-2",
    tone: "Gold luxury"
  },
  {
    title: "Emaar Business Centre Reveal",
    category: "Commercial Real Estate",
    format: "EDM Campaign",
    brief: "A clean commercial launch creative with bright architectural scale, corporate hierarchy, and booking urgency.",
    image: "/work/real-estate/emaar-business-centre-coming-soon.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Corporate blue"
  },
  {
    title: "Serenity Hills Escape",
    category: "Luxury Residential",
    format: "Poster Campaign",
    brief: "A nature-led visual direction built around privacy, calm, and aspirational high-rise living.",
    image: "/work/real-estate/emaar-serenity-hills-escape.png",
    span: "md:col-span-2 md:row-span-2",
    tone: "Forest luxury"
  },
  {
    title: "Neoliv Golf One OOH",
    category: "Outdoor Campaign",
    format: "15x8 ft Hoarding",
    brief: "A wide-format golf-facing plot campaign using high-contrast green texture, lifestyle promise, and strong recall.",
    image: "/work/real-estate/neoliv-golf-one-ooh-08.png",
    span: "md:col-span-4 md:row-span-1",
    tone: "Lifestyle green"
  },
  {
    title: "Own The Greens",
    category: "Outdoor Campaign",
    format: "Luxury Hoarding",
    brief: "An open landscape composition for golf plots, designed for instant readability and premium scale.",
    image: "/work/real-estate/neoliv-golf-one-ooh-05.png",
    span: "md:col-span-4 md:row-span-1",
    tone: "Open-air premium"
  },
  {
    title: "Emaar Serenity Explainer",
    category: "Video Thumbnail",
    format: "YouTube Cover",
    brief: "A bolder thumbnail layout made for fast recognition, presenter focus, and property-led attention.",
    image: "/work/real-estate/emaar-serenity-hills-meta.jpg",
    span: "md:col-span-4 md:row-span-1",
    tone: "High contrast"
  },
  {
    title: "Business Address Pin",
    category: "Commercial Real Estate",
    format: "EDM Poster",
    brief: "A polished business-centre creative using a gold pin device to frame workplace aspiration and returns.",
    image: "/work/real-estate/emaar-business-centre-pin.png",
    span: "md:col-span-2 md:row-span-2",
    tone: "Navy gold"
  },
  {
    title: "Serenity Hills Master Thumbnail",
    category: "Residential Campaign",
    format: "Social Thumbnail",
    brief: "A direct, high-impact sales visual using project naming, location clarity, and bold color contrast.",
    image: "/work/real-estate/emaar-serenity-hills-thumbnail.jpg",
    span: "md:col-span-4 md:row-span-1",
    tone: "Editorial"
  },
  {
    title: "Tonino Lamborghini Residences",
    category: "Ultra Luxury",
    format: "Investment EDM",
    brief: "A prestige-led brand partnership creative with disciplined hierarchy, scarcity cues, and black-gold restraint.",
    image: "/work/real-estate/lamborghini-residences-edm.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Prestige black"
  },
  {
    title: "Emaar Night Commercial",
    category: "Commercial Real Estate",
    format: "Premium Poster",
    brief: "A night-time glass facade visual built around growth, stability, and corporate credibility.",
    image: "/work/real-estate/emaar-business-centre-night.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Midnight blue"
  },
  {
    title: "Legacy of Growth",
    category: "Commercial Real Estate",
    format: "EDM Creative",
    brief: "A polished office-space campaign with architectural framing, gold orbit accents, and leadership messaging.",
    image: "/work/real-estate/emaar-business-centre-legacy.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Visionary"
  },
  {
    title: "Workspace That Powers Vision",
    category: "Commercial Real Estate",
    format: "Mobile EDM",
    brief: "A feature-heavy mobile creative focused on office space benefits, vertical hierarchy, and conversion clarity.",
    image: "/work/real-estate/eibc-workspace-vision.jpeg",
    span: "md:col-span-2 md:row-span-2",
    tone: "Sales utility"
  },
  {
    title: "Future Of Work Landmark",
    category: "Commercial Real Estate",
    format: "Mobile EDM",
    brief: "A low-angle architecture composition designed to make the property feel tall, modern, and commercially strong.",
    image: "/work/real-estate/eibc-future-work.jpeg",
    span: "md:col-span-2 md:row-span-2",
    tone: "Urban blue"
  },
  {
    title: "Luxury Breathes In Nature",
    category: "Residential Campaign",
    format: "Mobile EDM",
    brief: "A calm blue-gold residential asset balancing lifestyle warmth with clear price, size, and location cues.",
    image: "/work/real-estate/emaar-serenity-harmony.jpeg",
    span: "md:col-span-2 md:row-span-2",
    tone: "Nature premium"
  },
  {
    title: "Luxury & Returns",
    category: "Commercial Real Estate",
    format: "EDM Campaign",
    brief: "A premium office campaign visual using arched framing, gold details, and strong value-led messaging.",
    image: "/work/real-estate/eibc-luxury-returns.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Blue gold"
  },
  {
    title: "Palwal Prime Land",
    category: "Plotted Township",
    format: "Investment Poster",
    brief: "A clean plotted township campaign combining green entry visuals, price clarity, and practical project details.",
    image: "/work/real-estate/palwal-prime-land.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Fresh daylight"
  },
  {
    title: "Faridabad Vertical Oasis",
    category: "Residential Campaign",
    format: "Premium Poster",
    brief: "A softer biophilic campaign direction with light gold accents, lifestyle imagery, and luxury apartment positioning.",
    image: "/work/real-estate/bptp-vertical-oasis.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Soft luxury"
  },
  {
    title: "Private Haven Above The Canopy",
    category: "Residential Campaign",
    format: "Poster Campaign",
    brief: "A serene residential concept using circular framing and airy space to communicate privacy and elevation.",
    image: "/work/real-estate/bptp-private-haven.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Canopy gold"
  },
  {
    title: "Rare Asset Investment",
    category: "Ultra Luxury",
    format: "Premium EDM",
    brief: "A chess-inspired investment visual with polished restraint, scarcity language, and elite residential appeal.",
    image: "/work/real-estate/oberoi-rare-assets.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Strategic luxury"
  },
  {
    title: "Oberoi Sky Living",
    category: "Ultra Luxury",
    format: "Mobile Poster",
    brief: "A lifestyle-rich terrace campaign designed around five-star privacy, city views, and high-ticket clarity.",
    image: "/work/real-estate/oberoi-sky-living.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Skyline luxury"
  },
  {
    title: "Inheritance Reserved",
    category: "Ultra Luxury",
    format: "EDM Poster",
    brief: "A cinematic evening balcony concept selling exclusivity, privacy, and generational aspiration.",
    image: "/work/real-estate/oberoi-inheritance.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Evening estate"
  },
  {
    title: "AIPL Commercial Future",
    category: "Retail Commercial",
    format: "Social Poster",
    brief: "A bold retail investment creative using mall scale, light trails, and direct ground-floor messaging.",
    image: "/work/real-estate/aipl-commercial-future.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Retail energy"
  },
  {
    title: "Vamana Greens Development",
    category: "Plotted Township",
    format: "Social Poster",
    brief: "A premium plotted-development creative using deep blue, gold pricing, and polished township framing.",
    image: "/work/real-estate/vamana-greens-development.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Township premium"
  },
  {
    title: "Vamana Lifestyle Experience",
    category: "Plotted Township",
    format: "Social Poster",
    brief: "A bright residential township creative with lifestyle-focused copy and a softer, more aspirational palette.",
    image: "/work/real-estate/vamana-greens-lifestyle.jpg",
    span: "md:col-span-3 md:row-span-2",
    tone: "Lifestyle daylight"
  },
  {
    title: "BPTP Landmark Height",
    category: "Residential Campaign",
    format: "Project Poster",
    brief: "A bold launch communication for vertical garden residences, balancing amenity badges with high-rise scale.",
    image: "/work/real-estate/bptp-landmark-height.png",
    span: "md:col-span-3 md:row-span-2",
    tone: "Launch blue"
  }
];

export const portfolioCategories = [
  {
    id: "branding",
    title: "Branding",
    label: "Identity Systems",
    subtitle: "Brand identities, logo systems, guideline decks, mockups, product visuals, and premium brand worlds.",
    href: "/work/branding",
    accent: "#d8dde2",
    backdrop: "linear-gradient(145deg, #050608 0%, #1b1d20 50%, #d8dde2 130%)",
    motif: "BR",
    previewImages: [
      "/work/branding/valtora/veltora-01.png",
      "/work/branding/cavaro/cavaro-01.png",
      "/work/branding/aurix/aurix-01.png",
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate Creatives",
    label: "EDM / OOH / Social",
    subtitle: "Luxury launches, property campaigns, outdoor layouts, and sales creatives.",
    href: "/work/real-estate",
    accent: "#8ee8ff",
    backdrop: "linear-gradient(145deg, #06111f 0%, #0d3158 50%, #8ee8ff 120%)",
    motif: "RE",
    previewImages: [
      "/work/real-estate/trevoc-luxury-launch.jpg",
      "/work/real-estate/emaar-business-centre-coming-soon.png",
      "/work/real-estate/emaar-serenity-hills-escape.png"
    ]
  },
  {
    id: "social-media",
    title: "Social Media",
    label: "Campaign Posts",
    subtitle: "Scroll-stopping posts, thumbnails, carousels, and performance-led layouts.",
    href: "/work/social-media",
    accent: "#ff8bbd",
    backdrop: "linear-gradient(145deg, #190911 0%, #3a1830 52%, #ff8bbd 120%)",
    motif: "SM",
    previewImages: [
      "/work/social-media/nike/nike-01.png",
      "/work/social-media/orient-electric/orient-electric-01.png",
      "/work/social-media/kyro/kyro-01.png"
    ]
  },
  {
    id: "ui-ux",
    title: "UI / UX",
    label: "Product Concepts",
    subtitle: "Landing pages, app screens, dashboards, and digital product directions.",
    href: "/work/ui-ux",
    accent: "#9effc4",
    backdrop: "linear-gradient(145deg, #07120e 0%, #12372c 52%, #9effc4 120%)",
    motif: "UX",
    previewImages: []
  },
  {
    id: "ai-generated",
    title: "AI Generated",
    label: "Concept Visuals",
    subtitle: "AI-assisted art direction, luxury scenes, experiments, and campaign concepts.",
    href: "/work/ai-generated",
    accent: "#b7a4ff",
    backdrop: "linear-gradient(145deg, #0a0a18 0%, #211d54 52%, #b7a4ff 120%)",
    motif: "AI",
    previewImages: []
  }
];

export const logoProjects = [
  {
    title: "Valtora Gaming Chair Brand System",
    category: "Branding",
    format: "Gaming Brand Identity + Product System",
    brief:
      "A high-impact gaming chair identity with a sharp metallic logo, black-red performance palette, product naming, packaging, campaign applications, brand voice, and complete usage guidelines.",
    images: [
      {
        title: "Brand Identity Presentation",
        src: "/work/branding/valtora/veltora-01.png",
        width: 1122,
        height: 1402
      },
      {
        title: "Logo Construction",
        src: "/work/branding/valtora/veltora-02.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Variations",
        src: "/work/branding/valtora/veltora-03.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Color System",
        src: "/work/branding/valtora/veltora-04.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Typography System",
        src: "/work/branding/valtora/veltora-05.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Pattern and Visual System",
        src: "/work/branding/valtora/veltora-06.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Product Identity",
        src: "/work/branding/valtora/veltora-07.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Packaging System",
        src: "/work/branding/valtora/veltora-08.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Advertising and Brand Applications",
        src: "/work/branding/valtora/veltora-09.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Guidelines Overview",
        src: "/work/branding/valtora/veltora-010.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Voice and Brand Guidelines",
        src: "/work/branding/valtora/veltora-011.png",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Cavaro House of Objects Brand System",
    category: "Branding",
    format: "Furniture Brand Identity + Guidelines",
    brief:
      "A warm luxury furniture identity built around architecture, natural materials, timeless objects, packaging, showroom experience, campaign storytelling, and refined editorial brand guidelines.",
    images: [
      {
        title: "Brand Guidelines Cover",
        src: "/work/branding/cavaro/cavaro-01.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Brand Philosophy",
        src: "/work/branding/cavaro/cavaro-02.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Logo System",
        src: "/work/branding/cavaro/cavaro-03.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Color and Materials",
        src: "/work/branding/cavaro/cavaro-04.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Typography and Graphic Language",
        src: "/work/branding/cavaro/cavaro-05.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Object Collection",
        src: "/work/branding/cavaro/cavaro-06.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Packaging System",
        src: "/work/branding/cavaro/cavaro-07.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Showroom Experience",
        src: "/work/branding/cavaro/cavaro-08.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Campaign Storytelling",
        src: "/work/branding/cavaro/cavaro-09.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Timeless Design Campaign",
        src: "/work/branding/cavaro/cavaro-010.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Care and Guidance",
        src: "/work/branding/cavaro/cavaro-011.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Brand Promise",
        src: "/work/branding/cavaro/cavaro-012.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Closing Brand Story",
        src: "/work/branding/cavaro/cavaro-013.png",
        width: 1402,
        height: 1122
      }
    ]
  },
  {
    title: "Aurix Audio Technology Brand System",
    category: "Branding",
    format: "Brand Identity + Product World",
    brief:
      "A futuristic audio brand identity with a custom wordmark, silver-black visual system, product mockups, UI presentation, retail environments, and campaign-ready brand applications.",
    images: [
      {
        title: "Brand Presentation Cover",
        src: "/work/branding/aurix/aurix-01.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Strategy",
        src: "/work/branding/aurix/aurix-02.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Construction",
        src: "/work/branding/aurix/aurix-03.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo System",
        src: "/work/branding/aurix/aurix-04.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Color Palette",
        src: "/work/branding/aurix/aurix-05.png",
        width: 1672,
        height: 941
      },
      {
        title: "Typography Guidelines",
        src: "/work/branding/aurix/aurix-06.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Business Card Mockup",
        src: "/work/branding/aurix/aurix-07.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Stationery System",
        src: "/work/branding/aurix/aurix-08.png",
        width: 1402,
        height: 1122
      },
      {
        title: "Product Packaging",
        src: "/work/branding/aurix/aurix-09.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Headphones Product Render",
        src: "/work/branding/aurix/aurix-010.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Earbuds Product Render",
        src: "/work/branding/aurix/aurix-011.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Mobile App Experience",
        src: "/work/branding/aurix/aurix-012.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Product Landing Page",
        src: "/work/branding/aurix/aurix-013.png",
        width: 1024,
        height: 1536
      },
      {
        title: "Outdoor Billboard",
        src: "/work/branding/aurix/aurix-014.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Campaign Tile System",
        src: "/work/branding/aurix/aurix-015.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Retail Store Concept",
        src: "/work/branding/aurix/aurix-016.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Lifestyle Campaign",
        src: "/work/branding/aurix/aurix-017.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Brand Guidelines Overview",
        src: "/work/branding/aurix/aurix-018.png",
        width: 1536,
        height: 1024
      }
    ]
  },
  {
    title: "Roastory Coffee Brand Identity",
    category: "Branding",
    format: "Brand Guidelines",
    brief:
      "A complete coffee identity presentation with monogram construction, logo system, clear space, and premium mockup applications.",
    images: [
      {
        title: "Brand Guidelines Cover",
        src: "/work/branding/roastory/roastory-guidelines-cover.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Application Mockups",
        src: "/work/branding/roastory/roastory-brand-mockups-grid.png",
        width: 1536,
        height: 1024
      },
      {
        title: "Logo Clear Space",
        src: "/work/branding/roastory/roastory-clear-space.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Logo Construction",
        src: "/work/branding/roastory/roastory-logo-construction.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Logo System Overview",
        src: "/work/branding/roastory/roastory-logo-system.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Identity Collage",
        src: "/work/branding/roastory/roastory-identity-collage.png",
        width: 1536,
        height: 1024
      }
    ]
  }
];

export const socialProjects = [
  {
    title: "Nike Morning Discipline Concept Campaign",
    category: "Social Media",
    format: "Spec Sports Campaign + Social Story System",
    brief:
      "A gritty black-and-white performance campaign built around early-morning discipline, solitude, and self-competition. The set uses massive editorial typography, rain-lit athletic scenes, restrained neon accents, and multiple vertical, square, and landscape formats for a premium social rollout.",
    images: [
      {
        title: "Nobody Is Watching Story Poster",
        src: "/work/social-media/nike/nike-01.png",
        width: 941,
        height: 1672
      },
      {
        title: "Nobody Is Watching Square Post",
        src: "/work/social-media/nike/nike-02.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Nobody Is Watching Landscape Banner",
        src: "/work/social-media/nike/nike-03.png",
        width: 1672,
        height: 941
      },
      {
        title: "Nobody Is Watching Vertical Creative",
        src: "/work/social-media/nike/nike-04.png",
        width: 1122,
        height: 1402
      },
      {
        title: "Difference Isn't Talent Story Poster",
        src: "/work/social-media/nike/nike-05.png",
        width: 1023,
        height: 1537
      },
      {
        title: "Difference Isn't Talent Square Post",
        src: "/work/social-media/nike/nike-06.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Difference Isn't Talent Landscape Banner",
        src: "/work/social-media/nike/nike-07.png",
        width: 1672,
        height: 941
      },
      {
        title: "Difference Isn't Talent Wide Creative",
        src: "/work/social-media/nike/nike-08.png",
        width: 1537,
        height: 1023
      },
      {
        title: "Every Record Was Once An Excuse",
        src: "/work/social-media/nike/nike-09.png",
        width: 1448,
        height: 1086
      },
      {
        title: "Every Record Track Banner",
        src: "/work/social-media/nike/nike-010.png",
        width: 1448,
        height: 1086
      },
      {
        title: "You Said Tomorrow Gym Poster",
        src: "/work/social-media/nike/nike-011.png",
        width: 1402,
        height: 1122
      },
      {
        title: "You Said Tomorrow Track Poster",
        src: "/work/social-media/nike/nike-012.png",
        width: 1402,
        height: 1122
      },
      {
        title: "You Said Tomorrow Shoe-Up Post",
        src: "/work/social-media/nike/nike-013.png",
        width: 1254,
        height: 1254
      },
      {
        title: "You Said Tomorrow Wide Gym Banner",
        src: "/work/social-media/nike/nike-014.png",
        width: 1402,
        height: 1122
      }
    ]
  },
  {
    title: "Orient Electric Aero O2 Social Campaign",
    category: "Social Media",
    format: "Smart Home Product Campaign + Social Adaptations",
    brief:
      "A clean lifestyle-led product campaign for Orient Electric's Aero O2 oxygen-enriching fan, combining bright home imagery, fresh green messaging, benefit icons, square posts, landscape banners, and story-first layouts for social media rollout.",
    images: [
      {
        title: "Primary Product Poster",
        src: "/work/social-media/orient-electric/orient-electric-01.png",
        width: 1122,
        height: 1402
      },
      {
        title: "Square Social Post",
        src: "/work/social-media/orient-electric/orient-electric-02.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Landscape Campaign Banner",
        src: "/work/social-media/orient-electric/orient-electric-03.png",
        width: 1672,
        height: 941
      },
      {
        title: "Vertical Story Creative",
        src: "/work/social-media/orient-electric/orient-electric-04.png",
        width: 1086,
        height: 1448
      }
    ]
  },
  {
    title: "Kyro Energy Drink Social Campaign",
    category: "Social Media",
    format: "Product Launch Campaign + Performance Posts",
    brief:
      "A high-voltage energy drink campaign built for social impact: aggressive typography, neon-green product energy, benefit-led icon systems, vertical reels/post formats, landscape banners, and punchy launch messaging designed to stop the scroll.",
    images: [
      {
        title: "Launch Poster",
        src: "/work/social-media/kyro/kyro-01.png",
        width: 1122,
        height: 1402
      },
      {
        title: "Landscape Campaign Banner",
        src: "/work/social-media/kyro/kyro-02.png",
        width: 1672,
        height: 941
      },
      {
        title: "Square Social Post",
        src: "/work/social-media/kyro/kyro-03.png",
        width: 1254,
        height: 1254
      },
      {
        title: "Vertical Story Creative",
        src: "/work/social-media/kyro/kyro-04.png",
        width: 1024,
        height: 1536
      }
    ]
  }
];

export const portfolioLibraries = [
  {
    title: "Branding",
    subtitle: "Identity systems, monograms, lockups, brand rules and mockups",
    href: "/work/branding",
    gradient: "from-champagne/30 via-white/5 to-transparent"
  },
  {
    title: "Real Estate",
    subtitle: "Luxury launches, property campaigns, EDMs, OOH and social posters",
    href: "/work/real-estate",
    gradient: "from-signal/30 via-white/5 to-transparent"
  },
  {
    title: "Social Media",
    subtitle: "Scroll-stopping product posts, campaign banners and launch creatives",
    href: "/work/social-media",
    gradient: "from-lime-300/25 via-white/5 to-transparent"
  },
  {
    title: "UI / UX",
    subtitle: "App screens, landing pages, dashboards and digital product visuals",
    href: "/work/ui-ux",
    gradient: "from-fuchsia-300/25 via-white/5 to-transparent"
  },
  {
    title: "AI Generated",
    subtitle: "Concept visuals, art direction tests and campaign imagery",
    href: "/work/ai-generated",
    gradient: "from-emerald-200/25 via-white/5 to-transparent"
  }
];

export const timeline = [
  {
    date: "2025 - Present",
    title: "Senior Graphic Designer",
    org: "Group Bayport",
    body: "Leading polished design execution for brand and marketing assets with a focus on quality, consistency, and production velocity."
  },
  {
    date: "3 Years",
    title: "Graphic Designer",
    org: "Property Master Pvt. Ltd.",
    body: "Created premium real-estate graphics, presentations, and campaign visuals built for credibility and high-value selling environments."
  },
  {
    date: "7 Months",
    title: "Graphic Designer & Video Editor",
    org: "7P Digital Services",
    body: "Delivered digital creatives and edited content across social and campaign formats."
  },
  {
    date: "Internship Track",
    title: "Graphic Designer Intern",
    org: "Citymall, YPR Eng. & Sol., Krash IT Services",
    body: "Built a practical creative foundation through production work, brand adaptation, and tool-led design execution."
  }
];

export const education = [
  "B.Sc. Animation & Multimedia, JC Bose University of Science and Technology (YMCA), Faridabad",
  "Senior Secondary, CBSE Board, Science",
  "Secondary, HBSE Board, B.S.M High School"
];
