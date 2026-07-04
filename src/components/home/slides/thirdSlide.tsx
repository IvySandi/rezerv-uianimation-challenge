"use client";

import { motion } from "framer-motion";
import { floatingShapes } from "./slideEffects.config";
import styles from "@/components/home/styles/thirdSlide.module.css";
import type { ThirdSlideProps } from "@/components/home/types/slide.types";

const driftingBlobTracks = [
  "top-[7vh]",
  "top-[24vh]",
  "top-[44vh]",
  "top-[63vh]",
  "top-[77vh]",
  "top-[13vh]",
];

const loremLines = [
  "Lorem ipsum dolor sit amet",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor",
];

const clouds = [
  {
    className:
      "top-[12vh] h-[clamp(3.75rem,10vw,5rem)] w-[clamp(9rem,24vw,12rem)] rotate-[-7deg]",
    delay: 0,
  },
  {
    className:
      "top-[15vh] h-[clamp(4.25rem,12vw,6rem)] w-[clamp(10.5rem,30vw,15rem)] rotate-[5deg]",
    delay: -5.5,
  },
  {
    className:
      "bottom-[13vh] h-[clamp(3.75rem,10vw,5rem)] w-[clamp(9.5rem,26vw,13rem)] rotate-[4deg]",
    delay: -10.5,
  },
  {
    className:
      "bottom-[30vh] h-[clamp(3.25rem,8vw,4rem)] w-[clamp(8rem,22vw,11rem)] rotate-[-5deg]",
    delay: -15,
  },
];

export function thirdSlide({
  isReady,
  isVisible,
  shouldReduceMotion,
}: ThirdSlideProps) {
  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isReady && isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden={!isVisible}
    >
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={`third-blob-${shape.className}-${index}`}
          className={`pointer-events-none absolute opacity-75 blur-[0.5px] ${driftingBlobTracks[index]} ${shape.className}`}
          initial={{ x: "120vw", rotate: shape.rotate[0] }}
          animate={
            shouldReduceMotion
              ? { x: 0, rotate: shape.rotate[0] }
              : {
                  x: ["120vw", "-145vw"],
                  rotate: shape.rotate,
                }
          }
          transition={{
            duration: 18 + index * 1.75,
            delay: -index * 3.2,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        />
      ))}

      {clouds.map((cloud, index) => (
        <motion.div
          key={`${cloud.className}-${index}`}
          className={`pointer-events-auto absolute z-30 ${cloud.className}`}
          initial={{ x: "118vw" }}
          animate={
            shouldReduceMotion
              ? { x: 0 }
              : {
                  x: ["118vw", "-135vw"],
                }
          }
          transition={{
            duration: 22 + index * 2.2,
            delay: cloud.delay,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className={`${styles.jellyCloud} absolute inset-0 cursor-pointer overflow-hidden rounded-full`}
            animate={
              shouldReduceMotion
                ? { y: 0 }
                : {
                    y: [0, -10, 0, 6, 0],
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -7, 6, -4, 3, 0],
                    rotate: [0, -4, 4, -3, 2, 0],
                    scale: [1, 1.08, 0.96, 1.05, 0.99, 1],
                    transition: {
                      duration: 0.58,
                      ease: "easeInOut",
                    },
                  }
            }
            transition={{
              duration: 7.5 + index * 0.8,
              delay: cloud.delay,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className={`${styles.cloudPuff} absolute bottom-0 left-[10%] h-[48%] w-[82%] rounded-[999px] bg-white/90 shadow-[0_18px_40px_rgba(36,71,159,0.08)]`}
            />
            <span
              className={`${styles.cloudPuff} absolute bottom-[18%] left-[4%] h-[54%] w-[36%] rounded-[999px] bg-white/95`}
            />
            <span
              className={`${styles.cloudPuff} absolute bottom-[30%] left-[29%] h-[68%] w-[42%] rounded-[999px] bg-white`}
            />
            <span
              className={`${styles.cloudPuff} absolute right-[5%] bottom-[17%] h-[56%] w-[40%] rounded-[999px] bg-white/95`}
            />
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute inset-y-0 right-0 z-40 flex w-full items-start justify-center px-[clamp(0.75rem,4vw,2.5rem)] pt-[clamp(5rem,12vh,6.5rem)] xl:z-10 xl:items-center xl:justify-end xl:pt-0">
        <motion.div
          className="flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center gap-[clamp(0.62rem,2.2vh,0.9rem)] text-[#24479f] xl:w-[min(62vw,68rem)] xl:items-start xl:gap-[clamp(1.35rem,5vh,5rem)] xl:pr-[3vw]"
          initial={{ opacity: 0, x: 48 }}
          animate={
            isReady && isVisible
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 48 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {loremLines.map((line, lineIndex) => (
            <p
              key={line}
              className="flex max-w-full flex-nowrap justify-center text-[clamp(0.68rem,2vw,0.95rem)] font-black leading-none tracking-[0.08em] whitespace-nowrap xl:justify-start xl:text-[clamp(0.58rem,1.95vw,2.45rem)] xl:tracking-[clamp(0.08em,0.78vw,0.32em)]"
            >
              {Array.from(line).map((letter, letterIndex) => (
                <motion.span
                  key={`${line}-${letter}-${letterIndex}`}
                  className={
                    letter === " " ? "inline-block w-[0.9em]" : "inline-block"
                  }
                  animate={
                    shouldReduceMotion
                      ? { y: 0 }
                      : {
                          y: [0, -10, 0, 7, 0],
                        }
                  }
                  transition={{
                    duration: 2.35,
                    delay: lineIndex * 0.22 + letterIndex * 0.04,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {letter === " " ? "\u00a0" : letter}
                </motion.span>
              ))}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
