"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ── Checklist data ── */
const CHECKLIST = [
  "You're a fresher chasing your first job",
  "You're confused about what to learn",
  "You're from a tier-2 / tier-3 college",
  "You're from a non-CS background",
  "You've watched 100 videos and still feel stuck",
  "You've applied and got no calls",
  "Coding rounds and interviews scare you",
];

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function AudienceChecklist() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left column — heading */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs">
              // IS THIS YOU?
            </p>
            <h2 className="mb-6 text-3xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
              This is for you
              <br />
              <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">
                if...
              </i>
            </h2>
            <p className="max-w-sm text-base font-medium leading-relaxed text-[#1a1a1a]/60 md:text-lg">
              You don&apos;t have to be ready.
              <br />
              You just have to be serious.
            </p>

            {/* Decorative accent block */}
            <div className="mt-10 hidden lg:block">
              <div className="h-3 w-24 bg-[#f5c518]" />
            </div>
          </motion.div>

          {/* Right column — checklist */}
          <div className="lg:col-span-7">
            <div className="border-2 border-[#1a1a1a] bg-[#faf9f5]">
              {CHECKLIST.map((item, i) => (
                <motion.div
                  key={item}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-[#f5c518]/10 ${
                    i < CHECKLIST.length - 1
                      ? "border-b border-[#1a1a1a]/10"
                      : ""
                  }`}
                >
                  {/* Circle check icon */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#1a1a1a]/20 text-[#1a1a1a]/30 transition-all group-hover:border-[#f5c518] group-hover:bg-[#f5c518] group-hover:text-[#1a1a1a]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-[#1a1a1a]/80 md:text-base">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
