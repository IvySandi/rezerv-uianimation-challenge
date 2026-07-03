export type BrandIntroSlideProps = {
  isReady: boolean;
  isVisible: boolean;
  shouldReduceMotion: boolean;
  title?: string;
  characterAlt?: string;
  characterClassName?: string;
  characterRestY?: string;
  characterExitY?: string;
  characterRotate?: number;
  titleClassName?: string;
  showCharacter?: boolean;
};

export type BrandIntroShape = {
  className: string;
  x: number[];
  rotate: number[];
  duration: number;
  delay: number;
};
