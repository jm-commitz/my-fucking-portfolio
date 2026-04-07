'use client';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/hero/Hero';
import Ticker from '@/components/ui/Ticker';
import Arsenal from '@/components/arsenal/Arsenal';
import Interlude from '@/components/ui/Interlude';
import FeaturedProjects from '@/components/featuredProjects/FeaturedProjects';
import About from '@/components/about/About';
import Testimonials from '@/components/testimonials/Testimonials';
import WhyChooseMe from '@/components/whyChooseMe/WhyChooseMe';
import Footer from '@/components/footer/Footer';
import PromoCard from '@/components/ui/PromoCard';


export default function Home() {
  return (
    <main
      className={`min-h-screen transition-colors duration-700 bg-[var(--bg)] text-[var(--fg)]`}
    >
      <Nav />
      <Hero />
      <Ticker
        items={['DESIGN', 'DEVELOPMENT', 'PERFORMANCE', 'SEO', 'CONVERSION', 'STRATEGY', 'DESIGN', 'DEVELOPMENT', 'PERFORMANCE', 'SEO', 'CONVERSION']}
        theme="red"
        emIcon="★"
      />
      <Arsenal />
      <Interlude />
      <FeaturedProjects />
      <About />
      <Testimonials />
      <WhyChooseMe />
      <Ticker
        items={['AVAILABLE FOR FREELANCE', 'OPEN TO CONTRACTS', 'BASED IN THE PHILIPPINES', 'WEB DEV', 'MOBILE DEV', 'SAAS BUILDER']}
        theme="red"
        emIcon="★"
      />
      <Footer />

      <PromoCard
        triggerSelector="#arsenal"
        storageKey="promo:swarm-escape:dismissed"
        kicker="[NEW GAME]"
        title="Swarm Escape"
        description="Survive as long as you can. Arrow keys / d-pad. Takes ~10 seconds to learn."
        previewVideoSrc="/swarm_game/swarm_escape.mp4"
        ctaLabel="Play now"
        ctaHref="/game/swarm_escape_game.html"
        modalSrc="/game/swarm_escape_game.html"
      />
    </main>
  );
}
