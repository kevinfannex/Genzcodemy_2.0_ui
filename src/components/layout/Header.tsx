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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
                    className="flex items-center gap-1 text-sm font-semibold text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
                  >
                    {link.label}
                    <FiChevronDown
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* Shifting Dropdown */}
                  <AnimatePresence>
                    {isDropdownOpen && courses.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 mt-2 min-w-[220px] -translate-x-1/2 border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a]"
                      >
                        {/* Triangle Nub */}
                        <div className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-[#1a1a1a] bg-white" />

                        {/* Bridge to prevent gap hover-out */}
                        <div className="absolute -top-[12px] left-0 right-0 h-[12px]" />

                        {/* Course name links only */}
                        <div className="flex flex-col">
                          {courses.map((course, idx) => (
                            <Link
                              key={course.id}
                              href={`/courses/${course.slug}`}
                              className={`flex items-center justify-between px-5 py-4 text-sm font-bold text-[#1a1a1a] transition-all hover:bg-[#f5c518] hover:pl-7 ${
                                idx < courses.length - 1 ? "border-b-2 border-[#1a1a1a]/10" : ""
                              }`}
                            >
                              <span>{course.title}</span>
                              <span className="text-[#1a1a1a]/40">→</span>
                            </Link>
                          ))}
                          
                          <Link
                            href="/courses/how-it-works"
                            className="flex items-center justify-between px-5 py-4 text-sm font-black text-[#f5c518] bg-[#1a1a1a] transition-all hover:bg-[#333] hover:pl-7 border-t-2 border-[#1a1a1a]"
                          >
                            <span>How it Works</span>
                            <span className="text-[#f5c518]/60">→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-semibold text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
              >
                {link.label}
              </Link>
            );
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
