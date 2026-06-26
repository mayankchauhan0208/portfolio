# Same-Hosting Admin Panel Plan

## 1. Current Project Audit

- The portfolio is a Next.js app using the App Router.
- `next.config.mjs` has `output: "export"`, so the site is built as a static export.
- The GitHub Actions workflow `.github/workflows/deploy.yml` builds with `npm run build`, uploads the `out` folder, and deploys through GitHub Pages.
- The current custom domain is configured separately and can stay unchanged.
- Portfolio content currently lives mostly in `lib/portfolio-data.ts`.
- Metadata is currently managed in `app/layout.tsx` and some page-level metadata exports.
- Media is served from `public/`, with the current two-source strategy:
  - Gallery/card images use optimized thumbnail paths.
  - Modal/full preview uses original high-quality paths.
  - Video cards use poster images and load video only in preview.

## 2. How To Keep The Same Hosting

The admin panel should be added inside the same repository and deployed through the same GitHub Pages workflow. The public site remains static and continues to use the existing custom domain.

The admin flow should update content by committing changes back to the GitHub repo. Once a commit lands on `main`, the existing GitHub Actions workflow builds and deploys the updated static site.

No hosting migration is required. The admin is only an editor that writes to GitHub; GitHub remains the source of truth and GitHub Pages remains the deployment target.

## 3. Mode A Or Mode B

### Mode A: Server-capable hosting

Use Mode A only if the current hosting supports Next.js server routes, secure environment variables, and server-side API handlers.

Mode A would allow:
- `/admin` protected by server-side authentication.
- GitHub token stored only in environment variables.
- GitHub commits created from server routes.
- No GitHub token exposed to the browser.

### Mode B: Static-only hosting

The current project is configured for static export and GitHub Pages, so the recommended mode is Mode B.

Mode B works with current hosting by:
- Building `/admin` as a static client-side admin app.
- Asking the admin user to paste a GitHub fine-grained personal access token.
- Storing that token only in browser `sessionStorage`.
- Using the token directly from the browser to call GitHub’s Contents API.
- Restricting writes in the UI to approved content and media files.

## 4. Recommended Admin Architecture Without Hosting Change

Recommended architecture: Mode B static GitHub-controlled editor.

Routes:
- `/admin`
- `/admin/dashboard`

Main parts:
- Static admin UI inside the same Next.js app.
- Content stored as JSON files under `/content`.
- Public site reads imported JSON content at build time.
- Admin edits JSON in the browser.
- Admin validates data before saving.
- Admin commits JSON changes to GitHub using the user-provided GitHub token.
- GitHub Actions rebuilds and deploys the public site.

No backend server is required. No secrets are committed.

## 5. Content JSON Structure

Recommended files:

```txt
/content/site.json
/content/categories.json
/content/projects.json
/content/experience.json
/content/skills.json
/content/contact.json
/content/seo.json
```

### `/content/site.json`

```json
{
  "hero": {
    "eyebrow": "Hello! I'm",
    "name": "Mayank Chauhan",
    "headline": "Visual Designer for Brands, Campaigns & UI",
    "support": "I create brand communication, campaign creatives, UI concepts, social media assets, real-estate marketing visuals, video edits, and AI-assisted creative workflows."
  },
  "roleTicker": [
    "Visual Designer",
    "Creative Brand Designer",
    "Campaign Designer",
    "UI Visual Designer",
    "Motion & Video Creative"
  ],
  "ctas": [
    { "label": "View Selected Work", "href": "#work", "type": "internal" },
    { "label": "Contact Me", "href": "mailto:mayankchauhan0208@gmail.com", "type": "email" },
    { "label": "Download Resume", "href": "/resume/Mayank-Chauhan-Resume.pdf", "type": "download" }
  ]
}
```

### `/content/categories.json`

