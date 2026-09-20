"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ── Step data ── */
const STEPS = [
  {
    num: "01",
    title: "WE FIND WHERE YOU ARE.",
    description:
      "A quick skill assessment tells us your starting point — no judgement, just clarity on what to build first.",
  },
  {
    num: "02",
    title: "WE GIVE YOU ONE PATH.",
    description:
      "No more choosing between 50 tutorials. One structured curriculum, built around what companies actually hire for.",
  },
  {
    num: "03",
    title: "YOU LEARN BY DOING.",
    description:
      "Live classes, real projects, weekly code reviews. You build things that go on your portfolio, not into the void.",
  },
  {
    num: "04",
    title: "WE TRACK YOUR PROGRESS.",
    description:
      "Weekly check-ins and a progress dashboard. You always know where you stand and what to do next.",
  },
  {
    num: "05",
    title: "WE TRAIN YOU FOR INTERVIEWS.",
    description:
      "Mock interviews, DSA prep, HR rounds — we drill every format until the real thing feels like practice.",
  },
  {
    num: "06",
    title: "YOU ATTEND REAL DRIVES.",
    description:
      "We connect you with our 50+ hiring partners. You walk into actual interviews with actual companies.",
  },
  {
    num: "07",
    title: "WE DON'T LEAVE YOU ALONE.",
    description:
      "12 months of career mentorship after the course. Resume reviews, job switches, salary negotiation — we're there.",
  },
];

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ── Minimal step icons ── */
function StepIcon({ num }: { num: string }) {
  const icons: Record<string, React.ReactNode> = {
    "01": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
    "02": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    "03": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    "04": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    "05": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "06": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    "07": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  };
  return <>{icons[num] ?? null}</>;
}

export default function HiringSystem() {
  return (
    <section
      id="the-system"
      className="scroll-mt-20 border-b-2 border-[#1a1a1a] bg-white px-6 py-24 md:py-32"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={headerVariants} className="mb-16 max-w-2xl">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs">
            // THE SYSTEM
          </p>
          <h2 className="mb-5 text-3xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
            How we get freshers{" "}
            <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">
              hired.
            </i>
          </h2>
          <p className="text-base font-medium leading-relaxed text-[#1a1a1a]/60 md:text-lg">
            Seven steps. One path. Each step earns the next.
            <br />
            You always know where you are.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{
                y: -4,
                x: -2,
                boxShadow: "6px 8px 0px #1a1a1a",
                transition: { duration: 0.18, ease: "easeOut" },
              }}
              className="group flex flex-col border-2 border-[#1a1a1a] bg-white"
              style={{ boxShadow: "4px 4px 0px #1a1a1a" }}
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] px-5 py-3">
                <span className="font-mono text-sm font-black text-[#1a1a1a]">
                  {step.num}
                </span>
                <div className="flex h-7 w-7 items-center justify-center border-2 border-[#1a1a1a] bg-[#f5c518] text-[#1a1a1a]">
                  <StepIcon num={step.num} />
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 font-mono text-xs font-black uppercase tracking-wider text-[#1a1a1a]">
                  {step.title}
                </h3>
                <p className="flex-1 text-sm font-medium leading-relaxed text-[#1a1a1a]/55">
                  {step.description}
                </p>

                {/* Bottom accent line — reveals on hover */}
                <div className="mt-5 h-[3px] w-0 bg-[#f5c518] transition-all duration-300 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
