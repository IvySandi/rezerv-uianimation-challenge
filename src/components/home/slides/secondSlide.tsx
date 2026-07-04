"use client";

import { motion } from "framer-motion";
import { floatingShapes } from "./slideEffects.config";
import type { SecondSlideProps } from "@/components/home/types/slide.types";

export function secondSlide({
  isReady,
  isVisible,
  shouldReduceMotion,
  title = "Rezerv",
  titleClassName = "text-[clamp(3.25rem,17vw,17.5rem)]",
}: SecondSlideProps) {
  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        isReady && isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.98 }
      }
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!isVisible}
    >
      {floatingShapes.map((shape, index) => (
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
        className="absolute inset-0 flex items-center justify-center px-[clamp(1rem,5vw,3rem)]"
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
      </motion.div>
    </motion.div>
  );
}
