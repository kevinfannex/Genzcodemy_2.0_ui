"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import StaggeredMenu from "@/components/layout/StaggeredMenu";

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

  const menuItems = [
    { label: "Home", ariaLabel: "Home", link: "/" },
    ...NAV.map((item) => ({
      label: item.label,
      ariaLabel: item.label,
      link: item.href,
    })),
  ];

  const socialItems = [
    {
      label: "Log out",
      onClick: handleSignOut,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-[#1a1a1a] bg-[#1a1a1a] p-4 text-white md:hidden">
        <p className="font-mono text-sm text-[#f5c518]">admin@genzcodemy</p>
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#1a1a1a"
          changeMenuColorOnOpen={true}
          colors={["#f5c518", "#1a1a1a"]}
          accentColor="#f5c518"
        />
      </header>

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
