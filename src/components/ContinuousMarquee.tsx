import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

export default function ContinuousMarquee({ tours }: { tours: any[] }) {
  const { t } = useLanguage();
  // Duplicate exactly once to create a seamless scroll 
  const extendedTours = [...tours, ...tours];

  return (
    <div className="relative w-full overflow-hidden py-10 group bg-brand-deep/40 backdrop-blur-md border-y border-white/5 my-10">
      <div className="flex w-max animate-marquee group-hover:pause">
        {extendedTours.map((tour, idx) => (
          <div 
            key={idx}
            className="relative w-[320px] md:w-[400px] aspect-[4/5] mx-4 shrink-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(255,122,61,0.25)] hover:border-brand/40 cursor-pointer"
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-brand-deep/30 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-10" />
            
            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B45] via-[#0D2B45]/70 to-transparent opacity-90 z-20" />
            
            <img 
              src={tour.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop"} 
              alt={tour.hotel?.name || tour.destination?.town} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
              draggable={false}
            />
            
            {/* Content Payload */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-30 flex flex-col justify-end h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md line-clamp-2">
                {tour.hotel?.name}
              </h3>
              <p className="text-white/80 font-medium text-sm md:text-base drop-shadow-md mb-6 uppercase tracking-widest text-brand-light">
                {tour.destination?.town}, {tour.destination?.name}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mt-auto">
                <span className="bg-brand text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-brand/30 tracking-wide uppercase">
                  {tour.duration?.nights} {t.tour.nights}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1">
                  {tour.hotel?.stars} ★
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
