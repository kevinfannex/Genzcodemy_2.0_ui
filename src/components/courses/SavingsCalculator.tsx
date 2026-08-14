"use client";

import { useState } from "react";

interface SavingsCalculatorProps {
  courseTitle?: string;
  onlinePriceINR?: number;
  onlinePriceMYR?: number;
  offlinePriceINR?: number;
  offlinePriceMYR?: number;
}

export default function SavingsCalculator({
  courseTitle,
  onlinePriceINR = 15000,
  onlinePriceMYR = 1000,
  offlinePriceINR = 45000,
  offlinePriceMYR = 3000,
}: SavingsCalculatorProps) {
  // Course Selector states (only used if courseTitle is not passed)
  const [selectedCourse, setSelectedCourse] = useState<"analytics" | "fullstack">("analytics");

  // Location and Currency states
  const [location, setLocation] = useState<"bangalore" | "malaysia">("bangalore");
  const [currency, setCurrency] = useState<"INR" | "MYR">("INR");

  // Inputs
  const [duration, setDuration] = useState(6); // months
  const [rent, setRent] = useState(15000); // monthly rent + food
  const [travel, setTravel] = useState(2000); // monthly travel
  const [commuteTime, setCommuteTime] = useState(2); // hours per day

  // Configured Online Prices
  const prices = {
    analytics: {
      onlineINR: 15000,
      onlineMYR: 1000,
      offlineINR: 45000,
      offlineMYR: 3000,
    },
    fullstack: {
      onlineINR: 20000,
      onlineMYR: 1500,
      offlineINR: 60000,
      offlineMYR: 4500,
    },
  };

  // Determine current active prices
  const activeOnlinePrice = courseTitle
    ? (currency === "INR" ? onlinePriceINR : onlinePriceMYR)
    : (selectedCourse === "analytics"
        ? (currency === "INR" ? prices.analytics.onlineINR : prices.analytics.onlineMYR)
        : (currency === "INR" ? prices.fullstack.onlineINR : prices.fullstack.onlineMYR));

  const activeOfflinePrice = courseTitle
    ? (currency === "INR" ? offlinePriceINR : offlinePriceMYR)
    : (selectedCourse === "analytics"
        ? (currency === "INR" ? prices.analytics.offlineINR : prices.analytics.offlineMYR)
        : (currency === "INR" ? prices.fullstack.offlineINR : prices.fullstack.offlineMYR));

  // Sync Location & Currency
  const handleLocationChange = (loc: "bangalore" | "malaysia") => {
    setLocation(loc);
    if (loc === "bangalore") {
      setCurrency("INR");
      setRent(15000);
      setTravel(2000);
    } else {
      setCurrency("MYR");
      setRent(1000);
      setTravel(150);
    }
  };

  const handleCurrencyChange = (cur: "INR" | "MYR") => {
    setCurrency(cur);
    if (cur === "INR") {
      setLocation("bangalore");
      setRent(15000);
      setTravel(2000);
    } else {
      setLocation("malaysia");
      setRent(1000);
      setTravel(150);
    }
  };

  // Calculations
  const totalLivingCosts = rent * duration;
  const totalTravelCosts = travel * duration;
  const offlineTotal = activeOfflinePrice + totalLivingCosts + totalTravelCosts;
  const onlineTotal = activeOnlinePrice;
  const savings = Math.max(0, offlineTotal - onlineTotal);
  const totalTimeSaved = commuteTime * 20 * duration;

  // Format Helper
  const formatVal = (val: number) => {
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `RM ${val.toLocaleString()}`;
  };

  // Slider limits
  const rentMax = currency === "INR" ? 50000 : 4000;
  const rentStep = currency === "INR" ? 1000 : 100;
  const travelMax = currency === "INR" ? 10000 : 800;
  const travelStep = currency === "INR" ? 500 : 25;

  return (
    <section className="bg-[#faf9f5] border-b-4 border-[#1a1a1a] px-4 py-16 text-[#1a1a1a] md:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50">
            // YOUR_SAVINGS.MD
          </p>
          <h2 className="mb-2 text-2xl font-black tracking-tight md:text-4xl">
            What could you save by learning online?
          </h2>
          <p className="text-sm font-medium text-[#1a1a1a]/70">
            Adjust your situation to compare estimated offline and online costs.
          </p>
        </div>

        {/* Compact Top Controls Row */}
        <div className="mb-8 flex flex-wrap gap-4 border-2 border-[#1a1a1a] bg-white p-4 shadow-[4px_4px_0px_#1a1a1a]">
          <div className="flex flex-wrap gap-6 items-center w-full justify-between">
            {/* Location Selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Location:</span>
              <div className="flex border-2 border-[#1a1a1a]">
                <button
                  onClick={() => handleLocationChange("bangalore")}
                  className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer border-r-2 border-[#1a1a1a] ${
                    location === "bangalore" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                  }`}
                  type="button"
                >
                  Bangalore
                </button>
                <button
                  onClick={() => handleLocationChange("malaysia")}
                  className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                    location === "malaysia" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                  }`}
                  type="button"
                >
                  Malaysia
                </button>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Currency:</span>
              <div className="flex border-2 border-[#1a1a1a]">
                <button
                  onClick={() => handleCurrencyChange("INR")}
                  className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer border-r-2 border-[#1a1a1a] ${
                    currency === "INR" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                  }`}
                  type="button"
                >
                  ₹ INR
                </button>
                <button
                  onClick={() => handleCurrencyChange("MYR")}
                  className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                    currency === "MYR" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                  }`}
                  type="button"
                >
                  RM MYR
                </button>
              </div>
            </div>

            {/* Course Selector (Conditional) */}
            {!courseTitle && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Course:</span>
                <div className="flex border-2 border-[#1a1a1a]">
                  <button
                    onClick={() => setSelectedCourse("analytics")}
                    className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer border-r-2 border-[#1a1a1a] ${
                      selectedCourse === "analytics" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                    }`}
                    type="button"
                  >
                    Data Analytics
                  </button>
                  <button
                    onClick={() => setSelectedCourse("fullstack")}
                    className={`px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                      selectedCourse === "fullstack" ? "bg-[#f5c518]" : "bg-white hover:bg-[#1a1a1a]/5"
                    }`}
                    type="button"
                  >
                    Python Full Stack
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Two-Column Calculator */}
        <div className="grid grid-cols-1 border-4 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a] md:grid-cols-2">
          
          {/* LEFT: Your Situation */}
          <div className="border-b-4 border-[#1a1a1a] p-6 md:border-b-0 md:border-r-4">
            <h3 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">// YOUR SITUATION</h3>
            
            <div className="space-y-5">
              {/* Duration Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <label htmlFor="duration-slider">Training Duration</label>
                  <span className="font-mono text-xs bg-[#faf9f5] border border-[#1a1a1a] px-1.5 py-0.5">{duration} Months</span>
                </div>
                <input
                  id="duration-slider"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#f5c518] cursor-pointer h-1.5 bg-[#faf9f5] border border-[#1a1a1a] rounded-none outline-none appearance-none"
                />
              </div>

              {/* Rent + Food Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <label htmlFor="rent-slider">Monthly Rent + Food</label>
                  <span className="font-mono text-xs bg-[#faf9f5] border border-[#1a1a1a] px-1.5 py-0.5">{formatVal(rent)}</span>
                </div>
                <input
                  id="rent-slider"
                  type="range"
                  min={rentStep}
                  max={rentMax}
                  step={rentStep}
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full accent-[#f5c518] cursor-pointer h-1.5 bg-[#faf9f5] border border-[#1a1a1a] rounded-none outline-none appearance-none"
                />
              </div>

              {/* Travel Cost Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <label htmlFor="travel-slider">Monthly Travel Cost</label>
                  <span className="font-mono text-xs bg-[#faf9f5] border border-[#1a1a1a] px-1.5 py-0.5">{formatVal(travel)}</span>
                </div>
                <input
                  id="travel-slider"
                  type="range"
                  min="0"
                  max={travelMax}
                  step={travelStep}
                  value={travel}
                  onChange={(e) => setTravel(Number(e.target.value))}
                  className="w-full accent-[#f5c518] cursor-pointer h-1.5 bg-[#faf9f5] border border-[#1a1a1a] rounded-none outline-none appearance-none"
                />
              </div>

              {/* Daily Travel Time Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <label htmlFor="commute-slider">Daily Travel Time</label>
                  <span className="font-mono text-xs bg-[#faf9f5] border border-[#1a1a1a] px-1.5 py-0.5">{commuteTime} Hrs</span>
                </div>
                <input
                  id="commute-slider"
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={commuteTime}
                  onChange={(e) => setCommuteTime(Number(e.target.value))}
                  className="w-full accent-[#f5c518] cursor-pointer h-1.5 bg-[#faf9f5] border border-[#1a1a1a] rounded-none outline-none appearance-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Estimated Cost & Savings */}
          <div className="bg-[#faf9f5] p-6 flex flex-col justify-between">
            <div>
              <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">// ESTIMATED COST</h3>
              
              {/* Cost Summary */}
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-[#1a1a1a]/60">OFFLINE TOTAL:</span>
                <span className="font-mono">{formatVal(offlineTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold mb-4">
                <span className="text-green-600">GENZCODEMY ONLINE:</span>
                <span className="font-mono text-green-600">{formatVal(onlineTotal)}</span>
              </div>

              <div className="border-t border-[#1a1a1a]/10 my-3"></div>

              {/* Visually Dominant Result */}
              <div className="border-2 border-[#1a1a1a] bg-[#f5c518] p-4 shadow-[3px_3px_0px_#1a1a1a] mb-4">
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-black/50">ESTIMATED SAVINGS</div>
                <div className="text-2xl md:text-3xl font-black tracking-tight">{formatVal(savings)}</div>
              </div>

              <div className="flex justify-between items-center border-2 border-[#1a1a1a] bg-white px-3 py-2 shadow-[2px_2px_0px_#1a1a1a] mb-5 text-xs font-bold">
                <span className="text-[#1a1a1a]/60 font-mono text-[9px] uppercase tracking-wider">TIME SAVED:</span>
                <span>{totalTimeSaved} hours</span>
              </div>

              {/* Visual Comparison Bar */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-0.5">
                    <span>OFFLINE</span>
                    <span className="font-mono">{formatVal(offlineTotal)}</span>
                  </div>
                  <div className="h-4 w-full border-2 border-[#1a1a1a] bg-white">
                    <div className="h-full bg-[#1a1a1a]" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-0.5">
                    <span>GENZCODEMY</span>
                    <span className="font-mono text-green-600">{formatVal(onlineTotal)}</span>
                  </div>
                  <div className="h-4 w-full border-2 border-[#1a1a1a] bg-white">
                    <div 
                      className="h-full bg-[#f5c518] transition-all duration-300 ease-out" 
                      style={{ width: `${Math.max(5, Math.min(100, (onlineTotal / offlineTotal) * 100))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-[#1a1a1a]/40 leading-relaxed">
                * Estimates are based on the values entered and may vary by location and lifestyle.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
