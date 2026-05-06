"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 z-10" />
        {/* The user mentioned there will be an image, so we use a placeholder or the actual one if provided */}
        <div className="w-full h-full bg-[#0a0a0a] relative">
          {/* Decorative red/blue glows to mimic the lighting in the image */}
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-orange-600/15 blur-[120px] rounded-full opacity-60" />
          <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full opacity-40" />
          <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full opacity-30" />
        </div>
      </div>

      {/* Main UI Layer */}
      <div className="relative z-20 flex flex-col min-h-screen p-6 md:p-10 lg:p-12">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between w-full mb-auto">
          {/* Logo */}
          <div className="flex items-start gap-0.5 group cursor-pointer">
            <span className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none">Fuel</span>
            <span className="text-[9px] font-bold translate-y-0.5">®</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-14 lg:gap-20">
            {[
              { label: "Home", num: "01" },
              { label: "Portfolio", num: "02" },
              { label: "About", num: "03" },
              { label: "Contact", num: "04" },
            ].map((item) => (
              <Link
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className="group relative flex items-start gap-1 text-[11px] font-black tracking-[0.15em] uppercase transition-colors hover:text-white/70"
              >
                {item.label}
                <span className="text-[7px] text-white/50 translate-y-[-3px] font-black group-hover:text-white">
                  {item.num}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Hero Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12 mb-auto">
          
          {/* Left Column: Intro Text */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-10">
            <p className="text-[16px] md:text-[18px] leading-[1.45] font-bold text-white/90 tracking-tight">
              Pick a plan, submit a job request,<br />
              and your <span className="text-white">イメージ</span> will kickoff<br />
              within 24 hours.
            </p>

            <button className="group relative w-fit">
              <div className="flex items-center gap-6 pb-2 border-b border-white/30 transition-all group-hover:border-white">
                <span className="text-[15px] font-black tracking-tight uppercase">Explore Now</span>
                <div className="relative w-3 h-3">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Decorative Plus Signs */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
             <div className="absolute top-[55%] left-[55%] text-white/60 text-2xl font-light">+</div>
             <div className="absolute top-[48%] right-[15%] text-white/60 text-2xl font-light">+</div>
             <div className="absolute bottom-[35%] left-[40%] text-white/60 text-2xl font-light">+</div>
             <div className="absolute bottom-[35%] right-[28%] text-white/60 text-2xl font-light">+</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-4">
            {/* Service List */}
            <div className="flex flex-col gap-1 text-[14px] font-black uppercase tracking-tight">
              <div className="flex items-center gap-2">
                <span className="text-white/30">01/</span>
                <span>Strategy</span>
              </div>
              <span className="ml-[34px] text-white/80">Videography</span>
              <span className="ml-[34px] text-white/80">Branding</span>
            </div>
            
            {/* Footer Left: Copyright and Gauge */}
            <div className="flex items-center gap-8 pb-4">
              <div className="text-[12px] font-black text-white/80">© 2025</div>
              <div className="flex items-end gap-[4px] h-10">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-px transition-colors ${i === 7 ? 'h-10 bg-white/60' : (i === 0 || i === 11) ? 'h-4 bg-white/10' : 'h-3 bg-white/20'}`} 
                  />
                ))}
              </div>
              <div className="text-[12px] font-black text-white/80">19°</div>
            </div>
          </div>

          {/* Huge Logo "FUEL X" */}
          <div className="relative w-full flex items-baseline justify-between select-none">
            <h2 className="text-[22vw] md:text-[25vw] font-black leading-[0.72] tracking-[-0.06em] uppercase text-white">
              Fuel
            </h2>
            <h2 className="text-[22vw] md:text-[25vw] font-black leading-[0.72] tracking-[-0.06em] uppercase text-transparent [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:5px_white]">
              X
            </h2>
          </div>
        </div>

      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: black;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
