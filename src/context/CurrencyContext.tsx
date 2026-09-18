"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

/* ───────────────────────────────────────────────
   Currency type & context value
   ─────────────────────────────────────────────── */
export type Currency = "INR" | "MYR";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Format a price with the correct symbol */
  formatPrice: (amountINR: number, amountMYR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const STORAGE_KEY = "genzcodemy_currency";

/* ───────────────────────────────────────────────
   Provider   wraps the app
   ─────────────────────────────────────────────── */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "INR" || stored === "MYR") {
        setCurrencyState(stored);
      }
    } catch {
      // SSR or storage blocked   keep default
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // storage blocked
    }
  };

  const formatPrice = (amountINR: number, amountMYR: number): string => {
    if (currency === "INR") {
      return `₹${amountINR.toLocaleString("en-IN")}`;
    }
    return `RM ${amountMYR.toLocaleString("en-MY")}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

/* ───────────────────────────────────────────────
   Hook   consume the context
   ─────────────────────────────────────────────── */
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a <CurrencyProvider>");
  return ctx;
}
