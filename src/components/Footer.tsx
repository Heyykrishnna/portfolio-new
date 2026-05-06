import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-black-border bg-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black-border">
          <div className="p-8 lg:p-10 border-r border-black-border flex flex-col gap-5">
            {[
              { label: 'Work', to: '#portfolio' },
              { label: 'About', to: '#about' },
              { label: 'Contact', to: '#contact' },
            ].map(link => (
              <Link
                key={link.to}
                href={link.to}
                className="group flex items-center gap-2 font-body text-[15px] text-cream-dim hover:text-cream transition-all duration-300 w-fit"
              >
                <span>{link.label}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="p-8 lg:p-10 lg:border-r border-black-border flex flex-col gap-5">
            {[
              { label: 'Github', href: 'https://github.com/PiyushY111' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/PiyushY111' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 font-body text-[15px] text-cream-dim hover:text-cream transition-all duration-300 w-fit"
              >
                <span>{s.label}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="p-8 lg:p-10 border-t lg:border-t-0 border-r border-black-border flex flex-col justify-start gap-1">
            <p className="font-body text-[15px] text-cream-dim leading-relaxed">
              Sonipat, India · Remote
            </p>
            <p className="font-body text-[15px] text-cream-dim leading-relaxed opacity-40">
              Open to work worldwide
            </p>
          </div>

          <div className="p-8 lg:p-10 border-t lg:border-t-0 border-black-border flex flex-col justify-start gap-3">
            <a
              href="mailto:piyushydv.dev@gmail.com"
              className="font-body text-[15px] text-cream-dim hover:text-cream transition-colors duration-300 w-fit block"
            >
              piyushydv.dev@gmail.com
            </a>
            <a
              href="https://github.com/Heyykrishnna"
              target="_blank"
              rel="noreferrer"
              className="font-body text-[15px] text-cream-dim hover:text-cream transition-colors duration-300 w-fit block"
            >
              @PiyushY111
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] border-b border-black-border min-h-[280px] lg:min-h-[380px]">
            <div className="border-r border-black-border relative flex flex-col justify-between p-8 lg:p-10">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <svg
                  viewBox="0 0 200 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full opacity-40"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <line x1="0" y1="140" x2="200" y2="0" stroke="#5a5a5a" strokeWidth="1.5" />
                  <line x1="0" y1="140" x2="200" y2="280" stroke="#5a5a5a" strokeWidth="1.5" />
                  <line x1="0" y1="70" x2="160" y2="0" stroke="#4a4a4a" strokeWidth="1" />
                  <line x1="0" y1="210" x2="160" y2="280" stroke="#4a4a4a" strokeWidth="1" />
                  <line x1="100" y1="0" x2="100" y2="280" stroke="#3a3a3a" strokeWidth="0.5" />
                  <rect x="1" y="1" width="198" height="278" stroke="#2a2a2a" strokeWidth="0.5" />
                </svg>
              </div>
              <div />
              <div className="relative z-10 flex flex-col items-start gap-4">
                <p className="body-sm text-[12px] opacity-40">
                  © Piyush Yadav {year} — All rights reserved
                </p>
              </div>
            </div>

            <div className="flex items-end pb-2 px-6 lg:px-20">
              <span
                className="font-display font-bold text-cream select-none leading-[0.82]"
                style={{
                  fontSize: 'clamp(60px, 18vw, 300px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.82,
                  whiteSpace: 'nowrap',
                }}
              >
                PIYUSH .
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end px-8 lg:px-10 py-4">
            <span
              className="font-display text-cream-dim opacity-40 select-none"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1 }}
            >
              ®
            </span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isFileTreeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            data-lenis-prevent
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsFileTreeOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0a0a] border border-black-border rounded-sm shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-black-border bg-[#050505]">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a87c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <h3 className="font-display font-medium text-cream text-lg tracking-wide">Project Source</h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 640 640"
                    fill="#c9a87c"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8ZM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5Z"/>
                  </svg>
                  <a href="https://github.com/PiyushY111" target="_blank" rel="noreferrer"><h3 className="font-display font-medium text-[#c9a87c] text-lg tracking-wide">GitHub</h3></a>
                </div>
                <button
                  onClick={() => setIsFileTreeOpen(false)}
                  className="p-1.5 text-cream-dim hover:text-gold transition-colors duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}