"use client";

import { useEffect, useState, ReactNode } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import "lenis/dist/lenis.css";
import SplashScreen from "./SplashScreen";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF (Request Animation Frame) callback
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Clean up
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen finishLoading={() => setLoading(false)} />}
      </AnimatePresence>
      <div className={loading ? "overflow-hidden h-screen" : ""}>
        {children}
      </div>
    </>
  );
}
