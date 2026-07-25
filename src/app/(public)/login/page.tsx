"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

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

    // Validate demo credentials (case‑sensitive)
    if (
      (form.email === "kfannex@gmail.com" || form.email === "kfannex@gamil.com") &&
      form.password === "kevin@123"
    ) {
      signIn(form.email, "Kevin Fannex", "student");
      router.push(redirectTo);
    } else {
      setError("Invalid email or password. Please use the demo credentials.");
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <h1 className="text-3xl font-black">Log in</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
      <p className="mt-6 text-sm text-[#1a1a1a]/60">
        New here?{" "}
        <Link href="/signup" className="font-bold text-[#1a1a1a] underline">
          Create an account
        </Link>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
