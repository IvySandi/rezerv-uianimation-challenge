import type { FloatingShape } from "@/components/home/types/slide.types";

export const floatingShapes: FloatingShape[] = [
  {
    className:
      "left-[-5vw] h-[clamp(7rem,18vw,16rem)] w-[clamp(5.25rem,13vw,12rem)] rounded-[72%_48%_66%_52%/58%_64%_54%_70%] bg-[linear-gradient(155deg,#b8f0ff_0%,#c4d6ff_52%,#d5ccff_100%)]",
    x: [0, 16, -8, 0],
    rotate: [0, 6, -3, 0],
    duration: 12,
    delay: 0,
  },
  {
    className:
      "right-[9vw] h-[clamp(8rem,20vw,18rem)] w-[clamp(5.75rem,14vw,13rem)] rounded-[62%_70%_50%_68%/76%_52%_72%_48%] bg-[linear-gradient(150deg,#bff2ff_0%,#c8d8ff_56%,#ddd1ff_100%)]",
    x: [0, -18, 10, 0],
    rotate: [0, -5, 3, 0],
    duration: 15,
    delay: -5,
  },
  {
    className:
      "right-[-2vw] h-[clamp(6.5rem,14vw,13rem)] w-[clamp(9rem,20vw,18rem)] rounded-[64%_48%_72%_54%/56%_68%_50%_72%] bg-[linear-gradient(125deg,#beeefe_0%,#c7d6ff_48%,#d9ceff_100%)]",
    x: [0, 14, -10, 0],
    rotate: [0, 4, -4, 0],
    duration: 16,
    delay: -9,
  },
  {
    className:
      "left-[31vw] h-[clamp(7rem,16vw,14rem)] w-[clamp(9rem,20vw,18rem)] rounded-[70%_52%_64%_48%/52%_76%_48%_70%] bg-[linear-gradient(145deg,#ffd0c6_0%,#ffb2ad_52%,#ff9fb4_100%)]",
    x: [0, -12, 18, 0],
    rotate: [0, -4, 6, 0],
    duration: 14,
    delay: -3,
  },
  {
    className:
      "left-[54vw] h-[clamp(7rem,16vw,14rem)] w-[clamp(5rem,11vw,10rem)] rounded-[78%_46%_60%_52%/58%_70%_50%_76%] bg-[linear-gradient(155deg,#c0f0ff_0%,#c9d4ff_44%,#e0ceff_100%)]",
    x: [0, 18, -12, 0],
    rotate: [0, 5, -5, 0],
    duration: 17,
    delay: -11,
  },
  {
    className:
      "right-[-8vw] h-[clamp(6.5rem,14vw,13rem)] w-[clamp(7rem,16vw,14rem)] rounded-[58%_72%_46%_66%/68%_52%_72%_48%] bg-[linear-gradient(145deg,#ffd3c7_0%,#ffabae_54%,#ff98b8_100%)]",
    x: [0, -12, 12, 0],
    rotate: [0, -6, 4, 0],
    duration: 18,
    delay: -7,
  },
];
