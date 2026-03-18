"use client";

import Button from '@/components/button/button';
import { animate, motion, Variants } from 'framer-motion';

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

  // Text reveal animation variants
  const headingVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
        staggerChildren: 0.6
      }
    }
  };

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const maskVariants: Variants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.2
      }
    }
  };

  const secondMaskVariants: Variants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.5
      }
    }
  };

  const innerMaskVariants: Variants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.1
      }
    }
  };

  const secondInnerMaskVariants: Variants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.4
      }
    }
  };

  return (
    <section className="flex flex-col items-start justify-center h-full w-full text-left px-4 md:px-6 overflow-hidden">
      <motion.div 
        className="space-y-2"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative overflow-hidden">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight break-words max-w-full"
            variants={lineVariants}
          >
            I turn ideas into interfaces and
          </motion.h1>
          <motion.div
            className="absolute inset-0 bg-[#0b2d72]"
            variants={innerMaskVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="absolute inset-0 bg-white"
            variants={maskVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
        <div className="relative overflow-hidden">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight break-words max-w-full"
            variants={lineVariants}
          >
            interfaces into experiences.
          </motion.h1>
          <motion.div
            className="absolute inset-0 bg-[#0b2d72]"
            variants={secondInnerMaskVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="absolute inset-0 bg-white"
            variants={secondMaskVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </motion.div>
      <motion.p 
        className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground break-words max-w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        Aspiring full stack dev in the making. I build things that actually work (and look good doing it).
      </motion.p>
      <motion.div 
        className="flex flex-row gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
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
      </motion.div>
    </section>
  );
}
