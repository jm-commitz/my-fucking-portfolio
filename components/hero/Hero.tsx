'use client';
import { useEffect, useRef } from 'react';
import HeroAsideVisual from './HeroAsideVisual';
import HeroTechStack from './HeroTechStack';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="h-inner">
        <div className="h-col h-col-main">
          {/* <div className="avail reveal"><span className="avail-dot"></span>Available for Projects</div> */}
          <h1 className="h-title">
            <span className="hl1 reveal" data-d="0.05">Launch Faster.</span>
            <span className="hl2 reveal" data-d="0.1">Build Smarter.</span>
          </h1>
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
        <div className="h-col h-col-aside">
          <HeroAsideVisual />
        </div>
        <HeroTechStack className="reveal" data-d="0.3" />
      </div>
    </section>
  );
}
