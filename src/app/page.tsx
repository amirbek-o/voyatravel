"use client";

import { useLanguage } from "@/context/LanguageContext";
import toursData from "@/data/scraped-tours.json";
import TourCard from "@/components/TourCard";
import CurtainLoader from "@/components/CurtainLoader";
import SearchWizard from "@/components/SearchWizard";
import BlueprintSection from "@/components/BlueprintSection";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { useState, useMemo } from "react";

export default function Home() {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  const slides = useMemo(() => {
    return toursData.slice(0, 6).map((tour) => ({
      src: tour.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
      alt: tour.hotel.name,
      title: tour.hotel.name,
      subtitle: `${tour.destination.town}, ${tour.destination.name}`,
      meta: [
        { label: "Price", value: `$${tour.package.pricePerPax}` },
        { label: "Duration", value: `${tour.duration.nights} Nights` },
        { label: "Rating", value: `${tour.hotel.stars} Stars` }
      ]
    }));
  }, []);

  const MaskedText = ({ text, delayBase = 0 }: { text: string, delayBase?: number }) => {
    return (
      <div className="flex flex-wrap justify-center gap-x-[0.2em] gap-y-[0.1em]">
        {text.split(" ").map((word, i) => (
          <div key={i} className="overflow-hidden pb-[0.14em]">
            <div
              className={`inline-block transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] font-serif ${
                isReady ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
              }`}
              style={{ transitionDelay: `${delayBase + i * 140}ms` }}
            >
              {word}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <CurtainLoader onReady={() => setIsReady(true)} />

      <div className="min-h-screen mesh-gradient-bg relative z-0">
        
        {/* Background Mesh Overlays to match reference style */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none z-[-1]" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none z-[-1]" />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-10 lg:pt-48 lg:pb-16 overflow-visible z-10">
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center pt-12 pb-6">
            <h1 className="text-[14vw] md:text-[8vw] font-bold text-brand-deep leading-[0.85] tracking-tight mb-8">
              <MaskedText text={t.hero.title} delayBase={200} />
            </h1>
            
            <div className="overflow-hidden pb-[0.14em]">
              <p 
                className={`text-lg sm:text-xl text-ink-soft max-w-2xl mx-auto font-medium leading-[1.4] tracking-tight mb-14 transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  isReady ? "translate-y-0 opacity-100" : "translate-y-[115%] opacity-0"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                {t.hero.subtitle}
              </p>
            </div>

            {/* Injected Search Wizard */}
            <div 
              className={`w-full mt-4 mb-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isReady ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <SearchWizard />
            </div>
            
          </div>
        </section>

        {/* Blueprint Section */}
        <div 
          className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <BlueprintSection />
        </div>

        {/* Coverflow Carousel */}
        <section className="w-full relative z-10 py-16">
          <div className="w-full overflow-hidden">
            <CoverflowCarousel slides={slides} showCaption showNavigation loop />
          </div>
        </section>

        {/* Tours Grid Section */}
        <section id="tours" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-deep mb-4 tracking-tight">{t.nav.tours}</h2>
              <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {toursData.map((tour, index) => (
                <TourCard key={index} tour={tour} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
