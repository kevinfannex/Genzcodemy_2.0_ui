"use client";

import { motion, Variants } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import { label } from "framer-motion/client";

/* ───────────────────────────────────────────────
   Configurable pricing per column & currency
   ─────────────────────────────────────────────── */
const PRICING = {
  genzcodemy: { inr: "From ₹15,000", myr: "From RM 750" },
  bigEdtech: { inr: "₹10,000 – ₹1,50,000+", myr: "RM 500 – RM 7,500+" },
  localInstitute: { inr: "₹20,000 – ₹1,00,000+", myr: "RM 1,000 – RM 5,000+" },
};

/* ───────────────────────────────────────────────
   Comparison rows
   ─────────────────────────────────────────────── */
const ROWS = [
  {
    label: "Learning Format",
    genz: "Live online classes",
    big: "Mostly recorded + online sessions",
    local: "Classroom-based",
  },
  {
    label: "Curriculum",
    genz: "Career-focused & structured",
    big: "Broad and self-paced",
    local: "Institute-specific",
  },
  {
    label: "Mentorship",
    genz: "Direct mentor guidance",
    big: "Limited / batch-based",
    local: "In-person guidance",
  },
  {
    label: "Projects",
    genz: "Hands-on portfolio projects",
    big: "Course-based projects",
    local: "Varies by institute",
  },
  {
    label: "Feedback",
    genz: "Regular project feedback",
    big: "Mostly self-managed",
    local: "Depends on trainer",
  },
  {
    label: "Interview Preparation",
    genz: "Mock interviews + guidance",
    big: "Available in selected programs",
    local: "Varies",
  },
  {
    label: "Career Support",
    genz: "Resume + LinkedIn + placement support",
    big: "Program-dependent",
    local: "Varies",
  },
  {
    label: "Flexibility",
    genz: "Learn from anywhere",
    big: "High",
    local: "Location & schedule dependent",
  },
  {
    label: "Community",
    genz: "Online learning community",
    big: "Large learner network",
    local: "Local batch community",
  },
  {
    label: "Best For",
    genz: "Students focused on skills + career growth",
    big: "Self-paced learners",
    local: "Students who prefer physical classrooms",
  },
];

const VERDICTS = {
  genz: "Career-focused",
  big: "Best for scale & variety",
  local: "Best for in-person learning",
};

