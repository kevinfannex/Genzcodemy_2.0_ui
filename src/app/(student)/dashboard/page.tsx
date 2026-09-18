"use client";

import { useAuth } from "@/lib/auth/AuthContext";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  return (
    <div>
      <h1 className="text-3xl font-black">Hey, {firstName} 👋</h1>
      <p className="mt-2 text-[#1a1a1a]/70">
        Here&apos;s a quick look at where things stand.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border-2 border-[#1a1a1a] p-5 shadow-[6px_6px_0px_#1a1a1a]">
          <p className="font-mono text-xs uppercase text-[#1a1a1a]/50">
            Active courses
          </p>
          <p className="mt-2 text-3xl font-black"> </p>
        </div>
        <div className="border-2 border-[#1a1a1a] p-5 shadow-[6px_6px_0px_#1a1a1a]">
          <p className="font-mono text-xs uppercase text-[#1a1a1a]/50">
            Pending bookings
          </p>
          <p className="mt-2 text-3xl font-black"> </p>
        </div>
        <div className="border-2 border-[#1a1a1a] p-5 shadow-[6px_6px_0px_#1a1a1a]">
          <p className="font-mono text-xs uppercase text-[#1a1a1a]/50">
            Forms to fill
          </p>
          <p className="mt-2 text-3xl font-black"> </p>
        </div>
      </div>
    </div>
  );
}
