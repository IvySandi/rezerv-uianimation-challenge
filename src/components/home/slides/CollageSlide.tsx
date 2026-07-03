"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { bannerIcons } from "@/config/banner.config";
import type { BannerSlide } from "@/types/banner.type";

type CollageSlideProps = {
  activeSlide: BannerSlide;
  isReady: boolean;
  isVisible: boolean;
  shouldReduceMotion: boolean;
};

const upperBodyCropPositions = [
  "50% 8%",
  "55% 6%",
  "45% 7%",
  "60% 8%",
  "50% 13%",
  "42% 10%",
  "62% 11%",
  "53% 7%",
  "45% 14%",
];

const focusedTransitionIconId = "chillin-9";

export function CollageSlide({
  activeSlide,
  isReady,
  isVisible,
  shouldReduceMotion,
}: CollageSlideProps) {
  const iconAnimation = useMemo(
    () =>
      bannerIcons
        .filter((icon) => icon.id !== focusedTransitionIconId)
        .map((icon, index) => ({
          ...icon,
          cropPosition:
            upperBodyCropPositions[index % upperBodyCropPositions.length],
          baseRotate: icon.rotate + activeSlide.rotate,
          rotateKeyframes: shouldReduceMotion
            ? icon.rotate + activeSlide.rotate
            : [
                icon.rotate + activeSlide.rotate,
                icon.rotate + activeSlide.rotate + 2.2,
                icon.rotate + activeSlide.rotate - 1.4,
                icon.rotate + activeSlide.rotate,
              ],
          xKeyframes: shouldReduceMotion
            ? 0
            : [0, icon.floatX * 0.45, icon.floatX * -0.25, 0],
          yKeyframes: shouldReduceMotion
            ? 0
            : [0, -icon.floatY, 0, icon.floatY * 0.42, 0],
        })),
    [activeSlide.rotate, shouldReduceMotion],
  );

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: activeSlide.scale,
        x: activeSlide.x,
        y: activeSlide.y,
        rotate: activeSlide.rotate,
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {iconAnimation.map((icon) => (
        <motion.div
          key={icon.id}
          className={`pointer-events-none absolute overflow-hidden select-none ${icon.className}`}
          initial={{ opacity: 0, scale: 0.9, y: 46, rotate: icon.baseRotate }}
          animate={
            isReady
              ? {
                  opacity: isVisible ? 1 : 0,
                  scale: 1,
                  rotate: icon.rotateKeyframes,
                  y: icon.yKeyframes,
                  x: icon.xKeyframes,
                }
              : { opacity: 0, scale: 0.9, y: 56, rotate: icon.baseRotate }
          }
          transition={{
            opacity: { delay: icon.delay, duration: 0.65, ease: "easeOut" },
            scale: { delay: icon.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            rotate: {
              delay: icon.delay,
              duration: icon.duration + 0.4,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
            y: {
              delay: icon.delay,
              duration: icon.duration,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: ["easeOut", "easeIn", "easeOut", "easeIn"],
            },
            x: {
              delay: icon.delay,
              duration: icon.duration + 0.35,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            sizes="40vw"
            draggable={false}
            className="h-full w-full scale-[2.25] object-cover"
            style={{
              objectPosition: icon.cropPosition,
              transformOrigin: icon.cropPosition,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
