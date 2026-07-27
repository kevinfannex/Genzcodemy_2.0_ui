"use client";

import React from "react";

export default function ReachUsDirectly() {
  return (
    <div className="border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[6px_6px_0px_#f5c518] md:shadow-[8px_8px_0px_#f5c518]">
      {/* macOS style dots */}
      <div className="flex items-center gap-1.5 border-b-2 border-[#1a1a1a] bg-[#2d2d2d] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/50">
          direct_contact.sh
        </span>
      </div>

      <div className="p-5 space-y-6 md:p-6">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#f5c518] mb-1 md:text-xs">
            // email_us
          </h3>
          {/* TODO: Replace with real email address */}
          <a
            href="mailto:admissions@genzcodemy.com"
            className="text-lg font-bold hover:underline"
          >
            connect@genzcodemy.com
          </a>
        </div>

        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#f5c518] mb-1 md:text-xs">
            // call_us
          </h3>
          {/* TODO: Replace with real phone number */}
          <a href="tel:+919876543210" className="text-lg font-bold hover:underline">
            +91 8667668425
          </a>
        </div>

        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#f5c518] mb-1 md:text-xs">
            // office_hours
          </h3>
          {/* TODO: Replace with real office hours */}
          <p className="text-sm text-white/70">
            Monday — Saturday: 10:00 AM — 7:00 PM IST
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#f5c518] mb-2 md:text-xs">
            // follow_us
          </h3>
          {/* TODO: Replace with real social media links */}
          <div className="flex gap-4 font-mono text-sm">
            <a
              href="https://www.instagram.com/genzcodemy_?igsh=b291ZmhyZmlzcTRo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/genzcodemy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/genzcodemy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
