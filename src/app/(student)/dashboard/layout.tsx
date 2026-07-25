"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/courses", label: "My courses" },
  { href: "/dashboard/bookings", label: "My bookings" },
  { href: "/dashboard/forms", label: "Forms" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=" + pathname);
    }
  }, [user, loading, router, pathname]);

  const handleSignOut = async () => {
    await signOut();
    // signOut already handles redirection to /login, but pushing / here is fine or we can omit it.
  };

  // Prevent rendering dashboard content until auth is checked
  if (loading || !user) {
    return <div className="p-10 font-mono">Loading dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r-2 border-[#1a1a1a] p-6 md:block">
        <Link href="/" className="text-lg font-black" style={{ fontFamily: "var(--font-gugi)" }}>
          genzcodemy<span className="text-[#f5c518]">.</span>
        </Link>
        <p className="mt-1 truncate font-mono text-xs text-[#1a1a1a]/50">
          {user?.email}
        </p>

        <nav className="mt-8 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block border-2 px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-[#1a1a1a] bg-[#f5c518]"
                    : "border-transparent text-[#1a1a1a]/70 hover:border-[#1a1a1a]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleSignOut}
          className="mt-10 w-full border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold hover:bg-[#1a1a1a] hover:text-white"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
