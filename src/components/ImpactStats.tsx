"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion"

const STATS = [
  {
    id: "01",
    target: 2,
    suffix: "+",
    decimals: 0,
    label: "Years Experience",
    brief: "Over two years of dedicated focus on building modern web applications and solving complex technical challenges."
  },
  {
    id: "02",
    target: 40,
    suffix: "+",
    decimals: 0,
    label: "Projects Completed",
    brief: "Successfully delivered diverse projects ranging from full-stack platforms to interactive games and system tools."
  },
  {
    id: "03",
    target: 150,
    suffix: "+",
    decimals: 0,
    label: "Problems Solved",
    brief: "A strong foundation in algorithmic problem-solving and technical research, ensuring robust and efficient solutions."
  },
  {
    id: "04",
    target: 5,
    suffix: "/5",
    decimals: 0,
    label: "Core Skill Mastery",
    brief: "Exceptional proficiency in modern technologies like React, JavaScript, and Python, delivering premium quality."
  }
]

function AnimatedNumber({ target, decimals, suffix }: { target: number; decimals: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(decimals > 0 ? "0.00" : "0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // easeOutQuart
        onUpdate: (value) => {
          setDisplayValue(value.toFixed(decimals))
        }
      })
      return () => controls.stop()
    }
  }, [isInView, target, decimals])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export default function ImpactStats() {
  return (
    <section id="impact" className="relative bg-white py-32 px-6 md:px-10 lg:px-12 flex flex-col">
      
      {/* Section Header */}
      <div className="flex items-center justify-between w-full border-t border-zinc-100 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-black" />
          <span className="text-black">(06)</span>
        </div>
        <span className="uppercase tracking-[0.3em] font-bold text-zinc-400">(Impact & Metrics)</span>
        <span className="uppercase tracking-[0.3em] font-bold text-zinc-400">Quantitative · Growth</span>
      </div>

      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-24">
          {STATS.map((stat) => (
            <div key={stat.id} className="relative group border-t border-zinc-100 pt-12 flex flex-col gap-8">
              {/* Corner Bracket */}
              <div className="absolute top-0 right-0 w-3 h-3 border-r-[1.5px] border-t-[1.5px] border-black opacity-30 group-hover:opacity-100 transition-opacity" />
              
              {/* Animated Value */}
              <h3 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-bold leading-none tracking-[-0.07em] text-black uppercase">
                <AnimatedNumber target={stat.target} decimals={stat.decimals} suffix={stat.suffix} />
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
