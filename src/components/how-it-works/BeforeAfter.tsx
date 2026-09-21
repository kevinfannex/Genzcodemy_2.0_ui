"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ── Comparison data ── */
const ROWS = [
  { before: "Jumping between random videos", after:"Following one clear roadmap"},
  { before: "Keep Learning without direction ", after: "Knowing what to learn next"},
  { before: "Wondering what companies expect", after: "Building skills companies look for"},
  { before: "Nervous about interviews", after: "Practising before the real thing"},
  { before: "Applying and hearing nothing back", after:"Building a profile that gets noticed"},
  { before: "figuring out all aline ", after:"Having someone to guide you forward"},
];

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function BeforeAfter() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-14 max-w-2xl">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs">
            // SIDE BY SIDE
          </p>
          <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
            Before vs{" "}
            <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">
              After.
            </i>
          </h2>
        </motion.div>

        {/* ── Desktop table (hidden on mobile) ── */}
        <div className="hidden md:block">
          <motion.table
            variants={fadeUp}
            className="w-full border-collapse text-left"
          >
            <thead>
              <tr>
                <th className="w-1/2 border-2 border-[#1a1a1a] bg-white p-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                    Before Genzcodemy
                  </span>
                </th>
                <th className="w-1/2 border-2 border-[#1a1a1a] bg-[#f5c518] p-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
                    After Genzcodemy
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row.before}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group transition-colors hover:bg-[#1a1a1a]/[0.02]"
                >
                  <td className="border-2 border-[#1a1a1a] bg-white p-5 text-sm font-medium text-[#1a1a1a]/60">
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center border-2 border-grey  text-[8px] font-black leading-none">
                      ✘
                      </span>
                      {row.before}
                    </span>
                  </td>
                  <td className="border-2 border-[#1a1a1a] bg-[#f5c518]/10 p-5 text-sm font-bold text-[#1a1a1a]">
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] text-[8px] font-black leading-none">
                        ✓
                      </span>
                      {row.after}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* ── Mobile stacked cards (visible on mobile) ── */}
        <div className="space-y-4 md:hidden">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.before}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="border-2 border-[#1a1a1a] bg-white"
            >
              {/* Before */}
              <div className="border-b border-[#1a1a1a]/10 px-5 py-4">
                <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]/30">
                  Before
                </p>
                <p className="text-sm font-medium text-[#1a1a1a]/55 line-through decoration-[#1a1a1a]/20">
                  {row.before}
                </p>
              </div>
              {/* After */}
              <div className="bg-[#f5c518]/10 px-5 py-4">
                <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]/50">
                  After
                </p>
                <p className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a]">
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] text-[8px] font-black leading-none">
                    ✓
                  </span>
                  {row.after}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
