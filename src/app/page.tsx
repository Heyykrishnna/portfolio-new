"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ProjectShowcase from "@/components/ProjectShowcase";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import RolesMissions from "@/components/RolesMissions";
import ImpactStats from "@/components/ImpactStats";
import Footer from "@/components/Footer";


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          const items = entry.target.querySelectorAll('.reveal-item, .reveal-word');
          items.forEach((item: any) => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        }
      });
    }, observerOptions);

    const revealTriggers = document.querySelectorAll('.reveal-trigger');
    revealTriggers.forEach(trigger => {
      // Clean up any existing style if re-running
      const items = trigger.querySelectorAll('.reveal-item, .reveal-word');
      items.forEach((item: any) => {
        if (trigger.classList.contains('revealed')) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
      observer.observe(trigger);
    });

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[200vh] w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Hero Section - Sticky/Fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
          <div className="w-full h-full bg-[#0a0a0a] relative">
            <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-orange-600/15 blur-[120px] rounded-full opacity-60" />
            <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full opacity-40" />
            <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full opacity-30" />
          </div>
        </div>

        <div className="relative z-20 flex flex-col h-full p-6 md:p-10 lg:p-12">
          <nav className="flex items-center justify-between w-full mb-auto">
            <div className="flex items-start gap-0.5 group cursor-pointer">
              <span className="text-[26px] font-black tracking-[-0.04em] uppercase leading-none">Fuel</span>
              <span className="text-[9px] font-bold translate-y-0.5">®</span>
            </div>
            <div className="hidden md:flex items-center gap-14 lg:gap-20">
              {["Home", "Portfolio", "About", "Contact"].map((label, i) => (
                <Link key={label} href={`#${label.toLowerCase()}`} className="group relative flex items-start gap-1 text-[11px] font-black tracking-[0.15em] uppercase transition-colors hover:text-white/70">
                  {label}
                  <span className="text-[7px] text-white/50 translate-y-[-3px] font-black group-hover:text-white">0{i+1}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center bg-white text-black p-1.5 pr-5 rounded-[4px] shadow-2xl">
              <div className="relative w-10 h-10 overflow-hidden rounded-[2px] mr-4">
                <Image src="/ceo-profile.png" alt="CEO" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[12px] font-black leading-tight tracking-tight">Meet the CEO</span>
                  <div className="w-[6px] h-[6px] bg-black ml-4" />
                </div>
                <span className="text-[11px] text-zinc-500 font-bold tracking-tight">Louisiana KD6</span>
                <span className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.2em] mt-0.5">CEO</span>
              </div>
            </div>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12 mb-auto">
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-10">
              <p className="text-[16px] md:text-[18px] leading-[1.45] font-bold text-white/90 tracking-tight">
                Pick a plan, submit a job request,<br />
                and your <span className="text-white">イメージ</span> will kickoff<br />
                within 24 hours.
              </p>
              <button className="group relative w-fit">
                <div className="flex items-center gap-6 pb-2 border-b-[1px] border-white/30 transition-all group-hover:border-white">
                  <span className="text-[15px] font-black tracking-tight uppercase">Explore Now</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-[-45deg] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-4">
              <div className="flex flex-col gap-1 text-[14px] font-black uppercase tracking-tight">
                <div className="flex items-center gap-2"><span className="text-white/30">01/</span><span>Strategy</span></div>
                <span className="ml-[34px] text-white/80">Videography</span>
                <span className="ml-[34px] text-white/80">Branding</span>
              </div>
              <div className="flex items-center gap-8 pb-4">
                <div className="text-[12px] font-black text-white/80">© 2025</div>
                <div className="flex items-end gap-[4px] h-10">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-[1px] transition-colors ${i === 7 ? 'h-10 bg-white/60' : (i === 0 || i === 11) ? 'h-4 bg-white/10' : 'h-3 bg-white/20'}`} />
                  ))}
                </div>
                <div className="text-[12px] font-black text-white/80">19°</div>
              </div>
            </div>
            <div className="relative w-full flex items-baseline justify-between select-none">
              <h2 className="text-[22vw] md:text-[25vw] font-black leading-[0.72] tracking-[-0.06em] uppercase text-white">Fuel</h2>
              <h2 className="text-[22vw] md:text-[25vw] font-black leading-[0.72] tracking-[-0.06em] uppercase text-transparent [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:5px_white]">X</h2>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section - Slides over Hero with a Slant */}
      <section 
        ref={aboutRef}
        className="relative z-50 bg-black text-white min-h-screen w-full px-6 md:px-10 lg:px-12 py-32 flex flex-col shadow-[0_-40px_100px_rgba(0,0,0,0.3)] mt-[15vh] [clip-path:polygon(0_15vh,100%_0,100%_100%,0%_100%)]"
      >
        <div className="flex items-center justify-between w-full border-t border-zinc-200 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-full bg-black" />
             <span className="text-black">(01)</span>
           </div>
           <span>(About Us)</span>
           <span>© 2025</span>
        </div>

        <div className="max-w-[95%] mb-40 overflow-hidden reveal-trigger">
           <h2 ref={headingRef} className="text-[6.2vw] md:text-[5vw] font-black leading-[1.0] tracking-[-0.05em] text-white">
             {["Design-forward", "impressive", "agency", "crafting", "bold", "visuals,", "structured", "layouts,", "and", "high-impact", "digital", "3D", "Swiss", "inspired", "by", "modern", "aesthetics®."].map((word, i) => (
               <span key={i} className="inline-block mr-[0.25em] transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0,0,1)] translate-y-[100%] opacity-0 reveal-word" style={{ transitionDelay: `${i * 35}ms` }}>
                 {word}
               </span>
             ))}
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 reveal-trigger">
          <div className="md:col-span-5 flex flex-col gap-10">
            <p className="text-[16px] md:text-[19px] font-bold leading-[1.5] text-white/60 transition-all duration-[1200ms] opacity-0 translate-y-12 reveal-item">
              At Fuel, we believe that design is not just about aesthetics, but about creating meaningful connections between brands and their audiences. Our approach combines technical precision with artistic intuition to deliver digital experiences that resonate.
            </p>
            <p className="text-[16px] md:text-[19px] font-bold leading-[1.5] text-white/80 transition-all duration-[1200ms] opacity-0 translate-y-12 delay-300 reveal-item">
              Based in the heart of creativity, we push the boundaries of what's possible in the digital realm, ensuring every pixel serves a purpose and every interaction tells a story.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-24">
            <div className="flex flex-col gap-6 transition-all duration-[1200ms] opacity-0 translate-y-12 delay-100 reveal-item">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">(Pre)</span>
              <p className="text-[14px] font-bold leading-[1.6] text-zinc-500">
                Igniting ideas with precision and intentional design. Fuel transforms raw creativity into structured visual systems that shape brands and elevate digital experiences.
              </p>
            </div>
            <div className="flex flex-col gap-6 transition-all duration-[1200ms] opacity-0 translate-y-12 delay-200 reveal-item">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">(+Post)</span>
              <p className="text-[14px] font-bold leading-[1.6] text-zinc-500">
                Driven by bold aesthetics and functional simplicity. Fuel blends modern form with purposeful detail, delivering refined experiences that push brands forward.
              </p>
            </div>
            <div className="sm:col-span-2 border-t border-zinc-100 pt-16 mt-6 transition-all duration-[1200ms] opacity-0 translate-y-12 delay-400 reveal-item">
               <div className="flex flex-col gap-8">
                 <div className="flex items-center justify-between pb-6 border-b border-zinc-50">
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">(=Results)</span>
                   <div className="flex flex-col items-end">
                      <span className="text-[12px] font-black uppercase text-zinc-400 tracking-tight">New clients</span>
                      <span className="text-[32px] font-black leading-none mt-1">15</span>
                   </div>
                 </div>
                 <div className="flex items-center justify-between pb-6">
                    <span className="text-white">.</span>
                    <div className="flex flex-col items-end">
                       <span className="text-[12px] font-black uppercase text-zinc-400 tracking-tight">Success rate</span>
                       <span className="text-[32px] font-black leading-none mt-1">100%</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Showcase Section */}
      <ProjectShowcase />

      {/* Skills Section */}
      <Skills />

      {/* White → Black diagonal transition */}
      <div className="relative z-40 bg-black" style={{ marginTop: "-2px" }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "80px", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,0 1440,0 1440,80" fill="white" />
        </svg>
      </div>

      {/* Education Section */}
      <Education />

      <RolesMissions />

      {/* Black → White diagonal transition */}
      <div className="relative z-40 bg-white" style={{ marginTop: "-2px" }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "80px", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,80 1440,80 1440,0" fill="black" />
        </svg>
      </div>

      <ImpactStats />

      <Footer />


      <style jsx global>{`
        body { margin: 0; padding: 0; background: black; overflow-x: hidden; }
        .reveal-word, .reveal-item { will-change: transform, opacity; }
        
        /* CSS Fallback for reveal triggers */
        .reveal-trigger.revealed .reveal-item,
        .reveal-trigger.revealed .reveal-word {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
