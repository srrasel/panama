"use client";

import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ================= CONFIG ================= */

const dropdownData = {
  title: "INFORMATION FOR",
  items: [
    { label: "Students", href: "/info/students" },
    { label: "Parents", href: "/info/parents" },
  ],
};

const mainNavConfig = [
  {
    title: "LIFE AT PAMAVAMBO",
    href: "/life",
    links: [
      { label: "Student Life", href: "/life/student-life" },
      { label: "Calendar", href: "/life/calendar" },
      { label: "News and Events", href: "/life/news" },
      { label: "Campus", href: "/life/campus" },
      { label: "Leadership", href: "/life/leadership" },
      { label: "Careers", href: "/life/careers" },
    ],
  },
  {
    title: "ADMISSION",
    href: "/admission",
    links: [
      { label: "Inquire", href: "/admission/inquire" },
      { label: "Application Process", href: "/admission/application" },
      { label: "Campus Visit", href: "/admission/visit" },
    ],
  },
  {
    title: "ACADEMICS",
    href: "/academics",
    links: [
      { label: "Departments", href: "/academics/departments" },
      { label: "Academic Community", href: "/academics/community" },
      { label: "Career", href: "/academics/career" },
    ],
  },
  {
    title: "BEYOND THE CLASSROOM",
    href: "/beyond-the-classroom",
    links: [],
  },
];

/* ================= COMPONENT ================= */

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent px-4 md:px-12 py-6">
        {/* Main Wrapper: Logo, Nav, and Search all in one row */}
        <div className="max-w-400 mx-auto flex justify-between items-center gap-4">
          {/* 1. LOGO (Stacked text but vertically centered) */}
          <Link href="/" className="z-60 shrink-0">
            <h1 className="font-serif text-lg md:text-xl lg:text-2xl text-white leading-[1.1] uppercase">
              The <br /> Pamavambo <br /> School
            </h1>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Centered between Logo and Search) */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-10 border-b border-amber-500/30 pb-1">
            {mainNavConfig.map((menu, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <Link
                  href={menu.href}
                  className="cursor-pointer text-white text-[11px] lg:text-xs font-bold tracking-[0.2em] hover:text-amber-400 transition-colors uppercase"
                >
                  {menu.title}
                </Link>

                {openIndex === index && menu.links.length > 0 && (
                  <div className="absolute left-0  w-56 bg-[#610716] text-white shadow-2xl py-2 z-50">
                    <ul className="flex flex-col">
                      {menu.links.map((link, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 hover:bg-[#821021] transition-colors"
                        >
                          <Link
                            href={link.href}
                            className="block text-xs tracking-wider uppercase"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 3. UTILITY AREA: Info For & Search */}
          <div className="flex items-center gap-6 z-60">
            {/* "Information For" Dropdown */}
            <div
              className="hidden lg:flex text-white items-center gap-1 cursor-pointer relative text-[10px] lg:text-xs tracking-widest font-bold"
              onMouseEnter={() => setIsInfoOpen(true)}
              onMouseLeave={() => setIsInfoOpen(false)}
            >
              <span>{dropdownData.title}</span>
              <ChevronDown size={14} className="text-amber-500" />

              {isInfoOpen && (
                <div className="absolute top-full right-0  w-40 bg-[#610716] text-white shadow-lg py-2">
                  <ul className="flex flex-col">
                    {dropdownData.items.map((item, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-[#821021]">
                        <Link
                          href={item.href}
                          className="text-[10px] uppercase font-bold tracking-tighter"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button className="text-white hover:text-amber-500 transition-colors">
              <Search size={22} strokeWidth={2.5} />
            </button>

            {/* Mobile Hamburger (Only visible on small screens) */}
            <button
              className="text-white xl:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAVIGATION OVERLAY ================= */}
        <div
          className={`
          fixed inset-0 bg-[#610716] z-50 transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          xl:hidden
        `}
        >
          <div className="flex-1 overflow-y-auto mt-24 p-6">
            <nav className="flex flex-col gap-8">
              {mainNavConfig.map((menu, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <Link
                    href={menu.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-lg font-serif border-b border-amber-500/30 pb-2"
                  >
                    {menu.title}
                  </Link>
                  {menu.links.length > 0 && (
                    <div className="flex flex-col gap-2 pl-3">
                      {menu.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-white/80 text-sm hover:text-amber-400 py-1 uppercase tracking-widest"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
