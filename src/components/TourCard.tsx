"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Star, MapPin, CalendarDays, Plane, Utensils, BedDouble, ArrowRight } from "lucide-react";
import BookingModal from "./BookingModal";
import { useState, useRef, useEffect } from "react";

export default function TourCard({ tour, index = 0 }: { tour: any, index?: number }) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Minimal InView Reveal Logic
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`group bg-brand-deep border border-brand-deep/20 rounded-card overflow-hidden flex flex-col h-[32rem] cursor-pointer relative transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[48px]"
        } hover:scale-[1.02] hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(13,43,69,0.25)]`}
        style={{ transitionDelay: `${index * 140}ms` }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* MEDIA SECTION - TOP 40% */}
        <div className="relative w-full h-[45%] shrink-0 border-b border-gray-200 overflow-hidden">
          {/* Zoomable Background Layer */}
          <div 
            className="absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            style={{
              backgroundImage: `url('${tour.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* subtle darkening for badges */}
          <div className="absolute inset-0 bg-brand-deep/20 transition-opacity duration-[800ms] group-hover:opacity-10"></div>

          {/* Badges Pinned to Corners */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <span className="bg-brand-deep/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-medium text-white inline-flex items-center gap-1.5 border border-white/20 shadow-xl">
              <MapPin className="w-3.5 h-3.5 text-brand-light" />
              {tour.destination.town}, {tour.destination.name}
            </span>
            <div className="bg-brand-deep/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-xs font-medium text-white flex items-center gap-1 border border-white/20 shadow-xl">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              {tour.hotel.stars}
            </div>
          </div>
        </div>

        {/* CONTENT LOGIC BLOCK - BOTTOM 55% */}
        <div className="h-[55%] flex flex-col flex-grow relative z-10 bg-[#FFF2E2] p-5 text-brand-deep">
          {/* Hotel Heading */}
          <h3 className="text-xl font-bold text-brand-deep line-clamp-3 min-h-[3rem] group-hover:text-brand transition-colors mb-4">
            {tour.hotel.name}
          </h3>
          
          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-ink-soft mb-auto">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-brand-light" />
              <span>{tour.duration.nights} {t.tour.nights}</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-brand-light" />
              <span className="truncate" title={tour.included.roomType}>{tour.included.roomType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-brand-light" />
              <span className="truncate" title={tour.included.meal}>{tour.included.meal}</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-brand-light" />
              <span>
                {tour.included.flightIn && tour.included.flightOut ? "Round Trip" : "One Way"}
              </span>
            </div>
          </div>

          {/* Pricing & CTA Bottom Row */}
          <div className="mt-4 flex items-end justify-between border-t border-brand-deep/10 pt-4">
            <div>
              <p className="text-[0.65rem] text-ink-soft font-medium uppercase tracking-wider mb-0.5">{t.tour.from}</p>
              <p className="text-2xl font-bold text-brand-deep leading-none">
                {tour.package.pricePerPax.toLocaleString('ru-RU')} {t.tour.currency}
              </p>
              <p className="text-xs text-ink-soft mt-1">{t.tour.perPerson}</p>
            </div>
            
            <button className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-xs font-bold uppercase tracking-wide border border-brand text-white bg-brand hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300">
              {t.tour.bookNow}
              <ArrowRight className="w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]" />
            </button>
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tour={tour} />
    </>
  );
}
