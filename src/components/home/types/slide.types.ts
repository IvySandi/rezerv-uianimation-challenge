import type { BannerSlide } from "@/types/banner.type";

export type BaseSlideProps = {
  isReady: boolean;
  isVisible: boolean;
  shouldReduceMotion: boolean;
};

export type FirstSlideProps = BaseSlideProps & {
  activeSlide: BannerSlide;
};

export type SecondSlideProps = BaseSlideProps & {
  title?: string;
  titleClassName?: string;
};

export type ThirdSlideProps = BaseSlideProps;

export type FloatingShape = {
  className: string;
  x: number[];
  rotate: number[];
  duration: number;
  delay: number;
};
