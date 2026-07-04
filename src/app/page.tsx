"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { HeroBanner } from "@/components/home";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main className="min-h-screen bg-[#fffaf1] text-neutral-950">
      <Preloader
        label="Loading the animated landing page"
        loadingText="LOADING..."
        minDuration={2200}
        onComplete={() => setPreloaderDone(true)}
      />
      <HeroBanner isReady={preloaderDone} />
    </main>
  );
}
