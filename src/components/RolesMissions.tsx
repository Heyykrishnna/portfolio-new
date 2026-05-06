"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const ROLES = [
  {
    id: "01",
    position: "Chief Technology Officer",
    company: "Creonity",
    brief: "Leading technical direction and translating brand strategy into scalable systems. Leading technical architecture and system maintenance while collaborating with design teams.",
    period: "Jul 2025 – Present"
  },
  {
    id: "02",
    position: "Technical Lead",
    company: "Neutron (Tech Fest)",
    brief: "Scaling technical infrastructure for high-traffic event management. Coordinating cross-functional engineering teams and optimizing real-time registration toolkits.",
    period: "Feb 2026 – Present"
  },
  {
    id: "03",
    position: "Lead Coordinator",
    company: "StartX-NST",
    brief: "Managing strategic planning for incubation programs. Coordinating events and workshops for budding entrepreneurs and building partnerships within the startup vertical.",
    period: "Nov 2025 – Present"
  },
  {
    id: "04",
    position: "Co-Founder",
    company: "DCODE",
    brief: "India's first student-led open-source initiative. Led operations, coordination, and execution across diverse teams, building a culture of open-source contribution.",
    period: "May 2025 – Present"
  },
  {
    id: "05",
    position: "Operations Lead",
    company: "Dev Club, NST",
    brief: "Owned cross-team coordination for community initiatives. Managed logistics for large-scale hackathons and workshops, strategic decision-making and outreach.",
    period: "Jan 2025 – Present"
  }
]

export default function RolesMissions() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal movement (0 to -X%)
  // Adjust the percentage based on the number of cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section id="roles-missions" className="relative bg-[#0a0a0a]">
      {/* 
        Scroll container that provides the "height" needed for scrolling.
      */}
      <div ref={targetRef} className="h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col px-6 md:px-10 lg:px-12 py-24 md:py-32 overflow-hidden">
          
          {/* Header - Perfectly Aligned with Education/About */}
          <div className="flex items-center justify-between w-full border-t border-zinc-900 pt-8 mb-16 md:mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="text-white">(05)</span>
            </div>
            <span className="uppercase tracking-[0.3em]">(Roles & Missions)</span>
          </div>

          <div className="mb-12 md:mb-20">
            <h2 className="text-[7vw] md:text-[5vw] font-black leading-none tracking-tighter text-white uppercase">
                Core <span className="text-zinc-800">&</span> Ventures
            </h2>
          </div>

          {/* Horizontal Scrolling Area */}
          <div className="grow flex items-center relative">
            <motion.div style={{ x }} className="flex gap-6 md:gap-8 lg:gap-12">
              {ROLES.map((role) => (
                <div 
                  key={role.id}
                  className="shrink-0 w-[85vw] font-bdoGrotesk sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-4/3 md:aspect-[1.4/1] bg-white rounded-xl p-10 md:p-14 flex flex-col shadow-2xl"
                >
                   <div className="flex flex-col gap-6 md:gap-8">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[24px] md:text-[32px] font-bold text-black leading-tight tracking-tight">
                            {role.position}
                        </h3>
                        <p className="text-[14px] md:text-[18px] text-zinc-500 font-semibold tracking-tight">
                            at {role.company}
                        </p>
                      </div>
                      
                      <div className="h-px bg-black/10 w-full" />

                      <p className="text-[16px] md:text-[19px] leading-[1.6] text-zinc-700 font-medium tracking-tight">
                        {role.brief}
                      </p>
                   </div>
                   
                   <div className="mt-auto flex items-center justify-between pt-8 border-t border-black/5">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Mission {role.id}</span>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">{role.period}</span>
                   </div>
                </div>
              ))}
              
              {/* Buffer space at the end */}
              <div className="shrink-0 w-[20vw]" />
            </motion.div>

            {/* Decorative Scroll Indicator (Inspired by the image) */}
            <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
                <div className="w-1.5 h-32 bg-zinc-900/50 rounded-full overflow-hidden">
                    <motion.div 
                        className="w-full bg-white" 
                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom section boundary */}
      <div className="h-px bg-zinc-900 mx-6 md:mx-10 lg:mx-12 mb-32" />
    </section>
  )
}
