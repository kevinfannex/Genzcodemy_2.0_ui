"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "250+", label: "Students Placed", color: "#6dec86" },
  { value: "50+", label: "Hiring Partners", color: "#f5c518" },
  { value: "100+", label: "Internship Providers", color: "#38b2ac" },
];

const MILESTONES = [
  {
    number: "01",
    title: "The Problem We Saw",
    body: "While studying engineering, our founder faced a stark reality — most technical institutes were profit‑driven, treating students as revenue sources rather than individuals deserving quality education and real career opportunities.",
    accent: "#ff4a7e",
  },
  {
    number: "02",
    title: "The Broken System",
    body: "Only 10–15 out of every 100 students actually got placed. The majority of organisations prioritised earnings over genuine impact, leaving students struggling and disillusioned despite heavy investments in their education.",
    accent: "#8993f4",
  },
  {
    number: "03",
    title: "The GENZCODEMY Answer",
    body: "We founded GENZCODEMY on one mission: transform student careers. Exceptional coaching, real placement opportunities, and unwavering support — so every learner can confidently land a rewarding job or launch their own venture.",
    accent: "#f5c518",
  },
];

export default function OriginStory() {
  return (
    <>
      {/* ─── WHO WE ARE ─── */}
      <section className="relative overflow-hidden border-b-4 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24 lg:py-32">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a06_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a06_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Floating accent shape — top-right */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [12, 16, 12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-6 top-12 z-0 hidden h-28 w-28 rounded-3xl border-4 border-[#1a1a1a] bg-[#f5c518] shadow-[6px_6px_0px_#1a1a1a] lg:block"
        />

        {/* Floating accent shape — bottom-left */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [-8, -12, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-4 bottom-16 z-0 hidden h-20 w-20 rounded-full border-4 border-[#1a1a1a] bg-[#38b2ac] shadow-[5px_5px_0px_#1a1a1a] lg:block"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left — Heading & Body */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-[3px] bg-[#f5c518]"
                />
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50">
                  who_we_are.md
                </p>
              </div>

              <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
                Bridging Education
                <br />
                <span className="text-[#f5c518]">&amp; Employment.</span>
              </h2>

              <div className="space-y-5 text-lg leading-relaxed text-[#1a1a1a]/75 md:text-xl">
                <p>
                  <strong
                    className="text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-gugi)" }}
                  >
                    GENZCODEMY
                  </strong>{" "}
                  is a leading technical education and coaching company dedicated
                  to preparing students for successful careers in technology.
                </p>
                <p>
                  We offer comprehensive training programs in{" "}
                  <span className="inline-block rounded-lg border-2 border-[#1a1a1a] bg-[#8993f4]/20 px-2 py-0.5 font-mono text-sm font-bold text-[#1a1a1a]">
                    Gen AI
                  </span>{" "}
                  <span className="inline-block rounded-lg border-2 border-[#1a1a1a] bg-[#38b2ac]/20 px-2 py-0.5 font-mono text-sm font-bold text-[#1a1a1a]">
                    Data Analytics
                  </span>{" "}
                  <span className="inline-block rounded-lg border-2 border-[#1a1a1a] bg-[#ff4a7e]/20 px-2 py-0.5 font-mono text-sm font-bold text-[#1a1a1a]">
                     Python Full Stack Dev 
                  </span>{" "}
                  <span className="inline-block rounded-lg border-2 border-[#1a1a1a] bg-[#f5c518]/20 px-2 py-0.5 font-mono text-sm font-bold text-[#1a1a1a]">
                    Testing
                  </span>{" "}
                  — combining theory with hands‑on project experience.
                </p>
              </div>
            </motion.div>

            {/* Right — Stat Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="flex flex-col gap-5"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                  whileHover={{
                    translateX: 4,
                    translateY: 4,
                    boxShadow: "3px 3px 0px #1a1a1a",
                  }}
                  className="flex items-center gap-6 rounded-2xl border-4 border-[#1a1a1a] bg-white p-5 shadow-[7px_7px_0px_#1a1a1a] transition-all md:p-6"
                >
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-3 border-[#1a1a1a] text-2xl font-black text-[#1a1a1a] md:h-20 md:w-20 md:text-3xl"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-lg font-bold text-[#1a1a1a] md:text-xl">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY GENZCODEMY STARTED ─── */}
      <section className="relative overflow-hidden border-b-4 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-24 lg:py-32">
        {/* Dark grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Floating accent — right */}
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [-6, -10, -6] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-8 top-20 z-0 hidden h-24 w-24 rounded-full border-4 border-[#f5c518] bg-[#f5c518]/10 lg:block"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-16 max-w-3xl lg:mb-20"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-[3px] bg-[#f5c518]"
              />
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#f5c518]">
                origin_story.log
              </p>
            </div>

            <h2 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Why{" "}
              <span
                className="text-[#f5c518]"
                style={{ fontFamily: "var(--font-gugi)" }}
              >
                GENZCODEMY
              </span>{" "}
              <br className="hidden md:block" />
              Was Born.
            </h2>

            <p className="text-lg leading-relaxed text-white/50 md:text-xl">
              Every great company starts with a frustration. Ours was watching
              hundreds of talented students fall through the cracks of a broken
              system.
            </p>
          </motion.div>

          {/* Timeline Milestone Cards */}
          <div className="relative">
            {/* Vertical connector line (desktop) */}
            <div className="absolute left-[23px] top-0 hidden h-full w-[4px] bg-white/10 lg:block" />

            <div className="flex flex-col gap-8 lg:gap-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="group relative flex gap-6 lg:gap-10"
                >
                  {/* Number circle */}
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#1a1a1a] text-lg font-black text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: m.accent }}
                  >
                    {m.number}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      translateX: 4,
                      translateY: 4,
                      boxShadow: "4px 4px 0px #1a1a1a",
                    }}
                    className="flex-1 rounded-2xl border-4 border-white/10 bg-white/5 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 md:p-8"
                  >
                    <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/60 md:text-lg">
                      {m.body}
                    </p>

                    {/* Accent bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="mt-5 h-[4px] rounded-full"
                      style={{ backgroundColor: m.accent }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}