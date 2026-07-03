"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { bannerSlides, socialLinks } from "@/config/banner.config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SocialDock } from "@/components/layout/SocialDock";
import { BeanCollectionLink } from "@/components/layout/BeanCollectionLink";
import { FirstSlide, SecondSlide, StorySlide } from "@/components/home/slides";
import walkingBusinessWomanAnimation from "../../../public/assets/preloader/Walking business woman.json";

const slideScrollHeightVh = 100;
const wheelSwipeThreshold = 80;
const wheelGestureResetMs = 140;
const touchSwipeThreshold = 90;
const slideTransitionMs = 950;
const secondSlideWalkingSpeed = 0.45;

type HeroBannerProps = {
  isReady: boolean;
};

export function HeroBanner({ isReady }: HeroBannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasResetScrollRef = useRef(false);
  const activeSlideIndexRef = useRef(0);
  const isSlideChangingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelGestureTimeoutRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const walkingLottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeSlide = bannerSlides[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isSecondSlide = activeSlideIndex === 1;
  const isThirdSlide = activeSlideIndex >= 2;
  const shouldPlayWalkingAnimation = Boolean(!shouldReduceMotion);
  const shouldAutoplayWalkingAnimation = Boolean(
    shouldPlayWalkingAnimation && !isFirstSlide,
  );

  useEffect(() => {
    const walkingAnimation = walkingLottieRef.current;
    if (!walkingAnimation) return;

    if (!shouldAutoplayWalkingAnimation) {
      walkingAnimation.setSpeed(1);
      walkingAnimation.goToAndStop(0, true);
      return;
    }

    walkingAnimation.setSpeed(isSecondSlide ? secondSlideWalkingSpeed : 1);
    walkingAnimation.play();
  }, [isSecondSlide, shouldAutoplayWalkingAnimation]);

  useEffect(() => {
    if (hasResetScrollRef.current || !isReady) return;

    hasResetScrollRef.current = true;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    setActiveSlideIndex(0);
    activeSlideIndexRef.current = 0;
  }, [isReady]);

  useEffect(() => {
    if (!sectionRef.current || !isReady) return;

    const getSectionTop = () => {
      const section = sectionRef.current;
      if (!section) return 0;

      return window.scrollY + section.getBoundingClientRect().top;
    };

    const isInsideHero = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const sectionTop = getSectionTop();
      const sectionBottom = sectionTop + section.offsetHeight;
      return (
        window.scrollY >= sectionTop - 2 &&
        window.scrollY <= sectionBottom - window.innerHeight + 2
      );
    };

    const goToSlide = (requestedIndex: number) => {
      const nextIndex =
        requestedIndex > bannerSlides.length - 1
          ? 0
          : Math.max(0, requestedIndex);

      if (nextIndex === activeSlideIndexRef.current) return;

      activeSlideIndexRef.current = nextIndex;
      isSlideChangingRef.current = true;
      setActiveSlideIndex(nextIndex);

      window.scrollTo({
        top: getSectionTop() + nextIndex * window.innerHeight,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        isSlideChangingRef.current = false;
      }, shouldReduceMotion ? 50 : slideTransitionMs);
    };

    const getNormalizedWheelDeltaY = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return event.deltaY * 16;
      }

      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * window.innerHeight;
      }

      return event.deltaY;
    };

    const resetWheelGesture = () => {
      wheelDeltaRef.current = 0;

      if (wheelGestureTimeoutRef.current !== null) {
        window.clearTimeout(wheelGestureTimeoutRef.current);
        wheelGestureTimeoutRef.current = null;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isInsideHero()) return;

      event.preventDefault();

      if (isSlideChangingRef.current) {
        return;
      }

      const deltaY = getNormalizedWheelDeltaY(event);

      if (Math.sign(deltaY) !== Math.sign(wheelDeltaRef.current)) {
        wheelDeltaRef.current = 0;
      }

      wheelDeltaRef.current += deltaY;

      if (wheelGestureTimeoutRef.current !== null) {
        window.clearTimeout(wheelGestureTimeoutRef.current);
      }

      wheelGestureTimeoutRef.current = window.setTimeout(
        resetWheelGesture,
        wheelGestureResetMs,
      );

      if (Math.abs(wheelDeltaRef.current) < wheelSwipeThreshold) {
        return;
      }

      const direction = Math.sign(wheelDeltaRef.current);
      resetWheelGesture();
      goToSlide(activeSlideIndexRef.current + direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isInsideHero()) return;

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isInsideHero()) return;

      event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;
      touchStartYRef.current = null;

      if (touchStartY === null || !isInsideHero() || isSlideChangingRef.current) {
        return;
      }

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const swipeDistance = touchStartY - touchEndY;

      if (Math.abs(swipeDistance) < touchSwipeThreshold) return;

      goToSlide(activeSlideIndexRef.current + Math.sign(swipeDistance));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInsideHero() || isSlideChangingRef.current) return;

      const nextKeys = ["ArrowDown", "PageDown", " "];
      const previousKeys = ["ArrowUp", "PageUp"];

      if (nextKeys.includes(event.key)) {
        event.preventDefault();
        goToSlide(activeSlideIndexRef.current + 1);
      }

      if (previousKeys.includes(event.key)) {
        event.preventDefault();
        goToSlide(activeSlideIndexRef.current - 1);
      }
    };

    const handleResize = () => {
      window.scrollTo({
        top: getSectionTop() + activeSlideIndexRef.current * window.innerHeight,
        behavior: "auto",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      resetWheelGesture();
    };
  }, [isReady, shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative bg-[#fffdf8] text-[#24479f]"
      style={{ height: `${bannerSlides.length * slideScrollHeightVh}vh` }}
      aria-label="Rezerv animated banner"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: activeSlide.background }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <SiteHeader brandName="Rezerv" />
        <SocialDock links={socialLinks} />

        <FirstSlide
          activeSlide={activeSlide}
          isReady={isReady}
          isVisible={activeSlideIndex === 0}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
        <motion.div
          className="pointer-events-none absolute z-[999] overflow-visible select-none"
          initial={false}
          animate={{
            left: "32vw",
            top: "38vh",
            width: "46vw",
            height: "108vh",
            minWidth: "30rem",
            minHeight: "44rem",
            maxWidth: "none",
            rotate: -7,
            opacity: isReady && isFirstSlide ? 1 : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.35,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "center center" }}
          draggable={false}
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full"
            animate={
              isReady && isFirstSlide && !shouldReduceMotion
                ? { y: [0, -16, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 2.2,
              repeat: isReady && isFirstSlide && !shouldReduceMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Lottie
              animationData={walkingBusinessWomanAnimation}
              aria-hidden="true"
              autoplay={false}
              className="h-full w-full"
              loop={false}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid meet",
              }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute z-30 overflow-hidden select-none will-change-transform"
          initial={false}
          animate={{
            left: isSecondSlide ? "50vw" : "8vw",
            top: isSecondSlide ? "63vh" : "36vh",
            width: isSecondSlide ? "42vw" : "36vw",
            height: isSecondSlide ? "42vw" : "82vh",
            minWidth: isSecondSlide ? "26rem" : "20rem",
            minHeight: isSecondSlide ? "26rem" : "36rem",
            maxWidth: isFirstSlide ? "none" : isSecondSlide ? "42rem" : "30rem",
            x: isThirdSlide ? "0%" : "-50%",
            y: isThirdSlide ? "0%" : "-50%",
            rotate: isSecondSlide ? -90 : -3,
            opacity: isReady && !isFirstSlide ? 1 : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "center center" }}
          draggable={false}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              scale: isFirstSlide ? 1 : isSecondSlide ? 1.04 : 1.02,
              scaleY: 1,
              y: 0,
              rotate: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "center center" }}
          >
            <div className="h-full w-full">
              <Lottie
                animationData={walkingBusinessWomanAnimation}
                aria-hidden="true"
                autoplay={shouldAutoplayWalkingAnimation}
                className="h-full w-full"
                lottieRef={walkingLottieRef}
                loop={shouldAutoplayWalkingAnimation}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid meet",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
        <SecondSlide
          isReady={isReady}
          isVisible={activeSlideIndex === 1}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          titleClassName="text-[clamp(6rem,20vw,22rem)]"
          showCharacter={false}
        />
        <StorySlide
          isReady={isReady}
          isVisible={activeSlideIndex === 2}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 bg-white"
          initial={{ opacity: 0.1 }}
          animate={isReady ? { opacity: activeSlide.dim } : { opacity: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <BeanCollectionLink isReady={isReady} />
      </div>
    </section>
  );
}
