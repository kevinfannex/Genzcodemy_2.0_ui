"use client";

import { adminStatsApi } from "@/lib/api/admin";
import type { AdminStats } from "@/types";
import { useEffect, useState } from "react";

const LABELS: Record<keyof AdminStats, string> = {
  total_students: "Total students",
  total_courses: "Total courses",
  total_enrollments: "Total enrollments",
  pending_bookings: "Pending bookings",
  open_enquiries: "Open enquiries",
  active_forms: "Active forms",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    adminStatsApi.get().then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {(Object.keys(LABELS) as (keyof AdminStats)[]).map((key) => (
          <div
            key={key}
            className="border-2 border-[#1a1a1a] p-5 shadow-[6px_6px_0px_#1a1a1a]"
          >
            <p className="font-mono text-xs uppercase text-[#1a1a1a]/50">
              {LABELS[key]}
            </p>
            <p className="mt-2 text-3xl font-black">
              {stats ? stats[key] : " "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
