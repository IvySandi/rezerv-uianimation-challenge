"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { bannerSlides, socialLinks } from "@/config/banner.config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SocialDock } from "@/components/layout/SocialDock";
import { BeanCollectionLink } from "@/components/layout/BeanCollectionLink";
import { BrandIntroSlide, CollageSlide, StorySlide } from "@/components/home/slides";

const slideScrollHeightVh = 100;
const wheelSwipeThreshold = 80;
const touchSwipeThreshold = 90;
const slideTransitionMs = 950;

type HeroBannerProps = {
  isReady: boolean;
};

export function HeroBanner({ isReady }: HeroBannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasResetScrollRef = useRef(false);
  const activeSlideIndexRef = useRef(0);
  const isSlideChangingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeSlide = bannerSlides[activeSlideIndex];
  const isSecondSlide = activeSlideIndex === 1;
  const isThirdSlide = activeSlideIndex >= 2;
  const isSecondSlideOrBeyond = activeSlideIndex >= 1;

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
      const nextIndex = Math.max(
        0,
        Math.min(bannerSlides.length - 1, requestedIndex),
      );

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

    const handleWheel = (event: WheelEvent) => {
      if (!isInsideHero()) return;

      event.preventDefault();

      if (
        isSlideChangingRef.current ||
        Math.abs(event.deltaY) < wheelSwipeThreshold
      ) {
        return;
      }

      goToSlide(activeSlideIndexRef.current + Math.sign(event.deltaY));
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

        <CollageSlide
          activeSlide={activeSlide}
          isReady={isReady}
          isVisible={activeSlideIndex === 0}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
        <motion.div
          className="pointer-events-none absolute z-30 overflow-hidden select-none will-change-transform"
          initial={false}
          animate={{
            left: isThirdSlide ? "24vw" : isSecondSlide ? "50vw" : "32vw",
            top: isThirdSlide ? "58vh" : isSecondSlide ? "62vh" : "-8vh",
            width: isThirdSlide ? "42vw" : isSecondSlide ? "38vw" : "37vw",
            height: isThirdSlide ? "42vw" : isSecondSlide ? "38vw" : "90vh",
            minWidth: isThirdSlide ? "25rem" : isSecondSlide ? "28rem" : "23rem",
            minHeight: isThirdSlide ? "25rem" : isSecondSlide ? "28rem" : "35rem",
            maxWidth: isThirdSlide ? "34rem" : isSecondSlide ? "36rem" : "none",
            x: isSecondSlideOrBeyond ? "-50%" : "0%",
            y: isSecondSlideOrBeyond ? "-50%" : "0%",
            rotate: isThirdSlide ? -4 : isSecondSlide ? 90 : -7,
            opacity: isReady ? 1 : 0,
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
              scale: isThirdSlide ? 0.92 : isSecondSlide ? 1 : 2.25,
              scaleY: isThirdSlide ? 1 : isSecondSlide ? -1 : 1,
              y: isThirdSlide && !shouldReduceMotion ? [0, -10, 0, -6, 0] : 0,
              rotate: isThirdSlide && !shouldReduceMotion ? [0, -2, 2, -1, 0] : 0,
            }}
            transition={{
              duration: isThirdSlide && !shouldReduceMotion ? 1.2 : shouldReduceMotion ? 0.01 : 0.9,
              repeat: isThirdSlide && !shouldReduceMotion ? Infinity : 0,
              ease: isThirdSlide && !shouldReduceMotion ? "easeInOut" : [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: isSecondSlideOrBeyond ? "center" : "50% 8%" }}
          >
            <Image
              src="/assets/transhumans/Chillin.svg"
              alt=""
              fill
              priority
              sizes="40vw"
              draggable={false}
              className="object-cover"
              style={{
                objectPosition: isSecondSlideOrBeyond ? "50% 50%" : "50% 8%",
              }}
            />
          </motion.div>
        </motion.div>
        <BrandIntroSlide
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
