"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { Course } from "@/types";
import { coursesApi } from "@/lib/api/courses";
import CurrencyToggle from "./CurrencyToggle";

const NAV_LINKS = [
  // { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/hire-from-us", label: "Hire from us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);

  useEffect(() => {
    coursesApi.list().then((res) => {
      const published = res.courses.filter((c) => c.is_published);
      setCourses(published);
      if (published.length > 0) setSelectedCourse(1);
    });
  }, []);

  const handleSelectCourse = (idx: number) => {
    if (selectedCourse !== null) {
      setDir(selectedCourse > idx ? "r" : "l");
    }
    setSelectedCourse(idx);
  };

  const menuItems = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: link.label,
    link: link.href,
  }));

  const socialItems = [
    {
      label: user ? "Dashboard" : "Log in",
      link: user ? "/dashboard" : "/login",
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#1a1a1a] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-gugi)" }}>
          GENZCODEMY<span className="text-[#f5c518]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-8 md:flex items-center">
          {NAV_LINKS.map((link) => {
            if (link.label === "Courses") {
              return (
                <div
                  key={link.href}
                  className="relative py-2"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {/* Courses trigger */}
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                      isDropdownOpen 
                        ? "bg-[#1a1a1a] text-white" 
                        : "text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
                    }`}
                  >
                    {link.label}
                    <FiChevronDown
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-white" : ""}`}
                    />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 mt-4 w-[850px] max-w-[90vw] -translate-x-1/2 rounded-xl border-2 border-[#1a1a1a] bg-[#faf9f5] shadow-[8px_8px_0px_#1a1a1a] overflow-hidden flex flex-col"
                      >
                        {/* Bridge to prevent gap hover-out */}
                        <div className="absolute -top-[16px] left-0 right-0 h-[16px]" />

                        <div className="px-8 py-6">
                          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/50">
                            COURSES
                          </p>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {/* ITEM 1 */}
                            <Link href="/courses/data-analytics" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">Data Analyst</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">Learn data analytics with real projects and Gen AI.</p>
                              </div>
                            </Link>
                            
                            {/* ITEM 2 */}
                            <Link href="/courses/python-full-stack" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">Python Full Stack with Gen AI</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">Backend, web, data, and AI-ready developer roles.</p>
                              </div>
                            </Link>

                            {/* ITEM 3 */}
                            <Link href="/courses/how-it-works" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"/><path d="M12 13v2"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">How It Works</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">The placement-first method behind every track.</p>
                              </div>
                            </Link>

                            {/* ITEM 4 */}
                            <Link href="/hire-from-us" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">Hire from us</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">For companies hiring freshers — tell us what you need.</p>
                              </div>
                            </Link>

                            {/* ITEM 5 */}
                            <Link href="/about" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">About</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">Learn more about Genzcodemy, our mission, and team.</p>
                              </div>
                            </Link>

                            {/* ITEM 6 (Contact) */}
                            <Link href="/contact" className="group flex gap-4 items-start">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white transition-colors group-hover:border-[#1a1a1a]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1a1a1a] transition-colors group-hover:text-[#f5c518]">Contact</h4>
                                <p className="mt-1 text-sm font-medium text-[#1a1a1a]/60">Get in touch with us for any questions or support.</p>
                              </div>
                            </Link>

                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between border-t-2 border-[#1a1a1a]/10 bg-white px-8 py-5">
                          <span className="text-sm font-bold text-[#1a1a1a]">Not sure which course fits?</span>
                          <Link href="/courses" className="text-sm font-black text-[#2563eb] hover:underline flex items-center gap-1">
                            Explore all courses <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Hide other links on desktop since they are now in the mega-menu
            return null;
          })}
        </nav>

        {/* Desktop Currency Toggle + Auth Button */}
        {!loading && (
          <div className="hidden md:flex items-center gap-4">
            {pathname?.startsWith("/courses") && <CurrencyToggle />}
            {/* <Link
              href={user ? "/dashboard" : "/login"}
              className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0px_#f5c518] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {user ? "Dashboard" : "Log in"}
            </Link> */}
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-center">
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#1a1a1a"
            openMenuButtonColor="#1a1a1a"
            changeMenuColorOnOpen={false}
            colors={["#f5c518", "#1a1a1a"]}
            accentColor="#f5c518"
          />
        </div>
      </div>
    </header>
  );
}
