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
    <section className="border-b-2 border-[#1a1a1a] bg-[#f5c518] px-6 py-24">
      <div className="mx-auto max-w-4xl">
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