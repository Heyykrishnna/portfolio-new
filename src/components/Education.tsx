"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const MILESTONES = [
  {
    year: "2024", phase: "The Beginning", sub: "Foundations & first code",
    status: "Completed",
    body: "Stepped into Newton School of Technology with zero real-world code shipped. By year-end — production projects live, Dev Club joined, and a solid framework for building things properly.",
    tags: ["CS Fundamentals", "Dev Club NST", "First Production Code"],
  },
  {
    year: "2025", phase: "Building Velocity", sub: "40+ projects, 2 ventures",
    status: "Completed",
    body: "The year everything accelerated. Shipped across every major stack, co-founded DCODE — India's first student-led open-source initiative — and stepped into the CTO seat at Creonity.",
    tags: ["40+ Projects Shipped", "DCODE Co-Founder", "CTO @ Creonity", "Open Source"],
  },
  {
    year: "2026", phase: "Deep Expertise", sub: "AI/ML · System Design",
    status: "In Progress",
    body: "Shifting from building fast to building right. Deep focus on AI/ML integration, distributed system design, and architecture that holds under real-world pressure. Currently here.",
    tags: ["AI / ML Integration", "System Design", "Tech Lead @ Neutron", "StartX-NST"],
  },
  {
    year: "2027", phase: "Capstone Phase", sub: "Thesis · Internship",
    status: "Upcoming",
    body: "Deep research on AI Product Systems becomes the year's thesis. Industry internship converts academic knowledge into global-scale practice. The bridge between student and professional builder.",
    tags: ["AI Product Systems", "Industry Internship", "Research Thesis"],
  },
  {
    year: "2028", phase: "Graduation", sub: "B.Tech CS & AI complete",
    status: "Upcoming",
    body: "Completion of B.Tech in Computer Science & Artificial Intelligence at Newton School of Technology. A portfolio of real systems, a network of builders, and a clear vision for what's next.",
    tags: ["B.Tech CS & AI", "Newton School of Technology", "Full Portfolio"],
  },
]

const STATUS_COLORS: Record<string, string> = {
  "Completed":   "#6ee7b7",
  "In Progress": "#facc15",
  "Upcoming":    "#3f3f46",
}

