export type SecondSlideProps = {
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

export type SecondSlideShape = {
  className: string;
  x: number[];
  rotate: number[];
  duration: number;
  delay: number;
};
