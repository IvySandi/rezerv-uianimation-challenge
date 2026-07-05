import type { BannerIcon, BannerSlide, SocialLink } from "@/types/banner.type";

const placements = [
  "left-[-20vw] top-[-34vh] aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "left-[-2vw] top-[-44vh] aspect-[2/3] w-[clamp(12.5rem,37vw,33rem)]",
  "left-[17vw] top-[-35vh] z-10 aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "left-[35vw] top-[-45vh] aspect-[2/3] w-[clamp(13rem,38vw,34rem)]",
  "left-[55vw] top-[-36vh] z-10 aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "right-[-20vw] top-[-44vh] aspect-[2/3] w-[clamp(13rem,38vw,34rem)]",
  "left-[-26vw] top-[2vh] aspect-[2/3] w-[clamp(13rem,38vw,34rem)]",
  "left-[-7vw] top-[-8vh] z-10 aspect-[2/3] w-[clamp(12.5rem,37vw,33rem)]",
  "left-[12vw] top-[2vh] z-20 aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
  "left-[32vw] top-[-8vh] z-10 aspect-[2/3] w-[clamp(12.5rem,37vw,33rem)]",
  "left-[51vw] top-[2vh] z-20 aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
  "right-[-25vw] top-[-8vh] aspect-[2/3] w-[clamp(12.5rem,37vw,33rem)]",
  "left-[-20vw] top-[38vh] z-10 aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "left-[-1vw] top-[28vh] z-20 aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
  "left-[18vw] top-[39vh] z-10 aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "left-[37vw] top-[28vh] z-20 aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
  "left-[57vw] top-[39vh] aspect-[2/3] w-[clamp(12rem,36vw,32rem)]",
  "right-[-20vw] top-[28vh] z-10 aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
  "left-[-12vw] bottom-[-12rem] aspect-[2/3] w-[clamp(12rem,36vw,32rem)] md:bottom-[-62vh]",
  "left-[10vw] bottom-[-11rem] z-10 aspect-[2/3] w-[clamp(13rem,38vw,34rem)] md:bottom-[-55vh]",
  "left-[32vw] bottom-[-12rem] aspect-[2/3] w-[clamp(12rem,36vw,32rem)] md:bottom-[-64vh]",
  "left-[54vw] bottom-[-11rem] z-10 aspect-[2/3] w-[clamp(13rem,38vw,34rem)] md:bottom-[-55vh]",
  "right-[-12vw] bottom-[-12rem] aspect-[2/3] w-[clamp(12rem,36vw,32rem)] md:bottom-[-64vh]",
  "right-[-31vw] top-[18vh] aspect-[2/3] w-[clamp(13.5rem,39vw,35rem)]",
];

const rotations = [-7, -5, -9, -6, -8, -4, -7, -9, -5, -7, -6, -8, -4, -7, -9, -5, -7, -6, -8, -4, -7, -9, -5, -7];

export const bannerIcons: BannerIcon[] = placements.map((className, index) => ({
  id: `chillin-${index}`,
  src: "/assets/transhumans/Chillin.svg",
  alt: "Chillin",
  className,
  rotate: rotations[index],
  floatX: index % 2 === 0 ? 10 : -10,
  floatY: 12 + (index % 4) * 4,
  delay: (index % 9) * 0.06,
  duration: 2.4 + (index % 6) * 0.38,
}));

export const bannerSlides: BannerSlide[] = [
  {
    id: "wide",
    background: "#fffdf8",
    scale: 1,
    x: "0vw",
    y: "0vh",
    rotate: 0,
    dim: 0,
  },
  {
    id: "brand-intro",
    background: "#fff4df",
    scale: 1,
    x: "0vw",
    y: "0vh",
    rotate: 0,
    dim: 0,
  },
  {
    id: "walking-story",
    background: "#fff4df",
    scale: 1,
    x: "0vw",
    y: "0vh",
    rotate: 0,
    dim: 0,
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Discord",
    href: "#",
    iconSrc: "/assets/social/discord.svg",
  },
  {
    label: "OpenSea",
    href: "#",
    iconSrc: "/assets/social/opensea.svg",
  },
  {
    label: "Twitter",
    href: "#",
    iconSrc: "/assets/social/twitter.svg",
  },
];