/* ── SVG Radial Dial ── */
function RadialDial({ activeIndex }: { activeIndex: number }) {
  const cx = 300, cy = 300
  const R = 255          // larger tick outer radius
  const TOTAL = 150      // more ticks for denser ring
  const PER   = TOTAL / MILESTONES.length  // 30 ticks per segment
  const CENTER_R = 72

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />

      {/* Tick marks — cumulative & uneven lengths */}
      {Array.from({ length: TOTAL }, (_, i) => {
        const seg = Math.floor(i / PER)
        const isCumulative = seg <= activeIndex
        const isCurrentSeg = seg === activeIndex
        
        // Define uneven rhythm: every 10th is major, every 5th is minor, others are small
        const isMajor = i % 10 === 0
        const isMinor = i % 5 === 0
        
        let baseLen = isMajor ? 34 : isMinor ? 24 : 14
        if (!isCumulative) baseLen *= 0.6 // Shorter for future segments
        if (isCurrentSeg) baseLen *= 1.1  // Slightly longer for active segment

        const deg = -90 + (i / TOTAL) * 360
        const rad = (deg * Math.PI) / 180
        
        const x1 = cx + (R - baseLen) * Math.cos(rad)
        const y1 = cy + (R - baseLen) * Math.sin(rad)
        const x2 = cx + R * Math.cos(rad)
        const y2 = cy + R * Math.sin(rad)
        
        const strokeColor = isCumulative
          ? isCurrentSeg
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.55)"
          : "rgba(255,255,255,0.10)"
          
        const sw = isMajor ? 2.5 : isMinor ? 2.5 : 2.5
        
        return (
          <line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            style={{
              stroke: strokeColor,
              strokeWidth: isCumulative ? sw : sw * 0.5,
              transition: "stroke 0.5s ease, stroke-width 0.5s ease, x1 0.5s ease, y1 0.5s ease",
            }}
          />
        )
      })}

      {/* Year labels around ring */}
      {MILESTONES.map((m, i) => {
        const deg = -90 + (i + 0.5) * (360 / MILESTONES.length)
        const rad = (deg * Math.PI) / 180
        const lr = R + 38
        const x = cx + lr * Math.cos(rad)
        const y = cy + lr * Math.sin(rad)
        const isActive = i === activeIndex
        return (
          <text
            key={m.year} x={x} y={y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={isActive ? "13" : "11"}
            fontWeight={isActive ? "900" : "400"}
            style={{
              fill: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.22)",
              transition: "fill 0.5s ease, font-size 0.5s ease",
              fontFamily: "inherit",
              letterSpacing: "1px",
            }}
          >
            {m.year}
          </text>
        )
      })}

      <circle cx={cx} cy={cy} r={CENTER_R} fill="#0d0d0d" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <text x={cx} y={cy - 9} textAnchor="middle" fontSize="10" letterSpacing="2"
        style={{ fill: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>
        {MILESTONES[activeIndex].year}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="12" fontWeight="bold"
        style={{ fill: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}>
        {MILESTONES[activeIndex].phase}
      </text>
    </svg>
  )
}

/* ── Left accordion row ── */
function MilestoneRow({
  m, isActive, onClick,
}: {
  m: (typeof MILESTONES)[0]
  isActive: boolean
  onClick: () => void
}) {
  const dot = STATUS_COLORS[m.status] ?? "#3f3f46"
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-b border-zinc-900 transition-colors duration-300 ${isActive ? "bg-zinc-900/70" : "hover:bg-zinc-900/30"}`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
            <span className={`text-[14px] font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500"}`}>
              {m.phase}
            </span>
          </div>
          <span className={`text-[11px] pl-4 font-medium transition-colors duration-300 ${isActive ? "text-zinc-400" : "text-zinc-700"}`}>
            {m.sub}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-[10px] tracking-[0.3em] text-zinc-700 font-bold">{m.year}</span>
          <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={isActive ? "#ffffff" : "#52525b"} strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 flex flex-col gap-4 border-l-2 border-white/10 ml-5">
              <p className="text-[13px] leading-[1.75] text-zinc-400 font-medium">
                {m.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.tags.map(tag => (
                  <span key={tag}
                    className="text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 border border-zinc-800 text-zinc-500 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Split Reveal Heading Component ── */
function ScrollHeading({ text1, text2 }: { text1: string; text2: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const words1 = text1.split(" ")
  const words2 = text2.split(" ")

  return (
    <div ref={ref} className="mb-40 max-w-[90%] md:max-w-[85%]">
      <h2 className="text-[5.5vw] md:text-[4.5vw] font-semibold leading-[1.1] tracking-[-0.04em]">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em] text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.03, ease: [0.2, 0, 0, 1] }}
          >
            {word}
          </motion.span>
        ))}
        {words2.map((word, i) => (
          <motion.span
            key={i + words1.length}
            className="inline-block mr-[0.25em] text-zinc-500"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: (i + words1.length) * 0.03, ease: [0.2, 0, 0, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  )
}

/* ── Main export ── */
export default function Education() {
  const [active, setActive] = useState(0)
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { once: true, amount: 0.5 })

  const headingText1 = "Structured for growth. A timeline of milestones, technical depth, and product vision"
  const headingText2 = "at Newton School of Technology, from foundations to architecting distributed systems."

  const bottomText = "Graduating with a robust portfolio of real-world products and a network of industry leaders. Ready to shape the future of technology."

  return (
    <section id="education" className="relative bg-[#0a0a0a] text-white px-6 md:px-10 lg:px-12 py-32 flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between w-full border-t border-zinc-900 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="text-white">(04)</span>
        </div>
        <span>(The Learning Journey)</span>
        <span>2024 — 2028</span>
      </div>

      {/* Heading with scroll reveal */}
      <ScrollHeading text1={headingText1} text2={headingText2} />

      {/* Split layout (The "Skills" part as requested) */}
      <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] min-h-screen border-t border-zinc-900 pt-20">

        {/* LEFT: Accordion */}
        <div className="flex flex-col md:border-r border-zinc-900 pr-0 md:pr-10">
          <div className="pb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold mb-4">
              B.Tech · CS & AI
            </p>
            <h3 className="text-[32px] font-semibold tracking-tight text-white leading-tight mb-4">
              Milestones
            </h3>
            <p className="text-[14px] text-zinc-500 font-medium max-w-xs">
              A chronological evolution of skill acquisition and product implementation.
            </p>
          </div>

          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.year}
                m={m}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Radial Dial */}
        <div className="relative flex flex-col items-center justify-center p-8 md:p-16 min-h-[60vh] md:min-h-0">
          <div className="absolute top-8 left-8">
            <p className="text-[14px] font-semibold text-white uppercase tracking-tight">{MILESTONES[active].phase}</p>
            <p className="text-[10px] text-zinc-600 mt-1 tracking-widest uppercase font-bold">{MILESTONES[active].status}</p>
          </div>
          <div className="absolute top-8 right-8 text-right">
            <p className="text-[10px] tracking-widest text-zinc-600 uppercase font-bold">Timeline Segment</p>
          </div>

          <div className="w-full max-w-[620px] aspect-square">
            <RadialDial activeIndex={active} />
          </div>
        </div>

      </div>

      {/* Bottom text with scroll reveal */}
      <div ref={bottomRef} className="flex justify-end">
        <div className="max-w-xl text-right">
           <h4 className="text-[24px] md:text-[32px] font-semibold leading-[1.3] tracking-tight">
             {bottomText.split(" ").map((word, i) => (
               <motion.span
                 key={i}
                 className={`inline-block mr-[0.25em] ${i < 8 ? 'text-white' : 'text-zinc-500'}`}
                 initial={{ opacity: 0, x: 20 }}
                 animate={isBottomInView ? { opacity: 1, x: 0 } : {}}
                 transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
               >
                 {word}
               </motion.span>
             ))}
           </h4>
           <motion.div 
             className="w-full h-px bg-zinc-800 mt-10 origin-right"
             initial={{ scaleX: 0 }}
             animate={isBottomInView ? { scaleX: 1 } : {}}
             transition={{ duration: 1, delay: 0.5 }}
           />
        </div>
      </div>
    </section>
  )
}
