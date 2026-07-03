# Part 1 UI Animation Challenge

Initial setup for the Rezerv Part 1 UI Animation Challenge.

## Stack

- Next.js with the App Router
- TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger
- Framer Motion

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Planned Sections

- Loading screen / preloader
- Hero entrance reveal
- Content / collection section with scroll-triggered animation

## Components

- `src/components/Preloader.tsx` is a reusable reference-style loading overlay with a pure CSS walking girl animation. It accepts accessible label, loading text, timing, and completion callback props.
- `src/components/home/HeroBanner.tsx` renders the first slide banner from data in `src/config/banner.config.ts`.
- `src/components/home/slides` separates the scroll slides into dedicated files.
- `src/components/layout` contains the fixed Rezerv logo and bottom social navigation, following the sibling `sms-fe` folder style.
- `src/types/banner.type.ts` holds the banner and social-link types separately, following the sibling `sms-fe` type-file style.
- The current preloader uses CSS-drawn character parts instead of an image asset.

## Notes

- Animations should favor `transform` and `opacity` for smoother rendering.
- The implementation should support desktop, tablet, and mobile breakpoints.
- `prefers-reduced-motion` handling should be added during the animation pass.
