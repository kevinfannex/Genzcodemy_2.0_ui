"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ── Icons ── */
const icons = [
  <svg key="01" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  <svg key="02" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>,
  <svg key="03" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
];

const STEPS = [
  {
    num: "01",
    label: "STEP 1",
    title: "Learn Real Skills",
    description:
      "Master industry tools through live classes, hands-on projects, and weekly mentor guidance.",
    tags: ["Live Classes", "Real Projects", "Weekly Mentorship"],
  },
  {
    num: "02",
    label: "STEP 2",
    title: "Build Real Experience",
    description:
      "Work on portfolio projects, complete internships, receive code reviews, and prepare for interviews.",
    tags: ["Portfolio", "Internship", "Mock Interviews"],
  },
  {
    num: "03",
    label: "STEP 3",
    title: "Launch Your Career",
    description:
      "Optimize your resume, attend hiring drives, connect with recruiters, and receive placement support.",
    tags: ["Resume", "Referrals", "Placement Support"],
  },
];

/* ── Shared variants ── */
const headerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const headerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

const tagVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const tagChild: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};



export default function Journey() {
  return (
    <section className="border-b-4 border-[#1a1a1a] bg-[#FAF9F5] px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* ── Section Header with stagger ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          {/* Developer label — slides up */}
          <motion.p
            variants={headerChild}
            className="mb-5 font-mono text-[11px] font-black uppercase tracking-widest text-[#1a1a1a]/40"
          >
            // CAREER_JOURNEY.MD
          </motion.p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <motion.div variants={headerChild} className="md:col-span-7">
              <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl md:text-6xl">
                Learn.{" "}
                {/* Yellow stamp — rotates in */}
                <motion.span
                  className="inline-block -rotate-1 border-2 border-[#1a1a1a] bg-[#f5c518] px-3 py-1 shadow-[4px_4px_0px_#1a1a1a]"
                  initial={{ rotate: 4, scale: 0.85, opacity: 0 }}
                  whileInView={{ rotate: -1, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "backOut" }}
                >
                  Build.
                </motion.span>{" "}
                <br />
                Get Hired.
              </h2>
            </motion.div>

            <motion.div
              variants={headerChild}
              className="border-l-2 border-[#1a1a1a]/10 md:col-span-5 md:pl-6"
            >
              <p className="text-sm font-medium leading-relaxed text-[#1a1a1a]/60">
                A simple roadmap followed by every GenzCodemy student to become
                industry-ready.
              </p>
              <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/30">
                // 3-STEP ROADMAP
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Animated connector line ── */}
        {/* <ConnectorLine /> */}

        {/* ── Step Cards ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -4,
                x: -2,
                boxShadow: "6px 8px 0px #1a1a1a",
                transition: { duration: 0.18, ease: "easeOut" },
              }}
              className="group flex flex-col border-2 border-[#1a1a1a] bg-white"
              style={{ boxShadow: "4px 4px 0px #1a1a1a" }}
            >
              {/* ── Card top bar ── */}
              <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] px-5 py-3">
                <motion.span
                  className="font-mono text-sm font-black text-[#1a1a1a]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.18 + 0.3 }}
                >
                  {step.num}
                </motion.span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                  {step.label}
                </span>
              </div>

              {/* ── Card body ── */}
              <div className="flex flex-1 flex-col p-6">
                {/* Icon box — pops in with a bounce */}
                <motion.div
                  className="mb-6 inline-flex h-11 w-11 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]"
                  initial={{ scale: 0, rotate: -12 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.18 + 0.25,
                    ease: "backOut",
                  }}
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                >
                  {icons[i]}
                </motion.div>

                {/* Title — slides up */}
                <motion.h3
                  className="mb-3 text-xl font-black leading-snug text-[#1a1a1a]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.18 + 0.35, ease: "easeOut" }}
                >
                  {step.title}
                </motion.h3>

                {/* Description — fades in */}
                <motion.p
                  className="mb-6 flex-1 text-sm font-medium leading-relaxed text-[#1a1a1a]/55"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.18 + 0.45 }}
                >
                  {step.description}
                </motion.p>

                {/* Tags — stagger in left-to-right */}
                <motion.div
                  className="flex flex-wrap gap-2 border-t border-[#1a1a1a]/10 pt-2"
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {step.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagChild}
                      className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40"
                    >
                      • {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
