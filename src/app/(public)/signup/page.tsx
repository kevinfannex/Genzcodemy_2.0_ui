"use client";

import { authApi } from "@/lib/api/auth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Backend creates the Supabase auth user + profiles row together,
      // so role assignment stays server-controlled.
      await authApi.signup(form);

      // Sign in on the client so the browser gets a session cookie.
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (signInError) throw signInError;

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Couldn't create your account. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <h1 className="text-3xl font-black">Create an account</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          required
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
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
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <input
          required
          type="password"
          placeholder="Password"
          minLength={8}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border-2 border-[#1a1a1a] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f5c518]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Sign up"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
      <p className="mt-6 text-sm text-[#1a1a1a]/60">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#1a1a1a] underline">
          Log in
        </Link>
      </p>
    </section>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
