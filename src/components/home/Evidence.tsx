"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, inView]);

  return count;
}

const STATS = [
  {
    id: "#1",
    value: 78,
    suffix: "%",
    label: "Placement rate",
    sub: "across all cohorts",
    highlight: false,
  },
  {
    id: "#2",
    value: 50,
    suffix: "+",
    label: "Hiring partners",
    sub: "actively recruiting",
    highlight: false,
  },
  {
    id: "#3",
    value: 500,
    suffix: "+",
    label: "Engineers trained",
    sub: "and counting",
    highlight: false,
  },
  {
    id: "#4",
    value: 8,
    prefix: "₹",
    suffix: " LPA",
    label: "Top package",
    sub: "at product companies",
    highlight: true,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const,  },
  },
};

function StatCard({
  stat,
}: {
  stat: (typeof STATS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const animatedValue = useCounter(stat.value, 1800, isInView);

  const formattedValue =
    stat.value >= 1000
      ? animatedValue.toLocaleString()
      : animatedValue;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={`relative flex flex-col justify-between p-6 md:p-8 min-h-[200px] md:min-h-[240px] ${
        stat.highlight
          ? "bg-[#f5c518] text-[#1a1a1a]"
          : "bg-[#1a1a1a]"
      }`}
    >
      {/* Index tag */}
      <span
        className={`font-mono text-[10px] font-bold tracking-widest ${
          stat.highlight ? "text-[#1a1a1a]/50" : "text-[#f5c518]/60"
        }`}
      >
        {stat.id}
      </span>

      {/* Big number */}
      <div className="my-4 md:my-6">
        <h3
          className={`text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight font-serif ${
            stat.highlight ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          {stat.prefix ?? ""}
          {formattedValue}
          {stat.suffix}
        </h3>
      </div>

      {/* Label */}
      <div>
        <p
          className={`text-sm font-bold ${
            stat.highlight ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          {stat.label}
        </p>
        <p
          className={`text-xs mt-0.5 ${
            stat.highlight ? "text-[#1a1a1a]/60" : "text-white/40"
          }`}
        >
          {stat.sub}
        </p>
      </div>
    </motion.div>
  );
}

export default function Evidence() {
  return (
    <section className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Same grid background as WhyGenzcodemy */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f5c518]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#f5c518]">
              THE EVIDENCE
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight font-serif">
            We get freshers{" "}
            <em className="italic">hired.</em>
          </h2>

          {/* Subheading */}
          <p className="mt-5 text-base md:text-lg text-white/50">
            Real skills. Real projects.{" "}
            <em className="text-[#f5c518] not-italic font-semibold italic">
              A real job.
            </em>
          </p>
        </motion.div>

        {/* Stats Grid — bordered cells like image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#333] border border-[#333]"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
