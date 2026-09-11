"use client";

import { motion } from "framer-motion";

export default function MissionStatement() {
  return (
    <section className="border-b-2 border-[#1a1a1a] bg-white px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
          mission_statement.md
        </p>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex-1"
          >
            {/* Oversized bold sentence — key word italicised + yellow */}
            <p
              className="font-black leading-[1.05] tracking-tight text-[#1a1a1a]"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
            >
              We teach people to{" "}
              <i className="not-italic text-[#f5c518]">build</i>,<br />
              not just learn. &nbsp;
            </p>

            {/* Supporting sentence */}
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#1a1a1a]/65">
              Every course is built around practical learning, real-world projects, expert mentorship, and career support so you graduate with skills that employers value, not just another certificate.
            </p>
          </motion.div>

          {/* Right — Mission image */}
          <div className="relative w-full max-w-md flex-shrink-0 lg:w-[420px]">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative flex items-center justify-center w-full h-full min-h-[300px] lg:min-h-[500px]"
            >
              <img
                src="https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Mission_statement.png"
                alt="Genzcodemy Mission — We teach people to build"
                className="w-full h-auto object-contain scale-[1.2] origin-center lg:origin-right"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}