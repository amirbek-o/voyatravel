"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState, useRef } from "react";

export default function BlueprintSection() {
  const { t } = useLanguage();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative max-w-7xl mx-auto px-4 z-10">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-8">
        
        {/* Step 1 */}
        <div 
          className={`flex-1 luxury-glass rounded-[2rem] p-8 flex flex-col transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="text-6xl text-brand/10 font-bold leading-none mb-4 tracking-tighter">01</div>
          <p className="text-xl md:text-2xl font-serif text-brand-deep leading-snug">
            {t.blueprint.step1.split('—').map((part, i) => (
              i === 0 ? <span key={i} className="font-bold block mb-2">{part}—</span> : <span key={i} className="text-ink-soft text-base md:text-lg block">{part}</span>
            ))}
          </p>
        </div>

        {/* Step 2 */}
        <div 
          className={`flex-1 luxury-glass rounded-[2rem] p-8 flex flex-col transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "250ms" }}
        >
          <div className="text-6xl text-brand/10 font-bold leading-none mb-4 tracking-tighter">02</div>
          <p className="text-xl md:text-2xl font-serif text-brand-deep leading-snug">
            {t.blueprint.step2.split('—').map((part, i) => (
              i === 0 ? <span key={i} className="font-bold block mb-2">{part}—</span> : <span key={i} className="text-ink-soft text-base md:text-lg block">{part}</span>
            ))}
          </p>
        </div>

        {/* Step 3 */}
        <div 
          className={`flex-1 luxury-glass rounded-[2rem] p-8 flex flex-col transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="text-6xl text-brand/10 font-bold leading-none mb-4 tracking-tighter">03</div>
          <p className="text-xl md:text-2xl font-serif text-brand-deep leading-snug">
            {t.blueprint.step3.split('—').map((part, i) => (
              i === 0 ? <span key={i} className="font-bold block mb-2">{part}—</span> : <span key={i} className="text-ink-soft text-base md:text-lg block">{part}</span>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
}
