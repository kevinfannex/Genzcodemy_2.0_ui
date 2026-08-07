// "use client"
"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom Instagram SVG Icon
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

// Custom LinkedIn SVG Icon
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Interactive hover text effect
export const TextHoverEffect = ({
  text,
  duration = 0.5,
  className = "",
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - rect.left) / rect.width) * 100;
      const cy = ((cursor.y - rect.top) / rect.height) * 100;
      setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none uppercase pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

// Subtle gradient background behind the footer
export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 -z-10"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
    }}
  />
);

export default function Footer() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] border-t-8 border-white text-white font-mono">
      
      <TextHoverEffect text="GENZCODEMY" className="absolute inset-0" duration={0.5} />
      <footer className="relative border-t-4 border-white bg-[#0a0a0a] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1 – Brand & Socials */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="text-2xl font-black uppercase tracking-wide" style={{ fontFamily: "var(--font-gugi)" }}>
                genzcodemy
              </Link>
              <p className="text-sm leading-relaxed text-white/70">
                Building careers through hands‑on technical education. 100% internship guarantee and placement support.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/genzcodemy/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors hover:border-[#f5c518] hover:text-[#f5c518]">
                  <LinkedinIcon />
                </a>
                <a href="https://www.instagram.com/genzcodemy_?igsh=b291ZmhyZmlzcTRo" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors hover:border-[#f5c518] hover:text-[#f5c518]">
                  <InstagramIcon />
                </a>
              </div>
            </div>
            {/* Column 2 – Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white">Quick Links</h3>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                <Link href="/" className="transition-colors hover:text-[#f5c518]">Home</Link>
                <Link href="/about" className="transition-colors hover:text-[#f5c518]">About Us</Link>
                <Link href="/courses" className="transition-colors hover:text-[#f5c518]">Our Courses</Link>
                <Link href="/hire-from-us" className="transition-colors hover:text-[#f5c518]">Hire From Us</Link>
                <Link href="/contact" className="transition-colors hover:text-[#f5c518]">Contact</Link>
              </div>
            </div>
            {/* Column 3 – Courses */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white">Courses</h3>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                <Link href="/courses/data-analytics" className="transition-colors hover:text-[#f5c518]">Data Analytics</Link>
                <Link href="/courses/python-full-stack" className="transition-colors hover:text-[#f5c518]">Python Full‑Stack + Gen AI</Link>
              </div>
            </div>
            {/* Column 4 – Contact Info */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white">Contact Info</h3>
              <div className="flex flex-col gap-4 text-sm text-white/70">
                <a href="mailto:connect@genzcodemy.com" className="flex items-center gap-3 transition-colors hover:text-[#f5c518]">
                  <Mail size={16} className="shrink-0" />
                  connect@genzcodemy.com
                </a>
                <a href="tel:8667668425" className="flex items-center gap-3 transition-colors hover:text-[#f5c518]">
                  <Phone size={16} className="shrink-0" />
                  8667668425
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>
                    Bangalore, India<br />
                    Kuala Lumpur, Malaysia
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between border-t border-white pt-8 text-xs text-white md:flex-row">
            <p>© {new Date().getFullYear()} Genzcodemy. All rights reserved.</p>
            {/* <div className="mt-4 flex gap-6 md:mt-0">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div> */}
          </div>
        </div>
        {/* Large watermark text */}
        {/* <div className="mt-8 overflow-hidden select-none pointer-events-none w-full flex justify-center md:mt-12">
          <p
            className="text-center uppercase leading-none tracking-tighter font-mono text-white"
            style={{
              fontFamily: "var(--font-gugi), sans-serif",
              fontSize: "clamp(3rem, 16vw, 20rem)",
              color: "rgba(255, 255, 255, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            GENZCODEMY
          </p>
        </div> */}
      </footer>
    </section>
  );
}
