"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, Check } from "lucide-react";

export default function CallRequestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Shahringiz (eng yaqin ofis uchun)",
    agreed: false
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-deep/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-[440px] bg-white rounded-3xl text-brand-deep p-8 animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-2xl">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 group flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 group-hover:text-brand-deep transition-colors" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Arizangiz qabul qilindi</h3>
            <p className="text-gray-600 mb-8">We will get back to you in 10 minutes</p>
            <button 
              onClick={onClose}
              className="w-full rounded-xl bg-brand-deep text-white px-7 py-3.5 font-bold hover:bg-brand-deep/90 transition-colors"
            >
              Yopish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            
            <div className="relative">
              <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 py-3.5 text-sm text-brand-deep placeholder:text-gray-400 focus:outline-none focus:border-brand-deep focus:ring-1 focus:ring-brand-deep transition-shadow"
                placeholder="Ismingiz"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 py-3.5 text-sm text-brand-deep placeholder:text-gray-400 focus:outline-none focus:border-brand-deep focus:ring-1 focus:ring-brand-deep transition-shadow"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <p className="text-[11px] text-gray-500 mb-1.5 ml-1">Shahringizni tanlang — eng yaqin ofis qo'ng'iroq qiladi</p>
              <select
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-brand-deep focus:outline-none focus:border-brand-deep focus:ring-1 focus:ring-brand-deep transition-shadow appearance-none cursor-pointer"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                <option value="Shahringiz (eng yaqin ofis uchun)">Shahringiz (eng yaqin ofis uchun)</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Andijon">Andijon</option>
              </select>
            </div>

            <button type="button" className="text-left text-sm font-semibold text-purple-700 hover:text-purple-800 ml-1">
              + Izoh qo'shish
            </button>

            <div className="flex items-start gap-3 mt-2">
              <input 
                type="checkbox" 
                id="agreement" 
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-deep focus:ring-brand-deep cursor-pointer"
                checked={formData.agreed}
                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              />
              <label htmlFor="agreement" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                Ariza yuborish bilan shaxsiy ma'lumotlarim qayta ishlanishiga roziman. <a href="#" className="text-purple-700 underline decoration-purple-700/30 underline-offset-2">Maxfiylik siyosati</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "submitting" || !formData.agreed}
              className="mt-2 w-full rounded-xl bg-purple-800 text-white px-7 py-3.5 font-bold hover:bg-purple-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Yuborilmoqda..." : "Yuborish"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">Yoki bizga qo'ng'iroq qiling</p>
              <a href="tel:+998785557788" className="inline-flex items-center gap-2 text-purple-800 font-bold text-lg hover:text-purple-900">
                <Phone className="w-5 h-5" />
                +998785557788
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
