"use client";

import { motion } from "framer-motion";

// Per-slug project gallery.
// TODO: Replace placeholder paths with real student project screenshots under /public/placeholders/
const PROJECTS: Record<
  string,
  { title: string; caption: string; image: string }[]
> = {
  "data-analytics": [
    {
      title: "Sales Dashboard",
      caption: "Power BI report connected to a Postgres warehouse",
      // TODO: replace with /placeholders/da-sales-dashboard.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Gemini_Generated_Image_ijl6aaijl6aaijl6.png",
    },
    {
      title: "Churn Analysis",
      caption: "Python notebook predicting customer churn with pandas & seaborn",
      // TODO: replace with /placeholders/da-churn-analysis.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Gemini_Generated_Image_nnuhjsnnuhjsnnuh.png",
    },
    {
      title: "SQL Report Automation",
      caption: "Scheduled SQL + Python pipeline emailing weekly KPI summaries",
      // TODO: replace with /placeholders/da-sql-automation.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/Gemini_Generated_Image_96lqig96lqig96lq.png",
    },
  ],
  "python-full-stack": [
    {
      title: "GenAI Chat Assistant",
      caption: "Full-stack AI chatbot with memory, authentication, document uploads, and streaming responses.FastAPI backend with JWT auth, deployed on Railway",
      // TODO: replace with /placeholders/fs-task-api.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/GenAI%20Chat%20Assistant.png",
    },
    {
      title: "AI SaaS Platform",
      caption: "Build and deploy a production-ready AI SaaS application with payments, authentication, and dashboards.",
      // TODO: replace with /placeholders/fs-react-dashboard.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/AI%20SaaS%20Platform.png",
    },
    {
      title: "AI Portfolio Builder",
      caption: "Create a professional portfolio powered by AI recommendations.",
      // TODO: replace with /placeholders/fs-capstone.png
      image: "https://ik.imagekit.io/g4lukt2ll/Genzcodemy/AI%20Portfolio%20Builder.png",
    },
  ],
};

// SVG placeholder — remove once real images are added
function PlaceholderImg({ label }: { label: string }) {
  return (
    <div className="flex h-48 w-full items-center justify-center bg-[#f5f5f5]">
      <svg width="100%" height="100%" viewBox="0 0 400 192" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="192" fill="#f0f0f0" />
        <line x1="0" y1="0" x2="400" y2="192" stroke="#d0d0d0" strokeWidth="1" />
        <line x1="400" y1="0" x2="0" y2="192" stroke="#d0d0d0" strokeWidth="1" />
        <text x="200" y="96" textAnchor="middle" dominantBaseline="middle" fill="#aaa" fontFamily="monospace" fontSize="12">
          {label}
        </text>
      </svg>
    </div>
  );
}

interface WhatYoullBuildProps {
  slug: string;
}

export default function WhatYoullBuild({ slug }: WhatYoullBuildProps) {
  const projects = PROJECTS[slug] ?? [];
  if (projects.length === 0) return null;

  return (
    <section className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40 md:text-xs">
          // what_you_ll_build
        </p>
        <h2 className="mb-8 text-3xl font-black text-white md:mb-12 md:text-5xl">
          You&apos;ll ship{" "}
          <i className="not-italic text-[#f5c518]">this</i>.
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="border-2 border-white/30 bg-[#242424] shadow-[6px_6px_0px_#f5c518] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_#f5c518]"
            >
              {/* Image area */}
              <div className="h-48 overflow-hidden border-b-2 border-white/20 relative">
                {p.image.startsWith("/placeholders/") ? (
                  <PlaceholderImg label={p.title} />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                )}
              </div>
              {/* Caption */}
              <div className="p-5">
                <h3 className="font-extrabold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-white/60">{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
