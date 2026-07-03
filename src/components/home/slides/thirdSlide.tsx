"use client";

import { motion } from "framer-motion";
import { secondSlideShapes } from "./secondSlide.config";

type StorySlideProps = {
  isReady: boolean;
  isVisible: boolean;
  shouldReduceMotion: boolean;
};

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
    className: "top-[12vh] w-48 h-20 rotate-[-7deg]",
    delay: 0,
  },
  {
    className: "top-[15vh] w-60 h-24 rotate-[5deg]",
    delay: -5.5,
  },
  {
    className: "bottom-[13vh] w-52 h-20 rotate-[4deg]",
    delay: -10.5,
  },
  {
    className: "bottom-[30vh] w-44 h-16 rotate-[-5deg]",
    delay: -15,
  },
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
      {secondSlideShapes.map((shape, index) => (
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
            className="jelly-cloud absolute inset-0 cursor-pointer overflow-hidden rounded-full"
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
            <span className="cloud-puff absolute bottom-0 left-[10%] h-[48%] w-[82%] rounded-[999px] bg-white/90 shadow-[0_18px_40px_rgba(36,71,159,0.08)]" />
            <span className="cloud-puff absolute bottom-[18%] left-[4%] h-[54%] w-[36%] rounded-[999px] bg-white/95" />
            <span className="cloud-puff absolute bottom-[30%] left-[29%] h-[68%] w-[42%] rounded-[999px] bg-white" />
            <span className="cloud-puff absolute right-[5%] bottom-[17%] h-[56%] w-[40%] rounded-[999px] bg-white/95" />
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute inset-y-0 right-0 z-10 flex w-full items-center justify-end px-6 sm:px-10">
        <motion.div
          className="flex w-[min(58vw,68rem)] flex-col items-start gap-[clamp(2.25rem,6vh,5rem)] pr-[3vw] text-[#24479f]"
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
              className="flex max-w-full flex-nowrap text-[clamp(1.15rem,1.95vw,2.45rem)] font-black leading-none tracking-[0.32em] whitespace-nowrap"
            >
              {Array.from(line).map((letter, letterIndex) => (
                <motion.span
                  key={`${line}-${letter}-${letterIndex}`}
                  className={letter === " " ? "inline-block w-[0.9em]" : "inline-block"}
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
      <style jsx global>{`
        .jelly-cloud:hover .cloud-puff {
          animation: cloud-jelly 0.58s ease-in-out;
        }

        .jelly-cloud:hover .cloud-puff:nth-child(2) {
          animation-delay: 0.04s;
        }

        .jelly-cloud:hover .cloud-puff:nth-child(3) {
          animation-delay: 0.08s;
        }

        .jelly-cloud:hover .cloud-puff:nth-child(4) {
          animation-delay: 0.12s;
        }

        @keyframes cloud-jelly {
          0%,
          100% {
            transform: scale(1, 1) translateY(0);
          }

          20% {
            transform: scale(1.18, 0.86) translateY(5%);
          }

          42% {
            transform: scale(0.9, 1.14) translateY(-7%);
          }

          64% {
            transform: scale(1.08, 0.94) translateY(3%);
          }

          82% {
            transform: scale(0.98, 1.04) translateY(-2%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jelly-cloud:hover .cloud-puff {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
