"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Scale, FileText, Clock } from "lucide-react";

export default function LegalPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Legal & Compliance</h1>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
          State Tourism Committee Licensing Regulatory Disclosure (Requirement №9)
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          
          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{t.footer.licensee}</h3>
              <p className="text-xl font-semibold text-slate-800">OOO TripTour Group</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{t.footer.license}</h3>
              <p className="text-xl font-semibold text-slate-800">License № T-0123-45</p>
              <p className="text-slate-500 mt-1">Issued by the State Tourism Committee of Uzbekistan on 15.01.2023</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{t.footer.address}</h3>
              <p className="text-xl font-semibold text-slate-800">100000, Tashkent, Buyuk Ipak Yuli 48</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{t.footer.hours}</h3>
              <p className="text-xl font-semibold text-slate-800">24/7 Call Center Service</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
