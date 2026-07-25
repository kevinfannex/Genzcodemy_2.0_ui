"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin-portal/dashboard", label: "Overview" },
  { href: "/admin-portal/students", label: "Students" },
  { href: "/admin-portal/courses", label: "Courses" },
  { href: "/admin-portal/forms", label: "Forms" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Only redirect if we are not already on the admin login page
    if (!loading && !user && pathname !== "/admin-portal/login") {
      router.push("/admin-portal/login?redirect=" + pathname);
    }
  }, [user, loading, router, pathname]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin-portal/login");
  };

  // Login page has no sidebar chrome.
  if (loading || (!user && pathname !== "/admin-portal/login")) {
    return <div className="p-10 font-mono">Loading admin portal...</div>;
  }
  
  if (pathname === "/admin-portal/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="hidden w-64 shrink-0 border-r-2 border-[#1a1a1a] bg-[#1a1a1a] p-6 text-white md:block">
        <p className="font-mono text-sm text-[#f5c518]">admin@genzcodemy</p>

        <nav className="mt-8 space-y-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm font-bold transition ${
                  active ? "bg-[#f5c518] text-[#1a1a1a]" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleSignOut}
          className="mt-10 w-full border border-white/30 px-4 py-2 text-sm font-bold text-white hover:border-[#f5c518] hover:text-[#f5c518]"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
