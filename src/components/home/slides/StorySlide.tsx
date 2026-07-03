"use client";

import { motion } from "framer-motion";

type StorySlideProps = {
  isReady: boolean;
  isVisible: boolean;
  shouldReduceMotion: boolean;
};

const floatingCapsules = [
  "left-[6vw] top-[18vh] h-20 w-56 rotate-[-8deg] rounded-full bg-white",
  "left-[48vw] top-[11vh] h-16 w-72 rotate-[7deg] rounded-full bg-[#c9dfff]",
  "left-[78vw] top-[24vh] h-24 w-52 rotate-[-11deg] rounded-full bg-[#ffb7a7]",
  "left-[67vw] top-[68vh] h-20 w-64 rotate-[9deg] rounded-full bg-white",
  "left-[18vw] top-[80vh] h-16 w-72 rotate-[5deg] rounded-full bg-[#ffd26b]",
  "left-[88vw] top-[82vh] h-20 w-56 rotate-[-6deg] rounded-full bg-[#d9c9ff]",
];

const statChips = [
  { label: "5,555", value: "soft mint" },
  { label: "community", value: "first" },
  { label: "handmade", value: "traits" },
];

export function StorySlide({
  isReady,
  isVisible,
  shouldReduceMotion,
}: StorySlideProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isReady && isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden={!isVisible}
    >
      {floatingCapsules.map((shape, index) => (
        <motion.div
          key={`${shape}-${index}`}
          className={`pointer-events-none absolute opacity-80 shadow-[0_16px_40px_rgba(36,71,159,0.06)] ${shape}`}
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0 }
              : {
                  x: [0, index % 2 === 0 ? 18 : -22, 0],
                  y: [0, index % 2 === 0 ? -16 : 14, 0],
                }
          }
          transition={{
            duration: 7.5 + index * 0.7,
            delay: -index * 0.85,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute left-[5vw] top-[22vh] h-[min(48vw,34rem)] w-[min(48vw,34rem)] rounded-[48%_52%_44%_56%] bg-[#24479f]"
        initial={{ opacity: 0, scale: 0.86, rotate: -12 }}
        animate={
          isReady && isVisible
            ? { opacity: 1, scale: 1, rotate: -5 }
            : { opacity: 0, scale: 0.86, rotate: -12 }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute inset-x-0 top-[14vh] z-10 px-6 sm:px-10">
        <motion.div
          className="mx-auto flex w-full max-w-[76rem] flex-col items-start gap-7 pl-0 text-[#24479f] sm:pl-[34vw] lg:pl-[36rem]"
          initial={{ opacity: 0, y: 42 }}
          animate={
            isReady && isVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 42 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="rounded-full bg-white/80 px-5 py-3 text-sm font-black uppercase leading-none text-[#f36f45] shadow-sm backdrop-blur sm:text-base">
            collection story
          </p>
          <h2 className="max-w-[12ch] text-[clamp(4.25rem,11vw,10rem)] font-black leading-[0.9] text-[#24479f]">
            Fluffy hugs for every wallet
          </h2>
          <div className="flex max-w-[42rem] flex-col gap-5 text-[clamp(1.25rem,2vw,2.1rem)] font-black leading-[1.25] text-[#24479f] sm:flex-row">
            <p>Soft characters, bright traits, and a warm holder-first mint experience.</p>
            <p className="text-[#f36f45]">Built to feel collectible before it ever feels complicated.</p>
          </div>
          <div className="grid w-full max-w-[44rem] grid-cols-1 gap-3 sm:grid-cols-3">
            {statChips.map((chip) => (
              <div
                key={chip.label}
                className="rounded-[1.65rem] bg-white/82 px-5 py-4 shadow-[0_18px_45px_rgba(36,71,159,0.08)] backdrop-blur"
              >
                <p className="text-[clamp(1.4rem,2.4vw,2.4rem)] font-black leading-none text-[#24479f]">
                  {chip.label}
                </p>
                <p className="mt-2 text-sm font-black uppercase leading-none text-[#f36f45]">
                  {chip.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
