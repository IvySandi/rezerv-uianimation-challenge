export type BannerIcon = {
  id: string;
  src: string;
  alt: string;
  className: string;
  rotate: number;
  floatX: number;
  floatY: number;
  delay: number;
  duration: number;
};

export type BannerSlide = {
  id: string;
  background: string;
  scale: number;
  x: string;
  y: string;
  rotate: number;
  dim: number;
};

export type SocialLink = {
  label: string;
  href: string;
  iconSrc: string;
};
