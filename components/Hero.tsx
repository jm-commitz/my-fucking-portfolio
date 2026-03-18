"use client";

import Button from '@/components/button/button';
import { animate } from 'framer-motion';

export default function Hero() {
  const scrollToProjects = () => {
    const projectsElement = document.getElementById('projects');
    if (projectsElement) {
      const scrollValue = window.scrollY;
      const targetValue = projectsElement.getBoundingClientRect().top + scrollValue;

      animate(scrollValue, targetValue, {
        type: "spring",
        stiffness: 100, // Slightly softer than the top-scroll for a longer distance
        damping: 30,
        mass: 1,
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  return (
    <section className="flex flex-col items-start justify-center h-full w-full text-left px-4 md:px-6 overflow-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight break-words max-w-full">I turn ideas into interfaces and interfaces into experiences.</h1>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground break-words max-w-full">Aspiring full stack dev in the making. I build things that actually work (and look good doing it).
      </p>
      <div className="flex flex-row gap-4">
        <a
          href="/cv/AnchetaJaymarkResume.pdf"
          download="AnchetaJaymarkResume.pdf"
          className="inline-block"
        >
          <Button className="mt-8">
            Download CV?
          </Button>
        </a>
        <Button
          className="mt-8"
          variant="ghost"
          onClick={scrollToProjects}
        >
          See Projects
        </Button>
      </div>
    </section>
  );
}
