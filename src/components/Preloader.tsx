"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import walkingBusinessWomanAnimation from "../../public/assets/preloader/Walking business woman.json";

export type PreloaderProps = {
  label?: string;
  loadingText?: string;
  minDuration?: number;
  onComplete?: () => void;
};

export function Preloader({
  label = "Loading",
  loadingText = "LOADING..",
  minDuration = 2200,
  onComplete,
}: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const completionCalled = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const hideTimer = window.setTimeout(
      () => setIsVisible(false),
      shouldReduceMotion ? 350 : minDuration,
    );

    return () => window.clearTimeout(hideTimer);
  }, [isVisible, minDuration, shouldReduceMotion]);

  const handleExitComplete = () => {
    if (completionCalled.current) return;

    completionCalled.current = true;
    onComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible ? (
        <motion.div
          aria-label={label}
          aria-live="polite"
          data-loaded="false"
          className="fixed inset-0 z-[999] flex select-none items-center justify-center bg-white opacity-100"
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className="pointer-events-none h-[clamp(170px,20vh,220px)] w-[clamp(112px,13.5vw,148px)]"
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: [0, -6, 0],
                    }
              }
              transition={{
                y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Lottie
                animationData={walkingBusinessWomanAnimation}
                aria-hidden="true"
                autoplay={!shouldReduceMotion}
                className="h-full w-full"
                loop={!shouldReduceMotion}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            </motion.div>

            <div
              aria-hidden="true"
              className="mt-5 flex items-center justify-center gap-[0.5em] text-[clamp(1rem,1.45vw,1.5rem)] font-black uppercase leading-none text-[#2d4da6]"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                letterSpacing: "0.28em",
              }}
            >
              {Array.from(loadingText).map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="inline-block min-w-[0.35em]"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: [0.45, 1, 0.45],
                          y: [0, -3, 0],
                        }
                  }
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.07,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
          <span className="sr-only">{label}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
