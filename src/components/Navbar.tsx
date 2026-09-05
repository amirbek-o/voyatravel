"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Plane } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-50 flex items-center justify-between px-6 py-4 luxury-glass rounded-pill text-xs text-brand-deep">
        {/* Left Nav */}
        <nav className="hidden lg:flex flex-1 gap-8 font-medium tracking-wide">
          <a href="#tours" className="hover:text-brand transition-colors">Tours & Destinations</a>
          <a href="/legal" className="hover:text-brand transition-colors">Club & Events</a>
        </nav>

        {/* Center Brand */}
        <div className="flex-1 flex justify-start lg:justify-center items-center">
          <a href="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-[0.2em] text-white hover:text-brand transition-colors">
            <Plane className="w-6 h-6 text-brand" />
            <span>Voya Travel</span>
          </a>
        </div>

        {/* Right Nav */}
        <div className="flex-1 flex justify-end items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-2 font-medium">
            <button 
              onClick={() => setLanguage("en")} 
              className={`hover:text-brand transition-colors ${language === 'en' ? 'text-brand font-bold' : ''}`}
            >
              EN
            </button>
            <span className="text-brand-deep/40">/</span>
            <button 
              onClick={() => setLanguage("ru")} 
              className={`hover:text-brand transition-colors ${language === 'ru' ? 'text-brand font-bold' : ''}`}
            >
              RU
            </button>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:block font-bold uppercase tracking-wide hover:text-brand transition-colors"
          >
            {t.tour.bookNow}
          </button>
          
          <button className="flex flex-col justify-center items-center w-10 h-10 rounded-pill bg-brand-deep/10 hover:bg-brand-deep hover:text-white transition-all gap-[5px] group">
            <span className="w-4 h-[1.5px] bg-brand-deep group-hover:bg-white transition-colors block"></span>
            <span className="w-4 h-[1.5px] bg-brand-deep group-hover:bg-white transition-colors block"></span>
          </button>
        </div>
      </header>
      
      {/* Passing dummy tour just for the general booking modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tour={{ destination: { town: "General", name: "Inquiry" } }} 
      />
    </>
  );
}
