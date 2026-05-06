"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    category: "",
    email: "",
    message: ""
  })

  return (
    <section id="contact" className="relative bg-white py-32 px-6 md:px-10 lg:px-12 flex flex-col">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        
        {/* Left Side: Details & Location */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-black" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">(Get In Touch)</span>
            </div>
            
            <h2 className="text-[10vw] lg:text-[7vw] font-bold leading-[0.85] tracking-[-0.05em] text-black uppercase mb-12">
              Let's <br />
              <span className="text-zinc-300">Connect"</span>
            </h2>

            <p className="text-[18px] md:text-[22px] font-medium leading-[1.5] text-zinc-500 max-w-md mb-20">
              Pick a plan, submit a job request, and your <span className="text-black italic">イメージ</span> will kickoff within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-zinc-100">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Location</span>
              <p className="text-[16px] font-bold text-black">Rajasthan, India<br /><span className="text-zinc-400">Remote Worldwide</span></p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Contact</span>
              <p className="text-[16px] font-bold text-black hover:text-zinc-600 transition-colors cursor-pointer">
                khandelwalPiyush39@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col">
          <form className="flex flex-col gap-10 md:gap-14" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div className="flex flex-col gap-4">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black">First Name*</label>
                <input 
                  type="text" 
                  placeholder="Piyush"
                  className="bg-transparent border-b border-zinc-200 py-3 text-[16px] font-medium focus:border-black outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black">Last Name*</label>
                <input 
                  type="text" 
                  placeholder="Khandelwal"
                  className="bg-transparent border-b border-zinc-200 py-3 text-[16px] font-medium focus:border-black outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <div className="flex flex-col gap-4">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black">Category</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-zinc-200 py-3 text-[16px] font-medium focus:border-black outline-none transition-colors appearance-none cursor-pointer">
                    <option>Development</option>
                    <option>Design</option>
                    <option>AI / ML</option>
                    <option>Full Engagement</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black">Email</label>
                <input 
                  type="email" 
                  placeholder="piyush@example.com"
                  className="bg-transparent border-b border-zinc-200 py-3 text-[16px] font-medium focus:border-black outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black">Message</label>
              <textarea 
                rows={4}
                placeholder="Enter your message....."
                className="bg-transparent border-b border-zinc-200 py-3 text-[16px] font-medium focus:border-black outline-none transition-colors resize-none"
              />
            </div>

            <button 
              type="submit"
              className="mt-8 bg-zinc-900 text-white py-6 md:py-8 rounded-[8px] text-[14px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
            >
              Submit Request
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
