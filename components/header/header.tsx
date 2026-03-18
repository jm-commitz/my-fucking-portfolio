'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import Button from '@/components/button/button';
import Shape from '@/components/svg/shape';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const [activeNav, setActiveNav] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Determine visibility
      if (isMenuOpen) {
        setIsVisible(true);
      } else {
        // Hide if scrolling down more than 50px, show if scrolling up
        if (scrollY > lastScrollY.current && scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setScrolled(scrollY > 0);
      lastScrollY.current = scrollY;
      
      const footerElement = document.getElementById('contact');
      // Calculate absolute position even if nested
      const footerTop = footerElement
        ? footerElement.getBoundingClientRect().top + scrollY
        : document.documentElement.scrollHeight;
      
      // We are over the "Light" sections if we've scrolled past the hero 
      // AND we haven't reached the footer yet.
      // Since Hero is h-screen, its bottom is at window.innerHeight
      const heroBottom = window.innerHeight;
      
      const isHeaderInLightZone = scrollY > (heroBottom - 100) && scrollY < (footerTop - 100);
      
      setIsOverLight(isHeaderInLightZone);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Reset to home as default when menu opens
    if (isMenuOpen) {
      setActiveNav('home');
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Top Navbar Pill */}
      <div className={`transition-all duration-500 overflow-hidden ${isMenuOpen ? 'bg-[#0B2D72] shadow-lg' : scrolled ? 'bg-background/40 backdrop-blur-md shadow-sm border border-border/5' : 'bg-transparent'} pointer-events-auto`}>
        <nav className="py-4 relative px-8">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleMenu}
              className="flex flex-row items-center gap-2.5 p-2 group transition-opacity hover:opacity-70 group relative"
              aria-label="Toggle menu"
            >
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] pt-0.5 transition-all duration-300 ${isMenuOpen ? 'text-white' : isOverLight ? 'text-black' : 'text-white'}`}>
                {isMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="flex flex-col space-y-1 w-5">
                <span className={`block w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'bg-white rotate-45 translate-y-1.5' : isOverLight ? 'bg-black' : 'bg-white'}`}></span>
                <span className={`block w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'bg-white opacity-0' : isOverLight ? 'bg-black' : 'bg-white'}`}></span>
                <span className={`block w-full h-0.5 transition-all duration-300 ${isMenuOpen ? 'bg-white -rotate-45 -translate-y-1.5' : isOverLight ? 'bg-black' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>

          {/* Logo - Left */}
          <Link
            href="/"
            className="absolute left-8 top-4 flex items-center justify-center w-8 h-8 z-[100] cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              // Use framer-motion animate for a much more robust scroll that overcomes sticky "physics"
              const scrollValue = window.scrollY;
              if (scrollValue > 0) {
                animate(scrollValue, 0, {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  mass: 1,
                  onUpdate: (latest) => window.scrollTo(0, latest)
                });
              }
            }}
          >
            {/* Background Shape */}
            <div className="absolute inset-0 shadow-md transition-all duration-300">
              <Shape className="w-full h-full" fill={isMenuOpen ? "white" : "#0B2D72"} />
            </div>

            {/* Initials */}
            <span className={`relative z-10 font-bold text-sm tracking-tight transition-colors duration-300 ${isMenuOpen ? 'text-[#0B2D72]' : 'text-white'}`}>
              JA
            </span>
          </Link>

          <div className="absolute right-8 top-4">
            <Button size="sm" variant={isMenuOpen ? "inverse" : "primary"}>
              Let's work together
            </Button>
          </div>
        </nav>
      </div>

      {/* Expandable Menu */}
      <AnimatePresence mode="sync">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeOut'
            }}
            className="mx-auto mt-4 max-w-[calc(100vw-2rem)] overflow-hidden will-change-transform bg-[#0B2D72] shadow-2xl pointer-events-auto pt-6"
          >
            <div className="px-10 min-h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] px-10 h-[600px]">
                {/* First Grid - Navigation Items */}
                <div className="flex flex-col space-y-6 pt-20">
                  <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Navigation</h3>
                  <div className="flex flex-col space-y-4 relative" onMouseLeave={() => setActiveNav('home')}>
                    {['home', 'projects', 'about', 'contact'].map((item) => (
                      <a
                        key={item}
                        href={`#${item}`}
                        className={`group flex items-center gap-4 text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300 outline-none focus:outline-none ${activeNav === item ? 'text-white' : 'text-white/60 hover:text-white'}`}
                        onClick={toggleMenu}
                        onMouseEnter={() => setActiveNav(item)}
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center relative">
                          {activeNav === item && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                                mass: 1,
                                bounce: 0.6
                              }}
                            >
                              <Shape className="w-full h-full" fill="white" />
                            </motion.div>
                          )}
                        </div>
                        <span className={`transition-transform duration-300 capitalize ${activeNav === item ? 'translate-x-0' : '-translate-x-10'}`}>
                          {item}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Second Grid - Contact Information */}
                <div className="flex flex-col space-y-8 pt-20">
                  <div className="flex flex-col space-y-6">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Get in Touch</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-white/40 mb-1">Email</p>
                        <a href="mailto:anchetajaymark69@gmail.com" className="text-xl font-medium text-white hover:text-white/80 transition-colors">
                          anchetajaymark69@gmail.com
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-white/40 mb-1">Phone</p>
                        <a href="tel:+1234567890" className="text-xl font-medium text-white hover:text-white/80 transition-colors">
                          +63 915 234 5678
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-white/40 mb-1">Location</p>
                        <p className="text-xl font-medium text-white">
                          BGC, Taguig City
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button size="lg" className="w-full md:w-auto px-10" variant="inverse">
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Third Grid - Project Showcase Images */}
                <div className="flex flex-col space-y-6 pt-20">
                  <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Featured Projects</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    <div className="group relative overflow-hidden bg-muted aspect-[4/3]">
                      <img
                        src="/images/projects/1.png"
                        alt="Project Showcase 1"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/90 backdrop-blur-sm px-4 py-2 flex justify-between items-center transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">E-Commerce</span>
                          <span className="text-[10px] text-muted-foreground uppercase">2024</span>
                        </div>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden bg-muted aspect-[4/3]">
                      <img
                        src="/images/projects/2.png"
                        alt="Project Showcase 2"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/90 backdrop-blur-sm px-4 py-2 flex justify-between items-center transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Task App</span>
                          <span className="text-[10px] text-muted-foreground uppercase">2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}