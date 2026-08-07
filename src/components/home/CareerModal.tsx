"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";

interface CareerModalProps {
  onClose: () => void;
}

export default function CareerModal({ onClose }: CareerModalProps) {
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Escape key handler
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    // Confetti burst from both bottom corners
    const duration = 2000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#4f46e5", "#e11d48", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"],
        zIndex: 1000,
      });
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#4f46e5", "#e11d48", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"],
        zIndex: 1000,
      });
    }, 500);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
      style={{ background: "rgba(13,13,13,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Modal card */}
      <motion.div
        className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border-2 border-[#1a1a1a] bg-[#faf9f7]"
        style={{ boxShadow: "8px 8px 0px #1a1a1a" }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac-style window bar */}
        <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#eae8e4] px-5 py-3">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-[#1a1a1a] bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[#1a1a1a] bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[#1a1a1a] bg-[#27c93f]" />
          </div>

          {/* Window title */}
          <span className="font-mono text-[0.85rem] font-bold text-[#555555]">
            admission_portal.sh
          </span>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center rounded p-1 text-[#1a1a1a] transition-colors hover:bg-black/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="flex flex-col items-center px-8 pb-8 pt-7 text-center">
          {/* Badge */}
          <span
            className="mb-6 inline-block rounded border-2 border-[#1a1a1a] bg-[#f5c518] px-3 py-1 font-mono text-[0.85rem] font-black text-[#1a1a1a]"
            style={{ boxShadow: "2px 2px 0px #1a1a1a" }}
          >
            [ 2026 BATCH OPEN ]
          </span>

          {/* Heading */}
          <h2 className="mb-4 text-[2.25rem] font-extrabold leading-tight tracking-tight text-[#1a1a1a]">
            Are you a 2026 Passout?
          </h2>

          {/* Subtitle */}
          <p className="mb-8 max-w-[400px] text-base font-medium leading-relaxed text-[#555555]">
            Looking to start your career? You landed in the right place!
          </p>

          {/* CTA button */}
          <Link
            href="/courses"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-lg border-2 border-[#1a1a1a] bg-[#1a1a1a] px-7 py-4 text-[1.1rem] font-bold text-white no-underline transition-all duration-200"
            style={{ boxShadow: "4px 4px 0px #f5c518" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px #f5c518";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px #f5c518";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(2px, 2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0px #f5c518";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px #f5c518";
            }}
          >
            Start my Career 🚀
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
