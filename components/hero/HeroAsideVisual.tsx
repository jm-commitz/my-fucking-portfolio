'use client';

import { useEffect, useState, useContext, useRef } from 'react';
import { HeroIntroContext } from '@/components/ui/SmoothScroll';

const ASCII_URL = '/ascii/ascii.txt';

export default function HeroAsideVisual() {
  const [originalAscii, setOriginalAscii] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>('');
  const introReady = useContext(HeroIntroContext) ?? true;
  const animationRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch(ASCII_URL)
      .then((res) => res.text())
      .then((text) => setOriginalAscii(text))
      .catch(() => setOriginalAscii(''));
  }, []);

  useEffect(() => {
    if (!originalAscii || !introReady) return;

    const lines = originalAscii.split('\n');
    const height = lines.length;
    const width = lines[0]?.length || 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

    let frame = 0;
    const totalFrames = 80;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      const nextFrameText = lines.map((line, y) => {
        return line.split('').map((char, x) => {
          if (char === ' ' || char === '\r') return char;

          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const normalizedDist = dist / maxDist;

          if (normalizedDist < progress) {
            return char;
          } else if (normalizedDist < progress + 0.15) {
            const noise = ['@', '#', '*', ':', '.', '°', '·'];
            return noise[Math.floor(Math.random() * noise.length)];
          } else {
            return Math.random() > 0.98 ? '.' : ' ';
          }
        }).join('');
      }).join('\n');

      setDisplayText(nextFrameText);

      if (frame < totalFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setRevealed(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [originalAscii, introReady]);

  return (
    <div className="h-aside-panel scrollbar-hide relative flex items-center justify-center overflow-hidden w-full h-full bg-transparent">
      <pre
        className="h-aside-ascii relative z-10 font-mono leading-[0.85] tracking-tighter select-none pointer-events-none text-white"
        aria-hidden="true"
        style={{
          opacity: introReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
          willChange: 'opacity',
        }}
      >
        {displayText || ' '}
      </pre>

      {/* Scanline/Noise Grain Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-10 bg-[#111111]" aria-hidden="true" />
    </div>
  );
}
