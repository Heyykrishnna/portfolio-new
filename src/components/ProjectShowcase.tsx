"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    category: "Full Stack",
    title: "Damru",
    description: "Cultural fest official website with payment gateway integration and judging panel.",
    year: "2023",
    location: "NST, India",
    image: "https://i1-c.pinimg.com/1200x/7d/e3/ca/7de3cae3414ac39a43315f2f5629fcd0.jpg"
  },
  {
    id: "02",
    category: "Game",
    title: "HyperStack",
    description: "Addictive arcade-style game testing precision and timing, built with Three.js.",
    year: "2024",
    location: "NST, India",
    image: "https://i1-c.pinimg.com/1200x/9c/93/bd/9c93bd32ab16fcfee56abf44096bd0f5.jpg"
  },
  {
    id: "03",
    category: "Full Stack",
    title: "SmartSpend",
    description: "Personal finance companion tracking expenses & budgets with data visualizations.",
    year: "2023",
    location: "NST, India",
    image: "https://i1-c.pinimg.com/1200x/5b/44/0a/5b440a039eb3eef5bbbe5c50b9e3f9a6.jpg"
  },
  {
    id: "04",
    category: "System Arch",
    title: "Snippad",
    description: "Web-based real-time code runner for HTML, CSS, and JavaScript.",
    year: "2024",
    location: "NST, India",
    image: "https://i1-c.pinimg.com/1200x/f4/00/45/f400450c168a7a70611e030590a11039.jpg"
  },
  {
    id: "05",
    category: "Frontend",
    title: "Neutron 2.0",
    description: "Official Tech Fest website for Newton School of Technology.",
    year: "2024",
    location: "NST, India",
    image: "https://ik.imagekit.io/yatharth/ARS03046%20(1).jpg?updatedAt=1776059581620"
  },
  {
    id: "06",
    category: "Frontend",
    title: "Memory Game",
    description: "Interactive UI game testing memory skills with flipping cards.",
    year: "2023",
    location: "NST, India",
    image: "https://i1-c.pinimg.com/736x/25/94/e8/2594e8c3f9f8c7292972ab71f23db284.jpg"
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

  const headerText = "I enjoy transforming ideas into clean, scalable, and impactful digital solutions, building responsive designs and creating meaningful user experiences.";

  return (
    <section id="portfolio" ref={sectionRef} className="project-showcase relative z-50 bg-black text-white min-h-screen w-full px-6 md:px-10 lg:px-12 py-32 flex flex-col">

      {/* Projects List Header */}
      <div className="flex items-center justify-between w-full border-t border-zinc-800 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 reveal-trigger">
        <div className="flex items-center gap-2 reveal-item">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="text-white">(02)</span>
        </div>
        <span className="reveal-item">(Project Showcase)</span>
        <span className="reveal-item">© 2026</span>
      </div>

      <div className="relative mb-60 reveal-trigger">
        <div className="flex items-start gap-8">

            <h2 className="text-[5.5vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-[-0.04em] max-w-[90%]">
                {headerText.split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className={`inline-block mr-[0.25em] transition-all duration-1000 ease-out reveal-item`}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full reveal-trigger">
        {projects.map((project, idx) => (
          <div 
            key={project.id}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 aspect-[4/3] md:aspect-[16/11] flex flex-col justify-end p-8 md:p-10 reveal-item cursor-pointer"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Background Image & Blur */}
            <div className="absolute inset-0 z-0">
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105 group-hover:blur-xl opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-30" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col gap-6 transform transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] translate-y-8 group-hover:translate-y-0">
               
               {/* Header (Category & Year) */}
               <div className="flex items-center justify-between border-b border-white/10 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{project.category}</span>
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{project.year}</span>
               </div>
               
               {/* Title & Description */}
               <div className="flex flex-col gap-3">
                 <div className="flex items-center justify-between">
                   <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight">{project.title}</h3>
                   {/* Arrow Icon */}
                   <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="-rotate-45">
                       <path d="M7 17L17 7M17 7H7M17 7V17" />
                     </svg>
                   </div>
                 </div>
                 <p className="text-[14px] md:text-[15px] font-semibold text-white/60 leading-[1.6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 max-w-[85%]">
                   {project.description}
                 </p>
               </div>

            </div>
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
