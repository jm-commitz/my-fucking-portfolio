import type { HTMLAttributes } from 'react';

const TECH = [
  { src: '/images/techstack/laravel.svg', name: 'Laravel' },
  { src: '/images/techstack/nextjs2.svg', name: 'Next.js' },
  { src: '/images/techstack/flutter.svg', name: 'Flutter' },
  { src: '/images/techstack/react.svg', name: 'React' },
  { src: '/images/techstack/mysql.svg', name: 'MySQL' },
] as const;

export default function HeroTechStack({
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`h-tech-stack ${className}`.trim()} {...rest}>
      <p className="h-tech-stack-label">
        <span className="h-tech-stack-label-line">Tech I build with every day</span>
        <span className="h-tech-stack-label-line">from APIs to interfaces</span>
      </p>
      <div className="h-tech-stack-logos" aria-label="Technologies">
        {TECH.map(({ src, name }) => (
          <img
            key={src}
            src={src}
            alt=""
            className="h-tech-stack-logo hover-trigger"
            width={180}
            height={56}
            loading="lazy"
            decoding="async"
            title={name}
          />
        ))}
      </div>
    </div>
  );
}
