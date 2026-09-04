"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BookingModal({
  isOpen,
  onClose,
  tour,
}: {
  isOpen: boolean;
  onClose: () => void;
  tour: any;
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    flightClass: "economy",
    flightType: "round",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      setTimeout(() => setStatus("idle"), 350); 
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          destination: tour?.destination ? `${tour.destination.town}, ${tour.destination.name}` : "General Inquiry",
          hotelName: tour?.hotel?.name || "Unknown Hotel",
          price: tour?.package?.pricePerPax || 0,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-deep/20 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-lg max-h-[92svh] overflow-y-auto luxury-glass-deep rounded-card-lg text-brand-deep p-6 sm:p-8 animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-light mb-2">
              <span className="w-1.5 h-1.5 rounded-pill bg-brand-light"></span>
              Book a visit
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[0.92] tracking-tight text-brand-deep">
              {t.booking.title || "Reserve your spot"}
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-brand-deep/5 hover:bg-brand-deep transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-brand-deep transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:text-white" />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-8 bg-brand-deep/5 rounded-card p-6 text-center border border-brand-deep/10 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-brand-deep mb-1">{t.booking.success}</h3>
            <p className="text-sm text-brand-deep/70 mb-6 font-medium">
              Thanks, {formData.fullName.split(' ')[0] || 'there'} — our team will be in touch to lock in your booking.
            </p>
            <button 
              onClick={onClose}
              className="rounded-pill bg-brand-deep text-white px-7 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brand transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-deep/60 mb-2">
                {t.booking.fullName}
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-brand-deep/20 bg-white px-4 py-3 text-sm font-semibold text-brand-deep placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-shadow"
                placeholder="Alex Rivera"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-deep/60 mb-2">
                {t.booking.phone}
              </label>
              <input
                type="tel"
                required
                className="w-full rounded-xl border border-brand-deep/20 bg-white px-4 py-3 text-sm font-semibold text-brand-deep placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-shadow"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-deep/60 mb-2">
                  {t.booking.flightClass}
                </label>
                <select
                  className="w-full rounded-xl border border-brand-deep/20 bg-white px-4 py-3 text-sm font-semibold text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand transition-shadow"
                  value={formData.flightClass}
                  onChange={(e) => setFormData({ ...formData, flightClass: e.target.value })}
                >
                  <option value="economy">{t.booking.economy}</option>
                  <option value="business">{t.booking.business}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-deep/60 mb-2">
                  {t.booking.flightType}
                </label>
                <select
                  className="w-full rounded-xl border border-brand-deep/20 bg-white px-4 py-3 text-sm font-semibold text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand transition-shadow"
                  value={formData.flightType}
                  onChange={(e) => setFormData({ ...formData, flightType: e.target.value })}
                >
                  <option value="charter">{t.booking.charter}</option>
                  <option value="scheduled">{t.booking.scheduled}</option>
                </select>
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm font-medium">{t.booking.error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full rounded-pill bg-brand-deep text-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-brand transition-colors disabled:opacity-70 flex justify-center"
            >
              {status === "submitting" ? t.booking.submitting : t.booking.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
