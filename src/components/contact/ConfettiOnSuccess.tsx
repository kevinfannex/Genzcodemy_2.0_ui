"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiOnSuccess() {
  useEffect(() => {
    // Tasteful, small burst of Genzcodemy theme colors
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#f5c518", "#1a1a1a", "#ffffff"],
    });
  }, []);

  return null;
}
