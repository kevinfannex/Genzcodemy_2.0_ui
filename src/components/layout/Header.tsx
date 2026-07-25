"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/hire-from-us", label: "Hire from us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#1a1a1a] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-gugi)" }}>
          GENZCODEMY<span className="text-[#f5c518]">.</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {!loading && (
          <Link
            href={user ? "/dashboard" : "/login"}
            className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            {user ? "Dashboard" : "Log in"}
          </Link>
        )}
      </div>
    </header>
  );
}
