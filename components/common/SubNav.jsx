"use client";

import React from "react";
import Link from "next/link";

const SubNav = ({ subNavItems = [] }) => {
  if (!Array.isArray(subNavItems)) {
    console.error("subNavItems must be an array");
    return null;
  }

  return (
    <nav className="border-t border-b border-[#D4A437]/20 py-3 sm:py-5 bg-[#F7F6F3] font-['Montserrat']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14">
          {subNavItems.map((item) => (
            <li key={item.label} className="group">
               <p className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.2em] text-[#1F2A44] hover:text-[#D4A437] transition-all duration-300 uppercase relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4A437] transition-all duration-300 group-hover:w-full"></span>
                  </p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SubNav;