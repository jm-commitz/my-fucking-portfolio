"use client";

import {
  createContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import "lenis/dist/lenis.css";
import SplashScreen from "./SplashScreen";

/** When false, Hero should stay visually gated and defer reveal observers (splash still on or exiting). */
export const HeroIntroContext = createContext<boolean | undefined>(undefined);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [heroIntroReady, setHeroIntroReady] = useState(false);
  const splashWasShown = useRef(false);

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

  useEffect(() => {
    if (loading) splashWasShown.current = true;
  }, [loading]);

  useEffect(() => {
    if (!loading && !splashWasShown.current) {
      setHeroIntroReady(true);
    }
  }, [loading]);

  return (
    <HeroIntroContext.Provider value={heroIntroReady}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setHeroIntroReady(true)}
      >
        {loading && <SplashScreen finishLoading={() => setLoading(false)} />}
      </AnimatePresence>
      <div className={loading ? "overflow-hidden h-screen" : ""}>
        {children}
      </div>
    </HeroIntroContext.Provider>
  );
}