```json
[
  {
    "id": "real-estate",
    "title": "Real Estate Marketing",
    "label": "Property Campaigns",
    "subtitle": "Property launch campaigns, sales creatives, outdoor layouts, digital assets, and premium real-estate communication.",
    "href": "/work/real-estate",
    "accent": "#8ee8ff",
    "motif": "RE",
    "order": 2,
    "published": true,
    "caseStudy": {
      "overview": "",
      "challenge": "",
      "role": "",
      "direction": "",
      "deliverables": [],
      "tools": [],
      "outcome": ""
    }
  }
]
```

### `/content/projects.json`

```json
[
  {
    "id": "emaar-business-centre-reveal",
    "categoryId": "real-estate",
    "title": "Emaar Business Centre Reveal",
    "format": "EDM Campaign",
    "brief": "A clean commercial launch creative with bright architectural scale, corporate hierarchy, and booking urgency.",
    "order": 1,
    "featured": true,
    "published": true,
    "draft": false,
    "media": [
      {
        "type": "image",
        "thumbnail": "/optimized-images/work/real-estate/emaar-business-centre-reveal.webp",
        "src": "/images/work/real-estate/emaar-business-centre-reveal.png",
        "alt": "Emaar Business Centre Reveal EDM campaign creative",
        "width": 1080,
        "height": 1920,
        "fit": "contain"
      }
    ]
  }
]
```

### `/content/experience.json`

```json
[
  {
    "date": "February, 2025 - Present",
    "title": "Senior Graphic Designer",
    "org": "Property Master Pvt. Ltd.",
    "body": "Creating real-estate marketing visuals, campaign creatives, and presentation assets for sales and digital communication.",
    "bullets": [],
    "tags": [],
    "order": 1,
    "published": true
  }
]
```

### `/content/skills.json`

```json
{
  "software": [
    {
      "name": "Adobe Photoshop",
      "logo": "/optimized-images/tool-icons/adobe-photoshop.webp",
      "fallback": "Ps",
      "published": true
    }
  ],
  "expertise": [
    "Visual Design",
    "Brand Communication",
    "Campaign Creatives"
  ],
  "aiTools": []
}
```

### `/content/contact.json`

```json
{
  "email": "mayankchauhan0208@gmail.com",
  "phone": "+91 9992713289",
  "behance": "https://www.behance.net/mayankchauhan0208",
  "linkedin": "",
  "resume": "/resume/Mayank-Chauhan-Resume.pdf"
}
```

### `/content/seo.json`

```json
{
  "title": "Mayank Chauhan | Visual Designer & Creative Brand Designer",
  "description": "Portfolio of Mayank Chauhan, a visual designer creating brand communication, campaign creatives, UI concepts, real-estate marketing visuals, motion/video assets, and AI-assisted creative workflows.",
  "openGraphTitle": "Mayank Chauhan | Visual Designer Portfolio",
  "openGraphDescription": "Brand, campaign, UI visual, real-estate marketing, motion/video, and AI-assisted creative work by Mayank Chauhan.",
  "twitterTitle": "Mayank Chauhan | Visual Designer Portfolio",
  "twitterDescription": "Visual design portfolio covering brand communication, campaign creatives, UI concepts, motion/video, and AI-assisted creative workflows.",
  "image": "/optimized-images/images/mayank-portrait.webp"
}
```

## 6. Media Path Strategy

Recommended folders:

```txt
/public/images
/public/optimized-images
/public/videos
/public/video-thumbnails
/public/resume
```

Image object:

```json
{
  "type": "image",
  "thumbnail": "/optimized-images/path/to-thumbnail.webp",
  "src": "/images/path/to-original.png",
  "alt": "Descriptive alt text",
  "width": 1080,
  "height": 1920,
  "fit": "contain"
}
```

Video object:

```json
{
  "type": "video",
  "poster": "/video-thumbnails/path/to-poster.webp",
  "src": "/videos/path/to-video.mp4",
  "alt": "Descriptive video title",
  "width": 1080,
  "height": 1920
}
```

