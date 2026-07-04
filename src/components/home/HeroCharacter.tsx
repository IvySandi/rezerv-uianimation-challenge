"use client";

import { motion } from "framer-motion";
import { WalkingAvatar } from "@/components/home/WalkingAvatar";
import type { HeroCharacterProps } from "@/components/home/types/heroCharacter.types";

export function HeroCharacter({
  activeSlideIndex,
  previousSlideIndex,
  isReady,
  shouldReduceMotion,
}: HeroCharacterProps) {
  const isFirstSlide = activeSlideIndex === 0;
  const isSecondSlide = activeSlideIndex === 1;
  const isReturningToFirst =
    isReady && previousSlideIndex > 0 && isFirstSlide;
  const shouldBobCharacter = isReady && isFirstSlide && !shouldReduceMotion;
  const shouldWalkCharacter = isReady && !isFirstSlide && !shouldReduceMotion;
  const shouldPlaceCharacter = isReturningToFirst && !shouldReduceMotion;

  return (
    <motion.div
      className={`pointer-events-none absolute z-30 select-none will-change-transform ${
        isFirstSlide ? "overflow-visible" : "overflow-hidden"
      }`}
      initial={false}
      animate={{
        left: isFirstSlide
          ? "48vw"
          : isSecondSlide
            ? "50vw"
            : "clamp(-1.5rem,5vw,4rem)",
        top: isFirstSlide
          ? "78vh"
          : isSecondSlide
            ? "63vh"
            : "clamp(7rem,20vh,12rem)",
        width: "clamp(12rem,76vmin,42rem)",
        height: "clamp(16.35rem,103.55vmin,57.225rem)",
        minWidth: "0rem",
        minHeight: "0rem",
        maxWidth: "none",
        maxHeight: "none",
        x: isFirstSlide || isSecondSlide ? "-50%" : "0%",
        y: isFirstSlide || isSecondSlide ? "-50%" : "0%",
        rotate: isFirstSlide ? -7 : isSecondSlide ? -90 : -3,
        scale: isFirstSlide ? 1 : isSecondSlide ? 0.66 : 0.82,
        opacity: isReady ? 1 : 0,
      }}
      transition={{
        duration: shouldReduceMotion
          ? 0.01
          : shouldPlaceCharacter
            ? 1.2
            : isFirstSlide
              ? 0.01
              : 0.9,
        ease: shouldPlaceCharacter ? [0.2, 0.9, 0.2, 1] : [0.16, 1, 0.3, 1],
      }}
      style={{ transformOrigin: "center center" }}
      draggable={false}
      aria-hidden="true"
    >
      <motion.div
        key={`avatar-motion-${activeSlideIndex}`}
        className="absolute inset-0"
        initial={false}
        animate={{
          scale: shouldPlaceCharacter ? [1, 1.08, 1.03, 1] : 1,
          scaleY: 1,
          y: shouldPlaceCharacter
            ? [0, -64, -42, 0]
            : shouldBobCharacter
              ? [0, -14, 0]
              : 0,
          rotate: shouldPlaceCharacter ? [0, 3, -2, 0] : 0,
        }}
        transition={{
          scale: {
            duration: shouldPlaceCharacter ? 1.2 : shouldReduceMotion ? 0.01 : 0.9,
            ease: shouldPlaceCharacter
              ? [0.2, 0.9, 0.2, 1]
              : [0.16, 1, 0.3, 1],
          },
          scaleY: {
            duration: shouldReduceMotion ? 0.01 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          },
          rotate: {
            duration: shouldPlaceCharacter ? 1.2 : shouldReduceMotion ? 0.01 : 0.9,
            ease: shouldPlaceCharacter
              ? [0.2, 0.9, 0.2, 1]
              : [0.16, 1, 0.3, 1],
          },
          y: shouldPlaceCharacter
            ? {
                duration: 1.2,
                times: [0, 0.36, 0.72, 1],
                ease: [0.2, 0.9, 0.2, 1],
              }
            : shouldBobCharacter
            ? {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: shouldReduceMotion ? 0.01 : 0.2,
                ease: "easeOut",
              },
        }}
        style={{ transformOrigin: "center center" }}
      >
        <WalkingAvatar
          key={activeSlideIndex}
          isBobbing={shouldBobCharacter}
          isWalking={shouldWalkCharacter}
          shouldReduceMotion={shouldReduceMotion}
          walkDuration={isSecondSlide ? "1.85s" : "0.95s"}
        />
      </motion.div>
    </motion.div>
  );
}
