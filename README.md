# Avery Nudell-Cook: Portfolio

Personal portfolio site built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

**Live site:** [anc-portfolio-website.vercel.app](https://anc-portfolio-website.vercel.app/)

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, SCSS modules |
| **Animation** | Framer Motion, GSAP |
| **Email** | Resend |
| **Misc** | Lenis, Zod, next-themes |

---

## Running Locally

```bash
pnpm install
pnpm dev
```

---

## Features

- Elastic GSAP cursor with iframe-aware hide/show
- Canvas particle background, theme-aware (light + dark)
- Smooth scroll via Lenis
- Expandable work cards (Experience and Projects, multiple roles per organization) with auto-discovered photos
- Contact form with Resend email delivery
- Generated share-preview image (`src/app/opengraph-image.tsx`)

---

## Editing content

| What | Where |
| --- | --- |
| Work cards (stories, roles, links, photo alt text) | `src/data/work.ts` |
| Skills | `src/data/constants.ts` |
| Page title, description, tagline | `src/data/config.ts` |
| About text and photo alt text | `src/components/sections/about.tsx` |
| Photos | `public/assets/about/`, `public/assets/work/<card id>/` |
- Easter egg: if you can find it :)
