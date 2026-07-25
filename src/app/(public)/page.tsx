"use client";

import Hero from "@/components/home/Hero";
import WhyGenzcodemy from "@/components/home/WhyGenzcodemy";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import PopularCourses from "@/components/home/PopularCourses";
import SuccessStories from "@/components/home/SuccessStories";
import BuildLogDemo from "@/components/home/BuildLogDemo";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — rotating tagline + count-up stat + existing enroll logic */}
      <Hero />

      {/* 2. Why Genzcodemy — 3-card staggered grid */}
      <WhyGenzcodemy />

      {/* 3. Tech Stack Marquee — auto-scrolling tool names */}
      <TechStackMarquee />

      {/* 4. Popular Courses — flip cards with curriculum reveal */}
      <PopularCourses />

      {/* 5. Success Stories — horizontal drag-scroll carousel */}
      <SuccessStories />

      {/* 6. Build Log Demo — animated fake terminal */}
      <BuildLogDemo />

      {/* 7. Final CTA — countdown + enroll button */}
      <FinalCTA />
    </>
  );
}
