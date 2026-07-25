"use client";

import React from "react";

interface EnquiryTypeChipsProps {
  selectedType: string;
  onChange: (type: string) => void;
}

const OPTIONS = [
  "Course info",
  "Batch dates",
  "Fees",
  "Hiring partnership",
  "Other",
];

export default function EnquiryTypeChips({
  selectedType,
  onChange,
}: EnquiryTypeChipsProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60">
        // enquiry_type *
      </label>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = selectedType === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`border-2 border-[#1a1a1a] px-3.5 py-1.5 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-[#f5c518] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]"
                  : "bg-white text-[#1a1a1a] hover:bg-[#1a1a1a]/5"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
