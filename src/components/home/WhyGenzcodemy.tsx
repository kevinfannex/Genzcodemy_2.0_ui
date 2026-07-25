"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    number: "01",
    title: "Build Real Skills",
    body: "Work on practical projects that strengthen your portfolio and prepare you for real development work.",
    isPrimary: true,
  },
  {
    number: "02",
    title: "Learn from Experts",
    body: "Get guidance from experienced mentors who help you solve problems, improve your skills, and prepare for interviews.",
    isPrimary: false,
  },
  {
    number: "03",
    title: "Launch Your Career",
    body: "Receive resume reviews, mock interviews, internship guidance, and placement support to confidently start your tech journey.",
    isPrimary: false,
  },
];

export default function WhyGenzcodemy() {
  return (
    <section className="relative border-y-4 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-24 lg:py-32 overflow-hidden">
      {/* Dark mode grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-[2px] bg-[#f5c518]"
            ></motion.div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#f5c518] font-bold">
              WHY_GENZCODEMY.MD
            </p>
          </div>
          
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl lg:text-6xl leading-[1.1]">
            From Learning to Landing Your First Tech Job.
          </h2>
          
          <p className="text-lg leading-relaxed text-white/60 md:text-xl max-w-2xl">
            Master in-demand technologies, build real-world projects, learn from experienced mentors, and receive career support designed to help you become industry-ready.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className={`group flex flex-col p-8 md:p-12 lg:p-14 border-b border-white/10 md:border-b-0 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-[#f5c518] hover:text-[#1a1a1a] hover:shadow-[0_15px_40px_rgba(245,197,24,0.3)] hover:z-20 ${
                card.isPrimary 
                  ? "bg-[#f5c518] text-[#1a1a1a] relative z-20" 
                  : "bg-transparent text-white md:border-l border-white/10 relative z-10"
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className={`font-serif text-2xl font-bold transition-colors duration-300 group-hover:scale-110 ${card.isPrimary ? "text-[#1a1a1a]" : "text-[#f5c518] group-hover:text-[#1a1a1a]"}`}>
                  {card.number}
                </span>
                <div className={`h-[1px] flex-1 transition-colors duration-500 ${card.isPrimary ? "bg-[#1a1a1a]/30 group-hover:bg-[#1a1a1a]/60" : "bg-white/20 group-hover:bg-[#1a1a1a]/30"}`}></div>
              </div>
              
              <h3 className="mb-5 text-3xl font-serif font-bold leading-tight md:text-[2rem]">
                {card.title}
              </h3>
              
              <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${card.isPrimary ? "text-[#1a1a1a]/80 font-medium" : "text-white/60 group-hover:text-[#1a1a1a]/80 group-hover:font-medium"}`}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}