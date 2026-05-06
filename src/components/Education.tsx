"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion"

const MILESTONES = [
  {
    year: "2024",
    index: "01",
    phase: "The Beginning",
    status: "Completed",
    headline: "Foundations. First code. First community.",
    body: "Stepped into Newton School of Technology with zero real-world code shipped. By end of year — production projects live, Dev Club membership locked in, and a framework for how to build things properly.",
    tags: ["CS Fundamentals", "Dev Club", "First Production Code"],
    align: "left" as const,
  },
  {
    year: "2025",
    index: "02",
    phase: "Building Velocity",
    status: "Completed",
    headline: "40+ projects. 2 ventures. Zero excuses.",
    body: "The year everything accelerated. Shipped across every major stack, co-founded DCODE — India's first student-led open-source initiative — and stepped into the CTO seat at Creonity. Speed without losing craft.",
    tags: ["40+ Projects", "DCODE Co-Founder", "CTO @ Creonity", "Open Source"],
    align: "right" as const,
  },
  {
    year: "2026",
    index: "03",
    phase: "Deep Expertise",
    status: "In Progress",
    headline: "AI/ML in production. Systems at scale.",
    body: "Shifting from building fast to building right. Deep focus on AI/ML integration, distributed system design, and architecture that holds under real-world pressure. Currently here.",
    tags: ["AI / ML", "System Design", "Distributed Arch", "Tech Lead @ Neutron"],
    align: "left" as const,
  },
  {
    year: "2027",
    index: "04",
    phase: "Capstone Phase",
    status: "Upcoming",
    headline: "Thesis. Internship. Industry impact.",
    body: "Deep research on AI Product Systems becomes the year's thesis. Industry internship converts theory into global-scale practice. The bridge between student and professional builder.",
    tags: ["AI Product Systems", "Industry Internship", "Research", "Thesis"],
    align: "right" as const,
  },
  {
    year: "2028",
    index: "05",
    phase: "Graduation",
    status: "Upcoming",
    headline: "B.Tech complete. Portfolio of real products.",
    body: "Completion of B.Tech in Computer Science & Artificial Intelligence at Newton School of Technology. Not just a degree — a portfolio of real-world systems, a network of builders, and a clear vision for what comes next.",
    tags: ["B.Tech CS & AI", "Newton School of Technology", "Full Portfolio"],
    align: "left" as const,
  },
]

/* ── Status badge ── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; dot: string }> = {
    "Completed":   { bg: "#ffffff0d", text: "#6ee7b7", dot: "#6ee7b7" },
    "In Progress": { bg: "#facc1510", text: "#facc15", dot: "#facc15" },
    "Upcoming":    { bg: "#ffffff08", text: "#52525b", dot: "#3f3f46" },
  }
  const c = styles[status] ?? styles["Upcoming"]
  return (
    <span
      className="inline-flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase font-bold px-3 py-1.5 rounded-full border"
      style={{ background: c.bg, color: c.text, borderColor: `${c.dot}30` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {status}
    </span>
  )
}

/* ── Single progress dot — extracted to its own component to obey Rules of Hooks ── */
function ProgressDot({
  index,
  count,
  progress,
}: {
  index: number
  count: number
  progress: MotionValue<number>
}) {
  const start  = index / count
  const end    = (index + 1) / count
  const active = useTransform(progress, [start, (start + end) / 2, end], [0, 1, 0])
  const scaleV = useTransform(active, [0, 1], [0.6, 1.8])
  const opacityV = useTransform(active, [0, 0.5, 1], [0.2, 1, 0.2])

  return (
    <motion.div
      className="rounded-full bg-white"
      style={{ width: 4, height: 4, opacity: opacityV, scale: scaleV }}
    />
  )
}

