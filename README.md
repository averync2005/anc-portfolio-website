# Avery Nudell-Cook — Portfolio

Personal portfolio site built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

**Live site:** [anc-portfolio-website-jz66fe9pz-averynudellcook-2166s-projects.vercel.app](https://anc-portfolio-website-jz66fe9pz-averynudellcook-2166s-projects.vercel.app/)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, SCSS modules |
| **Animation** | Framer Motion, GSAP |
| **Email** | Resend |
| **Misc** | Lenis, Zod, next-themes |

---

## Running Locally

**Prerequisites:** Node.js v18+ and pnpm

1. **Install dependencies:**

    ```bash
    pnpm install
    ```

2. **Set up environment variables:**

    Create a `.env` file in the project root:

    ```bash
    RESEND_API_KEY=your_key_here
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) — powers the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for live cursors, presence, and chat |

3. **Start the dev server:**

    ```bash
    pnpm dev
    ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## Customizing Content

**Personal info** — name, title, email, social links, SEO: [`src/data/config.ts`](src/data/config.ts)

**Work cards** — defined in [`src/data/work.ts`](src/data/work.ts). Each entry has `id`, `title`, `subtitle`, `date`, `category`, `oneliner`, `story[]`, and `media[]`. Drop images or videos into `public/assets/work/<id>/` and they're auto-discovered when the card opens — no code change needed.

**About photos** — place photos in `public/assets/about/`. The portrait must be named `Portrait.jpg`. All other files appear in the scroll rail, sorted alphabetically.

**Skills** — defined in [`src/data/constants.ts`](src/data/constants.ts) as a `SKILLS` record keyed by `SkillNames` enum values.

---

## Features

- Elastic GSAP cursor with iframe-aware hide/show
- Canvas particle background, theme-aware (light + dark)
- Smooth scroll via Lenis
- Expandable work cards with auto-discovered assets
- Contact form with Resend email delivery
- Easter eggs — devtools console message + Nyan Cat
- Realtime *(optional)* — live cursors, online presence, and chat when `NEXT_PUBLIC_WS_URL` is set
