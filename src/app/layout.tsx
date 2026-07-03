import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Part 1 UI Animation Challenge",
  description: "Next.js, Tailwind, GSAP ScrollTrigger, and Framer Motion setup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