Rules:
- Gallery/card uses `thumbnail` for images.
- Modal/full preview uses `src` for images.
- If `thumbnail` is missing, gallery falls back to `src`.
- If `src` is missing, modal falls back to `thumbnail`.
- Video cards use `poster`.
- Original video loads only after click/open.
- Admin should validate that paths begin only with approved public folders.

## 7. GitHub Commit/Update Workflow

Mode B workflow:

1. User opens `/admin`.
2. User enters GitHub fine-grained personal access token.
3. Admin stores token in `sessionStorage`.
4. Admin loads current content JSON from GitHub using the Contents API.
5. User edits content.
6. Admin validates fields and paths.
7. User previews local unsaved changes inside admin.
8. User clicks `Save Draft` or `Publish`.
9. Admin commits updated JSON to `main` through GitHub Contents API.
10. GitHub Actions deploy workflow runs automatically.
11. Live site updates through the current GitHub Pages deployment.

Commit messages:
- Draft: `chore: update portfolio draft content`
- Publish: `content: update portfolio content`

Write scope should be restricted to:

```txt
/content/*.json
/public/images/**
/public/optimized-images/**
/public/videos/**
/public/video-thumbnails/**
/public/resume/**
```

## 8. Admin Security Approach

### Mode A security

- Best security if server routes are available.
- Store GitHub token in environment variables.
- Authenticate admin server-side.
- Never expose token to browser.
- Validate all writes server-side.

### Mode B security

- Required for current static GitHub Pages setup.
- Do not store any GitHub token in frontend code.
- Do not commit secrets.
- Do not store admin password in public JavaScript.
- Do not call frontend-only password protection secure.
- User manually provides a fine-grained GitHub token.
- Store token only in `sessionStorage`, not `localStorage`.
- Token should be scoped only to the portfolio repo.
- Token should have the minimum required permissions:
  - Repository contents: read/write.
  - Metadata: read.
- The admin UI should show a clear warning:
  - Anyone can see the admin app code.
  - Security comes from GitHub token permissions.
  - The token should be short-lived and repo-scoped.

Validation rules:
- Confirm before delete.
- Validate required fields.
- Validate URL protocols.
- Validate media paths.
- Validate project/category IDs.
- Block arbitrary file writes.
- Block `../` path traversal.
- Block writes outside approved folders.

## 9. What Is Safely Possible

With current hosting:
- Add a static `/admin` editor.
- Edit JSON content online from mobile/laptop.
- Add, edit, reorder, publish, draft, and delete projects.
- Control hero, ticker, CTAs, categories, case studies, about, experience, skills, contact, resume path, and SEO.
- Commit content updates to GitHub.
- Trigger the existing GitHub Pages deployment.
- Preserve the existing custom domain.
- Preserve the existing media strategy.

## 10. What Is Not Safely Possible Without Backend Support

Without server routes/environment variables:
- Secure password-only admin authentication is not possible.
- A GitHub token cannot be safely hidden from browser code once used client-side.
- Large direct file uploads may hit browser/GitHub API limits.
- Image optimization cannot happen securely on the static host.
- Video transcoding cannot happen on the static host.
- Secret-based automation cannot be protected inside the static frontend.

For static mode, the honest secure approach is GitHub token-based access with minimum permissions.

## 11. Step-By-Step Implementation Phases

### Phase 1: Content extraction

- Create `/content` JSON files.
- Move data out of `lib/portfolio-data.ts` into JSON.
- Add TypeScript schemas/types.
- Update site pages to read JSON imports.
- Keep visual output unchanged.

### Phase 2: Admin read-only dashboard

- Create `/admin`.
- Add token entry screen.
- Load content JSON from local bundled files first.
- Show dashboard sections:
  - Homepage
  - Work/projects
  - Categories
  - Media paths
  - About
  - Experience
  - Contact
  - SEO
- No writes yet.

