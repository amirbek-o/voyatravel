"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Calendar, Users, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DESTINATIONS = [
  "Barcha yo'nalishlar",
  "Ozarbayjon",
  "Gruziya",
  "Misr",
  "Zanzibar",
  "Indoneziya",
  "Xitoy",
  "Mavrikiy",
  "Malayziya",
  "Maldiv orollari",
  "BAA",
  "Seyshel orollari",
  "Tailand",
  "Turkiya",
  "Shri-Lanka"
];

export default function SearchWizard() {
  const { t } = useLanguage();
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 z-20 relative">
      
      {/* Search Bar - Solid Premium Block like Reference */}
      <div className="luxury-glass rounded-[2rem] p-4 flex flex-col lg:flex-row gap-3 items-end">
        
        {/* Destination Dropdown */}
        <div className="flex-1 w-full flex flex-col gap-1.5 relative" ref={destRef}>
          <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider pl-2">
            {t.search.destination}
          </label>
          <div 
            onClick={() => setIsDestOpen(!isDestOpen)}
            className="w-full bg-white text-brand-deep rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm"
          >
            <span className="text-sm font-semibold">{destination}</span>
            <ChevronDown className={`w-4 h-4 text-brand-deep/50 transition-transform ${isDestOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isDestOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200 max-h-60 overflow-y-auto">
              {DESTINATIONS.map((dest) => (
                <div 
                  key={dest}
                  onClick={() => {
                    setDestination(dest);
                    setIsDestOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-brand-deep hover:text-white transition-colors ${
                    destination === dest ? "bg-brand-deep/10 text-brand-deep font-semibold" : "text-gray-700 font-medium"
                  }`}
                >
                  {dest}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div className="flex-1 w-full flex flex-col gap-1.5 relative">
          <div className="flex items-center justify-between pl-2 pr-1">
            <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider">
              {t.search.dates.split('/')[0] || "Ketish"}
            </label>
            <span className="bg-brand-deep/10 text-brand-deep text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider">± 3 kun</span>
          </div>
          <div className="w-full bg-white text-brand-deep rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
            <input 
              type="date" 
              className="w-full bg-transparent text-sm font-semibold outline-none text-brand-deep cursor-pointer" 
              defaultValue=""
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex-1 w-full flex flex-col gap-1.5 relative">
          <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider pl-2">
            {t.search.dates.split('/')[1] || "Qaytish"} (gacha)
          </label>
          <div className="w-full bg-white text-brand-deep rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
            <input 
              type="date" 
              className="w-full bg-transparent text-sm font-semibold outline-none text-brand-deep cursor-pointer" 
              defaultValue=""
            />
          </div>
        </div>

        {/* Passengers Dropdown */}
        <div className="flex-1 w-full flex flex-col gap-1.5 relative">
          <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider pl-2">
            {t.search.passengers}
          </label>
          <div className="w-full bg-white text-brand-deep rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm">
            <span className="text-sm font-semibold">Farqi yo'q</span>
            <ChevronDown className="w-4 h-4 text-brand-deep/50" />
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full lg:w-auto bg-brand-deep text-white hover:bg-brand hover:text-white transition-all px-8 py-3.5 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2 group shadow-lg h-[48px]">
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          {t.search.button}
        </button>

      </div>
    </div>
  );
}
