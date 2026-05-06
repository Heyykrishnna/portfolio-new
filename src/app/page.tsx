"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ProjectShowcase from "@/components/ProjectShowcase";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import RolesMissions from "@/components/RolesMissions";
import ImpactStats from "@/components/ImpactStats";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/* ─── Scramble text hook ─────────────────────────────────── */
function useScramble(target: string, delay = 0) {
  const [text, setText] = useState(target);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let frame = 0;
    const total = 22;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setText(
          target
            .split("")
            .map((ch, i) =>
              ch === " "
                ? " "
                : i < Math.floor((frame / total) * target.length)
                ? ch
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
        );
        frame++;
        if (frame > total) { setText(target); clearInterval(id); }
      }, 45);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);

  return text;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const cursorPos = useRef({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrambled = useScramble("PIYUSH YADAV", 300);

  /* ── Smooth cursor RAF ── */
  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.1);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.1);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px,${cursorPos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Reveal observer ── */
  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            entry.target.querySelectorAll(".reveal-item, .reveal-word").forEach((el: any) => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            });
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-trigger").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[200vh] w-full bg-[#f5f5f3] text-black font-sans selection:bg-black selection:text-white">

      {/* ── Custom cursor ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border border-white/60 transition-all duration-200 ${
            hovered ? "w-16 h-16 -translate-x-8 -translate-y-8 bg-white/20" : "w-5 h-5 -translate-x-2.5 -translate-y-2.5"
          }`}
        />
      </div>

      {/* ── STICKY NAV ── */}
      <nav className="fixed top-0 left-0 z-[100] flex items-center justify-between w-full px-6 md:px-14 pt-8 md:pt-10 mix-blend-difference pointer-events-none">
        {/* Left: Logo */}
        <div className="flex items-center gap-1.5 text-white/90 z-50 pointer-events-auto">
          <span className="text-[13px] font-black tracking-[0.22em] uppercase">PY</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/50">Portfolio</span>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center gap-12 lg:gap-16 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          {["Work", "About", "Skills", "Contact"].map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Availability (Desktop) + Mobile Toggle */}
        <div className="flex items-center gap-6 z-50 pointer-events-auto">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50">Open to work</span>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col items-end justify-center gap-[5px] w-8 h-8 focus:outline-none group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
            <span className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "w-4 group-hover:w-6"}`} />
            <span className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-5 group-hover:w-6"}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div
        className={`md:hidden fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {["Work", "About", "Skills", "Contact"].map((label, i) => (
          <Link
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-black tracking-[0.15em] uppercase text-white hover:text-white/60 transition-all duration-500"
            style={{ 
              transitionDelay: isMobileMenuOpen ? `${i * 100 + 150}ms` : "0ms", 
              opacity: isMobileMenuOpen ? 1 : 0, 
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)" 
            }}
          >
            {label}
          </Link>
        ))}
        <div 
          className="flex items-center gap-3 mt-8 transition-all duration-700"
          style={{ 
            transitionDelay: isMobileMenuOpen ? `600ms` : "0ms", 
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)"
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50">Open to work</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <div
        id="home"
        className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#f5f5f3]"
      >
        {/* ── Dotted + thin-line grid background ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dot pattern */}
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="0.75" cy="0.75" r="0.75" fill="rgba(0,0,0,0.18)" />
            </pattern>
            {/* Thin grid lines */}
            <pattern id="grid" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
          {/* Vignette fade — edges dissolve into black */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#f5f5f3" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#vignette)" />
        </svg>

        {/* ── Thin horizontal + vertical structural rules ── */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Horizontal thirds */}
          <div className="absolute left-0 right-0 h-px bg-black/[0.06]" style={{ top: "33.33%" }} />
          <div className="absolute left-0 right-0 h-px bg-black/[0.06]" style={{ top: "66.66%" }} />
          {/* Vertical quarter */}
          <div className="absolute top-0 bottom-0 w-px bg-black/[0.05]" style={{ left: "25%" }} />
          <div className="absolute top-0 bottom-0 w-px bg-black/[0.05]" style={{ left: "75%" }} />
        </div>

        {/* ── NAV DELETED ── */}

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-20 flex flex-col justify-between h-[calc(100%-76px)] px-8 md:px-14 pb-8 md:pb-10">

          {/* ── Centre block ── */}
          <div className="flex flex-col justify-center flex-1 gap-6 md:gap-8">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-black/25" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">
                Full-Stack Developer &amp; UI Designer
              </span>
            </div>

            {/* Big name — fill + stroke split */}
            <div className="flex flex-col gap-0 select-none overflow-hidden">
              <h1
                className="hero-name-fill text-[15vw] md:text-[13.5vw] font-black leading-[0.85] tracking-[-0.04em] uppercase text-black"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {scrambled.split(" ")[0]}
              </h1>
              <h1
                className="hero-name-stroke text-[15vw] md:text-[13.5vw] font-black leading-[0.85] tracking-[-0.04em] uppercase hero-stroke-light"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {scrambled.split(" ")[1] ?? ""}
              </h1>
            </div>

            {/* ── Two-col info row ── */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-0 mt-2 md:mt-4">
              <p className="max-w-xs text-[12px] md:text-[13px] font-medium leading-[1.75] text-black/40">
                I craft clean, fast web products —<br />
                from idea to shipped.
              </p>

              <Link
                href="#portfolio"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group flex items-center gap-3 border border-black/20 rounded-full px-7 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                View Work
                <svg
                  width="9" height="9" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3"
                  className="rotate-[-45deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex items-center justify-between border-t border-black/[0.08] pt-4">
            {/* Tags */}
            <div className="hidden md:flex items-center gap-2">
              {["React", "Next.js", "TypeScript", "Node.js"].map((t) => (
                <span
                  key={t}
                  className="text-[8px] font-bold tracking-[0.18em] uppercase text-black/30 border border-black/[0.1] rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/25">© 2026</div>
          </div>
        </div>
      </div>

      {/* ── About Section ─────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        className="relative z-50 bg-black text-white min-h-screen w-full px-6 md:px-10 lg:px-12 py-32 flex flex-col shadow-[0_-40px_100px_rgba(0,0,0,0.3)] mt-[15vh] [clip-path:polygon(0_15vh,100%_0,100%_100%,0%_100%)]"
      >
        <div className="flex items-center justify-between w-full border-t border-zinc-200 pt-8 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="text-black">(01)</span>
          </div>
          <span>(About Me)</span>
          <span>(Piyush Yadav)</span>
          <span>© 2026</span>
        </div>

        {/* Heading — reduced size */}
        <div className="mb-20 overflow-hidden reveal-trigger">
          <h2
            ref={headingRef}
            className="text-[7vw] md:text-[5.2vw] font-black leading-[1.1] tracking-[-0.04em] text-white max-w-[70%]"
          >
            {["Building", "digital", "products", "that", "are", "clean,", "fast,", "and", "built", "to", "last."].map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.28Rem] transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0,0,1)] translate-y-[100%] opacity-0 reveal-word"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Two-column: Left rich text | Right small image */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-start reveal-trigger">

          {/* LEFT — enhanced text */}
          <div className="flex flex-col gap-8 max-w-[580px]">

            {/* Bio paragraphs */}
            <p className="text-[15px] md:text-[16px] font-semibold leading-[1.8] text-white/55 transition-all duration-[1000ms] opacity-0 translate-y-10 reveal-item">
              I'm a second-year Computer Science &amp; AI student at Newton School of Technology, Sonipat. I'm passionate about building modern, user-friendly web applications — turning ideas into clean, scalable digital products that actually matter.
            </p>
            <p className="text-[15px] md:text-[16px] font-semibold leading-[1.8] text-white/75 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-100 reveal-item">
              Over the past two years I've shipped 40+ projects — from cultural-fest platforms with live payment gateways to arcade games and real-time code runners. I care deeply about clean code, thoughtful UI, and the experience behind every interaction.
            </p>

            {/* What I do */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-150 reveal-item">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">What I do</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                {[
                  { label: "Product Thinking", desc: "Turning ideas into practical digital solutions." },
                  { label: "UI/UX Design", desc: "Clean, responsive, and intuitive interfaces." },
                  { label: "Full-Stack Dev", desc: "Scalable apps with modern technologies." },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-black text-white/80">{item.label}</span>
                    <span className="text-[12px] font-medium text-white/35 leading-[1.6]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current roles */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-200 reveal-item">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Currently</span>
              <div className="flex flex-col gap-2">
                {[
                  { role: "CTO", org: "Creonity" },
                  { role: "Technical Lead", org: "Neutron Tech Fest" },
                  { role: "Co-Founder", org: "DCODE — Student Open-Source" },
                  { role: "Operations Lead", org: "Dev Club, NST" },
                ].map((r) => (
                  <div key={r.role + r.org} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                    <span className="text-[13px] font-semibold text-white/65">{r.role}</span>
                    <span className="text-[13px] text-white/30">@</span>
                    <span className="text-[13px] font-semibold text-white/50">{r.org}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/10 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-250 reveal-item">
              {[
                { val: "40+", label: "Projects" },
                { val: "150+", label: "Problems Solved" },
                { val: "2+", label: "Years Coding" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  {i !== 0 && <div className="w-px h-8 bg-white/15" />}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[26px] font-black leading-none">{s.val}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Available */}
            <div className="flex items-center gap-2.5 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-300 reveal-item">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Available for freelance &amp; internships — Sonipat, India (Remote)</span>
            </div>
          </div>

          {/* RIGHT — small image, no bg, no shadow */}
          <div className="flex-col hidden md:block gap-3 w-[220px] md:w-[600px] shrink-0 transition-all duration-[1000ms] opacity-0 translate-y-10 delay-200 reveal-item">
            <div className="w-full aspect-[3/4] overflow-hidden">
              {/* Replace src with your image link */}
              <img
                src="https://ik.imagekit.io/yatharth/ChatGPT%20Image%20May%207,%202026,%2003_46_45%20AM.png"
                alt="Piyush Yadav"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
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
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }} xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 1440,0 1440,80" fill="white" />
        </svg>
      </div>

      {/* Education Section */}
      <Education />

      <RolesMissions />

      {/* Black → White diagonal transition */}
      <div className="relative z-40 bg-white" style={{ marginTop: "-2px" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: "120px" }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L1440 0V120L0 0Z" fill="black" />
        </svg>
      </div>

      <ImpactStats />

      <ContactCTA />

      {/* White → Black diagonal transition */}
      <div className="relative z-40 bg-black" style={{ marginTop: "-2px" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: "120px" }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L1440 0L0 120Z" fill="white" />
        </svg>
      </div>

      <Footer />

      <style jsx global>{`
        body { margin: 0; padding: 0; background: #f5f5f3; overflow-x: hidden; cursor: none; }
        *, *::before, *::after { box-sizing: border-box; }

        .reveal-word, .reveal-item { will-change: transform, opacity; }
        .reveal-trigger.revealed .reveal-item,
        .reveal-trigger.revealed .reveal-word {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* ── Hero name fill → outline ── */
        .hero-name-fill {
          opacity: 0;
          animation: nameIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        .hero-stroke-light {
          -webkit-text-stroke: 1px rgba(0,0,0,0.2);
          color: transparent;
          opacity: 0;
          animation: nameIn 1s cubic-bezier(0.16,1,0.3,1) 0.35s forwards;
        }
        @media (min-width: 768px) {
          .hero-stroke-light { -webkit-text-stroke: 1.5px rgba(0,0,0,0.18); }
        }
        @keyframes nameIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Scroll dot bounce ── */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50%       { transform: translateY(6px); opacity: 0.2; }
        }
        .scroll-dot { animation: scrollBounce 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
