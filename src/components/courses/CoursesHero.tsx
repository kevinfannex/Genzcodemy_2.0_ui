"use client";

import { useEffect, useRef, useState } from "react";
import type { Course } from "@/types";

interface CoursesHeroProps {
  courses: Pick<Course, "slug" | "title">[];
}

export default function CoursesHero({ courses }: CoursesHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToCourse = (slug: string) => {
    const el = document.getElementById(`course-${slug}`);
    if (el) {
      // offset for sticky nav
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[45vh] items-end border-b-2 border-[#1a1a1a] bg-[#faf9f5] px-6 pb-16 pt-24 overflow-hidden"
      >
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, #1a1a1a10 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a10 1px, transparent 1px)`,
            backgroundSize: "36px 36px"
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60 font-bold">
            courses.catalog
          </p>
          <h1
            className="font-black leading-[0.95] tracking-tight text-[#1a1a1a]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            Master<br />
            your <i className="not-italic text-[#f5c518] underline decoration-[#1a1a1a]/20">craft.</i>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium text-[#1a1a1a]/70 md:text-xl">
            Intensive cohorts, real-world projects, and direct placements. Pick your track and start shipping.
          </p>
        </div>
      </section>

    </>
  );
}
