'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOTION_COMPONENTS = {
  h1: motion.h1,
  h2: motion.h2,
  div: motion.div,
} as const;

const WAVE_Y_PX = 16;
const WAVE_ROTATE_DEG = 2.25;
const WAVE_DELAY_S = 0.055;

export type MaskedLinesHeadlineProps = {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  /** When true, lines animate in from the left (masked) to rest. */
  play?: boolean;
  as?: keyof typeof MOTION_COMPONENTS;
  staggerChildren?: number;
  delayChildren?: number;
  duration?: number;
  /** Sinusoidal offset + stagger so lines read as a wave (default: true). */
  wave?: boolean;
};

export default function MaskedLinesHeadline({
  lines,
  className,
  lineClassName,
  play = true,
  as = 'h1',
  staggerChildren = 0.11,
  delayChildren = 0.04,
  duration = 0.82,
  wave = true,
}: MaskedLinesHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_COMPONENTS[as];
  const useWave = wave && !reduceMotion;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: (i: number) =>
      reduceMotion
        ? { opacity: 0 }
        : {
            x: '-108%',
            opacity: 1,
            y: useWave ? WAVE_Y_PX * Math.sin(i * 1.05 + 0.35) : 0,
            rotate: useWave ? WAVE_ROTATE_DEG * Math.sin(i * 0.95 + 0.5) : 0,
          },
    show: (i: number) => {
      const baseDelay = delayChildren + i * staggerChildren;
      const wobbleDelay = useWave ? WAVE_DELAY_S * Math.sin(i * 1.15 + 0.25) : 0;
      return {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: {
          duration: reduceMotion ? 0.01 : duration,
          delay: reduceMotion ? 0 : baseDelay + wobbleDelay,
          ease: [0.19, 1, 0.22, 1],
        },
      };
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      animate={play ? 'show' : 'hidden'}
    >
      {lines.map((text, i) => (
        <span key={`${i}-${text}`} className="block overflow-hidden">
          <motion.span
            className={cn('block origin-left will-change-transform', lineClassName)}
            custom={i}
            variants={lineVariants}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
