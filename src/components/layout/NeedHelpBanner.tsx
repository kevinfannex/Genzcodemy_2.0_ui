"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function NeedHelpBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#f5c518] py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex items-center justify-center gap-3 px-4 text-sm font-medium text-[#1a1a1a] flex-wrap">
        <span className="font-semibold">Need help? Talk to us at</span>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="tel:+918667668425"
            className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 transition-colors hover:text-[#0a0a0a]"
          >
            <span aria-label="India">🇮🇳</span> +91 8667668425
          </a>
          <span className="text-black/30 hidden sm:inline">|</span>
          <a
            href="tel:+60147644153"
            className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 transition-colors hover:text-[#0a0a0a]"
          >
            <span aria-label="Malaysia">🇲🇾</span> +60 147644153
          </a>
        </div>
        <span className="text-black/30 hidden sm:inline">|</span>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition-colors hover:text-[#0a0a0a]"
        >
          Request a Call
          <ExternalLink size={14} className="shrink-0" />
        </Link>
      </div>
    </div>
  );
}