### Phase 3: Validation and local editing

- Add forms for each content area.
- Add project create/edit/delete UI.
- Add drag or numeric order controls.
- Add published/draft toggles.
- Add media path manager.
- Add preview state before saving.
- Add schema validation.

### Phase 4: GitHub read/write integration

- Add GitHub token session handling.
- Fetch file SHAs from GitHub Contents API.
- Commit content changes to approved files only.
- Add save status and GitHub error handling.
- Add delete confirmations.

### Phase 5: Publish workflow polish

- Add `Save Draft` and `Publish` commit flows.
- Add deployment status link to GitHub Actions.
- Add post-save instructions: wait for GitHub Pages deploy.
- Add live-site verification checklist.

### Phase 6: Media support

- Start with media path editing only.
- Later add optional upload-to-approved-folder support through GitHub API.
- Keep original and optimized paths separate.
- Do not auto-optimize images in static admin unless a safe local/offline process is added.

## 12. Files To Create/Edit

Create:

```txt
SAME_HOSTING_ADMIN_PLAN.md
/content/site.json
/content/categories.json
/content/projects.json
/content/experience.json
/content/skills.json
/content/contact.json
/content/seo.json
/lib/content-schema.ts
/lib/content-loader.ts
/lib/admin/github-client.ts
/lib/admin/validation.ts
/app/admin/page.tsx
/app/admin/admin-client.tsx
/app/admin/admin.css or admin component styles
```

Edit:

```txt
app/page.tsx
app/work/page.tsx
app/work/[category]/page.tsx
app/layout.tsx
app/sitemap.ts
components/nav.tsx
components/role-ticker.tsx
components/loading-overlay.tsx
components/preview-image.tsx
components/preview-video.tsx
lib/site-paths.ts
```

Optional later:

```txt
/public/resume/Mayank-Chauhan-Resume.pdf
/public/optimized-images/**
/public/video-thumbnails/**
```

## 13. Testing Checklist

Content migration:
- Build output visually matches current site.
- All routes still generate.
- Hero content renders.
- Work categories render.
- Project pages render.
- Case-study blocks render.
- Resume path works.
- SEO metadata renders.

Admin UI:
- `/admin` loads on mobile and desktop.
- Token is never stored in `localStorage`.
- Token clears when tab/session closes.
- Empty token blocks GitHub writes.
- Invalid token shows clear error.
- Admin forms validate required fields.
- Delete requires confirmation.
- Draft/published states work.
- Project ordering is stable.
- Media path fields reject invalid folders.
- GitHub commit succeeds for allowed JSON files.
- GitHub commit fails for blocked paths.

Deployment:
- GitHub Actions starts after admin commit.
- Build passes.
- Live site updates after deployment.
- Custom domain remains unchanged.

Media:
- Gallery uses thumbnails.
- Modal uses originals.
- Image fallback rules work.
- Video cards use posters.
- Video files do not load in grid.

Responsive:
- `/admin` works at 390 x 844.
- `/admin` works at 430 x 932.
- `/admin` works at 768 x 1024.
- `/admin` works at 1440 x 900.

## 14. Rollback Plan

- Every admin publish creates a Git commit.
- To rollback content, revert the last content commit in GitHub or locally.
- If admin UI breaks, revert the admin implementation commit.
- If JSON content breaks build, GitHub Actions will fail and the old live site should remain deployed.
- Keep the original `lib/portfolio-data.ts` migration commit easy to identify.
- Keep content migration and admin UI in separate commits so rollback is simple.

## 15. Safest First Implementation Phase

The safest first phase is content extraction only.

First implementation should:
- Create `/content/*.json`.
- Move current portfolio data into JSON without changing visible design.
- Add typed loaders and validation.
- Update the site to consume JSON.
- Run production build.
- Compare key routes.

Do not build GitHub write access first. The admin should only be added after content JSON is stable and the public site still builds exactly as expected.
