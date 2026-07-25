"use client";

import { motion } from "framer-motion";

// TODO: Replace with real copy for each comparison row
const ROWS = [
  {
    them: "Watch a 40-hour video course, take a quiz",
    us: "Build a real project with mentor feedback every week",
  },
  {
    them: "Focus mainly on theory",
    us: "Learn by solving practical, real-world problems",
  },
  {
    them: "Finish with a certificate",
    us: "Graduate with a portfolio that showcases your skills",
  },
  {
    them: "Learn at your own pace",
    us: "Structured roadmap that keeps you accountable",
  },
  {
    them: "Limited interaction after class",
    us: "Dedicated mentors, live doubt sessions, and code reviews",
  },
];

export default function HowWereDifferent() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          // diff --bootcamp genzcodemy
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          Why Students Choose {" "}
          <i className="not-italic text-[#f5c518] " style={{ fontFamily: "var(--font-gugi)" }}>Genzcodemy</i>.
        </h2>

        {/* Column headers */}
        <div className="mb-0 grid grid-cols-2 border-2 border-[#1a1a1a]">
          <div className="border-r-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/60">
              Traditional Learning 
            </span>
          </div>
          <div className="bg-[#f5c518] px-6 py-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]" style={{ fontFamily: "var(--font-gugi)" }}>
              Genzcodemy
            </span>
          </div>
        </div>

        {/* Rows */}
        {ROWS.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
            className="grid grid-cols-2 border-x-2 border-b-2 border-[#1a1a1a]"
          >
            {/* Them */}
            <div className="flex items-start gap-2 border-r-2 border-[#1a1a1a] bg-[#f9f9f9] px-6 py-4">
              <span className="mt-0.5 shrink-0 text-red-400">✗</span>
              <p className="text-sm text-[#1a1a1a]/60">{row.them}</p>
            </div>
            {/* Us */}
            <div className="flex items-start gap-2 px-6 py-4">
              <span className="mt-0.5 shrink-0 font-bold text-[#1a1a1a]">✓</span>
              <p className="text-sm font-bold text-[#1a1a1a]">{row.us}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}