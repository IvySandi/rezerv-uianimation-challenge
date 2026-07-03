"use client";

import { motion } from "framer-motion";
import { brandIntroShapes } from "./BrandIntroSlide.config";
import type { BrandIntroSlideProps } from "./BrandIntroSlide.types";

export function BrandIntroSlide({
  isReady,
  isVisible,
  shouldReduceMotion,
  title = "Rezerv",
  characterAlt = "Chillin character",
  characterClassName = "w-[min(58vw,44rem)]",
  characterRestY = "-22%",
  characterExitY = "18%",
  characterRotate = 86,
  titleClassName = "text-[clamp(4.75rem,17vw,17.5rem)]",
  showCharacter = true,
}: BrandIntroSlideProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        isReady && isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.98 }
      }
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!isVisible}
    >
      {brandIntroShapes.map((shape, index) => (
        <motion.div
          key={`${shape.className}-${index}`}
          className={`pointer-events-none absolute top-full opacity-85 blur-[0.5px] ${shape.className}`}
          animate={
            shouldReduceMotion
              ? { opacity: 0.85, y: "0vh" }
              : {
                  x: shape.x,
                  y: ["20vh", "-145vh"],
                  rotate: shape.rotate,
                }
          }
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        initial={{ y: "16vh", scale: 0.9 }}
        animate={
          isReady && isVisible
            ? { y: "0vh", scale: 1 }
            : { y: "16vh", scale: 0.9 }
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className={`z-10 text-center font-black leading-none text-[#24479f] ${titleClassName}`}
          initial={{ opacity: 0, y: 46, scale: 0.9 }}
          animate={
            isReady && isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 46, scale: 0.9 }
          }
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        {showCharacter ? (
          <motion.img
            src="/assets/transhumans/Chillin.svg"
            alt={characterAlt}
            draggable={false}
            className={`pointer-events-none absolute left-1/2 top-1/2 z-20 select-none ${characterClassName}`}
            initial={{ opacity: 0, rotate: characterRotate, scale: 0.68, x: "-50%", y: characterRestY }}
            animate={
              isReady && isVisible
                ? {
                    opacity: 1,
                    rotate: shouldReduceMotion
                      ? characterRotate
                      : [characterRotate, characterRotate + 2.5, characterRotate - 1.5, characterRotate],
                    scale: 1,
                    x: "-50%",
                    y: shouldReduceMotion
                      ? characterRestY
                      : [characterRestY, `calc(${characterRestY} - 3%)`, characterRestY],
                  }
                : { opacity: 0, rotate: characterRotate, scale: 0.68, x: "-50%", y: characterExitY }
            }
            transition={{
              opacity: { duration: 0.75, ease: "easeOut" },
              scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 4.2, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" },
              y: { duration: 4.2, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" },
            }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
