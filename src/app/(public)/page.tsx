"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Hero from "@/components/home/Hero";
import WhyGenzcodemy from "@/components/home/WhyGenzcodemy";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import PopularCourses from "@/components/home/PopularCourses";
import SixThings from "@/components/home/SevenThings";
import SuccessStories from "@/components/home/SuccessStories";
import BuildLogDemo from "@/components/home/BuildLogDemo";
import FinalCTA from "@/components/home/FinalCTA";
import CareerModal from "@/components/home/CareerModal";
import Journey from "@/components/home/Journey";
import Evidence from "@/components/home/Evidence";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem("careerModalShown")) return;

    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    sessionStorage.setItem("careerModalShown", "true");
  };

  return (
    <>
      {/* Career Modal   auto-triggers 3s after load, once per session */}
      <AnimatePresence>
        {isModalOpen && <CareerModal onClose={handleCloseModal} />}
      </AnimatePresence>

      {/* 1. Hero   rotating tagline + count-up stat + existing enroll logic */}
      <Hero />

      {/* 2. Why Genzcodemy   3-card staggered grid */}
      <WhyGenzcodemy />

      {/* 3. Tech Stack Marquee   auto-scrolling tool names */}
      <TechStackMarquee />

      {/* 4. Popular Courses   flip cards with curriculum reveal */}
      <PopularCourses />

      {/* 5. Six Things that actually help you get hired */}
      <SixThings />

      {/* 6. Evidence   placement stats */}
      <Evidence />

      {/* 7. Journey   3-step career roadmap */}
      <Journey />

      {/* 7. Success Stories   horizontal drag-scroll carousel */}
      <SuccessStories />

      {/* 6. Build Log Demo   animated fake terminal */}
      {/* <BuildLogDemo /> */}

      {/* 7. Final CTA   countdown + enroll button */}
      <FinalCTA />
    </>
  );
}
