"use client";

import { useLanguage } from "@/context/LanguageContext";
import TourCard from "@/components/TourCard";
import CurtainLoader from "@/components/CurtainLoader";
import SearchWizard from "@/components/SearchWizard";
import BlueprintSection from "@/components/BlueprintSection";
import ContinuousMarquee from "@/components/ContinuousMarquee";
import { useState, useEffect } from "react";
import { Globe, Tag, Headset, Shield, PlaneTakeoff, Building2, CalendarCheck, Mail, Phone, MapPin as MapPinIcon, Clock, User } from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const [toursData, setToursData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/tours?lang=${language}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setToursData(json.data);
        }
      })
      .catch(err => console.error("Failed to fetch tours:", err));
  }, [language]);

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
            <h1 className="text-[14vw] md:text-[8vw] font-bold text-white leading-[0.85] tracking-tight mb-8">
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
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">{t.search.title}</h2>
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

        {/* Continuous Marquee */}
        <section className="w-full relative z-10 py-16">
          <ContinuousMarquee tours={toursData} />
        </section>

        {/* Nima uchun Voya Section */}
        <section id="about" className="py-16 relative z-10 bg-brand-deep/30 backdrop-blur-lg border-y border-white/5 mt-4 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-left tracking-tight border-b border-white/20 pb-4">Nima uchun Voya?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-white/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-medium text-sm md:text-base leading-snug">Eng yaxshi<br/>yo'nalishlar</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-white/10 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-medium text-sm md:text-base leading-snug">Qulay narxlar<br/>va aksiyalar</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-white/10 flex items-center justify-center">
                  <Headset className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-medium text-sm md:text-base leading-snug">24/7 qo'llab-<br/>quvvatlash</p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-white/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-medium text-sm md:text-base leading-snug">Ishonchli va<br/>xavfsiz xizmat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">{(t.nav as any).services || "Xizmatlar"}</h2>
              <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Turlar", icon: Globe, desc: "Dunyo bo'ylab unutilmas sayohatlar" },
                { title: "Aviachiptalar", icon: PlaneTakeoff, desc: "Hamyonbop va qulay parvozlar" },
                { title: "Mehmonxonalar", icon: Building2, desc: "Eng yaxshi mehmonxonalarni band qilish" },
                { title: "To'liq Tashkil Qilish", icon: CalendarCheck, desc: "Hujjatlar va sug'urta xizmatlari" },
              ].map((service, i) => (
                <div key={i} className="group bg-brand-deep/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-brand hover:border-brand shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-[#FFF2E2]/70 group-hover:text-white/90 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tours Grid Section */}
        <section id="destinations" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">{t.nav.tours}</h2>
              <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {toursData.map((tour, index) => (
                <TourCard key={index} tour={tour} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contacts" className="py-24 relative z-10 bg-brand-deep border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">{(t.nav as any).contacts || "Aloqa"}</h2>
              <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 bg-white/5 p-6 md:p-10 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex-1 flex flex-col justify-center text-white">
                <h3 className="text-2xl font-bold mb-6 text-brand">VOYA TRAVEL</h3>
                <p className="text-[#FFF2E2]/80 mb-10 leading-relaxed max-w-md text-lg">
                  {(t as any).contactsBlock?.desc || "Oʻzbekistondagi turizm agentligi. Turlar, aviachiptalar, mehmonxonalar va sayohatni to‘liq tashkil qilish."}
                </p>
                
                <div className="space-y-6">
                  {/* Address */}
                  <a href="https://maps.app.goo.gl/KLNB1soraRsxwFrM8?g_st=it" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-brand/40">
                      <MapPinIcon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-1 text-sm uppercase tracking-wider group-hover:text-brand transition-colors">{(t as any).contactsBlock?.address || "Manzil"}</h4>
                      <p className="text-[#FFF2E2]/70 leading-snug group-hover:text-white transition-colors">GULISTON SH BIRLASHGAN SHOX K 9/1</p>
                    </div>
                  </a>
                  
                  {/* Email */}
                  <a href="mailto:voyatraveluz@gmail.com" className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-brand/40">
                      <Mail className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-1 text-sm uppercase tracking-wider group-hover:text-brand transition-colors">{(t as any).contactsBlock?.email || "Email"}</h4>
                      <p className="text-[#FFF2E2]/70 group-hover:text-white transition-colors">voyatraveluz@gmail.com</p>
                    </div>
                  </a>
                  
                  {/* Whatsapp */}
                  <a href="https://wa.me/998999923325" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-brand/40">
                      <Phone className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-1 text-sm uppercase tracking-wider group-hover:text-brand transition-colors">{(t as any).contactsBlock?.whatsapp || "Whatsapp"} & {(t as any).contactsBlock?.telegram || "Telegram"}</h4>
                      <p className="text-[#FFF2E2]/70 group-hover:text-white transition-colors">+998 99 992 33 25</p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-all duration-300 shadow-md">
                      <Clock className="w-5 h-5 text-brand group-hover:text-brand-light transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-1 text-sm uppercase tracking-wider">{(t as any).contactsBlock?.hours || "Ish vaqti"}</h4>
                      <p className="text-[#FFF2E2]/70">08:00 - 20:00</p>
                    </div>
                  </div>

                  {/* Director */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-all duration-300 shadow-md">
                      <User className="w-5 h-5 text-brand group-hover:text-brand-light transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/90 mb-1 text-sm uppercase tracking-wider">{(t as any).contactsBlock?.director || "Direktor"}</h4>
                      <p className="text-[#FFF2E2]/70">AKRAMOV TOKHIRJON ABROR OG'LI</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="flex-[1.2] min-h-[400px] rounded-[2rem] overflow-hidden border border-white/10 relative group shadow-2xl">
                <div className="absolute inset-0 bg-brand-deep/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-10" />
                <a href="https://maps.app.goo.gl/KLNB1soraRsxwFrM8?g_st=it" target="_blank" rel="noopener noreferrer" className="absolute top-4 left-4 z-20 bg-brand hover:bg-brand/90 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl hover:scale-105 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> Open in Maps
                </a>
                <iframe 
                  src="https://maps.google.com/maps?q=40.523444,68.779778&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
