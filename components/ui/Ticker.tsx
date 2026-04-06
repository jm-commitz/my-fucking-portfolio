'use client';

import React from 'react';
import Image from 'next/image';

type TickerItem = string | { src: string; alt: string };

type TickerProps = {
  items: TickerItem[];
  theme: 'red' | 'yel' | 'dark';
  speed?: 'normal' | 'rev' | 'slow';
  emIcon?: string;
};

export default function Ticker({ items, theme, speed = 'normal', emIcon = '★' }: TickerProps) {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  let containerBg = '';
  let containerBorder = '';
  let itemColor = '';
  let emColor = '';

  if (theme === 'dark') {
    containerBg = 'bg-[var(--red)]';
    containerBorder = 'border-y-[3px] border-[var(--yellow)]';
    itemColor = 'text-[var(--bg)]';
    emColor = 'text-[var(--yellow)]';
  } else if (theme === 'yel') {
    containerBg = 'bg-[var(--yellow)]';
    containerBorder = 'border-y-[3px] border-[var(--red)]';
    itemColor = 'text-[var(--bg)]';
    emColor = 'text-[var(--red)]';
  } else if (theme === 'red') {
    containerBg = 'bg-[var(--bg3)]';
    containerBorder = 'border-y border-[#f0ece0]/10';
    itemColor = 'text-[var(--fg3)]';
    emColor = 'text-[#f0ece0]/20';
  }

  // Duration tuning
  let duration = '30s';
  if (speed === 'rev') duration = '20s';
  if (speed === 'slow') duration = '60s';

  const animName = speed === 'rev' ? 'ticker-rev' : 'ticker-fwd';

  return (
    <div className={`overflow-hidden py-4 relative z-10 ${containerBg} ${containerBorder}`}>
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          willChange: 'transform',
        }}
      >
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
             <span className={`font-[family-name:var(--D)] text-[1.1rem] tracking-[0.12em] px-10 transition-all ${itemColor}`}>
               {typeof item === 'string' ? (
                 <span>{item}</span>
               ) : (
                 <Image
                   src={item.src}
                   alt={item.alt}
                   width={64}
                   height={32}
                   className="h-8 w-auto opacity-100"
                   loading="lazy"
                 />
               )}
             </span>
             <em className={`not-italic ${emColor} text-lg`} aria-hidden="true">{emIcon}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
