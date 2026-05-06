"use client"

import { motion } from "framer-motion"

const STATS = [
  {
    id: "01",
    value: "2.06M",
    label: "Global Impressions",
    brief: "Fuel moves beyond simple authenticity, creating refined systems that shape digital presence."
  },
  {
    id: "02",
    value: "160K",
    label: "Community Reach",
    brief: "Elevating identity with structured clarity. Fuel crafts experiences that extend far beyond visual form."
  },
  {
    id: "03",
    value: "750+",
    label: "Creative Hours Logged",
    brief: "Through precision and intention, Fuel transforms ideas into cohesive narratives that define brands."
  },
  {
    id: "04",
    value: "257+",
    label: "Projects Completed",
    brief: "Blending modern aesthetics with functional design, Fuel delivers refined solutions that push brands."
  }
]

export default function ImpactStats() {
  return (
    <section id="impact" className="relative bg-white py-32 px-6 md:px-10 lg:px-12 flex flex-col">
      
      {/* Section Header - Consistent with Part 05 */}
      <div className="flex items-center justify-between w-full border-t border-zinc-100 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-black" />
          <span className="text-black">(06)</span>
        </div>
        <span className="uppercase tracking-[0.3em]">(Impact & Metrics)</span>
        <span className="uppercase tracking-[0.3em]">Quantitative · Growth</span>
      </div>

      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-24">
          {STATS.map((stat) => (
            <div key={stat.id} className="relative group border-t border-zinc-100 pt-12 flex flex-col gap-8">
              {/* Corner Bracket - Exactly like image */}
              <div className="absolute top-0 right-0 w-3 h-3 border-r-[1.5px] border-t-[1.5px] border-black opacity-30 group-hover:opacity-100 transition-opacity" />
              
              {/* Large Value - Impactful and Bold */}
              <h3 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-bold leading-none tracking-[-0.07em] text-black uppercase">
                {stat.value}
              </h3>
              
              <div className="flex flex-col gap-4 max-w-md">
                <h4 className="text-[16px] md:text-[18px] font-bold text-black tracking-tight">
                    {stat.label}
                </h4>
                <p className="text-[14px] md:text-[16px] font-medium leading-[1.6] text-zinc-500 tracking-tight">
                    {stat.brief}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
