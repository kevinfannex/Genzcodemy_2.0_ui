"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface CoursePriceProps {
  priceINR: number;
  priceMYR: number;
  className?: string;
}

/**
 * Client component that displays a course price
 * in the currently-selected currency (INR or MYR).
 */
export default function CoursePrice({ priceINR, priceMYR, className }: CoursePriceProps) {
  const { formatPrice } = useCurrency();

  return <span className={className}>{formatPrice(priceINR, priceMYR)}</span>;
}
