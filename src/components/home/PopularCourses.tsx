"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const COURSES = [
  {
    slug: "data-analytics",
    number: "01",
    tag: "MOST JOB OPENINGS",
    title: "Data Analyst + Gen AI",
    tech: "SQL · Python · Pandas · Power BI · Excel",
    build: "Build: end-to-end data dashboards",
    footer: "DATA ANALYST + GEN AI",
  },
  {
    slug: "python-full-stack",
    number: "02",
    tag: "PRODUCT & AI ROLES",
    title: "Python Full Stack + Gen AI",
    tech: "Python · FastAPI · React · SQL · AI",
    build: "Build: deployed full-stack app",
    footer: "FULL STACK / AI DEV",
  },
];

function CourseCard({ course, index }: { course: (typeof COURSES)[0]; index: number }) {
  const { requireAuth } = useAuthGate();
  const router = useRouter();

  const handleView = () => {
    if (requireAuth(`/courses/${course.slug}`)) {
      router.push(`/courses/${course.slug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative flex flex-col justify-between w-full border-[1.5px] border-[#e0ddcd] bg-[#f4f2e9] p-8 md:p-12 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex justify-between items-start mb-12">
        <h2 className="text-5xl md:text-6xl font-serif text-[#292929]">{course.number}</h2>
        <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-[#8c8a82] uppercase pt-2">
          {course.tag}
        </span>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">{course.title}</h3>
        <p className="font-mono text-xs md:text-sm text-[#7a7871] mb-2">{course.tech}</p>
        <p className="font-mono text-xs md:text-sm text-[#7a7871]">{course.build}</p>
      </div>

      <div className="border-t border-[#e0ddcd] pt-6 mb-16 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleView}
            className="text-sm font-bold text-[#1a1a1a] border-b-[1.5px] border-[#1a1a1a] pb-1 hover:text-[#505050] hover:border-[#505050] transition-colors"
          >
            Explore program
          </button>
          <svg className="w-4 h-4 text-[#1a1a1a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <Link href="https://wa.me/YOUR_NUMBER_HERE" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8c8a82] hover:text-[#1a1a1a] transition-colors">
          <MessageCircle className="w-4 h-4" />
          ASK DOUBT
        </Link>
      </div>

      <div className="mt-auto">
        <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#8c8a82] uppercase">
          {course.footer}
        </p>
      </div>
    </motion.div>
  );
}

export default function PopularCourses() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="border-b-4 border-[#1a1a1a] bg-[#fcfbf9] overflow-hidden">
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <h2 className="text-5xl font-black text-[#1a1a1a] md:text-6xl">
            Popular Courses
          </h2>
        </motion.div>

        <div className="mb-16 md:mb-24">
          <p className="text-[#7a7871] max-w-3xl text-sm md:text-base leading-relaxed">
            Nobody picks on day one. Everyone starts with Foundation, one month, from zero, any branch, any marks. After
            that, you pick your track - knowing what you&apos;re actually good at. No blind guess.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 relative">
          {COURSES.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>

        <div className="flex justify-end mt-12 gap-1">
          <div className="w-3 h-3 bg-[#fce95a] border border-[#1a1a1a]"></div>
          <div className="w-3 h-3 bg-[#136c72] border border-[#1a1a1a]"></div>
        </div>

        {/* Divider line like // CAREER_JOURNEY.MD */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex items-center gap-4"
        >
          <div className="h-[2px] w-8 bg-[#1a1a1a]/20" />
          <p className="font-mono text-[11px] font-black uppercase tracking-widest text-[#1a1a1a]/30">
            {"// CAREER_JOURNEY.MD"}
          </p>
          <div className="h-[2px] flex-1 bg-[#1a1a1a]/10" />
        </motion.div>

      </motion.div>
    </section>
  );
}