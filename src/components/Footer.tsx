"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Plane, ArrowRight } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-brand-deep text-white rounded-card-lg mt-3 px-6 py-14 sm:px-10 sm:py-16">
      {/* CTA Band */}
      <div className="border-b border-white/15 pb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/70 mb-4">
            <span className="w-1.5 h-1.5 rounded-pill bg-brand-light"></span>
            Get started
          </div>
          <p className="text-5xl sm:text-6xl font-medium leading-[0.92] tracking-tight">
            Ready to <br /> travel?
          </p>
        </div>
        
        <button className="inline-flex items-center gap-2 rounded-pill bg-white text-brand-deep px-7 py-3.5 text-sm font-medium uppercase tracking-wide hover:bg-brand-light hover:text-white transition-colors group">
          {t.tour.bookNow}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
        </button>
      </div>

      {/* Columns Grid */}
      <div className="py-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div className="max-w-[20rem]">
          <div className="flex items-center gap-2 text-lg font-medium uppercase tracking-[0.2em] mb-4">
            <Plane className="w-5 h-5 text-brand" />
            <span>Voya Travel</span>
          </div>
          <p className="text-sm text-white/65 mb-6">
            A premium travel aggregator bringing you the finest global holiday experiences from Tashkent.
          </p>
          <address className="not-italic text-sm text-white/80 flex flex-col gap-1">
            <a href="mailto:booking@voyatravel.uz" className="hover:text-white transition-colors">booking@voyatravel.uz</a>
            <a href="tel:+12125550148" className="hover:text-white transition-colors">+998 (71) 123-45-67</a>
            <span className="text-white/55 mt-1 block">100000, Tashkent, Buyuk Ipak Yuli 48</span>
          </address>
        </div>

        <nav className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2">Destinations</h3>
          <a href="#tours" className="text-sm text-white/80 hover:text-white transition-colors">Dubai, UAE</a>
          <a href="#tours" className="text-sm text-white/80 hover:text-white transition-colors">Antalya, Turkey</a>
          <a href="#tours" className="text-sm text-white/80 hover:text-white transition-colors">Sharm El Sheikh, Egypt</a>
          <a href="#tours" className="text-sm text-white/80 hover:text-white transition-colors">Tbilisi, Georgia</a>
        </nav>

        <nav className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2">Company</h3>
          <a href="/legal" className="text-sm text-white/80 hover:text-white transition-colors">About Us</a>
          <a href="/legal" className="text-sm text-white/80 hover:text-white transition-colors">Careers</a>
          <a href="#contact" className="text-sm text-white/80 hover:text-white transition-colors">Contact</a>
        </nav>
        
        {/* Requirement №9 Metadata */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2">Compliance</h3>
          <span className="text-sm text-white/80 font-bold">OOO Voya Travel Group</span>
          <span className="text-sm text-brand-light">License № T-0123-45</span>
          <span className="text-xs text-white/55 leading-relaxed">Issued by the State Tourism Committee of Uzbekistan</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-5 text-sm text-white/60">
        <p>© 2026 Voya Travel Group. All rights reserved.</p>
        
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">X</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        
        <div className="flex items-center gap-5">
          <a href="/legal" className="hover:text-white transition-colors">Privacy</a>
          <a href="/legal" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
