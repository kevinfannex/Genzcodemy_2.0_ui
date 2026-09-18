"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "GENZCODEMY transformed my career! The mentorship and hands-on projects prepared me perfectly for my role.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_1.avif",
    name: "Sri Lekha",
    role: "Python Full Stack Developer at Qualcomm",
    initials: "SL",
    color: "#8993f4",
  },
  {
    text: "The Pro plan was worth every penny. Got an internship within 2 months and a full-time offer right after graduation!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_4.jpg",
    name: "Mohammed Asif",
    role: "Data Analyst at Zoho",
    initials: "MA",
    color: "#38b2ac",
  },
  {
    text: "Best decision I made! The Ultra plan mentorship helped me land my dream job with a great salary package.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_2.webp",
    name: "Sanjai Kumar",
    role: "Software Developer at Wipro",
    initials: "SK",
    color: "#ff4a7e",
  },
  {
    text: "The comprehensive SAP training and real implementation projects made me job-ready. Now working with Fortune 500 clients!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_2.jpg",
    name: "Dhanalakshmi",
    role: "Software Engineer at Deloitte",
    initials: "DH",
    color: "#f5c518",
  },
  {
    text: "The hands-on projects and weekly mentor sessions were game-changers. I built a portfolio that impressed every interviewer!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_3.avif",
    name: "Jebamalar",
    role: "Frontend Developer at Chargebee",
    initials: "JB",
    color: "#fb923c",
  },
  {
    text: "From zero to hero! The Ultra plan placement guidance and direct referrals helped me land my dream job.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_3.jpg",
    name: "Umar Ali",
    role: "Backend Developer at Lucidity",
    initials: "UA",
    color: "#6dec86",
  },
  {
    text: "The comprehensive testing curriculum and real-world projects prepared me perfectly. Got placed within 3 months!",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/gril_4.avif",
    name: "Kavishree Balaji",
    role: " Associate Analyst at Yellow.ai",
    initials: "KB",
    color: "#c084fc",
  },
  {
    text: "The detailed SAP modules and implementation projects gave me the confidence to work on enterprise-level clients.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_5.jpg",
    name: "Tamizharasan",
    role: "Junior Data Analyst at Navi",
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
  {
    text: "The Python Full Stack course gave me the confidence to build complete web applications from frontend to backend. The mentor feedback and projects made a huge difference.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_7.webp",
    name: "Arun Prakash",
    role: "Python Full Stack Developer",
    initials: "AP",
    color: "#6366f1",
  },
  {
    text: "The practical training helped me understand how software is actually developed. Building projects and preparing for interviews made me much more confident.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_5.webp",
    name: "Keerthana S",
    role: "Software Engineer",
    initials: "KS",
    color: "#06b6d4",
  },
  {
    text: "The Data Analytics sessions made SQL, Excel, and Power BI much easier to understand. The projects gave me something concrete to showcase during interviews.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_6.jpg",
    name: "Rohit Kumar",
    role: "Associate Analyst",
    initials: "RK",
    color: "#22c55e",
  },
  {
    text: "I really liked the project-based approach. Working with real datasets and getting feedback from mentors helped me develop practical analytics skills.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_4.avif",
    name: "Nivetha R",
    role: "Junior Data Analyst",
    initials: "NR",
    color: "#f97316",
  },
  {
    text: "The combination of Python, React, APIs, and AI tools gave me a much clearer understanding of full stack development. The portfolio projects were especially valuable.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_8.webp",
    name: "Vignesh M",
    role: "Python Full Stack Developer",
    initials: "VM",
    color: "#8b5cf6",
  },
  {
    text: "The web development modules were top notch. It gave me real world confidence and got me a high-paying job.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_2.webp",
    name: "Surya Prakash",
    role: "Frontend Developer",
    initials: "SP",
    color: "#ff4a7e",
  },
  {
    text: "I built several projects with Gen AI which definitely made my resume stand out among other freshers.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_1.avif",
    name: "Preethi M",
    role: "Full Stack Engineer",
    initials: "PM",
    color: "#38b2ac",
  },
  {
    text: "Thanks to the intensive bootcamp, I cracked the interview at a top MNC without any prior tech background.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_4.jpg",
    name: "Karthik Raja",
    role: "Data Analyst",
    initials: "KR",
    color: "#f5c518",
  },
  {
    text: "Awesome experience! Mentors are always available for doubt clearance and the curriculum is very up-to-date.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/girl_3.avif",
    name: "Sneha V",
    role: "Software Developer",
    initials: "SV",
    color: "#fb923c",
  },
  {
    text: "The mock interviews and resume building sessions helped me understand what recruiters actually look for.",
    image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/boy_5.jpg",
    name: "Ramesh Kannan",
    role: "Backend Engineer",
    initials: "RK",
    color: "#c084fc",
  }
];

// Scattered positions for avatars to make them look organic
// These are percentages of the container width/height
const SCATTER_POSITIONS = [
  // Row 1
  { x: 5, y: 15 },
  { x: 25, y: 15 },
  { x: 45, y: 15 },
  { x: 65, y: 15 },
  { x: 85, y: 15 },
  // Row 2
  { x: 15, y: 35 },
  { x: 35, y: 35 },
  { x: 55, y: 35 },
  { x: 75, y: 35 },
  { x: 95, y: 35 },
  // Row 3
  { x: 5, y: 60 },
  { x: 25, y: 60 },
  { x: 45, y: 60 },
  { x: 65, y: 60 },
  { x: 85, y: 60 },
  // Row 4
  { x: 15, y: 85 },
  { x: 35, y: 85 },
  { x: 55, y: 85 },
  { x: 75, y: 85 },
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
            {"// success_stories"}
          </p>
          <h2 className="text-4xl font-black text-[#1a1a1a] md:text-6xl leading-[1.05]">
            Students Who{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Delivered.</span>
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#f5c518] -z-0 rounded"></span>
            </span>
          </h2>
          <p className="mt-4 font-mono text-base text-[#1a1a1a]/50">
            <span className="hidden md:inline">Hover each avatar to read their story.</span>
            <span className="md:hidden">Swipe to read their stories.</span>
          </p>
        </motion.div>

        {/* Desktop Avatars Container - Scattered Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden w-full overflow-visible py-8 md:block"
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

        {/* Mobile Container - Horizontal Carousel */}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 md:hidden hide-scrollbar">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="w-[85vw] shrink-0 snap-center rounded-2xl border-2 border-[#1a1a1a] bg-white p-6 shadow-[6px_6px_0px_#1a1a1a]"
            >
              <div className="mb-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full border-2 border-[#1a1a1a] object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{t.name}</p>
                  <p className="font-mono text-[10px] text-gray-500">{t.role.split(" at ")[0]}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#1a1a1a]/80">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
