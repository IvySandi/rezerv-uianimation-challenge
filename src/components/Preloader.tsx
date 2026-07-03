"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
          className="fixed inset-0 z-[999] flex select-none items-center justify-center bg-[#49befe] opacity-100"
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="flex -translate-y-[6vh] flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className="preloader-girl-stage pointer-events-none"
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: [-8, 8, -8],
                    }
              }
              transition={{
                x: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="walking-girl" aria-hidden="true">
                <div className="girl-hair-back" />
                <div className="girl-head">
                  <div className="girl-hair-front" />
                  <div className="girl-eye girl-eye-left" />
                  <div className="girl-eye girl-eye-right" />
                  <div className="girl-blush girl-blush-left" />
                  <div className="girl-blush girl-blush-right" />
                </div>
                <div className="girl-neck" />
                <div className="girl-body">
                  <div className="girl-arm girl-arm-left" />
                  <div className="girl-arm girl-arm-right" />
                  <div className="girl-dress" />
                </div>
                <div className="girl-leg girl-leg-left" />
                <div className="girl-leg girl-leg-right" />
              </div>
              <div className="girl-shadow" aria-hidden="true" />
            </motion.div>

            <div
              aria-hidden="true"
              className="mt-6 flex items-center justify-center gap-[0.42em] text-[clamp(1.4rem,3.3vw,2.15rem)] font-black uppercase leading-none text-white"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                letterSpacing: "0.18em",
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
          <style jsx>{`
            .preloader-girl-stage {
              position: relative;
              width: min(54vw, 230px);
              height: 220px;
            }

            .walking-girl {
              position: absolute;
              left: 50%;
              bottom: 30px;
              width: 128px;
              height: 185px;
              transform: translateX(-50%);
              transform-origin: center bottom;
              animation: girl-step-bounce 0.8s infinite ease-in-out;
            }

            .girl-hair-back {
              position: absolute;
              top: 2px;
              left: 32px;
              z-index: 1;
              width: 64px;
              height: 78px;
              border-radius: 34px 34px 26px 26px;
              background: #2b1c2f;
            }

            .girl-head {
              position: absolute;
              top: 16px;
              left: 38px;
              z-index: 3;
              width: 52px;
              height: 56px;
              border-radius: 46% 46% 50% 50%;
              background: #ffd1b3;
              animation: girl-head-nod 1.2s infinite ease-in-out;
            }

            .girl-hair-front {
              position: absolute;
              top: -8px;
              left: -4px;
              width: 60px;
              height: 32px;
              border-radius: 36px 36px 16px 16px;
              background: #2b1c2f;
            }

            .girl-hair-front::before {
              position: absolute;
              top: 12px;
              left: 4px;
              width: 20px;
              height: 28px;
              border-radius: 0 0 18px 18px;
              background: #2b1c2f;
              content: "";
              transform: rotate(16deg);
            }

            .girl-eye {
              position: absolute;
              top: 30px;
              z-index: 4;
              width: 6px;
              height: 7px;
              border-radius: 50%;
              background: #1f2937;
              transform-origin: bottom center;
              animation: girl-blink 2.8s infinite;
            }

            .girl-eye-left {
              left: 14px;
            }

            .girl-eye-right {
              right: 14px;
            }

            .girl-blush {
              position: absolute;
              top: 39px;
              z-index: 4;
              width: 10px;
              height: 7px;
              border-radius: 50%;
              background: rgba(238, 107, 122, 0.5);
            }

            .girl-blush-left {
              left: 6px;
            }

            .girl-blush-right {
              right: 6px;
            }

            .girl-neck {
              position: absolute;
              top: 66px;
              left: 56px;
              z-index: 2;
              width: 16px;
              height: 18px;
              border-radius: 0 0 8px 8px;
              background: #f2b18f;
            }

            .girl-body {
              position: absolute;
              top: 76px;
              left: 41px;
              z-index: 3;
              width: 46px;
              height: 70px;
            }

            .girl-dress {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 4;
              width: 46px;
              height: 68px;
              border-radius: 16px 16px 10px 10px;
              background: #e94f7a;
              clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
            }

            .girl-dress::after {
              position: absolute;
              right: 8px;
              bottom: 8px;
              width: 10px;
              height: 34px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.24);
              content: "";
              transform: rotate(-12deg);
            }

            .girl-arm {
              position: absolute;
              top: 6px;
              z-index: 2;
              width: 12px;
              height: 54px;
              border-radius: 999px;
              background: #ffd1b3;
              transform-origin: top center;
              animation: girl-arm-swing 1s infinite ease-in-out;
            }

            .girl-arm::after {
              position: absolute;
              left: 1px;
              bottom: -5px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #ffd1b3;
              content: "";
            }

            .girl-arm-left {
              left: -8px;
              transform: rotate(-24deg);
            }

            .girl-arm-right {
              right: -8px;
              transform: rotate(24deg);
              animation-delay: 0.5s;
            }

            .girl-leg {
              position: absolute;
              top: 136px;
              z-index: 2;
              width: 12px;
              height: 44px;
              border-radius: 999px;
              background: #3b4252;
              transform-origin: top center;
              animation: girl-walk 1s infinite ease-in-out;
            }

            .girl-leg::after {
              position: absolute;
              left: -8px;
              bottom: -5px;
              width: 28px;
              height: 9px;
              border-radius: 999px;
              background: #ffffff;
              content: "";
            }

            .girl-leg-left {
              left: 52px;
            }

            .girl-leg-right {
              left: 68px;
              animation-delay: 0.5s;
            }

            .girl-shadow {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 24px;
              z-index: 0;
              width: 110px;
              height: 16px;
              margin: auto;
              border-radius: 20px;
              background: #39a4f0;
              animation: girl-shadow-pulse 1s infinite ease-in-out;
            }

            @keyframes girl-step-bounce {
              50% {
                bottom: 38px;
              }
            }

            @keyframes girl-head-nod {
              50% {
                transform: rotate(-2deg) translateY(2px);
              }
            }

            @keyframes girl-arm-swing {
              0%,
              100% {
                transform: rotate(-24deg);
              }

              50% {
                transform: rotate(24deg);
              }
            }

            @keyframes girl-walk {
              0%,
              100% {
                transform: rotate(-24deg);
              }

              35% {
                transform: translateY(10px) rotate(8deg);
              }

              70% {
                transform: translateX(-18px) rotate(28deg);
              }
            }

            @keyframes girl-blink {
              30% {
                top: 34px;
                height: 1px;
              }
            }

            @keyframes girl-shadow-pulse {
              50% {
                transform: scaleX(1.16);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .walking-girl,
              .girl-head,
              .girl-eye,
              .girl-arm,
              .girl-leg,
              .girl-shadow {
                animation: none;
              }
            }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
