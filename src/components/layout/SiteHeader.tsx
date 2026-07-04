import { motion } from "framer-motion";

type SiteHeaderProps = {
  brandName?: string;
};

export function SiteHeader({ brandName = "REZERV" }: SiteHeaderProps) {
  const displayName = brandName.toUpperCase();

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-40 w-full px-[clamp(1rem,4vw,2rem)] py-[clamp(1rem,4vw,2rem)]">
      <motion.a
        href="#"
        aria-label={`${displayName} home`}
        className="pointer-events-auto inline-flex max-w-[calc(100vw-2rem)] rounded-full bg-white/70 px-[clamp(1rem,3.5vw,1.25rem)] py-[clamp(0.62rem,2vw,0.75rem)] text-[clamp(1.65rem,8vw,3rem)] font-black leading-none text-[#24479f] shadow-sm backdrop-blur transition-transform hover:scale-95"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {displayName}
      </motion.a>
    </header>
  );
}
