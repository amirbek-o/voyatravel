"use client";

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

export default function CurtainLoader({ onReady }: { onReady: () => void }) {
  const [stage, setStage] = useState<"loading" | "ready" | "exiting" | "hidden">("loading");

  useEffect(() => {
    // Simulate initial loading time (minimum visible time)
    const minVisibleMs = 1400;
    
    const timer = setTimeout(() => {
      setStage("ready");
      onReady(); // Trigger the hero animations to start
      
      // After a short delay, lift the curtain
      setTimeout(() => {
        setStage("exiting");
        
        // Hide completely after exit animation finishes
        setTimeout(() => setStage("hidden"), 850);
      }, 100);
      
    }, minVisibleMs);
    
    return () => clearTimeout(timer);
  }, [onReady]);

  if (stage === "hidden") return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-indigo-950 flex flex-col items-center justify-center text-white transition-transform duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        stage === "exiting" ? "-translate-y-[105%]" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-700 ease-out">
          <Plane className="w-8 h-8 text-brand" />
          <span className="text-3xl font-bold uppercase tracking-[0.2em] text-white">
            Voya Travel
          </span>
        </div>
        
        {/* Progress track */}
        <div className="w-40 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white origin-left transition-transform duration-[1280ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ 
              transform: stage === "loading" ? "scaleX(0)" : "scaleX(1)",
              transitionDelay: "120ms"
            }}
          />
        </div>
      </div>
    </div>
  );
}
