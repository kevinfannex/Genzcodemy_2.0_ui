"use client";

import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FinalCTAProps {
  /** Target date for the countdown. Defaults to 14 days from page load. */
  targetDate?: Date;
}

function getDaysLeft(target: Date): number {
  const diff = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function FinalCTA({ targetDate }: FinalCTAProps) {
  const { requireAuth } = useAuthGate();
  const router = useRouter();

  // Default: 14 days from now
  const [target] = useState(
    () => targetDate ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  );
  const [daysLeft, setDaysLeft] = useState(getDaysLeft(target));

  // Update every minute in case the tab is left open
  useEffect(() => {
    const id = setInterval(() => setDaysLeft(getDaysLeft(target)), 60_000);
    return () => clearInterval(id);
  }, [target]);

  const handleEnrollClick = () => {
    if (requireAuth("/courses/data-analytics")) {
      router.push("/courses/data-analytics");
    }
  };

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-28 text-center">
      <div className="mx-auto max-w-3xl">
        {/* Yellow banner */}
        {/* <div className="mb-8 inline-block border-2 border-[#f5c518] bg-[#f5c518] px-6 py-3 shadow-[6px_6px_0px_#ffffff]">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">
            Batch closes in{" "}
            <span className="text-2xl">
              {daysLeft}
            </span>{" "}
            {daysLeft === 1 ? "day" : "days"}
          </p>
        </div> */}

        <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
          Stop watching tutorials.{" "}
          <i className="not-italic text-[#f5c518]">Start building.</i>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          Join the 2026 batch before seats close. Real projects, real mentors, real outcomes   or your money back.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleEnrollClick}
            className="border-2 border-[#f5c518] bg-[#f5c518] px-8 py-4 text-lg font-black text-[#1a1a1a] shadow-[6px_6px_0px_#ffffff] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Enroll now   before it closes
          </button>
        </div>

        <p className="mt-6 font-mono text-xs text-white/30">
          No spam. Cancel anytime before batch starts.
        </p>
      </div>
    </section>
  );
}
