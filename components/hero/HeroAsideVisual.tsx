'use client';

import { useEffect, useState } from 'react';

const ASCII_URL = '/ascii/ascii.txt';

export default function HeroAsideVisual() {
  const [ascii, setAscii] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(ASCII_URL)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setAscii(text);
      })
      .catch(() => {
        if (!cancelled) setAscii('');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-aside-panel scrollbar-hide">
      <pre className="h-aside-ascii" aria-hidden="true">
        {ascii ?? ''}
      </pre>
    </div>
  );
}
