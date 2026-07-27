"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01.",
    title: "Tell Us Your Hiring Needs",
    body: "Share the role, required skills, and experience you're looking for.",
  },
  {
    num: "02.",
    title: "Get Handpicked Candidates",
    body: "Receive a curated shortlist of job-ready graduates matched to your requirements.",
  },
  {
    num: "03.",
    title: "Interview & Choose",
    body: "Meet shortlisted candidates, assess their skills, and select the right fit.",
  },
  {
    num: "04.",
    title: "Hire with Confidence",
    body: "Onboard your new team member with continued support from GenZCodemy.",
  },
];

export default function HiringProcessSteps() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/30 md:text-xs">
          // hiring_process.sh
        </p>
        <h2 className="mb-10 text-3xl font-black text-white md:mb-14 md:text-5xl">
          How it{" "}
          <i className="not-italic text-[#f5c518]">works</i>.
        </h2>

        {/* Desktop: horizontal | Mobile: stacked */}
        <div className="relative flex flex-col gap-8 md:flex-row md:gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative flex-1"
            >
              {/* Connector line — desktop only, not after last */}
              {/* {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-6 hidden h-px w-1/2 border-t-2 border-dashed border-white/20 md:block" />
              )} */}

              <div className="h-full border-2 border-white/20 bg-[#242424] p-6 md:mr-6">
                <p className="mb-3 font-mono text-2xl font-black text-[#f5c518]">
                  {step.num}
                </p>
                <h3 className="mb-2 text-lg font-extrabold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}