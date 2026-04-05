'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { HeroIntroContext } from '@/components/ui/SmoothScroll';
import MaskedLinesHeadline from '@/components/ui/MaskedLinesHeadline';
import HeroAsideVisual from './HeroAsideVisual';
import HeroTechStack from './HeroTechStack';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const introReady = useContext(HeroIntroContext) ?? true;
  const [enterSweep, setEnterSweep] = useState(false);

  useEffect(() => {
    if (!introReady) return;
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEnterSweep(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [introReady]);

  useEffect(() => {
    if (!introReady || !enterSweep) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      const d = parseFloat(el.getAttribute('data-d') || "0");
      (el as HTMLElement).style.transitionDelay = d + 's';
      obs.observe(el);
    });

    const animCount = (el: HTMLElement) => {
      const target = +(el.dataset.count || 0);
      const suf = el.dataset.suf || '';
      const dur = 1200;
      const start = performance.now();
      function step(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animCount(e.target as HTMLElement);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-n[data-count]').forEach(el => countObs.observe(el));

    return () => {
      obs.disconnect();
      countObs.disconnect();
    };
  }, [introReady, enterSweep]);

  const introAnim = cn(
    'hero-intro-animate',
    (!introReady || !enterSweep) && 'hero-intro-before',
    introReady && enterSweep && 'hero-intro-active',
  );

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="h-inner">
        <div className="h-col h-col-main">
          {/* <div className="avail reveal"><span className="avail-dot"></span>Available for Projects</div> */}
          <MaskedLinesHeadline
            as="h1"
            className="h-title"
            lines={['Launch Faster.', 'Build Smarter.']}
            play={introReady && enterSweep}
          />
          <div className={cn('h-main-below-title flex min-w-0 flex-col', introAnim)}>
            <p className="h-desc reveal" data-d="0.2">
              <span className="h-desc-line">Full-stack development designed for speed and scalability, <br />
built around real-world use,
from architecture to launch.</span>
            </p>
            <div
              className="h-btns reveal !gap-2 sm:!gap-3 md:!gap-[0.8rem]"
              data-d="0.25"
            >
              <a
                href="#projects"
                className="btn-y hover-trigger !px-4 !py-2 !text-[0.62rem] !tracking-[0.08em] sm:!px-5 sm:!py-2.5 sm:!text-[0.68rem] md:!px-[2.2rem] md:!py-[0.9rem] md:!text-[0.75rem] md:!tracking-[0.1em]"
              >
                See My Work →
              </a>
              <a
                href="mailto:anchetajaymark69@gmail.com"
                className="btn-o hover-trigger !px-4 !py-2 !text-[0.62rem] !tracking-[0.08em] sm:!px-5 sm:!py-2.5 sm:!text-[0.68rem] md:!px-[2.2rem] md:!py-[0.9rem] md:!text-[0.75rem] md:!tracking-[0.1em]"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
        <div className={cn('h-col h-col-aside', introAnim)}>
          <HeroAsideVisual />
        </div>
        <HeroTechStack className={cn('reveal', introAnim)} data-d="0.3" />
      </div>
    </section>
  );
}