export default function CompareOptions() {
  const { currency } = useCurrency();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const currentPricing = {
    genz: currency === "INR" ? PRICING.genzcodemy.inr : PRICING.genzcodemy.myr,
    big: currency === "INR" ? PRICING.bigEdtech.inr : PRICING.bigEdtech.myr,
    local: currency === "INR" ? PRICING.localInstitute.inr : PRICING.localInstitute.myr,
  };

  return (
    <section className="bg-[#f8f7f2] px-4 py-20 text-[#1a1a1a] md:px-6 overflow-hidden">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ── Header ─────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50">
              // COMPARE_THE_OPTIONS
            </p>
            <h2 className="mb-4 font-black tracking-tight text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
              Which learning path <br className="hidden md:block" />
              fits your goals?
            </h2>
            <p className="text-lg font-medium text-[#1a1a1a]/70">
              Three ways to learn tech. Compare the experience, support, and career focus before you choose.
            </p>
          </div>
        </motion.div>

        {/* ── Desktop table (hidden on mobile) ──── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            {/* Column headers */}
            <motion.thead variants={itemVariants}>
              <tr>
                <th className="w-[22%] border-2 border-[#1a1a1a] bg-white p-5 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40">
                  Feature
                </th>
                {/* GenZCodemy – highlighted */}
                <th className="w-[26%] border-2 border-[#1a1a1a] bg-[#f5c518] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xl tracking-tight text-[#1a1a1a]">GenZCodemy</span>
                    <span className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                      Recommended
                    </span>
                  </div>
                </th>
                <th className="w-[26%] border-2 border-[#1a1a1a] bg-white p-5 font-black text-xl tracking-tight text-[#1a1a1a]">
                  Big EdTech Platforms
                </th>
                <th className="w-[26%] border-2 border-[#1a1a1a] bg-white p-5 font-black text-xl tracking-tight text-[#1a1a1a]">
                  Local Training Institutes
                </th>
              </tr>
            </motion.thead>

            <motion.tbody>
              <motion.tr variants={itemVariants} className="group">
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-black text-sm">Price Range</td>
                <td className="border-2 border-[#1a1a1a] bg-[#f5c518]/20 p-5">
                  <motion.span
                    key={currentPricing.genz}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-black text-lg"
                  >
                    {currentPricing.genz}
                  </motion.span>
                </td>
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-mono text-sm font-bold text-[#1a1a1a]/60">
                  {currentPricing.big}
                </td>
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-mono text-sm font-bold text-[#1a1a1a]/60">
                  {currentPricing.local}
                </td>
              </motion.tr>
              {ROWS.map((row, i) => (

                <motion.tr variants={itemVariants} key={row.label} className="group transition-colors hover:bg-[#1a1a1a]/[0.03]">
                  <td className="border-2 border-[#1a1a1a] p-5 font-bold text-sm">{row.label}</td>
                  <td className="border-2 border-[#1a1a1a] bg-[#f5c518]/10 p-5 text-sm font-medium">
                    <span className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#f5c518] text-base leading-none">✓</span>
                      {row.genz}
                    </span>
                  </td>
                  <td className="border-2 border-[#1a1a1a] p-5 text-sm font-medium text-[#1a1a1a]/70">{row.big}</td>
                  <td className="border-2 border-[#1a1a1a] p-5 text-sm font-medium text-[#1a1a1a]/70">{row.local}</td>
                </motion.tr>
              ))}

              {/* Pricing row */}
              {/* <tr className="group">
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-black text-sm">Price Range</td>
                <td className="border-2 border-[#1a1a1a] bg-[#f5c518]/20 p-5">
                  <motion.span
                    key={currentPricing.genz}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-black text-lg"
                  >
                    {currentPricing.genz}
                  </motion.span>
                </td>
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-mono text-sm font-bold text-[#1a1a1a]/60">
                  {currentPricing.big}
                </td>
                <td className="border-2 border-[#1a1a1a] bg-[#1a1a1a]/5 p-5 font-mono text-sm font-bold text-[#1a1a1a]/60">
                  {currentPricing.local}
                </td>
              </tr> */}

              {/* Verdict row */}
              <motion.tr variants={itemVariants}>
                <td className="border-2 border-[#1a1a1a] p-5 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">
                  Verdict
                </td>
                <td className="border-2 border-[#1a1a1a] bg-[#f5c518]/10 p-5 font-black text-base tracking-tight">
                  {VERDICTS.genz}
                </td>
                <td className="border-2 border-[#1a1a1a] p-5 font-bold text-sm text-[#1a1a1a]/60">
                  {VERDICTS.big}
                </td>
                <td className="border-2 border-[#1a1a1a] p-5 font-bold text-sm text-[#1a1a1a]/60">
                  {VERDICTS.local}
                </td>
              </motion.tr>
            </motion.tbody>
          </table>
        </div>

        {/* ── Mobile cards (visible only on mobile) ── */}
        <div className="space-y-8 md:hidden">
          {/* GenZCodemy card */}
          <motion.div variants={itemVariants} className="border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a]">
            <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#f5c518] p-5">
              <h3 className="font-black text-xl">GenZCodemy</h3>
              <span className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                Recommended
              </span>
            </div>
            <div className="divide-y divide-[#1a1a1a]/10">
              {ROWS.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 p-4">
                  <span className="text-sm font-bold text-[#1a1a1a]/60 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium text-right">{row.genz}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 bg-[#f5c518]/10 p-4">
                <span className="text-sm font-black">Price</span>
                <motion.span
                  key={currentPricing.genz}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-black text-right"
                >
                  {currentPricing.genz}
                </motion.span>
              </div>
              <div className="p-4 text-center font-black text-sm tracking-tight bg-[#f5c518]/5">
                {VERDICTS.genz}
              </div>
            </div>
          </motion.div>

          {/* Big EdTech card */}
          <motion.div variants={itemVariants} className="border-2 border-[#1a1a1a] bg-white shadow-[4px_4px_0px_#1a1a1a]">
            <div className="border-b-2 border-[#1a1a1a] p-5">
              <h3 className="font-black text-xl">Big EdTech Platforms</h3>
            </div>
            <div className="divide-y divide-[#1a1a1a]/10">
              {ROWS.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 p-4">
                  <span className="text-sm font-bold text-[#1a1a1a]/60 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium text-[#1a1a1a]/70 text-right">{row.big}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 bg-[#1a1a1a]/5 p-4">
                <span className="text-sm font-black">Price</span>
                <span className="font-mono text-sm font-bold text-[#1a1a1a]/60 text-right">{currentPricing.big}</span>
              </div>
              <div className="p-4 text-center font-bold text-sm text-[#1a1a1a]/60">
                {VERDICTS.big}
              </div>
            </div>
          </motion.div>

          {/* Local Institutes card */}
          <motion.div variants={itemVariants} className="border-2 border-[#1a1a1a] bg-white shadow-[4px_4px_0px_#1a1a1a]">
            <div className="border-b-2 border-[#1a1a1a] p-5">
              <h3 className="font-black text-xl">Local Training Institutes</h3>
            </div>
            <div className="divide-y divide-[#1a1a1a]/10">
              {ROWS.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 p-4">
                  <span className="text-sm font-bold text-[#1a1a1a]/60 shrink-0">{row.label}</span>
                  <span className="text-sm font-medium text-[#1a1a1a]/70 text-right">{row.local}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 bg-[#1a1a1a]/5 p-4">
                <span className="text-sm font-black">Price</span>
                <span className="font-mono text-sm font-bold text-[#1a1a1a]/60 text-right">{currentPricing.local}</span>
              </div>
              <div className="p-4 text-center font-bold text-sm text-[#1a1a1a]/60">
                {VERDICTS.local}
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
