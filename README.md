# Rezerv UI Animation Challenge

Animated landing-page hero built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lottie React. 
The page includes a preloader, a sticky three-slide hero, scroll/swipe/keyboard navigation, responsive character motion,
social links, and a collection button.


# Getting Started

npm install


# Start the local development server:

npm run dev

Open [http://localhost:3000] in your browser.

# Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

# Implemented Slides

1. `wide` / character collage slide
   - Uses repeated `Chillin.svg` artwork as layered foreground and background pieces.
   - Adds subtle floating, rotation, and entrance motion around the central character.

2. `brand-intro` / Rezerv title slide
   - Centers the Rezerv wordmark as the main visual moment.
   - Uses floating abstract shapes and repositions the walking character into a rotated brand pose.

3. `walking-story` / text-and-cloud slide
   - Moves the character into a story layout.
   - Adds drifting shapes, interactive jelly like clouds, and animated line-by-line wave like text.

# Libraries Chosen and Why

- **Next.js App Router**: Provides the application structure and optimized assets.
- **React + TypeScript**: Keeps component props, slide data, and shared config typed while still allowing fast iteration.
- **Tailwind CSS**: Makes responsive layout, spacing, sizing, and breakpoint-specific composition quick to tune.
- **Framer Motion**: Drives the slide transitions, character movement, repeated floating effects, reduced-motion behavior, and preloader exit animation.
- **Lottie React**: Renders the walking preloader animation from the supplied JSON asset.
- **GSAP**: Included as an animation option, though the current implementation primarily uses Framer Motion for React-aligned state-driven animation.

# Animation, Smooth Scroll, and Responsiveness

- The hero section is `300vh` tall, with a sticky `100vh` viewport that maps each viewport-height scroll segment to one slide.
- Wheel, touch, keyboard, and native scroll events are normalized so slide changes feel intentional instead of firing on every small scroll delta.
- Programmatic slide changes use `window.scrollTo({ behavior: "smooth" })`, with instant transitions when reduced motion is requested.
- Slide state is separated into active and previous indexes so returning to the first slide can use a longer placement transition.
- The character is shared across all slides and changes position, scale, rotation, bobbing, and walking speed based on the active slide.
- Layouts rely on `clamp(min, preferred, max)`, viewport units, responsive Tailwind utilities, and fixed aspect ratios to keep artwork and text stable across desktop, tablet, and mobile sizes.

# Performance Notes

- Most motion uses `transform` and `opacity`, which are cheaper for the browser to animate than layout-affecting properties.
- Decorative animation elements are positioned absolutely to avoid causing document reflow during transitions.
- The main character container uses `will-change-transform` where the largest repeated transform animation occurs.
- Reduced-motion preferences are disabling repeated motion loops and shortening transitions.
- `next/image` is used for SVG artwork instances where the slide renders image elements.
- The preloader temporarily disables body scrolling to avoid scroll jumps before the hero is ready.

# Assumptions Made

- This is a single animated landing-page hero rather than a multi-page site.
- The three requested slides are the three configured banner states: `wide`, `brand-intro`, and `walking-story`.
- Placeholder story copy in the third slide is acceptable because the task focus is animation and component behavior.
- `Chillin.svg` and walking Lottie JSON are the intended visual assets for the animation.

