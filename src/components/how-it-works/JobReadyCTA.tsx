"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useAuthGate } from "@/components/auth/AuthGateModal";
import { useRouter } from "next/navigation";

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function JobReadyCTA() {
  const { requireAuth } = useAuthGate();
  const router = useRouter();

  const handleRegister = () => {
    if (requireAuth("/courses")) {
      router.push("/courses");
    }
  };

  return (
    <section className="bg-[#1a1a1a] px-6 py-24 md:py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Yellow eyebrow */}
        <motion.div variants={fadeUp}>
          <span className="inline-block border-2 border-[#f5c518] bg-[#f5c518] px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] shadow-[3px_3px_0px_#ffffff30]">
            STILL SCARED?
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="mt-8 text-3xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          &ldquo;What if I{" "}
          <i className="not-italic text-[#f5c518]">can&apos;t</i> do
          it?&rdquo;
        </motion.h2>

        {/* Supporting text */}
        <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-white/50 md:text-lg">
            That&apos;s fair. Almost everyone feels it.
            <br />
            The system is built for exactly that.
          </p>
          <div className="mx-auto my-8 h-px w-16 bg-white/20" />
          <p className="text-base font-semibold leading-relaxed text-white/70 md:text-lg">
            You don&apos;t get ready first, then start.
            <br />
            <span className="text-[#f5c518]">
              You start, and the system makes you ready.
            </span>
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={handleRegister}
            className="border-2 border-[#f5c518] bg-[#f5c518] px-8 py-4 text-sm font-black text-[#1a1a1a] shadow-[6px_6px_0px_#ffffff20] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Register now →
          </button>
          <Link
            href="/contact"
            className="border-2 border-white/30 bg-transparent px-8 py-4 text-sm font-black text-white transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]"
          >
            Talk to a counsellor
          </Link>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-xs text-white/25"
        >
          No spam. Cancel anytime before batch starts.
        </motion.p>
      </motion.div>
    </section>
  );
}
