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
      className="fixed bottom-[15px] left-5 z-40 flex items-center gap-[13px] sm:bottom-[30px] sm:left-10 sm:gap-5"
    >
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          target="_blank"
          rel="noreferrer"
          className="block size-10 transition-transform"
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
