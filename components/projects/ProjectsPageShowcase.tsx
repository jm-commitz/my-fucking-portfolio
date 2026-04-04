'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  Columns2,
  LayoutGrid,
} from 'lucide-react';

export type ShowcaseProject = {
  slug: string;
  name: string;
  year: string;
  img: string;
  category: string;
};

type ProjectsPageShowcaseProps = {
  projects: ShowcaseProject[];
};

export type LayoutMode = 'carousel' | 'grid-2' | 'grid-3';

const gridItemLayoutTransition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 38,
  mass: 0.85,
};

function LayoutToggleButtons({
  layout,
  onChange,
}: {
  layout: LayoutMode;
  onChange: (m: LayoutMode) => void;
}) {
  const item = (mode: LayoutMode, label: string, Icon: typeof GalleryHorizontal) => (
    <button
      key={mode}
      type="button"
      aria-pressed={layout === mode}
      aria-label={label}
      onClick={() => onChange(mode)}
      className={`flex h-10 w-10 items-center justify-center transition-colors md:h-11 md:w-11 ${
        layout === mode
          ? 'bg-[var(--primary)] text-white'
          : 'bg-[var(--bg2)]/70 text-[var(--fg)] hover:bg-[var(--bg2)]'
      }`}
    >
      <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={1.75} />
    </button>
  );

  return (
    <div className="flex shrink-0 justify-center gap-1 md:justify-end" role="group" aria-label="Project layout">
      {item('carousel', 'Carousel layout', GalleryHorizontal)}
      {item('grid-2', 'Two column grid', Columns2)}
      {item('grid-3', 'Three column grid', LayoutGrid)}
    </div>
  );
}

