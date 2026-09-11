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
    <section className="relative border-b-2 border-[#1a1a1a] bg-white px-6 py-12 overflow-hidden">

      {/* ── FLOATING ILLUSTRATION: Trophy (top-right) ─── */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute -top-2 right-4 lg:right-16 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          src="/images/trophy.jpg"
          alt=""
          className="w-20 h-20 lg:w-28 lg:h-28 object-contain mix-blend-multiply"
          aria-hidden="true"
        />
      </motion.div> */}

      {/* ── FLOATING ILLUSTRATION: Mentor badge (bottom-left) ─── */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-8 left-4 lg:left-12 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          src="/images/mentor-badge.jpg"
          alt=""
          className="w-16 h-16 lg:w-24 lg:h-24 object-contain mix-blend-multiply"
          aria-hidden="true"
        />

      {/* Top-left: small dashes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute top-16 left-8 lg:left-20 hidden lg:block pointer-events-none"
      >
        <div className="flex flex-col gap-1.5 -rotate-12">
          <div className="w-4 h-[2px] bg-[#1a1a1a]/10" />
          <div className="w-3 h-[2px] bg-[#1a1a1a]/8 ml-1" />
        </div>
      </motion.div>

      {/* Bottom-right: small dashes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-20 right-8 lg:right-20 hidden lg:block pointer-events-none"
      >
        <div className="flex flex-col gap-1.5 rotate-12">
          <div className="w-4 h-[2px] bg-[#1a1a1a]/10" />
          <div className="w-3 h-[2px] bg-[#1a1a1a]/8 ml-1" />
          <div className="w-2 h-[2px] bg-[#1a1a1a]/6 ml-2" />
        </div>
      </motion.div>

      {/* ── EXISTING CONTENT (unchanged) ──────────── */}
      <div className="relative z-10 mx-auto max-w-6xl">
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