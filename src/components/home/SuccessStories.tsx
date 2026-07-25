"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "GENZCODEMY transformed my career! The mentorship and hands-on projects prepared me perfectly for my role.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_1.avif",
    name: "Sri Lekha",
    role: "Software Engineer at Qualcomm",
    initials: "SL",
    color: "#8993f4",
  },
  {
    text: "The Pro plan was worth every penny. Got an internship within 2 months and a full-time offer right after graduation!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_4.jpg",
    name: "Mohammed Asif",
    role: "DevOps Engineer at Zoho",
    initials: "MA",
    color: "#38b2ac",
  },
  {
    text: "Best decision I made! The Ultra plan mentorship helped me land my dream job with a great salary package.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_2.webp",
    name: "Sanjai Kumar",
    role: "QA Engineer at Wipro",
    initials: "SK",
    color: "#ff4a7e",
  },
  {
    text: "The comprehensive SAP training and real implementation projects made me job-ready. Now working with Fortune 500 clients!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_2.jpg",
    name: "Dhanalakshmi",
    role: "SAP Consultant at Deloitte",
    initials: "DH",
    color: "#f5c518",
  },
  {
    text: "The hands-on projects and weekly mentor sessions were game-changers. I built a portfolio that impressed every interviewer!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_3.avif",
    name: "Jebamalar",
    role: "Full Stack Developer at Chargebee",
    initials: "JB",
    color: "#fb923c",
  },
  {
    text: "From zero to hero! The Ultra plan placement guidance and direct referrals helped me land my dream job.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_3.jpg",
    name: "Umar Ali",
    role: "Cloud Engineer at Lucidity",
    initials: "UA",
    color: "#6dec86",
  },
  {
    text: "The comprehensive testing curriculum and real-world projects prepared me perfectly. Got placed within 3 months!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/gril_4.avif",
    name: "Kavishree Balaji",
    role: "Test Automation Engineer at Yellow.ai",
    initials: "KB",
    color: "#c084fc",
  },
  {
    text: "The detailed SAP modules and implementation projects gave me the confidence to work on enterprise-level clients.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_5.jpg",
    name: "Tamizharasan",
    role: "SAP FICO Consultant at Navi",
    initials: "TM",
    color: "#38b2ac",
  },
  {
    text: "GENZCODEMY project-based learning helped me build a strong portfolio. The internship guarantee was a lifesaver!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_1.avif",
    name: "Harish Kumar",
    role: "Frontend Developer at Zoho",
    initials: "HK",
    color: "#ff4a7e",
  },
];

// Scattered positions for avatars to make them look organic
// These are percentages of the container width/height
const SCATTER_POSITIONS = [
  { x: 8, y: 35 },
  { x: 18, y: 75 },
  { x: 30, y: 15 },
  { x: 42, y: 60 },
  { x: 52, y: 25 },
  { x: 65, y: 80 },
  { x: 75, y: 35 },
  { x: 86, y: 65 },
  { x: 94, y: 20 },
];

type Testimonial = typeof TESTIMONIALS[0];

function TooltipCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.92 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-50 w-72 border border-gray-100 bg-white shadow-2xl rounded-xl overflow-hidden pointer-events-none"
    >
      {/* Yellow header */}
      <div className="bg-[#f5c518]/10 px-4 py-3 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
        />
        <div>
          <p className="font-bold text-sm text-[#1a1a1a]">{t.name}</p>
          <p className="font-mono text-[10px] text-gray-500">{t.role}</p>
        </div>
      </div>
      {/* Quote */}
      <div className="px-4 py-3">
        <p className="text-sm text-[#1a1a1a]/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
      </div>
      {/* Pointer */}
      <div
        className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45"
        style={{ zIndex: -1 }}
      ></div>
    </motion.div>
  );
}

function AvatarDot({ t, xPct, yPct }: { t: Testimonial; xPct: number; yPct: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${hovered ? "z-50" : "z-0"}`}
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      <motion.div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: (xPct % 20) / 10 
        }}
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative h-16 w-16 rounded-full cursor-pointer bg-white z-10"
          style={{ border: "4px solid white", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.image}
            alt={t.name}
            className="h-full w-full rounded-full object-cover"
          />
        </motion.div>

        {/* Text underneath the avatar */}
        <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 w-32 text-center pointer-events-none">
          <p className="font-bold text-[#1a1a1a] text-xs truncate">{t.name}</p>
          <p className="font-sans text-[10px] text-gray-500 truncate">{t.role.split(" at ")[0]}</p>
        </div>

        <AnimatePresence>
          {hovered && <TooltipCard t={t} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function SuccessStories() {
  const xPositions = SCATTER_POSITIONS.map(pos => pos.x);
  const yPositions = SCATTER_POSITIONS.map(pos => pos.y);

  return (
    <section className="border-b-4 border-[#1a1a1a] bg-[#faf9f5] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/40">
            // success_stories
          </p>
          <h2 className="text-4xl font-black text-[#1a1a1a] md:text-6xl leading-[1.05]">
            Students Who{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Delivered.</span>
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#f5c518] -z-0 rounded"></span>
            </span>
          </h2>
          <p className="mt-4 font-mono text-base text-[#1a1a1a]/50">
            Hover each avatar to read their story.
          </p>
        </motion.div>

        {/* Avatars Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full overflow-visible py-8"
          style={{ height: "400px" }}
        >
          {/* Avatars placed loosely */}
          {TESTIMONIALS.map((t, i) => (
            <AvatarDot
              key={i}
              t={t}
              xPct={xPositions[i]}
              yPct={yPositions[i]}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
