"use client";

import { motion } from "framer-motion";

// TODO: Replace with real value statements
const VALUES = [
  "Practical Learning Over Passive Watching",
  "Mentorship That Makes a Difference",
  "Focus on technologies and workflows used in real workplaces.",
  "Career Support - Resume reviews, mock interviews, portfolio guidance, and placement assistance",
  "Your learning experience and career growth are always our priority",
  "Built for Your Career."
];

export default function ValuesChecklist() {
  return (
    <section className="relative border-b-2 border-[#1a1a1a] bg-[#f5c518] px-6 py-24 overflow-hidden">

      {/* ── LARGE BACKGROUND TYPOGRAPHY ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none select-none absolute bottom-2 left-0 right-0"
        aria-hidden="true"
      >
        <p
          className="whitespace-nowrap text-center font-black uppercase tracking-tight text-[#1a1a1a]"
          style={{
            fontSize: "clamp(3.5rem, 14vw, 12rem)",
            opacity: 0.06,
            lineHeight: 1,
            fontFamily: "var(--font-gugi), sans-serif",
          }}
        >
  GENZCODEMY         </p>
      </motion.div>

      {/* ── DEVELOPER MICRO-LABELS ────────────────── */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-6 lg:left-14 hidden md:block font-mono text-[11px] font-bold tracking-wider text-[#1a1a1a]/30 pointer-events-none select-none"
      >
        &gt; learn_by_doing
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-8 right-6 lg:right-12 hidden md:block font-mono text-[11px] font-bold tracking-wider text-[#1a1a1a]/30 pointer-events-none select-none"
      >
        &gt; build_real_projects
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute top-[42%] left-6 lg:left-10 hidden lg:block font-mono text-[11px] font-bold tracking-wider text-[#1a1a1a]/30 pointer-events-none select-none"
      >
        &gt; get_mentored
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute top-[50%] right-6 lg:right-10 hidden lg:block font-mono text-[11px] font-bold tracking-wider text-[#1a1a1a]/30 pointer-events-none select-none"
      >
        &gt; become_job_ready
      </motion.span>

      {/* ── "IDEAS INTO SKILLS" TEXT (left side) ──── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute left-6 lg:left-14 top-[28%] hidden lg:flex flex-col items-start pointer-events-none select-none"
      >
        <span className="font-black text-lg uppercase tracking-tight text-[#1a1a1a]/50 italic leading-tight">
          Ideas<br />Into<br />Skills
        </span>
        {/* Small arrow pointing right */}
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="mt-2 text-[#1a1a1a]/30">
          <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="2" />
          <polyline points="19,2 24,6 19,10" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* ── ILLUSTRATION: Lightbulb (top-left) ──── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-6 left-16 lg:left-32 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/notes_code1.png"
          alt="take notes"
          className="w-16 h-16 lg:w-24 lg:h-24 object-contain drop-shadow-lg "
          aria-hidden="true"
        />
      </motion.div>

      {/* ── ILLUSTRATION: Laptop with code (top-right) ─ */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="absolute top-4 right-8 lg:right-24 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/laptop_code1.png"
          alt="Laptop with code"
          className="w-24 h-24 lg:w-32 lg:h-32 object-contain drop-shadow-lg "
          aria-hidden="true"
        />
      </motion.div>

      {/* ── ILLUSTRATION: Books (bottom-left) ────── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-16 left-6 lg:left-16 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/books_code.png"
          alt="Study Books"
          className="w-20 h-20 lg:w-28 lg:h-28 object-contain drop-shadow-lg "
          aria-hidden="true"
        />
      </motion.div>

      {/* ── ILLUSTRATION: Target (bottom-right) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="absolute bottom-12 right-6 lg:right-20 hidden md:block pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/target_code.png"
          alt="target your study"
          className="w-20 h-20 lg:w-28 lg:h-28 object-contain drop-shadow-lg "
          aria-hidden="true"
        />
      </motion.div>

      {/* ── GEOMETRIC ACCENTS ────────────────────── */}
      {/* Small dashes near lightbulb */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute top-12 left-[22%] hidden lg:block pointer-events-none"
      >
        <div className="flex flex-col gap-1.5 -rotate-12">
          <div className="w-4 h-[2px] bg-[#1a1a1a]/25" />
          <div className="w-3 h-[2px] bg-[#1a1a1a]/20 ml-1" />
        </div>
      </motion.div>

      {/* Small dashes near laptop */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute top-16 right-[20%] hidden lg:block pointer-events-none"
      >
        <div className="flex flex-col gap-1.5 rotate-12">
          <div className="w-4 h-[2px] bg-[#1a1a1a]/25" />
          <div className="w-3 h-[2px] bg-[#1a1a1a]/20 ml-1" />
          <div className="w-2 h-[2px] bg-[#1a1a1a]/15 ml-2" />
        </div>
      </motion.div>

      {/* ── EXISTING CONTENT (unchanged) ──────────── */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
          // values.md
        </p>
        <h2 className="mb-12 text-4xl font-black md:text-5xl">
          What we{" "}
          <i className="not-italic underline decoration-[#1a1a1a]">stand for</i>.
        </h2>

        <div className="space-y-0 border-2 border-[#1a1a1a] bg-white shadow-[8px_8px_0px_#1a1a1a]">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-start gap-4 border-b-2 border-[#1a1a1a] px-6 py-4 last:border-b-0"
            >
              {/* Yellow checkmark box — matches Study Plans card style */}
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] text-xs font-black">
                ✓
              </span>
              <p className="text-sm font-bold leading-relaxed text-[#1a1a1a]">
                {v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}