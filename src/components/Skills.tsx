"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const SKILLS_DATA = [
  { name: "React",                   stars: 5, category: "Frontend"  },
  { name: "TypeScript",              stars: 4, category: "Language"  },
  { name: "JavaScript",              stars: 5, category: "Language"  },
  { name: "Next.js",                 stars: 4, category: "Frontend"  },
  { name: "Node.js",                 stars: 4, category: "Backend"   },
  { name: "Express.js",              stars: 4, category: "Backend"   },
  { name: "FastAPI",                 stars: 4, category: "Backend"   },
  { name: "Python",                  stars: 5, category: "Language"  },
  { name: "Pandas",                  stars: 4, category: "Data"      },
  { name: "NumPy",                   stars: 4, category: "Data"      },
  { name: "Machine Learning",        stars: 4, category: "AI / ML"   },
  { name: "Artificial Intelligence", stars: 4, category: "AI / ML"   },
  { name: "SQL",                     stars: 4, category: "Database"  },
  { name: "MongoDB",                 stars: 4, category: "Database"  },
  { name: "PostgreSQL",              stars: 4, category: "Database"  },
  { name: "Firebase",                stars: 3, category: "Database"  },
  { name: "Tailwind CSS",            stars: 5, category: "Frontend"  },
  { name: "Framer Motion",           stars: 4, category: "Frontend"  },
  { name: "HTML",                    stars: 5, category: "Frontend"  },
  { name: "CSS",                     stars: 5, category: "Frontend"  },
  { name: "Git",                     stars: 4, category: "Tools"     },
  { name: "GitHub",                  stars: 4, category: "Tools"     },
  { name: "Go",                      stars: 3, category: "Language"  },
  { name: "C / C++",                 stars: 4, category: "Language"  },
  { name: "Google Sheets",           stars: 4, category: "Tools"     },
  { name: "Power BI",                stars: 3, category: "Tools"     },
]

const N = SKILLS_DATA.length
const ANGLE_STEP   = 12 // Slightly tighter for better density
const CYL_RADIUS   = 600 // Increased radius for more depth

/* ── Category color map - Refined for premium look on light bg ── */
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#1a1a1a",
  Language: "#3b3b3b",
  Backend:  "#525252",
  Data:     "#666666",
  "AI / ML":"#1a1a1a",
  Database: "#404040",
  Tools:    "#5a5a5a",
}

/* ── Single skill row ── */
function SkillRow({
  skill,
  index,
  progress,
}: {
  skill: (typeof SKILLS_DATA)[0]
  index: number
  progress: any
}) {
  const cylinderRot = useTransform(progress, [0, 1], [0, -(N - 1) * ANGLE_STEP])
  const rot         = useTransform(cylinderRot, (r) => r + index * ANGLE_STEP)
  const y           = useTransform(rot, (r) => Math.sin((r * Math.PI) / 180) * CYL_RADIUS)
  const z           = useTransform(rot, (r) => (Math.cos((r * Math.PI) / 180) - 1) * CYL_RADIUS)
  const rotateX     = useTransform(rot, (r) => -r)

  const FADE_RANGE = ANGLE_STEP * 1.5
  const centredness = useTransform(rot, (r) => {
    const norm = ((r % 360) + 360) % 360
    const abs  = norm > 180 ? 360 - norm : norm
    return Math.min(abs / FADE_RANGE, 1)
  })

  const opacity  = useTransform(centredness, [0, 0.2, 0.5, 1], [1, 0.6, 0.1, 0])
  const scale    = useTransform(centredness, [0, 0.4, 1], [1, 0.85, 0.6])
  const blurPx   = useTransform(centredness, [0, 0.1, 0.4, 1], [0, 6, 12, 24])
  const filter   = useTransform(blurPx, (b) => `blur(${b}px)`)

  const catColor = CATEGORY_COLORS[skill.category] ?? "#1a1a1a"

  return (
    <motion.div
      style={{ 
        y, 
        z, 
        rotateX, 
        opacity, 
        scale, 
        filter, 
        position: "absolute", 
        willChange: "transform, opacity, filter",
        transformStyle: "preserve-3d"
      }}
      className="flex flex-col items-center gap-6 select-none pointer-events-none"
    >
      {/* Skill name */}
      <h3 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold tracking-[-0.04em] text-[#1a1614] whitespace-nowrap leading-[0.9]">
        {skill.name}
      </h3>

      {/* Meta row */}
      <div className="flex items-center gap-8">
        {/* Proficiency dots */}
        <div className="flex items-center gap-2.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i < skill.stars ? 10 : 8,
                height: i < skill.stars ? 10 : 8,
                background: i < skill.stars ? catColor : "transparent",
                border:     `1px solid ${catColor}${i < skill.stars ? 'ff' : '30'}`,
                opacity:    i < skill.stars ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-[#1a1614]/10" />

        {/* Category chip */}
        <span
          className="text-[10px] tracking-[0.4em] uppercase font-bold px-3 py-1.5 rounded-full"
          style={{ background: `${catColor}08`, color: catColor, border: `1px solid ${catColor}15` }}
        >
          {skill.category}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Main section ── */
export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping:   25,
    restDelta: 0.0005,
  })

  const progressOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${N * 25}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Focus lines */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center gap-[clamp(120px,18vw,220px)]">
          <div className="w-full h-px bg-[#1a1614]/5" />
          <div className="w-full h-px bg-[#1a1614]/5" />
        </div>

        {/* 3D Cylinder Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: 3000 }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
          >
            {SKILLS_DATA.map((skill, i) => (
              <SkillRow
                key={skill.name}
                skill={skill}
                index={i}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>

        {/* Fog gradients for depth */}
        <div className="absolute inset-x-0 top-0 h-[40%] pointer-events-none z-20 
          bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none z-20 
          bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* Bottom Progress UI */}
        <motion.div
          style={{ opacity: progressOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-4"
        >
          <div className="w-40 h-[2px] bg-[#1a1614]/5 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#1a1614]"
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Side progress rail */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-48 w-px bg-[#1a1614]/5 hidden md:flex flex-col justify-between z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1614]/10 -ml-[2px]" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#1a1614]/40 origin-top"
            style={{ scaleY: smoothProgress }}
          />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1614]/10 -ml-[2px]" />
        </div>

      </div>
    </section>
  )
}
