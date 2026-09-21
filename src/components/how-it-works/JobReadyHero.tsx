"use client";

import { motion, useInView, animate } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Stats data ── */
const STATS = [
  { value: 90, suffix: "%", label: "PLACEMENT RATE" },
  { value: 2000, suffix: "+", label: "LEARNING PARTNERS" },
  { value: 7, suffix: "", label: "STEPS TO OFFERS" },
];

function CountingStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayValue(Math.floor(v));
        }
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p className="text-2xl font-black text-[#1a1a1a] md:text-3xl">
        {displayValue}{suffix}
      </p>
      <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 md:text-[10px]">
        {label}
      </p>
    </div>
  );
}

/* ── Minimal editorial SVG illustration ── */
function PathwayIllustration() {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Grid background lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * 32}
          x2="400"
          y2={i * 32}
          stroke="#1a1a1a"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * 32}
          y1="0"
          x2={i * 32}
          y2="360"
          stroke="#1a1a1a"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}

      {/* Connecting path */}
      <motion.path
        d="M 60 280 L 60 200 L 160 200 L 160 140 L 260 140 L 260 80 L 340 80"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Step 1: Student (person icon) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <rect x="36" y="256" width="48" height="48" fill="#1a1a1a" />
        <circle cx="60" cy="270" r="6" fill="#f5c518" />
        <rect x="54" y="280" width="12" height="16" rx="1" fill="#f5c518" />
        <text x="60" y="320" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1a1a1a" opacity="0.5">STUDENT</text>
      </motion.g>

      {/* Step 2: Learning (book/screen icon) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <rect x="136" y="176" width="48" height="48" fill="white" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="144" y="184" width="32" height="20" fill="#f5c518" />
        <line x1="144" y1="212" x2="176" y2="212" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="144" y1="216" x2="168" y2="216" stroke="#1a1a1a" strokeWidth="1" opacity="0.3" />
        <text x="160" y="240" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1a1a1a" opacity="0.5">LEARNING</text>
      </motion.g>

      {/* Step 3: Interview (speech bubble) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.1 }}
      >
        <rect x="236" y="116" width="48" height="48" fill="#1a1a1a" />
        <rect x="244" y="124" width="32" height="22" rx="2" fill="#f5c518" />
        <polygon points="252,146 256,154 260,146" fill="#f5c518" />
        <line x1="250" y1="131" x2="270" y2="131" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="250" y1="136" x2="264" y2="136" stroke="#1a1a1a" strokeWidth="1" />
        <text x="260" y="180" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1a1a1a" opacity="0.5">INTERVIEW</text>
      </motion.g>

      {/* Step 4: Job Offer (document with checkmark) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        <rect x="316" y="56" width="48" height="48" fill="#f5c518" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="326" y="64" width="28" height="32" fill="white" stroke="#1a1a1a" strokeWidth="1" />
        <polyline points="332,80 338,86 348,72" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="340" y="120" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#1a1a1a" opacity="0.5">OFFER</text>
      </motion.g>

      {/* Arrow heads on path */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 2 }}
      >
        <polygon points="336,76 344,80 336,84" fill="#1a1a1a" />
      </motion.g>
    </svg>
  );
}

export default function JobReadyHero() {
  const { requireAuth } = useAuthGate();
  const router = useRouter();

  const handleRegister = () => {
    if (requireAuth("/courses")) {
      router.push("/courses");
    }
  };

  const scrollToSystem = () => {
    const el = document.getElementById("the-system");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] border-b-2 border-[#1a1a1a] bg-[#faf9f5] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #1a1a1a10 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a10 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center"
        >
          {/* Left — Text */}
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50 md:text-xs"
            >
              // THE JOB-READY PATH
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-black leading-[1.05] tracking-tight text-[#1a1a1a] sm:text-5xl md:text-6xl lg:text-7xl"
            >
             From feeling stuck

              <br />
 to landing your {" "}
              <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20 decoration-4 underline-offset-4">
               first offer.
              </i>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-base font-medium leading-relaxed text-[#1a1a1a]/65 md:text-lg"
            >
             You don&apos;t need another playlist of tutorials.
              <br />
             You need a clear path, practical skills, and someone to guide you from learning to getting hired.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleRegister}
                className="border-2 border-[#1a1a1a] bg-[#f5c518] px-7 py-3.5 text-sm font-black text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Start your journey →
              </button>
              <button
                onClick={scrollToSystem}
                className="border-2 border-[#1a1a1a] bg-white px-7 py-3.5 text-sm font-black text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
              >
                See how it works →
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-14 flex gap-8 border-t-2 border-[#1a1a1a]/10 pt-8 md:gap-12"
            >
              {STATS.map((stat) => (
                <CountingStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </motion.div>
          </div>

          {/* Right — Illustration */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative border-2 border-[#1a1a1a] bg-[#f5c518] p-6 shadow-[8px_8px_0px_#1a1a1a] md:p-8">
              {/* Corner label */}
              <div className="absolute top-0 left-0 border-b-2 border-r-2 border-[#1a1a1a] bg-white px-3 py-1">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]/50">
                  YOUR PATH
                </span>
              </div>
              <PathwayIllustration />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
