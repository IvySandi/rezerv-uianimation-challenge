import { motion } from "framer-motion";

type SiteHeaderProps = {
  brandName?: string;
};

export function SiteHeader({ brandName = "REZERV" }: SiteHeaderProps) {
  const displayName = brandName.toUpperCase();

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-40 w-full px-5 py-5 sm:px-8 sm:py-8">
      <motion.a
        href="#top"
        aria-label={`${displayName} home`}
        className="pointer-events-auto inline-flex rounded-full bg-white/70 px-5 py-3 text-3xl font-black text-[#24479f] shadow-sm backdrop-blur transition-transform hover:scale-95 sm:text-5xl"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {displayName}
      </motion.a>
    </header>
  );
}
