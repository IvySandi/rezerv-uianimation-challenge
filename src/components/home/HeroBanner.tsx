"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bannerSlides, socialLinks } from "@/config/banner.config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SocialDock } from "@/components/layout/SocialDock";
import { BeanCollectionLink } from "@/components/layout/BeanCollectionLink";
import {
  firstSlide as FirstSlide,
  secondSlide as SecondSlide,
  thirdSlide as ThirdSlide,
} from "@/components/home/slides";
import { HeroCharacter } from "@/components/home/HeroCharacter";

const slideScrollHeightVh = 100;
const wheelSwipeThreshold = 80;
const wheelGestureResetMs = 140;
const touchSwipeThreshold = 90;
const slideTransitionMs = 950;
const returnToFirstTransitionMs = 1200;

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
  const slideTransitionIdRef = useRef(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeSlide = bannerSlides[activeSlideIndex];

  useEffect(() => {
    if (hasResetScrollRef.current || !isReady) return;

    hasResetScrollRef.current = true;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    setActiveSlideIndex(0);
    setPreviousSlideIndex(0);
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

    const syncSlideWithScroll = () => {
      if (isSlideChangingRef.current) return;
      if (!isInsideHero()) return;

      const nextIndex = Math.min(
        bannerSlides.length - 1,
        Math.max(
          0,
          Math.round((window.scrollY - getSectionTop()) / window.innerHeight),
        ),
      );

      if (nextIndex === activeSlideIndexRef.current) return;

      const currentIndex = activeSlideIndexRef.current;
      const isReturningToFirst = currentIndex > 0 && nextIndex === 0;
      const transitionId = slideTransitionIdRef.current + 1;

      slideTransitionIdRef.current = transitionId;
      setPreviousSlideIndex(currentIndex);
      activeSlideIndexRef.current = nextIndex;
      setActiveSlideIndex(nextIndex);

      window.setTimeout(
        () => {
          if (transitionId !== slideTransitionIdRef.current) return;
          setPreviousSlideIndex(nextIndex);
        },
        shouldReduceMotion ? 50 : isReturningToFirst ? returnToFirstTransitionMs : 50,
      );
    };

    const goToSlide = (requestedIndex: number) => {
      const nextIndex =
        requestedIndex > bannerSlides.length - 1
          ? 0
          : Math.max(0, requestedIndex);

      if (nextIndex === activeSlideIndexRef.current) return;

      const currentIndex = activeSlideIndexRef.current;
      const isReturningToFirst = currentIndex > 0 && nextIndex === 0;
      const transitionId = slideTransitionIdRef.current + 1;

      slideTransitionIdRef.current = transitionId;
      setPreviousSlideIndex(currentIndex);
      activeSlideIndexRef.current = nextIndex;
      isSlideChangingRef.current = true;
      setActiveSlideIndex(nextIndex);

      window.scrollTo({
        top: getSectionTop() + nextIndex * window.innerHeight,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        if (transitionId !== slideTransitionIdRef.current) return;

        isSlideChangingRef.current = false;
        setPreviousSlideIndex(nextIndex);
      }, shouldReduceMotion ? 50 : isReturningToFirst ? returnToFirstTransitionMs : slideTransitionMs);
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
    window.addEventListener("scroll", syncSlideWithScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncSlideWithScroll);
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
        <HeroCharacter
          activeSlideIndex={activeSlideIndex}
          previousSlideIndex={previousSlideIndex}
          isReady={isReady}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
        <SecondSlide
          isReady={isReady}
          isVisible={activeSlideIndex === 1}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
          titleClassName="text-[clamp(3.5rem,19vw,22rem)]"
        />
        <ThirdSlide
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
