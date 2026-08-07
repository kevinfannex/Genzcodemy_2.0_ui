"use client";

import React, { useEffect, useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Course } from "@/types";

interface ShiftingDropDownProps {
  courses: Course[];
}

export const ShiftingDropDown = ({ courses }: ShiftingDropDownProps) => {
  return (
    <div className="flex w-full justify-start text-[#1a1a1a] md:justify-center">
      <Tabs courses={courses} />
    </div>
  );
};

const Tabs = ({ courses }: { courses: Course[] }) => {
  const [selected, setSelected] = useState<number | null>(courses.length > 0 ? 1 : null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  const tabs = courses.map((course, idx) => ({
    id: idx + 1,
    title: course.title,
    Component: () => <CourseDetails course={course} />,
  }));

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex flex-col items-center"
    >
      {/* Tab Triggers Container (Brutalist Pill) */}
      <div className="flex gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-1.5 shadow-[4px_4px_0px_#1a1a1a] rounded-full">
        {tabs.map((t) => (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        ))}
      </div>

      {/* Dropdown Content Area */}
      <AnimatePresence>
        {selected && (
          <Content dir={dir} selected={selected} tabs={tabs} />
        )}
      </AnimatePresence>
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}

const Tab = ({ children, tab, handleSetSelected, selected }: TabProps) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all border-2 border-transparent cursor-pointer ${
        selected === tab
          ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
          : "text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-[#FAF9F5]"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform duration-200 ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

interface ContentProps {
  selected: number;
  dir: "l" | "r" | null;
  tabs: Array<{
    id: number;
    title: string;
    Component: React.ComponentType;
  }>;
}

const Content = ({ selected, dir, tabs }: ContentProps) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute top-[calc(100%_+_12px)] w-80 border-2 border-[#1a1a1a] bg-white p-4 shadow-[6px_6px_0px_#1a1a1a] z-50"
    >
      <Bridge />
      <Nub selected={selected} />

      {tabs.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[12px] left-0 right-0 h-[12px]" />
);

const Nub = ({ selected }: { selected: number }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border-l-2 border-t-2 border-[#1a1a1a] bg-white"
    />
  );
};

const CourseDetails = ({ course }: { course: Course }) => {
  return (
    <div className="w-full text-[#1a1a1a]">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[10px] font-black bg-[#f5c518] px-2 py-0.5 border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]">
          {course.duration_weeks} WEEKS
        </span>
        <span className="font-mono text-sm font-bold">
          ₹{course.price.toLocaleString("en-IN")}
        </span>
      </div>
      <p className="text-xs font-medium text-[#1a1a1a]/70 mb-4 line-clamp-2 leading-relaxed">
        {course.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {course.tools.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[9px] font-mono font-bold bg-[#faf9f5] border border-[#1a1a1a]/20 px-1.5 py-0.5"
          >
            {t}
          </span>
        ))}
        {course.tools.length > 4 && (
          <span className="text-[9px] font-mono font-bold text-[#1a1a1a]/50 px-1 flex items-center">
            +{course.tools.length - 4} more
          </span>
        )}
      </div>
      <Link
        href={`/courses/${course.slug}`}
        className="flex items-center justify-between border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white px-3 py-2 text-xs font-bold hover:bg-[#f5c518] hover:text-[#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
      >
        <span>View Curriculum</span>
        <FiArrowRight />
      </Link>
    </div>
  );
};