/* ── Milestone panel ── */
function MilestonePanel({
  m,
  progress,
  totalPanels,
  panelIndex,
}: {
  m: (typeof MILESTONES)[0]
  progress: MotionValue<number>
  totalPanels: number
  panelIndex: number
}) {
  const start = panelIndex / totalPanels
  const end   = (panelIndex + 1) / totalPanels
  const mid   = (start + end) / 2

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0])
  const y       = useTransform(progress, [start, mid, end], [70, 0, -70])
  const scale   = useTransform(progress, [start, mid, end], [0.93, 1, 0.93])

  const yearSlide = useTransform(
    progress,
    [start, mid],
    m.align === "left" ? [-100, 0] : [100, 0],
  )

  const isLeft = m.align === "left"

  return (
    <motion.div
      style={{ opacity, y, scale, position: "absolute", inset: 0 }}
      className="flex items-center justify-center px-6 md:px-14 lg:px-20 will-change-transform"
    >
      <div className="w-full max-w-7xl mx-auto">

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
            isLeft ? "" : "md:[direction:rtl]"
          }`}
        >
          {/* ── Year panel (decorative + readable) ── */}
          <div className={`relative flex flex-col ${isLeft ? "items-start" : "items-start md:items-end"} [direction:ltr]`}>
            <motion.div style={{ x: yearSlide }} className="relative w-full">
              {/* Ghost year — huge, outline */}
              <div
                className="text-[45vw] md:text-[22vw] font-black leading-none tracking-[-0.06em] select-none pointer-events-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                }}
              >
                {m.year}
              </div>

              {/* Real year + meta overlaid inside the ghost */}
              <div className="absolute inset-0 flex flex-col justify-center px-1 md:px-2">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 font-bold">
                    {m.index}
                  </span>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <StatusBadge status={m.status} />
                </div>

                <p className="text-[14vw] md:text-[8vw] font-black leading-[0.85] tracking-[-0.05em] text-white">
                  {m.year}
                </p>

                <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-bold mt-5">
                  {m.phase}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Copy block ── */}
          <div className="[direction:ltr] flex flex-col gap-8">
            <div className="h-px w-16 bg-zinc-700" />

            <h3 className="text-[1.4rem] md:text-[1.9rem] font-black leading-[1.1] tracking-[-0.03em] text-white">
              {m.headline}
            </h3>

            <p className="text-[15px] md:text-[17px] leading-[1.7] text-zinc-400 font-medium">
              {m.body}
            </p>

            <div className="flex flex-wrap gap-2">
              {m.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.25em] uppercase font-bold px-3 py-1.5 border border-zinc-800 text-zinc-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px w-full bg-zinc-800" />
          </div>

        </div>
      </div>
    </motion.div>
  )
}

/* ── Main export ── */
export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null)
  const N = MILESTONES.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping:   22,
    restDelta: 0.0005,
  })

  const headerOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0])

  return (
    /* Slanted clip-path transition coming out of the white Skills section */
    <section
      id="education"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Top header bar (fades out on first scroll) ── */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
        >
          <div className="flex items-center justify-between px-6 md:px-14 lg:px-20 py-7 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-[10px] tracking-[0.45em] uppercase text-white font-black">(04)</span>
            </div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-black">
              The Learning Journey
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700 font-black">
              2024 — 2028
            </span>
          </div>
        </motion.div>

        {/* ── Milestone panels ── */}
        <div className="relative w-full h-full">
          {MILESTONES.map((m, i) => (
            <MilestonePanel
              key={m.year}
              m={m}
              progress={smoothProgress}
              totalPanels={N}
              panelIndex={i}
            />
          ))}
        </div>

        {/* ── Right side progress dots ── */}
        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
          {MILESTONES.map((_, i) => (
            <ProgressDot
              key={i}
              index={i}
              count={N}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* ── Bottom meta bar ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none border-t border-zinc-900">
          <div className="flex items-center justify-between px-6 md:px-14 lg:px-20 py-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 font-bold">Degree</span>
              <span className="text-[11px] font-bold text-zinc-500">B.Tech · CS & Artificial Intelligence</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 font-bold">Institution</span>
              <span className="text-[11px] font-bold text-zinc-500">Newton School of Technology, India</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
