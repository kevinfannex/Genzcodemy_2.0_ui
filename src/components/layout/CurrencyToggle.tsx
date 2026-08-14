"use client";

import { useCurrency, type Currency } from "@/context/CurrencyContext";
import { useState, useRef, useEffect } from "react";

const OPTIONS: { value: Currency; flag: string; label: string; fullLabel: string; symbol: string }[] = [
  { value: "INR", flag: "🇮🇳", label: "INR", fullLabel: "India — INR ₹", symbol: "₹" },
  { value: "MYR", flag: "🇲🇾", label: "MYR", fullLabel: "Malaysia — MYR RM", symbol: "RM" },
];

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = OPTIONS.find((o) => o.value === currency) || OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-2 border-[#1a1a1a] bg-[#faf9f5] px-3.5 py-2 font-mono text-sm font-bold text-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1a1a] focus:outline-none cursor-pointer"
        type="button"
      >
        <span>🌐 {currentOption.symbol} {currentOption.label}</span>
        <span className="text-xs transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 lg:left-auto lg:right-0 z-50 mt-2 w-56 border-2 border-[#1a1a1a] bg-[#faf9f5] shadow-[4px_4px_0px_#1a1a1a]">
          <div className="py-1 flex flex-col">
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  setCurrency(o.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left font-mono text-xs font-bold transition-all cursor-pointer ${
                  currency === o.value
                    ? "bg-[#f5c518] text-[#1a1a1a]"
                    : "text-[#1a1a1a]/80 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]"
                }`}
                type="button"
              >
                <span className="text-base">{o.flag}</span>
                <span>{o.fullLabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
