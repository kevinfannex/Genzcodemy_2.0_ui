"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoading(false);

    if (
      form.email === "connect@genzcodemy.com" &&
      form.password === "genzcodemy26"
    ) {
      signIn(form.email, "Admin", "admin");
      router.push("/admin-portal/dashboard");
    } else {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-6">
      <div className="w-full max-w-sm border-2 border-[#f5c518] bg-[#1a1a1a] p-6 font-mono text-white shadow-[8px_8px_0px_#f5c518]">
        <div className="mb-4 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <p className="mb-6 text-xs text-white/50">admin_portal.sh</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="admin@genzcodemy.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-white/30 bg-transparent px-3 py-2 text-sm focus:border-[#f5c518] focus:outline-none"
          />
          <input
            required
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-white/30 bg-transparent px-3 py-2 text-sm focus:border-[#f5c518] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[#f5c518] bg-[#f5c518] py-2 text-sm font-bold text-[#1a1a1a] disabled:opacity-60"
          >
            {loading ? "authenticating…" : "$ authenticate"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}
