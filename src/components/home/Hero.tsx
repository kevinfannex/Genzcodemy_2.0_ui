"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const { requireAuth } = useAuthGate();
  const router = useRouter();

  const handleEnrollClick = () => {
    if (requireAuth(`/courses/data-analytics`)) router.push(`/courses/data-analytics`);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f5] px-6 py-20 lg:py-32 border-b-4 border-[#1a1a1a]">
      
      {/* Floating Neobrutalist Elements */}
      
      {/* 1. Terminal / Code Icon (Teal) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute left-4 top-10 lg:left-[45%] lg:top-20 z-20 flex h-20 w-24 items-center justify-center rounded-2xl border-4 border-[#1a1a1a] bg-[#38b2ac] shadow-[6px_6px_0px_#1a1a1a] rotate-[-5deg]"
      >
        <span className="font-mono text-4xl font-black text-[#1a1a1a]">{"{ }"}</span>
      </motion.div>

      {/* 2. Eye / Vision Icon (Yellow) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut", delay: 1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute right-4 top-32 lg:right-24 lg:top-[50%] z-20 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#1a1a1a] bg-[#f5c518] shadow-[6px_6px_0px_#1a1a1a] rotate-[10deg]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-10 w-10 text-[#1a1a1a]">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </motion.div>

      {/* 3. React / Orbit Icon (Blue) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut", delay: 0.5 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
        className="absolute left-[30%] top-[40px] z-20 hidden lg:flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#1a1a1a] bg-[#8993f4] shadow-[6px_6px_0px_#1a1a1a] rotate-[15deg]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-12 w-12 text-[#1a1a1a]">
          <circle cx="12" cy="12" r="3"></circle>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
        </svg>
      </motion.div>

      {/* 4. Base / Database Icon (Pink) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut", delay: 1.5 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
        }}
        className="absolute bottom-10 left-10 z-20 hidden lg:flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#1a1a1a] bg-[#ff4a7e] shadow-[6px_6px_0px_#1a1a1a] rotate-[-15deg]"
      >
        <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-16 w-16 text-[#1a1a1a]">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <ellipse cx="14" cy="8" rx="11" ry="6"></ellipse>
              <path d="M14,24c-4.8,0-8.8-1.4-11-3.6V24c0,3.4,4.8,6,11,6c0.9,0,1.8-0.1,2.7-0.2C15.2,28.3,14.3,26.2,14,24C14,24,14,24,14,24z"></path>
              <path d="M3,12.4V16c0,3.4,4.8,6,11,6c0,0,0,0,0.1,0c0.2-2.4,1.4-4.6,3-6.2c-1,0.1-2,0.2-3.1,0.2C9.2,16,5.2,14.6,3,12.4z"></path>
            </g>
            <path d="M25,15.1v8.5l1.3-1.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-3,3c-0.1,0.1-0.2,0.2-0.3,0.2C24.3,27,24.1,27,24,27s-0.3,0-0.4-0.1 c-0.1-0.1-0.2-0.1-0.3-0.2l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.3,1.3v-8.5c-3.9,0.5-7,3.9-7,7.9c0,4.4,3.6,8,8,8s8-3.6,8-8 C32,18.9,28.9,15.6,25,15.1z"></path>
          </g>
        </svg>
      </motion.div>

      {/* 5. Git Branch Icon (Purple) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut", delay: 0.8 },
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }}
        className="absolute bottom-20 right-10 lg:bottom-[20%] lg:right-[35%] z-20 hidden lg:flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#1a1a1a] bg-[#c084fc] shadow-[6px_6px_0px_#1a1a1a] rotate-[8deg]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-[#1a1a1a]">
          <line x1="6" y1="3" x2="6" y2="15"></line>
          <circle cx="18" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M18 9a9 9 0 0 1-9 9"></path>
        </svg>
      </motion.div>

      {/* 6. Statistics Icon (Orange) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut", delay: 1.2 },
          y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }}
        className="absolute top-[15%] right-8 lg:top-[20%] lg:right-12 z-20 hidden lg:flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#1a1a1a] bg-[#fb923c] shadow-[6px_6px_0px_#1a1a1a] rotate-[-12deg]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-[#1a1a1a]">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      </motion.div>

      {/* 7. Floating Cursor */}
      {/* <motion.div 
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[40%] bottom-[20%] z-40 hidden lg:block"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#38b2ac" stroke="#1a1a1a" strokeWidth="2">
          <path d="M3 3l7 18 3-7 7-3-18-8z" />
        </svg>
      </motion.div> */}
      

      <div className="relative z-30 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Block: Typography */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center pt-10"
          >
            <p className="mb-4 font-mono text-sm font-bold tracking-widest text-[#1a1a1a]/70 uppercase">
              WE DON'T JUST TEACH. WE BUILD CAREERS.
            </p>
            
            <h1 className="text-[4rem] font-black leading-[0.95] tracking-tight text-[#1a1a1a] sm:text-[5.5rem] lg:text-[7rem] uppercase">
              LEARN BUILD
              <br />
              GET HIRED.
            </h1>
            
            <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-[#1a1a1a]/80 md:text-xl">
            Master in-demand skills, work on real-world projects, learn from industry experts, and become job-ready with dedicated placement support.
            </p>

            <div className="mt-10 inline-flex">
              <button
                onClick={handleEnrollClick}
                className="rounded-2xl border-4 border-[#1a1a1a] bg-[#f5c518] px-10 py-5 text-xl font-black text-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#1a1a1a]"
              >
                Enroll in next batch
              </button>
            </div>
          </motion.div>

          {/* Right Block: Cutout Person */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center lg:justify-end"
          >
            
            {/* The Pink Geometric Frame */}
            <div className="relative h-[400px] w-[320px] sm:h-[500px] sm:w-[400px]">
              
              {/* Outer stroke/shadow for the shape */}
              <div 
                className="absolute inset-0 translate-x-[10px] translate-y-[10px] bg-[#1a1a1a] rounded-[40px] rounded-tl-[80px] rounded-br-[80px]"
              ></div>
              
              {/* Colored shape container */}
              <div 
                className="absolute inset-0 border-4 border-[#1a1a1a] bg-[#f074d2] rounded-[40px] rounded-tl-[80px] rounded-br-[80px] overflow-hidden flex items-end justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Gemini_Generated_Image_xdn7arxdn7arxdn7-removebg-preview.png" 
                  alt="Mentor"
                  className="relative z-10 w-[120%] h-auto max-h-[110%] object-cover object-bottom"
                  style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))" }}
                />
              </div>

              {/* The Thought Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                className="absolute -top-12 -left-8 sm:-left-16 z-40 bg-white border-4 border-[#1a1a1a] rounded-[2rem] p-4 sm:p-5 shadow-[6px_6px_0px_#1a1a1a] w-[260px] text-center"
              >
                {/* Bubble pointer */}
                <div className="absolute -bottom-[14px] right-12 w-6 h-6 bg-white border-b-4 border-r-4 border-[#1a1a1a] transform rotate-45 -z-10"></div>
                
                <TypeAnimation
                  sequence={[
                    1200, 
                    'DEBUG. OPTIMIZE. LAUNCH.\nWHERE DO I BEGIN?',
                    3000,
                  ]}
                  wrapper="div"
                  speed={50}
                  className="font-mono text-sm sm:text-base font-black text-[#1a1a1a] leading-snug whitespace-pre-line"
                  repeat={Infinity}
                  cursor={true}
                />
              </motion.div>

              {/* Overlapping Pill Tag */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -right-4 z-30 inline-flex items-center gap-2 rounded-full border-4 border-[#1a1a1a] bg-[#6dec86] px-5 py-2 font-mono text-sm font-black shadow-[4px_4px_0px_#1a1a1a]"
              >
                <span className="text-lg">🚀</span> Next batch starting soon
              </motion.div>
              
            </div>

          </motion.div>
          
        </div>
      </div>
      
    </section>
  );
}