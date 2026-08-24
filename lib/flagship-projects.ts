export type FlagshipProject = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  classification: string;
  disclosure: string;
  image: string;
  imageAlt: string;
  brief: string;
  role: string;
  constraint: string;
  approach: string;
  deliverables: string;
  tools: string;
  outcome: string;
  ai: string;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: "property-master-campaign-system",
    title: "Property Master Campaign System",
    seoTitle: "Property Master Campaign System | Mayank Chauhan",
    description: "Employer-work case study showing Mayank Chauhan's senior visual design ownership across Property Master campaign systems, presentations, digital, print, motion and sales-support formats.",
    classification: "Employer Work",
    disclosure: "Employer Work - created while working with Property Master. Developer names are project subjects and do not imply direct commissioning.",
    image: "/optimized/seo/property-master-real-estate-campaign-design.webp",
    imageAlt: "Property Master real-estate campaign system designed by Mayank Chauhan across social media and sales-support formats.",
    brief: "Build clear, premium property-marketing communication from sales and marketing briefs.",
    role: "Senior Graphic Designer responsible for visual execution, campaign adaptation, stakeholder revisions, production preparation and final quality control.",
    constraint: "Balance property imagery, offer messaging, sales priorities and brand presentation across fast-moving requirements.",
    approach: "Established repeatable hierarchy, typography, image treatment and layout rules so campaign directions remained consistent across channels.",
    deliverables: "Social media, performance advertising, presentations, brochures, print collateral, thumbnails, reels and sales-support formats.",
    tools: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Canva and PowerPoint.",
    outcome: "Adapted the campaign system across social, performance advertising, presentations, print collateral, video and sales-support formats.",
    ai: "AI-assisted workflows were used selectively for concept and production support; final direction and quality control remained designer-led."
  },
  {
    slug: "group-bayport-brand-communication",
    title: "Group Bayport / Caterpillar Brand Communication",
    seoTitle: "Group Bayport Brand Communication | Mayank Chauhan",
    description: "Employer-work case study covering brand systems, campaign design, corporate presentations, promotional collateral and production-ready communication for Caterpillar Signs Pvt. Ltd. (Group Bayport).",
    classification: "Employer Work",
    disclosure: "Employer Work - created while employed by Caterpillar Signs Pvt. Ltd. (Group Bayport).",
    image: "/optimized/seo/group-bayport-brand-communication-design.webp",
    imageAlt: "Group Bayport brand and marketing communication developed across campaign, presentation and production formats.",
    brief: "Translate internal briefs into consistent brand and marketing communication across corporate and promotional touchpoints.",
    role: "Graphic Designer responsible for design production, multi-format adaptation, version control, internal collaboration and final visual checks.",
    constraint: "Maintain typography, spacing, image treatment and production accuracy across varied formats and deadlines.",
    approach: "Applied repeatable layout logic and disciplined visual quality control to preserve brand presentation through each adaptation.",
    deliverables: "Corporate presentations, campaign creatives, social assets, promotional collateral, signage-support layouts and print-ready production files.",
    tools: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Canva and PowerPoint.",
    outcome: "Supported consistent multi-format communication and production-ready delivery across recurring internal requirements.",
    ai: "No AI involvement claimed."
  },
  {
    slug: "presentation-design",
    title: "KENT Digital Brand Presentation",
    seoTitle: "Presentation Design Case Study | Mayank Chauhan",
    description: "Personal presentation-design concept by Mayank Chauhan exploring product storytelling, interface hierarchy, trust cues and a consistent digital brand experience for KENT.",
    classification: "Personal Concept",
    disclosure: "Personal Concept - Not commissioned by the featured brand.",
    image: "/optimized/seo/kent-digital-brand-presentation-design.webp",
    imageAlt: "KENT digital brand presentation concept showing product storytelling and interface hierarchy.",
    brief: "Explore how a familiar product brand could be expressed through a structured digital experience and presentation narrative.",
    role: "Self-directed concept development, visual direction, UI presentation, typography, layout, image treatment and final portfolio storytelling.",
    constraint: "Create a coherent, brand-sensitive experience without implying a commissioned relationship with KENT.",
    approach: "Built a presentation-led system connecting product storytelling, interface hierarchy, trust cues, offers and consistent visual language.",
    deliverables: "Digital brand presentation, homepage journey, product experience, trust and conversion sections, design-system views and promotional layouts.",
    tools: "Figma, Adobe Photoshop, Adobe Illustrator and presentation-design workflows.",
    outcome: "Produced a cohesive multi-screen presentation demonstrating visual-system thinking and structured product storytelling.",
    ai: "No AI involvement claimed."
  },
  {
    slug: "ai-assisted-concept",
    title: "Emaar India Business Centre Visual Exploration",
    seoTitle: "AI-Assisted Concept Case Study | Mayank Chauhan",
    description: "AI-assisted personal concept by Mayank Chauhan demonstrating designer-led architectural image development, scene refinement, visual consistency and campaign-style presentation.",
    classification: "AI-Assisted Concept",
    disclosure: "Personal Concept - Not commissioned by the featured brand.",
    image: "/optimized/seo/emaar-ai-assisted-architecture-concept.webp",
    imageAlt: "AI-assisted commercial architecture concept directed and refined by Mayank Chauhan for campaign-style presentation.",
    brief: "Explore campaign-ready commercial architecture imagery across day, dusk, night and elevated viewpoints.",
    role: "Designer-led prompt direction, output selection, scene refinement, Photoshop treatment, consistency review and presentation design.",
    constraint: "Improve realism and visual continuity across generated scenes while clearly presenting the work as an uncommissioned concept.",
    approach: "Directed composition and lighting, selected viable outputs, refined images and organized a consistent campaign-style visual sequence.",
    deliverables: "AI-assisted architecture images, mood variations, refined campaign visuals and presentation boards.",
    tools: "Google Flow and Adobe Photoshop, supported by AI-assisted image workflows.",
    outcome: "Created a controlled visual exploration demonstrating responsible AI-assisted execution and designer-led final quality control.",
    ai: "AI supported image development while selection, refinement, brand framing and quality control remained designer-led."
  }
];

export function getFlagshipProject(slug: string) {
  return flagshipProjects.find((project) => project.slug === slug);
}
