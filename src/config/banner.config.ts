import type { BannerIcon, BannerSlide, SocialLink } from "@/types/banner.type";

const placements = [
  "left-[-20vw] top-[-34vh] h-[86vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[-2vw] top-[-44vh] h-[90vh] w-[37vw] min-h-[35rem] min-w-[23rem]",
  "left-[17vw] top-[-35vh] z-10 h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[35vw] top-[-45vh] h-[92vh] w-[38vw] min-h-[36rem] min-w-[24rem]",
  "left-[55vw] top-[-36vh] z-10 h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "right-[-20vw] top-[-44vh] h-[92vh] w-[38vw] min-h-[36rem] min-w-[24rem]",
  "left-[-26vw] top-[2vh] h-[92vh] w-[38vw] min-h-[36rem] min-w-[24rem]",
  "left-[-7vw] top-[-8vh] z-10 h-[90vh] w-[37vw] min-h-[35rem] min-w-[23rem]",
  "left-[12vw] top-[2vh] z-20 h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
  "left-[32vw] top-[-8vh] z-10 h-[90vh] w-[37vw] min-h-[35rem] min-w-[23rem]",
  "left-[51vw] top-[2vh] z-20 h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
  "right-[-25vw] top-[-8vh] h-[90vh] w-[37vw] min-h-[35rem] min-w-[23rem]",
  "left-[-20vw] top-[38vh] z-10 h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[-1vw] top-[28vh] z-20 h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
  "left-[18vw] top-[39vh] z-10 h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[37vw] top-[28vh] z-20 h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
  "left-[57vw] top-[39vh] h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "right-[-20vw] top-[28vh] z-10 h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
  "left-[-12vw] bottom-[-62vh] h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[10vw] bottom-[-55vh] z-10 h-[92vh] w-[38vw] min-h-[36rem] min-w-[24rem]",
  "left-[32vw] bottom-[-64vh] h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "left-[54vw] bottom-[-55vh] z-10 h-[92vh] w-[38vw] min-h-[36rem] min-w-[24rem]",
  "right-[-12vw] bottom-[-64vh] h-[88vh] w-[36vw] min-h-[34rem] min-w-[22rem]",
  "right-[-31vw] top-[18vh] h-[94vh] w-[39vw] min-h-[37rem] min-w-[24rem]",
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
    href: "https://discord.com",
    iconSrc: "/assets/social/discord.svg",
  },
  {
    label: "OpenSea",
    href: "https://opensea.io",
    iconSrc: "/assets/social/opensea.svg",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    iconSrc: "/assets/social/twitter.svg",
  },
];
