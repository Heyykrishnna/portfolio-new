"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    category: "Brand Identity",
    title: "Neon Velocity",
    description: "High-performance electric automotive branding focused on speed and kinetic energy.",
    year: "2024",
    location: "Tokyo, JP",
    image: "/neon_velocity_project_1778096930932.png"
  },
  {
    id: "02",
    category: "Digital Design",
    title: "Silent Peak",
    description: "A minimalist mountaineering platform emphasizing solitude and elevation.",
    year: "2024",
    location: "Oslo, NO",
    image: "/silent_peak_project_1778097123862.png"
  },
  {
    id: "03",
    category: "3D Visuals",
    title: "Void Studio",
    description: "Exploring the intersection of architectural void and digital light through 3D renders.",
    year: "2023",
    location: "Berlin, DE",
    image: "/void_studio_project_1778097136988.png"
  },
  {
    id: "04",
    category: "UI/UX System",
    title: "Chronos",
    description: "A comprehensive design system for temporal data management and visualization.",
    year: "2023",
    location: "London, UK",
    image: "/chronos_project_1778097183653.png"
  }
];

export default function ProjectShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealTriggers = document.querySelectorAll('.project-showcase .reveal-trigger');
    revealTriggers.forEach(trigger => observer.observe(trigger));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrame: number;
    
    const updateImagePos = () => {
      setImagePos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1
      }));
      animationFrame = requestAnimationFrame(updateImagePos);
    };

    animationFrame = requestAnimationFrame(updateImagePos);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  const headerText = "Design-driven studio delivering the structured visuals, refined digital system, and high-impact brand experiences shaped by aesthetics & Fuel®.";

  return (
    <section ref={sectionRef} className="project-showcase relative z-50 bg-black text-white min-h-screen w-full px-6 md:px-10 lg:px-12 py-32 flex flex-col">
      
      {/* Floating Image Component */}
      <div 
        className={`fixed pointer-events-none z-[100] w-[400px] h-[250px] overflow-hidden transition-opacity duration-500 ease-out ${hoveredProject ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${imagePos.x}px`,
          top: `${imagePos.y}px`,
          transform: `translate(-50%, -50%) rotate(${(mousePos.x - imagePos.x) * 0.1}deg)`,
        }}
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-500 ${hoveredProject === project.id ? 'opacity-100 scale-105' : 'opacity-0 scale-125'}`}
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
      </div>

      {/* Projects List Header */}
      <div className="flex items-center justify-between w-full border-t border-zinc-800 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 reveal-trigger">
        <div className="flex items-center gap-2 reveal-item">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="text-white">(02)</span>
        </div>
        <span className="reveal-item">(Project Showcase)</span>
        <span className="reveal-item">© 2025</span>
      </div>

      <div className="relative mb-60 reveal-trigger">
        <div className="flex items-start gap-8">

            <h2 className="text-[5.5vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-[-0.04em] max-w-[90%]">
                {headerText.split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className={`inline-block mr-[0.25em] transition-all duration-[1000ms] ease-out reveal-item`}
                        style={{ 
                            transitionDelay: `${i * 40}ms`,
                            opacity: 0,
                            transform: 'translateY(20px)',
                            color: i < 7 ? '#ffffff' : i < 15 ? '#ffffff' : '#52525b'
                        }}
                    >
                        {word}
                    </span>
                ))}
            </h2>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col w-full">
        {projects.map((project) => (
          <div 
            key={project.id}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative border-b border-zinc-900 py-16 md:20 reveal-trigger"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* ID & Category (3 cols) */}
              <div className="md:col-span-3 flex flex-col gap-6 reveal-item">
                <span className="text-[40px] md:text-[60px] font-black text-white leading-none tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    {project.id}
                </span>
              </div>

              {/* Title & Description (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-8">
                <h3 className="text-[6vw] md:text-[4vw] font-black leading-[0.85] tracking-[-0.06em] uppercase text-white reveal-item group-hover:translate-x-4 transition-transform duration-700" style={{ transitionDelay: '100ms' }}>
                  {project.title}
                </h3>
                <p className="max-w-md text-[16px] md:text-[18px] font-bold leading-[1.6] text-zinc-400 reveal-item group-hover:translate-x-4 transition-transform duration-700" style={{ transitionDelay: '200ms' }}>
                  {project.description}
                </p>
              </div>

              {/* Year & Link (2 cols) */}
              <div className="md:col-span-2 flex flex-col md:items-end gap-10 reveal-item" style={{ transitionDelay: '300ms' }}>
                <span className="text-[13px] font-black text-zinc-500 uppercase tracking-widest">{project.year}</span>
                <div className="group/link flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all duration-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-[-45deg]">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* Kinetic Hover Line */}
            <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-1000 ease-in-out" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.2, 0, 0, 1);
        }
        :global(.reveal-trigger.revealed) .reveal-item {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
