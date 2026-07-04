# Rezerv UI Animation Challenge

An animated Rezerv landing page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The experience includes a loading screen, sticky scroll-driven hero slides, responsive character animation, social links, and a collection call-to-action.

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Lottie React

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000] in your browser.

## Scripts

```bash
npm run dev     
npm run build    
npm run start    
npm run lint     
```

## Project Structure

- `src/app/page.tsx` renders the landing page and controls the preloader handoff.
- `src/components/Preloader.tsx` handles the initial loading overlay.
- `src/components/home/HeroBanner.tsx` coordinates the sticky slide experience and scroll gestures.
- `src/components/home/HeroCharacter.tsx` renders the animated character shared across slides.
- `src/components/home/slides` contains the individual slide components.
- `src/components/layout` contains fixed page UI such as the logo, social dock, and collection link.
- `src/config/banner.config.ts` stores slide, icon, and social-link configuration.
- `src/types` contains shared TypeScript types.

## Implementation Notes

- Animations use `transform` and `opacity` where possible for smoother rendering.
- Layouts are tuned for desktop, tablet, and mobile viewports.
- Reduced-motion preferences are respected in the main animation paths.
