import Image from "next/image";
import { motion } from "framer-motion";
import type { SocialLink } from "@/types/banner.type";

type SocialDockProps = {
  links: SocialLink[];
};

export function SocialDock({ links }: SocialDockProps) {
  return (
    <nav
      aria-label="Social links"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[clamp(1rem,4vw,2.5rem)] z-40 flex items-center gap-[clamp(0.65rem,2.5vw,1.25rem)]"
    >
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="block size-[clamp(2rem,8.5vw,2.5rem)] transition-transform"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.86 }}
          transition={{ delay: 0.1 + index * 0.03, duration: 0.2, ease: "easeOut" }}
        >
          <Image
            src={link.iconSrc}
            alt=""
            width={40}
            height={40}
            className="size-full"
            draggable={false}
          />
        </motion.a>
      ))}
    </nav>
  );
}
