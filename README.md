# Avery Nudell-Cook — Portfolio

Personal portfolio site built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

**Live site:** [anc-portfolio-website-jz66fe9pz-averynudellcook-2166s-projects.vercel.app](https://anc-portfolio-website-jz66fe9pz-averynudellcook-2166s-projects.vercel.app/)

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
- Expandable work cards with auto-discovered assets
- Contact form with Resend email delivery
- Easter egg — if you can find it :)
- Realtime *(optional)* — live cursors, online presence, and chat when `NEXT_PUBLIC_WS_URL` is set
