"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { label: t.nav.destinations, href: "#destinations" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.contacts, href: "#contacts" }
  ];

  return (
    <>
      <header className="fixed top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 xl:left-8 xl:right-8 z-50 flex items-center justify-between px-6 py-3 luxury-glass rounded-full border border-white/50">
        
        {/* 1. BRAND STRUCTURE (Far Left) */}
        <div className="flex flex-1 items-center justify-start">
          <a href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-[#0D2B45] uppercase">
            VOYA TRAVEL
          </a>
        </div>

        {/* 1. NAVIGATION STRUCTURE (Center) */}
        <nav className="hidden lg:flex flex-[2] justify-center items-center gap-8 font-medium text-[15px] text-gray-500">
          {navLinks.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="hover:text-brand transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Language & CTA */}
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
          
          {/* 2. TRIPLE LANGUAGE TOGGLE PILLS CONTROL PANEL (Center Right) */}
          <div className="hidden sm:flex items-center bg-slate-100/60 backdrop-blur-sm rounded-full p-1.5 border border-white/40">
            {['RU', 'UZ', 'EN'].map((langKey) => {
              const langCode = langKey.toLowerCase() as "ru" | "uz" | "en";
              const isActive = language === langCode;
              return (
                <button
                  key={langKey}
                  onClick={() => setLanguage(langCode)}
                  className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'bg-white shadow-sm text-slate-900 font-medium' 
                      : 'text-slate-500 font-medium hover:text-slate-800'
                  }`}
                >
                  {langKey}
                </button>
              );
            })}
          </div>

          {/* 3. OPTIMIZED CALL-TO-ACTION BUTTON (Far Right) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand text-white px-6 py-2.5 rounded-full text-base font-medium shadow-md hover:scale-105 hover:-translate-y-0.5 hover:shadow-brand/30 hover:shadow-lg transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 whitespace-nowrap"
          >
            Find a tour
          </button>

          {/* Mobile Menu Toggle (Visible only on small screens) */}
          <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[#0D2B45]/5 hover:bg-[#0D2B45] hover:text-white transition-all gap-[5px] group shrink-0">
            <span className="w-4 h-[1.5px] bg-[#0D2B45] group-hover:bg-white transition-colors block"></span>
            <span className="w-4 h-[1.5px] bg-[#0D2B45] group-hover:bg-white transition-colors block"></span>
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
