type BeanCollectionLinkProps = {
  isReady: boolean;
};

export function BeanCollectionLink({ isReady }: BeanCollectionLinkProps) {
  return (
    <a
      href="#top"
      aria-label="View collection"
      className="fixed bottom-[-56px] right-[-18px] z-40 block h-[172px] w-[318px] sm:bottom-[-66px] sm:right-[-12px] sm:h-[204px] sm:w-[374px]"
      style={{ opacity: isReady ? 1 : 0, pointerEvents: isReady ? "auto" : "none" }}
    >
      <svg
        className="h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 254.73 221.92"
        preserveAspectRatio="xMaxYMax meet"
        aria-hidden="true"
      >
        <path
          fill="#24479f"
          d="m225.68,15.74c-25.47-21.39-54.72-22.72-79.62,6.86-24.91,29.57-40.17,54.92-72.67,49.26-32.5-5.66-62.08,14.2-71.32,44.78-9.24,30.58,13.36,75.03,52.18,90.3,38.81,15.27,72.91,24.12,122.72.19,49.81-23.93,68.79-79.19,75.51-108.95,6.71-29.76-1.32-61.04-26.79-82.44Z"
        />
        <text
          x="55%"
          y="51%"
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="15"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="600"
          letterSpacing="4.5"
        >
          view collection
        </text>
      </svg>
    </a>
  );
}
