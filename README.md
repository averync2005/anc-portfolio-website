# Avery Nudell-Cook — Portfolio

Personal portfolio site. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Features

- **Smooth scroll** — Lenis-powered scroll with GSAP animations
- **Animated particles** — Canvas-based floating particle background
- **Work section** — Expandable cards with auto-discovered asset folders (images/videos loaded from `public/assets/work/<id>/`)
- **About section** — Portrait + circular-scroll photo rail (auto-populated from `public/assets/about/`)
- **Skills section** — Interactive skill grid driven by `src/data/constants.ts`
- **Contact form** — Email delivery via Resend
- **Light & Dark mode** — Full theme support with view transition animations
- **Easter eggs** — Devtools console message + nyan cat easter egg
- **Realtime** _(optional)_ — Live cursors, online presence, and chat via WebSocket

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Animation** | Framer Motion, GSAP |
| **Email** | Resend |
| **Misc** | Lenis, Zod, next-themes, SCSS modules |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

1. **Install dependencies:**

    ```bash
    pnpm install
    ```

2. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

3. **Run the development server:**

    ```bash
    pnpm dev
    ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## Content

### Personal info

All personal info is in [`src/data/config.ts`](src/data/config.ts) — name, title, email, social links, SEO.

### Work entries

Work cards are defined in [`src/data/work.ts`](src/data/work.ts). Each entry has:

- `id`, `title`, `subtitle`, `date`, `category`, `oneliner`, `story[]`, `media[]`
- `assetsFolder` _(optional)_ — overrides the default `public/assets/work/<id>/` folder

Any images or videos in `public/assets/work/<id>/` are auto-discovered and rendered when the card is opened. No code change needed — just drop files in the folder.

### About photos

Place photos in `public/assets/about/`. The portrait must be named `Portrait.jpg`. All other files appear in the circular-scroll rail, sorted alphabetically.

### Skills

Skills are defined in [`src/data/constants.ts`](src/data/constants.ts) as a `SKILLS` record keyed by `SkillNames` enum values.

---

## Realtime Features (Optional)

When `NEXT_PUBLIC_WS_URL` is set, the portfolio activates:

- Live cursors — see other visitors' cursors in realtime
- Online presence — shows who's currently on the site
- Chat — live chat between visitors

Without it, the portfolio runs as a fully static site with no backend dependency.

---

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/averync2005/portfolio)

This site is deployed on **Vercel**. To deploy:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push
