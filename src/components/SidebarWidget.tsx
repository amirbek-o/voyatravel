"use client";

import { useState } from "react";
import { PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CallRequestModal from "./CallRequestModal";

export default function SidebarWidget() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start hidden xl:flex">
        {/* Contact Block */}
        <div className="bg-brand-deep border border-gold/30 border-l-0 rounded-r-2xl shadow-[0_0_20px_rgba(15,47,99,0.3)] backdrop-blur-md p-4 flex flex-col gap-3 group transition-transform duration-300 hover:translate-x-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/30 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-0.5">
                {t.sidebar.callUs}
              </p>
              <a href="tel:+998999923325" className="text-white font-bold tracking-wide hover:text-gold transition-colors">
                +998 99 992 33 25
              </a>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 bg-gold text-brand-deep font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-white transition-colors"
          >
            {t.sidebar.callRequest}
          </button>
        </div>
      </div>
      
      <CallRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
