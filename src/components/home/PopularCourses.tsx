"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const COURSES = [
  {
    slug: "data-analytics",
    title: "Data Analytics",
    badge: "DATA ANALYTICS",
    blurb: "Master data analysis, visualization, and storytelling using Excel, SQL, Python, Tableau, and PowerBI",
    highlights: [
      "Build Job-Ready Data Analytics Skills",
      "Hands-On Projects with Real-World Datasets",
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    slug: "python-full-stack",
    title: "Python Full Stack Web Development + Gen AI",
    badge: "WEB DEVELOPMENT + AI",
    blurb: "Combine full stack development with cutting-edge AI capabilities",
    highlights: [
      "Build Production-Ready AI Web Applications",
      "Create Industry-Ready Portfolio Projects",
    ],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
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
      className="group relative w-full overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Background Image with Zoom Effect on Hover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={course.imageUrl}
        alt={course.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"></div>

      {/* Content Container */}
      <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">

        {/* Top Section: Badge */}
        <div className="flex items-start">
          <span className="rounded-full bg-[#1a1a1a] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#f5c518]">
            {course.badge}
          </span>
        </div>

        {/* Middle Section: Details (slides up on hover) */}
        <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-20">
          <h3 className="text-3xl font-black text-white leading-tight">{course.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed">{course.blurb}</p>
          <ul className="mt-4 space-y-2">
            {course.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                <svg className="h-4 w-4 shrink-0 text-[#f5c518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section: CTA (revealed on hover) */}
        <div className="absolute -bottom-20 left-0 w-full p-8 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
          <button
            onClick={handleView}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-6 py-3 font-bold text-[#1a1a1a] transition-colors duration-200 hover:bg-[#f5c518] hover:border-[#f5c518]"
          >
            View Course Details
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PopularCourses() {
  return (
    <section className="border-b-4 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-black text-[#1a1a1a] md:text-6xl">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg text-[#1a1a1a]/60 max-w-xl mx-auto">
            Choose from our range of industry-focused courses designed for real-world success
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {COURSES.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}