function CategoryFilterDropdown({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (category: string) => void;
  categories: string[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label =
    value === 'all'
      ? 'All categories'
      : categories.includes(value)
        ? value
        : 'All categories';

  return (
    <div ref={rootRef} className="relative shrink-0 justify-self-start md:justify-self-start">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Category: ${label}`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 min-w-[11rem] items-center justify-between gap-3 bg-[var(--primary)] px-3.5 font-[family-name:var(--M)] text-sm font-bold uppercase tracking-[0.1em] text-white transition-[filter] hover:brightness-110 md:h-12 md:min-w-[13rem] md:text-base md:px-4"
      >
        <span className="truncate">{label}</span>
        <ChevronDown className={`h-[18px] w-[18px] shrink-0 text-white transition-transform md:h-5 md:w-5 ${open ? 'rotate-180' : ''}`} strokeWidth={1.75} />
      </button>
      {open && (
        <ul
          className="absolute left-0 top-[calc(100%+6px)] z-50 max-h-[min(50vh,280px)] min-w-full overflow-y-auto border-2 border-[var(--primary)] bg-[var(--bg)] py-1 shadow-xl shadow-black/35"
          role="listbox"
        >
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === 'all'}
              className={`w-full px-3 py-2.5 text-left font-[family-name:var(--M)] text-[0.62rem] uppercase tracking-[0.1em] transition-colors hover:bg-[var(--bg2)] ${
                value === 'all' ? 'text-[var(--primary)]' : 'text-[var(--fg2)]'
              }`}
              onClick={() => {
                onChange('all');
                setOpen(false);
              }}
            >
              All categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === cat}
                className={`w-full px-3 py-2.5 text-left font-[family-name:var(--M)] text-[0.62rem] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--bg2)] ${
                  value === cat ? 'text-[var(--primary)]' : 'text-[var(--fg2)]'
                }`}
                onClick={() => {
                  onChange(cat);
                  setOpen(false);
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ShowcaseGridView({
  projects,
  columns,
}: {
  projects: ShowcaseProject[];
  columns: 2 | 3;
}) {
  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2'
      : 'grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3';

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center font-[family-name:var(--M)] text-[0.75rem] uppercase tracking-[0.15em] text-[var(--fg2)]">
        No projects match this filter.
      </p>
    );
  }

  return (
    <div className={`w-full ${gridClass}`}>
      {projects.map((project) => (
        <motion.article
          key={project.slug}
          layout
          className="min-w-0"
          transition={{ layout: gridItemLayoutTransition }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="group block cursor-view-project focus:outline-none focus-visible:[&_img]:brightness-110"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--fg2)]/10 sm:aspect-video">
              <img
                src={project.img}
                alt={project.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4 font-[family-name:var(--M)] text-[0.62rem] uppercase tracking-[0.2em] text-[var(--fg2)] sm:text-[0.65rem]">
              <span className="min-w-0 text-[var(--fg)] transition-colors group-hover:text-[var(--primary)]">
                {project.name}
              </span>
              <span className="shrink-0 tabular-nums">{project.year}</span>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

function ShowcaseCarouselView({
  projects,
  onLayoutChange,
  categoryFilter,
  onCategoryFilterChange,
  categoryOptions,
}: {
  projects: ShowcaseProject[];
  onLayoutChange: (m: LayoutMode) => void;
  categoryFilter: string;
  onCategoryFilterChange: (c: string) => void;
  categoryOptions: string[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    containScroll: false,
  });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    setSelected(0);
    emblaApi?.scrollTo(0, true);
    emblaApi?.reInit();
  }, [emblaApi, projects]);

  const empty = projects.length === 0;

  return (
    <>
      <div className="mb-8 grid grid-cols-1 items-end gap-5 md:mb-10 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:gap-4 md:gap-x-6">
        <CategoryFilterDropdown
          value={categoryFilter}
          onChange={onCategoryFilterChange}
          categories={categoryOptions}
        />

        <div className="min-w-0 justify-self-center overflow-x-auto pb-1 [scrollbar-gutter:stable] md:max-w-full">
          {empty ? (
            <p className="py-2 text-center font-[family-name:var(--M)] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--fg2)] md:py-0">
              No matches
            </p>
          ) : (
            <div className="mx-auto flex w-max max-w-full flex-nowrap justify-center gap-x-4 px-1 md:mx-auto md:justify-center">
              {projects.map((p, i) => (
                <div
                  key={p.slug}
                  role="button"
                  tabIndex={0}
                  aria-label={p.name}
                  aria-selected={i === selected}
                  onMouseEnter={() => scrollTo(i)}
                  onFocus={() => scrollTo(i)}
                  onClick={() => scrollTo(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollTo(i);
                    }
                  }}
                  className="group flex w-[4.25rem] shrink-0 cursor-pointer flex-col items-center gap-2 sm:w-[4.75rem]"
                >
                  <div
                    className={`relative h-11 w-full overflow-hidden bg-[var(--fg2)]/15 transition-all duration-500 sm:h-12 ${
                      selected === i ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    <img src={p.img} alt="" className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex h-3 w-full items-center justify-center" aria-hidden>
                    {selected === i && (
                      <motion.div
                        layoutId="projects-page-indicator"
                        className="h-2.5 w-2.5 bg-[var(--primary)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 1 }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <LayoutToggleButtons layout="carousel" onChange={onLayoutChange} />
      </div>

      {!empty && (
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={scrollPrev}
            className="absolute left-2 top-[min(22vw,28dvh,200px)] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[var(--bg)]/85 text-[var(--fg)] backdrop-blur-sm transition-colors hover:text-[var(--primary)] md:left-4 md:top-[min(34vh,360px)] md:h-12 md:w-12"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={scrollNext}
            className="absolute right-2 top-[min(22vw,28dvh,200px)] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[var(--bg)]/85 text-[var(--fg)] backdrop-blur-sm transition-colors hover:text-[var(--primary)] md:right-4 md:top-[min(34vh,360px)] md:h-12 md:w-12"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
          </button>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y [-webkit-tap-highlight-color:transparent]">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="min-w-0 shrink-0 grow-0 basis-[min(92vw,1200px)] pl-3 sm:basis-[min(90vw,1280px)] sm:pl-4 md:basis-[min(88vw,1380px)] md:pl-5 lg:basis-[min(86vw,1500px)] lg:pl-6"
                >
                  <figure className="m-0">
                    <Link
                      href={`/projects/${project.slug}`}
                      aria-label={`View project: ${project.name}`}
                      className="relative block cursor-view-project focus:outline-none focus-visible:[&_img]:brightness-110"
                    >
                      <div className="relative block aspect-video w-full overflow-hidden bg-[var(--fg2)]/10 md:aspect-auto md:min-h-[min(68vh,720px)]">
                        <img
                          src={project.img}
                          alt={project.name}
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />
                      </div>
                    </Link>
                    <figcaption className="mt-5 flex items-baseline justify-between gap-6 px-1 font-[family-name:var(--M)] text-[0.62rem] uppercase tracking-[0.2em] text-[var(--fg2)] sm:mt-6 sm:text-[0.65rem] md:px-2 md:text-xs">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="min-w-0 text-left text-[var(--fg2)] no-underline transition-colors hover:text-[var(--primary)] focus:outline-none focus-visible:underline"
                      >
                        {project.name}
                      </Link>
                      <span className="shrink-0 tabular-nums text-[var(--fg)]">{project.year}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectsPageShowcase({ projects }: ProjectsPageShowcaseProps) {
  const [layout, setLayout] = useState<LayoutMode>('carousel');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categoryOptions = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => s.add(p.category));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return projects;
    return projects.filter((p) => p.category === categoryFilter);
  }, [projects, categoryFilter]);

  if (projects.length === 0) return null;

  return (
    <div className="mx-auto max-w-full overflow-visible px-6 md:px-10">
      <div className="mb-10 min-w-0 space-y-4 md:mb-14 [container-type:inline-size]">
        <div className="-mb-1 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.4em] text-[var(--primary)]">
          <span className="h-[2px] w-8 bg-[var(--primary)]" aria-hidden />
          SELECTED WORK
        </div>
        <h1 className="max-w-full break-words font-[family-name:var(--D)] text-4xl uppercase leading-[0.92] tracking-tighter text-[var(--fg)] sm:text-5xl md:text-6xl lg:text-[clamp(2.15rem,4.2cqi,3.75rem)] lg:leading-[0.92] xl:text-6xl xl:leading-none 2xl:text-7xl min-[1800px]:text-8xl">
          All <br className="max-sm:hidden" /> Projects
        </h1>
        <p className="max-w-full font-[family-name:var(--M)] text-[0.75rem] uppercase leading-relaxed tracking-[0.1em] text-[var(--fg2)] sm:max-w-xl lg:max-w-2xl">
          We build websites where every scroll, every transition, and every interaction feels intentional. The details most teams skip are the details we care about most.
        </p>
      </div>

      {layout === 'carousel' ? (
        <ShowcaseCarouselView
          projects={filtered}
          onLayoutChange={setLayout}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categoryOptions={categoryOptions}
        />
      ) : (
        <>
          <div className="mb-10 grid grid-cols-1 items-end gap-5 md:mb-14 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:gap-4 md:gap-x-6">
            <CategoryFilterDropdown
              value={categoryFilter}
              onChange={setCategoryFilter}
              categories={categoryOptions}
            />
            <p className="justify-self-center text-center font-[family-name:var(--M)] text-[0.62rem] uppercase tracking-[0.2em] text-[var(--fg2)] md:py-1 md:text-[0.65rem]">
              {filtered.length} project{filtered.length === 1 ? '' : 's'}
            </p>
            <LayoutToggleButtons layout={layout} onChange={setLayout} />
          </div>
          <ShowcaseGridView projects={filtered} columns={layout === 'grid-2' ? 2 : 3} />
        </>
      )}
    </div>
  );
}
