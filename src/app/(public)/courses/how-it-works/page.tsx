"use client";

import JobReadyHero from "@/components/how-it-works/JobReadyHero";
import HiringSystem from "@/components/how-it-works/HiringSystem";
import BeforeAfter from "@/components/how-it-works/BeforeAfter";
import AudienceChecklist from "@/components/how-it-works/AudienceChecklist";
import JobReadyCTA from "@/components/how-it-works/JobReadyCTA";

export default function HowItWorksPage() {
  return (
    <>
      {/* Section 1 — Hero: CONFUSION → SYSTEM intro */}
      <JobReadyHero />

      {/* Section 2 — The 7-step system */}
      <HiringSystem />

      {/* Section 3 — Before vs After transformation */}
      <BeforeAfter />

      {/* Section 4 — Audience checklist + Final CTA */}
      <AudienceChecklist />
      <JobReadyCTA />
    </>
  );
}
