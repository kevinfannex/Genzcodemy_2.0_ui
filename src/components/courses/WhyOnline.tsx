"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function WhyOnline() {
  const offlinePoints = [
    "Fixed location and travel",
    "Fixed classroom schedules",
    "Limited access outside class",
    "Less flexibility for students",
    "Learning depends on physical attendance",
    "Difficult to revisit every explanation",
  ];

  const onlinePoints = [
    "Learn from anywhere",
    "Live mentor-led classes",
    "Recorded sessions for revision",
    "Weekly projects and assignments",
    "Online doubt support and feedback",
    "Learn without travel or relocation",
    "Easy access to learning resources",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#f8f7f2] px-6 py-20 text-[#1a1a1a] overflow-hidden border-y-[5px] border-[#1a1a1a]">
      <motion.div 
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50">
            // WHY_ONLINE.MD
          </p>
          <h2 className="mb-6 font-black tracking-tight text-5xl leading-[1.1] md:text-6xl lg:text-7xl">
            Why learn online <br />
            with <span className="relative inline-block  text-[#f5c518] " style={{ fontFamily: "var(--font-gugi)" }}>
              GENZCODEMY?
              <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-[#f5c518]"></span>
            </span>
          </h2>
          <p className="text-lg text-[#1a1a1a]/70">
            No classroom limits. Just live learning, real projects, and expert mentorship from wherever you are. </p>
        </motion.div>

        {/* Cards Section */}
        <div className="relative mb-12 grid md:grid-cols-2">
          {/* VS Circle */}
          <motion.div 
            variants={itemVariants}
            className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-[#f8f7f2] font-mono text-[10px] tracking-widest text-[#1a1a1a]/40 md:flex z-10"
          >
            VS
          </motion.div>

          {/* LEFT: Offline */}
          <motion.div variants={itemVariants} className="border border-[#1a1a1a]/20 p-8 md:p-12 md:border-r-0">
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="font-black text-2xl tracking-wide">
                <span className="mr-3 font-mono text-md text-[#1a1a1a]/40">#1</span>
                Traditional Offline Training
              </h3>
            </div>
            <div className="h-[1px] w-full bg-[#1a1a1a]/20"></div>
            <ul className="mt-10  space-y-5">
              {offlinePoints.map((point, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black"></span>
                  <span className="text-sm font-medium leading-relaxed text-[#1a1a1a]/80">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT: Online */}
          <motion.div variants={itemVariants} className="border border-[#1a1a1a]/20 p-8 md:p-12">
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="font-black text-2xl tracking-wide">
                <span className="mr-3 font-mono text-md text-[#1a1a1a]/40">#2</span>
                GenZCodemy Online
              </h3>
            </div>
            <div className="h-[1px]  bg-[#1a1a1a]/20"></div>
            <ul className="mt-10  space-y-5">
              {onlinePoints.map((point, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#f5c518]"></span>
                  <span className="text-sm font-medium leading-relaxed text-[#1a1a1a]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Highlighted Statement & CTA */}
        <motion.div variants={itemVariants} className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">
              BOTTOM LINE
            </p>
            <p className="font-black tracking-tight text-2xl md:text-3xl">
              Same mentor. Same curriculum. <br/>
              <span className="font-semibold">More flexibility.</span>
            </p>
          </div>
          <Link
            href="#courses"
            className="group relative inline-flex items-center justify-center border border-[#1a1a1a] px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all hover:bg-[#f5c518] hover:text-white"
          >
            Explore Online Courses 
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
